#define FLUXAY_COLOR_SWITCH

precision lowp float;
// uniform highp mat4 glstate_matrix_it_modelview;
uniform highp mat4 glstate_matrix_view;

uniform float glstate_timer;
uniform highp sampler2D _MainTex;
uniform highp sampler2D _BumpMap;
uniform highp sampler2D _MaskTex;
uniform highp sampler2D _MatCap;
uniform highp sampler2D _MatCap2;
uniform highp sampler2D _MatCap3;
uniform highp sampler2D _FluxayTex;
uniform highp sampler2D _FluxayTex2;

uniform lowp vec4 _MatCapColor;
uniform lowp vec4 _MatCap2Color;
uniform lowp vec4 _MatCap3Color;

uniform lowp float _Strength;
uniform lowp float _Strength2;
uniform lowp float _Strength3;

uniform lowp vec4 _FluxayColor;
uniform lowp vec4 _FluxayColor2;

// uniform lowp vec4 _MainColor;
// uniform lowp float _AlphaCut;

//light

//varying--------------------------
varying mediump vec2 uv_TEXCOORD0;
varying mediump vec2 uv_FluxayTex_TEXCOORD2;
varying mediump vec2 uv_FluxayTex2_TEXCOORD3;

varying highp vec3 v_N;
varying highp mat3 TBNmat;

// varying highp vec3 tSpace0;
// varying highp vec3 tSpace1;
// varying highp vec3 tSpace2;

varying highp vec3 t;


//---------------------------------

//texture2DEtC1Mark

//UnpackNormal----------------------
vec3 UnpackNormal(vec4 normalPixel){
    return normalPixel.xyz *2.0 -1.0;
}
//----------------------------------


#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
varying lowp float factor;
#endif

void main() 
{
    lowp vec4 basecolor = texture2D(_MainTex, uv_TEXCOORD0);
    lowp vec4 tex = basecolor;
    // if(basecolor.a < _AlphaCut)
    //     discard;
    // lowp vec4 fristColor=basecolor*_MainColor;
    // lowp vec4 fristColor = basecolor;
    // lowp vec4 emission = fristColor;
    lowp vec4 emission = basecolor;

    //材质 mask 纹理
    lowp vec4 masktex = texture2D(_MaskTex , uv_TEXCOORD0);
    //获得 normal 从 切线空间
    lowp vec3 worldNorm = UnpackNormal(texture2D(_BumpMap, uv_TEXCOORD0));
    //worldNorm 到 world 空间
    worldNorm = normalize(TBNmat * worldNorm);
    //emission = vec4(worldNorm , 1.0);
    // emission = vec4(uv_TEXCOORD0,0,1.0);
    // emission = vec4(t,1.0);


    // mediump vec3 worldNorm;
    // worldNorm.x = dot(tSpace0.xyz, normals);
    // worldNorm.y = dot(tSpace1.xyz, normals);
    // worldNorm.z = dot(tSpace2.xyz, normals);
    // emission = vec4(worldNorm,1);

    //normals 到 view 空间
    worldNorm = (mat3(glstate_matrix_view) * worldNorm);
    // worldNorm = (mat3(glstate_matrix_view) * v_N);
    // emission = vec4(worldNorm,1);

    mediump vec2 capCoord = worldNorm.xy;
    lowp vec4 matcap1 = texture2D(_MatCap,  capCoord * 0.5 + 0.5)  * _MatCapColor  * _Strength;//* tex * _Strength;
    lowp vec4 matcap2 = texture2D(_MatCap2, capCoord * 0.5 + 0.5)  * _MatCap2Color * _Strength2;
    lowp vec4 matcap3 = texture2D(_MatCap3, capCoord * 0.5 + 0.5)  * _MatCap3Color * _Strength3;
    
    lowp vec4 mc = (matcap1 * (masktex.r * masktex.g) + matcap2 * (1.0 - masktex.r) + matcap3 * (1.0 - masktex.g)) * tex;

    #ifdef FLUXAY_COLOR_SWITCH
        //SetDunamicTime();

        mediump vec4 fluax1 = vec4(.0,.0,.0,.0);
        highp vec2 moveadd = (uv_TEXCOORD0 + glstate_timer * 2.0 * vec2(1.0,1.0));
        mediump vec4 fluaytex = texture2D(_FluxayTex , uv_FluxayTex_TEXCOORD2);
        mediump vec3 emissive = (fluaytex.rgb * _FluxayColor.rgb * 2.0 * (fluaytex.a * (1.0 - masktex.b) * _FluxayColor.a));
        fluax1 = vec4(emissive,.0) * fluaytex.a * _FluxayColor.a;

        mediump vec4 fluay2tex = texture2D(_FluxayTex2 , uv_FluxayTex2_TEXCOORD3);
        mediump vec3 emissive2 = (fluay2tex.rgb * _FluxayColor2.rgb * 2.0 * (fluay2tex.a * (1.0 - masktex.g) * _FluxayColor2.a));
        fluax1 += (vec4(emissive2,.0) * fluay2tex.a * _FluxayColor2.a);
        fluax1.rgb = fluax1.rgb * mc.rgb;
        mc = mc + fluax1;
    #endif

    emission = mc; 

    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    #endif
    
    gl_FragData[0] = emission;
}