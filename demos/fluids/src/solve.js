// Note gl-matrix creates a global object glMatrix
// import * as glm from '../lib/gl-matrix.js'

import { advectionScale } from './constants.js'

const diffusionScale = 0.001;

// Advect colors by velocity to get movement
// Both colors and velocities must be 2 components
export function advect2(dt, width, height, source, destination, velocities) {
    const scale = advectionScale() * dt;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const velocity = velocities.sample2(x, y);
            const sample = source.sample2Interp(x - velocity[0] * scale, y - velocity[1] * scale);
            destination.set2(x, y, sample);
        }
    }
}

export function advect1(dt, width, height, source, destination, velocities) {
    const scale = advectionScale() * dt;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const velocity = velocities.sample2(x, y);
            const sample = source.sample1Interp(x - velocity[0] * scale, y - velocity[1] * scale);
            destination.set1(x, y, sample);
        }
    }
}

// diffusion based solver using Gauss-Seidel relaxation from Stam 03
export function diffuse1(dt, diffusionScale, width, height, inDensity, outDensity) {
    const a = dt * diffusionScale * width * height;
    const NUM_ITERATIONS = 20;
    for (let k = 0; k < NUM_ITERATIONS; k++) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                // Evaluate this formula in terms of glmatrix operations
                // outDensity = (inDensity + a*neighborsum)/(1+4*a);

                // sum neighbors
                let result = (
                    a *
                    (
                        outDensity.sample1(i - 1, j) +
                        outDensity.sample1(i + 1, j) +
                        outDensity.sample1(i, j - 1) +
                        outDensity.sample1(i, j + 1)
                    ) + inDensity.sample1(i, j)
                ) / (1 + 4 * a);
                outDensity.set1(i, j, result);
            }
        }
    }
}

// diffusion based solver using Gauss-Seidel relaxation from Stam 03
export function diffuse2(dt, diffusionScale, width, height, inDensity, outDensity) {
    const a = dt * diffusionScale * width * height;
    const NUM_ITERATIONS = 20;
    // let neighborSum = glMatrix.vec2.create();
    let result = glMatrix.vec2.create();
    for (let k = 0; k < NUM_ITERATIONS; k++) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                // Evaluate this formula in terms of glmatrix operations
                // outDensity = (inDensity + a*neighborsum)/(1+4*a);

                // sum neighbors
                glMatrix.vec2.add(result,
                    outDensity.sample2(i - 1, j), outDensity.sample2(i + 1, j));
                glMatrix.vec2.add(result, result,
                    outDensity.sample2(i, j - 1));
                glMatrix.vec2.add(result, result,
                    outDensity.sample2(i, j + 1));
                // times a
                glMatrix.vec2.scale(result, result, a);
                // add input
                glMatrix.vec2.add(result, result, inDensity.sample2(i, j));
                // divide by scale
                glMatrix.vec2.scale(result, result, 1 / (1 + 4 * a));
                outDensity.set2(i, j, result);
            }
        }
    }
}

export function project(dt, width, height, inVelocity, outVelocity, ioDivergence, ioPressure) {

    // // Init buffers
    // for (let r = 0; r < height; r++) {
    //     for (let c = 0; c < width; c++) {
    //         const vxp = inVelocity.sample2(r + 1, c);
    //         const vxm = inVelocity.sample2(r - 1, c);
    //         const vyp = inVelocity.sample2(r, c + 1);
    //         const vym = inVelocity.sample2(r, c - 1);
    //         const curl = -0.5 * (vxp[0] - vxm[0] + vyp[1] - vym[1]);
    //         ioDivergence.set1(r, c, curl);
    //         ioPressure.set1(r, c, 0.0);
    //     }
    // }

    // // diffuse the divergence or pressure?
    // const NUM_ITERATIONS = 20;
    // for (let i = 0; i < NUM_ITERATIONS; i++) {
    //     for (let r = 0; r < height; r++) {
    //         for (let c = 0; c < width; c++) {

    //             let cellDensity = ioDivergence.sample1(r, c);

    //             cellDensity += ioPressure.sample1(r - 1, c);
    //             cellDensity += ioPressure.sample1(r + 1, c);
    //             cellDensity += ioPressure.sample1(r, c - 1);
    //             cellDensity += ioPressure.sample1(r, c + 1);
    //             cellDensity *= 0.25; // average? TODO 
    //             ioPressure.set1(r, c, cellDensity);
    //         }
    //     }
    // }

    // for (let r = 0; r < height; r++) {
    //     for (let c = 0; c < width; c++) {

    //         //copy to next matrix w/o divergance
    //         let vel = inVelocity.sample2(r, c);

    //         let outVel = glMatrix.vec2.create();

    //         outVel.x = vel.x - 0.5 *
    //             (ioPressure.sample1(r + 1, c) - ioPressure.sample1(r - 1, c));

    //         outVel.y = vel.y - 0.5 *
    //             (ioPressure.sample1(r, c + 1) - ioPressure.sample1(r, c - 1));

    //         outVelocity.set2(r, c, outVel);
    //     }
    // }
}
