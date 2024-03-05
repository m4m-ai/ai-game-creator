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
import { CheakPopup } from "./CheakPopup";

export class CheakPopupAiTab implements ICellHandler {
    nowClass: CheakPopup.tabcbg;
    index: number;
    config: GridConfig;
    cellData: string;
    public onInit(): void {
        this.nowClass.tabc1_btn.transform.visible=true;
        this.nowClass.tabc2_img.transform.visible=false;
    }
    public onSetData(value: string): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;
            this.nowClass.tabc1_btn.tablabc1_lab.label.text=value;
            this.nowClass.tabc2_img.tablabc2_lab.label.text=value;
            // console.error(element.value);
        } else {
            this.nowClass.transform.visible = false;
        }
    }

    public onClick() {
        // console.error("点击了 " + this.cellData);

    }

    public onUnSelect(){
        // console.error("取消选中 " + this.cellData);
        this.nowClass.tabc1_btn.transform.visible=true;
        this.nowClass.tabc2_img.transform.visible=false;
    }

    public onSelect() {
        // console.error("选中了 " + this.cellData);
        this.nowClass.tabc2_img.transform.visible=true;
        this.nowClass.tabc1_btn.transform.visible=false;
    }

}