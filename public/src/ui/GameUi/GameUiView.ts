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
import { BindKeyName } from "Data/BindKeyName";
import { GridExtend } from "Data/GridExtend/GridExtend";
import { ConversationOptionsStepData } from "Data/Process/ConversationOptionsStep";
import { EditorManager } from "Manager/EditorManager";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { GameUi } from "./GameUi";
import { GameUiViewData } from "./GameUiViewData";
import { GameUiOptionsCell } from "./GameUiOptionsCell";
import xxbtn_btn = GameUi.xxbtn_btn;
import layoutOption = m4m.framework.layoutOption;
import lihui_raw = GameUi.lihui_raw;
import { UiImageNodePool } from "./Effect/UiImageNodePool";
import bg_raw = GameUi.bg2_raw;
import { AudioPool } from "./Effect/AudioPool";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { GameMgr } from "GameMgr";
import { commTool } from "Tools/commTool";
import { CTimer } from "Time/CTimer";
import { FrameMgr } from "Tools/FrameMgr";

export class GameUiView extends GameUi.GameUi {
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;

    public viewData: GameUiViewData;
    public grid: GridExtend<xxbtn_btn, ConversationOptionsStepData>;
    public lihui_raw_pool: UiImageNodePool<lihui_raw>;
    public bg_raw_pool: UiImageNodePool<bg_raw>;
    public soundPool: AudioPool;
    public voicePool: AudioPool;
    private backgroundShader: string = "transform_mask_ff.shader.json";

    private static binderList: FunctionBinder[] = [];

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        // console.log("rootName: " + this.transform.name);
        // this.transform.localTranslate = new m4m.math.vector2(100,100);
        // this.transform.markDirty();
        //this.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 100);

        this.bg3.bg1_img.transform.visible = false;
        this.bg3.bg1_img.buffer1_lab.label.text="加载中 请稍候";

        //立绘外部加载图
        let transform = this.bg.lihui_raw.transform;
        transform.width = 800;
        transform.height = 1200;

        this.lihui_raw_pool = new UiImageNodePool<GameUi.lihui_raw>(this, this.bg.lihui_raw);
        this.bg_raw_pool = new UiImageNodePool<GameUi.bg2_raw>(this, this.bg2_raw);
        this.soundPool = new AudioPool(this);
        this.voicePool = new AudioPool(this);

        this.grid = new GridExtend(this.bg.xxbtn_btn, GameUiOptionsCell, {
            columns: 1,
            offsetY: 20,
            viewInstance: this,
        });

        this.viewData = new GameUiViewData(this);

        FrameMgr.Add(this.update, this);

