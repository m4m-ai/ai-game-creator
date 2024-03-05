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
import { UiNode } from "Data/GridExtend/GridExtend";
import { UiTools } from "PSDUI/UiTools";

export class UiNodePool<T extends UiNode> {

    private _template: T;
    private _parent: m4m.framework.transform2D;
    private _siblingIndex: number;
    private _pool: T[] = [];
    private _map: Map<string, T> = new Map();

    public constructor(tamplate: T) {
        this._template = tamplate;
        this._parent = tamplate.transform.parent;
        this._siblingIndex = tamplate.transform.getSiblingIndex();
        this._template.transform.visible = false;
    }

    /** 记录并获取ui节点实例 */
    public getUiNode(id: string) {
        if (this._map.has(id)) {
            return this._map.get(id);
        }
        let uiInstance = this.getInstance();
        this._map.set(id, uiInstance);
        return uiInstance;
    }

    /** 回收ui实例 */
    public recycleUiNode(id: string) {
        let t = this._map.get(id);
        if (t != null) {
            this.recycle(t);
        }
        this._map.delete(id);
    }

    /** 回收所有ui实例 */
    public recycleAllUiNode() {
        this._map.forEach((value, key) => {
            this.recycle(value);
        });
        this._map.clear();
    }

    /** 返回所有的ui实例 */
    public getAllUiNode() {
        return this._map;
    }

    private getInstance(): T {
        if (this._pool.length > 0) {
            let t = this._pool.pop();
            t.transform.visible = true;
            return t;
        }
        let ui = UiTools.cloneUi(this._template);
        ui.transform.visible = true;
        this._parent.addChildAt(ui.transform, ++this._siblingIndex);
        return ui;
    }

    private recycle(data: T) {
        data.transform.visible = false;
        this._pool.push(data);
    }

}