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
    // vec2 pos = vec2(0, 0);
    // vec4 vNew = input2Sample(pos.x, pos.y);
    // pos -= vec2(vNew.x * uAdvectionScale.x, vNew.y * uAdvectionScale.y);
    // vNew = input2Sample(pos.x, pos.y);


    // vec4 sample = input1Sample(pos.x, pos.y);

    // gl_FragColor = sample;
}
//.... Density?
