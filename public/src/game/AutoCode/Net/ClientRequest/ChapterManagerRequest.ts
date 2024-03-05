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
import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class ChapterManagerRequest {
    public static get Instance(): ChapterManagerRequest {
        if (this._instance == null) {
            this._instance = new ChapterManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ChapterManagerRequest;


    /***
     * 获取章节信息
     */
    public GetChapter(projectId, chapterId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},`;
        let mess = WebsocketTool.Instance.getMsg("ChapterManager","GetChapter",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成全游戏章节和场景，chapterCount：章节数量，minSceneCount：单个章节最小场景数量，maxSceneCount：单个章节最大场景数量
     */
    public LLM_GetChapters(projectId, title, llmType, chapterCount, minSceneCount, maxSceneCount, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(chapterCount)},"a4":${JSON.stringify(minSceneCount)},"a5":${JSON.stringify(maxSceneCount)},"a6":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("ChapterManager","LLM_GetChapters",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定全游戏章节信息
     */
    public SetChapters(projectId, chapters, scenes) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapters)},"a2":${JSON.stringify(scenes)},`;
        let mess = WebsocketTool.Instance.getMsg("ChapterManager","SetChapters",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成指定章节的场景，chapterId：章节id，minSceneCount：单个章节最小场景数量，maxSceneCount：单个章节最大场景数量
     */
    public LLM_GetChapter(projectId, title, chapterId, minSceneCount, maxSceneCount, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(minSceneCount)},"a4":${JSON.stringify(maxSceneCount)},"a5":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("ChapterManager","LLM_GetChapter",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定章节信息
     */
    public SetChapter(projectId, chapterId, chapter) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(chapter)},`;
        let mess = WebsocketTool.Instance.getMsg("ChapterManager","SetChapter",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定章节指定场景信息
     */
    public SetScene(projectId, chapterId, sceneId, chapter) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(chapter)},`;
        let mess = WebsocketTool.Instance.getMsg("ChapterManager","SetScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}