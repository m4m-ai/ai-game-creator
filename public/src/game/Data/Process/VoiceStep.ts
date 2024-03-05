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
import { Step, StepEventData } from "./Step";
import { StepType } from "./StepType";

export type VoiceStepData = {
    instId: string;
    /** 是否播放 */
    play: boolean;
    /** 资源路径 */
    resPath?: string;
    /** 播放速度 */
    speed?: number;
    /** 音量 */
    volume?: number;
    /** 延时时间 */
    delay?: number;
    /** 声道 */
    channel?: number;
    /** DialogData表数据 */
    dialogData?: Entity.DialogData;
    /** 音频在3D空间中的播放位置 x */
    x?: number;
    /** 音频在3D空间中的播放位置 y */
    y?: number;
    /** 音频在3D空间中的播放位置 z */
    z?: number;
}

export class VoiceStep extends Step {

    public constructor(data: VoiceStepData) {
        super(StepType.voice);
        this.jumpNeedRun = true;
        this.data = data;
    }

    public data: VoiceStepData;

    public run(finish: () => void): void {
        let data: StepEventData<VoiceStepData> = {
            index: this.index,
            data: this.data,
            finish
        };
        UiDataManager.changeFunctionData(BindKeyName.OnChangeVoice, data);
    }
}