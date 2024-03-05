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
import { MusicManagerRequest } from "AutoCode/Net/ClientRequest/MusicManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class MusicManager {
    public static get Instance(): MusicManager {
        if (this._instance == null) {
            this._instance = new MusicManager();
        }

        return this._instance;
    }
    private static _instance: MusicManager;

    /**
     * 获取已有的英语
     */
    public GetMusic(projectId: string, musicId: string, clientData: ClientData) {
        MusicManagerRequest.Instance.GetMusic(projectId, musicId);
    }
    /**
     * 通过语言模型生成场景的音乐描述,llmType:选择的模型
     */
    public LLM_GetMusicByScene(projectId: string, title: string, chapterId: string, SceneId: string, llmType: number, prompt: string, clientData: ClientData) {
        MusicManagerRequest.Instance.LLM_GetMusicByScene(projectId, title, chapterId, SceneId, llmType, prompt);
    }
    /**
     * 设定场景的音乐描述
     */
    public SetMusicByScene(projectId: string, chapterId: string, SceneId: string, content: string, clientData: ClientData) {
        MusicManagerRequest.Instance.SetMusicByScene(projectId, chapterId, SceneId, content);
    }
    /**
     * 通过音乐模型生成场景的音乐
     */
    public MUSIC_GetMusicByContent(projectId: string, title: string, content: string, clientData: ClientData) {
        MusicManagerRequest.Instance.MUSIC_GetMusicByContent(projectId, title, content);
    }
    /**
     * 保存生成的音乐
     */
    public SaveMusic(projectId: string, musicId: string, clientData: ClientData) {
        MusicManagerRequest.Instance.SaveMusic(projectId, musicId);
    }
    /**
     * 设定场景的音乐
     */
    public SetMusicToScene(projectId: string, chapterId: string, SceneId: string, musicId: string, clientData: ClientData) {
        MusicManagerRequest.Instance.SetMusicToScene(projectId, chapterId, SceneId, musicId);
    }
}