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
    vec2 oldV   = input1Sample(0, 0).xy;
    float pN = input2Sample(0, 1).r;
    float pS = input2Sample(0,-1).r;
    float pE = input2Sample(1, 0).r;
    float pW = input2Sample(-1,0).r;
    float GradientScale = 0.5;//0.9;

    vec2 grad = vec2(pE - pW, pN - pS);
    grad.x *= GradientScale;
    grad.y *= GradientScale;
    vec2 newV = vec2(oldV.x - grad.x, oldV.y - grad.y);

    gl_FragColor = vec4(newV,0,1);
}

//...