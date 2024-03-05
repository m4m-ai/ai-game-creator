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
import { AssembleCreatUI } from "Loader/AssembleCreatUI";
import { UiManager } from "PSDUI/UiManager";
import { PlatformUtil } from "Tools/PlatformUtil";
import { GameMgr } from "./GameMgr";
import { GameStart } from "./GameStart";
import { ResManager } from "./Manager/ResManager";
import { UIOpenOrHideManager } from "./Manager/UIOpenOrHideManager";
import { NetWebscoket } from "./Net/NetWebsocket";
import { EditorManager } from "./Manager/EditorManager";
import { ResourceManager } from "./Manager/ResourceManager";
import { GameProjectManager } from "./Manager/GameProjectManager";
import { PlayerGuideManager } from "./Manager/PlayerGuideManager";
import { CommonPoupManager } from "./Manager/CommonPoupManager";
import { ChapterSceneDirectoryManager } from "./Manager/ChapterSceneDirectoryManager";
import { BackgroundPictureManager } from "./Manager/BackgroundPictureManager";
import { BackgroundMusicManager } from "./Manager/BackgroundMusicManager";
import { RoleSettingManager } from "./Manager/RoleSettingManager";
import { ChatMessageDataManager } from "./Manager/ChatMessageDataManager";
import { ChatGuideManager } from "./Manager/ChatGuideManager";
import { AIResourceManager } from "./Manager/AIResourceManager";
import { ScenePreloadManager } from "./Manager/ScenePreloadManager";
import { DatGUITool } from "./Tools/datGUITool";

/** core enter point */
export class AppMain {
    public static EnableLogin: boolean;
    public static ResUrl: string;
    constructor() {
        //init
        console.log(`appMain inited`);
        let app = m4m.framework.sceneMgr.app;
        setTimeout(() => {
            let width1 = app.webgl.canvas.width
            let height1 = app.webgl.canvas.height
            console.log("width1: ", width1, "height1: ", height1);
        }, 3000);

        // // 引擎启动
        // this.initEngine();
        window.onorientationchange = () => {
            app.refreshOrientationMode();   //屏幕有旋转时，刷新屏幕方向。
        };
        //项目启动
        let width: number = 2732;//1920;
        let height: number = 2048;//1080;
        let screenMatchRate = 0;  //如果是以高度固定的 模屏 模式  要把这个值设置为1   默认为竖屏模式
        if (app) {
            //屏幕适配处理
            //因会被广告位档到  iphone  5  5s   iphone 8  ui整体微调缩小
            let isLowPix = app.canvasClientHeight <= 414;
            let pixChange = 1;
            pixChange = (app.canvasClientHeight * 530) / (height * (app.canvasClientHeight - 135));
            //处理窄屏UI适配问题
            let asp = app.width / app.height;
            let min = 0.6;
            let max = 1.68;
            asp = asp < min ? min : asp;
            if (asp < max) {
                screenMatchRate = (asp - min) / (max - min);
            }
            m4m.framework.batcher2D["limitCount"] = 1024 * 64;  //设置 UI vbo buffer 大小上限 ， 不同项目需要平衡（太大太小都不好）。
            //测试下来 1024 * 64 或 1024 * 128 最优
        }

        //相机ui
        // UiManager.init(1280,720,1,"","");
        UiManager.init(width, height, screenMatchRate, GameMgr.UIPath, GameMgr.atlasPath);
        //背景颜色


        let id = m4m["accountID"];
        if (id != null) {
            id = decodeURI(id);
        }
        //gameMgr
        GameMgr.init(app);
        DatGUITool.runGameGUI();

        //AssembleCreatUI 组装UI类
        AssembleCreatUI.init(PlatformUtil.systemQuality, PlatformUtil.WXGetSystemPlatformType, GameMgr.pathReplaceMap);

        //event reg
        // EventMgr.addListener("res_dependent_loaded", this.onResLoaded, this);

        if (globalThis.window == null) {
            this.onResLoaded();
        } else {
            ResManager.callBackFun = this.onResLoaded.bind(this);
            //res
            ResManager.init();
        }

        ChatGuideManager.Instance.init();
        ResourceManager.Instance.init();
        GameProjectManager.instance.init();
        PlayerGuideManager.instance.init();
        CommonPoupManager.instance.init();
        // SoundManage.Instance.setAudioPlayer();
        ChapterSceneDirectoryManager.Instance.init();
        BackgroundPictureManager.Instance.init();
        BackgroundMusicManager.Instance.init();
        ChatMessageDataManager.Instance.init();

        RoleSettingManager.instance.init();
        AIResourceManager.instance.init();
        ScenePreloadManager.Instance.init();

        //连接服务器
        this.connectWebSocket();

        //UIOpenOrHideManager.Instance.OpenSettlementView();
        EditorManager.Instance.initProject();
        //UIOpenOrHideManager.Instance.OpenSettlementView();
        //UIOpenOrHideManager.Instance.OpenPanelView();

        //测试执行step
        //EditorManager.Instance.runTestPlay();
        UIOpenOrHideManager.Instance.OpenFullscreenPageView();
        // UIOpenOrHideManager.Instance.OpenAlistofgameItemsView();
        // PlayerGuideManager.instance.guideStepIndex = 6;
        // UIOpenOrHideManager.Instance.OpenTutorialBackgroundView();
        // UIOpenOrHideManager.Instance.OpenChapterSceneMenuView();

        //UIOpenOrHideManager.Instance.OpenGameUiView();
        //UIOpenOrHideManager.Instance.OpenNavigationBarView();

        // setTimeout(() => {
        //     AudioManager.Instance.playAudio("tm.wav", 1); 
        // }, 1000);

        //EditorManager.Instance.runTestPlay();
    }

