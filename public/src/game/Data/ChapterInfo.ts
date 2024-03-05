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
import { SceneInfo } from "./SceneInfo";

/**
 * 章节信息
 */
export class ChapterInfo {

    /** 章节id */
    public get id(): string {
        return this._id;
    }

    private _id: string;

    /** 章节名称 */
    public get chapterName(): string {
        return this._chapterName;
    }

    private _chapterName: string;

    /** 包含的场景列表 */
    public get sceneList(): SceneInfo[] {
        return this._sceneList;
    }
    private _sceneList: SceneInfo[] = [];

    public constructor(id: string, chapterName: string) {
        this._id = id;
        this._chapterName = chapterName;
    }

    /**
     * 修改章节名称
     * @param chapterName 
     */
    public updateChapterName(chapterName: string) {
        this._chapterName = chapterName;
    }

    /** 获取指定id的场景 */
    public getSceneById(sceneId: string) {
        return this._sceneList.find(value => value.id == sceneId);
    }

    /** 获取指定名称的场景 */
    public getSceneByName(sceneName: string) {
        return this._sceneList.find(value => value.sceneName == sceneName);
    }

    /** 添加场景 */
    public appendScene(scene: SceneInfo) {
        if (scene.chapter != null) {
            console.error("已经有章节包含当前场景了!");
            return;
        }
        scene.chapter = this;
        this._sceneList.push(scene);
    }
}