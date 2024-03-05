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
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "../Data/BindKeyName";
import { UiManager } from "PSDUI/UiManager";
import { UiNames } from "./UIData/UiNames";
import { NavigationBarBackData, UIOpenOrHideManager, commonBackData } from "./UIOpenOrHideManager";
import { ChapterSceneType, ChpaterSceneTypeData } from "./ChapterSceneDirectoryManager";
import { ChatTabEnum } from "../Data/EnumType";
import { ChatMessageDataManager } from "./ChatMessageDataManager";
import { GameProjectManager } from "./GameProjectManager";
import { ProjectBasicSettingsManagerRequest } from "../AutoCode/Net/ClientRequest/ProjectBasicSettingsManagerRequest";
import { BackStoryData } from "BackStoryData";
import { GalData } from "GalData";
import { CharacterFactionType } from "./CharacterSettingManager";
import { AppMain } from "../appMain";
import { BuildType } from "../GameEnum";
import { RoleSettingManager } from "./RoleSettingManager";
import { BackgroundPictureManager } from "./BackgroundPictureManager";
import { StoryImportManager } from "./StoryImportManager";

export class PlayerGuideManager {
    public static get instance(): PlayerGuideManager {
        return this._instance;
    }
    private static _instance: PlayerGuideManager = new PlayerGuideManager();
    private constructor() {
    }
    public guideStepIndex = -1;
    public lastStepIndex = -1;
    public editorGuideIndex = -1;
    //是否是引导弹窗居中显示
    public static isCenteredStateBol = false;
    //是否是在编辑器中
    public static isInEditorBol = false;
    //新手流程中
    public static isNewGuideBol = true;
    public static currentGuideIndex = -1;
    public static currentEditorGuideIndex = -1;

