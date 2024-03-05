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

export class FileManagerPanelBigCell implements ICellHandler {
    nowClass: FileManagerPanel.folderbg_img;
    index: number;
    config: GridConfig;
    cellData: newEditorAssetInfo;
    private editBtn: m4m.framework.button;
    private defFontSize: number = 0;
    private defLength: number = 8;
    public onInit(): void {
        this.editBtn = this.nowClass.folder1.editbg_img.transform.addComponent("button") as m4m.framework.button;
        this.editBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.onEditClickFun, this);

        this.defFontSize = this.nowClass.folder1.folder2_lab.label.fontsize;
    }
    public onSetData(value: newEditorAssetInfo): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;
            this.nowClass.foldrbg1_img.transform.visible = false;
            let element: EditorAssetInfo = value.editorInfo;
            let len = Math.floor(this.defLength * FileManagerPanelViewData.scaleNum);
            let str = element.value;
            if (str.length > len) {
                str = str.substring(0, len) + "...";
            }
            if (element.isLeaf) {
                // console.error(element.value + "文件");
                this.nowClass.folder1.folder2_lab.label.text = str;
            } else {
                // console.error(element.value + "文件夹");
                this.nowClass.folder1.folder2_lab.label.text = str;
            }
            let iconName=FileManagerPanelViewData.getFileIconFun(element.isLeaf,element.value);
            CommonUIUtils.setTextureFun(this.nowClass.folder1.picture_raw.rawImage2D, GameMgr.FileResource + iconName+".png");
            let changeFontSize = this.defFontSize / FileManagerPanelViewData.scaleNum;
            // console.error(this.defFontSize + "   " + changeFontSize);
            this.nowClass.folder1.folder2_lab.label.fontsize = changeFontSize;
            this.nowClass.transform.localScale.x = FileManagerPanelViewData.scaleNum;
            this.nowClass.transform.localScale.y = FileManagerPanelViewData.scaleNum;
            this.nowClass.transform.localScale = this.nowClass.transform.localScale;
            this.nowClass.transform.markDirty();

            this.nowClass.folder1.editbg_img.transform.localScale.x = 1 / FileManagerPanelViewData.scaleNum;
            this.nowClass.folder1.editbg_img.transform.localScale.y = 1 / FileManagerPanelViewData.scaleNum;
            this.nowClass.folder1.editbg_img.transform.markDirty();
        } else {
            this.nowClass.transform.visible = false;
        }
    }

    public onClick() {
        console.log("点击了 " + this.cellData.editorInfo.value);
        if (this.cellData.editorInfo.isLeaf) {
            // console.error("点的是文件 另外处理");
        } else {
            FileManagerPanelView.Instance.viewData.upDateFileInfoArr(this.cellData.editorInfo);
        }
    }

    public onEditClickFun() {
        console.error("点击 三个点按钮");
    }

    public onSelect() {
        let vis = false;
        if (this.cellData.editorInfo.isLeaf) {
            vis = true;
        }
        this.nowClass.foldrbg1_img.transform.visible = vis;
    }

    public onUnSelect() {
        this.nowClass.foldrbg1_img.transform.visible = false;
    }

    public onDispose(): void {
        this.editBtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.onEditClickFun, this);
    }
}
