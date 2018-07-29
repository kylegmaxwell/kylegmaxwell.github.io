uniform vec4 uInputRes1;
uniform sampler2D sInput1;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform vec4 uColor4;
uniform vec4 uColor5;

vec2 input1Offset(int xOffset, int yOffset)
{
    return vec2(gl_TexCoord[0].s + (float(xOffset) * uInputRes1.s), gl_TexCoord[0].t + (float(yOffset) * uInputRes1.t));
}

vec4 lerp(float t, vec4 colorA, vec4 colorB)
{
    //t = 1.0 - t;
    return colorA * (1.0-t) + colorB * t;
}

void main()
{
    vec4 colorSum = texture2D(sInput1, input1Offset(0, 0));

    float bright = colorSum.r;

    //colorSum = lerp(bright, uColor5, uColor3);
    if (bright>1)
        colorSum = uColor5;
    else if (bright > 0.8)
        colorSum = lerp((bright-0.8)*5,uColor4, uColor5);
    else if (bright > 0.6)
        colorSum = lerp((bright-0.6)*5,uColor3, uColor4);
    else if (bright > 0.4)
        colorSum = lerp((bright-0.4)*5,uColor2, uColor3);
    else if (bright > 0.2)
        colorSum = lerp((bright-0.2)*5,uColor1, uColor2);
    else
        colorSum = uColor1*bright;

    gl_FragColor = colorSum;
}
//....