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
export class PlatformUtil {
    //平台 （记录用 不用于判断 逻辑）
    public static recordWXPlatform: string = "";
    static get isPCWX(): boolean {
        return PlatformUtil.recordWXPlatform == "windows";
    }
    //平台
    public static platform: string = "android";
    /** 是低端 或 中端 设备 */
    static get LowOrMediumDevice() { return this.systemQuality < SystemQualityType.high; }

    //因会被广告位档到  iphone  5  5s   iphone 8  ui整体微调缩小
    public static needUIscale: boolean = false;

    //当前机型的 品质类型
    public static systemQuality: SystemQualityType;
    //微信平台  取到的当前系统 信息
    public static WXGetSystemPlatformType: PlatformType;

    //如果是iPhoneX 或 iphone 11
    public static isIPhoneX: boolean = false;

    //如果是流海屏
    public static isLiuHai: boolean = false;

    //是否是开发工具环境
    public static isDevTool: boolean = false;

    /** 获取 平台类型信息 通过 navigator 对象 */
    public static getTypeByBrowser(): PlatformType {
        if (!navigator) {
            console.error(`navigator 没找到。`);
            return null;
        }
        //因微信上这里的数据会取得不对  此方法暂不使用
        let userAgentInfo = navigator.userAgent;
        let platformType: PlatformType = PlatformType.PC;
        if (userAgentInfo.indexOf("Android") != -1) {
            platformType = PlatformType.Android;
        } else if (userAgentInfo.indexOf("iPhone") != -1) {
            platformType = PlatformType.iPhone;

        } else if (userAgentInfo.indexOf("Windows Phone") != -1) {
            platformType = PlatformType.WindowsPhone;

        } else if (userAgentInfo.indexOf("iPad") != -1) {
            platformType = PlatformType.iPad;

        } else if (userAgentInfo.indexOf("iPod") != -1) {
            platformType = PlatformType.iPod;
        }
        return platformType;
    }
}
export enum SystemQualityType {
    low,// 低
    middle,// 中
    high, //高
}

export enum PlatformType {
    Android = 1,
    iPhone = 2,
    SymbianOS = 3,
    WindowsPhone = 4,
    iPad = 5,
    iPod = 6,
    PC = 7,
}