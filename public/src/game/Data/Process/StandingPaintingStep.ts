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

export interface StandingPaintingStepData extends StepTranslateData {
    instId: string;
    /** 是否显示 */
    show: boolean;
    /** 图片资源名称 */
    resPath?: string;
    /** 淡入淡出时间 */
    fadeInOutTime?: number;
    /** 是否是淡入 */
    isFadeIn?: boolean;
    /** 基础预设效果名称 */
    presetEffect?: string;
}

/**
 * 切换立绘步骤
 */
export class StandingPaintingStep extends Step {
    
    public constructor(data: StandingPaintingStepData) {
        super(StepType.standingPainting);
        this.jumpNeedRun = true;
        this.data = data;
    }
    
    public data: StandingPaintingStepData;
    
    public run(finish: () => void): void {
        let data: StepEventData<StandingPaintingStepData> = {
            index: this.index,
            data: this.data,
            finish
        };
        UiDataManager.changeFunctionData(BindKeyName.OnChangeStandingPainting, data);
    }
    
}