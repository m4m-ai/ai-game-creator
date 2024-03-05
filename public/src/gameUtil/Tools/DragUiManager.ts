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
import { InputManager } from "./InputManager";

export enum DragState {
    /** 开始拖拽 */
    DragStart,
    /** 拖拽中 */
    DragMove,
    /** 结束拖拽 */
    DragEnd
}

/**
 * 拖拽Ui管理器
 */
export class DragUiManager {

    private static _instance = new DragUiManager();
    public static get Instance() {
        return this._instance;
    }

    private constructor() {
        InputManager.addMoveCallBackFun((x: number, y: number) => {
            for (let item of this.dragList) {
                if (item.dragging) {
                    item.func(x, y, DragState.DragMove);
                } else {
                    item.func(x, y, DragState.DragStart);
                    item.dragging = true;
                }
            }
        });
        InputManager.addUpCallBackFun((x, y) => {
            for (let item of this.dragList) {
                if (item.dragging) {
                    item.func(x, y, DragState.DragEnd);
                }
            }
            this.dragList.length = 0;
        });
    }
    private dragList: { func: (x: number, y: number, state: DragState) => void, dragging: boolean }[] = [];
    private bindMap: Map<m4m.framework.button, Function> = new Map();

    /**
     * 给button上添加一个拖拽事件
     */
    public addDragEvent(button: m4m.framework.button, cb: (x: number, y: number, state: DragState) => void) {
        if (this.bindMap.has(button)) {
            throw new Error("当前按钮已经添加拖拽事件了!");
        }
        let func = function(this: DragUiManager) {
            this.dragList.push({
                dragging: false,
                func: cb
            });
        }
        this.bindMap.set(button, func);
        button.addListener(m4m.event.UIEventEnum.PointerDown, func, this);
    }

    /**
     * 移除button上的拖拽事件
     */
    public removeDragEvent(button: m4m.framework.button) {
        if (!this.bindMap.has(button)) {
            console.error("当前按钮并没有绑定拖拽事件!");
        }
        let func: any = this.bindMap.get(button);
        this.bindMap.delete(button);
        button.removeListener(m4m.event.UIEventEnum.PointerDown, func, this);
    }
}