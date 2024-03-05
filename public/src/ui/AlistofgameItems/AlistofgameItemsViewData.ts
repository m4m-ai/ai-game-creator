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
import { UiNames } from "Manager/UIData/UiNames";
import { UiManager } from "PSDUI/UiManager";
import { AlistofgameItemsView } from "./AlistofgameItemsView";
import { GameCell } from "./GameCell";
import { ManipulatebubblesView } from "ManipulatebubblesView";
import { GameProjectManager } from "Manager/GameProjectManager";
import { NavigationBarBackData, UIOpenOrHideManager, commonBackData } from "Manager/UIOpenOrHideManager";
import { CommonPoupManager } from "Manager/CommonPoupManager";
import { PlayerGuideManager, editorGuideData, guideUIName } from "Manager/PlayerGuideManager";
import { cMap } from "Data/Map";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "Data/BindKeyName";
import { GalManagerRequest } from "AutoCode/Net/ClientRequest/GalManagerRequest";
import { RoleSettingManager } from "Manager/RoleSettingManager";
import { GalData } from "GalData";

export class AlistofgameItemsViewData implements ViewBaseData {
    public binder: FunctionBinder;
    public galdataBinder: FunctionBinder;
    public constructor() {
        this.binder = UiDataManager.bindFunctionData(BindKeyName.GetCurrentGALdata, this.onCreateProjectFun.bind(this));
        this.galdataBinder = UiDataManager.bindFunctionData(BindKeyName.getGalDataById, this.onGetGalDataByIdFun.bind(this));
    }
    public TransDic: cMap<ManipulatebubblesView> = new cMap<ManipulatebubblesView>();
    public totalTransHideFun() {
        this.TransDic.forEach((v, k) => {
            v.hide();
        });
    }
    public onCreateProjectFun(projectData) {
        console.log("新创建的项目 数据 ：", projectData);
        PlayerGuideManager.instance.guideStepIndex = 0;
        UIOpenOrHideManager.Instance.HideAlistofgameItemsView();
        if (PlayerGuideManager.instance.guideStepIndex > PlayerGuideManager.currentGuideIndex) {
            let tipsDic = PlayerGuideManager.instance.getDescribeDic();
            let tips = tipsDic.get(PlayerGuideManager.instance.guideStepIndex);
            let guideData = new editorGuideData();
            guideData.tips = tips;
            guideData.btnStr = "";
            UIOpenOrHideManager.Instance.OpenGuideView(guideData);
            PlayerGuideManager.currentGuideIndex = PlayerGuideManager.instance.guideStepIndex;
        }
        let commondata = new commonBackData();
        commondata.CenterDisplayBol = true;
        commondata.callBack = () => {
            UIOpenOrHideManager.Instance.OpenBasicsettingsView();
        }
        UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata);
    }
    public OpenTipPanel(index: number) {
        // console.log("选中了格子， 显示操作气泡", index);
        UiManager.getUIByName(UiNames.Manipulatebubbles, (AlistofgameItemsView.Instance.grid.getCell(index) as GameCell).nowClass.newprojectbg1.windoweditingbg.bottom.definition_btn.transform, (uiObj) => {
            uiObj.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, -180);
            uiObj.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 0);
            uiObj.transform.markDirty();
            let cellData = AlistofgameItemsView.Instance.grid.getCell(index).cellData;
            let trans = uiObj as ManipulatebubblesView;
            trans.deleteCallBackFun = () => {
                // console.log("点击了删除按钮 弹出二级确认弹窗");
                CommonPoupManager.instance.openCommonPopupFun({
                    titleStr: "删除", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "", rightbtnStr: "确认删除",
                    showDescribBol: true, describeStr: "您确定想要删除此项目吗？",
                    leftBtnCallBack: () => {
                        // console.log("左侧按钮回调");
                        UIOpenOrHideManager.Instance.HideBottomslabView();
                    },
                    rightBtnCallBack: (str: string) => {
                        UIOpenOrHideManager.Instance.HideBottomslabView();
                        if (GameProjectManager.instance.GameDataArr) {
                            GameProjectManager.instance.GameDataArr.splice(index, 1);
                            // console.log("删除游戏后的数据 ：", GameProjectManager.instance.GameDataArr);
                            //刷新一下游戏列表ui 
                            AlistofgameItemsView.Instance.setGridListDataFun(GameProjectManager.instance.GameDataArr);
                        }
                    },
                });
            }
            trans.reSetCallBackFun = () => {
                // console.log("游戏列表重新编辑回调，弹出重命名游戏弹窗");
                let currentGameName = cellData.galName;
                CommonPoupManager.instance.openCommonPopupFun({
                    titleStr: "重命名", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "", rightbtnStr: "保存",
                    showFirstInputFiledBol: true, firstInputTitle: "游戏名", firstInputDefaultTitle: currentGameName,
                    leftBtnCallBack: () => {
                        console.log("左侧按钮回调");
                        UIOpenOrHideManager.Instance.HideBottomslabView();
                    },
                    rightBtnCallBack: (str: string) => {
                        if (str && str != "" && str != currentGameName) {
                            UIOpenOrHideManager.Instance.HideBottomslabView();
                            if (GameProjectManager.instance.GameDataArr) {
                                let gamedata = GameProjectManager.instance.GameDataArr[index];
                                gamedata.galName = str;
                                let time = this.getTime();
                                gamedata.lastTime = time.toString();
                                // console.log("重命名游戏后的数据 ：", GameProjectManager.instance.GameDataArr);
                                //刷新一下游戏列表ui 
                                AlistofgameItemsView.Instance.setGridListDataFun(GameProjectManager.instance.GameDataArr);
                            }
                        }
                    },
                });
            }
            this.TransDic.set(index, trans);
        });
    }
    public setCommonPoupData() {
        CommonPoupManager.instance.openCommonPopupFun({
            titleStr: "新建游戏", leftBtnBol: true, midBtnBol: true, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "专业模式", rightbtnStr: "AI引导模式",
            showDescribBol: true, describeStr: "您想使用那种方式创作游戏？\nAI引导模式：全程AI引导创作，适合新人使用\n专业模式:直接进入编辑器，可以自行使用AI进行创作", changeLineBol: true,
            leftBtnCallBack: () => {
                // console.log("左侧按钮回调");
                UIOpenOrHideManager.Instance.HideBottomslabView();
            },
            midBtnCallBack: () => {
                UIOpenOrHideManager.Instance.HideBottomslabView();
                // console.log("中间按钮回调");
                CommonPoupManager.instance.openCommonPopupFun({
                    titleStr: "新建游戏", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "返回", midbtnStr: "", rightbtnStr: "创建",
                    showFirstInputFiledBol: true, firstInputTitle: "游戏名", firstInputDefaultTitle: "请输入游戏名",
                    showSecondBol: true, secondTitle: "储存路径", secondDefaultTitle: "/项目默认路径",
                    leftBtnCallBack: () => {
                        // console.log("左侧按钮回调");
                        UIOpenOrHideManager.Instance.HideBottomslabView();
                    },
                    rightBtnCallBack: (str: string) => {
                        // console.log("专业模式 创建的游戏 :", str);
                        UIOpenOrHideManager.Instance.HideBottomslabView();
                    },
                    uploadBtnCallBack: () => {
                        // console.log("修改路径按钮");
                        UIOpenOrHideManager.Instance.OpenStoragePathView((StoragePath: string) => {

                            //派发事件 修改路径
                            UiDataManager.changeFunctionData(BindKeyName.ModifyPath, StoragePath);
                        });
                    },
                });

            },
            rightBtnCallBack: (str: string) => {
                // console.log("右侧按钮回调  AI引导模式");
                // console.log("输入的文本 --- :", str);
                RoleSettingManager.instance.currentRoleID = "";
                GameProjectManager.instance.currentGalData = null;
                //目前简单处理 在创建项目弹窗 点击AI引导模式后 直接调用服务器创建项目接口
                // let id = Math.floor(Math.random() * 100);
                let id = RoleSettingManager.instance.creatUuid()
                let name = str
                // console.log("id +++++ ", id);
                GalManagerRequest.Instance.CreatAGal(GameProjectManager.instance.testProjectId + id, name);
                PlayerGuideManager.instance.guideStepIndex = 0;
                UIOpenOrHideManager.Instance.HideBottomslabView();
                UIOpenOrHideManager.Instance.HideAlistofgameItemsView();

                // if (PlayerGuideManager.isNewGuideBol) {
                if (PlayerGuideManager.instance.guideStepIndex > PlayerGuideManager.currentGuideIndex) {
                    let tipsDic = PlayerGuideManager.instance.getDescribeDic();
                    let tips = tipsDic.get(PlayerGuideManager.instance.guideStepIndex);
                    let guideData = new editorGuideData();
                    guideData.btnStr = "";
                    guideData.tips = tips;
                    UIOpenOrHideManager.Instance.OpenGuideView(guideData);
                    PlayerGuideManager.currentGuideIndex = PlayerGuideManager.instance.guideStepIndex;
                }
                // }
                let commondata: commonBackData = new commonBackData();
                commondata.CenterDisplayBol = true;
                commondata.callBack = () => {
                    UIOpenOrHideManager.Instance.OpenBasicsettingsView();
                };
                UIOpenOrHideManager.Instance.OpenTutorialBackgroundView(commondata);
            }
        });
    }
    public getTime() {
        let nowTime = new Date(Date.parse(new Date().toString()));
        let year = nowTime.getFullYear();
        let month = nowTime.getMonth();
        let day = nowTime.getDate();
        let time = year + "年" + month + "月" + day + "日";
        return time;
    }
    public GotoGuideFun() {
        CommonPoupManager.instance.openCommonPopupFun({
            titleStr: "新建游戏", leftBtnBol: true, midBtnBol: true, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "专业模式", rightbtnStr: "AI引导模式",
            showDescribBol: true, changeLineBol: true, describeStr: "您想使用那种方式创作游戏？\nAI引导模式：全程AI引导创作，适合新人使用\n专业模式:直接进入编辑器，可以自行使用AI进行创作",
            showFirstInputFiledBol: false, firstInputTitle: "", firstInputDefaultTitle: "",
            showSecondBol: false, secondTitle: "", secondDefaultTitle: "",
            leftBtnCallBack: () => {
                // console.log("左侧按钮回调");
                UIOpenOrHideManager.Instance.HideBottomslabView();
            },
            rightBtnCallBack: (str: string) => {
                UIOpenOrHideManager.Instance.HideBottomslabView();
                this.AICreate();
            },
            midBtnCallBack: () => {
                UIOpenOrHideManager.Instance.OpenStoragePathView((StoragePath: string) => {

                    //派发事件 修改路径
                    UiDataManager.changeFunctionData(BindKeyName.ModifyPath, StoragePath);
                });
            },
        });
        PlayerGuideManager.isNewGuideBol = true;
        GameProjectManager.isCreateNewProject = true;
        RoleSettingManager.instance.currentRoleID = "";
        GameProjectManager.instance.currentGalData = null;
        GameProjectManager.instance.currentBackStoryData = null;
        //目前简单处理 在创建项目弹窗 点击AI引导模式后 直接调用服务器创建项目接口
        // let id = Math.floor(Math.random() * 100);
        // let id = RoleSettingManager.instance.creatUuid()

        // console.log("id +++++ ", id);
        // //向服务器发送创建新 gal 项目
        // GalManagerRequest.Instance.CreatAGal(id);
    }

    //开始编辑得项目数据
    public editProjectFun(projectId: string) {
        GameProjectManager.isCreateNewProject = false;
        GameProjectManager.instance.currentBackStoryData = null;
        console.log("开始编辑的项目 id :", projectId);
        GameProjectManager.instance.editCurrentUIType = -1;
        //向服务器请求当前打开的项目数据
        GalManagerRequest.Instance.CreatAGal(projectId, null);
    }
    //编辑已创建项目
    public onGetGalDataByIdFun(galData: GalData) {
        let guideIndex = galData.schedule;
        guideIndex = 9;
        console.log("项目引导步骤  ：", guideIndex);
        if (guideIndex > guideUIName.characterPreview) {//项目已完成引导
            PlayerGuideManager.isNewGuideBol = false;
            UIOpenOrHideManager.Instance.HideAlistofgameItemsView();
            let data = new NavigationBarBackData();
            data.uiname = "";
            UIOpenOrHideManager.Instance.OpenNavigationBarView(data);
        } else {
            PlayerGuideManager.isNewGuideBol = true;
            PlayerGuideManager.instance.guideStepIndex = guideIndex;
            PlayerGuideManager.instance.openUIbyGuideIndex(guideIndex, galData);
            UIOpenOrHideManager.Instance.HideAlistofgameItemsView();
        }
    }
    public dispose() {
        this.TransDic.forEach((v, k) => {
            v = null;
        });
        this.TransDic.clear();
        UiDataManager.unBindFunctionDataByBinder(this.binder);
        UiDataManager.unBindFunctionDataByBinder(this.galdataBinder);
    }

    public AICreate() {
        CommonPoupManager.instance.openCommonPopupFun({
            titleStr: "新建游戏", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "", rightbtnStr: "创建",
            showFirstInputFiledBol: true, firstInputTitle: "游戏名", firstInputDefaultTitle: "请输入游戏名",
            showSecondBol: true, secondTitle: "储存路径", secondDefaultTitle: "/项目默认路径",
            leftBtnCallBack: () => {
                // console.log("左侧按钮回调");
                UIOpenOrHideManager.Instance.HideBottomslabView();
            },
            rightBtnCallBack: (str: string) => {
                // console.log("AI引导模式你 :", str);
                let id = RoleSettingManager.instance.creatUuid();
                //let name = str;
                //console.log("name", str);
                console.log("id +++++ ", id);
                //向服务器发送创建新 gal 项目
                GalManagerRequest.Instance.CreatAGal(id, str);
                UIOpenOrHideManager.Instance.HideBottomslabView();

            },
            uploadBtnCallBack: () => {
                // console.log("修改路径按钮");
                UIOpenOrHideManager.Instance.OpenStoragePathView((StoragePath: string) => {

                    //派发事件 修改路径
                    UiDataManager.changeFunctionData(BindKeyName.ModifyPath, StoragePath);
                });
            },
        });

    }
}