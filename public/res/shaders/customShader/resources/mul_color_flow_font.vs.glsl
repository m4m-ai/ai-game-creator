attribute vec4 _glesVertex;
attribute vec4 _glesColor;
attribute vec4 _glesColorEx;
attribute vec4 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp; 

varying highp float xlv_X;
varying lowp float xlv_Alpha;
varying lowp vec4 xlv_COLOR;                 
varying lowp vec4 xlv_COLOREx;
varying highp vec2 xlv_TEXCOORD0;

void main(){
    highp vec4 position = vec4(_glesVertex.xyz,1.0);    
    position = (glstate_matrix_mvp * position);
    xlv_X = position.x;
    xlv_Alpha = _glesColor.a;
    xlv_COLOR = _glesColor;                      
    xlv_COLOREx = _glesColorEx;   
    xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);  
    gl_Position = position;
}