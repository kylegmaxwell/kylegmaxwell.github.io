uniform vec4 uInputRes1;
uniform sampler2D sInput1;

uniform vec4 uInputRes2;
uniform sampler2D sInput2;

uniform vec4 uAdvectionScale;

vec2 input1Offset(float xOffset, float yOffset)
{
    return vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes1.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes1.t));
}

vec4 input1Sample(float xOffset, float yOffset)
{
    return texture2D(sInput1, input1Offset(xOffset, yOffset));

}

void main()
{
    float HalfInverseCellSize = -0.5;//0.625;
    vec2 vN = input1Sample(0, 1).xy;
    vec2 vS = input1Sample(0,-1).xy;
    vec2 vW = input1Sample(-1,0).xy;
    vec2 vE = input1Sample( 1,0).xy;

    //float divergence = -0.5*(right.x-left.x + up.y-down.y);

    float divergence = HalfInverseCellSize * (vE.x - vW.x + vN.y - vS.y);
    gl_FragColor = vec4(divergence,divergence,divergence,1);
}

//....