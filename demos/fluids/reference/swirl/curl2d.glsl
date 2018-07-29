uniform vec4 uInputRes1;
uniform sampler2D sInput1;

vec2 input1Offset(int xOffset, int yOffset)
{
    return vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes1.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes1.t));
}

void main()
{

    float dbdy = texture2D(sInput1, input1Offset(0, 1)).b - texture2D(sInput1, input1Offset(0, -1)).b;
    float dgdz = 0f;
    float drdz = 0f;
    float dbdx = texture2D(sInput1, input1Offset(1, 0)).b - texture2D(sInput1, input1Offset(-1, 0)).b;
    float dgdx = texture2D(sInput1, input1Offset(1, 0)).g - texture2D(sInput1, input1Offset(-1, 0)).g;
	float drdy = texture2D(sInput1, input1Offset(0, 1)).r - texture2D(sInput1, input1Offset(0, -1)).r;

    vec3 curl = vec3(dbdy-dgdz, drdz-dbdx, dgdx-drdy);
    curl = curl / length(curl);

    vec4 colorSum = vec4(curl*5.0, 1.0);

    //colorSum += texture2D(sInput1, input1Offset(0, 0));
    colorSum.b = 0;
    gl_FragColor = colorSum;
}
//.
