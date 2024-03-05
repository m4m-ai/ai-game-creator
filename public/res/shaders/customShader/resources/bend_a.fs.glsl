precision lowp float;
uniform lowp sampler2D _Tex;
uniform lowp vec4 _Colr;

//varying-----------------------------
varying mediump vec2 _Tex_uv_TEXCOORD0;

//------------------------------------

//texture2DEtC1Mark
#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
varying lowp float factor;
#endif


void main() 
{
    lowp vec4 emission = vec4(.0,.0,.0,.0);

    //----------------------------------------------------------
    lowp vec4 tex = texture2D(_Tex, _Tex_uv_TEXCOORD0);
    lowp vec3 finalColor = _Colr.a * (_Colr.rgb * tex.rgb * 2.0 );
    emission = vec4(finalColor.rgb , (tex.a * _Colr.a));

    #ifdef FOG
        emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    #endif
    
    gl_FragData[0] = emission;
}