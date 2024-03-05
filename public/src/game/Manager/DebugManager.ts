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
import {Utils} from "m4m_editor/Game/Utils";
import { UiManager } from "PSDUI/UiManager";
import transform2D = m4m.framework.transform2D;

export class DebugManager {
    public static get Instance(): DebugManager {
        return this._instance;
    }

    private static _instance = new DebugManager();

    private constructor() {
    }

    /** 控制台打印节点树结构,用于debug时调用 */
    public printUiTree() {
        let str = "";
        let map = new Map<transform2D, string>();
        Utils.each2DTrans(UiManager.getUiRootTest(), (child, index) => {
            let parent = child.parent;
            let parStr = parent && map.get(parent) || "";
            switch (index) {
                case parent.children.length - 1:
                    str += parStr + "  ┖╴" + child.name;
                    map.set(child, parStr + "   ");
                    break;
                default:
                    str += parStr + "  ┠╴" + child.name;
                    map.set(child, parStr + "  ┃");
                    break;
            }
            
            let visible = true;
            let temp = child;
            while (temp != null) {
                visible = temp.visible;
                if (!visible) {
                    break;
                }
                temp = temp.parent;
            }
            
            if (!visible) {
                str += " (hide)\n";
            } else {
                str += "\n";
            }
        });
        console.log(str);
    }
}

globalThis.printUiTree = DebugManager.Instance.printUiTree.bind(DebugManager.Instance);