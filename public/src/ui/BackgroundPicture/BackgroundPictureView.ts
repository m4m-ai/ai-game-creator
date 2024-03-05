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
import { BackGroundData } from "BackGroundData";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { StepPares } from "Data/Process/StepPares";
import { GameMgr } from "GameMgr";
import { AIResourceManager } from "Manager/AIResourceManager";
import { BackgroundPictureManager } from "Manager/BackgroundPictureManager";
import { CharacterFactionType } from "Manager/CharacterSettingManager";
import { EditUIType, GameProjectManager } from "Manager/GameProjectManager";
import { EditorGuideType, GuideIndexType, guideUIName, PlayerGuideManager } from "Manager/PlayerGuideManager";
import { UiNames } from "Manager/UIData/UiNames";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { FrameMgr } from "Tools/FrameMgr";
import { BackgroundPicture } from "./BackgroundPicture";
import { BackgroundPictureViewData, PictureData } from "./BackgroundPictureViewData";
import { AppMain } from "appMain";
import { BuildType } from "GameEnum";
import { ChatTabEnum } from "Data/EnumType";

export class BackgroundPictureView extends BackgroundPicture.BackgroundPicture {
    public static Instance: BackgroundPictureView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public index: number;
    public viewData: BackgroundPictureViewData;
    public CenterDisplayBol: boolean;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.viewData = new BackgroundPictureViewData();
        this.bg1.inpbbg2.inpb_inp.inputField.LineType = m4m.framework.lineType.MultiLine_NewLine;
        this.bg1.inpbbg2.inpb_inp.inputField.OverflowMode = m4m.framework.inputOverflowMode.HIDDEN;
        this.bg1.inpbbg2.inpb_inp.inputField.TextLabel.horizontalOverflow = false;
        this.bg1.inpbbg2.inpb_inp.inputField.TextLabel.verticalOverflow = false;
        this.bg1.inpbbg2.inpb_inp.inputField.PlaceholderLabel.text = "请输入背景描述";

        this.text1_lab_text("背景图名");
        this.text2_lab_text("背景描述");
        this.text3_lab_text("背景图片");
        this.upload_btn_btnEvent = this.uploadBtnFun.bind(this);
        this.bg1.inpa3.inpa_inp.inputField.TextLabel.horizontalOverflow = true;
        this.bg1.inpa3.inpa_inp.inputField.TextLabel.verticalOverflow = false;
        this.bg1.inpa3.inpa_inp.inputField.PlaceholderLabel.text = "请输入背景图名";

        this.save_lab_text("保存");
        this.savebg_btn_btnEvent = this.saveBgBtnFun.bind(this);

        this.image1_btn_btnEvent = this.ImageBtnFun.bind(this);

        this.previousstep_btn_btnEvent = this.PreviousstepBtnFun.bind(this);

        //编辑器保存
        this.multiplebgbtnc_btn_btnEvent = this.multiplebgbtncFunBind.bind(this);
        //编辑器AI重新生成
        this.multiplebgbtncbg2_btn_btnEvent = this.multiplebgbtncbgFunBind.bind(this);
        this.multiplebgbtnlabc2_lab_text("AI重新生成");
        this.multiplebgbtnlabc1_lab_text("保存");
        this.unchecked_lab_text("保存");
        this.ash_lab_text("保存");
        this.ash3_lab_text("AI重新生成");
        this.bg1.naturalbtnbg.ashbg3_btn.transform.visible = false;

        this.text4_lab_text("");

