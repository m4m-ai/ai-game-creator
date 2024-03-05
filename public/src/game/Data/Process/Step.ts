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
import {SceneInfo} from "../SceneInfo";
import {StepType} from "./StepType";

/** 消息数据 */
export type StepEventData<T> = {
    index: number;
    data: T;
    finish: () => void;
}

/**
 * 单个步骤基类
 */
export abstract class Step {
    /**
     * 步骤id
     */
    public id: string;
    /**
     * 当前步骤在整个场景中的索引
     */
    public index: number;
    /**
     * 所在的场景对象
     */
    public scene: SceneInfo;
    /**
     * 上一步
     */
    public prevStep: Step;
    /**
     * 下一步
     */
    public nextStep: Step;
    /**
     * 步骤类型
     */
    public type: StepType;
    /**
     * 跳转索引经过该step是否需要执行run()函数
     */
    public jumpNeedRun: boolean = false;
    
    public constructor(type: StepType) {
        this.type = type;
    }    
    
    /**
     * 运行到当前步骤执行的逻辑
     * @param finish 完成操作后调用该回调, 告诉编辑器这一步执行完成了
     */
    public abstract run(finish: () => void): void;
}