    public static BtnStr = "";
    public init() {
    }
    //设置步骤字典
    private basicSettingDic: cMap<titleData>;
    public getbasicDic() {
        if (this.basicSettingDic == null) {
            this.basicSettingDic = new cMap();
            let step0: titleData = new titleData();
            step0.title = "游戏基础设定";
            step0.lastStepStr = "";
            step0.nextStepStr = "";
            let step1: titleData = new titleData();
            step1.title = "角色设定";
            step1.lastStepStr = "游戏基础设定";
            step1.nextStepStr = "章节场景目录";
            let step2: titleData = new titleData();
            step2.title = "章节场景目录";
            step2.lastStepStr = "角色设定";
            step2.nextStepStr = "选择场景";
            let step3: titleData = new titleData();
            step3.title = "选择场景";
            step3.lastStepStr = "章节场景目录";
            step3.nextStepStr = "场景对话";
            let step4: titleData = new titleData();
            step4.title = "场景对话";
            step4.lastStepStr = "选择场景";
            step4.nextStepStr = "背景图片";
            let step5: titleData = new titleData();
            step5.title = "背景图片";
            step5.lastStepStr = "场景对话";
            step5.nextStepStr = "运行场景";//下一步：背景音乐
            // let step6: titleData = new titleData();
            // step6.title = "背景音乐";
            // step6.lastStepStr = "返回背景图片";
            // step6.nextStepStr = "下一步：运行场景";
            this.basicSettingDic.set(0, step0);
            this.basicSettingDic.set(1, step1);
            this.basicSettingDic.set(2, step2);
            this.basicSettingDic.set(3, step3);
            this.basicSettingDic.set(4, step4);
            this.basicSettingDic.set(5, step5);
            // this.basicSettingDic.set(6, step6);

        }
        return this.basicSettingDic;
    }
    //设置非编辑器引导描述字典
    private guideDescribeDic: cMap<string>;
    public getDescribeDic() {
        if (this.guideDescribeDic == null) {
            this.guideDescribeDic = new cMap();
            let stepTips0: string = "请为您的游戏创建基础设定\n点击右下方AI按钮，AI可以帮助您一起完成";
            let stepTips1: string = "请为您的游戏创建角色设定\n点击右下方AI按钮，AI可以帮助您一起完成";
            let stepTips2: string = "请为您的故事创建章节场景目录\n点击右下方AI按钮，AI可以帮助您一起完成";
            let stepTips3: string = "请选择您需要生成对话的场景并确定";
            let stepTips4: string = "请为这个场景创作对话\n点击右下方AI按钮，AI可以帮助您一起完成";
            let stepTips5: string = "请为这个场景添加背景图\n点击右下方AI按钮，AI可以帮助您一起完成";
            // let stepTips6: string = "请为这个场景添加背景音乐\n点击右下方AI按钮，AI可以帮助您一起完成";
            this.guideDescribeDic.set(0, stepTips0);
            this.guideDescribeDic.set(1, stepTips1);
            this.guideDescribeDic.set(2, stepTips2);
            this.guideDescribeDic.set(3, stepTips3);
            this.guideDescribeDic.set(4, stepTips4);
            this.guideDescribeDic.set(5, stepTips5);
            // this.guideDescribeDic.set(6, stepTips6);
        }
        return this.guideDescribeDic;
    }
    //设置编辑器引导描述字典
    private editorGuideDescribeDic: cMap<string[]>;
    public getEditorGuideDescribDic() {
        if (this.editorGuideDescribeDic == null) {
            this.editorGuideDescribeDic = new cMap();
            let stepTips0: string = "保存的游戏基础设定可在该处查看并编辑\n修改后点击即可保存";
            let stepTips1: string = "保存的所有角色可在该处查看\n点击已有角色可以进入角色设定详情页面\n也可点击新建角色再添加一个角色";
            let stepTips2: string = "保存的角色设定可在该处编辑\n修改后点击即可保存";
            let stepTips3: string = "生成的章节场景可以再此处查看并编辑";
            let stepTips4: string = "保存的场景对话可在该处编辑\n修改后点击保存按钮即可保存并应用到场景代码";
            let stepTips5: string = "此处为场景代码编辑界面，可以在此详细编辑场景对话";
            let stepTips6: string = "这个场景保存的背景图可在该处查看\n点击已有背景图可以进入背景图详情页面\n也可以点击新建背景图再添加一张背景图";
            let stepTips7: string = "保存的背景图可在该处编辑\n修改后点击即可保存\n点击设为场景默认背景图即可应用到您的场景中";
            let stepTips8: string = "这个场景保存的背景音乐可在该处查看\n点击已有背景音乐可以进入背景音乐详情页面\n也可点击新建背景音乐再添加一段背景音乐";
            let stepTips9: string = "保存的背景音乐可在该处编辑\n修改后点击即可保存\n点击设为场景默认背景音乐即可应用到您的场景中";
            this.editorGuideDescribeDic.set(EditorGuideType.editorGameBasicSettingSave, [stepTips0, "下一步：角色设定"]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorRoleSettingPreview, [stepTips1, ""]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorRoleSettingSave, [stepTips2, "下一步:章节场景目录"]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorChapterScenariosSave, [stepTips3, "下一步:场景对话"]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorSceneDialogueSave, [stepTips4, ""]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorScenearioCode, [stepTips5, "下一步:生成背景图"]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorSceneBackgroundPreview, [stepTips6, ""]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorSceneBackgroundSave, [stepTips7, "下一步:运行场景"]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorBackgroundMusicPreview, [stepTips8, ""]);
            this.editorGuideDescribeDic.set(EditorGuideType.editorBackgroundMusicSave, [stepTips9, "下一步:运行场景"]);
        }
        return this.editorGuideDescribeDic;
    }
    //
    public currentIndex = 0;
    //点击AI 按钮
    public setAIGuidByIndex(stepIndex: number) {
        console.log("当前的AI引导步骤 ：", stepIndex);
        if (stepIndex >= 0) {
            //打开ui对话
            if (!UiManager.isUiShow(UiNames.Chatbackground)) {
                //打开ai 对话界面
                UIOpenOrHideManager.Instance.OpenChatbackgroundView();
            }
        }
        //将通用底板ui 位置居左
        UiDataManager.changeFunctionData(BindKeyName.TutorialBgPosChange, false);//是否居中
        if (UiManager.isUiShow(UiNames.Guide)) { // 关闭引导界面
            UIOpenOrHideManager.Instance.HideGuideView();
        }
        let tabIndex = -1;
        switch (stepIndex) {
            case 0:
                if (UiManager.isUiShow(UiNames.Basicsettings)) {
                    console.log("游戏基础设定显示,进入AI 对话界面");
                    UiDataManager.changeFunctionData(BindKeyName.GameBaseSettingByAI, null);
                    tabIndex = ChatTabEnum.backgroundSetting;
                }
                break;
            case 1:
                if (UiManager.isUiShow(UiNames.RoleSettings)) {
                    console.log("角色设定显示,进入AI 对话界面");
                    UiDataManager.changeFunctionData(BindKeyName.RoleSettingByAI, null);
                    tabIndex = ChatTabEnum.role;
                }
                break;
            case 2:
                if (UiManager.isUiShow(UiNames.ChapterSceneMenu)) {
                    console.log("角色设定显示,进入AI 对话界面");
                    UiDataManager.changeFunctionData(BindKeyName.ChapterSceneMenuByAI, null);
                    tabIndex = ChatTabEnum.chapterScenes;
                }
                break;
            case 3:
                if (UiManager.isUiShow(UiNames.SceneTalk)) {
                    console.log("角色设定显示,进入AI 对话界面");
                    UiDataManager.changeFunctionData(BindKeyName.SceneTalkByAI, null);
                    tabIndex = ChatTabEnum.sceneDialogue;
                }
                break;
            case 4:
                if (UiManager.isUiShow(UiNames.BackgroundPicture)) {
                    console.log("角色设定显示,进入AI 对话界面");
                    UiDataManager.changeFunctionData(BindKeyName.BackgroundPictureByAI, null);
                    tabIndex = ChatTabEnum.backgroundImage;
                }
                break;
            case 5:
                if (UiManager.isUiShow(UiNames.BackgroundMusic)) {
                    console.log("角色设定显示,进入AI 对话界面");
                    UiDataManager.changeFunctionData(BindKeyName.BackgroundMusicByAI, null);
                    tabIndex = ChatTabEnum.backgroundImage;
                }
                break;
            // case 6:
            //     if (UiManager.isUiShow(UiNames.BackgroundMusic)) {
            //         console.log("角色设定显示,进入AI 对话界面");
            //         UiDataManager.changeFunctionData(BindKeyName.BackgroundMusicByAI, null);
            //     }
            // break;
        }
        if (tabIndex >= 0) {
            this.changeChatTabFun(tabIndex);
        }
        // }
    }
    public lastIndex = -1;
    public changeChatTabFun(index) {
        setTimeout(() => {
            if (index != this.lastIndex) {
                ChatMessageDataManager.Instance.createOrChangeChatTab(index);
                this.lastIndex = index;
            } else {
                let tab = ChatMessageDataManager.Instance.getChatTab(ChatMessageDataManager.Instance.getDefaultChatTabName(index));
                tab.guideIndex = -1;
                ChatMessageDataManager.Instance.runGuideFinish(tab);
            }
        }, 1000);
        if (AppMain.buildType == BuildType.StoryType) {
            if (!UiManager.isUiShow(UiNames.Chatbackground)) {
                //打开ai 对话界面
                UIOpenOrHideManager.Instance.OpenChatbackgroundView();
            }
        }
    }
    //根据索引值 跳转到对应的ui  需要关闭当前的ui  并根据当前ui布局居中还是靠左，调整跳转后ui的位置 
    /**
     * @param stepIndex  当前要打开的ui 索引
     * @param lastIndex  上一个显示的ui 索引
     * @param isSaveSetting  是否为保存设置 跳转
    */
    public setUIshowByIndex(stepIndex: number, lastIndex: number, isSaveSettingBol: boolean = false) {
        console.log("前一个ui index :", lastIndex, "    要切换到的ui  index :", stepIndex);
        //新手教程中
        if (PlayerGuideManager.isNewGuideBol) {
            if (PlayerGuideManager.currentGuideIndex < stepIndex) {//未执行过此引导
                let dic = this.getDescribeDic();
                let tips = dic.get(stepIndex);
                let guideData = new editorGuideData();
                guideData.tips = tips;
                guideData.btnStr = "";
                if (UiManager.isUiShow(UiNames.Guide)) {//派发事件 刷新引导框内容
                    UiDataManager.changeFunctionData(BindKeyName.refreshGuideDescribe, guideData);
                } else {
                    UIOpenOrHideManager.Instance.OpenGuideView(guideData);
                }
                PlayerGuideManager.currentGuideIndex = stepIndex;
            } else {
                if (UiManager.isUiShow(UiNames.Guide)) {
                    UIOpenOrHideManager.Instance.HideGuideView();
                }
            }
        }
        //从AI 聊天界面保存设置，需要关闭聊天ui
        if (isSaveSettingBol) {
            if (UiManager.isUiShow(UiNames.Chatbackground)) {
                UIOpenOrHideManager.Instance.HideChatbackgroundView();
            }
            //保存设置时，下一次ui 显示位置居中
            PlayerGuideManager.isCenteredStateBol = true;
        } else {
            if (UiManager.isUiShow(UiNames.Chatbackground)) {
                console.log("上下步切换时，AI聊天界面开启", stepIndex);

                let tabIndex = -1;
                switch (stepIndex) {
                    case 0:
                        tabIndex = ChatTabEnum.backgroundSetting;
                        break;
                    case 1:
                        tabIndex = ChatTabEnum.role;
                        break;
                    case 2:
                        tabIndex = ChatTabEnum.chapterScenes;
                        break;
                    case 3:
                        tabIndex = ChatTabEnum.chapterScenes;
                        break;
                    case 4:
                        tabIndex = ChatTabEnum.sceneDialogue;
                        break;
                    case 5:
                        tabIndex = ChatTabEnum.backgroundImage;
                        break;
                    // case 6:
                    //     if (UiManager.isUiShow(UiNames.BackgroundMusic)) {
                    //         console.log("角色设定显示,进入AI 对话界面");
                    //         UiDataManager.changeFunctionData(BindKeyName.BackgroundMusicByAI, null);
                    //     }
                    // break;
                }
                if (tabIndex >= 0) {
                    this.changeChatTabFun(tabIndex);
                }
            }
        }
        if (lastIndex != guideUIName.BackgroundPicture) {
            //设置通用底框位置
            UiDataManager.changeFunctionData(BindKeyName.TutorialBgPosChange, PlayerGuideManager.isCenteredStateBol);//是否居中
        }
        //跳转 先根据上一步Uiindex 关闭对应ui
        switch (lastIndex) {
            case guideUIName.Basicsettings:
                UIOpenOrHideManager.Instance.HideBasicsettingsView();
                break;
            case guideUIName.RoleSettings:
                UIOpenOrHideManager.Instance.HideRoleSettingsView();
                break;
            case guideUIName.ChapterMenu:
                UIOpenOrHideManager.Instance.HideChapterSceneMenuView();
                break;
            case guideUIName.SceneMenu:
                UIOpenOrHideManager.Instance.HideChapterSceneMenuView();
                break;
            case guideUIName.SceneTalk:
                UIOpenOrHideManager.Instance.HideSceneTalkView();
                break;
            case guideUIName.BackgroundPicture:
                UIOpenOrHideManager.Instance.HideBackgroundPictureView();
                // UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
                break;
            case guideUIName.BackgroundMusic:
                UIOpenOrHideManager.Instance.HideBackgroundMusicView();
                UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
                break;
            case guideUIName.characterPreview:
                UIOpenOrHideManager.Instance.HideCharacterSettingView();
                break;
        }
        //再根据当前ui index打开新的ui
        switch (stepIndex) {
            case guideUIName.Basicsettings:
                UIOpenOrHideManager.Instance.OpenBasicsettingsView(PlayerGuideManager.isCenteredStateBol);
                break;
            case guideUIName.RoleSettings:
                UIOpenOrHideManager.Instance.OpenRoleSettingsView(PlayerGuideManager.isCenteredStateBol);
                break;
            case guideUIName.ChapterMenu:
                let chpaterScene1 = new ChpaterSceneTypeData();
                chpaterScene1.CenterDisplayBol = PlayerGuideManager.isCenteredStateBol;
                chpaterScene1.chapterSceneUItype = ChapterSceneType.ChapterType
                UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chpaterScene1);
                break;
            case guideUIName.SceneMenu:
                let chpaterScene = new ChpaterSceneTypeData();
                chpaterScene.CenterDisplayBol = PlayerGuideManager.isCenteredStateBol;
                chpaterScene.chapterSceneUItype = ChapterSceneType.SceneType
                UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chpaterScene);
                break;
            case guideUIName.SceneTalk:
                UIOpenOrHideManager.Instance.OpenSceneTalkView(PlayerGuideManager.isCenteredStateBol);
                break;
            case guideUIName.BackgroundPicture:
                UIOpenOrHideManager.Instance.OpenBackgroundPictureView(PlayerGuideManager.isCenteredStateBol);
                break;
            case guideUIName.BackgroundMusic:
                // UIOpenOrHideManager.Instance.OpenBackgroundMusicView(PlayerGuideManager.isCenteredStateBol);
                let data = new NavigationBarBackData();
                data.uiname = "";
                UIOpenOrHideManager.Instance.OpenNavigationBarView(data);
                break;
            case guideUIName.NavigationBar:
                let _data = new NavigationBarBackData();
                _data.uiname = "";
                UIOpenOrHideManager.Instance.OpenNavigationBarView(_data);
                UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
                //完成引导
                PlayerGuideManager.isNewGuideBol = false;
                break;
        }
    }

    //新的引导步骤 添加了编辑器ui
    public newSetUIshowByIndex(isToEditorBol: boolean, stepIndex: number, editorGuideIndex: number, type: CharacterFactionType = CharacterFactionType.role) {// 到编辑器
        if (isToEditorBol) {
            console.log("stepIndex  ---- ", stepIndex);
            let data = new NavigationBarBackData();
            data.uiname = UiNames.TutorialBackground;
            let commondata = new commonBackData();
            commondata.CenterDisplayBol = false;
            commondata.callBack = () => {
                console.log("引导按钮点击事件 回调 ==========================");
                switch (stepIndex) {
                    case guideUIName.Basicsettings:
                        UIOpenOrHideManager.Instance.OpenBasicsettingsView(false);
                        // this.setEditorGuideFun(editorGuideIndex);
                        break;
                    case guideUIName.RoleSettings:
                        UIOpenOrHideManager.Instance.OpenRoleSettingsView(false);
                        // this.setEditorGuideFun(editorGuideIndex);
                        break;
                    case guideUIName.characterPreview:
                        UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
                        setTimeout(() => {
                            UIOpenOrHideManager.Instance.OpenCharacterSettingView(type);
                        }, 50);
                        // this.setEditorGuideFun(editorGuideIndex);
                        break;
                    case guideUIName.ChapterMenu:
                        let chpaterScene = new ChpaterSceneTypeData()
                        chpaterScene.CenterDisplayBol = PlayerGuideManager.isCenteredStateBol;
                        chpaterScene.chapterSceneUItype = ChapterSceneType.ChpaterSceneType;
                        UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chpaterScene);
                        // this.setEditorGuideFun(editorGuideIndex);
                        break;
                    case guideUIName.SceneTalk:
                        UIOpenOrHideManager.Instance.OpenSceneTalkView(false);
                        // this.setEditorGuideFun(editorGuideIndex);
                        break;
                    case guideUIName.BackgroundPicture:
                        UIOpenOrHideManager.Instance.OpenBackgroundPictureView(false);
                        break;
                }
                if (PlayerGuideManager.isNewGuideBol) {
                    console.log("目前处在新手引导中 ");
                    this.setEditorGuideFun(editorGuideIndex);
                }
            }
            data.data = commondata;
            if (UiManager.isUiShow(UiNames.NavigationBar)) {
                UiDataManager.changeFunctionData(BindKeyName.refreshEditorUI, data);
            } else {
                UIOpenOrHideManager.Instance.OpenNavigationBarView(data);

            }
        } else {

        }
    }
    public setEditorGuideFun(editorGuideIndex: number) {
        //新手教程中
        // if (PlayerGuideManager.isNewGuideBol) {
        if (UiManager.isUiShow(UiNames.Guide)) {
            UIOpenOrHideManager.Instance.HideGuideView();
        }
        if (PlayerGuideManager.currentEditorGuideIndex < editorGuideIndex) {//未执行过此引导
            let dic = this.getEditorGuideDescribDic();
            let tipsDataArr = dic.get(editorGuideIndex);
            let guideData = new editorGuideData();
            guideData.tips = tipsDataArr[0];
            guideData.btnStr = tipsDataArr[1];
            //引导中得按钮回调
            switch (editorGuideIndex) {
                case EditorGuideType.editorGameBasicSettingSave:
                    guideData.callBack = () => {
                        //点击保存，向服务器发送保存消息
                        let backStoryData = new BackStoryData();
                        backStoryData.id = GameProjectManager.instance.currentGalData.id;
                        backStoryData.backStory = GameProjectManager.instance.currentBackStoryData.backStory;
                        backStoryData.worldName = GameProjectManager.instance.currentBackStoryData.worldName;
                        let backStoryStr = JSON.stringify(backStoryData);
                        ProjectBasicSettingsManagerRequest.Instance.SetBackStory(GameProjectManager.instance.currentGalData.id, backStoryStr);
                        UIOpenOrHideManager.Instance.HideNavigationBarView();
                        PlayerGuideManager.instance.guideStepIndex = 1;
                        PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
                        if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.RoleSetting) {
                            GameProjectManager.instance.currentSchedule = GuideIndexType.RoleSetting;
                            GameProjectManager.instance.sendGuideIndexToService();
                        }
                        PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
                    };
                    break;
                case EditorGuideType.editorRoleSettingSave:
                    guideData.callBack = () => {
                        UIOpenOrHideManager.Instance.HideNavigationBarView();
                        PlayerGuideManager.instance.guideStepIndex = 2;
                        PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
                        if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.RoleResource) {
                            GameProjectManager.instance.currentSchedule = GuideIndexType.RoleResource;
                            GameProjectManager.instance.sendGuideIndexToService();
                        }
                        PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
                    };
                    break;
                case EditorGuideType.editorChapterScenariosSave:
                    guideData.callBack = () => {
                        UIOpenOrHideManager.Instance.HideNavigationBarView();
                        PlayerGuideManager.instance.guideStepIndex = 3;
                        PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
                        PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
                    };
                    break;
                case EditorGuideType.editorScenearioCode:
                    guideData.callBack = () => {
                        UIOpenOrHideManager.Instance.HideNavigationBarView();
                        PlayerGuideManager.instance.guideStepIndex = 4;
                        PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
                        PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
                    };
                    break;
                case EditorGuideType.editorSceneBackgroundSave:
                    guideData.callBack = () => {
                        UIOpenOrHideManager.Instance.HideNavigationBarView();
                        PlayerGuideManager.instance.guideStepIndex = 7;
                        PlayerGuideManager.instance.lastStepIndex = 5;
                        PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
                    };
                    break;
                case EditorGuideType.editorBackgroundMusicSave:
                    break;
                default:
                    break;
            }
            UIOpenOrHideManager.Instance.OpenGuideView(guideData);
            PlayerGuideManager.currentEditorGuideIndex = editorGuideIndex;
        } else {
            if (UiManager.isUiShow(UiNames.Guide)) {
                UIOpenOrHideManager.Instance.HideGuideView();
            }
        }
        // }
    }

    //开始编辑，根据存储的引导索引，打开对应的UI
    public openUIbyGuideIndex(guideIndex: number, galData: GalData) {
        switch (guideIndex) {
            case GuideIndexType.BasicSetting: // 游戏基础设定
                let commondata = new commonBackData();
                commondata.CenterDisplayBol = true;
                commondata.callBack = () => {
                    UIOpenOrHideManager.Instance.OpenBasicsettingsView();
                }
                UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata);
                break;
            case GuideIndexType.RoleSetting:
                let commondata1 = new commonBackData();
                commondata1.CenterDisplayBol = true;
                commondata1.callBack = () => {
                    UIOpenOrHideManager.Instance.OpenRoleSettingsView();
                }
                UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata1);
                break;
            case GuideIndexType.RoleResource:
                PlayerGuideManager.instance.newSetUIshowByIndex(true, guideUIName.characterPreview, EditorGuideType.editorRoleSettingPreview);
                break;
            case GuideIndexType.ChapterScenarios:
                let commondata2 = new commonBackData();
                commondata2.CenterDisplayBol = true;
                commondata2.callBack = () => {
                    let chpaterScene = new ChpaterSceneTypeData()
                    chpaterScene.CenterDisplayBol = PlayerGuideManager.isCenteredStateBol;
                    chpaterScene.chapterSceneUItype = ChapterSceneType.ChapterType;
                    UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chpaterScene);
                }
                UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata2);
                console.log("引导到 场景创建界面");
                break;
            case GuideIndexType.SelectScene:
                let commondat3 = new commonBackData();
                commondat3.CenterDisplayBol = true;
                commondat3.callBack = () => {
                    let chpaterScene = new ChpaterSceneTypeData()
                    chpaterScene.CenterDisplayBol = PlayerGuideManager.isCenteredStateBol;
                    chpaterScene.chapterSceneUItype = ChapterSceneType.SceneType;
                    UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chpaterScene);
                }
                UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondat3);
                console.log("引导到 场景创建界面");
                break;
            case GuideIndexType.SceneTalk:
                break;
            case GuideIndexType.BackgroundPicture:
                break;
            case GuideIndexType.BackgroundResource:
                break;
            case GuideIndexType.BackgroundMusic:
                let commondata5 = new commonBackData();
                commondata5.CenterDisplayBol = true;
                commondata5.callBack = () => {
                    let data = new NavigationBarBackData();
                    data.uiname = "";
                    UIOpenOrHideManager.Instance.OpenNavigationBarView(data);
                }
                UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata5);
                break;
        }

    }

    public sendScheduelToServer(nextGuideIndex: number) {
        if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < nextGuideIndex) {
            GameProjectManager.instance.currentSchedule = nextGuideIndex;
            GameProjectManager.instance.sendGuideIndexToService();
        }
    }


    public StoryGuideIndex(index: StoryIndexType) {
        if (UiManager.isUiShow(UiNames.TutorialBackground)) {
            UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
        }
        if (UiManager.isUiShow(UiNames.CharacterSetting)) {
            UIOpenOrHideManager.Instance.HideCharacterSettingView();
        }
        if (UiManager.isUiShow(UiNames.Basicsettings)) {
            UIOpenOrHideManager.Instance.HideBasicsettingsView();
        }
        if (UiManager.isUiShow(UiNames.RoleSettings)) {
            UIOpenOrHideManager.Instance.HideRoleSettingsView();
        }
        if (UiManager.isUiShow(UiNames.Chatbackground)) {
            UIOpenOrHideManager.Instance.HideChatbackgroundView();
        }
        if (UiManager.isUiShow(UiNames.Guide)) {
            UIOpenOrHideManager.Instance.HideGuideView();
        }
        if (UiManager.isUiShow(UiNames.SceneTalk)) {
            UIOpenOrHideManager.Instance.HideSceneTalkView();
        }
        if (UiManager.isUiShow(UiNames.BackgroundPicture)) {
            UIOpenOrHideManager.Instance.HideBackgroundPictureView();
        }
        switch (index) {
            case StoryIndexType.storyImport:
                let storyImport = new NavigationBarBackData();
                storyImport.uiname = UiNames.TutorialBackground;
                let commondata = new commonBackData();
                commondata.CenterDisplayBol = false;
                commondata.callBack = () => {
                    console.log("引导按钮点击事件 回调 ==========================");
                    UIOpenOrHideManager.Instance.OpenBasicsettingsView(false);

                }
                storyImport.data = commondata;
                UIOpenOrHideManager.Instance.HideChatbackgroundView();
                UIOpenOrHideManager.Instance.OpenNavigationBarView(storyImport);

                StoryImportManager.Instance.AddRole();
                break;
            case StoryIndexType.BasicType:
                UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
                setTimeout(() => {
                    UIOpenOrHideManager.Instance.OpenCharacterSettingView(CharacterFactionType.role);
                }, 50);
                let guideData = new editorGuideData();
                guideData.tips = "请完成红点角色的设定\n不然Ta就只能是旁白哦^_^";
                let data = RoleSettingManager.instance.newGetCurentProjectRoles();
                let bool = false;
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if (element.roleDrawing) {
                        let normal = element.roleDrawing["normal"];
                        if (normal) {
                            bool = true;
                            break;
                        }
                    }
                }
                if (bool) {
                    guideData.btnStr = "下一步:章节场果目录";
                } else {
                    guideData.btnStr = "";
                }
                guideData.callBack = () => {
                    UIOpenOrHideManager.Instance.HideNavigationBarView();
                    setTimeout(() => {
                        let storyImport = new NavigationBarBackData();
                        storyImport.uiname = UiNames.TutorialBackground;
                        let commondata = new commonBackData();
                        commondata.CenterDisplayBol = false;
                        commondata.callBack = () => {
                            StoryImportManager.Instance.AddChapterScenes(StoryImportManager.Instance.dataImport.chapterData);
                            console.log("引导按钮点击事件 回调 ==========================");
                            let data: ChpaterSceneTypeData = new ChpaterSceneTypeData();
                            data.CenterDisplayBol = false;
                            data.chapterSceneUItype = ChapterSceneType.SceneType
                            UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(data);
                        }
                        storyImport.data = commondata;
                        UIOpenOrHideManager.Instance.HideChatbackgroundView();
                        UIOpenOrHideManager.Instance.OpenNavigationBarView(storyImport);
                    }, 50)
                };
                UIOpenOrHideManager.Instance.OpenGuideView(guideData);
                break;
            case StoryIndexType.roleType:
                UIOpenOrHideManager.Instance.HideNavigationBarView();
                setTimeout(() => {
                    let roleType = new NavigationBarBackData();
                    roleType.uiname = UiNames.TutorialBackground;
                    let commondata1 = new commonBackData();
                    commondata1.CenterDisplayBol = false;
                    commondata1.callBack = () => {
                        console.log("引导按钮点击事件 回调 ==========================");
                        UIOpenOrHideManager.Instance.OpenRoleSettingsView(false);

                    }
                    roleType.data = commondata1;
                    UIOpenOrHideManager.Instance.OpenNavigationBarView(roleType);
                }, 50);
                break;
            case StoryIndexType.SceneType:
                UIOpenOrHideManager.Instance.HideNavigationBarView();
                setTimeout(() => {
                    let roleType = new NavigationBarBackData();
                    roleType.uiname = UiNames.TutorialBackground;
                    let commondata1 = new commonBackData();
                    commondata1.CenterDisplayBol = false;
                    commondata1.callBack = () => {
                        console.log("引导按钮点击事件 回调 ==========================");
                        UIOpenOrHideManager.Instance.OpenSceneTalkView(false);

                    }
                    roleType.data = commondata1;
                    UIOpenOrHideManager.Instance.OpenNavigationBarView(roleType);
                }, 50);
                break;
            case StoryIndexType.backgroundType:
                UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
                setTimeout(() => {
                    UIOpenOrHideManager.Instance.OpenCharacterSettingView(CharacterFactionType.backgroundPicture);
                }, 50);
                let guideData1 = new editorGuideData();
                guideData1.tips = "请完成红点角色的设定\n不然Ta就只能是旁白哦^_^";
                let background = BackgroundPictureManager.Instance.getbackgrounPictureList();
                let boolbackground = false;
                if (background.length > 0) {
                    boolbackground = true;
                }
                if (boolbackground) {
                    guideData1.btnStr = "下一步:运行场景";
                } else {
                    guideData1.btnStr = "";
                }
                guideData1.callBack = () => {
                    UIOpenOrHideManager.Instance.HideNavigationBarView();
                    setTimeout(() => {
                        let storyImport = new NavigationBarBackData();
                        storyImport.uiname = UiNames.TutorialBackground;
                        let commondata = new commonBackData();
                        commondata.CenterDisplayBol = false;
                        commondata.callBack = () => {
                            console.log("引导按钮点击事件 回调 ==========================");
                            AppMain.buildType = BuildType.none;
                            PlayerGuideManager.isNewGuideBol = false;

                        }
                        storyImport.data = commondata;
                        UIOpenOrHideManager.Instance.HideChatbackgroundView();
                        UIOpenOrHideManager.Instance.OpenNavigationBarView(storyImport);
                    }, 50)
                };
                UIOpenOrHideManager.Instance.OpenGuideView(guideData1);
                break;
            default:
                break;
        }
    }

}


