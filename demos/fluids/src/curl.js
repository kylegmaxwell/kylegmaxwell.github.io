
import noise from '../lib/perlin.js'

// Note gl-matrix creates a global object glMatrix
import * as glm from '../lib/gl-matrix.js'

import { noiseFrequency, differenceFraction } from './constants.js'

export function noise3d(x, y) {
    let v = glMatrix.vec3.create();
    v[0] = noise(x, y);
    v[1] = noise(x + 1234, y + 7777);
    v[2] = noise(x + 76543, y + 11111);
    return v;
}

export function curl2d(x, y) {
    const dx = differenceFraction() * noiseFrequency();
    const dy = differenceFraction() * noiseFrequency();

    const dbdy = (noise3d(x, dy + y)[2] - noise3d(x, -dy + y)[2]) / (2.0 * dy);
    const dgdz = 0.0;
    const drdz = 0.0;
    const dbdx = (noise3d(dx + x, y)[2] - noise3d(-dx + x, y)[2]) / (2.0 * dx);
    const dgdx = (noise3d(dx + x, y)[1] - noise3d(-dx + x, y)[1]) / (2.0 * dx);
    const drdy = (noise3d(x, dy + y)[0] - noise3d(x, -dy + y)[0]) / (2.0 * dy);

    let c = glMatrix.vec3.create();
    c[0] = dbdy - dgdz;
    c[1] = drdz - dbdx;
    c[2] = dgdx - drdy;
    // glMatrix.vec3.normalize(c, c);
    return c;
}
