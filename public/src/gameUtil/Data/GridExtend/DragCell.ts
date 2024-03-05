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
import { UiManager } from "../../PSDUI/UiManager";
import { GridExtend } from "./GridExtend";
import { ICellHandler } from "./ICellHandler";

/**
 * 拖拽cell处理类, 
 */
export abstract class DragCell {

    /**
     * 拖拽时是否克隆一个新的cell
     */
    public dragCloneCell: boolean = true;

    /**
     * 正在拖拽中grid
     */
    public get draggingGrid() {
        return this._dragGrid;
    }

    /**
     * 正在拖拽中的cell
     */
    public get draggingCell() {
        return this._dragCell;
    }

    /**
     * 当前类所属的网格对象
     */
    public get masterGrid() {
        return this._master;
    }

    //当前
    private _dragGrid: GridExtend<any, any> = null;
    //当前拖拽中的cell对象
    private _dragCell: ICellHandler = null;
    //当前类所属的网格对象
    private _master: GridExtend<any>;
    ////所属网格的按钮
    //private _masterBtn: m4m.framework.button;

    private _dragTrans: m4m.framework.transform2D;
    private _parent: m4m.framework.transform2D;
    private _dragStartPos: m4m.math.vector2;
    private _height: number;
    private _index: number;

    //连接的网格
    private _connectGrid: Map<GridExtend<any>, m4m.framework.button> = new Map();
    private _dragFuncMap: Map<m4m.framework.button, {
        enter: Function,
        exit: Function
    }> = new Map();
    private _enterGrid: GridExtend<any>;

    /**
     * 当开始拖拽一个cell时调用
     * @param cell 被拖拽的cell组件
     * @param from 从哪个grid组件开始拖拽的
     */
    public abstract onDrag(cell: ICellHandler, from: GridExtend<any>);

    /**
     * 当拖拽一个cell并进入到一个grid时调用
     * @param cell 被拖拽的cell组件
     * @param from 从哪个grid组件开始拖拽的
     * @param other 鼠标进入的grid组件
     */
    public abstract onDragEnterGrid(cell: ICellHandler, from: GridExtend<any>, other: GridExtend<any>);

    /**
     * 当拖拽一个cell离开一个grid时调用
     * @param cell 被拖拽的cell组件
     * @param from 从哪个grid组件开始拖拽的
     * @param other 鼠标离开的grid组件
     */
    public abstract onDragExitGrid(cell: ICellHandler, from: GridExtend<any>, other: GridExtend<any>);

    /**
     * 拖拽一个cell并放到grid区域时调用
     * @param cell 被拖拽的cell组件
     * @param from 从哪个grid组件开始拖拽的
     * @param to 最终放入的grid组件
     */
    public abstract onDrop(cell: ICellHandler, from: GridExtend<any>, to: GridExtend<any>);

    /**
     * 当拖拽cell被取消时调用, 也就是拖拽cell在grid区域外松手
     * @param cell 被拖拽的cell组件
     * @param from 从哪个grid组件开始拖拽的
     */
    public abstract onDragCancel(cell: ICellHandler, from: GridExtend<any>);

    /**
     * 拖拽cell移动时调用
     * @param x 鼠标的x坐标
     * @param y 鼠标的y坐标
     * @param cell 被拖拽的cell组件
     */
    public abstract onMove(x: number, y: number, cell: ICellHandler);

    /**
     * 销毁时调用
     */
    public abstract onDispose();

    /**
     * 获取所有连接的网格对象
     */
    public getConnectDragGrid(): GridExtend<any>[] {
        return Array.from(this._connectGrid.keys());
    }

    //---------------------------------------------------------------------------------------------------

    /**
     * 初始化
     */
    public init(master: GridExtend<any>) {
        this._master = master;
        this.addConnectDragGrid(master);
    }

    /**
     * 添加连接拖拽的网格
     */
    public addConnectDragGrid(other: GridExtend<any>) {
        if (!this._connectGrid.has(other)) {
            let btn = this.getOrCreateGridBtn(other);
            let arr = Array.from(this._connectGrid.values());
            if (arr.indexOf(btn) != -1) {
                throw new Error("发现两个grid组件共用同一个父节点, 无法添加拖拽事件!");
            }
            this._connectGrid.set(other, btn);
        }
    }

    /**
     * 移除连接拖拽的网格
     */
    public removeConnectDragGrid(other: GridExtend<any>) {
        let btn = this._connectGrid.get(other);
        if (btn) {
            if (this._dragGrid == other) {
                this.dragEnd();
            } else {
                let data = this._dragFuncMap.get(btn);
                if (data) {
                    btn.removeListener(m4m.event.UIEventEnum.PointerEnter, data.enter as any, this);
                    btn.removeListener(m4m.event.UIEventEnum.PointerExit, data.exit as any, this);
                }
            }
        }
        this._connectGrid.delete(other);
    }

