#version 300 es

precision mediump float;

layout(location = 0) in highp vec3    _glesVertex;
layout(location = 4) in vec4 _glesMultiTexCoord0;
uniform highp mat4 glstate_matrix_mvp;
uniform lowp float _SpeedU;
uniform lowp float _SpeedV;
uniform lowp float glstate_timer;
uniform mediump vec4 _LightTex_ST;
uniform mediump vec4 _MainTex_ST;

out mediump vec2 xlv_TEXCOORD0;
out mediump vec2 _StreamLightUV;

#ifdef LIGHTMAP
layout(location = 5) in mediump vec4    _glesMultiTexCoord1;
uniform mediump vec4 glstate_lightmapOffset;
// uniform mediump float glstate_lightmapUV;
out mediump vec2 lightmap_TEXCOORD;
#endif

#ifdef FOG
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
out lowp float factor;
#endif

#ifdef SKIN
layout(location = 6) in lowp vec4    _glesBlendIndex4;
layout(location = 7) in mediump vec4    _glesBlendWeight4;
uniform highp vec4 glstate_vec4_bones[110];
mat4 buildMat4(int index)
{
	vec4 quat = glstate_vec4_bones[index * 2 + 0];
	vec4 translation = glstate_vec4_bones[index * 2 + 1];
	float xy = 2.0 * quat.x * quat.y;
	float xz = 2.0 * quat.x * quat.z;
	float xw = 2.0 * quat.x * quat.w;
	float yz = 2.0 * quat.y * quat.z;
	float yw = 2.0 * quat.y * quat.w;
	float zw = 2.0 * quat.z * quat.w;
	float xx = 2.0*quat.x * quat.x;
	float yy = 2.0*quat.y * quat.y;
	float zz = 2.0*quat.z * quat.z;
	float ww = 2.0*quat.w * quat.w;
	float s = translation.w;
	mat4 matrix = mat4(
	(1.0-yy-zz)*s, (xy+zw)*s, (xz-yw)*s, 0,
	(xy-zw)*s, (1.0-xx-zz)*s, (yz + xw)*s, 0,
	(xz + yw)*s, (yz - xw)*s, (1.0-xx-yy)*s, 0,
	translation.x, translation.y, translation.z, 1);
	return matrix;
}

highp vec4 calcVertex(highp vec4 srcVertex,lowp vec4 blendIndex,lowp vec4 blendWeight)
{
	int i = int(blendIndex.x);
    int i2 =int(blendIndex.y);
	int i3 =int(blendIndex.z);
	int i4 =int(blendIndex.w);

    mat4 mat = buildMat4(i)*blendWeight.x
			 + buildMat4(i2)*blendWeight.y
			 + buildMat4(i3)*blendWeight.z
			 + buildMat4(i4)*blendWeight.w;
	return mat* srcVertex;
}
#endif

void main()
{
    highp vec4 position=vec4(_glesVertex.xyz,1.0);
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;

    //----------------------------------------------------------
    #ifdef LIGHTMAP
    mediump vec2 beforelightUV = _glesMultiTexCoord1.xy;
    lowp float u = beforelightUV.x * glstate_lightmapOffset.x + glstate_lightmapOffset.z;
    lowp float v = beforelightUV.y * glstate_lightmapOffset.y + glstate_lightmapOffset.w;
    lightmap_TEXCOORD = vec2(u,v);
    #endif

    #ifdef SKIN
    position =calcVertex(position,_glesBlendIndex4,_glesBlendWeight4);
    #endif
    position = (glstate_matrix_mvp * position);

    #ifdef FOG
    factor = (glstate_fog_end - abs(position.z))/(glstate_fog_end - glstate_fog_start);
    factor = clamp(factor, 0.0, 1.0);
    #endif

    lowp vec2 _speed= vec2(_SpeedU,_SpeedV);
    _StreamLightUV = (_glesMultiTexCoord0.xy * _LightTex_ST.xy + _LightTex_ST.zw)  + _speed * glstate_timer;

    gl_Position =position;
}