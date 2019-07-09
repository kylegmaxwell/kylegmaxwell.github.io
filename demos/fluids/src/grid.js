// Grid class module

import { baseFrequency, noise3d, curl2d } from './curl.js'

function toIndexHelper(r, c, width) {
    return r * width + c;
}

function sample3Helper(r, c, width, grid) {
    let index = 3 * toIndexHelper(r, c, width);
    let v = glMatrix.vec3.create();
    v[0] = grid[index + 0]
    v[1] = grid[index + 1]
    v[2] = grid[index + 2]
    return v;
}


/**
 * Represents a 2d float32 buffer 
 * {int} width
 * {int} height
 */
export default class Grid {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._channels = 3;
        this._dataArray = new Float32Array(this._channels * this._height * this._width);

        for (let r = 0; r < this._height; r++) {
            for (let c = 0; c < this._width; c++) {
                const index = this._channels * this.toIndex(r, c, this._width);
                for (let channel = 0; channel < this._channels; channel++) {
                    this._dataArray[index + channel] = 0.0;
                }
            }
        }
    }

    static makeCurlGrid(width, height) {
        return this.makeCustomGrid(width, height, curl2d);
    }

    static makeNoiseGrid(width, height) {
        return this.makeCustomGrid(width, height, noise3d);
    }

    // @param valueFunction (row,column)->float3
    static makeCustomGrid(width, height, valueFunction) {
        let grid = new Grid(width, height);
        for (let r = 0; r < grid.height(); r++) {
            for (let c = 0; c < grid.width(); c++) {
                const index = grid.channels() * grid.toIndex(r, c, grid.width);
                const frequency = 10.0 * baseFrequency();
                const sampleX = frequency * c;
                const sampleY = frequency * r;
                const curl = valueFunction(sampleX, sampleY);
                const vectorSize = 3;
                for (let channel = 0; channel < grid.channels() && channel < vectorSize; channel++) {
                    grid._dataArray[index + channel] = curl[channel];
                }
            }
        }
        return grid;
    }

    width() {
        return this._width;
    }

    height() {
        return this._height;
    }


    channels() {
        return this._channels;
    }
    toIndex(r, c) {
        return toIndexHelper(r, c, this._width);
    }
    sample3(r, c) {
        return sample3Helper(r, c, this._width, this._dataArray);
    }
}