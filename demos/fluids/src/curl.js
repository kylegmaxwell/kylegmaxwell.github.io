
import noise from '../lib/perlin.js'

// Note gl-matrix creates a global object glMatrix
import * as glm from '../lib/gl-matrix.js'

function noise3d(x, y)
{
    let v = glMatrix.vec3.create();
    v[0] = noise(x,y);
    v[1] = noise(x+1234,y+7777);
    v[2] = noise(x+76543,y+11111);
    return v; 
}

export function curl2d(x, y)
{
    const dx = 0.01;
    const dy = 0.01;

    const dbdy = noise3d(x, dy+y)[2] - noise3d(x, -dy+y)[2];
    const dgdz = 0.0;
    const drdz = 0.0;
    const dbdx = noise3d(dx+x, y)[2] - noise3d(-dx+x, y)[2];
    const dgdx = noise3d(dx+x, y)[1] - noise3d(-dx+x, y)[1];
	const drdy = noise3d(x, dy+y)[0] - noise3d(x, -dy+y)[0];

    let c = glMatrix.vec3.create();
    c[0] = dbdy-dgdz;
    c[1] = drdz-dbdx;
    c[2] = dgdx-drdy;
    glMatrix.vec3.normalize(c,c);
    return c;
}
