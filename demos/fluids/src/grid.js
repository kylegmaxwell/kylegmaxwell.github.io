// Grid class module

// Note gl-matrix creates a global object glMatrix
import * as glm from '../lib/gl-matrix.js'

import { noise3, curl3 } from './curl.js'
import { noiseFrequency } from './constants.js'

/**
 * Represents a 2d float32 buffer 
 * {int} width
 * {int} height
 */
export default class Grid {
    constructor(width, height, channels) {
        this._width = width;
        this._height = height;
        if (channels == null) {
            this._channels = 3;
        }
        this._dataArray = new Float32Array(this._channels * this._height * this._width);

        for (let r = 0; r < this._height; r++) {
            for (let c = 0; c < this._width; c++) {
                const index = this.toIndex(r, c);
                for (let channel = 0; channel < this._channels; channel++) {
                    this._dataArray[index + channel] = 0.0;
                }
            }
        }
    }

    static makeCurlGrid(width, height, z) {
        return this.makeCustomGrid(width, height, (x, y) => { return curl3(x, y, z); });
    }

    static makeNoiseGrid(width, height, z) {
        return this.makeCustomGrid(width, height, (x, y) => { return noise3(x, y, z); });
    }

    // @param valueFunction (row,column)->float3
    static makeCustomGrid(width, height, valueFunction) {
        let grid = new Grid(width, height);
        grid.setCustomValues(valueFunction);
        return grid;
    }

    static makeUniformGrid1Channel(width, height, value) {
        const channels = 1;
        let grid = new Grid(width, height, channels);
        grid.eachIndex((r, c) => {
            const index = this.toIndex(r, c);
            this._dataArray[index] = value;
        });
        return grid;
    }

    eachIndex(operation) {
        for (let r = 0; r < this.height(); r++) {
            for (let c = 0; c < this.width(); c++) {
                const index = this.toIndex(r, c);
                for (let channel = 0; channel < this.channels(); channel++) {
                    operation(index + channel);
                }
            }
        }
    }

    // @param valueFunction (row,column)->float3
    setCustomValues(valueFunction) {
        for (let r = 0; r < this.height(); r++) {
            for (let c = 0; c < this.width(); c++) {
                const index = this.toIndex(r, c);
                const frequency = noiseFrequency();
                const sampleX = frequency * c;
                const sampleY = frequency * r;
                const vecValue = valueFunction(sampleX, sampleY);
                const vectorSize = 3;
                for (let channel = 0; channel < this.channels() && channel < vectorSize; channel++) {
                    this._dataArray[index + channel] = vecValue[channel];
                }
            }
        }
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
        return this._channels * ((r * this._width) + c);
    }

    // Copy a rectangular region from other grid into this one
    copySubGrid(sourceGrid, startRow, startColumn, width, height) {
        const endRow = startRow + height;
        const endColumn = startColumn + width;
        if (startRow < 0 || startColumn < 0 || endRow >= this._height || endColumn >= this._width) {
            throw new Error("Grid index out of bounds");
        }
        for (let r = startRow; r < endRow; r++) {
            for (let c = startColumn; c < endColumn; c++) {
                const index = this.toIndex(r, c);
                for (let channel = 0; channel < this._channels; channel++) {
                    this._dataArray[index + channel] = sourceGrid._dataArray[index + channel];
                }
            }
        }
    }

    // Dampen by an exponential factor
    // TODO this should use an exponential decay function to be time step aware
    dampen(factor) {
        // let self = index;
        this.eachIndex((index) => {
            this._dataArray[index] = factor * this._dataArray[index];
        });
    }

    set1(r, c, value) {
        let index = this.toIndex(r, c);
        this._dataArray[index] = value[0];
    }

    set3(r, c, value) {
        let index = this.toIndex(r, c);
        this._dataArray[index + 0] = value[0];
        this._dataArray[index + 1] = value[1];
        this._dataArray[index + 2] = value[2];
    }

    sample3(r, c) {
        // return sample3Helper(r, c, this._width, this._dataArray);
        let index = this.toIndex(r, c);
        let value = glMatrix.vec3.create();
        if (r < 0 || c < 0 || r >= this._height || c >= this._width) {
            // Empty boundary condition
            return value;
        }
        value[0] = this._dataArray[index + 0]
        value[1] = this._dataArray[index + 1]
        value[2] = this._dataArray[index + 2]
        return value;
    }


    sample3Nearest(r, c) {
        return this.sample3(
            Math.min(this._height, Math.max(0, Math.floor(r))),
            Math.min(this._width, Math.max(0, Math.floor(c))));
    }

    // rp,cm  rp,cp
    // rm,cm  rm,cp
    sample3Interp(r, c) {
        // Bilinear interpolate
        const rm = Math.floor(r);
        const rp = Math.ceil(r);
        const t = (r - rm);//(rp-rm should be 1)
        const cm = Math.floor(c);
        const cp = Math.ceil(c);
        const u = (c - cm);//(cp-cm should be 1)

        let lerpTp = glMatrix.vec3.create();
        let lerpTm = glMatrix.vec3.create();
        // vertical lerp left side
        glMatrix.vec3.lerp(lerpTm, this.sample3(rm, cm), this.sample3(rp, cm), t);
        // vertical lerp right side
        glMatrix.vec3.lerp(lerpTp, this.sample3(rm, cp), this.sample3(rp, cp), t);
        // horizontal lerp both
        let lerpBoth = glMatrix.vec3.create();
        glMatrix.vec3.lerp(lerpBoth, lerpTm, lerpTp, u);
        return lerpBoth;
    }
}