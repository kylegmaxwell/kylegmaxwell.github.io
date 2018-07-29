uniform vec4 uInputRes1;
uniform sampler2D sInput1;

uniform vec4 uInputRes2;
uniform sampler2D sInput2;

uniform vec4 uAdvectionScale;

vec2 input1Offset(float xOffset, float yOffset)
{
    return vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes1.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes1.t));
}

vec2 input2Offset(float xOffset, float yOffset)
{
    return vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes2.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes2.t));
}

vec4 input1Sample(float xOffset, float yOffset)
{
    return texture2D(sInput1, input1Offset(xOffset, yOffset));

}

vec4 input2Sample(float xOffset, float yOffset)
{
    return texture2D(sInput2, input2Offset(xOffset, yOffset));
}

void main()
{
    vec2 pos = vec2(0,0);
    vec4 vNew = input2Sample(pos.x,pos.y);
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);
    vNew = input2Sample(pos.x,pos.y);
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);
    vNew = input2Sample(pos.x,pos.y);
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);
    vNew = input2Sample(pos.x,pos.y);
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);
    vNew = input2Sample(pos.x,pos.y);
    pos -= vec2(vNew.x*uAdvectionScale.x,vNew.y*uAdvectionScale.y);

    vec4 sample = input1Sample(pos.x,pos.y);

    gl_FragColor = sample;
}
//.... Density?
