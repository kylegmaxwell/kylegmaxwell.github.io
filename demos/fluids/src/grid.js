// Grid class module

// Note gl-matrix creates a global object glMatrix
import * as glm from '../lib/gl-matrix.js'

import { noise1, curlNoise2 } from './curl.js'
import * as constants from './constants.js'

// hidden variables to save on re-allocation for every call
let lerpTmV = glMatrix.vec2.create();
let lerpTpV = glMatrix.vec2.create();
let tmpV1 = glMatrix.vec2.create();
let tmpV2 = glMatrix.vec2.create();

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
            this._channels = 2;
        } else {
            this._channels = channels;
        }
        this._dataArray = new Float32Array(this._channels * this._height * this._width);

        for (let r = 0; r < this._height; r++) {
            for (let c = 0; c < this._width; c++) {
                const index = this.toIndexRowColumn(r, c);
                for (let channel = 0; channel < this._channels; channel++) {
                    this._dataArray[index + channel] = 0.0;
                }
            }
        }
    }

    static makeCurlGrid(width, height, z, scale) {
        const frequency = 1.0;
        return this.makeCustomGrid(width, height, 2, (x, y) => {
            let curlVec = curlNoise2(frequency * x, frequency * y, z);
            glMatrix.vec2.scale(curlVec, curlVec, scale);
            return curlVec;
        });
    }

    static makeNoiseGrid(width, height, z) {
        return this.makeCustomGrid(width, height, (x, y) => { return [noise1(x, y, z)]; });
    }

    // @param valueFunction (row,column)->float(s)
    static makeCustomGrid(width, height, channels, valueFunction) {
        let grid = new Grid(width, height, channels);
        grid.setCustomValues(valueFunction);
        return grid;
    }

    static makeUniformGrid1Channel(width, height, value) {
        const channels = 1;
        let grid = new Grid(width, height, channels);
        grid.eachCellRowColumn((r, c) => {
            const index = grid.toIndexRowColumn(r, c);
            grid._dataArray[index] = value;
        });
        return grid;
    }

    eachIndex(operation) {
        for (let r = 0; r < this._height; r++) {
            for (let c = 0; c < this._width; c++) {
                const index = this.toIndexRowColumn(r, c);
                for (let channel = 0; channel < this.channels(); channel++) {
                    operation(index + channel);
                }
            }
        }
    }

    eachCellRowColumn(operation) {
        for (let r = 0; r < this._height; r++) {
            for (let c = 0; c < this._width; c++) {
                for (let channel = 0; channel < this.channels(); channel++) {
                    operation(r, c);
                }
            }
        }
    }

    // @param valueFunction (row,column)->float(s)
    setCustomValues(valueFunction) {
        for (let r = 0; r < this._height; r++) {
            for (let c = 0; c < this._width; c++) {
                const index = this.toIndexRowColumn(r, c);
                const frequency = constants.noiseFrequency();
                const sampleX = frequency * c;
                const sampleY = frequency * r;
                const vecValue = valueFunction(sampleX, sampleY);
                for (let channel = 0; channel < this.channels(); channel++) {
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

    toIndexXYC(x, y, channel) {
        return this._channels * ((y * this._width) + x) + channel;
    }

    toIndexXY(x, y) {
        return this._channels * ((y * this._width) + x);
    }

    toIndexRowColumn(r, c) {
        return this._channels * ((r * this._width) + c);
    }

    copy(sourceGrid) {
        this.copySubGrid(sourceGrid, 0, 0, this._width, this._height);
    }

    // Copy a rectangular region from other grid into this one
    copySubGrid(sourceGrid, startRow, startColumn, width, height) {
        const endRow = startRow + height - 1;
        const endColumn = startColumn + width - 1;
        if (startRow < 0 || startColumn < 0 || endRow >= this._height || endColumn >= this._width) {
            throw new Error("Grid index out of bounds");
        }
        for (let r = startRow; r <= endRow; r++) {
            for (let c = startColumn; c <= endColumn; c++) {
                const index = this.toIndexRowColumn(r, c);
                for (let channel = 0; channel < this._channels; channel++) {
                    this._dataArray[index + channel] = sourceGrid._dataArray[index + channel];
                }
            }
        }
    }

    // Add value to a rectangular region from value of vector
    addRegion(v, channels, startRow, startColumn, width, height, scale) {
        const endRow = startRow + height - 1;
        const endRowClamped = Math.min(Math.max(0, endRow), this._height - 1);
        const endColumn = startColumn + width - 1;
        const endColumnClamped = Math.min(Math.max(0, endColumn), this._width - 1);
        const startRowClamped = Math.min(Math.max(0, startRow), this._height - 1);
        const startColumnClamped = Math.min(Math.max(0, startColumn), this._width - 1);
        for (let r = startRowClamped; r <= endRowClamped; r++) {
            for (let c = startColumnClamped; c <= endColumnClamped; c++) {
                const index = this.toIndexRowColumn(r, c);
                for (let channel = 0; channel < channels; channel++) {
                    this._dataArray[index + channel] += v[channel] * scale;
                }
            }
        }
    }

    getCurl2(x, y) {
        if (this._channels !== 2) {
            throw "Wrong sample function";
        }
        // partial of channel0 with respect to y
        const d0dy = this.get(x, y + 1, 0) - this.get(x, y - 1, 0);
        const d1dx = this.get(x - 1, y, 1) - this.get(x + 1, y, 1);
        return d0dy + d1dx;
    }

    setBoundary(channelCount) {
        // vector velocity has slightly different boundary conditions
        const isV = channelCount === 2;
        for (let channel = 0; channel < channelCount; channel++) {
            const isX = isV && channel === 0;
            const xFlip = isX ? -1 : 1;
            const isY = isV && channel === 1;
            const yFlip = isY ? -1 : 1;
            // left and right, skipping corners
            const maxX = this._width - 1;
            const maxY = this._height - 1;
            for (let i = 1; i < maxY; i++) {
                // x[IX(0, i)] = b == 1 ?–x[IX(1, i)] : x[IX(1, i)];
                // x[IX(N + 1, i)] = b == 1 ?–x[IX(N, i)] : x[IX(N, i)];
                this.set(0, i, channel, xFlip * this.get(1, i, channel));
                this.set(maxX, i, channel, xFlip * this.get(maxX - 1, i, channel));
            }
            // top and bottom, skipping corners
            for (let j = 1; j < maxX; j++) {
                // x[IX(i, 0)] = b == 2 ?–x[IX(i, 1)] : x[IX(i, 1)];
                // x[IX(i, N + 1)] = b == 2 ?–x[IX(i, N)] : x[IX(i, N)];
                this.set(j, 0, channel, yFlip * this.get(j, 1, channel));
                this.set(j, maxY, channel, yFlip * this.get(j, maxY - 1, channel));
            }
            // x[IX(0, 0)] = 0.5 * (x[IX(1, 0)] + x[IX(0, 1)]);
            // x[IX(0, N + 1)] = 0.5 * (x[IX(1, N + 1)] + x[IX(0, N)]);
            // x[IX(N + 1, 0)] = 0.5 * (x[IX(N, 0)] + x[IX(N + 1, 1)]);
            // x[IX(N + 1, N + 1)] = 0.5 * (x[IX(N, N + 1)] + x[IX(N + 1, N)]);
            this.set(0, 0, channel, 0.5 * (this.get(1, 0, channel) + this.get(0, 1, channel)));
            this.set(0, maxY, channel, 0.5 * (this.get(1, maxY, channel) + this.get(0, maxY - 1, channel)));
            this.set(maxX, 0, channel, 0.5 * (this.get(maxX - 1, 0, channel) + this.get(maxX, 1, channel)));
            this.set(maxX, maxY, channel, 0.5 * (this.get(maxX - 1, maxY, channel) + this.get(maxX, maxY - 1, channel)));
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

    set(x, y, channel, value) {
        if (channel >= this._channels) {
            throw "Invalid channel index";
        }
        if (isNaN(value)) {
            throw ("Nan value in set");
        }
        const index = this.toIndexXYC(x, y, channel);
        this._dataArray[index] = value;
    }

    get(x, y, channel) {
        if (channel >= this._channels) {
            throw "Invalid channel index";
        }
        const index = this.toIndexXYC(x, y, channel);
        return this._dataArray[index];
    }

    set1(x, y, value) {
        if (this._channels !== 1) {
            throw "Wrong sample function";
        }
        if (isNaN(value)) {
            throw ("Nan value in set1");
        }
        let index = this.toIndexXY(x, y);
        this._dataArray[index] = value;
    }

    set2(x, y, value) {
        if (this._channels !== 2) {
            throw "Wrong sample function";
        }
        if (isNaN(value[0] || isNaN(value[1]))) {
            throw ("Nan value in set2");
        }
        let index = this.toIndexXY(x, y);
        this._dataArray[index + 0] = value[0];
        this._dataArray[index + 1] = value[1];
    }

    sample1(x, y) {
        if (this._channels !== 1) {
            throw "Wrong sample function";
        }
        let index = this.toIndexXY(x, y);
        let value = 0.0;
        if (y < 0 || x < 0 || y >= this._height || x >= this._width) {
            // Empty boundary condition
            return value;
        }
        value = this._dataArray[index]
        return value;
    }

    sample1Interp(x, y) {
        // Bilinear interpolate
        // m is for minus, p is for plus
        const ym = Math.floor(y);
        const yp = Math.ceil(y);
        const t = (y - ym);//(rp-rm should be 1)
        const tm = 1.0 - t;
        const xm = Math.floor(x);
        const xp = Math.ceil(x);
        const u = (x - xm);//(cp-cm should be 1)
        const um = 1.0 - u;

        // vertical lerp left side
        let lerpTm = tm * this.sample1(xm, ym) + t * this.sample1(xm, yp);
        // vertical lerp right side
        let lerpTp = tm * this.sample1(xp, ym) + t * this.sample1(xp, yp);
        // horizontal lerp both
        let lerpBoth = um * lerpTm + u * lerpTp;
        return lerpBoth;
    }

    sample2(x, y, value) {
        if (this._channels !== 2) {
            throw "Wrong sample function";
        }
        let index = this.toIndexXY(x, y);
        if (y < 0 || x < 0 || y >= this._height || x >= this._width) {
            value[0] = 0;
            value[1] = 0;
            // Empty boundary condition
            return value;
        }
        value[0] = this._dataArray[index + 0]
        if (isNaN(value[0])) {
            throw ("Nan value in sample2");
        }
        value[1] = this._dataArray[index + 1]
        return value;
    }


    sample2Nearest(x, y, value) {
        return this.sample2(
            Math.min(this._width, Math.max(0, Math.floor(x))),
            Math.min(this._height, Math.max(0, Math.floor(y))),
            value
        );
    }

    // rp,cm  rp,cp
    // rm,cm  rm,cp
    sample2Interp(x, y, result) {
        // Bilinear interpolate
        const ym = Math.floor(y);
        const yp = Math.ceil(y);
        const t = (y - ym);//(rp-rm should be 1)
        const xm = Math.floor(x);
        const xp = Math.ceil(x);
        const u = (x - xm);//(cp-cm should be 1)

        // vertical lerp left side
        glMatrix.vec2.lerp(lerpTmV, this.sample2(xm, ym, tmpV1), this.sample2(xm, yp, tmpV2), t);
        // vertical lerp right side
        glMatrix.vec2.lerp(lerpTpV, this.sample2(xp, ym, tmpV1), this.sample2(xp, yp, tmpV2), t);
        // horizontal lerp both
        glMatrix.vec2.lerp(result, lerpTmV, lerpTpV, u);
        return result;
    }
}