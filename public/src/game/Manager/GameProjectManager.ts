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
import { EditorEventMgr } from "m4m_editor/Game/Event/EditorEventMgr";
import { WebsocketTool } from "../AutoCode/Net/WebsocketTool";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "../Data/BindKeyName";
import { NavigationBarBackData, UIOpenOrHideManager, commonBackData } from "./UIOpenOrHideManager";
import { GalManagerRequest } from "../AutoCode/Net/ClientRequest/GalManagerRequest";
import { GalPreviewData } from "GalPreviewData";
import { GalData } from "GalData";
import { GalRoleData } from "GalRoleData";
import { cMap } from "Data/Map";
import { BackStoryData } from "BackStoryData";
import { RoleSettingManager } from "./RoleSettingManager";
import { ProjectRoleManagerRequest } from "../AutoCode/Net/ClientRequest/ProjectRoleManagerRequest";
import { ProjectBasicSettingsManagerRequest } from "../AutoCode/Net/ClientRequest/ProjectBasicSettingsManagerRequest";
import { VoiceBaseEvent } from "../AutoCode/Net/DataEvents/VoiceBaseEvent";
import { CharacterFactionType } from "./CharacterSettingManager";
import { UiNames } from "./UIData/UiNames";
import { UiManager } from "PSDUI/UiManager";
import { ChapterSceneType, ChpaterSceneTypeData } from "./ChapterSceneDirectoryManager";
export class GameProjectManager {
    public static get instance(): GameProjectManager {
        return this._instance;
    }
    private static _instance: GameProjectManager = new GameProjectManager();
    private constructor() {
        let binder = EditorEventMgr.Instance.addEventListener("OnOpenProjectSendToServer", (projectName) => {
            binder.removeListener();
            console.log("打开工程 " + projectName);
            //打开工程
            WebsocketTool.Instance.ProjectManager_openProject(projectName);
        });
        this.projectListRefresh = this.projectListRefreshFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.projectListRefresh, this.projectListRefresh);

        WsDataManager.VoiceBaseData.addEventListener(VoiceBaseEvent.ChangeList, (result: { [key: string]: Entity.VoiceBase }) => {
            this.prviewVoiceList.length = 0;
            for (let key in result) {
                this.prviewVoiceList.push(result[key]);
            }
            console.log("声线数据 --- ", this.prviewVoiceList);
        })
        //通过projectID 获取galData  服务器返回的监听事件
        WsDataManager.GalDataData.addEventListener("All", (result: Entity.GalData) => {
            console.log("通过id 获取的 galData :", result);
            this.currentSchedule = result.schedule;
            this.currentGalData = result;
            this.requestPreviewVoice(this.currentGalData.id);
            if (!this.localGalDataDic.has(result.id)) {
                this.localGalDataDic.set(result.id, result);
            }
            // if (RoleSettingManager.instance.galRoleDataDic == null) {
            //     RoleSettingManager.instance.galRoleDataDic = new cMap<cMap<GalRoleData>>();
            // }
            if (RoleSettingManager.instance.newGalRoleDataDic == null) {
                RoleSettingManager.instance.newGalRoleDataDic = new cMap<Array<GalRoleData>>();
            }
            if (this.roleDataList == null) {
                this.roleDataList = new cMap<GalRoleData>();
            } else {
                this.roleDataList.clear();
            }
            if (result.roles) {
                for (let key in result.roles) {
                    //通过roleid 向服务器请求角色数据  将角色数据 存储到字典中
                    ProjectRoleManagerRequest.Instance.GetRoleSetting(this.currentGalData.id, key);
                }
            }
            console.log("新的 项目 角色 数据+++++ ", RoleSettingManager.instance.newGalRoleDataDic);
            if (GameProjectManager.isCreateNewProject) {//新建项目
                UiDataManager.changeFunctionData(BindKeyName.GetCurrentGALdata, result);
            } else {//编辑已有项目
                console.log("要继续编辑的项目 --- ", result);
                UiDataManager.changeFunctionData(BindKeyName.getGalDataById, result);
            }
        });
        //通过项目背景id 获取背景设定数据  服务器返回的监听事件
        WsDataManager.BackStoryDataData.addEventListener("All", (result) => {
            console.log("服务器返回的项目背景数据 :", result);
            if (this.currentBackStoryData == null) {
                this.currentBackStoryData = new BackStoryData();
            }
            this.currentBackStoryData = result;
            UiDataManager.changeFunctionData(BindKeyName.getBackStoryById, result);
        });

