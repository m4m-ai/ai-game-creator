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
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { UiDataManager } from "PSDUI/UiDataManager";
import { Basicsettings } from "./Basicsettings";
import { BasicsettingsView } from "./BasicsettingsView";
import { ArtStyleData } from "./BasicsettingsViewData";

/**
 * 聊天页签
 */
export class BasicsettingsArtStyleCell implements ICellHandler {
    nowClass: Basicsettings.sound1_lab;
    index: number;
    config: GridConfig;
    cellData: ArtStyleData;
    onInit(): void {
        this.nowClass.label.text = ``;
    }
    onSetData(value: ArtStyleData): void {
        if (value) {
            this.nowClass.label.text = value.styleName;
            this.nowClass.transform.visible = true;
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    onSetLastPosData?(): void {
        
    }
    onClick?(): void {
        BasicsettingsView.Instance.viewData.selectStyleId = this.cellData.styleId;
        UiDataManager.changeFunctionData(BindKeyName.OnAiSetBasicSettings, {beauxArtStyle: this.cellData.styleName});
        BasicsettingsView.Instance.unShowArtStyleList();
    }
    onDoubleClick?(): void {
        
    }
    onPointDown?(): void {
        
    }
    onPointEnter?(): void {
        
    }
    onPointExit?(): void {
        
    }
    onRefreshIndex?(index: number): void {
        
    }
    onSelect?(): void {
        
    }
    onUnSelect?(): void {
        
    }
    onDispose?(): void {
        
    }
    
}