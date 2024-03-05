attribute vec4 _glesVertex;
attribute vec4 _glesColor;
attribute vec4 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp; 

varying lowp float xlv_Alpha;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 mask_TEXCOORD;

void main(){
    highp vec4 position = vec4(_glesVertex.xyz,1.0);    
    xlv_Alpha = _glesColor.a;
    xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);  
    mask_TEXCOORD.x = (_glesVertex.x - 1.0)/-2.0; 
    mask_TEXCOORD.y = (_glesVertex.y - 1.0)/-2.0; 
    position = (glstate_matrix_mvp * position);
    gl_Position = position;
}