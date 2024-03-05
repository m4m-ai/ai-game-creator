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

import { commonPopupData } from "./CommonPoupManager";
import { editorGuideData } from "./PlayerGuideManager";
import { UiNames } from "./UIData/UiNames";
import { UiManager } from "PSDUI/UiManager";
import { CharacterFactionType } from "./CharacterSettingManager";
import { resourceType } from "./AIResourceManager";
import { ChpaterSceneTypeData } from "./ChapterSceneDirectoryManager";
import { SceneInfo } from "../Data/SceneInfo";
import { NewgameData } from "./NewgameManager";
import { GamedescData } from "./GamedescManager";

export class UIOpenOrHideManager {
    public static get Instance(): UIOpenOrHideManager {
        if (this._instance == null) {
            this._instance = new UIOpenOrHideManager();
        }
        return this._instance;
    }
    //是否可以显示loading
    public static needShowLoading: boolean = true;
    public constructor() {
        ///隐藏 不主动释放的 UI列表
        UiManager.dontDisposeUIPush(UiNames.Chatbackground);
        UiManager.dontDisposeUIPush(UiNames.CheakPopup);
    }
    private static _instance: UIOpenOrHideManager;
    private uiloadingCanShow: boolean = true;

    public OpenCommonTipsView() {
        UiManager.showUi("CommonTips");
        // UiManager.getUIByName(UiNames.CommonTips, UiManager.baselayer,null);
    }

    public HideCommonTipsView() {
        UiManager.hideUi("CommonTips");
    }

    public OpenPanelView() {
        UiManager.showUi("Panel");
    }

    public HidePanelView() {
        UiManager.hideUi("Panel");
    }
    public OpenPanelBodyView() {
        UiManager.showUi("PanelBody");
    }

    public HidePanelBodyView() {
        UiManager.hideUi("PanelBody");
    }
    //游戏列表
    public OpenAlistofgameItemsView() {
        UiManager.showUi(UiNames.AlistofgameItems);
    }

    public HideAlistofgameItemsView() {
        UiManager.hideUi(UiNames.AlistofgameItems);
    }
    //操作气泡
    public OpenManipulatebubblesView() {
        UiManager.showUi(UiNames.Manipulatebubbles);
    }

    public HideManipulatebubblesView() {
        UiManager.hideUi(UiNames.Manipulatebubbles);
    }
    //提示弹窗
    public OpenBottomslabView(poupData: commonPopupData) {
        UiManager.showUi(UiNames.Bottomslab, poupData);
    }

    public HideBottomslabView() {
        UiManager.hideUi(UiNames.Bottomslab);
    }
    public OpenFileManagerPanelView(type: number = resourceType.resourceMgr) {
        UiManager.showUi(UiNames.FileManagerPanel, type);
    }

    public HideFileManagerPanelView() {
        UiManager.hideUi(UiNames.FileManagerPanel);
    }

    public OpenChatbackgroundView() {
        UiManager.showUi(UiNames.Chatbackground);
    }

    public HideChatbackgroundView() {
        UiManager.hideUi(UiNames.Chatbackground);
    }

    /** 打开gamePlay ui */
    public OpenGameUiView() {
        UiManager.showUi(UiNames.GameUi);
    }

    /** 打开关闭gamePlay ui */
    public HideGameUiView() {
        UiManager.hideUi(UiNames.GameUi);
    }
    public OpenFullscreenPageView() {
        UiManager.showUi(UiNames.FullscreenPage);
    }

    public HideFullscreenPageView() {
        UiManager.hideUi(UiNames.FullscreenPage);
    }

    public OpenChapterSceneMenuView(data: ChpaterSceneTypeData) {
        UiManager.showUi(UiNames.ChapterSceneMenu, data);
    }

    public HideChapterSceneMenuView() {
        UiManager.hideUi(UiNames.ChapterSceneMenu);
    }
    public OpenBasicsettingsView(CenterDisplayBol: boolean = true) {
        UiManager.showUi(UiNames.Basicsettings, CenterDisplayBol);
    }

    public HideBasicsettingsView() {
        UiManager.hideUi(UiNames.Basicsettings);
    }

