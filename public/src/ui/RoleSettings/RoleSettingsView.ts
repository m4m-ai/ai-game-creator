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
import { GridExtend } from "Data/GridExtend/GridExtend";
import { RoleSettings } from "./RoleSettings";
import { SoundRayCell } from "./SoundRayCell";
import { RoleSettingsViewData } from "./RoleSettingsViewData";
import { GameMgr } from "GameMgr";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { EditorGuideType, GuideIndexType, PlayerGuideManager, guideUIName } from "Manager/PlayerGuideManager";
import { UiNames } from "Manager/UIData/UiNames";
import { ProjectRoleManagerRequest } from "AutoCode/Net/ClientRequest/ProjectRoleManagerRequest";
import { EditUIType, GameProjectManager } from "Manager/GameProjectManager";
import { RoleSettingManager } from "Manager/RoleSettingManager";
import { GalRoleData } from "GalRoleData";
import { FrameMgr } from "Tools/FrameMgr";
import { AIResourceManager } from "Manager/AIResourceManager";

export class RoleSettingsView extends RoleSettings.RoleSettings {
    public static Instance: RoleSettingsView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public grid: GridExtend<RoleSettings.sound2>;
    public viewData: RoleSettingsViewData;
    public currentGalroleData: GalRoleData;
    public currentRoleUUid;
    private isRebackBol = false;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.plus_btn_btnEvent = this.CharacterPortraitFun.bind(this);
        this.savebg_btn_btnEvent = this.SaveBtnFun.bind(this);
        this.collapse_btn_btnEvent = this.recoverBtnFun.bind(this);
        this.unfold_btn_btnEvent = this.expandBtnFun.bind(this);
        this.upload_btn_btnEvent = this.uploadBtnFun.bind(this);
        //编辑器中返回上一步
        this.previousstep_btn_btnEvent = this.reBackFun.bind(this);
        //编辑器保存
        this.multiplebgbtnc_btn_btnEvent = this.editorSaveFun.bind(this);
        //编辑器AI重新生成
        this.multiplebgbtncbg2_btn_btnEvent = this.AIregenerationFun.bind(this);

        this.viewData = new RoleSettingsViewData(this);

        this.text1_lab_text("角色名");
        this.text2_lab_text("角色设定");
        this.text3_lab_text("角色声线");
        this.text4_lab_text("角色立绘");
        this.inputtexta_lab_text("");
        this.inputtexta1_lab_text("请输入角色名");
        this.inputtextb_lab_text("");
        this.inputtextb1_lab_text("请输入角色设定");
        this.save_lab_text("保存");
        this.ash_lab_text("保存");

        this.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.TextLabel.horizontalOverflow = false;
        this.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.TextLabel.verticalOverflow = false;
        this.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.OverflowMode = m4m.framework.inputOverflowMode.HIDDEN;
        //多行模式
        this.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.LineType = m4m.framework.lineType.MultiLine_NewLine;