export enum StoryIndexType {
    storyImport,
    BasicType,
    roleType,
    roleSaveType,
    SceneType,
    backgroundType

}
export class titleData {
    title: string
    lastStepStr: string
    nextStepStr: string
}
export enum guideUIName {
    Basicsettings,
    RoleSettings,
    ChapterMenu,
    SceneMenu,
    SceneTalk,
    BackgroundPicture,
    BackgroundMusic,
    NavigationBar = 7,
    characterPreview = 8,
}
export enum EditorGuideType {
    editorGameBasicSettingSave = 0,//编辑器 游戏基础设定
    editorRoleSettingPreview, //编辑器 角色预览
    editorRoleSettingSave,  //编辑器 角色保存
    editorChapterScenariosSave,  //编辑器 章节场景目录
    editorSceneDialogueSave,  // 编辑器场景对话保存
    editorScenearioCode,  //编辑器 场景代码编辑
    editorSceneBackgroundPreview, // 编辑器 场景背景图预览
    editorSceneBackgroundSave,  //编辑器 背景图保存
    editorBackgroundMusicPreview,  //编辑器 背景音乐 预览
    editorBackgroundMusicSave, // 编辑器 背景音乐保存

}
//编辑项目时，向服务器保存的引导的步骤
export enum GuideIndexType {
    /**游戏设定 */
    BasicSetting,
    /**角色设定 */
    RoleSetting,
    /**角色列表 */
    RoleResource,
    /**章节场景目录 */
    ChapterScenarios,
    /**选择场景 */
    SelectScene,
    /**场景对话 */
    SceneTalk,
    /**背景图 */
    BackgroundPicture,
    /**背景图列表 */
    BackgroundResource,
    BackgroundMusic,

}
export class editorGuideData {
    tips: string;
    btnStr: string;
    callBack: Function;
}