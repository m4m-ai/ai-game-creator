precision highp float;

attribute vec4 _glesVertex;
attribute vec2 _glesMultiTexCoord0;

uniform mat4 glstate_matrix_mvp;

varying lowp vec2 uv;

#ifdef FOG
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
varying lowp float factor;
#endif

void main()
{
    vec4 position = vec4(_glesVertex.xyz,1.0);

    position = glstate_matrix_mvp * position;

    uv = _glesMultiTexCoord0.xy;

    #ifdef FOG
    factor = (glstate_fog_end - abs(position.z))/(glstate_fog_end - glstate_fog_start);
    factor = clamp(factor, 0.0, 1.0);
    #endif
    
    gl_Position = position;
}