        this.grid = new GridExtend<RoleSettings.sound2>(
            this.bg3.bg2.bg1.artstylebg2.artstylebg.unfoldbg_img.unfoldbg1_scr.unfoldbg1content.sound2, SoundRayCell, {
            columns: 1,
            rows: 10,
            offsetY: 50,
            viewData: this.viewData,
        });
        FrameMgr.Add(this.updateFun, this);
    }
    public CharacterPortraitFun() {
        console.log("角色立绘按钮");
        //这里先直接设置一张图
        let gameScr = GameMgr.Role + "aiRole6.png";
        this.viewData.standingPainting = gameScr;
        CommonUIUtils.setTextureFuncProportionalScaling(this.bg3.bg2.bg1.picbg_img.pic_raw.rawImage2D, gameScr);
        this.bg3.bg2.bg1.picbg_img.pic_raw.transform.visible = true;
        this.bg3.bg2.bg1.picbg_img.plus_btn.transform.visible = false;
    }
    private SaveBtnFun() {
        if (this.canSaveBol) {
            console.log("保存按钮");
            if (GameProjectManager.instance.currentGalData.roles) {
                //后续需要一个当前选择编辑得角色 id
                let hasRoleBol = false;
                for (let roleId in GameProjectManager.instance.currentGalData.roles) {//从项目的角色字典中找到当前想要，如果没有则是新建角色
                    if (roleId == this.currentRoleUUid) {
                        hasRoleBol = true;
                    }
                }
                if (!hasRoleBol) {
                    this.setNewGalRoleDataFun();
                }
            } else {
                this.setNewGalRoleDataFun();
            }
            this.setCurrentData();
            let galroleData = JSON.stringify(this.currentGalroleData);
            console.log("保存的 角色设定数据 ------ ", galroleData);
            ProjectRoleManagerRequest.Instance.SetRoleSetting(GameProjectManager.instance.currentGalData.id, this.currentRoleUUid, galroleData);
            this.saveLocalData();
            if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.RoleResource) {
                GameProjectManager.instance.currentSchedule = GuideIndexType.RoleResource;
                GameProjectManager.instance.sendGuideIndexToService();
            }
            UIOpenOrHideManager.Instance.HideRoleSettingsView();
            UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
            PlayerGuideManager.instance.newSetUIshowByIndex(true, guideUIName.characterPreview, EditorGuideType.editorRoleSettingPreview);
        }
    }
    private setNewGalRoleDataFun() {
        this.currentGalroleData = new GalRoleData();
        this.currentGalroleData.id = this.currentRoleUUid;
        this.currentGalroleData.RoleName = "";
        this.currentGalroleData.Gender = "";
        this.currentGalroleData.RoleDefinition = "";
        this.currentGalroleData.Appearance = "";
        this.currentGalroleData.Profile = "";
        this.currentGalroleData.exitScene = "";
        this.currentGalroleData.roleDrawing = { "normal": "" };//["normal"]
        this.currentGalroleData.voiceID = "";
    }
    private expandBtnFun() {
        console.log("展开按钮");
        this.bg3.bg2.bg1.artstylebg2.unfoldbg2_img.collapse_btn.transform.visible = true;
        this.bg3.bg2.bg1.artstylebg2.unfoldbg2_img.unfold_btn.transform.visible = false;
        this.bg3.bg2.bg1.artstylebg2.artstylebg.unfoldbg_img.transform.visible = true;
    }
    public recoverBtnFun() {
        console.log("收回按钮");
        this.bg3.bg2.bg1.artstylebg2.unfoldbg2_img.collapse_btn.transform.visible = false;
        this.bg3.bg2.bg1.artstylebg2.unfoldbg2_img.unfold_btn.transform.visible = true;
        this.bg3.bg2.bg1.artstylebg2.artstylebg.unfoldbg_img.transform.visible = false;
    }
    public uploadBtnFun() {
        console.log("点击上传按钮  打开上传图片弹窗");
    }

    public reBackFun() {
        console.log("编辑器 返回");
        this.isRebackBol = true;
        if (!PlayerGuideManager.isNewGuideBol) {
            AIResourceManager.instance.editorRebackOrSave();
            AIResourceManager.openUIname = UiNames.FileManagerPanel;
            AIResourceManager.closeUIname = UiNames.CharacterSetting;
        }
    }
    public editorSaveFun() {
        console.log("编辑器 保存");
        this.setCurrentData();
        let galroleData = JSON.stringify(this.currentGalroleData);
        console.log("保存的 角色设定数据 ！！！ ", galroleData);
        ProjectRoleManagerRequest.Instance.SetRoleSetting(GameProjectManager.instance.currentGalData.id, this.currentRoleUUid, galroleData);
        if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.ChapterScenarios) {
            GameProjectManager.instance.currentSchedule = GuideIndexType.ChapterScenarios;
            GameProjectManager.instance.sendGuideIndexToService();
        }
        if (!PlayerGuideManager.isNewGuideBol) {
            AIResourceManager.openUIname = UiNames.CharacterSetting;
            AIResourceManager.closeUIname = UiNames.RoleSettings;
            AIResourceManager.instance.editorRebackOrSave();
            AIResourceManager.openUIname = UiNames.FileManagerPanel;
            AIResourceManager.closeUIname = UiNames.CharacterSetting;
        } else {
            UIOpenOrHideManager.Instance.HideNavigationBarView();
            PlayerGuideManager.instance.guideStepIndex = 2;
            PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
            PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
        }
    }
    public AIregenerationFun() {
        console.log("ai 重新生成");
        if (PlayerGuideManager.isNewGuideBol) {
            UIOpenOrHideManager.Instance.HideNavigationBarView();
        }
        PlayerGuideManager.instance.setAIGuidByIndex(1);
    }
    public onShowFunc(CenterDisplayBol: boolean) {
        this.isRebackBol = false;
        this.viewData.voiceId = "";
        AIResourceManager.currentUIname = UiNames.RoleSettings;
        GameProjectManager.instance.editCurrentUIType = EditUIType.RoleResource;
        this.search2_lab_text("/角色设定");
        this.multiplebgbtnlabc1_lab_text("保存");
        this.multiplebgbtnlabc2_lab_text("AI重新生成");
        this.ash3_lab_text("AI重新生成");
        //默认角色立绘不显示
        this.bg3.bg2.bg1.picbg_img.pic_raw.transform.visible = false;
        this.bg3.bg2.bg1.artstylebg2.artstylebg.unfoldbg_img.transform.visible = false;
        this.bg3.bg2.bg1.artstylebg2.unfoldbg2_img.collapse_btn.transform.visible = false;
        this.bg3.bg2.bg1.artstylebg2.unfoldbg2_img.unfold_btn.transform.visible = true;
        this.viewData.standingPainting = "";

        this.bg3.naturalbtnbg.uncheckedbg_btn.transform.visible = false;
        this.bg3.naturalbtnbg.ashbg3_btn.transform.visible = false;
        this.bg3.naturalbtnbg.ashbg1_btn.transform.visible = false;

        if (RoleSettingManager.instance.currentRoleID == "") {
            this.currentRoleUUid = RoleSettingManager.instance.creatUuid();
            RoleSettingManager.instance.currentRoleID = this.currentRoleUUid;
        } else {
            this.currentRoleUUid = RoleSettingManager.instance.currentRoleID;
        }
        if (RoleSettingManager.instance.newGalRoleDataDic.has(GameProjectManager.instance.currentGalData.id)) {
            let roleArr = RoleSettingManager.instance.newGalRoleDataDic.get(GameProjectManager.instance.currentGalData.id);
            let roleIndex = roleArr.findIndex(value => value.id == RoleSettingManager.instance.currentRoleID);
            if (roleIndex != -1) {
                if (!this.currentGalroleData) {
                    this.currentGalroleData = new GalRoleData();
                }
                this.currentGalroleData = roleArr[roleIndex];
            } else {
                this.setNewGalRoleDataFun();
            }
        }
        if (!this.currentGalroleData) {
            this.currentGalroleData = new GalRoleData();
        }
        console.log("当前得 角色 数据 ---------", this.currentGalroleData);
        this.grid.setDataList(GameProjectManager.instance.prviewVoiceList);
        //美术风格
        if (this.currentGalroleData.voiceID != null && this.currentGalroleData.voiceID != "") {

            this.viewData.voiceId = this.currentGalroleData.voiceID;

            let voiceIndex = GameProjectManager.instance.prviewVoiceList.findIndex(value => value.id == this.currentGalroleData.voiceID);
            if (voiceIndex != -1) {
                let voiceData = GameProjectManager.instance.prviewVoiceList[voiceIndex];
                let voiceName = voiceData.desc;
                this.artstyle1_lab_text(voiceName);
            }
        } else {
            this.grid.selectIndex = 0;
        }
        //角色名
        if (this.currentGalroleData.RoleName != null && this.currentGalroleData.RoleName != "") {
            this.bg3.bg2.bg1.inpa3.inpa_inp.inputField.text = this.currentGalroleData.RoleName;
        }
        //角色设定
        if (this.currentGalroleData.Profile != null && this.currentGalroleData.Profile != "") {
            this.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.text = this.currentGalroleData.Profile;
        }
        //角色立绘
        if (this.currentGalroleData.roleDrawing != null && this.currentGalroleData.roleDrawing["normal"] != null && this.currentGalroleData.roleDrawing["normal"] != "") {
            CommonUIUtils.setTextureFuncProportionalScaling(this.bg3.bg2.bg1.picbg_img.pic_raw.rawImage2D, this.currentGalroleData.roleDrawing["normal"]);
            this.bg3.bg2.bg1.picbg_img.pic_raw.transform.visible = true;
            this.bg3.bg2.bg1.picbg_img.plus_btn.transform.visible = false;
            this.viewData.standingPainting = this.currentGalroleData.roleDrawing["normal"];
        }
        if (GameProjectManager.isInEditorBol) {
            this.bg3.crown.transform.visible = true;
            this.bg3.naturalbtnbg.transform.visible = true;
            this.bg3.savebg_btn.transform.visible = false;
        } else {
            this.bg3.crown.transform.visible = false;
            this.bg3.naturalbtnbg.transform.visible = false;
            this.bg3.savebg_btn.transform.visible = true;
        }
        if (CenterDisplayBol) {
            let totalWidth = this.bg.transform.width;
            let uiWidth = this.bg3.bg2.transform.width;
            let posX = (totalWidth - uiWidth) / 2;
            this.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
            this.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            this.transform.markDirty();
        } else {
            if (GameProjectManager.isInEditorBol) {
                this.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
                this.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
                this.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
                this.transform.markDirty();
            } else {
                this.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
                this.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
                this.transform.markDirty();
            }
        }
        RoleSettingsView.Instance.bg3.bg2.bg1.artstylebg2.artstylebg.unfoldbg_img.unfoldbg1_scr.unfoldbg1content.transform.localTranslate.y = 0;
        RoleSettingsView.Instance.bg3.bg2.bg1.artstylebg2.artstylebg.unfoldbg_img.unfoldbg1_scr.unfoldbg1content.transform.height = this.grid.height;
    }
    private canSaveBol = false;
    public updateFun() {
        if (GameProjectManager.isInEditorBol) {
            if (this.bg3.bg2.bg1.inpa3.inpa_inp.inputField.text != "" && this.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.text != "" && this.viewData.standingPainting != "") {
                this.bg3.naturalbtnbg.ashbg1_btn.transform.visible = false;
                this.bg3.naturalbtnbg.multiplebgbtnc_btn.transform.visible = true;
            } else {
                this.bg3.naturalbtnbg.ashbg1_btn.transform.visible = true;
                this.bg3.naturalbtnbg.multiplebgbtnc_btn.transform.visible = false;
            }
        } else {
            if (this.bg3.bg2.bg1.inpa3.inpa_inp.inputField.text != "" && this.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.text != "" && this.viewData.standingPainting != "") {
                this.bg3.savebg_btn.savebg3_img.transform.visible = false;
                this.canSaveBol = true;
            } else {
                this.bg3.savebg_btn.savebg3_img.transform.visible = true;
                this.canSaveBol = false;
            }
        }
    }
    public onHideFunc() {
        //界面被关闭时，本地保存下当前页面的数据
        this.setCurrentData();
        this.saveLocalData();
    }
    public onDisposeFunc() {
        console.error("onDisposeFunc");
        this.viewData.dispose();
        this.grid.dispose();
        FrameMgr.Remove(this.updateFun, this);
    }
    public setCurrentData() {
        let roleName = this.bg3.bg2.bg1.inpa3.inpa_inp.inputField.text;
        let roleSetting = this.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.text;

        this.currentGalroleData = new GalRoleData();
        if (this.currentRoleUUid != "") {
            this.currentGalroleData.id = this.currentRoleUUid;
        }
        if (roleName != "") {//角色名
            RoleSettingManager.instance.currentRoleData.RoleName = roleName;
            this.currentGalroleData.RoleName = roleName
        }
        if (roleSetting != "") {//角色设定
            RoleSettingManager.instance.currentRoleData.Profile = roleSetting;
            this.currentGalroleData.Profile = roleSetting;
        }
        //角色立绘设置
        if (this.viewData.standingPainting != "") {
            RoleSettingManager.instance.currentRoleData.roleDrawing = { "normal": this.viewData.standingPainting }
            this.currentGalroleData.roleDrawing = { "normal": this.viewData.standingPainting }
        }
        //角色声线
        if (this.viewData.voiceId != "") {
            RoleSettingManager.instance.currentRoleData.voiceID = this.viewData.voiceId;
            this.currentGalroleData.voiceID = this.viewData.voiceId;
        }
        if (this.viewData.RoleDefinition != "") {
            RoleSettingManager.instance.currentRoleData.RoleDefinition = this.viewData.RoleDefinition;
            this.currentGalroleData.RoleDefinition = this.viewData.RoleDefinition;
        }
    }
    public saveLocalData() {
        //本地存储的数据---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        console.log("本地数据------  ：", this.currentGalroleData);
        if (this.currentGalroleData.RoleName && this.currentGalroleData.Profile && this.viewData.standingPainting != "" && !this.isRebackBol) {
            RoleSettingManager.instance.newAddRoleData(this.currentGalroleData);
        }
    }
}