    //连接服务器
    private connectWebSocket() {
        ResManager.loadJson(`res/server.json`, (txt) => {
            let obj = txt;
            if (typeof (txt) == "string") {
                obj = JSON.parse(txt);
            }
            //连接服务器
            AppMain.EnableLogin = obj.EnableLogin;
            AppMain.ResUrl = obj.ResUrl;
            ScenePreloadManager.Instance.preloadLength=obj.PreloadLength;
            ScenePreloadManager.Instance._preloadNum=obj.PreloadNum;
            ScenePreloadManager.Instance.firstPreloadLength=obj.FirstPreloadLength;
            NetWebscoket.Instance.connect(obj.SERVER_ID);
            if (AppMain.EnableLogin) {
                UIOpenOrHideManager.Instance.OpenLogonView();
            }
            // UIOpenOrHideManager.Instance.OpenChapterSceneMenuView();
        });
        // // 外网
        // //"wss://kingzet.cn"
        // if (globalThis.window) {
        //     m4m.io.loadText(`res/server.json`, (txt, _err, isFail) => {
        //         if (isFail) {
        //             console.error(`load  server.json err : ${_err}`);
        //             return;
        //         }
        //         let obj = JSON.parse(txt);
        //         NetWebscoket.Instance.connect(obj.SERVER_ID);
        //         // console.error(`账号配置加载完毕!`,obj.SERVER_ID);
        //     });
        // } else {
        //     //NetWebscoket.Instance.connect("ws://192.168.1.61:8004");
        //     //内网
        //     NetWebscoket.Instance.connect("ws://192.168.199.217:8004");
        //     //外网
        //     //NetWebscoket.Instance.connect("wss://yoyo.china.s1.tongy.com.cn:8004");
        // }
    }

    private initEngine() {
        // let app = m4m.framework.sceneMgr.app;
        // if (!app) {
        //     app = new m4m.framework.application();
        //     // 引擎启动
        //     app.bePlay = true;
        //     if (globalThis.document) {
        //         let rootEle: any = globalThis.document.getElementById("gamecontainer");
        //         app.start(rootEle, m4m.framework.CanvasFixedType.Free);
        //         // app.orientation = m4m.framework.OrientationMode.LANDSCAPE;
        //         app.orientation = m4m.framework.OrientationMode.LANDSCAPE;
        //         if (window != null) {
        //             window.onorientationchange = () => {
        //                 app.refreshOrientationMode();   //屏幕有旋转时，刷新屏幕方向。
        //             };
        //         }
        //     }
        // }
    }

    private onResLoaded() {
        console.log(`前置依赖资源加载完毕！`);
        //
        GameStart.Instance.init();
        //console.error("TWEEN",TWEEN);

        // let coords = { x: 0, y: 0 };
        // let tween1 = new TWEEN.Tween(coords)
        //     .to({ rotation: 360, y: 300 }, 750)
        //     .repeat(1)
        //     .delay(1000)
        //     .yoyo(true)
        //     .easing(TWEEN.Easing.Cubic.InOut)
        //     .onUpdate((object) => {
        //         console.error(object);
        //         // updateBox(target1, object)
        //     })
        //     .start();
        // //测试
        // AudioBase.getAllDataCallBack((data) => {
        //     console.error(`声音表加载完毕11111！`, data);
        // });
        // AudioBase.getDataByIDCallBack(1100, (data) => {
        //     console.error(`声音1100加载完毕1！`, data);
        // });

        // function animate(time) {
        //     requestAnimationFrame(animate);
        //     TWEEN.update(time);
        // }
        // requestAnimationFrame(animate);

        // let coords = { x: 0, y: 0 }; // Start at (0, 0)
        // let tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
        //     .to({ x: 300, y: 200 }, 1000) // Move to (300, 200) in 1 second.
        //     .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        //     .onUpdate((object) => { // Called after tween.js updates 'coords'.
        //         // Move 'box' to the position described by 'coords' with a CSS translation.
        //         console.error(object, coords.x);
        //     })
        //     .start(); // Start the tween immediately.
    }
}

setTimeout(() => {
    new AppMain();
}, 0);
