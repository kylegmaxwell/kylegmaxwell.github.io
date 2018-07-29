'use strict';

import noise from './perlin.js'
/**
 * Convert a number to 8 bit int.
 * @param  {Number} value Number as float
 * @return {Number}       Number as 8 bit int
 */
function toFixed(value) {
    return Math.floor(value*255);
}

/**
 * Calculate and render the Mandelbrot set.
 * @param {Number} height The number of vertical pixels
 * @param {Number} width The number of horizontal pixels
 * @param {Number} iter The maximum number of iterations
 */
export default class Fluids {
    constructor(height, width, iter) {
        this.height = height;
        this.width = width;
        this.iter = iter;
    }

    /**
     * Render the mandlebrot set
     * {Uint8ClampedArray} pixels The r, g, b, a pixel data (0 to 255)
     */
    render(pixels) {
        let index = 0;
        // console.log(this.height);
        // console.log(this.width);
        // Loop over each pixel
        for (let r=0;r<this.height;r++) {
            for (let c=0;c<this.width;c++) {
                let value = noise(r * 0.01, c * 0.01);
                if (c===0)
                console.log(value);

                pixels[index+0]=toFixed(value);
                pixels[index+1]=toFixed(value);
                pixels[index+2]=toFixed(value);
                pixels[index+3]=toFixed(1);
                index+=4;
            }
        }
        // console.log(pixels);
    }
}
