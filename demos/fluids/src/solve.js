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
// @param diffusionScale - related to viscosity
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

// Solve sparse system (Poisson equation) using Gauss-Seidel relaxation (Stam 03)
export function project(width, height, ioVelocity, ioPressure, ioDivergence) {

    // Stam 03
    // div[IX(i, j)] = -0.5 * h * (u[IX(i + 1, j)] - u[IX(i - 1, j)] + v[IX(i, j + 1)] - v[IX(i, j - 1)]);
    // p[IX(i, j)] = 0;
    const h = 1.0 / Math.sqrt(width * height);
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const vxp = ioVelocity.sample2(i + 1, j);
            const vxm = ioVelocity.sample2(i - 1, j);
            const vyp = ioVelocity.sample2(i, j + 1);
            const vym = ioVelocity.sample2(i, j - 1);
            const div = -0.5 * h * (vxp[0] - vxm[0] + vyp[1] - vym[1]);
            ioDivergence.set1(i, j, div);
            ioPressure.set1(i, j, 0.0);
        }
    }

    // Stam 03
    // p[IX(i, j)] = (div[IX(i, j)] + p[IX(i - 1, j)] + p[IX(i + 1, j)] + p[IX(i, j - 1)] + p[IX(i, j + 1)]) / 4;
    const NUM_ITERATIONS = 20;
    for (let k = 0; k < NUM_ITERATIONS; k++) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {

                let p = ioDivergence.sample1(i, j);
                p += ioPressure.sample1(i - 1, j);
                p += ioPressure.sample1(i + 1, j);
                p += ioPressure.sample1(i, j - 1);
                p += ioPressure.sample1(i, j + 1);
                p *= 0.25;
                ioPressure.set1(i, j, p);
            }
        }
    }

    // Stam 03
    // u[IX(i, j)] -= 0.5 * (p[IX(i + 1, j)] - p[IX(i - 1, j)]) / h;
    // v[IX(i, j)] -= 0.5 * (p[IX(i, j + 1)] - p[IX(i, j - 1)]) / h;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

            //copy to next matrix w/o divergance
            let vel = ioVelocity.sample2(i, j);

            vel.x = vel.x - 0.5 *
                (ioPressure.sample1(i + 1, j) - ioPressure.sample1(i - 1, j)) / h;
            vel.y = vel.y - 0.5 *
                (ioPressure.sample1(i, j + 1) - ioPressure.sample1(i, j - 1)) / h;

            ioVelocity.set2(i, j, vel);
        }
    }
}