    public OpenTutorialBackgroundView(data: commonBackData) {
        UiManager.showUi(UiNames.TutorialBackground, data);
    }
    public HideTutorialBackgroundView() {
        UiManager.hideUi(UiNames.TutorialBackground);
    }

    public OpenSceneTalkView(CenterDisplayBol: boolean = true, sceneInfo: SceneInfo = null) {
        UiManager.showUi(UiNames.SceneTalk, [CenterDisplayBol, sceneInfo]);
    }

    public HideSceneTalkView() {
        UiManager.hideUi(UiNames.SceneTalk);
    }

    public OpenBackgroundPictureView(CenterDisplayBol: boolean = true) {
        UiManager.showUi(UiNames.BackgroundPicture, CenterDisplayBol);
    }
    public HideBackgroundPictureView() {
        UiManager.hideUi(UiNames.BackgroundPicture);
    }
    //角色设定
    public OpenRoleSettingsView(CenterDisplayBol: boolean = true) {
        UiManager.showUi(UiNames.RoleSettings, CenterDisplayBol);
    }
    public HideRoleSettingsView() {
        UiManager.hideUi(UiNames.RoleSettings);
    }

    //左侧展开面板
    public OpenSpreadingPlateView(titleStr: string) {
        UiManager.showUi(UiNames.SpreadingPlate, titleStr);
    }
    public HideSpreadingPlateView() {
        UiManager.hideUi(UiNames.SpreadingPlate);
    }

    public OpenNavigationBarView(data: NavigationBarBackData) {
        UiManager.showUi(UiNames.NavigationBar, data);
    }
    public HideNavigationBarView() {
        UiManager.hideUi(UiNames.NavigationBar);
    }

    // BackgroundMusic
    public OpenBackgroundMusicView(CenterDisplayBol: boolean = true) {
        UiManager.showUi(UiNames.BackgroundMusic, CenterDisplayBol);
    }
    public HideBackgroundMusicView() {
        UiManager.hideUi(UiNames.BackgroundMusic);
    }
    //引导框
    public OpenGuideView(guideData: editorGuideData) {
        UiManager.showUi(UiNames.Guide, guideData);
    }
    public HideGuideView() {
        UiManager.hideUi(UiNames.Guide);
    }

    public OpenStoragePathView(callback: Function) {
        UiManager.showUi(UiNames.StoragePath, callback);
    }
    public HideStoragePathView() {
        UiManager.hideUi(UiNames.StoragePath);
    }

    public OpenCharacterSettingView(type: CharacterFactionType) {
        UiManager.showUi(UiNames.CharacterSetting, type);
    }
    public HideCharacterSettingView() {
        UiManager.hideUi(UiNames.CharacterSetting);
    }

    public OpenLogonView() {
        UiManager.showUi(UiNames.Logon);
    }

    public HideLogonView() {
        UiManager.hideUi(UiNames.Logon);
    }

    public OpenRegisterView() {
        UiManager.showUi(UiNames.Register);
    }

    public HideRegisterView() {
        UiManager.hideUi(UiNames.Register)
    }

    public OpenSkipboxView() {
        UiManager.showUi(UiNames.Skipbox);
    }

    public HideSkipboxView() {
        UiManager.hideUi(UiNames.Skipbox);
    }

    public OpenFullScreenDisplayView(path: string) {
        UiManager.showUi(UiNames.FullScreenDisplay, path);
    }

    public HideFullScreenDisplayView() {
        UiManager.hideUi(UiNames.FullScreenDisplay);
    }
    public OpenStartView() {
        UiManager.showUi(UiNames.Start);
    }

    public HideStartView() {
        UiManager.hideUi(UiNames.Start);
    }


    //提示弹窗
    public OpenNewgameView(poupData: NewgameData) {
        UiManager.showUi(UiNames.Newgame, poupData);
    }

    public HideNewgameView() {
        UiManager.hideUi(UiNames.Newgame);
    }

    
    //提示弹窗
    public OpenGamedescView(poupData: GamedescData) {
        UiManager.showUi(UiNames.Gamedesc, poupData);
    }

    public HideGamedescView() {
        UiManager.hideUi(UiNames.Gamedesc);
    }
}
export class commonBackData {
    CenterDisplayBol: boolean;
    callBack: Function;
}
export class NavigationBarBackData {
    uiname: string;
    data: commonBackData;
}
