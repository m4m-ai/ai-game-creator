uniform lowp sampler2D _MainTex;
uniform lowp sampler2D _Tex1;
uniform lowp sampler2D _Tex2;
uniform lowp sampler2D _Tex3;
varying highp vec2 xlv_TEXCOORD0;
uniform lowp float _Alpha;
uniform lowp float _Superimposition;
uniform lowp float _Tex1On;
uniform lowp float _Tex2On;
uniform lowp float _Tex3On;
void main()
{
    lowp vec4 emission = texture2D(_MainTex, xlv_TEXCOORD0);
    lowp vec4 emission1 = texture2D(_Tex1, xlv_TEXCOORD0);
    lowp vec4 emission2 = texture2D(_Tex2, xlv_TEXCOORD0);
    lowp vec4 emission3 = texture2D(_Tex3, xlv_TEXCOORD0);
    lowp float imgA=1.0;
    lowp float imgM=emission.a;
    
    if(_Tex1On>0.0){
    imgA=emission1.a;
    emission.xyz *=1.0- imgA;
    emission.xyz+=emission1.xyz*imgA;
    emission.a=1.0-(1.0-imgM)*(1.0-imgA);
    }
    if(_Tex2On>0.0){
    imgM=emission.a;
    imgA=emission2.a;
    emission.xyz *=1.0- imgA;
    emission.xyz+=emission2.xyz*imgA;
    emission.a=1.0-(1.0-imgM)*(1.0-imgA);
    }
    if(_Tex3On>0.0){
    imgM=emission.a;
    imgA=emission3.a;
    emission.xyz *=1.0- imgA;
    emission.xyz+=emission3.xyz*imgA;
    emission.a=1.0-(1.0-imgM)*(1.0-imgA);
    }

    emission.a=emission.a*_Alpha;
    emission.xyz *= _Superimposition;
    gl_FragData[0] = emission;

}