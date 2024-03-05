/**
@license
Copyright (c) 2022 meta4d.me Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
import { commTool } from "Tools/commTool";
import { GameMgr } from "../GameMgr";
type layoutOption = m4m.framework.layoutOption;
export class CommonUIUtils {
    public static uiRepUrl: string = "ui://";
    public static replaceUIUrl(icon) {
        let trueIcon: string = icon;
        if (icon.indexOf(CommonUIUtils.uiRepUrl) != -1) {
            trueIcon = icon.replace(CommonUIUtils.uiRepUrl, "res/art/");
        }
        return trueIcon;
    }
    public static getSprite(spriteStr: string) {
        let spriteIcon = GameMgr.assetMgr.getAssetByName(spriteStr) as m4m.framework.sprite;
        return spriteIcon;
    }
    /** 快速创建一个 imgSpriteArrange 对象 */
    // tslint:disable-next-line: max-line-length
    // public static getImgSpriteArrange(img: m4m.framework.image2D, hlayout: layoutOption = m4m.framework.layoutOption.LEFT, vlayout: layoutOption = m4m.framework.layoutOption.V_CENTER): imgSpriteArrange {
    //     // let imgNum = commTool.makeImgSpriteArrange(img);
    //     // img.transform.visible = false;
    //     // let initX = img.transform.getLayoutValue(hlayout);
    //     // imgNum.transform.layoutState = vlayout | hlayout;
    //     // imgNum.transform.setLayoutValue(hlayout, initX);
    //     // return imgNum;
    // }

    /**
     * 设置通用外部加载图片
     */
    public static setTextureFun(rawImage2D: m4m.framework.rawImage2D, url: string) {
        commTool.loaderTextureFun(url, (_tex) => {
            if (rawImage2D && rawImage2D.transform) {
                rawImage2D.image = _tex;
                rawImage2D.transform.markDirty();
            }
        });
    }

    /**
     * 设置通用外部加载图片, 并且等比缩放
     */
    public static setTextureFuncProportionalScaling(rawImage2D: m4m.framework.rawImage2D, url: string) {
        // rawImage2D.proportionalScalingMode = true;
        // this.setTextureFun(rawImage2D, url, needCache);

        let parent = rawImage2D.transform.parent;
        let originWidth: number = parent.width;
        let originHeight: number = parent.height;

        // let originWidth: number = rawImage2D["__width"];
        // let originHeight: number = rawImage2D["__height"];
        // if (originWidth == null) {
        //     originWidth = rawImage2D.transform.width;
        //     rawImage2D["__width"] = originWidth;
        // }
        // if (originHeight == null) {
        //     originHeight = rawImage2D.transform.height;
        //     rawImage2D["__height"] = originHeight;
        // }
        commTool.loaderTextureFun(url, (_tex) => {
            let scale = this.scaleImage(_tex.glTexture.width, _tex.glTexture.height, originWidth, originHeight);
            rawImage2D.transform.width = scale.newWidth;
            rawImage2D.transform.height = scale.newHeight;
            rawImage2D.image = _tex;
            rawImage2D.transform.markDirty();
        });
    }

    /**
     * 设置通用外部加载图片
     */
    public static setTextureLateVisibleFun(rawImage2D: m4m.framework.rawImage2D, url: string,needCache = false) {
        if (rawImage2D && rawImage2D.transform) {
            rawImage2D.transform.visible = false;
        }
        commTool.loaderTextureFun(url, (_tex) => {
            if (rawImage2D && rawImage2D.transform) {
                rawImage2D.transform.visible = true;
                rawImage2D.image = _tex;
                rawImage2D.transform.markDirty();
            }
        });
    }

    private static scaleImage(width1: number, height1: number, width2: number, height2: number) {
        var scale = Math.min(width2 / width1, height2 / height1);
        var newWidth = width1 * scale;
        var newHeight = height1 * scale;
      
        return {newWidth: newWidth, newHeight: newHeight};
    }

    private static checkTime(num: number) {
        if (num < 10) {
            return "0" + num;
        }
        return num + "";
    }

    /**格式化时间 */
    public static formatTime(time: number) {
        //格式化时间
        let dd = parseInt((time / 60 / 60 / 24).toString(), 10);
        let hh = parseInt((time / 60 / 60 % 24).toString(), 10);
        let mm = parseInt((time / 60 % 60).toString(), 10);
        let ss = parseInt((time % 60).toString(), 10);

        let ddStr = this.checkTime(dd);
        let hhStr = this.checkTime(hh);
        let mmStr = this.checkTime(mm);
        let ssStr = this.checkTime(ss);
        return `${hhStr + "时" + mmStr + "分" + ssStr + "秒"}`;
    }
}
