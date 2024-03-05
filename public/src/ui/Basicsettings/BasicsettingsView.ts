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

import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { Basicsettings } from "./Basicsettings";
import { BasicsettingsViewData } from "./BasicsettingsViewData";
import { GridExtend, ScrollType } from "Data/GridExtend/GridExtend";
import { EditorGuideType, GuideIndexType, PlayerGuideManager, guideUIName } from "Manager/PlayerGuideManager";
import { ProjectBasicSettingsManagerRequest } from "AutoCode/Net/ClientRequest/ProjectBasicSettingsManagerRequest";
import { EditUIType, GameProjectManager } from "Manager/GameProjectManager";
import { BackStoryData } from "BackStoryData";
import { FrameMgr } from "Tools/FrameMgr";
import { AIResourceManager } from "Manager/AIResourceManager";
import { UiNames } from "Manager/UIData/UiNames";
import { BasicsettingsArtStyleCell } from "./BasicsettingsArtStyleCell";

export class BasicsettingsView extends Basicsettings.Basicsettings {
    public static Instance: BasicsettingsView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public viewData: BasicsettingsViewData;
    /**画风格子 */
    public artStyleGrid: GridExtend<Basicsettings.sound1_lab>;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.viewData = new BasicsettingsViewData();

        // this.animation_btn_btnEvent = this.selectRouteBtnFun.bind(this);
        this.savebg_btn_btnEvent = this.SaveBtnFun.bind(this);
        // this.collapse_btn_btnEvent = this.recoverBtnFun.bind(this);
        // this.unfold_btn_btnEvent = this.expandBtnFun.bind(this);

        //编辑器中保存按钮
        this.multiplebgbtnc_btn_btnEvent = this.EditorSaveBtnFun.bind(this);
        this.multiplebgbtnlabc1_lab_text("保存");
        this.ash_lab_text("保存");
        //AI一键生成
        this.uncheckedbg_btn_btnEvent = this.AIonetouchFun.bind(this);
        this.unchecked_lab_text("AI一键生成");
        //AI重新生成
        this.multiplebgbtncbg2_btn_btnEvent = this.AIgenerateFun.bind(this);
        this.multiplebgbtnlabc2_lab_text("AI重新生成");
        this.ash3_lab_text("AI重新生成");
        //返回按钮
        this.previousstep_btn_btnEvent = this.RebackFun.bind(this);
        this.search2_lab_text("/游戏基础设定");

        //文本设置
        this.title2_lab_text("游戏名");
        this.title4_lab_text("背景设定");
        this.save_lab_text("保存");

        //美术风格部分
        this.text3_lab_text(`美术风格`);
        this.artstyle1_lab_text(``);//(`${GameProjectManager.instance.currentGalData.artStyle}`);
        this.collapse_btn_btnEvent = this.unShowArtStyleList.bind(this);
        this.unfold_btn_btnEvent = this.showArtStyleList.bind(this);
        this.unShowArtStyleList();
        this.initGrid();

