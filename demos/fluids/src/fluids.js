'use strict';

import * as solve from './solve.js'
import Grid from './grid.js'
import { noise13 } from './curl.js';
import * as constants from './constants.js';

let tmpV = glMatrix.vec2.create();

const smokeColors = [
    // [1.0, 1.0, 1.0],//white
    [1.0, 0.1, 0.1],//red
    [0.1, 1.0, 0.1],//green
    [0.1, 0.1, 1.0],//blue

    [1.0, 0.5, 0.1],//orange
    [0.5, 1.0, 0.1],//lime

    [0.1, 1.0, 0.5],//aqua
    [0.1, 0.5, 1.0],//sky

    [0.5, 0.1, 1.0],//purple
    [1.0, 0.1, 0.5],//pink

    [1.0, 1.0, 0.1],//yellow
    [1.0, 0.1, 1.0],//magenta
    [0.1, 1.0, 1.0]//cyan
];

/**
 * Convert a number to 8 bit int.
 * @param  {Number} value Number as float
 * @return {Number}       Number as 8 bit int
 */
function toFixed(value) {
    return Math.abs(Math.floor(value * 255));
}

/**
 * Calculate and render the Mandelbrot set.
 * @param {Number} height The number of vertical pixels
 * @param {Number} width The number of horizontal pixels
 */
export default class Fluids {
    constructor(height, width) {
        this._height = height;
        this._width = width;
        this._simulationTimeElapsed = 0.0;
        this._renderMode = "density";
        this._velocityMode = "advect";
        // Fluid velocity
        this.initVelocityCache();
        this._velocity = Grid.makeCustomGrid(this._width, this._height, 2, () => { return glMatrix.vec2.create(); });

        // Velocity Source
        this._seedVelocity = Grid.makeCurlGrid(this._width, this._height, constants.noiseSpeed(), constants.noiseMagnitude());
        let that = this;
        // Color / density
        this._seedColor = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._seedColor.eachCellRowColumn((r, c) => {
            // return [1 * noise1(x, y, 0)];
            let value = glMatrix.vec2.create();
            let magnitude = constants.noiseMagnitude() * glMatrix.vec2.length(that._seedVelocity.sample2(c, r, value));
            if (isNaN(magnitude)) {
                throw ("Nan value in seed color");
            }
            that._seedColor.set1(c, r, magnitude);
        });

        this._colorRed = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._colorGreen = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._colorBlue = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._colors = [this._colorRed, this._colorGreen, this._colorBlue]
        this._black = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        // Temporary buffer for advection operations
        this._colorRedSwap = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._colorGreenSwap = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._colorBlueSwap = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._colorSwaps = [this._colorRedSwap, this._colorGreenSwap, this._colorBlueSwap]
        this._velocitySwap = Grid.makeCustomGrid(this._width, this._height, 2, () => { return glMatrix.vec2.create(); });
        this._divergence = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._pressure = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._useVorticityConfinement = true;
        this._addExtraFluidSources = true;
        this._colorIndex = 0;
        this._touches = [];
    }

    setTouches(touchList) {
        this._touches = touchList;
    }

    setUseVorticityConfinement(enable) {
        this._useVorticityConfinement = enable;
    }

    setAddExtraFluidSources(enable) {
        this._addExtraFluidSources = enable;
    }

    initVelocityCache() {
        if (this._velocityCache == null && this._velocityMode === "noise") {
            this._velocityCache = [];
            for (let i = 0; i < 10; i++) {
                this._velocityCache.push(Grid.makeCurlGrid(this._width, this._height, constants.noiseSpeed() * i, constants.noiseMagnitude()));
            }
            this._velocityCacheIndex = 0;
        }
    }

    toDisplayPixelIndex(x, y, displayScale) {
        return 4 * (y * this._width * displayScale + x);
    }

    setRenderMode(mode) {
        this._renderMode = mode;
    }

    setVelocityMode(mode) {
        this._velocityMode = mode;
    }

    getBoxWidth() {
        return Math.floor(0.1 * this._width);
    }

    getBoxOffset() {
        const border = 10; // min distance from boxes to edge of simulation
        const boxWidth = this.getBoxWidth();
        const seconds = Math.floor(1 * this._simulationTimeElapsed);
        return Math.min(Math.min(0.5 * border + Math.floor((seconds % 5) * 2 * boxWidth), this._width - border), this._height - border);
    }

    addDensity() {
        if (this._addExtraFluidSources) {
            // Copy a patch from the seed grid at an interesting location
            const boxWidth = this.getBoxWidth();
            const boxOffset = this.getBoxOffset();
            for (const colorGrid of this._colors) {
                colorGrid.copySubGrid(this._seedColor, boxOffset, boxOffset, boxWidth, boxWidth);
            }
            const boxBorder = Math.floor(boxWidth * 0.2);
            for (const colorGrid of this._colors) {
                colorGrid.copySubGrid(this._black, boxOffset + boxBorder, boxOffset + boxBorder, boxWidth - 2 * boxBorder, boxWidth - 2 * boxBorder);
            }
        }
        this.addDensityPush();
        this.addDensityTouch();
    }

    setPush(v, p, dragIndex) {
        this._pushV = v;//velocity
        this._pushP = p;//position
        this._colorIndex = dragIndex;
    }

    addDensityTouch() {
        for (const touch of this._touches) {
            this.addDensityBox(touch.identifier, touch.position, touch.velocity);
        }
    }

    colorFromIndex(index) {
        return smokeColors[index % smokeColors.length];
    }

