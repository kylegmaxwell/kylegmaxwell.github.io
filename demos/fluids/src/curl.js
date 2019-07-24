
import noise from '../lib/perlin.js'

// Note gl-matrix creates a global object glMatrix
import * as glm from '../lib/gl-matrix.js'

import { noiseFrequency, differenceFraction } from './constants.js'

export function noise3(x, y, z) {
    let v = glMatrix.vec3.create();
    v[0] = noise(x, y, z);
    v[1] = noise(x + 1234, y + 7777, z);
    v[2] = noise(x + 76543, y + 11111, z);
    return v;
}

export function curl3(x, y, z) {
    const dx = differenceFraction() * noiseFrequency();
    const dy = differenceFraction() * noiseFrequency();

    const dbdy = (noise3(x, dy + y, z)[2] - noise3(x, -dy + y, z)[2]) / (2.0 * dy);
    const dgdz = 0.0; // not needed for 2d output
    const drdz = 0.0;
    const dbdx = (noise3(dx + x, y, z)[2] - noise3(-dx + x, y, z)[2]) / (2.0 * dx);
    const dgdx = (noise3(dx + x, y, z)[1] - noise3(-dx + x, y, z)[1]) / (2.0 * dx);
    const drdy = (noise3(x, dy + y, z)[0] - noise3(x, -dy + y, z)[0]) / (2.0 * dy);

    let c = glMatrix.vec3.create();
    c[0] = dbdy - dgdz;
    c[1] = drdz - dbdx;
    c[2] = dgdx - drdy; // always zero for 2d 
    // glMatrix.vec3.normalize(c, c);
    return c;
}
