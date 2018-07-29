uniform vec4 uInputRes1;
uniform sampler2D sInput1;

uniform vec4 uInputRes2;
uniform sampler2D sInput2;

uniform vec4 uAdvectionScale;

vec4 input1Sample(float xOffset, float yOffset)
{
    return texture2D(sInput1, vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes1.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes1.t)));
}

void main()
{
    vec2 pos = vec2(0,0);

    vec2 vNew = input1Sample(pos.x,pos.y).xy; // sample velocity
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);

    vNew = input1Sample(pos.x,pos.y).xy;
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);

    vNew = input1Sample(pos.x,pos.y).xy;
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);

    vNew = input1Sample(pos.x,pos.y).xy;
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);

    gl_FragColor = vec4(vNew,0,1);
}
//....