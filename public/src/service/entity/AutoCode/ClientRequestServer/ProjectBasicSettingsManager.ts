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
import { ProjectBasicSettingsManagerRequest } from "AutoCode/Net/ClientRequest/ProjectBasicSettingsManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class ProjectBasicSettingsManager {
    public static get Instance(): ProjectBasicSettingsManager {
        if (this._instance == null) {
            this._instance = new ProjectBasicSettingsManager();
        }

        return this._instance;
    }
    private static _instance: ProjectBasicSettingsManager;

    /**
     * 获取指定项目的背景设定
     */
    public GetBackStory(projectId: string, clientData: ClientData) {
        ProjectBasicSettingsManagerRequest.Instance.GetBackStory(projectId);
    }
    /**
     * 设定指定项目进度
     */
    public SetSchedule(projectId: string, schedule: number, clientData: ClientData) {
        ProjectBasicSettingsManagerRequest.Instance.SetSchedule(projectId, schedule);
    }
    /**
     * 设定指定项目的背景设定
     */
    public SetBackStory(projectId: string, projectBack: string, clientData: ClientData) {
        ProjectBasicSettingsManagerRequest.Instance.SetBackStory(projectId, projectBack);
    }
    /**
     * 通过语言模型生成指定项目的背景设定，llmType：调用的语言模型
     */
    public LLM_GetBackStory(projectId: string, title: string, llmType: number, prompt: string, clientData: ClientData) {
        ProjectBasicSettingsManagerRequest.Instance.LLM_GetBackStory(projectId, title, llmType, prompt);
    }
    /**
     * 设定指定项目的项目名
     */
    public SetProjectName(projectId: string, projectName: string, clientData: ClientData) {
        ProjectBasicSettingsManagerRequest.Instance.SetProjectName(projectId, projectName);
    }
    /**
     * 通过语言模型生成指定项目的项目名，llmType：调用的语言模型
     */
    public LLM_GetProjectName(projectId: string, title: string, llmType: number, backStory: string, prompt: string, clientData: ClientData) {
        ProjectBasicSettingsManagerRequest.Instance.LLM_GetProjectName(projectId, title, llmType, backStory, prompt);
    }
    /**
     * 获取支持的画风，count：获取数量, isRandom:(是否随机画风，还是由AI判断适合的画风)
     */
    public StableDiffusio_GetStyleExample(projectId: string, title: string, count: number, isRandom: any, clientData: ClientData) {
        ProjectBasicSettingsManagerRequest.Instance.StableDiffusio_GetStyleExample(projectId, title, count, isRandom);
    }
    /**
     * 设定指定项目的画风模型
     */
    public SetStyle(projectId: string, styleId: string, clientData: ClientData) {
        ProjectBasicSettingsManagerRequest.Instance.SetStyle(projectId, styleId);
    }
}