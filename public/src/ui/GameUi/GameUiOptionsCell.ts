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
import {ICellHandler} from "Data/GridExtend/ICellHandler";
import { ConversationOptionsStepData } from "Data/Process/ConversationOptionsStep";
import {GameUi} from "./GameUi";
import xxbtn_btn = GameUi.xxbtn_btn;
import {GameUiView} from "./GameUiView";
import { EditorManager } from "Manager/EditorManager";

export class GameUiOptionsCell implements ICellHandler<ConversationOptionsStepData> {
    nowClass: xxbtn_btn;
    index: number;
    config: GridConfig;
    cellData: ConversationOptionsStepData;
    
    private viewInstance: GameUiView;
    onInit(): void {
        this.viewInstance = this.config.viewInstance;
    }
    onSetData(value: ConversationOptionsStepData): void {
        if (value) {
            this.nowClass.transform.visible = true;
            this.nowClass.btnlab_lab.label.text = value.label;
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    
    onClick() {
        let scene = EditorManager.Instance.getSceneByName(this.cellData.scene);
        EditorManager.Instance.changeScene(scene);
        this.viewInstance.grid.removeAll();
        this.viewInstance.viewData.isShowOption = false;
        this.viewInstance.viewData.optionsStepData.finish();
    }
}