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
import { MusicManagerRequest } from "../AutoCode/Net/ClientRequest/MusicManagerRequest";
import { GameProjectManager } from "./GameProjectManager";

export class BackgroundMusicManager {
    public static get Instance(): BackgroundMusicManager {
        if (this._instance == null) {
            this._instance = new BackgroundMusicManager();
        }
        return this._instance;
    }
    private static _instance: BackgroundMusicManager;

    public init() {

    }

    /**
     * 获取已有的音乐
     * @param musicId 音乐id 
     */
    public GetMusic(musicId: string) {
        let projectId = GameProjectManager.instance.currentGalData.id
        MusicManagerRequest.Instance.GetMusic(projectId, musicId);
    }


    /**
     *  设定场景的音乐描述
     * @param chapterId 章节id
     * @param SceneId 场景id
     * @param content 音乐描述
     */
    public SetMusicByScene(chapterId: string, SceneId: string, content: string) {
        let projectId = GameProjectManager.instance.currentGalData.id
        MusicManagerRequest.Instance.SetMusicByScene(projectId, chapterId, SceneId, content);
    }

    /**
     * 设定场景的音乐
     * @param chapterId 章节ID 
     * @param SceneId 场景id
     * @param musicId 音乐id
     */
    public SetMusicToScene(chapterId: string, SceneId: string, musicId: string) {
        let projectId = GameProjectManager.instance.currentGalData.id
        MusicManagerRequest.Instance.SetMusicToScene(projectId, chapterId, SceneId, musicId);
    }


    /**
     * 保存生成的音乐
     * @param imageId 
     */
    public SaveMusic(musicId: string) {
        let projectId = GameProjectManager.instance.currentGalData.id
        MusicManagerRequest.Instance.SaveMusic(projectId, musicId,)

    }
}