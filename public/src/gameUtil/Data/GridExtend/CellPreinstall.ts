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
import { Cell } from "Data/Cell";
import { GridConfig, UiNode } from "./GridExtend";
import { ICellHandler } from "./ICellHandler";
/**
 * 预设的Cell组件
 */
@m4m.reflect.node2DComponent
export class CellPreinstall<T extends UiNode> extends Cell {

    public nowClass: T;
    public cellHandler: ICellHandler<any>;
    public visibleFlag: boolean = false;
    public setCellClass(value: { nowClass: T, cellHandler: any, config: GridConfig }): void {
        super.setCellClass(value);
        this.nowClass = value.nowClass;
        this.cellHandler = new value.cellHandler();
        this.cellHandler.index = this.index;
        this.cellHandler.nowClass = this.nowClass;
        this.cellHandler.config = value.config;
        this.cellHandler.onInit();
    }

    public setData(value: any): void {
        this.cellHandler.cellData = value;
        this.cellHandler.onSetData(value);
    }

    public pointerDownFun() {
        if (this.cellHandler.onPointDown) {
            this.cellHandler.onPointDown();
        }
    }

    //鼠标移入
    public pointerEnterFun() {
        if (this.cellHandler.onPointEnter) {
            this.cellHandler.onPointEnter();
        }
    }

    //鼠标移出
    public pointerExitFun() {
        if (this.cellHandler.onPointExit) {
            this.cellHandler.onPointExit();
        }
    }

    public refreshIndexFun(index: number) {
        if (this.cellHandler.onRefreshIndex) {
            this.cellHandler.onRefreshIndex(index);
        }
    }

    public onSetLastPosData() {
        if (this.cellHandler.onSetLastPosData) {
            this.cellHandler.onSetLastPosData();
        }
    }

    public dispose(): void {
        super.dispose();
        if (this.cellHandler.onDispose) {
            this.cellHandler.onDispose();
            this.nowClass.transform.dispose();
        }
    }

}