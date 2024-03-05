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
import { FileInfoManager } from "./CodeEditor/code/FileInfoManager";
import { ExportManager } from "./Export";
import { EditorEventMgr } from "./Game/Event/EditorEventMgr";
import { EventBinder } from "./Game/Event/EventBinder";
import { Utils } from "./Game/Utils";

//所有需要给h5工程调用的接口都必须在该类中导出!
export * from "./Game/EditorApplication";
export * from "./Game/ExportManager/ExportManager";

/*
m4m_editor/Game/Utils
m4m_editor/Game/Event/EditorEventMgr
m4m_editor/Game/Asset/EditorAssetInfo
m4m_editor/CodeEditor/code/FileInfoManager
m4m_editor/Game/Event/EventBinder
m4m_editor/Game/ExportManager/ExportManager
*/

System.CommonJsCache = {};

System.CommonJsCache["/Game/Utils"] = {
    exports: {
        Utils: Utils,
    }
}

System.CommonJsCache["/Game/Event/EditorEventMgr"] = {
    exports: {
        EditorEventMgr: EditorEventMgr,
    }
}

System.CommonJsCache["/Game/Asset/EditorAssetInfo"] = {
    exports: {
        //EditorEventMgr: EditorAssetInfo,
    }
}

System.CommonJsCache["/CodeEditor/code/FileInfoManager"] = {
    exports: {
        FileInfoManager: FileInfoManager,
    }
}

System.CommonJsCache["/Game/Event/EventBinder"] = {
    exports: {
        EventBinder: EventBinder,
    }
}

System.CommonJsCache["/Game/ExportManager/ExportManager"] = {
    exports: {
        ExportManager: ExportManager,
    }
}