    addDensityBox(index, position, velocity) {
        const d = Math.max(Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]), 1.0);
        const scale = constants.userAddDensityScale();
        const width = this.getBoxWidth();
        const color = this.colorFromIndex(index);
        const halfWidth = Math.floor(width / 2);
        const px = Math.floor(position[1]) - halfWidth;
        const py = Math.floor(position[0]) - halfWidth;
        let colorChannelIndex = 0;
        for (const colorGrid of this._colors) {
            colorGrid.addRegion([d], 1, px, py, width, width, scale * color[colorChannelIndex++]);
        }
    }

    addDensityPush() {
        if (this._pushV == null || this._pushP == null) {
            return;
        }
        this.addDensityBox(this._colorIndex, this._pushP, this._pushV);
    }

    addVelocityTouch() {
        for (const touch of this._touches) {
            this.addVelocityBox(touch.position, touch.velocity);
        }
    }

    addVelocityBox(position, velocity) {
        const scale = constants.userAddVelocityScale();
        const width = this.getBoxWidth();
        const halfWidth = Math.floor(width / 2);
        const px = Math.floor(position[1]) - halfWidth;
        const py = Math.floor(position[0]) - halfWidth;
        this._velocity.addRegion(velocity, 2, px, py, width, width, scale);
    }

    addVelocityPush() {
        if (this._pushV == null || this._pushP == null) {
            return;
        }
        this.addVelocityBox(this._pushP, this._pushV);
    }

    swapColor(index) {
        // swap pointers
        let tmp = this._colors[index];
        this._colors[index] = this._colorSwaps[index];
        this._colorSwaps[index] = tmp;
    }

    swapVelocity() {
        // swap pointers
        let tmp = this._velocity;
        this._velocity = this._velocitySwap;
        this._velocitySwap = tmp;
    }

    addVelocity() {
        if (this._addExtraFluidSources) {
            const boxWidth = this.getBoxWidth();
            const boxOffset = this.getBoxOffset();
            this._velocity.copySubGrid(this._seedVelocity, boxOffset, boxOffset, boxWidth, boxWidth);
        }
        this.addVelocityPush();
        this.addVelocityTouch();
    }

    projectVelocity() {
        // Make fluid incompressible by removing divergence
        solve.project(this._width, this._height, this._velocity, this._pressure, this._divergence);
    }

    updateVelocity(dt) {

        if (this._velocityMode === "noise") {
            this.initVelocityCache();
            // This index oscillates between 0 and 9
            this._velocityCacheIndex += 1;
            this._velocityCacheIndex %= 20;
            const velocityIndex = this._velocityCacheIndex >= 10
                ? 19 - this._velocityCacheIndex
                : this._velocityCacheIndex;

            // Look up the velocity from the cached array
            this._velocity.copy(this._velocityCache[velocityIndex]);
        } else if (this._velocityMode === "advect") {
            this.addVelocity();

            solve.diffuse2(dt, this._width, this._height, this._velocity, this._velocitySwap);
            this.swapVelocity();

            this.projectVelocity();

            solve.advect2(dt, this._width, this._height, this._velocity, this._velocitySwap, this._velocity);
            this.swapVelocity();

            this.projectVelocity();

            if (this._useVorticityConfinement) {
                solve.vorticityConfinement(dt, this._width, this._height, this._velocity);
            }
        }
    }

    updateDensity(dt) {
        for (let index = 0; index < this._colors.length; index++) {
            if (this._velocityMode === "noise") {
                // Fade the previous colors
                this._colors[index].dampen(constants.noiseModeColorDamping());
            } else if (this._velocityMode === "advect") {
                // Hack, remove density a little bit
                this._colors[index].dampen(constants.advectModeColorDamping());

                solve.diffuse1(dt, this._width, this._height, this._colors[index], this._colorSwaps[index]);
                this.swapColor(index);
            }
            // advect color into swap using velocity
            solve.advect1(dt, this._width, this._height, this._colors[index], this._colorSwaps[index], this._velocity);
            this.swapColor(index);
        }
        // Add density
        this.addDensity();
    }

    step(dt) {
        const scaledDeltaTime = 0.4 * dt;

        this._simulationTimeElapsed += scaledDeltaTime;

        // get from grid
        this.updateVelocity(scaledDeltaTime);

        // Update color using velocity
        this.updateDensity(scaledDeltaTime);

    }


    /**
     * Render the pixels
     * {Uint8ClampedArray} pixels The r, g, b, a pixel data (0 to 255)
     * {displayScale} Ratio of canvas size / simulation grid size 
     */
    render(pixels, displayScale) {
        if (displayScale < 1.0) {
            throw "Invalid scale";
        }
        // for each display pixel
        for (let x = 0; x < this._width * displayScale; x++) {
            for (let y = 0; y < this._height * displayScale; y++) {
                // grid coordinates (non integer)
                const xScaled = x / displayScale;
                const yScaled = y / displayScale;
                const index = this.toDisplayPixelIndex(x, y, displayScale);
                if (this._renderMode === "density") {
                    const densityScale = constants.renderScale();
                    let indexOffset = 0;
                    for (const colorGrid of this._colors) {
                        const v = densityScale * colorGrid.sample1Interp(xScaled, yScaled);
                        if (isNaN(v)) {
                            throw "NaN render v"
                        } if (v < 0) {
                            throw "negative v"
                        }
                        pixels[index + indexOffset++] = toFixed(v);
                    }
                } else {
                    const v = this._velocity.sample2Interp(xScaled, yScaled, tmpV);
                    const velocityScale = constants.renderScale();
                    if (isNaN(v[0])) {
                        throw "NaN render v0"
                    }
                    if (isNaN(v[1])) {
                        throw "NaN render v1"
                    }
                    pixels[index + 0] = toFixed(v[0] * velocityScale);
                    pixels[index + 1] = toFixed(v[1] * velocityScale);
                    pixels[index + 2] = toFixed(0);
                }
                pixels[index + 3] = toFixed(1);
            }
        }
    }
}
