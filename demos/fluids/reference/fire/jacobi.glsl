uniform vec4 uInputRes1;
uniform sampler2D sInput1;

uniform vec4 uInputRes2;
uniform sampler2D sInput2;

uniform vec4 uAdvectionScale;

vec4 input1Sample(int xOffset, int yOffset)
{
    return texture2D(sInput1, vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes1.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes1.t)));

}

vec4 input2Sample(int xOffset, int yOffset)
{
    return texture2D(sInput2, vec2(gl_TexCoord[1].s + (float(xOffset) * uInputRes2.s), gl_TexCoord[1].t + (float(yOffset) * uInputRes2.t)));

}

void main()
{
    float a = 0.01;//diffusionConstant
    vec4 velocity    = input2Sample(0, 0);

    vec4 vdUp    = input1Sample(0, 1);
    vec4 vdDown  = input1Sample(0,-1);
    vec4 vdRight = input1Sample(1, 0);
    vec4 vdLeft  = input1Sample(-1,0);

    velocity.x = velocity.x-a*(vdUp.x+vdDown.x+vdRight.x+vdLeft.x)/(1+4*a);

    velocity.y = velocity.y-a*(vdUp.y+vdDown.y+vdRight.y+vdLeft.y)/(1+4*a);

    gl_FragColor = velocity;
}

//...