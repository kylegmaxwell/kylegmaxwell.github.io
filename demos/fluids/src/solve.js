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
