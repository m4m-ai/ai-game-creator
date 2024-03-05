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
import { PublishProjectManagerRequest } from "AutoCode/Net/ClientRequest/PublishProjectManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class PublishProjectManager {
    public static get Instance(): PublishProjectManager {
        if (this._instance == null) {
            this._instance = new PublishProjectManager();
        }

        return this._instance;
    }
    private static _instance: PublishProjectManager;

    /**
     * 发布完整项目 args：发布相关参数
     */
    public PublishProject(projectId: string, args: string[], clientData: ClientData) {
        PublishProjectManagerRequest.Instance.PublishProject(projectId, args);
    }
    /**
     * 只发布指定章节段 args：发布相关参数
     */
    public PublishProjectOnlyChapter(projectId: string, ChapterId: string, args: string[], clientData: ClientData) {
        PublishProjectManagerRequest.Instance.PublishProjectOnlyChapter(projectId, ChapterId, args);
    }
    /**
     * 只发布指定场景对话 args：发布相关参数
     */
    public PublishProjectOnlyScene(projectId: string, ChapterId: string, sceneId: string, args: string[], clientData: ClientData) {
        PublishProjectManagerRequest.Instance.PublishProjectOnlyScene(projectId, ChapterId, sceneId, args);
    }
}