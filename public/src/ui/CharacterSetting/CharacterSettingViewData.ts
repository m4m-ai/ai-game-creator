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
import { BackgroundPictureManager, PictureData } from "Manager/BackgroundPictureManager";
import { CharacterFactionType } from "Manager/CharacterSettingManager";
import { EditorGuideType, PlayerGuideManager, StoryIndexType, guideUIName } from "Manager/PlayerGuideManager";
import { RoleSettingManager } from "Manager/RoleSettingManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { CharacterSettingView } from "./CharacterSettingView";
import { CharacterCell } from "./CharacterCell";
import { GridConfig } from "Data/GridExtend/GridExtend";
import { UiNames } from "Manager/UIData/UiNames";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "Data/BindKeyName";
import { AIResourceManager } from "Manager/AIResourceManager";
import { ManipulatebubblesView } from "ManipulatebubblesView";
import { CommonPoupManager } from "Manager/CommonPoupManager";
import { cMap } from "Data/Map";
import { UiManager } from "PSDUI/UiManager";
import { ProjectRoleManagerRequest } from "AutoCode/Net/ClientRequest/ProjectRoleManagerRequest";
import { GameProjectManager } from "Manager/GameProjectManager";
import { AppMain } from "appMain";
import { BuildType } from "GameEnum";
// import { ManipulatebubblesView } from "ManipulatebubblesView";

export class FileInfoData {
    id: string
    FileName: string
    FileImage: string
}

