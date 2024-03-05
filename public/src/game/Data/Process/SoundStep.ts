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
import {Step, StepEventData} from "./Step";
import {StepType} from "./StepType";
import {BindKeyName} from "../BindKeyName";

export type SoundStepData = {
    instId: string;
    /** 是否播放 */
    play: boolean;
    /** 资源路径 */
    resPath?: string;
    /** 播放速度 */
    speed?: number;
    /** 类型 */
    type?: number;
    /** 音量 */
    volume?: number;
    /** 是否循环 */
    loop?: boolean;
    /** 延时时间 */
    delay?: number;
    /** 声道 */
    channel?: number;
}

/**
 * 切换音效步骤
 */
export class SoundStep extends Step {
    
    public constructor(data: SoundStepData) {
        super(StepType.sound);
        this.jumpNeedRun = true;
        this.data = data;
    }
    public data: SoundStepData;
    
    public run(finish: () => void): void {
        let data: StepEventData<SoundStepData> = {
            index: this.index,
            data: this.data,
            finish
        };
        UiDataManager.changeFunctionData(BindKeyName.OnChangeSound, data);
    }
}