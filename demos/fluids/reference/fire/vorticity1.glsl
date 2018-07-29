uniform vec4 uInputRes1;
uniform sampler2D sInput1;

vec2 input1Offset(int xOffset, int yOffset)
{
    return vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes1.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes1.t));
}

void main()
{
    float dgdx = texture2D(sInput1, input1Offset(1, 0)).g - texture2D(sInput1, input1Offset(-1, 0)).g;
    float drdy = texture2D(sInput1, input1Offset(0, 1)).r - texture2D(sInput1, input1Offset(0, -1)).r;

    vec3 w = vec3(0.0, 0.0, 0.5*(dgdx - drdy));

    vec4 colorSum = vec4(w, 1.0);

    gl_FragColor = colorSum;
}
//....