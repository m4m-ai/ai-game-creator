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
import { PanelBody } from "./PanelBody";

export class GameCell implements ICellHandler {
    config: GridConfig;
    cellData: any;
    public nowClass: PanelBody.lbtnbg_img;
    public index: number;
    public isSelect = false;
    //存储的数据
    //英雄数据
    public roleData: any;

    public onInit(): void {
        this.nowClass.lbtn_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.clickBtnFun, this)
    }

    public onSetData(value): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;
            this.nowClass.ltext1_lab.label.text = value;
            // this.nowClass.image.transform.visible = false;
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    public clickBtnFun() {
        console.log("点击了按钮---");
    }
    onClick() {

    }
    public onSelect() {
        console.log("选中状态---");

    }
    public onUnSelect() {

    }
}