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
import {ICellHandler} from "Data/GridExtend/ICellHandler";
import {CheakPopup} from "./CheakPopup";
import textnotselectedbg_btn = CheakPopup.textnotselectedbg_btn;
import { AiGuideMessageSelectButton } from "Data/DataType";

export class CheakPopupSelectCell implements ICellHandler {
    nowClass: textnotselectedbg_btn;
    index: number;
    config: GridConfig;
    cellData: AiGuideMessageSelectButton;

    public selected: boolean = false;

    onInit(): void {
        this.nowClass.textselectionbg1_img.transform.visible = false;
    }
    onSetData(value: AiGuideMessageSelectButton): void {
        if (value) {
            this.nowClass.textnotselected_lab.label.text = value.text;
            this.nowClass.transform.visible = true;
            //开启多选
            if (this.config.multipleChoice) {
                this.setSelected(false);
            }
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    
    onClick(): void {
        if (this.config.multipleChoice) {
            this.setSelected(!this.selected);
        }
    }

    onSelect(): void {
        if (!this.config.multipleChoice) {
            this.setSelected(true);
        }
    }

    onUnSelect(): void {
        if (!this.config.multipleChoice) {
            this.setSelected(false);
        }
    }

    private setSelected(value: boolean) {
        this.selected = value;
        this.nowClass.textselectionbg1_img.transform.visible = value;
    }
}