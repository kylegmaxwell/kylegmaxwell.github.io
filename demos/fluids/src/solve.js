// Note gl-matrix creates a global object glMatrix
// import * as glm from '../lib/gl-matrix.js'

import { advectionScale } from './constants.js'

// Advect colors by velocity to get movement
// Both colors and velocities must be 3 components
export function advect(dt, width, height, source, destination, velocities) {
    const scale = advectionScale() * dt;
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const velocity = velocities.sample3(c, r);
            const sample = source.sample3Interp(c - velocity[1] * scale, r - velocity[0] * scale);
            destination.set3(c, r, sample);
        }
    }
}

export function project(dt, width, height, inVelocity, outVelocity, ioDivergence, ioPressure) {

    // Init buffers
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const vxp = inVelocity.sample3(r + 1, c);
            const vxm = inVelocity.sample3(r - 1, c);
            const vyp = inVelocity.sample3(r, c + 1);
            const vym = inVelocity.sample3(r, c - 1);
            const curl = -0.5 * (vxp[0] - vxm[0] + vyp[1] - vym[1]);
            ioDivergence.set1(r, c, curl);
            ioPressure.set1(r, c, 0.0);
        }
    }

    // diffuse the divergence or pressure?
    const NUM_ITERATIONS = 20;
    for (let i = 0; i < NUM_ITERATIONS; i++) {
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {

                let cellDensity = ioDivergence.sample1(r, c);

                cellDensity += ioPressure.sample1(r - 1, c);
                cellDensity += ioPressure.sample1(r + 1, c);
                cellDensity += ioPressure.sample1(r, c - 1);
                cellDensity += ioPressure.sample1(r, c + 1);
                cellDensity *= 0.25; // average? TODO 
                ioPressure.set1(r, c, cellDensity);
            }
        }
    }

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {

            //copy to next matrix w/o divergance
            let vel = inVelocity.sample3(r, c);

            let outVel = glMatrix.vec3.create();

            outVel.x = vel.x - 0.5 *
                (ioPressure.sample1(r + 1, c) - ioPressure.sample1(r - 1, c));

            outVel.y = vel.y - 0.5 *
                (ioPressure.sample1(r, c + 1) - ioPressure.sample1(r, c - 1));

            outVelocity.set3(r, c, outVel);
        }
    }
}