export class CharacterSettingViewData implements ViewBaseData {
    private progressbarValueChangeBind: any;
    public constructor() {
        this.progressbarValueChangeBind = this.progressbarValueChange.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.SpreadingPlateProgressbarValue, this.progressbarValueChangeBind);
    }
    private initTop: number = -1;
    private maxCellNum = 4;
    private minCellNum = 3;
    public upDateConfig: GridConfig;
    private cellSpacNum: number = 0;
    public static scaleNum = 1;
    public roleList: Array<FileInfoData> = new Array<FileInfoData>();
    public TransDic: cMap<ManipulatebubblesView> = new cMap<ManipulatebubblesView>();
    public totalTransHideFun() {
        this.TransDic.forEach((v, k) => {
            v.hide();
        });
    }
    public setGridListFun() {
        this.roleList.length = 0;
        // let data = RoleSettingManager.instance.getCurrentRoleDataArr();
        let dataArr = RoleSettingManager.instance.newGetCurentProjectRoles();
        console.log("dataArr 资源库 角色数据 ：", dataArr);
        for (const iterator of dataArr) {
            // if (iterator.id) {
            let file: FileInfoData = new FileInfoData();
            file.id = iterator.id;
            if (iterator.RoleName) {
                file.FileName = iterator.RoleName;
            } else {
                file.FileName = "新建角色";
            }
            if (iterator.roleDrawing) {
                file.FileImage = iterator.roleDrawing["normal"];
            }
            this.roleList.push(file);
            // }
        }
    }

    public setPictureFun() {
        let data = BackgroundPictureManager.Instance.getbackgrounPictureList();
        if (data == null) {
            console.error("setPictureFun backgrounPictureList为空");
            return;
        }
        for (const iterator of data) {
            if (iterator.background.id) {
                let file: FileInfoData = new FileInfoData();
                file.id = iterator.background.id;
                file.FileName = iterator.background.BGName;
                file.FileImage = iterator.background.resPath;
                this.roleList.push(file);
            }
        }
        let file: FileInfoData = new FileInfoData();
        file.FileImage = "";
        file.FileName = "新建背景图";
        file.id = "";
        this.roleList.push(file);
    }
    //新建角色
    public createNewRole() {
        let type = CharacterSettingView.Instance.type;
        switch (type) {
            case CharacterFactionType.role:
                RoleSettingManager.instance.currentRoleID = "";
                UIOpenOrHideManager.Instance.HideSpreadingPlateView();
                if (AppMain.buildType == BuildType.StoryType) {
                    AIResourceManager.closeUIname = UiNames.CharacterSetting;
                    AIResourceManager.openUIname = UiNames.RoleSettings;
                    AIResourceManager.instance.editorRebackOrSave();
                    AIResourceManager.closeUIname = UiNames.RoleSettings;
                    AIResourceManager.openUIname = UiNames.CharacterSetting;
                    return;
                }
                if (PlayerGuideManager.isNewGuideBol) {
                    UIOpenOrHideManager.Instance.HideNavigationBarView();
                    PlayerGuideManager.instance.guideStepIndex = 1;
                    PlayerGuideManager.instance.lastStepIndex = guideUIName.characterPreview;
                    PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
                } else {
                    AIResourceManager.closeUIname = UiNames.CharacterSetting;
                    AIResourceManager.openUIname = UiNames.RoleSettings;
                    AIResourceManager.instance.editorRebackOrSave();
                    AIResourceManager.closeUIname = UiNames.RoleSettings;
                    AIResourceManager.openUIname = UiNames.CharacterSetting;
                }
                break;
            case CharacterFactionType.backgroundPicture:
                BackgroundPictureManager.Instance.backGroundId = null;
                BackgroundPictureManager.Instance.backgrounPicture = new PictureData();
                UIOpenOrHideManager.Instance.HideSpreadingPlateView();
                if (AppMain.buildType == BuildType.StoryType) {
                    AIResourceManager.closeUIname = UiNames.CharacterSetting;
                    AIResourceManager.openUIname = UiNames.BackgroundPicture;
                    AIResourceManager.instance.editorRebackOrSave();
                    AIResourceManager.closeUIname = UiNames.BackgroundPicture;
                    AIResourceManager.openUIname = CharacterFactionType.backgroundPicture.toString();
                    return;
                }
                if (PlayerGuideManager.isNewGuideBol) {
                    UIOpenOrHideManager.Instance.HideNavigationBarView();
                    PlayerGuideManager.instance.guideStepIndex = 1;
                    PlayerGuideManager.instance.lastStepIndex = guideUIName.characterPreview;
                    PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
                } else {
                    AIResourceManager.closeUIname = UiNames.CharacterSetting;
                    AIResourceManager.openUIname = UiNames.BackgroundPicture;
                    AIResourceManager.instance.editorRebackOrSave();
                    AIResourceManager.closeUIname = UiNames.BackgroundPicture;
                    AIResourceManager.openUIname = CharacterFactionType.backgroundPicture.toString();
                }
                break;
        }

    }

    //查看已有角色
    public viewRoleInfoFun(roleData: FileInfoData) {
        UIOpenOrHideManager.Instance.HideSpreadingPlateView();
        // console.log("选中得角色数据  ====  ", roleData);
        let type = CharacterSettingView.Instance.type;;
        switch (type) {
            case CharacterFactionType.role:
                if (AppMain.buildType == BuildType.StoryType) {
                    AIResourceManager.closeUIname = UiNames.CharacterSetting;
                    AIResourceManager.openUIname = UiNames.RoleSettings;

                    RoleSettingManager.instance.currentRoleID = roleData.id;
                    UIOpenOrHideManager.Instance.HideCharacterSettingView();
                    UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
                    PlayerGuideManager.instance.StoryGuideIndex(StoryIndexType.roleType);
                    return;
                }
                if (!PlayerGuideManager.isNewGuideBol) {
                    AIResourceManager.openUIname = UiNames.CharacterSetting;
                    AIResourceManager.closeUIname = UiNames.RoleSettings;
                }
                RoleSettingManager.instance.currentRoleID = roleData.id;
                UIOpenOrHideManager.Instance.HideCharacterSettingView();
                UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
                PlayerGuideManager.instance.newSetUIshowByIndex(true, guideUIName.RoleSettings, EditorGuideType.editorRoleSettingSave);
                break;
            case CharacterFactionType.backgroundPicture:
                if (!PlayerGuideManager.isNewGuideBol) {
                    AIResourceManager.openUIname = CharacterFactionType.backgroundPicture.toString();
                    AIResourceManager.closeUIname = UiNames.BackgroundPicture;
                }
                BackgroundPictureManager.Instance.backGroundId = roleData.id;
                UIOpenOrHideManager.Instance.HideCharacterSettingView();
                UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
                PlayerGuideManager.instance.newSetUIshowByIndex(true, guideUIName.BackgroundPicture, EditorGuideType.editorSceneBackgroundSave);
                break
        }
    }
    public resCellFun(offNum: number) {
        let scrW = CharacterSettingView.Instance.bg3.slidingbg.sliding_scr.scrollRect.transform.width;
        let bigCellTemplete = CharacterSettingView.Instance.bg3.slidingbg.sliding_scr.slidingcontent.desbg1;
        if (this.initTop != -1) {
            this.initTop = bigCellTemplete.transform.getLayoutValue(m4m.framework.layoutOption.TOP);
        }
        let ww = bigCellTemplete.transform.width;
        if (offNum > 1) {
            offNum = 1;
        }
        let cellWidth = ww * offNum;
        // console.error("格子宽高 " + ww + "  " + cellWidth + "   ");
        let columnsNum = -1;

        //最多maxCellNum 个格子 最少minCellNum个格子
        for (let i = this.maxCellNum; i >= this.minCellNum; i--) {
            let spacing = (scrW - cellWidth * i) / (i + 1);
            if (spacing >= 12 && spacing < 300) {
                // console.error(cellWidth + " 最终取 " + maxCells + " " + spacing); // 输出格子之间的间距
                columnsNum = i;
                this.cellSpacNum = spacing;
                break;
            }
        }
        if (columnsNum == -1) {
            return;
        }
        CharacterSettingViewData.scaleNum = offNum;
        // console.error("触发缩放 "+offNum);
        let spacNum = Math.floor(this.cellSpacNum);
        // console.error("边距值 "+spacNum);
        this.upDateConfig = {
            rows: 10,
            columns: columnsNum,
            offsetX: cellWidth - ww + spacNum,
            offsetY: cellWidth - ww + spacNum,
            startX: spacNum,
            startY: this.initTop
        };
        this.refreshFileInfo();
    }
    public refreshFileInfo() {
        let bigCellTemplete = CharacterSettingView.Instance.bg3.slidingbg.sliding_scr.slidingcontent.desbg1;
        if (CharacterSettingView.Instance.viewData.upDateConfig) {
            CharacterSettingView.Instance.grid.upDateConfig(bigCellTemplete, CharacterSettingView.Instance.viewData.upDateConfig);
        }
        CharacterSettingView.Instance.grid.goTop();
        CharacterSettingView.Instance.grid.setDataList(this.roleList);
    }
    private lastVale: number = -1;
    public progressbarValueChange(sliderVale: number) {
        if (this.lastVale == sliderVale) {
            return;
        }
        this.lastVale = sliderVale;
        AIResourceManager.instance.SpreadingPlateProcessValue = sliderVale;
        this.resCellFun(0.5 + sliderVale * 0.5);
    }

    public OpenTipPanel(index: number) {
        console.log("选中了格子， 显示操作气泡", index);
        UiManager.getUIByName(UiNames.Manipulatebubbles, (CharacterSettingView.Instance.grid.getCell(index) as CharacterCell).nowClass.desbg_img.editbg.edit1_btn.transform, (uiObj) => {
            uiObj.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, -120);
            uiObj.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 0);
            // uiObj.transform.localTranslate = new m4m.math.vector2();
            uiObj.transform.markDirty();
            let cellData = CharacterSettingView.Instance.grid.getCell<CharacterCell>(index).cellData;
            console.log("当前二次操作的角色 数据 ：", cellData);
            //uiObj.show();
            let trans = uiObj as ManipulatebubblesView;
            trans.deleteCallBackFun = () => {
                console.log("点击了删除按钮 弹出二级确认弹窗");
                CommonPoupManager.instance.openCommonPopupFun({
                    titleStr: "删除", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "", rightbtnStr: "确认删除",
                    showDescribBol: true, describeStr: `您确定想要删除${cellData.FileName}吗？`,
                    leftBtnCallBack: () => {
                        console.log("左侧按钮回调");
                        UIOpenOrHideManager.Instance.HideBottomslabView();
                    },
                    rightBtnCallBack: (str: string) => {
                        UIOpenOrHideManager.Instance.HideBottomslabView();
                        console.log("给服务器发送删除角色的消息 ：", cellData);
                        //发送请求
                        ProjectRoleManagerRequest.Instance.DeleteRole(GameProjectManager.instance.currentGalData.id, cellData.id);
                        //本地删除
                        RoleSettingManager.instance.deleteRoleData(cellData.id);
                        //刷新页面
                        this.setGridListFun();
                        CharacterSettingView.Instance.grid.setDataList(this.roleList);
                    },
                });
            }
            trans.reSetCallBackFun = () => {
                console.log("角色重命名");
                let currentGameName = cellData.FileName;
                CommonPoupManager.instance.openCommonPopupFun({
                    titleStr: "重命名", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "", rightbtnStr: "保存",
                    showFirstInputFiledBol: true, firstInputTitle: "角色名", firstInputDefaultTitle: currentGameName,
                    leftBtnCallBack: () => {
                        console.log("左侧按钮回调");
                        UIOpenOrHideManager.Instance.HideBottomslabView();
                    },
                    rightBtnCallBack: (str: string) => {
                        if (str && str != "" && str != currentGameName) {
                            UIOpenOrHideManager.Instance.HideBottomslabView();
                            console.log("重新命名后得角色名 ;", str, "角色数据 ：", cellData);
                            //发送请求
                            ProjectRoleManagerRequest.Instance.ChangeRoleName(GameProjectManager.instance.currentGalData.id, cellData.id, str);
                            //本地修改角色名字
                            RoleSettingManager.instance.renameRole(cellData.id, str);
                            //刷新页面
                            this.setGridListFun();
                            CharacterSettingView.Instance.grid.setDataList(this.roleList);
                        }
                    },
                });
            }
            this.TransDic.set(index, trans);
        });
    }
    public dispose() {
        UiDataManager.unBindFunctionData(BindKeyName.SpreadingPlateProgressbarValue, this.progressbarValueChangeBind);
        this.TransDic.forEach((v, k) => {
            v = null;
        });
        this.TransDic.clear();
    }
}