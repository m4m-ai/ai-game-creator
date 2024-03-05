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
import { GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { StoragePath } from "./StoragePath";
import { StoragePathView } from "./StoragePathView";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { GameMgr } from "GameMgr";
export class FileCell implements ICellHandler {
    config: GridConfig;
    cellData: any;
    public nowClass: StoragePath.picturbg3;
    public index: number;
    public isSelect = false;
    //存储的数据
    //英雄数据
    public roleData: any;

    public onInit(): void {
    }

    public onSetData(value): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;
            this.nowClass.animation2_lab.label.text = value;
            let fileScr = GameMgr.FileResource + "folder.png";
            CommonUIUtils.setTextureFun(this.nowClass.picture1_raw.rawImage2D, fileScr);
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    public clickBtnFun() {
        // console.log("点击了按钮---");
    }
    onClick() {

    }
    public onSelect() {
        // console.log("选中状态---");
        StoragePathView.Instance.viewData.setCurrentPathFun(this.cellData);
    }
    public onUnSelect() {

    }
}