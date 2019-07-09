// Note gl-matrix creates a global object glMatrix
import * as glm from '../lib/gl-matrix.js'

// Helpers to advect fluid

function toIndex(r, c, width) {
    return r * width + c;
}

function sample(r, c, width, grid) {
    let index = 3 * toIndex(r, c, width);
    let v = glMatrix.vec3.create();
    v[0] = grid[index + 0]
    v[1] = grid[index + 1]
    v[2] = grid[index + 2]
    return v;
}

// Advect colors by velocity to get movement
// Both colors and velocities must be 3 components
export function advect(dt, width, height, source, destination, velocities) {
    console.log("advect", dt);
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const color = sample(r, c, width, source);
            const velocity = sample(r, c, width, velocities);
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
