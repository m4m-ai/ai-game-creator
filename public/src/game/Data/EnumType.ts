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
export enum ChatTabEnum {
    /** 背景设定 */
    backgroundSetting,
    /** 角色设定 */
    role,
    /** 对话场景 */
    chapterScenes,
    /** 场景对话 */
    sceneDialogue,
    /** 背景图片 */
    backgroundImage,
    /** 自由聊天 */
    free,
}

export enum ChatApiType {
    /** 背景设定 */
    backgroundSetting,
    /** 生成项目名称 */
    projectName,
    /** 角色设定 */
    role,
    /** 角色立绘 */
    rolePortrait,
    /** 角色表情 */
    roleEmote,
    /** 对话场景 */
    chapterScenes,
    /** 场景对话 */
    sceneDialogue,
    /** 场景背景描述 */
    sceneBackgroundDescribe,
    /** 背景图片 */
    backgroundImage,
    /** 聊天语音 */
    daiglogVoices,
    /** 整个场景聊天语音 */
    sceneDaiglogVoices,
    /** 自由聊天 */
    free,
}