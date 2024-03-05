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
import { SliderComponentExtend } from "Common/SliderComponentExtend";
import { ChapterSceneDirectoryManager } from "Manager/ChapterSceneDirectoryManager";
import { EditorManager } from "Manager/EditorManager";
import { PlayerGuideManager } from "Manager/PlayerGuideManager";
import { NavigationBarBackData, UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { BackgroundMusic } from "./BackgroundMusic";
import { BackgroundMusicViewData } from "./BackgroundMusicViewData";



export class BackgroundMusicView extends BackgroundMusic.BackgroundMusic {
    public static Instance: BackgroundMusicView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public index: number;
    public viewData: BackgroundMusicViewData;
    private maxvalue: number = 100;
    private curvalue: number = 50;
    private sliderExtend: SliderComponentExtend;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.viewData = new BackgroundMusicViewData();

        this.text1_lab_text("背景音乐名");
        this.text2_lab_text("音乐描述");
        this.text3_lab_text("音乐文件");
        this.save_lab_text("保存");
        this.time_lab_text("0:00");
        this.text3_lab_text("0:00");
        this.text4_lab_text("村庄之歌.mp3");
        this.savebg_btn_btnEvent = this.saveBgBtnFun.bind(this);
        this.upload_btn_btnEvent = this.uploadBtnFun.bind(this);
        this.play_btn_btnEvent = this.playBtnFun.bind(this);
        this.pause_btn_btnEvent = this.pauseBtnFun.bind(this);
        this.back_btn_btnEvent = this.backBtnFun.bind(this);

        this.bg2.bg1.inpb_inp.inputField.LineType = m4m.framework.lineType.MultiLine_NewLine;
        this.bg2.bg1.inpb_inp.inputField.TextLabel.horizontalOverflow = false;
        this.bg2.bg1.inpb_inp.inputField.TextLabel.verticalOverflow = true;
        this.bg2.bg1.inpb_inp.inputField.PlaceholderLabel.text = "请输入音乐描述";
        this.bg2.bg1.inpa_inp.inputField.TextLabel.horizontalOverflow = true;
        this.bg2.bg1.inpa_inp.inputField.TextLabel.verticalOverflow = false;
        this.bg2.bg1.inpa_inp.inputField.PlaceholderLabel.text = "请输入音乐名";
        this.sliderExtend = this.bg2.bg1.playbg.playerbg_img.player1_bar.progressbar.transform.addComponent("SliderComponentExtend") as SliderComponentExtend;
        this.sliderExtend.setSliderBtn = this.bg2.bg1.playbg.playerbg_img.barbtn_btn.button;
        this.sliderExtend.callBackFun = this.sliderExtendCallback.bind(this);
        this.bg2.bg1.playbg.playerbg_img.player1_bar.progressbar.value = 0;

        this.bg2.bg1.playbg.play_btn.transform.visible = false;
    }

    private onShowFunc(CenterDisplayBol: boolean) {
        if (this.viewData.sceneData) {
            let name = "/" + this.viewData.sceneData.chapter.chapterName + "/" + this.viewData.sceneData.sceneName
            this.text_lab_text(name);
        }
        this.viewData.CenterDisplayBol(CenterDisplayBol);
    }

    private onHideFunc() {
    }

    private onDisposeFunc() {
        this.viewData.dispose();
    }

    private uploadBtnFun() {
        console.log("选择本地音乐");
    }

    private saveBgBtnFun() {
        let scene = ChapterSceneDirectoryManager.Instance.SceneData;
        EditorManager.Instance.changeScene(scene);
        //保存
        UIOpenOrHideManager.Instance.HideBackgroundMusicView();
        UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
        let data = new NavigationBarBackData();
        data.uiname = "";
        UIOpenOrHideManager.Instance.OpenNavigationBarView(data);
    }

    private playBtnFun() {
        console.log("暂停按钮")
    }

    private pauseBtnFun() {
        console.log("开始按钮")
    }

    public backBtnFun() {
        let scene = ChapterSceneDirectoryManager.Instance.SceneData;
        EditorManager.Instance.changeScene(scene);
        PlayerGuideManager.instance.guideStepIndex = 5;
        PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex + 1;
        PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
    }

    public sliderExtendCallback(sliderVale: number) {
        let x = Math.round(sliderVale * this.maxvalue);
        this.curvalue = x;
    }
}