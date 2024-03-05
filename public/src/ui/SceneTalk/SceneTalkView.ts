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
import { AIResourceManager } from "Manager/AIResourceManager";
import { ChapterSceneDirectoryManager, ChapterSceneType } from "Manager/ChapterSceneDirectoryManager";
import { EditUIType, GameProjectManager } from "Manager/GameProjectManager";
import { EditorGuideType, GuideIndexType, guideUIName, PlayerGuideManager } from "Manager/PlayerGuideManager";
import { SceneTalkManager } from "Manager/SceneTalkManager"
import { UiNames } from "Manager/UIData/UiNames";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { FrameMgr } from "Tools/FrameMgr";
import { SceneTalk } from "./SceneTalk";
import { SceneTalkViewData } from "./SceneTalkViewData";
import { SceneInfo } from "Data/SceneInfo";
import { DialogManagerRequest } from "AutoCode/Net/ClientRequest/DialogManagerRequest";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "Data/BindKeyName";

export class SceneTalkView extends SceneTalk.SceneTalk {
    public static Instance: SceneTalkView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public index: number;
    public viewData: SceneTalkViewData;
    private DisplayBol: boolean;

    //private binder: FunctionBinder;

    //输入框初始值
    private startText: string;

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.bg2.bg3.inpb_inp.inputField.LineType = m4m.framework.lineType.MultiLine_NewLine;
        this.bg2.bg3.inpb_inp.inputField.OverflowMode = m4m.framework.inputOverflowMode.HIDDEN;
        this.bg2.bg3.inpb_inp.inputField.TextLabel.horizontalOverflow = false;
        this.bg2.bg3.inpb_inp.inputField.TextLabel.verticalOverflow = false;
        this.bg2.bg3.inpb_inp.inputField.PlaceholderLabel.text = "请输入场景对话";
        this.text1_lab_text("场景对话");
        this.save_lab_text("保存");
        this.viewData = new SceneTalkViewData();
        this.back_btn_btnEvent = this.BackBtnFun.bind(this);
        this.savebg_btn_btnEvent = this.savebgBtnFun.bind(this);
        //编辑器AI重新生成
        this.multiplebgbtncbg2_btn_btnEvent = this.multiplebgbtncbgFunBind.bind(this);
        //编辑器保存
        this.multiplebgbtnc_btn_btnEvent = this.multiplebgbtncFunBind.bind(this);

