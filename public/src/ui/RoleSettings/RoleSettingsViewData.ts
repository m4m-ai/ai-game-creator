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
import { cMap } from "Data/Map";
import { ViewBaseData } from "Data/ViewBaseData";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "Data/BindKeyName";
import { RoleSettingsView } from "./RoleSettingsView";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { GameProjectManager } from "Manager/GameProjectManager";

export class RoleSettingsViewData implements ViewBaseData {
    public view: RoleSettingsView;
    public RoleDefinition : string;
    public constructor(view: RoleSettingsView) {
        this.view = view;
        this.changeroleSettingposition = this.changeroleSettingpositionFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.RoleSettingByAI, this.changeroleSettingposition);
        this.setRoleSetting = this.setRoleSettingFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.OnAiSetRoleSetting, this.setRoleSetting);
    }
    public changeroleSettingposition: Function;
    public setRoleSetting: Function;
    public standingPainting: string = "";
    public voiceId = "";
    public chooseSoundRay(data) {
        this.view.recoverBtnFun();
        this.view.artstyle1_lab_text(data.desc);
    }
    public changeroleSettingpositionFun() {
        if (GameProjectManager.isInEditorBol) {
            this.view.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
            this.view.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
            this.view.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
        } else {
            this.view.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
            this.view.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
        }
        this.view.transform.markDirty();
    }
    public setRoleSettingFun(roleData) {
        console.log("AI 返回得角色数据 ：", roleData);
        if (roleData.voice != null) {
            let voiceName = roleData.voice["name"];
            this.voiceId = roleData.voice["value"];
            console.log("     this.voiceId ", this.voiceId);
            RoleSettingsView.Instance.artstyle1_lab_text(voiceName);
            // RoleSettingManager.instance.currentRoleData.voiceID = roleData.voice;
        }
        if (roleData.roleName != null) {
            this.view.bg3.bg2.bg1.inpa3.inpa_inp.inputField.text = roleData.roleName;
        }
        if (roleData.roleSetting != null) {
            this.view.bg3.bg2.bg1.inpbbg2.inpb_inp.inputField.text = roleData.roleSetting;
        }
        if (roleData.standingPainting != null) {
            //角色立绘
            let rawImgStr = roleData.standingPainting["normal"];//.get("normal");
            console.log("角色立绘 normal :", rawImgStr);
            CommonUIUtils.setTextureFuncProportionalScaling(RoleSettingsView.Instance.bg3.bg2.bg1.picbg_img.pic_raw.rawImage2D, rawImgStr);
            RoleSettingsView.Instance.bg3.bg2.bg1.picbg_img.pic_raw.transform.visible = true;
            RoleSettingsView.Instance.bg3.bg2.bg1.picbg_img.plus_btn.transform.visible = false;
            this.standingPainting = rawImgStr;
        }
        if (roleData.RoleDefinition) {
           this.RoleDefinition = roleData.RoleDefinition;
        }
    }
    public dispose() {
        UiDataManager.unBindFunctionData(BindKeyName.OnAiSetRoleSetting, this.setRoleSetting);
        UiDataManager.unBindFunctionData(BindKeyName.RoleSettingByAI, this.changeroleSettingposition);
    }
}