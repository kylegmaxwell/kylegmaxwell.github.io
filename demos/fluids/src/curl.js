
import perlinNoise from '../lib/perlin.js'

// Note gl-matrix creates a global object glMatrix
// import * as glm from '../lib/gl-matrix.js'

import { noiseFrequency, differenceFraction } from './constants.js'

export function noise1(x, y, z) {
    return perlinNoise(x, y, z);
}

export function noise13(x) {
    return [
        perlinNoise(x * 0.7),
        perlinNoise(x * 12.5),
        perlinNoise(x * 765.3)
    ];
}

export function noise3(x, y, z) {
    let v = glMatrix.vec3.create();
    v[0] = perlinNoise(x, y, z);
    v[1] = perlinNoise(x + 1234, y + 7777, z);
    v[2] = perlinNoise(x + 76543, y + 11111, z);
    return v;
}

export function curlNoise2(x, y, z) {
    const dx = differenceFraction() * noiseFrequency();
    const dy = differenceFraction() * noiseFrequency();
    const dz = differenceFraction() * noiseFrequency();

    const dbdy = (noise3(x, dy + y, z)[2] - noise3(x, -dy + y, z)[2]) / (2.0 * dy);
    const dgdz = (noise3(x, y, dz + z)[1] - noise3(x, y, -dz + z)[1]) / (2.0 * dz);
    const drdz = (noise3(x, y, dz + z)[0] - noise3(x, y, -dz + z)[0]) / (2.0 * dz);
    const dbdx = (noise3(dx + x, y, z)[2] - noise3(-dx + x, y, z)[2]) / (2.0 * dx);
    // const dgdx = (noise3(dx + x, y, z)[1] - noise3(-dx + x, y, z)[1]) / (2.0 * dx);
    // const drdy = (noise3(x, dy + y, z)[0] - noise3(x, -dy + y, z)[0]) / (2.0 * dy);

    let c = glMatrix.vec2.create();
    c[0] = dbdy - dgdz;
    c[1] = drdz - dbdx;
    // c[2] = 0;//dgdx - drdy; // always zero for 2d 
    // glMatrix.vec2.normalize(c, c);
    return c;
}
