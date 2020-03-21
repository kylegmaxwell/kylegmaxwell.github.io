'use strict';

import { advect, project } from './solve.js'
import Grid from './grid.js'
import { noise3 } from './curl.js';
import { noiseSpeed } from './constants.js';

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
        this._velocityCache = [];
        for (let i = 0; i < 10; i++) {
            this._velocityCache.push(Grid.makeCurlGrid(this._width, this._height, noiseSpeed() * i));
        }
        this._velocityCacheIndex = 0;
        this._velocity = this._velocityCache[this._velocityCacheIndex];// TODO: Should this be deep copy?
        // this._velocity = Grid.makeCustomGrid(this._width, this._height, () => { return glMatrix.vec3.create(); });
        // Color / density
        this._seedColor = Grid.makeCustomGrid(this._width, this._height, (x, y) => {
            let n = noise3(x, y, 0);
            n[0] = Math.abs(n[0]);
            n[1] = Math.abs(n[1]);
            n[2] = Math.abs(n[2]);
            return n;
        });
        this._seedVelocity = Grid.makeCustomGrid(this._width, this._height, (x, y) => {
            let v = glMatrix.vec3.create();
            v[0] = 1;
            v[1] = 0;
            v[2] = 0;
            return v;
        });
        this._color = Grid.makeCustomGrid(this._width, this._height, () => { return glMatrix.vec3.create(); });
        this._black = Grid.makeCustomGrid(this._width, this._height, () => { return glMatrix.vec3.create(); });
        // Temporary buffer for advection operations
        this._colorSwap = Grid.makeCustomGrid(this._width, this._height, () => { return glMatrix.vec3.create(); });
        this._velocitySwap = Grid.makeCustomGrid(this._width, this._height, () => { return glMatrix.vec3.create(); });
        this._divergence = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
        this._density = Grid.makeUniformGrid1Channel(this._width, this._height, 0);
    }

    toPixelIndex(r, c) {
        return 4 * (r * this._width + c);
    }

    setRenderMode(mode) {
        this._renderMode = mode;
    }

    setVelocityMode(mode) {
        this._velocityMode = mode;
    }

    /**
     * Render the pixels
     * {Uint8ClampedArray} pixels The r, g, b, a pixel data (0 to 255)
     */
    render(pixels) {
        const renderGrid = (this._renderMode === "density")
            ? this._color
            : this._velocity;

        // Loop over each pixel
        for (let r = 0; r < this._height; r++) {
            for (let c = 0; c < this._width; c++) {
                const index = this.toPixelIndex(r, c);
                const value = renderGrid.sample3(r, c);
                pixels[index + 0] = toFixed(value[0]);
                pixels[index + 1] = toFixed(value[1]);
                pixels[index + 2] = toFixed(value[2]);
                pixels[index + 3] = toFixed(1);
            }
        }
    }

    updateVelocity(dt) {

        // Sampling noise every frame was too slow on CPU
        // this._velocity = Grid.makeCurlGrid(this._width, this._height, noiseSpeed() * this._simulationTimeElapsed);

        if (this._velocityMode === "noise") {
            // This index oscillates between 0 and 9
            this._velocityCacheIndex += 1;
            this._velocityCacheIndex %= 20;
            const velocityIndex = this._velocityCacheIndex >= 10
                ? 19 - this._velocityCacheIndex
                : this._velocityCacheIndex;

            // Look up the velocity from the cached array
            this._velocity = this._velocityCache[velocityIndex];
        } else if (this._velocityMode === "advect") {
            this.addVelocity(dt);

            this.advectVelocity(dt);
            this.swapVelocity(dt);

            // this.projectVelocity(dt);
            // this.swapVelocity(dt);

            //TODO
            // diffuse
            // advect
            // project
            // vorticity confinement

        }
    }

    getBoxWidth() {
        return Math.floor(0.1 * this._width);
    }

    getBoxOffset() {
        const border = 10;
        const boxWidth = this.getBoxWidth();
        const seconds = Math.floor(this._simulationTimeElapsed);
        return Math.min(Math.min(border + Math.floor((seconds % 5) * 2 * boxWidth), this._width - border), this._height - border);
    }

    updateColor() {
        // Fade the previous colors
        this._color.dampen(0.9);

        // Copy a patch from the seed grid at an interesting location
        const boxWidth = this.getBoxWidth();
        const boxOffset = this.getBoxOffset();
        this._color.copySubGrid(this._seedColor, boxOffset, boxOffset, boxWidth, boxWidth);
        const boxBorder = 5;
        this._color.copySubGrid(this._black, boxOffset + boxBorder, boxOffset + boxBorder, boxWidth - 2 * boxBorder, boxWidth - 2 * boxBorder);
    }

    advectAndSwapColor(dt) {
        // advect color into swap using velocity
        advect(dt, this._width, this._height, this._color, this._colorSwap, this._velocity);

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

    addVelocity(dt) {

        const boxWidth = this.getBoxWidth();
        const boxOffset = this.getBoxOffset();
        this._velocity.copySubGrid(this._seedVelocity, boxOffset, boxOffset, boxWidth, boxWidth);
    }

    advectVelocity(dt) {
        // advect color into swap using velocity
        advect(dt, this._width, this._height, this._velocity, this._velocitySwap, this._velocity);
    }

    projectVelocity(dt) {
        // advect color into swap using velocity
        project(dt, this._width, this._height, this._velocity, this._velocitySwap, this._divergence, this._density);
    }

    step(dt) {
        this._simulationTimeElapsed += dt;

        // get from grid
        this.updateVelocity(dt);

        // Update color using velocity
        this.advectAndSwapColor(dt);

        // Add density
        this.updateColor();
    }
}
