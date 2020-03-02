// Note gl-matrix creates a global object glMatrix
// import * as glm from '../lib/gl-matrix.js'

import { advectionScale } from './constants.js'

// Advect colors by velocity to get movement
// Both colors and velocities must be 3 components
export function advect(dt, width, height, source, destination, velocities) {
    const scale = advectionScale();
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const velocity = velocities.sample3(r, c);
            const sample = source.sample3Interp(r - velocity[0] * scale, c - velocity[1] * scale);
            destination.set3(r, c, sample);
        }
    }
}

export function project(dt, width, height, inVelocity, outVelocity, inColor, outColor, ioDivergence, ioDensity) {
    // const scale = advectionScale();
    // for (let r = 0; r < height; r++) {
    //     for (let c = 0; c < width; c++) {
    //         const velocity = velocities.sample3(r, c);
    //         const sample = source.sample3Interp(r - velocity[0] * scale, c - velocity[1] * scale);
    //         destination.set3(r, c, sample);
    //     }
    // }

    // Init buffers
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const vxp = inVelocity.sample3(r + 1, c);
            const vxm = inVelocity.sample3(r - 1, c);
            const vyp = inVelocity.sample3(r, c + 1);
            const vym = inVelocity.sample3(r, c - 1);
            const curl = -0.5 * (vxp[0] - vxm[0] + vyp[1] - vym[1]);
            ioDivergence.set1(r, c, curl);
            ioDensity.set1(r, c, 0.0);
        }
    }

    //diffuse the divergence?
    // const NUM_ITERATIONS = 20;
    // for (let i = 0; i < NUM_ITERATIONS; i++) {
    //     for (let r = 0; r < height; r++) {
    //         for (let c = 0; c < width; c++) {

    //             const s = r;
    //             const t = c;

    //             let cellDensity = ioDivergence.sample1(s, t);

    //             s = r - 1, t = c;
    //             fix(s, t);//bound indicies into array
    //             cellDensity += ioDensity[s][t];

    //             s = r + 1, t = c;
    //             fix(s, t);//bound indicies into array
    //             cellDensity += ioDensity[s][t];

    //             s = r, t = c - 1;
    //             fix(s, t);//bound indicies into array
    //             cellDensity += ioDensity[s][t];

    //             s = r, t = c + 1;
    //             fix(s, t);//bound indicies into array
    //             cellDensity += ioDensity[s][t];

    //             cellDensity /= 4;
    //             ioDensity.set3(r, c, cellDensity);
    //         }
    //     }
    //     set_boundary();
    // }

    // for (int r = 0; r < SYSTEM_SIZE; r++)
    // {
    //     for (int c = 0; c < SYSTEM_SIZE; c++)
    //     {
    //         int w = r + 1, x = c, y = r - 1, z = c;
    //         fix(w, x);
    //         fix(y, z);

    //         int ww = r, xx = c + 1, yy = r, zz = c - 1;
    //         fix(ww, xx);
    //         fix(yy, zz);

    //         //copy to next matrix w/o divergance
    //         nex(r, c) -> vel=vec3(cur(r, c) -> vel.x - 0.5 * (ioDensity[w][x] - ioDensity[y][z]),
    //             cur(r, c) -> vel.y - 0.5 * (ioDensity[ww][xx] - ioDensity[yy][zz]), 0);
    //         //preserve density
    //         nex(r, c) -> p=(cur(r, c) -> p);
    //         nex(r, c) -> t=(cur(r, c) -> t);
    //     }
    // }
    // set_boundary();

}
