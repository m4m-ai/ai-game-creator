attribute highp vec4 _glesVertex;
attribute mediump vec4 _glesMultiTexCoord0;
uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _MainTex_ST;

varying mediump vec2 xlv_TEXCOORD0;


void main()
{
	vec4 pos = vec4(_glesVertex.xyz , 1.0);
    gl_Position = glstate_matrix_mvp * pos;
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
}