        this.bg1.bg2.setbg1.textinput_inp.inputField.OverflowMode = m4m.framework.inputOverflowMode.HIDDEN;
        FrameMgr.Add(this.updateFun, this);
    }
    private SaveBtnFun() {
        if (this.canSaveBol) {
            let gameName = this.bg1.bg2.searchbg1.iuput_inp.inputField.text;
            let gameBackground = this.bg1.bg2.setbg1.textinput_inp.inputField.text;
            // //点击保存，向服务器发送保存消息
            if (gameName != "" && gameName != "请输入游戏名" && gameName != this.currentBackstoryData.worldName) {
                this.currentBackstoryData.worldName = gameName;
                GameProjectManager.instance.currentBackStoryData.worldName = gameName;
            }
            if (gameBackground != "" && gameBackground != "请设置背景设定..." && gameBackground != this.currentBackstoryData.backStory) {
                this.currentBackstoryData.backStory = gameBackground;
                GameProjectManager.instance.currentBackStoryData.backStory = gameBackground;
            }
            UIOpenOrHideManager.Instance.HideBasicsettingsView();
            UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
            PlayerGuideManager.instance.newSetUIshowByIndex(true, guideUIName.Basicsettings, EditorGuideType.editorGameBasicSettingSave);
        }
    }

    //编辑器保存
    public EditorSaveBtnFun() {
        // console.log("编辑器保存");
        let gameName = this.bg1.bg2.searchbg1.iuput_inp.inputField.text;
        let gameBackground = this.bg1.bg2.setbg1.textinput_inp.inputField.text;
        //点击保存，向服务器发送保存消息
        let backStoryData = new BackStoryData();
        backStoryData.id = GameProjectManager.instance.currentGalData.id;
        console.log("gameName ：", gameName, "  galName", this.currentBackstoryData.worldName);
        if (gameName != "" && gameName != "请输入游戏名") {
            backStoryData.worldName = gameName;
        }
        console.log("gameBackground ：", gameBackground, "  backStory", this.currentBackstoryData.backStory);
        if (gameBackground != "" && gameBackground != "请设置背景设定...") {
            backStoryData.backStory = gameBackground;
        }
        let backStoryStr = JSON.stringify(backStoryData);
        ProjectBasicSettingsManagerRequest.Instance.SetBackStory(GameProjectManager.instance.currentGalData.id, backStoryStr);
        if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.RoleSetting) {
            GameProjectManager.instance.currentSchedule = GuideIndexType.RoleSetting;
            console.log("向服务器发送存储引导步骤索引 ===== ", GameProjectManager.instance.currentSchedule);
            GameProjectManager.instance.sendGuideIndexToService();
        }
        if (PlayerGuideManager.isNewGuideBol) {
            UIOpenOrHideManager.Instance.HideNavigationBarView();
            //保存后 进到下一步 角色设定
            PlayerGuideManager.instance.guideStepIndex = 1;
            PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
            PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
        } else {
            AIResourceManager.instance.editorRebackOrSave();
        }
    }
    //编辑器AI一键生成
    public AIonetouchFun() {
        console.log("编辑器AI一键生成");
        if (!PlayerGuideManager.isNewGuideBol) {
            this.viewData.setCommonPoupData();
        }
    }
    //AI重新生成
    public AIgenerateFun() {
        // console.log("AI重新生成");
        if (PlayerGuideManager.isNewGuideBol) {
            UIOpenOrHideManager.Instance.HideNavigationBarView();
            PlayerGuideManager.instance.setAIGuidByIndex(0);
        } else {
            PlayerGuideManager.instance.setAIGuidByIndex(0);
        }
    }
    //编辑器返回按钮
    public RebackFun() {
        // console.log("返回按钮");
        if (!PlayerGuideManager.isNewGuideBol) {
            AIResourceManager.instance.editorRebackOrSave();
        }
    }
    public onShowFunc(CenterDisplayBol: boolean) {
        AIResourceManager.currentUIname = UiNames.Basicsettings;
        GameProjectManager.instance.editCurrentUIType = EditUIType.BasicSetting;
        //默认不显示美术风格扩展区域
        this.bg1.bg2.setbg1.textinput_inp.inputField.TextLabel.horizontalOverflow = false;
        this.bg1.bg2.setbg1.textinput_inp.inputField.TextLabel.verticalOverflow = false;
        //多行模式
        this.bg1.bg2.setbg1.textinput_inp.inputField.LineType = m4m.framework.lineType.MultiLine_NewLine;

        this.gamename_lab_text("请输入游戏名字");
        this.gamename1_lab_text("请输入游戏名字");
        this.inputtextb1_lab_text("请设置背景设定...");
        this.inputtextb_lab_text("请设置背景设定");
        this.currentBackstoryData = new BackStoryData();
        console.log("current galdata  :", GameProjectManager.instance.currentGalData);

        if (GameProjectManager.instance.currentBackStoryData) {
            this.viewData.onGetBackstoryByIdFun(GameProjectManager.instance.currentBackStoryData);
        } else {
            if (GameProjectManager.instance.currentGalData && GameProjectManager.instance.currentGalData.backStory != "") {
                // console.log("有背景设定");
                let backStiryId = GameProjectManager.instance.currentGalData.backStory;
                // console.log("项目的 背景设定 id :", backStiryId);
                ProjectBasicSettingsManagerRequest.Instance.GetBackStory(backStiryId);
            } else {
                // console.log("无背景设定");
                this.setNewBackstoryDataFun();
            }
        }
        if (GameProjectManager.isInEditorBol) {
            this.bg3.transform.visible = true;
            this.bg3.naturalbtnbg.ashbg3_btn.transform.visible = false;
            this.bg1.savebg_btn.transform.visible = false;
        } else {
            this.bg3.transform.visible = false;
            this.bg1.savebg_btn.transform.visible = true;
            // this.unchecked_lab_text("保存");
        }
        if (CenterDisplayBol) {
            let totalWidth = this.bg.transform.width;
            let uiWidth = this.bg1.transform.width;
            let posX = (totalWidth - uiWidth) / 2;
            this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
            // this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            this.bg1.transform.markDirty();
        } else {
            if (GameProjectManager.isInEditorBol) {
                this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
                this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
                this.bg1.transform.markDirty();
                this.bg3.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
                this.bg3.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 60);
                this.bg3.crown.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            } else {
                this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
                this.bg1.transform.markDirty();
            }
        }
    }
    public currentBackstoryData: BackStoryData;
    private setNewBackstoryDataFun() {
        GameProjectManager.instance.currentBackStoryData = new BackStoryData();
        this.currentBackstoryData.id = GameProjectManager.instance.currentGalData.id;
        this.currentBackstoryData.backStory = "";
        this.currentBackstoryData.worldName = "";
    }
    private canSaveBol = false;
    public updateFun() {
        if (GameProjectManager.isInEditorBol) {
            if (this.bg1.bg2.searchbg1.iuput_inp.inputField.text != "" && this.bg1.bg2.setbg1.textinput_inp.inputField.text != "") {
                this.bg3.naturalbtnbg.ashbg1_btn.transform.visible = false;
                this.bg3.naturalbtnbg.multiplebgbtnc_btn.transform.visible = true;
            } else {
                this.bg3.naturalbtnbg.ashbg1_btn.transform.visible = true;
                this.bg3.naturalbtnbg.multiplebgbtnc_btn.transform.visible = false;
            }
        } else {
            if (this.bg1.bg2.searchbg1.iuput_inp.inputField.text != "" && this.bg1.bg2.setbg1.textinput_inp.inputField.text != "") {
                this.bg1.savebg_btn.savebg1_img.transform.visible = false;
                this.canSaveBol = true;
            } else {
                this.bg1.savebg_btn.savebg1_img.transform.visible = true;
                this.canSaveBol = false;
            }
        }

    }

    public unShowArtStyleList() {
        this.bg1.bg2.artstylebg2.unfoldbg2_img.collapse_btn.transform.visible = false;
        this.bg1.bg2.artstylebg2.artstylebg.unfoldbg_img.transform.visible = false;
        this.bg1.bg2.artstylebg2.unfoldbg2_img.unfold_btn.transform.visible = true;
    }

    public showArtStyleList() {
        this.bg1.bg2.artstylebg2.unfoldbg2_img.collapse_btn.transform.visible = true;
        this.bg1.bg2.artstylebg2.artstylebg.unfoldbg_img.transform.visible = true;
        this.bg1.bg2.artstylebg2.unfoldbg2_img.unfold_btn.transform.visible = false;
        if (this.viewData.artStyleDataList.length === 0) {
            this.GetStyleExample();
        }
    }

    public GetStyleExample() {
        let title: string = "";
        let getCount: number = 4;
        let isRandom: boolean = true;
        ProjectBasicSettingsManagerRequest.Instance.StableDiffusio_GetStyleExample(GameProjectManager.instance.currentGalData.id, title, getCount, isRandom);
    }

    public onHideFunc() {
        console.error("onHideFunc");
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
        this.viewData.dispose();
        FrameMgr.Remove(this.updateFun, this);
    }

    private initGrid() {
        this.artStyleGrid = new GridExtend(this.bg1.bg2.artstylebg2.artstylebg.unfoldbg_img.unfoldbg1_scr.unfoldbg1content.sound2.sound1_lab, BasicsettingsArtStyleCell, {
            columns: 1,
            offsetY: 10,
            scroll: this.bg1.bg2.artstylebg2.artstylebg.unfoldbg_img.unfoldbg1_scr,
            scrollType: ScrollType.vertical
        })
    }
}