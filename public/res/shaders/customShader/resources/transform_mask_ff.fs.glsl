#version 300 es

precision highp float;
uniform sampler2D maskTex;
//CC INCLUDES END
uniform sampler2D frontTex;   
uniform sampler2D backTex;
uniform float threshold;
uniform float tDelta;
uniform float frontScaleRatioW;
uniform float frontScaleRatioH;
uniform float backScaleRatioW;
uniform float backScaleRatioH;
uniform float ruleScaleRatioW;
uniform float ruleScaleRatioH;

in lowp vec2 v_texCoord;
out vec4 color;
void main() {
   
    vec4 texFrontColor = texture(frontTex, vec2(v_texCoord.x*frontScaleRatioW, v_texCoord.y*frontScaleRatioH));

    vec4 texBackColor = texture(backTex, vec2(v_texCoord.x*backScaleRatioW, v_texCoord.y*backScaleRatioH));
    vec4 texRuleColor = texture(maskTex, vec2(v_texCoord.x*ruleScaleRatioW, v_texCoord.y*ruleScaleRatioH));
    float grayValue = texRuleColor[0]*0.299 + texRuleColor[1]*0.587 + texRuleColor[2]*0.114;
    float grayThld = threshold;
    float frontRatio = 0.0;
    if(grayThld<0.0) {
        grayThld = 0.0;
    }
    if(grayThld>1.0) {
        grayThld = 1.0;
    }
    if(grayThld == 1.0) {
        color = vec4(texBackColor.rgb, texBackColor.a);
    }
    else {
        if(grayValue<grayThld-tDelta) {
            color = vec4(texBackColor.rgb, texBackColor.a);
        }
        else if(grayValue >= grayThld-tDelta&&grayValue <= grayThld+tDelta) {
            frontRatio = (grayValue-grayThld+tDelta) / (tDelta * 2.0);
            if(frontRatio<0.0) {
                frontRatio = 0.0;
            }
            if(frontRatio>1.0) {
                frontRatio = 1.0;
            }
            color = vec4(texFrontColor.rgb[0]*frontRatio + texBackColor.rgb[0]*(1.0-frontRatio), texFrontColor.rgb[1]*frontRatio + texBackColor.rgb[1]*(1.0-frontRatio), texFrontColor.rgb[2]*frontRatio + texBackColor.rgb[2]*(1.0-frontRatio), texFrontColor.a*frontRatio + texBackColor.a*(1.0-frontRatio));
        }
        else {
            if(texFrontColor.a == 0.0) {
                color = vec4(0.0, 0.0, 0.0, 0.0);
            }
            else {
                color = vec4(texFrontColor.rgb, texFrontColor.a);
            }

        }

    }

}
