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
import { ViewBaseData } from "Data/ViewBaseData";
import { BasicsettingsView } from "./BasicsettingsView";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "Data/BindKeyName";
import { ProjectBasicSettingsManagerRequest } from "AutoCode/Net/ClientRequest/ProjectBasicSettingsManagerRequest";
import { GameProjectManager } from "Manager/GameProjectManager";
import { BackStoryData } from "BackStoryData";
import { CommonPoupManager } from "Manager/CommonPoupManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
export class BasicsettingsViewData implements ViewBaseData {
    public artStyleDataList: ArtStyleData[] = [];
    /**选择的风格id */
    public selectStyleId: string;
    private artStyleDataBinder: FunctionBinder;
    public constructor() {
        this.changeBasicUIposition = this.changeBasicUIpositionFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.GameBaseSettingByAI, this.changeBasicUIposition);
        this.setBasicSetting = this.setBasicSettingFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.OnAiSetBasicSettings, this.setBasicSetting);
        this.binder = UiDataManager.bindFunctionData(BindKeyName.getBackStoryById, this.onGetBackstoryByIdFun.bind(this));
        this.artStyleDataBinder = UiDataManager.bindFunctionData(BindKeyName.GetStyleExample, this.getStyleList.bind(this));
    }
    public binder: FunctionBinder;
    public changeBasicUIposition: Function;
    public setBasicSetting: Function;
    //AI 返回的基础设定数据
    public setBasicSettingFun(basicData) {
        if (basicData.gameName != null) {
            BasicsettingsView.Instance.bg1.bg2.searchbg1.iuput_inp.inputField.text = basicData.gameName;
        }
        if (basicData.backgroundSetting != null) {
            BasicsettingsView.Instance.bg1.bg2.setbg1.textinput_inp.inputField.text = basicData.backgroundSetting;
        }
        if (basicData.beauxArtStyle != null) {
            BasicsettingsView.Instance.artstyle1_lab_text(`${basicData.beauxArtStyle}`);
        }
    }
    //获取指定项目的背景设定
    public GetBackStoryFun(profileId: string) {
        ProjectBasicSettingsManagerRequest.Instance.GetBackStory(profileId);
    }
    public changeBasicUIpositionFun() {
        if (GameProjectManager.isInEditorBol) {
            BasicsettingsView.Instance.bg3.transform.visible = true;
            BasicsettingsView.Instance.bg1.savebg_btn.transform.visible = false;
        } else {
            BasicsettingsView.Instance.bg3.transform.visible = false;
            BasicsettingsView.Instance.bg1.savebg_btn.transform.visible = true;
        }
        if (GameProjectManager.isInEditorBol) {
            BasicsettingsView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
            BasicsettingsView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
            BasicsettingsView.Instance.bg1.transform.markDirty();
            BasicsettingsView.Instance.bg3.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
            BasicsettingsView.Instance.bg3.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 60);
            BasicsettingsView.Instance.bg3.crown.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
        } else {
            BasicsettingsView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
            BasicsettingsView.Instance.bg1.transform.markDirty();
        }
    }

    public onGetBackstoryByIdFun(data: BackStoryData) {
        // console.log("返回的背景设定数据 ： ", data);
        BasicsettingsView.Instance.currentBackstoryData = data;
        if (data.worldName && data.worldName != "") {
            BasicsettingsView.Instance.bg1.bg2.searchbg1.iuput_inp.inputField.text = data.worldName;
        }
        if (data.backStory && data.backStory != "") {
            BasicsettingsView.Instance.bg1.bg2.setbg1.textinput_inp.inputField.text = data.backStory;
        }
    }

    public setCommonPoupData() {
        CommonPoupManager.instance.openCommonPopupFun({
            titleStr: "AI一键生成游戏", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "返回", midbtnStr: "", rightbtnStr: "确认",
            showDescribBol: true, describeStr: "您确定根据现有的游戏基础设定一键生成游戏吗？", changeLineBol: true,
            leftBtnCallBack: () => {
                UIOpenOrHideManager.Instance.HideBottomslabView();
            },
            rightBtnCallBack: (str: string) => {
                console.log("确认一键生成游戏,后续需要补充");
                UIOpenOrHideManager.Instance.HideBottomslabView();
            }
        });
    }

    /**获取了支持的画风 */
    public getStyleList(data: any) {
        this.artStyleDataList.length = 0;
        //this.artStyleDataList.push()
        BasicsettingsView.Instance.artStyleGrid.setDataList(this.artStyleDataList);
    }
    public dispose() {
        UiDataManager.unBindFunctionDataByBinder(this.binder);
        UiDataManager.unBindFunctionData(BindKeyName.OnAiSetBasicSettings, this.setBasicSetting);
        UiDataManager.unBindFunctionData(BindKeyName.GameBaseSettingByAI, this.changeBasicUIposition);
        UiDataManager.unBindFunctionDataByBinder(this.artStyleDataBinder);
    }
}

export type ArtStyleData = {
    styleId: string,
    styleName: string,
}