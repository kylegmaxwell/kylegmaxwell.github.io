'use strict';

import { baseFrequency, noise3d, curl2d } from './curl.js'
import { advect as doAdvect } from './advect.js'
import Grid from './grid.js'

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
        // Fluid velocity
        this._velocity = Grid.makeCurlGrid(this._width, this._height);
        // Color / density
        this._color = Grid.makeNoiseGrid(this._width, this._height);
        // Temporary buffer for advection operations
        this._swap = Grid.makeCustomGrid(this._width, this._height, () => { return glMatrix.vec3.create(); });
    }

    toIndex(r, c) {
        return r * this._width + c;
    }
    /**
     * Render the pixels
     * {Uint8ClampedArray} pixels The r, g, b, a pixel data (0 to 255)
     */
    render(pixels) {
        // let index = 0;
        // Loop over each pixel
        for (let r = 0; r < this._height; r++) {
            for (let c = 0; c < this._width; c++) {
                const index = 4 * this.toIndex(r, c);
                // const sampleIndex = 3 * this.toIndex(r, c);
                const value = this._color.sample3(r, c);
                // TODO use grid.sample3(r,c);
                pixels[index + 0] = toFixed(value[0]);
                pixels[index + 1] = toFixed(value[1]);
                pixels[index + 2] = toFixed(value[2]);
                pixels[index + 3] = toFixed(1);
                // index += 4;
            }
        }
    }

    advect(dt) {
        doAdvect(dt, this._width, this._height, this.colorArray, this.velocityArray);
    }
}
