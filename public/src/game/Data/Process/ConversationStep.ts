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
import { StandingPaintingStep } from "./StandingPaintingStep";
import { BackgroundStep } from "./BackgroundStep";
import { VoiceStep } from "./VoiceStep";

export type ConversationStepData = {
    /** 显示文本 */
    text: string;
    /** 表情 */
    expression?: string;
    /** 显示的角色名称 */
    roleName?: string;
    /** DialogData表数据 */
    dialogData?: Entity.DialogData;
    /** 显示表情 */
    emote?: string;
}

/**
 * 对话流程
 */
export class ConversationStep extends Step {
    constructor(data: ConversationStepData) {
        super(StepType.conversation);
        this.jumpNeedRun = true;
        this.data = data;
    }
    
    public data: ConversationStepData;
    
    public run(finish: () => void): void {
        let data: StepEventData<ConversationStepData> = {
            index: this.index,
            data: this.data,
            finish
        };
        UiDataManager.changeFunctionData(BindKeyName.OnChangeConversation, data);
    }

    /**
     * 查找当前对话使用的角色立绘
     */
    public findStandingPainting() {
        if (this.data.roleName == null || this.data.roleName.length == 0) {
            return null;
        }
        let tempPrev = this.prevStep;
        while (tempPrev != null) {
            if (tempPrev.type == StepType.conversation) {
                return null;
            } else if (tempPrev.type == StepType.standingPainting) {
                return tempPrev as StandingPaintingStep;
            }
            tempPrev = tempPrev.prevStep;
        }
        return null;
    }

    /**
     * 查找当前对话使用的背景
     */
    public findBackground() {
        let tempPrev = this.prevStep;
        while (tempPrev != null) {
            if (tempPrev.type == StepType.conversation) {
                return null;
            } else if (tempPrev.type == StepType.background) {
                return tempPrev as BackgroundStep;
            }
            tempPrev = tempPrev.prevStep;
        }
        return null;
    }

    /**
     * 查找当前对话使用的语音
     */
    public findVoice() {
        if (this.data.roleName == null || this.data.roleName.length == 0) {
            return null;
        }
        let tempPrev = this.prevStep;
        while (tempPrev != null) {
            if (tempPrev.type == StepType.conversation) {
                return null;
            } else if (tempPrev.type == StepType.voice) {
                return tempPrev as VoiceStep;
            }
            tempPrev = tempPrev.prevStep;
        }
        return null;
    }
}