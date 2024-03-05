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
import { GridConfig } from "Data/GridExtend/GridExtend";
import { ViewBaseData } from "Data/ViewBaseData";
import { EditorAssetInfo } from "m4m_editor/Game/Asset/EditorAssetInfo";
import { ResourceManager } from "Manager/ResourceManager";
import { UiDataManager } from "PSDUI/UiDataManager";
import { FileManagerPanelView } from "./FileManagerPanelView";
import { AIResourceManager, resourceType } from "Manager/AIResourceManager";
import { CommonPoupManager } from "Manager/CommonPoupManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { GameProjectManager } from "Manager/GameProjectManager";

export class FileManagerPanelViewData implements ViewBaseData {
    private progressbarValueChangeBind: any;
    constructor() {
        this.progressbarValueChangeBind = this.progressbarValueChange.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.SpreadingPlateProgressbarValue, this.progressbarValueChangeBind);
    }

    private nowDirInfo: EditorAssetInfo;
    private fileInfoArr: EditorAssetInfo[];
    private newFileInfoArr: newEditorAssetInfo[];
    public upDateConfig: GridConfig;
    private cellSpacNum: number = 0;
    public static scaleNum = 1;
    private maxCellNum = 5;
    private minCellNum = 3;
    private initTop: number = -1;
    public openUiType = -1;
    public initData() {
        if (this.openUiType == resourceType.AIresource) {//AI资源库
            FileManagerPanelView.Instance.displayarea.crown.upload_btn.transform.visible = false;
            FileManagerPanelView.Instance.displayarea.crown.addto_btn.transform.visible = false;
            this.useBigCell = false;
            FileManagerPanelView.Instance.displayarea.textbg_img.textboxbg1.textbox_scr.transform.visible = true;
            FileManagerPanelView.Instance.displayarea.textbg_img.textboxbg1.textbox1_scr.transform.visible = false;
            this.setAIresDataFun();
            FileManagerPanelView.Instance.setDataList(this.newFileInfoArr);
            FileManagerPanelView.Instance.levelUrl("/");
        } else {//资源管理
            FileManagerPanelView.Instance.displayarea.crown.upload_btn.transform.visible = true;
            FileManagerPanelView.Instance.displayarea.crown.addto_btn.transform.visible = true;
            this.fileInfoArr = [];
            this.newFileInfoArr = [];
            let dirInfo = ResourceManager.Instance.getResourceRoot();
            console.log("资源管理-- ", dirInfo);
            this.upDateFileInfoArr(dirInfo);
        }
        // m4m.framework.sceneMgr.app.showFps();
        console.log("文件管理 ui weizhi :", FileManagerPanelView.Instance.displayarea.transform.getLayoutValue(m4m.framework.layoutOption.LEFT));
        FileManagerPanelView.Instance.displayarea.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
        FileManagerPanelView.Instance.displayarea.transform.markDirty();
    }
    public AIresList = ["游戏基础设定", "角色设定", "场景对话", "背景图", "背景音乐"];
    private setAIresDataFun() {
        this.newFileInfoArr = [];
        for (let i = 0; i < this.AIresList.length; i++) {
            let data = new newEditorAssetInfo();
            data.type = this.openUiType;
            data.resourceName = this.AIresList[i];
            this.newFileInfoArr.push(data);
        }
    }
    private lastVale: number = -1;
    public useBigCell: boolean = false;
    //进度条进度改变了
    public progressbarValueChange(sliderVale: number) {
        if (this.lastVale == sliderVale) {
            return;
        }
        this.lastVale = sliderVale;
        AIResourceManager.instance.SpreadingPlateProcessValue = sliderVale;
        // console.error("进度 ", sliderVale);

        if (sliderVale == 0) {
            this.useBigCell = false;
            FileManagerPanelView.Instance.displayarea.textbg_img.textboxbg1.textbox_scr.transform.visible = true;
            FileManagerPanelView.Instance.displayarea.textbg_img.textboxbg1.textbox1_scr.transform.visible = false;
            this.refreshFileInfo();
        } else {
            this.useBigCell = true;
            FileManagerPanelView.Instance.displayarea.textbg_img.textboxbg1.textbox_scr.transform.visible = false;
            FileManagerPanelView.Instance.displayarea.textbg_img.textboxbg1.textbox1_scr.transform.visible = true;
            this.resBigCellFun(0.5 + sliderVale * 0.5);
        }
    }

    //刷新大格子
    public resBigCellFun(offNum: number) {
        let scrW = FileManagerPanelView.Instance.displayarea.textbg_img.textboxbg1.textbox1_scr.scrollRect.transform.width;
        let bigCellTemplete = FileManagerPanelView.Instance.displayarea.textbg_img.textboxbg1.textbox1_scr.textbox1content.folderbg_img;
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
        FileManagerPanelViewData.scaleNum = offNum;
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

    public upDateFileInfoArr(dirInfo: EditorAssetInfo) {
        if (dirInfo == null) {
            console.error("未取到文件资源信息");
            return;
        }
        this.nowDirInfo = dirInfo;
        let canupper: boolean = true;
        if (this.nowDirInfo.parentDirInfo == null) {
            // console.error("没有父层级");
            canupper = false;
        }
        FileManagerPanelView.Instance.canupperFun(canupper);

        FileManagerPanelView.Instance.levelUrl(this.nowDirInfo.relativePath);
        this.fileInfoArr.length = 0;
        this.newFileInfoArr.length = 0;
        if (dirInfo.children) {
            for (const key in dirInfo.children) {
                this.fileInfoArr.push(dirInfo.children[key]);
                let data = new newEditorAssetInfo();
                data.type = this.openUiType;
                data.editorInfo = dirInfo.children[key];
                data.resourceName = "资源管理";
                this.newFileInfoArr.push(data);
            }
        }
        if (dirInfo.childrenFile) {
            for (const key in dirInfo.childrenFile) {
                this.fileInfoArr.push(dirInfo.childrenFile[key]);
                let data = new newEditorAssetInfo();
                data.type = this.openUiType;
                data.editorInfo = dirInfo.childrenFile[key]
                data.resourceName = "资源管理";
                this.newFileInfoArr.push(data);
            }
        }
        // FileManagerPanelView.Instance.setDataList(this.fileInfoArr);
        FileManagerPanelView.Instance.setDataList(this.newFileInfoArr);
    }

    //刷新文件数据
    public refreshFileInfo() {
        this.upDateFileInfoArr(this.nowDirInfo);
    }

    //上一层目录
    public upperLevel() {
        if (this.nowDirInfo && this.nowDirInfo.parentDirInfo) {
            this.upDateFileInfoArr(this.nowDirInfo.parentDirInfo);
        } else {
            // console.error("没有父层级 不操作");
        }
    }

    //文件图标
    public static getFileIconFun(isLeaf: boolean, fileName: string) {
        let fileIcon: string;
        if (isLeaf) {
            if (fileName.indexOf(".jpg") != -1 || fileName.indexOf(".jpeg") != -1 || fileName.indexOf(".jpe") != -1
                || fileName.indexOf(".jfif") != -1 || fileName.indexOf(".gif") != -1 || fileName.indexOf(".png") != -1 || fileName.indexOf(".webp") != -1) {
                fileIcon = "picture";
            } else if (fileName.indexOf(".mp3") != -1 || fileName.indexOf(".wav") != -1 || fileName.indexOf(".aac") != -1
                || fileName.indexOf(".flac") != -1 || fileName.indexOf(".m4a") != -1 || fileName.indexOf(".wma") != -1) {
                fileIcon = "audio";
            } else {
                fileIcon = "file";
            }
        } else {
            fileIcon = "folder";
        }
        return fileIcon;
    }

    public addNewFileFun() {
        CommonPoupManager.instance.openCommonPopupFun({
            titleStr: "新建文件夹", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "", rightbtnStr: "保存",
            showFirstInputFiledBol: true, firstInputTitle: "文件夹名", firstInputDefaultTitle: "请输入文件夹名",
            leftBtnCallBack: () => {
                console.log("左侧按钮回调");
                UIOpenOrHideManager.Instance.HideBottomslabView();
            },
            rightBtnCallBack: (str: string) => {
                if (str && str != "") {
                    UIOpenOrHideManager.Instance.HideBottomslabView();
                    console.log("保存新建的文件夹，后续增加文件夹");
                }
            },
        });
    }

    public dispose() {
        UiDataManager.unBindFunctionData(BindKeyName.SpreadingPlateProgressbarValue, this.progressbarValueChangeBind);
        if (this.fileInfoArr) {
            this.fileInfoArr.length = 0;
            this.fileInfoArr = null;
        }
        if (this.newFileInfoArr) {
            this.newFileInfoArr.length = 0;
            this.newFileInfoArr = null;
        }

    }
}
export class newEditorAssetInfo {
    type: number;
    editorInfo: EditorAssetInfo;
    resourceName: string;
}