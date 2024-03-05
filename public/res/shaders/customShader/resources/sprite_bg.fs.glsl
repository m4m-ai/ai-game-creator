precision highp float;

uniform vec4 _Color;
uniform vec4 _ChangeColor;
uniform float _ChangeSize;

varying lowp vec2 uv;

#ifdef FOG
uniform lowp vec4 glstate_fog_color;
varying lowp float factor;
#endif

void main() 
{
    float Diff = clamp((uv.y - _ChangeSize) * (uv.y - _ChangeSize) , 0.0 , 1.0) + clamp((1.0 - _ChangeSize) - uv.y , 0.0 , 1.0) * ((1.0 - _ChangeSize) - uv.y);
    vec4 basecolor = _ChangeColor * Diff + (1.0 - Diff) * _Color;

    #ifdef FOG
    basecolor.xyz = mix(glstate_fog_color.rgb, basecolor.rgb, factor);
    #endif
        
    gl_FragData[0] = basecolor;
}