    /**
     * 拖拽开始
     */
    public dragStart(x: number, y: number, grid: GridExtend<any, any>, cell: ICellHandler) {
        if (this._dragCell != null) {
            this.dragEnd();
        }
        //console.error(x, y);
        this._dragGrid = grid;
        this._dragCell = cell;

        let pos = cell.nowClass.transform.localTranslate;
        this._dragStartPos = new m4m.math.vector2(pos.x, pos.y);

        if (this.dragCloneCell) {
            this._dragTrans = cell.nowClass.transform.clone();
        } else {
            this._dragTrans = cell.nowClass.transform;
            this._index = this._dragTrans.getSiblingIndex();
            this._parent = this._dragTrans.parent;
            this._parent.removeChild(this._dragTrans);
        }

        let poplayer = UiManager.poplayer;
        //CommonHostUtil.SetTransformRaycastTarget(this._dragTrans, false);
        poplayer.addChild(this._dragTrans);
        this._height = poplayer.height;
        this.setCellPos(x, y);

        this._connectGrid.forEach((btn, grid) => {
            this.bindPointerEvent(btn, grid);
        });

        this.onDrag(this.draggingCell, this.draggingGrid);
        //this.onDragEnterGrid(this.draggingCell, this.draggingGrid, this.draggingGrid);
    }

    /**
     * 拖拽结束
     */
    public dragEnd() {
        if (this._dragCell == null) {
            return;
        }

        this._connectGrid.forEach((btn, grid) => {
            this.unbindPointerEvent(btn);
        });
        this._dragFuncMap.clear();

        if (this._enterGrid != null) {
            this.onDrop(this.draggingCell, this.draggingGrid, this._enterGrid);
        } else {
            this.onDragCancel(this.draggingCell, this.draggingGrid);
        }

        if (this.dragCloneCell) {
            UiManager.poplayer.removeChild(this._dragTrans);
            this._dragTrans.dispose();
        } else {
            UiManager.poplayer.removeChild(this._dragCell.nowClass.transform);
            this._parent.addChildAt(this._dragTrans, this._index);
            //CommonHostUtil.SetTransformRaycastTarget(this._dragTrans, true);
            this._dragTrans.localTranslate = this._dragStartPos;
        }
        this._dragGrid = null;
        this._dragCell = null;
        this._parent = null;
        this._dragTrans = null;
    }

    /**
     * 拖拽移动中
     */
    public dragMove(x: number, y: number) {
        this.setCellPos(x, y);
        this.onMove(x, y, this.draggingCell);
    }

    public dispose() {
        this.onDispose();
        let gridList = this.getConnectDragGrid();
        let master = this.masterGrid;
        for (let item of gridList) {
            master.disconnectDragGrid(item);
        }
    }


    private setCellPos(x: number, y: number) {
        this._dragTrans.localTranslate = new m4m.math.vector2(x, y);
    }

    private getOrCreateGridBtn(grid: GridExtend<any>) {
        let config = grid["config"];
        let trans: m4m.framework.transform2D;
        if (config.scroll) {
            trans = config.scroll.transform;
        } else {
            trans = grid["girdData"].parentTrans;
        }
        let btn = trans.getComponent("button") as m4m.framework.button;
        if (!btn) {
            btn = trans.addComponent("button") as m4m.framework.button;
        }
        return btn;
    }

    private bindPointerEvent(btn: m4m.framework.button, grid: GridExtend<any>) {
        let enter = function(this: DragCell) {
            if (this._enterGrid != null && this._enterGrid != grid) {
                this.onDragExitGrid(this.draggingCell, this.draggingGrid, this._enterGrid);
            }
            this._enterGrid = grid;
            this.onDragEnterGrid(this.draggingCell, this.draggingGrid, grid);
        }
        let exit = function(this: DragCell) {
            if (this._enterGrid == grid) {
                this.onDragExitGrid(this.draggingCell, this.draggingGrid, grid);
                this._enterGrid = null;
            }
        }
        btn.addListener(m4m.event.UIEventEnum.PointerEnter, enter, this);
        btn.addListener(m4m.event.UIEventEnum.PointerExit, exit, this);
        this._dragFuncMap.set(btn, {
            enter,
            exit
        });
    }

    private unbindPointerEvent(btn: m4m.framework.button) {
        let data = this._dragFuncMap.get(btn);
        btn.removeListener(m4m.event.UIEventEnum.PointerEnter, data.enter as any, this);
        btn.removeListener(m4m.event.UIEventEnum.PointerExit, data.exit as any, this);
    }
}