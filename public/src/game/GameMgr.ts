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
import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
import { LoaderManage } from "Loader/LoaderManage";
import { FrameMgr } from "Tools/FrameMgr";
import { InputManager } from "Tools/InputManager";
import { PlatformType, PlatformUtil, SystemQualityType } from "Tools/PlatformUtil";

/** 并行接入性能引擎 */
export class GameMgr {
    /** 是否使用 testCreat 新加载资源工具 */
    public static useTestCreate = false;
    public static app: m4m.framework.application;
    public static assetMgr: m4m.framework.assetMgr;
    public static inputMgr: m4m.framework.inputMgr;

    public static DNS_AND_PORT = "";
    public static REPORT_SERVER = "";

    public static itemPath: string; //物件
    public static rolePath: string; //角色
    public static scenePath: string; //场景物件
    public static effectPath: string; //特效

    public static readonly fontPath='res/font/';
    public static readonly shaderPath = `res/shaders/`; //shader 资源
    public static readonly atlasPath = `res/art/atlas/`; //图集
    public static readonly Event = "res/art/texture/Event/"; //任务图标
    public static readonly UIPath = `res/art/ui/`; //UI
    public static readonly configPath = `res/config/`; //配置
    public static readonly texttype = "res/art/texture/";
    public static readonly Deploy = "res/art/texture/Deploy/";//战前
    public static readonly DeployIconFlag = "res/art/texture/Icon/ShortFlag/";//小旗帜
    public static readonly DeployFlag = "res/art/texture/Icon/Flag/";//大旗帜
    public static readonly DeployAttribute = "res/art/texture/Attribute/";
    public static readonly SmallAttribute = "res/art/texture/SmallAttribute/";//属性小图标
    public static readonly Skill = "res/art/texture/Skill/";//技能
    public static readonly CutsceneIcon = "res/art/texture/CutsceneIcon/";//过场图片
    public static readonly FileResource = "res/art/texture/FileResource/";//文件资源图标
    public static readonly Level = "res/art/texture/Level/";
    public static readonly Main = "res/art/texture/Main/";
    public static readonly Camp = "res/art/texture/Camp/";//阵营
    public static readonly GameIcon = "res/art/texture/GameIcon/";//游戏小图标
    public static readonly Role = "res/art/texture/Role/";//role

    /** 音频目录 */
    public static readonly AudioPath = `res/art/audio/`;
    public static readonly ExcelConfigPath = `res/config/ExcelData/`; //Excel 配置
    public static readonly ExcelSplitConfigPath = `res/config/ExcelDataSplit/`; //Excel 拆分 配置

    /** testCrete 使用 资源路径重定向Map  */
    public static pathReplaceMap: { [srcPath: string]: string } = {};

    /** 性能模式 */
    private static appUpdateFun: any;
    //友方出战列表已满
    public static isFullBol = false;
    //敌方出战列表已满
    public static isEnmyFullBol = false;
    //出战士兵的兵牌上限
    public static maxSodierNum = 8;
    //友方阵营
    public static isFriendlyCampBol = true;
    //友方拥有的金币数量
    public static ownGoldCount = 0;
    //对战方拥有得金币数量
    public static otherGoldCount = 0;

    public static init(app: m4m.framework.application) {
        if (app) {
            m4m.framework.transform.prototype["checkToTop"] = () => { };      //检查 去掉优化
            // if(this.developModel){
            //     consTool.init();
            // }
            this.app = app;
            this.appUpdateFun = this.app["update"];
            this.assetMgr = this.app.getAssetMgr();
            //加载的资源由.bin  .txt  文件   后缀都加上了.js     (.bin.js    .txt.js)
            // m4m.framework.assetMgr.useBinJs = true;
            //优化设置
            this.app.markNotify = () => { }; //不需要广播
            let pType = PlatformUtil.WXGetSystemPlatformType;
            let ismobilePhone = pType != PlatformType.PC; //是手机
            if (ismobilePhone) {
                //app.OffOrientationUpdate = true; //不需要方向检测UPdate , 会监听屏幕旋转
            }
            this.app.getScene().autoCollectlightCamera = false;  //手动管理 灯光和相机的收集
            // this.app.isFrustumCulling = false; //剔除不需要
            this.inputMgr = this.app.getInputMgr();
            this.app.addUserCode(FrameMgr.name);  //帧管理对象创建
        }
        if (m4m["CDNURL"]) {
            this._CDNURL = m4m["CDNURL"];
            //
            LoaderManage.Instance.init(GameMgr.CDNURL);
        }
        //设置 加载URL 
        this.platformLoadUrlSet();
        //excel url overload
        ExcelDataBase.excelData = GameMgr.ExcelConfigPath;
        ExcelDataBase.excelSplitData = GameMgr.ExcelSplitConfigPath;
        if (app) {
            InputManager.init();
        }
    }

    public static platformLoadUrlSet() {
        let reso: string = "Resources/";
        let quality: string = "";
        switch (PlatformUtil.systemQuality) {//性能高中低
            case SystemQualityType.low:
                quality = `low`;
                break;
            case SystemQualityType.middle:
            case SystemQualityType.high:
                quality = `middle`;
                break;
            default:
                quality = "low";
        }

        let pType = PlatformUtil.WXGetSystemPlatformType;
        let platformFolder = pType == PlatformType.iPhone ? "IOS" : pType == PlatformType.Android ? "ANDROID" : "PC";

        GameMgr.scenePath = `res/art/scene/`;
        GameMgr.rolePath = `res/art/role/`;
        GameMgr.itemPath = `res/art/item/`;
        GameMgr.effectPath = `res/art/fx/`;
        if (this.useTestCreate) {    //设置 testCreat 加载工具 的 替换路径
            this.pathReplaceMap[GameMgr.scenePath] = `res/TESTAsset/scene/`;
            this.pathReplaceMap[GameMgr.rolePath] = `res/TESTAsset/role/`;
            this.pathReplaceMap[GameMgr.itemPath] = `res/TESTAsset/item/`;
            // this.pathReplaceMap[GameMgr.effectPath] = `res/TESTAsset/fx/`;
        }

        // //因如果切换了高低性能  加载的资源路径发生改变 需重置原来存的路径
        // EnterGamePreloadManager.Instance.init();
    }

    private static _CDNURL: string = "";
    static get CDNURL() { return this._CDNURL; }
}