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
import { ChapterData } from "ChapterData";
import { GalRoleData } from "GalRoleData";
import { SceneData } from "SceneData";
import { ProjectRoleManagerRequest } from "../AutoCode/Net/ClientRequest/ProjectRoleManagerRequest";
import { ChapterInfo } from "../Data/ChapterInfo";
import { ChatGuide } from "../Data/Chat/ChatGuide";
import { SceneInfo } from "../Data/SceneInfo";
import { ChapterSceneDirectoryManager } from "./ChapterSceneDirectoryManager";
import { EditorManager } from "./EditorManager";
import { GameProjectManager } from "./GameProjectManager";
import { RoleSettingManager } from "./RoleSettingManager";

export class StoryImportManager {
    public static get Instance(): StoryImportManager {
        if (this._instance == null) {
            this._instance = new StoryImportManager()
        }
        return this._instance;
    }
    private static _instance: StoryImportManager;

    public dataImport: any;

    public ChapterDataList: ChapterData[] = [];
    public sceneDataList: SceneData[] = [];
    public getRoleDataList: GalRoleData[] = [];

    public AddRole() {
        if (this.getRoleDataList.length > 0) {
            let galroleData = JSON.stringify(this.getRoleDataList);
            ProjectRoleManagerRequest.Instance.SetRoleSettingList(GameProjectManager.instance.currentGalData.id, galroleData);
        }
    }


    public AddChapterScenes(chapterData) {
        if (chapterData == null) {
            console.error("章节数据出错!");
            return;
        }

        if (this.ChapterDataList.length > 0 && this.sceneDataList.length > 0) {
            ChapterSceneDirectoryManager.Instance.SetChapters(this.ChapterDataList, this.sceneDataList);
        }
    }
}