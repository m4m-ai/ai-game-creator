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
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "../BindKeyName";
import {Step, StepEventData} from "./Step";
import { StepTranslateData } from "./StepTranslateData";
import {StepType} from "./StepType";

export interface BackgroundStepData extends StepTranslateData {
    instId: string;
    /** 是否显示 */
    show: boolean;
    /** 图片资源名称 */
    resPath?: string;
    /** 所在层级 */
    mask?: number;
}

/**
 * 切换场景背景步骤
 */
export class BackgroundStep extends Step {
    
    public constructor(data: BackgroundStepData) {
        super(StepType.background);
        this.jumpNeedRun = true;
        this.data = data;
    }
    
    public data: BackgroundStepData;
    
    public run(finish: () => void): void {
        let data: StepEventData<BackgroundStepData> = {
            index: this.index,
            data: this.data,
            finish
        };
        UiDataManager.changeFunctionData(BindKeyName.OnChangeBackground, data);
    }
    
}