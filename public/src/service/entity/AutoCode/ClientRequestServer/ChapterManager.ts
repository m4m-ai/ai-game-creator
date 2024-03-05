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
import { ChapterManagerRequest } from "AutoCode/Net/ClientRequest/ChapterManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class ChapterManager {
    public static get Instance(): ChapterManager {
        if (this._instance == null) {
            this._instance = new ChapterManager();
        }

        return this._instance;
    }
    private static _instance: ChapterManager;

    /**
     * 获取章节信息
     */
    public GetChapter(projectId: string, chapterId: string, clientData: ClientData) {
        ChapterManagerRequest.Instance.GetChapter(projectId, chapterId);
    }
    /**
     * 通过语言模型生成全游戏章节和场景，chapterCount：章节数量，minSceneCount：单个章节最小场景数量，maxSceneCount：单个章节最大场景数量
     */
    public LLM_GetChapters(projectId: string, title: string, llmType: number, chapterCount: number, minSceneCount: number, maxSceneCount: number, prompt: string, clientData: ClientData) {
        ChapterManagerRequest.Instance.LLM_GetChapters(projectId, title, llmType, chapterCount, minSceneCount, maxSceneCount, prompt);
    }
    /**
     * 设定全游戏章节信息
     */
    public SetChapters(projectId: string, chapters: string, scenes: string, clientData: ClientData) {
        ChapterManagerRequest.Instance.SetChapters(projectId, chapters, scenes);
    }
    /**
     * 通过语言模型生成指定章节的场景，chapterId：章节id，minSceneCount：单个章节最小场景数量，maxSceneCount：单个章节最大场景数量
     */
    public LLM_GetChapter(projectId: string, title: string, chapterId: string, minSceneCount: number, maxSceneCount: number, prompt: string, clientData: ClientData) {
        ChapterManagerRequest.Instance.LLM_GetChapter(projectId, title, chapterId, minSceneCount, maxSceneCount, prompt);
    }
    /**
     * 设定指定章节信息
     */
    public SetChapter(projectId: string, chapterId: string, chapter: string, clientData: ClientData) {
        ChapterManagerRequest.Instance.SetChapter(projectId, chapterId, chapter);
    }
    /**
     * 设定指定章节指定场景信息
     */
    public SetScene(projectId: string, chapterId: string, sceneId: string, chapter: string, clientData: ClientData) {
        ChapterManagerRequest.Instance.SetScene(projectId, chapterId, sceneId, chapter);
    }
}