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
import {EditorAssetInfo} from "m4m_editor/Game/Asset/EditorAssetInfo";
import {FileInfoManager} from "m4m_editor/CodeEditor/code/FileInfoManager";
import {EditorEventMgr} from "m4m_editor/Game/Event/EditorEventMgr";
import {EventBinder} from "m4m_editor/Game/Event/EventBinder";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "../Data/BindKeyName";

export class ResourceManager {
    public static get Instance(): ResourceManager {
        return this._instance;
    }
    private static _instance: ResourceManager = new ResourceManager();

    private binder: EventBinder;
    public init() {
        //监听文件刷新
        this.binder = EditorEventMgr.Instance.addEventListener("FileTreeUpDate", (data) => {
            UiDataManager.changeFunctionData(BindKeyName.OnRefreshFileTree, data);
        });
    }
    
    /**
     * 获取资源树根节点
     */
    public getResourceRoot(): EditorAssetInfo {
        return FileInfoManager.Instance.rootFolder;
    }
    
    public getScenes(): EditorAssetInfo[] {
        return [];
    }
    
    public dispose() {
        this.binder.removeListener();
    }
}