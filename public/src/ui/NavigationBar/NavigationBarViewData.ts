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
import { ViewBaseData } from "Data/ViewBaseData";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { NavigationbarView } from "./NavigationBarView";
import { commonBackData, NavigationBarBackData, UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { UiNames } from "Manager/UIData/UiNames";
import { UiManager } from "PSDUI/UiManager";
import { AIResourceManager, resourceType } from "Manager/AIResourceManager";
import { ChapterSceneType, ChpaterSceneTypeData } from "Manager/ChapterSceneDirectoryManager";
export class NavigationBarViewData implements ViewBaseData {

    private view: NavigationbarView;
    private binder: FunctionBinder;
    private refreshBinder: FunctionBinder;
    public lastTabIndex = -1;
    private onexit: FunctionBinder;
    constructor(view: NavigationbarView) {
        this.view = view;
        this.binder = UiDataManager.bindFunctionData(BindKeyName.OnChangeScene, this.onChangeScene.bind(this));
        this.refreshBinder = UiDataManager.bindFunctionData(BindKeyName.refreshEditorUI, this.refreshEditorUI.bind(this));
        this.onexit = UiDataManager.bindFunctionData(BindKeyName.OnExitPlay, this.onExitPlay.bind(this));
    }

    private onChangeScene() {
        this.view.setCellData();
    }
    private refreshEditorUI(data: NavigationBarBackData) {
        if (data.uiname != "") {
            switch (data.uiname) {
                case UiNames.TutorialBackground:
                    let commondata = data.data;
                    UiManager.showUi(data.uiname, commondata);
                    break;
            }
        }
    }
    public tabIconList = ["setup", "file", "chapter", "ai"];

    private test: boolean = false;
    public selectTabFun(index: number) {
        console.log("页签 ：", index);
        let uiList = [UiNames.TutorialBackground, AIResourceManager.closeUIname, UiNames.Chatbackground, UiNames.FileManagerPanel, UiNames.SpreadingPlate, UiNames.ChapterSceneMenu];
        this.closeUIFun(uiList);
        if (this.lastTabIndex != index) {
            switch (index) {
                case 0:
                    console.log("设置页签");
                    break;
                case 1:
                    console.log("资源管理器");
                    UIOpenOrHideManager.Instance.OpenSpreadingPlateView("资源管理");
                    setTimeout(() => {
                        UIOpenOrHideManager.Instance.OpenFileManagerPanelView();
                    }, 100);
                    break;
                case 2:
                    console.log("AI资源库 页签");
                    let commondata1 = new commonBackData();
                    commondata1.CenterDisplayBol = false;
                    commondata1.callBack = () => {
                        let chapterscene = new ChpaterSceneTypeData();
                        chapterscene.CenterDisplayBol = false;
                        chapterscene.chapterSceneUItype = ChapterSceneType.ChpaterSceneType
                        UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chapterscene);
                    }
                    UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata1);
                    break;
                case 3://AI资源库 页签
                    console.log("AI资源库 页签");
                    let commondata = new commonBackData();
                    commondata.CenterDisplayBol = false;
                    commondata.callBack = () => {
                        UIOpenOrHideManager.Instance.OpenFileManagerPanelView(resourceType.AIresource);
                    }
                    UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata);
                    break;
            }
            this.lastTabIndex = index;
        } else {
            this.lastTabIndex = -1;
        }
    }
    public closeUIFun(uiList: string[]) {
        for (let i = 0; i < uiList.length; i++) {
            let uiname = uiList[i];
            if (UiManager.isUiShow(uiname)) {
                UiManager.hideUi(uiname);
            }
        }
    }
    public onExitPlay() {
        console.log("退出播放");
        NavigationbarView.Instance.onExitPlay();
    }

    public dispose() {
        UiDataManager.unBindFunctionDataByBinder(this.binder);
        UiDataManager.unBindFunctionDataByBinder(this.refreshBinder);
        UiDataManager.unBindFunctionDataByBinder(this.onexit);
    }
}