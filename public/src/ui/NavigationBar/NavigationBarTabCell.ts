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
import { UiNode, GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { NavigationBar } from "./NavigationBar";
import { NavigationBarView } from "./NavigationBarView";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { PlayerGuideManager } from "Manager/PlayerGuideManager";

export class NavigationBarTabCell implements ICellHandler {
    nowClass: NavigationBar.filebg1;
    index: number;
    config: GridConfig;
    cellData: any;
    onInit(): void {

    }
    onSetData(value: any): void {
        if (value) {
            // console.log("tab icon ", value);
            this.cellData = value;
            this.nowClass.filebg_img.transform.visible = false;
            this.nowClass.transform.visible = true;
            let src = NavigationBarView.Instance.uiName + ".atlas.json_" + value + "a";
            this.nowClass.file1_img.image.sprite = CommonUIUtils.getSprite(src);
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    public onClick(): void {
        console.log("点击得格子 index :", this.index);
        if (!PlayerGuideManager.isNewGuideBol) {
            // let src = "";
            if (this.config.viewdata.lastTabIndex != this.index) {
                // src = NavigationbarView.Instance.uiName + ".atlas.json_" + this.cellData + "a";
                this.nowClass.filebg_img.transform.visible = true;
            } else {
                // src = NavigationbarView.Instance.uiName + ".atlas.json_" + this.cellData + "a";
                this.nowClass.filebg_img.transform.visible = false;
            }
            // this.nowClass.file1_img.image.sprite = CommonUIUtils.getSprite(src);
            this.config.viewdata.selectTabFun(this.index);
        }
    }
    public onSelect(): void {
        // console.log("选中格子 index :", this.index);
        // if (!PlayerGuideManager.isNewGuideBol) {
        //     let src = NavigationbarView.Instance.uiName + ".atlas.json_" + this.cellData + "b";
        //     this.nowClass.file1_img.image.sprite = CommonUIUtils.getSprite(src);
        //     this.nowClass.filebg_img.transform.visible = true;
        //     this.config.viewdata.selectTabFun(this.index);
        // }

    }
    public onUnSelect(): void {
        // let src = NavigationbarView.Instance.uiName + ".atlas.json_" + this.cellData + "a";
        // this.nowClass.file1_img.image.sprite = CommonUIUtils.getSprite(src);
        this.nowClass.filebg_img.transform.visible = false;
    }
}