        //预览项目列表数据 返回的监听事件
        WsDataManager.GalPreviewDataData.addEventListener("ChangeList", (result) => {
            //测试 最多只显示6个项目
            let index = 0;
            for (let key in result) {
                let data = result[key];
                if (GameProjectManager.isTestBol && index > 5) {
                    break;
                }

                this.GameDataArr.push(data);
                index++;
            }
            console.log("预览项目列表数据 ：", this.GameDataArr);
            this.setGameData();
        });

        //通过项目 和 角色id  获取角色数据  服务器返回监听事件
        WsDataManager.GalRoleDataData.addEventListener("All", (result) => {
            console.log("服务器返回得  角色数据 ：", result);
            // if (RoleSettingManager.instance.galRoleDataDic.has(this.currentGalData.id)) {
            //     let rolemap = RoleSettingManager.instance.galRoleDataDic.get(this.currentGalData.id);
            //     if (rolemap.has(result.id)) {
            //         let roledata = rolemap.get(result.id);
            //         roledata = result;
            //     } else {
            //         rolemap.set(result.id, result);
            //     }
            // } else {
            //     let rolemap = new cMap<GalRoleData>();
            //     rolemap.set(result.id, result);
            //     RoleSettingManager.instance.galRoleDataDic.set(this.currentGalData.id, rolemap);
            // }
            if (RoleSettingManager.instance.newGalRoleDataDic.has(this.currentGalData.id)) {
                let arr = RoleSettingManager.instance.newGalRoleDataDic.get(this.currentGalData.id);
                let Index = arr.findIndex(value => value.id == result.id);
                if (Index != -1) {
                    arr[Index] = result;
                } else {
                    let idIndex = arr.findIndex(value => value.id == "");
                    if (idIndex != -1) {//有新建角色空格子
                        arr.splice(idIndex, 0, result);
                    } else {//无新建角色空格子
                        arr.push(result);
                    }
                }
            } else {
                let roleArr = new Array<GalRoleData>();
                roleArr.push(result);
                let emptyRoleData: GalRoleData = new GalRoleData();
                emptyRoleData.id = "";
                roleArr.push(emptyRoleData);
                RoleSettingManager.instance.newGalRoleDataDic.set(this.currentGalData.id, roleArr);
            }
        });
    }
    /**编辑器 当前编辑的页面标签 */
    public editCurrentUIType = -1;
    public static isTestBol = true;
    /**编辑器中，弹出得UI  靠左偏移距离 */
    public static leftShifting = 120;
    public currentSchedule = 0;
    public static isCreateNewProject: boolean = false;
    /**是否是在编辑器中 */
    public static isInEditorBol: boolean = false;
    /**当前项目的galData */
    public currentGalData: Entity.GalData;
    /** 当前的背景数据*/
    public currentBackStoryData: BackStoryData;
    public projectListRefresh: Function;
    /**本地存储一份项目列表数据 */
    public localGalDataDic: cMap<Entity.GalData> = new cMap<Entity.GalData>();
    //
    public roleDataList: cMap<GalRoleData>;
    /**预览语音列表 */
    public prviewVoiceList: Entity.VoiceBase[] = [];
    public init() {
    }
    public projectListRefreshFun(projectIdArr: Array<string>) {
        if (this.GameDataArr) {
            for (let i = 0; i < this.GameDataArr.length; i++) {
                if (this.GameDataArr[i]) {
                    this.GameDataArr[i] = null;
                }
            }
            this.GameDataArr.length = 0;
        } else {
            this.GameDataArr = new Array<GalPreviewData>();
        }
        console.log("登陆成功，服务器返回的gal项目id 数组  :", projectIdArr);
        if (projectIdArr.length) {//已经有创建的项目数据
            //请求预览项目列表数据
            GalManagerRequest.Instance.GreatAllGalPreviewDatasAsync();
        } else {//没有项目数据 则只显示一个新建游戏的格子
            this.setGameData();
        }
    }
    public GameDataArr: Array<GalPreviewData> = new Array<GalPreviewData>();
    public testProjectId = "test1";
    //设置游戏数据
    public setGameData() {
        let emptyGameData = new GalPreviewData();
        emptyGameData.lastTime = "";
        this.GameDataArr.push(emptyGameData);
        // UIOpenOrHideManager.Instance.OpenAlistofgameItemsView();
    }

    //编辑器 根据索引打开当前项目的对应Ui
    public showUIByIndex(stepIndex: number, type: CharacterFactionType = CharacterFactionType.role) {// 到编辑器
        console.log("编辑器按钮 切换页面  ---- ", stepIndex);
        // let commondata = new commonBackData();
        // commondata.CenterDisplayBol = true;
        // commondata.callBack = () => {
        //     UIOpenOrHideManager.Instance.OpenBasicsettingsView();
        // }
        // UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata);
        // let data = new NavigationBarBackData();
        // data.uiname = UiNames.TutorialBackground;
        // let commondata = new commonBackData();
        // commondata.CenterDisplayBol = false;
        // commondata.callBack = () => {
        switch (GameProjectManager.instance.editCurrentUIType) {
            case EditUIType.BasicSetting:
                UIOpenOrHideManager.Instance.HideBasicsettingsView();
                break;
            case EditUIType.RoleResource:
                UIOpenOrHideManager.Instance.OpenRoleSettingsView(false);
                // UIOpenOrHideManager.Instance.HideSpreadingPlateView();
                // UIOpenOrHideManager.Instance.HideCharacterSettingView();
                break;
            case EditUIType.ChapterScenarios:
                UIOpenOrHideManager.Instance.HideChapterSceneMenuView();
                break;
            case EditUIType.SceneDialogue:
                break;
            case EditUIType.BackgroundResource:
                break;
        }
        //开启页面
        switch (stepIndex) {
            case EditUIType.BasicSetting:
                console.log("基础设定=====");
                if (UiManager.isUiShow(UiNames.TutorialBackground)) {
                    UIOpenOrHideManager.Instance.OpenBasicsettingsView(false);
                } else {
                    let commondata = new commonBackData();
                    commondata.CenterDisplayBol = false;
                    commondata.callBack = () => {
                        UIOpenOrHideManager.Instance.OpenBasicsettingsView();
                    }
                    UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata);
                }
                // this.setEditorGuideFun(editorGuideIndex);
                break;
            // case EditUIType.RoleResource:
            //     // UIOpenOrHideManager.Instance.OpenRoleSettingsView(false);
            //     // this.setEditorGuideFun(editorGuideIndex);
            //     break;
            case EditUIType.RoleResource:
                console.log("打开角色预览界面 ======");
                UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
                setTimeout(() => {
                    UIOpenOrHideManager.Instance.OpenCharacterSettingView(type);
                }, 50);
                // this.setEditorGuideFun(editorGuideIndex);
                break;
            case EditUIType.ChapterScenarios:
                let chapterscene = new ChpaterSceneTypeData();
                chapterscene.CenterDisplayBol = false;
                chapterscene.chapterSceneUItype = ChapterSceneType.ChapterType;
                UIOpenOrHideManager.Instance.OpenChapterSceneMenuView(chapterscene);
                // this.setEditorGuideFun(editorGuideIndex);
                break;
            case EditUIType.SceneDialogue:
                UIOpenOrHideManager.Instance.OpenSceneTalkView(false);
                // this.setEditorGuideFun(editorGuideIndex);
                break;
            case EditUIType.BackgroundResource:
                UIOpenOrHideManager.Instance.OpenBackgroundPictureView(false);
                break;
        }
        // }
        // data.data = commondata;
        // if (UiManager.isUiShow(UiNames.Navigationbar)) {
        //     UiDataManager.changeFunctionData(BindKeyName.refreshEditorUI, data);
        // } else {
        //     UIOpenOrHideManager.Instance.OpenNavigationBarView(data);

        // }

    }
    //向服务器延时发送存储项目引导 步骤  后续需要根据小代调整的修改
    public sendGuideIndexToService() {
        setTimeout(() => {
            ProjectBasicSettingsManagerRequest.Instance.SetSchedule(GameProjectManager.instance.currentGalData.id, GameProjectManager.instance.currentSchedule);
        }, 1000);
    }
    public dispose() {
        UiDataManager.unBindFunctionData(BindKeyName.projectListRefresh, this.projectListRefresh);
    }

    //请求预览语音
    private requestPreviewVoice(projectId: string) {
        WebsocketTool.Instance.ProjectRoleManager_VITS_GetAllVoice(projectId, "", "", 10, 0);
    }
}
export enum EditUIType {
    BasicSetting,
    RoleResource,
    ChapterScenarios,
    SceneDialogue,
    BackgroundResource,
    BackgroundMusic,
}