        this.multiplebgbtnlabc2_lab_text("AI重新生成");
        this.multiplebgbtnlabc1_lab_text("保存并生成逻辑块");
        this.ash_lab_text("保存");
        this.unchecked_lab_text("保存");
        this.ash3_lab_text("AI重新生成");
        //滑动条
        this.bg2.naturalbtnbg.ashbg3_btn.transform.visible = false;
    }

    public inpText(text: string) {
        this.startText = text;
        this.bg2.bg3.inpb_inp.inputField.text = text;
    }

    private onShowFunc([CenterDisplayBol, sceneInfo]: [boolean, SceneInfo]) {
        if (!sceneInfo) {
            sceneInfo = ChapterSceneDirectoryManager.Instance.SceneData;
        }

        if (sceneInfo.stepText) {
            this.inpText(sceneInfo.stepText);
        } else {
            SceneTalkManager.Instance.GetVoicesByDaiglog(sceneInfo.chapter.id, sceneInfo.id)
            this.inpText("");
        }

        AIResourceManager.currentUIname = UiNames.SceneTalk;
        GameProjectManager.instance.editCurrentUIType = EditUIType.SceneDialogue;
        this.DisplayBol = CenterDisplayBol;
        if (this.viewData.sceneData) {
            let name = "/" + this.viewData.sceneData.chapter.chapterName + "/" + this.viewData.sceneData.sceneName;
            this.text_lab_text(name);
        }
        this.viewData.CenterDisplayBol(CenterDisplayBol);

        // if(!GameProjectManager.isInEditorBol){
        this.bg2.naturalbtnbg.multiplebgbtnc_btn.transform.visible = !CenterDisplayBol;
        this.bg2.naturalbtnbg.multiplebgbtncbg2_btn.transform.visible = !CenterDisplayBol;
        this.bg2.naturalbtnbg.ashbg1_btn.transform.visible = !CenterDisplayBol;
        this.bg2.naturalbtnbg.uncheckedbg_btn.transform.visible = CenterDisplayBol;
        this.bg2.naturalbtnbg.savebg_btn.transform.visible = CenterDisplayBol;
        // }else{
        //     this.bg2.naturalbtnbg.multiplebgbtnc_btn.transform.visible = !GameProjectManager.isInEditorBol;
        //     this.bg2.naturalbtnbg.multiplebgbtncbg2_btn.transform.visible = !GameProjectManager.isInEditorBol;
        //     this.bg2.savebg_btn.transform.visible = GameProjectManager.isInEditorBol;
        // }
        FrameMgr.Add(this.updata, this);
    }

    public updata() {
        let test = this.bg2.bg3.inpb_inp.inputField.text;
        let bool = test ? false : true;
        if (!this.DisplayBol) {
            this.bg2.naturalbtnbg.ashbg1_btn.transform.visible = bool;
        } else {
            this.bg2.naturalbtnbg.uncheckedbg_btn.transform.visible = bool;
        }
    }

    private onHideFunc() {
        let text = this.bg2.bg3.inpb_inp.inputField.TextLabel.text;
        SceneTalkManager.Instance.SceneTalk.content = text;
        FrameMgr.Remove(this.updata, this);
    }

    private onDisposeFunc() {
        this.viewData.dispose();
    }

    private multiplebgbtncbgFunBind() {
        console.log("ai 重新生成");
        if (PlayerGuideManager.isNewGuideBol) {
            UIOpenOrHideManager.Instance.HideNavigationBarView();
        }
        PlayerGuideManager.instance.setAIGuidByIndex(3);
    }

    private multiplebgbtncFunBind() {
        console.log("编辑器 保存");

        if (PlayerGuideManager.isNewGuideBol) { //引导中
            //保存
            if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.BackgroundPicture) {
                GameProjectManager.instance.currentSchedule = GuideIndexType.BackgroundPicture;
                GameProjectManager.instance.sendGuideIndexToService();
                // ProjectBasicSettingsManagerRequest.Instance.SetSchedule(GameProjectManager.instance.currentGalData.id, GameProjectManager.instance.currentSchedule);
            }
            UIOpenOrHideManager.Instance.HideNavigationBarView();
            PlayerGuideManager.instance.guideStepIndex = 5;
            PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
            PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
        } else {
            let text = this.bg2.bg3.inpb_inp.inputField.text;
            if (this.startText != text) {
                this.startText = text;
                //发生改变
                let sceneData = ChapterSceneDirectoryManager.Instance.SceneData;
                if (sceneData != null) {
                    sceneData.createStepByText(text);
                    sceneData.sendDialogDataToServer();
                }
            }
            AIResourceManager.instance.editorRebackOrSave();
            AIResourceManager.openUIname = UiNames.FileManagerPanel;
            AIResourceManager.closeUIname = UiNames.ChapterSceneMenu;
        }
    }

    private BackBtnFun() {
        if (!PlayerGuideManager.isNewGuideBol) {
            AIResourceManager.instance.editorRebackOrSave(ChapterSceneType.AITalkResource);
            AIResourceManager.openUIname = UiNames.FileManagerPanel;
            AIResourceManager.closeUIname = UiNames.ChapterSceneMenu;
        } else {
            UIOpenOrHideManager.Instance.HideNavigationBarView();
            PlayerGuideManager.instance.guideStepIndex = 3;
            PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex + 1;
            PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
        }
    }

    private savebgBtnFun() {
        let text = this.bg2.bg3.inpb_inp.inputField.text;
        if (text != null && text.length > 0) {
            if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.BackgroundPicture) {
                GameProjectManager.instance.currentSchedule = GuideIndexType.BackgroundPicture;
                GameProjectManager.instance.sendGuideIndexToService();
                // ProjectBasicSettingsManagerRequest.Instance.SetSchedule(GameProjectManager.instance.currentGalData.id, GameProjectManager.instance.currentSchedule);
            }
            // this.viewData.saveSceneTalk(this.viewData.sceneData.stepList);
            UIOpenOrHideManager.Instance.HideSceneTalkView();
            UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
            PlayerGuideManager.instance.newSetUIshowByIndex(true, guideUIName.SceneTalk, EditorGuideType.editorSceneDialogueSave);
        }
    }
}