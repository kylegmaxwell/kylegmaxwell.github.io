'use strict';

import { advect as doAdvect } from './advect.js'
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
        // Fluid velocity
        this._velocityCache = [];
        for (let i = 0; i < 10; i++) {
            this._velocityCache.push(Grid.makeCurlGrid(this._width, this._height, noiseSpeed() * i));
        }
        this._velocityCacheIndex = 0;
        this._velocity = this._velocityCache[this._velocityCacheIndex];
        // Color / density
        this._seedColor = Grid.makeCustomGrid(this._width, this._height, (x, y) => {
            let n = noise3(x, y, 0);
            n[0] = Math.abs(n[0]);
            n[1] = Math.abs(n[1]);
            n[2] = Math.abs(n[2]);
            return n;
        });
        this._color = this._seedColor;
        // TODO start out black and use seed color to add pops of color
        // this._color = Grid.makeCustomGrid(this._width, this._height, () => { return glMatrix.vec3.create(); });
        // Temporary buffer for advection operations
        this._swap = Grid.makeCustomGrid(this._width, this._height, () => { return glMatrix.vec3.create(); });
    }

    toIndex(r, c) {
        return r * this._width + c;
    }

    setRenderMode(mode) {
        this._renderMode = mode;
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
                const index = 4 * this.toIndex(r, c);
                const value = renderGrid.sample3(r, c);
                pixels[index + 0] = toFixed(value[0]);
                pixels[index + 1] = toFixed(value[1]);
                pixels[index + 2] = toFixed(value[2]);
                pixels[index + 3] = toFixed(1);
            }
        }
    }

    updateVelocity() {

        // Sampling noise every frame was too slow on CPU
        // this._velocity = Grid.makeCurlGrid(this._width, this._height, noiseSpeed() * this._simulationTimeElapsed);

        // This index oscillates between 0 and 9
        this._velocityCacheIndex += 1;
        this._velocityCacheIndex %= 20;
        const velocityIndex = this._velocityCacheIndex >= 10
            ? 19 - this._velocityCacheIndex
            : this._velocityCacheIndex;

        // Look up the velocity from the cached array
        this._velocity = this._velocityCache[velocityIndex];
    }

    advect(dt) {
        this._simulationTimeElapsed += dt;
        this.updateVelocity();
        // advect color into swap using velocity
        doAdvect(dt, this._width, this._height, this._color, this._swap, this._velocity);
        // swap pointers
        let tmp = this._color;
        this._color = this._swap;
        this._swap = tmp;

    }
}
