'use strict';

import * as solve from './solve.js'
import Grid from './grid.js'
// import { noise1 } from './curl.js';
import * as constants from './constants.js';

let tmpV = glMatrix.vec2.create();

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
        this._seedVelocity = Grid.makeCurlGrid(this._width, this._height, 2 * constants.noiseSpeed());
        let that = this;
        // Color / density
        this._seedColor = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._seedColor.eachCellRowColumn((r, c) => {
            // return [1 * noise1(x, y, 0)];
            let value = glMatrix.vec2.create();
            let asdf = glMatrix.vec2.length(that._seedVelocity.sample2(c, r, value));
            if (isNaN(asdf)) {
                throw ("Nan value in seed color");
            }
            that._seedColor.set1(c, r, asdf);
        });

        this._color = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._black = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        // Temporary buffer for advection operations
        this._colorSwap = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._velocitySwap = Grid.makeCustomGrid(this._width, this._height, 2, () => { return glMatrix.vec2.create(); });
        this._divergence = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._pressure = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
    }

    initVelocityCache() {
        if (this._velocityCache == null && this._velocityMode === "noise") {
            this._velocityCache = [];
            for (let i = 0; i < 10; i++) {
                this._velocityCache.push(Grid.makeCurlGrid(this._width, this._height, constants.noiseSpeed() * i));
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
        const border = 10;
        const boxWidth = this.getBoxWidth();
        const seconds = Math.floor(1 * this._simulationTimeElapsed);
        return Math.min(Math.min(0.5 * border + Math.floor((seconds % 5) * 2 * boxWidth), this._width - border), this._height - border);
    }

    addDensity() {
        // Copy a patch from the seed grid at an interesting location
        const boxWidth = this.getBoxWidth();
        const boxOffset = this.getBoxOffset();
        this._color.copySubGrid(this._seedColor, boxOffset, boxOffset, boxWidth, boxWidth);
        // const boxBorder = 5;
        // this._color.copySubGrid(this._black, boxOffset + boxBorder, boxOffset + boxBorder, boxWidth - 2 * boxBorder, boxWidth - 2 * boxBorder);
        this.addDensityPush();
    }

    setPush(v, p) {
        this._pushV = v;//velocity
        this._pushP = p;//position

        // Temporary hack, consistent velocity to the right
        this._pushV[0] = 1;
        this._pushV[1] = 0;
    }

    addDensityPush() {
        if (this._pushV == null || this._pushP == null) {
            return;
        }
        let d = glMatrix.vec2.length(this._pushV);
        const scale = 1.5;
        this._color.addRegion([d], 1, this._pushP[1], this._pushP[0], 5, 5, scale);
    }

    addVelocityPush() {
        if (this._pushV == null || this._pushP == null) {
            return;
        }
        const scale = 1.5;
        this._velocity.addRegion(this._pushV, 2, this._pushP[1], this._pushP[0], 5, 5, scale);
    }

    swapColor() {
        // swap pointers
        let tmp = this._color;
        this._color = this._colorSwap;
        this._colorSwap = tmp;
    }

    swapVelocity(dt) {
        // swap pointers
        let tmp = this._velocity;
        this._velocity = this._velocitySwap;
        this._velocitySwap = tmp;
    }

    addVelocity() {
        const boxWidth = this.getBoxWidth();
        const boxOffset = this.getBoxOffset();
        // this._velocity.copySubGrid(this._seedVelocity, boxOffset, boxOffset, boxWidth, boxWidth);
        this.addVelocityPush();
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

            solve.diffuse2(dt, constants.diffusionScale(), this._width, this._height, this._velocity, this._velocitySwap);
            this.swapVelocity(dt);

            this.projectVelocity();

            solve.advect2(dt, this._width, this._height, this._velocity, this._velocitySwap, this._velocity);
            this.swapVelocity(dt);

            this.projectVelocity();

            //TODO
            // vorticity confinement

        }
    }

    updateDensity(dt) {
        if (this._velocityMode === "noise") {
            // Fade the previous colors
            this._color.dampen(0.9);
        } else if (this._velocityMode === "advect") {
            // Hack, remove density a little bit
            this._color.dampen(0.99);

            solve.diffuse1(dt, constants.diffusionScale(), this._width, this._height, this._color, this._colorSwap);
            this.swapColor();
        }
        // advect color into swap using velocity
        solve.advect1(dt, this._width, this._height, this._color, this._colorSwap, this._velocity);
        this.swapColor();

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
                    const v = densityScale * this._color.sample1Interp(xScaled, yScaled);
                    if (isNaN(v)) {
                        throw "NaN render v"
                    } if (v < 0) {
                        throw "negative v"
                    }
                    pixels[index + 0] = toFixed(v);
                    pixels[index + 1] = toFixed(v);
                    pixels[index + 2] = toFixed(v);
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
