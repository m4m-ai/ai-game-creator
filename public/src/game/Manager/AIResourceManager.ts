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

import { GalRoleData } from "GalRoleData";
import { UiNames } from "./UIData/UiNames";
import { UIOpenOrHideManager, commonBackData } from "./UIOpenOrHideManager";
import { UiManager } from "PSDUI/UiManager";
import { CharacterFactionType } from "./CharacterSettingManager";
import { ChatTabEnum } from "../Data/EnumType";
import { ChapterSceneType, ChpaterSceneTypeData } from "./ChapterSceneDirectoryManager";

export class AIResourceManager {
    public static get instance(): AIResourceManager {
        return this._instance;
    }
    private static _instance: AIResourceManager = new AIResourceManager();
    private constructor() {
        //后续这里需要监听 角色数据更新

    }
    public SpreadingPlateProcessValue: number = 0;

    public init() {
    }
    public static openUIname = "";
    public static closeUIname = "";
    public static currentUIname = "";
    /** AI资源库 目录选择跳转*/
    public setStepByIndex(index: number) {
        switch (index) {
            case 0:
                UiManager.hideUi(AIResourceManager.closeUIname);
                UiManager.showUi(UiNames.Basicsettings, false);
                AIResourceManager.openUIname = UiNames.FileManagerPanel;
                AIResourceManager.closeUIname = UiNames.Basicsettings;
                break;
            case 1:
                UiManager.hideUi(AIResourceManager.closeUIname);
                UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
                setTimeout(() => {
                    UiManager.showUi(UiNames.CharacterSetting, CharacterFactionType.role);
                }, 50);
                AIResourceManager.openUIname = UiNames.FileManagerPanel;
                AIResourceManager.closeUIname = UiNames.CharacterSetting;
                break;
            case 2:
                UiManager.hideUi(AIResourceManager.closeUIname);
                // UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
                // setTimeout(() => {
                let chapterscene = new ChpaterSceneTypeData();
                chapterscene.CenterDisplayBol = false;
                chapterscene.chapterSceneUItype = ChapterSceneType.AITalkResource;
                UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chapterscene);
                // }, 50)
                AIResourceManager.openUIname = UiNames.FileManagerPanel;
                AIResourceManager.closeUIname = UiNames.ChapterSceneMenu;
                break;
            case 3:
                //背景图片
                UiManager.hideUi(AIResourceManager.closeUIname);
                let chapterscene1 = new ChpaterSceneTypeData();
                chapterscene1.CenterDisplayBol = false;
                chapterscene1.chapterSceneUItype = ChapterSceneType.AIPictrueResoure;
                UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chapterscene1);
                AIResourceManager.openUIname = UiNames.FileManagerPanel;
                AIResourceManager.closeUIname = UiNames.ChapterSceneMenu;
                break;
            case 4:
                //背景音乐
                break;
        }
    }
/** 编辑器中 返回上一层 或 保存关闭当前UI 回到上一次ui*/
    public editorRebackOrSave(type = ChapterSceneType.AITalkResource) {
        if (UiManager.isUiShow(UiNames.TutorialBackground)) {
            UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
        }
        if (UiManager.isUiShow(UiNames.Chatbackground)) {
            UIOpenOrHideManager.Instance.HideChatbackgroundView();
        }
        UiManager.hideUi(AIResourceManager.closeUIname);
        let commondata = new commonBackData();
        commondata.CenterDisplayBol = false;
        commondata.callBack = () => {
            switch (AIResourceManager.openUIname) {
                case UiNames.FileManagerPanel:
                    UIOpenOrHideManager.Instance.OpenFileManagerPanelView(resourceType.AIresource);
                    break;
                case UiNames.CharacterSetting:
                    UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
                    setTimeout(() => {
                        UiManager.showUi(UiNames.CharacterSetting, CharacterFactionType.role);
                    }, 50);
                    break;
                case UiNames.RoleSettings:
                    UIOpenOrHideManager.Instance.OpenRoleSettingsView(false);
                    break;
                case UiNames.ChapterSceneMenu:
                    let chapterscene = new ChpaterSceneTypeData();
                    chapterscene.CenterDisplayBol = false;
                    chapterscene.chapterSceneUItype = type;
                    UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chapterscene);
                    break;
                case UiNames.BackgroundPicture:
                    UIOpenOrHideManager.Instance.OpenBackgroundPictureView(false);
                    break;
                case CharacterFactionType.backgroundPicture.toString():
                    UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
                    setTimeout(() => {
                        UiManager.showUi(UiNames.CharacterSetting, CharacterFactionType.backgroundPicture);
                    }, 50);
                    break
            }
        }
        UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata);
    }

    public canShowChatByUIname() {
        let tabIndex = -1;
        if (UiManager.isUiShow(AIResourceManager.currentUIname)) {
            switch (AIResourceManager.currentUIname) {
                case UiNames.Basicsettings:
                    tabIndex = ChatTabEnum.backgroundSetting;
                    break;
                case UiNames.RoleSettings:
                    tabIndex = ChatTabEnum.role;
                    break;
                case UiNames.CharacterSetting:
                    break;
                case UiNames.BackgroundPicture:
                    tabIndex = ChatTabEnum.backgroundImage;
                    break;
                case UiNames.SceneTalk:
                    tabIndex = ChatTabEnum.sceneDialogue;
                    break;
                case UiNames.ChapterSceneMenu:
                    tabIndex = ChatTabEnum.chapterScenes;
                    break;
            }
            console.log("tabIndex ", tabIndex);
        }
        if (tabIndex >= 0) {
            return true;
        }
        return false;
    }


    public dispose() {

    }
}
export enum resourceType {
    resourceMgr,
    AIresource,
}
