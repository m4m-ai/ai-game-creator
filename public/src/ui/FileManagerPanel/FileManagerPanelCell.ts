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
import { CommonUIUtils } from "Data/CommonUIUtils";
import { GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { GameMgr } from "GameMgr";
import { EditorAssetInfo } from "m4m_editor/Game/Asset/EditorAssetInfo";
import { FileManagerPanel } from "./FileManagerPanel";
import { FileManagerPanelView } from "./FileManagerPanelView";
import { FileManagerPanelViewData, newEditorAssetInfo } from "./FileManagerPanelViewData";
import { AIResourceManager, resourceType } from "Manager/AIResourceManager";
import { UiNames } from "Manager/UIData/UiNames";

export class FileManagerPanelCell implements ICellHandler {
    nowClass: FileManagerPanel.animationbg_img;
    index: number;
    config: GridConfig;
    cellData: newEditorAssetInfo;
    private editBtn: m4m.framework.button;
    public onInit(): void {
        this.editBtn = this.nowClass.picture2_img.edit1_img.transform.addComponent("button") as m4m.framework.button;
        this.editBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.onEditClickFun, this);
    }


    public onSetData(value: newEditorAssetInfo): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;
            let type = value.type;
            this.nowClass.animati1_img.transform.visible = false;
            if (type == resourceType.resourceMgr) {//资源管理

                // this.nowClass.animati1_img.transform.visible = false;
                this.editBtn.transform.visible = true;
                let element: EditorAssetInfo = value.editorInfo;
                if (element.isLeaf) {
                    // console.error(element.value + "文件");
                    this.nowClass.picture2_img.animation2_lab.label.text = element.value;
                } else {
                    // console.error(element.value + "文件夹");
                    this.nowClass.picture2_img.animation2_lab.label.text = element.value;
                }
                let iconName = FileManagerPanelViewData.getFileIconFun(element.isLeaf, element.value);
                CommonUIUtils.setTextureFun(this.nowClass.picture2_img.picture1_raw.rawImage2D, GameMgr.FileResource + "small" + iconName + ".png");
                // console.error(element.value);
            } else {//AI资源库
                this.editBtn.transform.visible = false;
                // console.log("AI资源库 的 文件名 :", this.cellData.resourceName);
                let iconName = "smallfolder";
                CommonUIUtils.setTextureFun(this.nowClass.picture2_img.picture1_raw.rawImage2D, GameMgr.FileResource + iconName + ".png");
                this.nowClass.picture2_img.animation2_lab.label.text = this.cellData.resourceName;
            }
        } else {
            this.nowClass.transform.visible = false;
        }
    }

    public onClick() {
        console.log("点击了 " + this.cellData.editorInfo);
        if (this.cellData.type == resourceType.resourceMgr) {
            if (this.cellData.editorInfo.isLeaf) {
                // console.error("点的是文件 另外处理");
            } else {
                FileManagerPanelView.Instance.viewData.upDateFileInfoArr(this.cellData.editorInfo);
            }
        } else {//AI资源库
            console.log("AI资源库  索引 ：", this.index);
            AIResourceManager.closeUIname = UiNames.FileManagerPanel;
            AIResourceManager.instance.setStepByIndex(this.index);
        }

    }

    public onEditClickFun() {
        console.error("点击 三个点按钮");
    }


    public onSelect() {
        if (this.cellData.type == resourceType.resourceMgr) {

            let vis = false;
            if (this.cellData.editorInfo.isLeaf) {
                vis = true;
            }
            this.nowClass.animati1_img.transform.visible = vis;
        } else {
            console.log("选中 文件格子 ---- ", this.index);
        }
    }

    public onUnSelect() {
        this.nowClass.animati1_img.transform.visible = false;
    }

    public onDispose(): void {
        this.editBtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.onEditClickFun, this);
    }
}
