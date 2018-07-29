uniform vec4 uInputRes1;
uniform sampler2D sInput1;

vec2 input1Offset(int xOffset, int yOffset)
{
    return vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes1.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes1.t));
}

void main()
{
    float dwx = 0.5*(length(texture2D(sInput1, input1Offset(1, 0)).b)-length(texture2D(sInput1, input1Offset(-1, 0)).b));
    float dwy = 0.5*(length(texture2D(sInput1, input1Offset(0, 1)).b)-length(texture2D(sInput1, input1Offset(0, -1)).b));
    float wz = texture2D(sInput1, input1Offset(0, 0)).b;

    float wlen = length(vec2(dwx, dwy));
    if (wlen > 0.01) {
        dwx /= wlen;
        dwy /= wlen;
    }
    //vec4 colorSum = vec4(dwx/wlen, dwy/wlen, wz, 1.0);
    vec4 colorSum = vec4(dwy*wz, -dwx*wz, 0.0, 0.0);
    gl_FragColor = colorSum;
}
//...