attribute highp vec4 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _Tex_ST;

#ifdef FOG
// #define glstate_fog_end		150.
// #define glstate_fog_start	1.
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
varying lowp float factor;
#endif

varying mediump vec2 _Tex_uv_TEXCOORD0;

void main()
{
    _Tex_uv_TEXCOORD0 = _glesMultiTexCoord0.xy * _Tex_ST.xy + _Tex_ST.zw;
    highp vec4 position=vec4(_glesVertex.xyz,1.0);

    //----------------------------------------------------------

    position = (glstate_matrix_mvp * position);

    #ifdef FOG
    factor = (glstate_fog_end - abs(position.z))/(glstate_fog_end - glstate_fog_start);
    factor = clamp(factor, 0.0, 1.0);
    #endif


    gl_Position =position;
}