        this.bg.talkbg_img.talklab_lab.label.fontsize += 10;
        this.bg.talkbg_img.talklab1_lab.label.fontsize += 10;
    }

    public onShowFunc() {

        //对话文本设置
        let lab = this.bg.talkbg_img.talklab1_lab;
        lab.label.horizontalOverflow = false;
        lab.label.verticalOverflow = true;
        lab.label.verticalType = 1;
        lab.label.linespace = 2;
        lab.transform.height = 300;
        lab.transform.width = this.transform.width - 60;

        if (GameUiView.binderList.length > 0) {
            GameUiView.clearBinderList();
        }
        GameUiView.binderList.push(UiDataManager.bindFunctionData(BindKeyName.OnChangeScene, this.viewData.onChangeScene.bind(this.viewData)));
        GameUiView.binderList.push(UiDataManager.bindFunctionData(BindKeyName.PreloadStateChange, this.viewData.onPreloadStateChange.bind(this.viewData)));
        GameUiView.binderList.push(UiDataManager.bindFunctionData(BindKeyName.OnChangeConversation, this.viewData.onChangeConversation.bind(this.viewData)));
        GameUiView.binderList.push(UiDataManager.bindFunctionData(BindKeyName.OnChangeConversationOptions, this.viewData.onChangeConversationOptions.bind(this.viewData)));
        GameUiView.binderList.push(UiDataManager.bindFunctionData(BindKeyName.OnChangeStandingPainting, this.viewData.onChangeStandingPainting.bind(this.viewData)));
        GameUiView.binderList.push(UiDataManager.bindFunctionData(BindKeyName.OnChangeSound, this.viewData.onChangeSound.bind(this.viewData)));
        GameUiView.binderList.push(UiDataManager.bindFunctionData(BindKeyName.OnChangeVoice, this.viewData.onChangeVoice.bind(this.viewData)));
        GameUiView.binderList.push(UiDataManager.bindFunctionData(BindKeyName.OnChangeBackground, this.viewData.onChangeBackground.bind(this.viewData)));
    }

    public onHideFunc() {
        GameUiView.clearBinderList();
    }

    public onDisposeFunc() {
        this.viewData.dispose();
        this.grid.dispose();
        FrameMgr.Remove(this.update, this);
    }

    private static clearBinderList() {
        for (let binderListElement of this.binderList) {
            UiDataManager.unBindFunctionDataByBinder(binderListElement);
        }
        this.binderList.length = 0;
    }

    //上一张图的Url
    private previousImageUrl: string;
    //上一张图的Texture
    private previousTex: m4m.framework.texture
    //设置过场图片显示  index 效果图片的ID timeNum 效果持续时间
    public setCutsceneIconFun(rawImage: m4m.framework.rawImage2D, index: number,timeNum:number,nexImageUrl: string) {
        this.isMask = false;
        if (this.previousImageUrl == null) {
            //没有上一张图 基本上就是第一次进场 不做切换效果
            this.previousImageUrl = nexImageUrl;
            this.previousTex = rawImage.image;
        } else {
            this.viewData.changeRoleAndTalkImageState(false);
            // commTool.loaderTextureFun("res/art/texture/Scene/" + "2.jpg", (_tex) => {
            //     if (this.bg1_raw.rawImage2D && this.bg1_raw.rawImage2D.transform) {
            //         this.bg1_raw.transform.visible=true;
            //         this.bg1_raw.rawImage2D.image = _tex;
            //         this.bg1_raw.rawImage2D.transform.markDirty();
            commTool.setUIShader(this.backgroundShader, rawImage, false);

            let mainImgMat: m4m.framework.material = rawImage.getMaterial();
            if (mainImgMat == null) {
                console.error("当前图片未取到Material");
                return;
            }
            this.mainImgMat = mainImgMat;

            mainImgMat.setTexture("backTex", rawImage.image);
            mainImgMat.setFloat("frontScaleRatioW", 1);
            mainImgMat.setFloat("frontScaleRatioH", 1);

            this.maskSustainTime = timeNum;
            this.nowMaskTime = 0;
            // if (!mask) {
            //     mask = 0;
            //     mainImgMat.setFloat("tDelta", 0.5);
            // }
            // else {
            //     mainImgMat.setFloat("tDelta", 0.1);
            // }

            let whRatio = m4m.framework.sceneMgr.app.canvasClientWidth / m4m.framework.sceneMgr.app.canvasClientHeight;
            // console.error(m4m.framework.sceneMgr.app.canvasClientWidth + "   " + m4m.framework.sceneMgr.app.canvasClientHeight);
            //上一张图的 texture
            let _tex2 = this.previousTex;
            let mainW = 1;
            let mainH = 1;
            // var nbg = "res/art/texture/Scene/1.jpg";
            // commTool.loaderTextureFun(nbg, (_tex2) => {
            var ratio = _tex2.glTexture.width / _tex2.glTexture.height / whRatio;
            if (ratio >= 1) {
                mainW = 1 / ratio;
                mainH = 1;
            }
            else {
                mainW = 1;
                mainH = ratio;
            }
            mainImgMat.setTexture("frontTex", _tex2);
            mainImgMat.setFloat("backScaleRatioW", mainW);
            mainImgMat.setFloat("backScaleRatioH", mainH);
            // this.bg1_raw.rawImage2D.transform.markDirty();
            // console.error(this.bg1_raw.rawImage2D);
            // console.error(mainImgMat);
            // });
            this.previousImageUrl = nexImageUrl;
            this.previousTex = rawImage.image;

            var maskp = GameMgr.CutsceneIcon + index + ".jpg";
            commTool.loaderTextureFun(maskp, (_tex3) => {
                mainImgMat.setTexture("maskTex", _tex3);
                this.isMask = true;
            });
            //     }
            // }, true);
        }
    }

    private mainImgMat: m4m.framework.material;
    public isMask: boolean = false;
    //切换效果 时间
    private maskSustainTime = 1;
    private nowMaskTime= 0;
    private update(delta: number) {
        if (!this.isMask)
            return;
        this.nowMaskTime += delta;
        if (this.nowMaskTime >= this.maskSustainTime) {
            this.isMask = false;
            this.nowMaskTime = this.maskSustainTime;
            //切换效果结束
            this.viewData.changeRoleAndTalkImageState(true);
            // GALMgr_1.GALMgr.nextTalk();
        }
        if (this.maskSustainTime > 0) {
            this.mainImgMat.setFloat("threshold", this.nowMaskTime / this.maskSustainTime);
        }
        else {
            this.mainImgMat.setFloat("threshold", 1);
        }
    }

    /**
     * 设置角色立绘位置和缩放, xy为屏幕百分比
     */
    public setTransformData(trans: m4m.framework.transform2D, x: number | null, y: number | null,
        scaleX: number | null, scaleY: number | null,
        anchorX: number | null, anchorY: number | null) {
        let uiRootTest = this.transform;
        let width = uiRootTest.width;
        let height = uiRootTest.height;

        if (x == null) {
            x = 0;
        }
        if (y == null) {
            y = 0;
        }
        if (anchorX == null) {
            anchorX = 0;
        }
        if (anchorY == null) {
            anchorY = 0;
        }
        trans.localScale = new m4m.math.vector2(scaleX, scaleY);
        trans.setLayoutValue(layoutOption.LEFT, width * x - trans.width * scaleX * anchorX);
        trans.setLayoutValue(layoutOption.TOP, height * y - trans.height * scaleY * anchorY);
        trans.markDirty();
    }
}