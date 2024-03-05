#version 300 es

precision highp float;


layout(location = 0) in vec3 _glesVertex;    
layout(location = 3) in vec4 _glesColor;                   
layout(location = 4) in vec4 _glesMultiTexCoord0;          

uniform mat4 glstate_matrix_mvp;
// uniform mat4 glstate_matrix_viewproject;
//CC INCLUDES END

// attribute vec4 _glesVertex;
// attribute vec4 _glesMultiTexCoord0;
// attribute vec4 _glesColor;

out vec4 v_fragmentColor;
out lowp vec2 v_texCoord;

void main() {
    vec4 pos = vec4(_glesVertex.xyz , 1.0);
    // gl_Position = glstate_matrix_project * pos;
    gl_Position = glstate_matrix_mvp * pos;
    v_fragmentColor = _glesColor;
    v_texCoord = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);
}
