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
import { BackGroundImageManagerRequest } from "AutoCode/Net/ClientRequest/BackGroundImageManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class BackGroundImageManager {
    public static get Instance(): BackGroundImageManager {
        if (this._instance == null) {
            this._instance = new BackGroundImageManager();
        }

        return this._instance;
    }
    private static _instance: BackGroundImageManager;

    /**
     * 获取已有的背景图
     */
    public GetBackGround(projectId: string, backGroundId: string, clientData: ClientData) {
        BackGroundImageManagerRequest.Instance.GetBackGround(projectId, backGroundId);
    }
    /**
     * 获取所有的背景图
     */
    public GetAllBackGround(projectId: string, clientData: ClientData) {
        BackGroundImageManagerRequest.Instance.GetAllBackGround(projectId);
    }
    /**
     * 通过语言模型生成场景的背景描述,llmType:选择的模型
     */
    public LLM_GetBackGroundByScene(projectId: string, title: string, chapterId: string, SceneId: string, llmType: number, prompt: string, clientData: ClientData) {
        BackGroundImageManagerRequest.Instance.LLM_GetBackGroundByScene(projectId, title, chapterId, SceneId, llmType, prompt);
    }
    /**
     * 设定场景的背景描述
     */
    public SetBackGroundByScene(projectId: string, chapterId: string, SceneId: string, content: string, clientData: ClientData) {
        BackGroundImageManagerRequest.Instance.SetBackGroundByScene(projectId, chapterId, SceneId, content);
    }
    /**
     * 通过绘图模型生成场景的背景
     */
    public StableDiffusio_GetBackGround(projectId: string, title: string, chapterId: string, SceneId: string, prompt: string, chatID: string, clientData: ClientData) {
        BackGroundImageManagerRequest.Instance.StableDiffusio_GetBackGround(projectId, title, chapterId, SceneId, prompt, chatID);
    }
    /**
     * 设定场景的背景
     */
    public SetBackGroundImageByScene(projectId: string, chapterId: string, SceneId: string, imageId: string, clientData: ClientData) {
        BackGroundImageManagerRequest.Instance.SetBackGroundImageByScene(projectId, chapterId, SceneId, imageId);
    }
    /**
     * 保存生成的音乐
     */
    public SaveBackGroundImage(projectId: string, imageId: string, clientData: ClientData) {
        BackGroundImageManagerRequest.Instance.SaveBackGroundImage(projectId, imageId);
    }
}