        this.bg1.setbacbg2.setbackgbg.transform.visible = false;
        this.bg1.setbacbg2.setbackgbg1.transform.visible = false;
        this.bg1.naturalbtnbg.ashbg1_btn.transform.visible = false;
    }

    private onShowFunc(CenterDisplayBol: boolean) {
        AIResourceManager.currentUIname = UiNames.BackgroundPicture;
        GameProjectManager.instance.editCurrentUIType = EditUIType.BackgroundResource;
        if (this.viewData.sceneData) {
            let name = "/" + this.viewData.sceneData.chapter.chapterName + "/" + this.viewData.sceneData.sceneName
            this.search2_lab_text(name);
        }
        this.viewData.CenterDisplayBol(CenterDisplayBol);
        if (!this.viewData.getBackgroundPicture()) {
            let PictureData = BackgroundPictureManager.Instance.backgrounPicture;
            if (PictureData) {
                this.backgrounText(PictureData);
            }
        } else {
            let data = this.viewData.getBackgroundPicture();
            if (data) {
                this.backrounDataText(data.background);
            }
        }
        this.CenterDisplayBol = CenterDisplayBol;
        this.bg1.naturalbtnbg.multiplebgbtnc_btn.transform.visible = !CenterDisplayBol;
        this.bg1.naturalbtnbg.multiplebgbtncbg2_btn.transform.visible = !CenterDisplayBol;
        this.bg1.naturalbtnbg.ashbg1_btn.transform.visible = !CenterDisplayBol;
        this.bg1.naturalbtnbg.uncheckedbg_btn.transform.visible = CenterDisplayBol;
        this.bg1.savebg_btn.transform.visible = CenterDisplayBol;
        FrameMgr.Add(this.updata, this);
    }

    private updata() {
        let text = this.bg1.inpa3.inpa_inp.inputField.text
        let inptext = this.bg1.inpbbg2.inpb_inp.inputField.text
        let image = this.viewData.image;
        let bool = (text && inptext && image) ? false : true;
        if (!this.CenterDisplayBol) {
            this.bg1.naturalbtnbg.ashbg1_btn.transform.visible = bool;
        } else {
            this.bg1.naturalbtnbg.uncheckedbg_btn.transform.visible = bool;
        }
    }

    private onHideFunc() {
        let picture = BackgroundPictureManager.Instance.backgrounPicture
        picture.imageDescription = this.bg1.inpbbg2.inpb_inp.inputField.TextLabel.text;
        picture.imageName = this.bg1.inpa3.inpa_inp.inputField.TextLabel.text;
        picture.image = this.viewData.image;

        FrameMgr.Remove(this.updata, this);
    }

    public backgrounText(data: PictureData) {
        if (data.imageDescription) {
            this.bg1.inpbbg2.inpb_inp.inputField.text = data.imageDescription;
        }
        if (data.imageName) {
            this.bg1.inpa3.inpa_inp.inputField.text = data.imageName;
        }
        if (data.image) {
            this.viewData.image = data.image;
            CommonUIUtils.setTextureFun(this.bg1.imagebg_img.image_raw.rawImage2D, data.image);
            this.bg1.imagebg_img.image1_btn.transform.visible = false;
        }
    }
    public backrounDataText(data: BackGroundData) {
        if (data.backStory) {
            this.bg1.inpbbg2.inpb_inp.inputField.text = data.backStory;
        }
        if (data.BGName) {
            this.bg1.inpa3.inpa_inp.inputField.text = data.BGName;
        }
        if (data.resPath) {
            this.viewData.image = data.resPath;
            CommonUIUtils.setTextureFun(this.bg1.imagebg_img.image_raw.rawImage2D, data.resPath);
            this.bg1.imagebg_img.image1_btn.transform.visible = false;
        }
    }

    private onDisposeFunc() {
        this.viewData.dispose();
    }

    private uploadBtnFun() {
        console.log("选择本地图片");
    }

    private multiplebgbtncFunBind() {
        console.log("编辑器 保存");
        let desc = this.bg1.inpbbg2.inpb_inp.inputField.TextLabel.text;
        let name = this.bg1.inpa3.inpa_inp.inputField.TextLabel.text;
        let image = this.viewData.image
        this.updateFunBind(desc, name, image);
        if (PlayerGuideManager.isNewGuideBol) {
            if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.BackgroundMusic) {
                GameProjectManager.instance.currentSchedule = 9;
                GameProjectManager.instance.sendGuideIndexToService();
                // ProjectBasicSettingsManagerRequest.Instance.SetSchedule(GameProjectManager.instance.currentGalData.id, GameProjectManager.instance.currentSchedule);
            }
            //保存
            UIOpenOrHideManager.Instance.HideNavigationBarView();
            PlayerGuideManager.instance.guideStepIndex = 7;
            PlayerGuideManager.instance.lastStepIndex = 5;
            PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
            UIOpenOrHideManager.Instance.HideBackgroundPictureView();
        } else {
            AIResourceManager.instance.editorRebackOrSave();
            AIResourceManager.openUIname = UiNames.ChapterSceneMenu;
            AIResourceManager.closeUIname = UiNames.CharacterSetting;
        }
    }

    private updateFunBind(desc: string, name: string, image: string) {
        let data = this.viewData.getBackgroundPicture();
        if (data) {
            let backGround = new BackGroundData();
            backGround.id = data.background.id;
            backGround.chapter = data.background.chapter;
            backGround.scene = data.background.scene;
            backGround.projectId = GameProjectManager.instance.currentGalData.id;
            backGround.backStory = desc;
            backGround.BGName = name;
            backGround.resPath = image;
            BackgroundPictureManager.Instance.addBackgrounPictureData(backGround);
        } else {
            this.viewData.Addbackground(desc, name);
            let backgroundStep = StepPares.createDefaultBackgroundStep("1", this.viewData.image);
            this.viewData.sceneData.setBackground(backgroundStep);
            this.viewData.sceneData.sendDialogDataToServer();
        }
    }

    public multiplebgbtncbgFunBind() {
        console.log("ai 重新生成");
        if (AppMain.buildType == BuildType.StoryType) {
            let tabIndex = 0;
            tabIndex = ChatTabEnum.backgroundImage;
            PlayerGuideManager.instance.changeChatTabFun(tabIndex);
            return;
        }
        if (PlayerGuideManager.isNewGuideBol) {
            UIOpenOrHideManager.Instance.HideNavigationBarView();
        }
        PlayerGuideManager.instance.setAIGuidByIndex(4);
    }


    private saveBgBtnFun() {
        //保存
        // if (this.bg1.inpb_inp.inputField.text && this.bg1.input_inp.inputField.text) {
        let desc = this.bg1.inpbbg2.inpb_inp.inputField.TextLabel.text;
        let name = this.bg1.inpa3.inpa_inp.inputField.TextLabel.text;

        if (!this.viewData.getBackgroundPicture()) {
            this.viewData.Addbackground(desc, name);
        }
        UIOpenOrHideManager.Instance.HideBackgroundPictureView();
        UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
        PlayerGuideManager.instance.newSetUIshowByIndex(true, guideUIName.characterPreview, EditorGuideType.editorSceneBackgroundPreview, CharacterFactionType.backgroundPicture);
        //设置背景
        let backgroundStep = StepPares.createDefaultBackgroundStep("1", this.viewData.image);
        this.viewData.sceneData.setBackground(backgroundStep);
        this.viewData.sceneData.sendDialogDataToServer();
        // }
        if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.BackgroundResource) {
            GameProjectManager.instance.currentSchedule = GuideIndexType.BackgroundResource;
            GameProjectManager.instance.sendGuideIndexToService();
        }
    }


    private ImageBtnFun() {
        //背景图片
        let gameScr = GameMgr.Role + "ST15.png";
        CommonUIUtils.setTextureFun(this.bg1.imagebg_img.image_raw.rawImage2D, gameScr);
        this.bg1.imagebg_img.image1_btn.transform.visible = false;
        this.viewData.image = gameScr;
    }

    private PreviousstepBtnFun() {
        console.log("返回上一层");
        if (!PlayerGuideManager.isNewGuideBol) {
            AIResourceManager.instance.editorRebackOrSave();
            AIResourceManager.openUIname = UiNames.ChapterSceneMenu;
            AIResourceManager.closeUIname = UiNames.CharacterSetting;
        } else {

        }
    }
}