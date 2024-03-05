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

export class MusicManagerRequest {
    public static get Instance(): MusicManagerRequest {
        if (this._instance == null) {
            this._instance = new MusicManagerRequest();
        }

        return this._instance;
    }
    private static _instance: MusicManagerRequest;


    /***
     * 获取已有的英语
     */
    public GetMusic(projectId, musicId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(musicId)},`;
        let mess = WebsocketTool.Instance.getMsg("MusicManager","GetMusic",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成场景的音乐描述,llmType:选择的模型
     */
    public LLM_GetMusicByScene(projectId, title, chapterId, SceneId, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(SceneId)},"a4":${JSON.stringify(llmType)},"a5":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("MusicManager","LLM_GetMusicByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定场景的音乐描述
     */
    public SetMusicByScene(projectId, chapterId, SceneId, content) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(SceneId)},"a3":${JSON.stringify(content)},`;
        let mess = WebsocketTool.Instance.getMsg("MusicManager","SetMusicByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过音乐模型生成场景的音乐
     */
    public MUSIC_GetMusicByContent(projectId, title, content) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(content)},`;
        let mess = WebsocketTool.Instance.getMsg("MusicManager","MUSIC_GetMusicByContent",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 保存生成的音乐
     */
    public SaveMusic(projectId, musicId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(musicId)},`;
        let mess = WebsocketTool.Instance.getMsg("MusicManager","SaveMusic",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定场景的音乐
     */
    public SetMusicToScene(projectId, chapterId, SceneId, musicId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(SceneId)},"a3":${JSON.stringify(musicId)},`;
        let mess = WebsocketTool.Instance.getMsg("MusicManager","SetMusicToScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}