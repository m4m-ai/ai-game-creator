precision mediump float;
uniform sampler2D _MainTex;

varying lowp float xlv_Alpha;
varying highp vec2 xlv_TEXCOORD0;

void main()
{
    lowp vec4 final = texture2D(_MainTex, xlv_TEXCOORD0);
    lowp float lum = (final.x + final.y + final.z) *  0.3333; 
    final = vec4(lum,lum,lum,xlv_Alpha * final.a);

    gl_FragData[0] = final ;
}