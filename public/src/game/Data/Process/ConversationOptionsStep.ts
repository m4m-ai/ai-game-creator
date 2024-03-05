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
import {Step, StepEventData} from "./Step";
import {StepType} from "./StepType";
import { UiDataManager } from "PSDUI/UiDataManager";
import {BindKeyName} from "../BindKeyName";

export type ConversationOptionsStepData = {
    /** 显示文本 */
    label: string;
    /** 需要跳转的场景路径 */
    scene: string;
};

/**
 * 对话选项
 */
export class ConversationOptionsStep extends Step {
    
    public constructor(data: ConversationOptionsStepData[]) {
        super(StepType.conversation);
        this.data = data;
    }
    
    public data: ConversationOptionsStepData[];
    
    public run(finish: () => void): void {
        let data: StepEventData<ConversationOptionsStepData[]> = {
            index: this.index,
            data: this.data,
            finish
        };
        UiDataManager.changeFunctionData(BindKeyName.OnChangeConversationOptions, data);
        // let scene: SceneInfo;
        // if (confirm("是否跳转到scene1从头开始?")) {
        //     scene = SceneManager.Instance.getScene("scene1");
        // } else {
        //     scene = SceneManager.Instance.getScene(this.data[1].scene);
        // }
        // EditorManager.Instance.changeScene(scene);
        // finish();
    }
}