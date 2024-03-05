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
import { CellData } from "Data/CellData";
import { GridData } from "Data/GridData";
import { CalcType, ScrollRectExtend } from "Data/ScrollRectExtend";
import { UiTools } from "src/gameUtil/PSDUI/UiTools";
import { FrameMgr } from "src/gameUtil/Tools/FrameMgr";
import { DragState, DragUiManager } from "../../Tools/DragUiManager";
import { CellPreinstall } from "./CellPreinstall";
import { ICellHandler } from "./ICellHandler";
import { DragCell } from "./DragCell";
import { InputManager } from "../../Tools/InputManager";

interface IDispose {
    dispose();
}

export type UiNode = {
    transform: m4m.framework.transform2D,
};

export type ScrollUiNode = UiNode & {
    scrollRect: m4m.framework.scrollRect,
};

export enum ChangeReply {
    /** 不进行变化 */
    None = 1,
    /** 回到顶部, 默认是这个 */
    GoTop = 2,
    /** 回到底部 */
    GoBottom = 3,
}

export enum ScrollType {
    /** 纵向滑动 */
    vertical = 1,
    /** 横向滑动 */
    horizontal = 2,
    /** 开启纵向和横向滑动 */
    horizontalAndVertical = 3,
}

export type GridConfig = {
    /** 列数 */
    columns: number,
    /** 行数 */
    rows?: number,
    /** x偏移 */
    offsetX?: number,
    /** y偏移 */
    offsetY?: number,
    /** 初始X点 默认0 */
    startX?: number,
    /** 初始Y点 默认0 */
    startY?: number,
    /** 是否显示Tips */
    showTip?: boolean,
    /** 双击 */
    doubleClick?: boolean,
    /** 滑动组件 */
    scroll?: ScrollUiNode;
    /** 重写对其方式, 仅在没有滑动组件时生效 */
    layout?: m4m.framework.layoutOption;
    /** Grid数据发生变化时的相应操作 */
    changeReply?: ChangeReply;
    /** 是否启用自动扩展 cell 数量, 默认为 true, 如果设置为 false, 则必须设置 rows */
    autoExtended?: boolean;
    /** 是否是动态宽高的 cell, 非必要时不要设置为 true */
    isDynamic?: boolean;
    /** 滑动组件滑动类型, 默认是 ScrollType.vertical */
    scrollType?: ScrollType;
    /** 是否是动态加载, 默认false */
    isDynamicLoading?: boolean;
    /** 绑定的滑块组件, 目前只支持纵向滚动, 如果有横向滚动需求, 后续再加; 设置该属性必须要设置 scroll */
    scrollSlider?: m4m.framework.button;
    /** 网格额外扩展高度 */
    extendHeight?: number;
    /** 两个网格间拖拽cell的处理函数 */
    dragCellHandler?: DragCell,

    [key: string]: any;
};

export class GridExtend<TUi extends UiNode, TData = any> implements IDispose {

    /** 获取gird显示状态 */
    public get visible() {
        return this._visible;
    }
    /** 设置grid显示状态 */
    public set visible(v: boolean) {
        this._visible = v;
        for (let cell of this._list) {
            if (cell.visibleFlag) {
                cell.nowClass.transform.visible = v;
            }
        }
    }
    /** 是否可以选中cell, 会直接影响 onSelect() 和 onUnSelect() 的调用 */
    public get canSelect() {
        return this._canSelect;
    }
    /** 是否可以选中cell, 会直接影响 onSelect() 和 onUnSelect() 的调用 */
    public set canSelect(v: boolean) {
        this._canSelect = v;
    }
    /** 选中的索引 */
    public get selectIndex() {
        return this._selectIndex;
    }
    /** 选中的索引 */
    public set selectIndex(v: number) {
        if (!this._canSelect || v == this._selectIndex) {
            return;
        }
        let c2 = this._list[v];
        //不能选中当前格子
        if (c2 && c2.cellHandler.canScelect && !c2.cellHandler.canScelect()) {
            return;
        }
        let currIndex = this._selectIndex;
        this._selectIndex = v;
        if (currIndex < this._list.length) {
            let c1 = this._list[currIndex];
            if (c1) {
                if (c1.cellHandler.onUnSelect) {
                    c1.cellHandler.onUnSelect();
                }
                if (this._config.dragCellHandler || this._connectDragCellHandler) {
                    DragUiManager.Instance.removeDragEvent(c1.btn);
                }
            }
        }
        if (c2) {
            if (c2.cellHandler.onSelect) {
                c2.cellHandler.onSelect();
            }
            
            if (this.selectBackFun) {
                this.selectBackFun(v);
            }
            if (this._config.dragCellHandler || this._connectDragCellHandler) {
                DragUiManager.Instance.addDragEvent(c2.btn, this.onDragCellFunc.bind(this));
            }
        }
    }
    //选中 回调
    public selectBackFun: Function;
    /** 当前数据长度 */
    public get length() {
        return this._dataList.length;
    }
    /** 获取网格cell的长度 */
    public get cellLength() {
        return this._list.length;
    }
    /** 获取 grid 组件宽度 */
    public get width() {
        return this._width;
    }
    /** 获取 grid 组件高度 */
    public get height() {
        return this._height;
    }

    /** 启用/禁用拖拽滑动 */
    public set enableScroll(value: boolean) {
        if (this._enableScroll == value) {
            return;
        }
        this._enableScroll = value;

        //做禁用/启用滑动
        if (value) {
            if (this._config.scrollType == ScrollType.horizontalAndVertical) {
                this._config.scroll.scrollRect.vertical = true;
                this._config.scroll.scrollRect.horizontal = true;
            } else if (this._config.scrollType == ScrollType.horizontal) {
                this._config.scroll.scrollRect.horizontal = true;
            } else {
                this._config.scroll.scrollRect.vertical = true;
            }
        } else {
            if (this._config.scrollType == ScrollType.horizontalAndVertical) {
                this._config.scroll.scrollRect.vertical = false;
                this._config.scroll.scrollRect.horizontal = false;
            } else if (this._config.scrollType == ScrollType.horizontal) {
                this._config.scroll.scrollRect.horizontal = false;
            } else {
                this._config.scroll.scrollRect.vertical = false;
            }
        }
    }

    public get enableScroll() {
        return this._enableScroll;
    }

    /** 获取配置 */
    public get config() {
        return this._config;
    }

    /** 数据刷新后的回调 */
    public onRefreshData: Function;

    /**
     * 创建 GridExtend 对象
     * @param node ui模板
     * @param handlerClass 处理的数据类, 必须实现 ICellHandler 接口
     * @param config grid 相关配置
     */
    public constructor(node: TUi, handlerClass: { new(): ICellHandler<TData> }, config: GridConfig = { columns: 1 }) {

        if (config.scrollType == null) {
            config.scrollType = ScrollType.vertical;
        }

        this._config = config;
        this.handlerClass = handlerClass;
        let cellTrans = node.transform;
        cellTrans.visible = false;
        let cellData = new CellData();
        let gridData = new GridData();
        //将百分比布局修改为非百分比布局
        let flag = false;
        if (cellTrans.layoutPercentState > 0) {
            // let v = cellTrans.getLayoutValue(m4m.framework.layoutOption.LEFT);
            // let v2 = cellTrans.getLayoutValue(m4m.framework.layoutOption.TOP);
            // console.log(v, v2);
            cellTrans.layoutState = cellTrans.layoutPercentState;
            cellTrans.layoutPercentState = 0;
            flag = true;

            throw new Error("GridExtend目前不支持百分比布局, 请改成非百分比布局!");
            // cellTrans.setLayoutValue(m4m.framework.layoutOption.LEFT, v);
            // cellTrans.setLayoutValue(m4m.framework.layoutOption.TOP, v2);
        }
        this.lox = 0;
        this.loy = 0;
        let temp = this.toLayout(cellTrans.layoutState);
        this.lox = temp[0];
        this.loy = temp[1];

        if (isNaN(this.lox)) {
            this.lox = m4m.framework.layoutOption.LEFT;
        }
        if (isNaN(this.loy)) {
            this.loy = m4m.framework.layoutOption.TOP;
        }

        if (config.scroll && (this.lox != m4m.framework.layoutOption.LEFT || this.loy != m4m.framework.layoutOption.TOP)) {
            console.warn("有滑动组件时, 那么 cell 最好为 lt 布局方式, 否则可能会有偏移! 当前 cell: " + node.constructor.name);
        }

        cellData.width = cellTrans.width;
        cellData.height = cellTrans.height;
        cellData.showTip = config.showTip;
        cellData.doubleClick = config.doubleClick;
        gridData.offsetX = config.offsetX ? config.offsetX : 0;
        gridData.offsetY = config.offsetY ? config.offsetY : 0;

        this.minWidth = cellData.width;
        this.minHeight = cellData.height;

        gridData.columns = config.columns;
        gridData.rows = config.rows;
        gridData.initXPlace = cellTrans.getLayoutValue(this.lox) + (config.startX ? config.startX : 0);
        gridData.initYPlace = cellTrans.getLayoutValue(this.loy) + (config.startY ? config.startY : 0);
        if (flag) {
            gridData.initXPlace = gridData.initXPlace / 100 * cellTrans.parent.width + (config.startX ? config.startX : 0);
            gridData.initYPlace = gridData.initYPlace / 100 * cellTrans.parent.height + (config.startY ? config.startY : 0);
        }
        gridData.cellName = CellPreinstall.name;
        gridData.cellData = cellData;
        gridData.cell = node;

        gridData.parentTrans = cellTrans.parent;
        if (config.scroll) { //有滑动组件, 就是用 lt 布局
            gridData.cellLayoutX = m4m.framework.layoutOption.LEFT;
            gridData.cellLayoutY = m4m.framework.layoutOption.TOP;
        } else if (config.layout) { //有重写布局
            let layout = this.toLayout(config.layout);
            gridData.cellLayoutX = layout[0];
            gridData.cellLayoutY = layout[1];
        } else {
            gridData.cellLayoutX = this.lox;
            gridData.cellLayoutY = this.loy;
        }
        this.girdData = gridData;

        if (config.scroll) {
            this.scrollRect = config.scroll.scrollRect;
            //有滑动区域 最小宽高设置为 滑动区域默认宽高
            this.minWidth = this.scrollRect.transform.width;
            this.minHeight = this.scrollRect.transform.height;

            let temp = this.scrollRect.transform;
            this.scrollExtend = temp.getComponent("ScrollRectExtend") as ScrollRectExtend;
            if (this.scrollExtend == null) {
                this.scrollExtend = temp.addComponent("ScrollRectExtend") as ScrollRectExtend;
            }

            this.scrollExtend.calcType = CalcType.byLayout;

            if (config.scrollType == ScrollType.horizontalAndVertical) {
                this.scrollRect.horizontal = true;
                this.scrollRect.vertical = true;
            } else if (config.scrollType == ScrollType.vertical) {
                this.scrollRect.horizontal = false;
                this.scrollRect.vertical = true;
            } else if (config.scrollType == ScrollType.horizontal) {
                this.scrollRect.horizontal = true;
                this.scrollRect.vertical = false;
            }

            this.scrollExtend.setList(this._list);
            let keys = Object.keys(config.scroll);
            for (let i = 0; i < keys.length; i++) {
                const element = keys[i];
                if (element.endsWith("content")) {
                    this.scrollContent = config.scroll[element];
                    this.scrollStartY = this.scrollContent.transform.localTranslate.y;
                    this.scrollHeight = this.scrollContent.transform.height;
                    break;
                }
            }

            if (config.scrollSlider) {
                this._dragBtnTrans = config.scrollSlider.transform;
                this._dragBtnParentTrans = this._dragBtnTrans.parent;
                let pos = this._dragBtnTrans.localTranslate;
                this.btnScrollStartX = pos.x;
                this.btnScrollStartY = pos.y;

                DragUiManager.Instance.addDragEvent(config.scrollSlider, this.dragScroll.bind(this));
                FrameMgr.Add(this.updateDragScrollFunc, this);
            }
        }

        if (this._config.dragCellHandler) {
            this._config.dragCellHandler.init(this);
        }
    }

    private _visible: boolean = true;
    private _config: GridConfig;
    private handlerClass: any;
    private scrollContent: UiNode;
    private scrollExtend: ScrollRectExtend;
    private scrollRect: m4m.framework.scrollRect;
    //-------------------------------
    private readonly _list: CellPreinstall<TUi>[] = [];
    private scrollStartY: number = 0;
    private scrollHeight: number = 0;
    private minWidth: number;
    private minHeight: number;
    private girdData: GridData;
    private _width: number = 0;
    private _height: number = 0;
    private _selectIndex: number = -1;
    private _canSelect: boolean = true;
    private _dataList: any[] = [];
    private _updateFlag: boolean = false;
    private disposeFlag = false;
    private lox: number;
    private loy: number;
    //private changedindexes: number[] = [];

    private updateDragScrollFunc: Function = this.updateDragScroll.bind(this);
    private _enableScroll: boolean = true;
    //------ 滑块相关
    private prevNum: number;
    private btnScrollStartX: number;
    private btnScrollStartY: number;
    private _dragTempY: number;
    private _dragStartY: number;
    private _dragging: boolean = false;
    private _dragBtnTrans: m4m.framework.transform2D;
    private _dragBtnParentTrans: m4m.framework.transform2D;

    //------ 拖拽cell相关
    private _connectDragCellHandler: DragCell;

    /**
     * 根据索引获取数据
     * @param index 索引
     */
    public getData(index: number): TData {
        return this._dataList[index];
    }

    /**
     * 根据索引获取cell对象
     * @param index 索引
     */
    public getCell<U extends ICellHandler<TData> = ICellHandler<TData>>(index: number): U {
        return this._list[index].cellHandler as U;
    }

    /**
     * 遍历所有的 Cell
     * @param cb 回调函数, 函数返回false则提前结束循环
     */
    public forEachCell<U extends ICellHandler<TData> = ICellHandler<TData>>(cb: (cell: U) => boolean | void): void {
        for (let cell of this._list) {
            if (cb(cell.cellHandler as U) == false) {
                return;
            }
        }
    }

    /**
     * 设置 grid 中的数据
     * @param list 数据列表
     * @param updateTrans 是否立即更新 cell 位置信息
     * @param flashbackCreation 是否倒叙创建 cell
     */
    public setDataList(list: TData[], updateTrans: boolean = true, flashbackCreation: boolean = false) {
        if (list == null) {
            return;
        }
        this._dataList.length = 0;
        this._dataList.push(...list);
        //取消选中
        this.selectIndex = -1;
        //自动扩展
        if (this._config.autoExtended != false) {
            while (this._dataList.length > this._list.length) {
                this._list.push(this.createCell(this._list.length));
            }
        } else {
            let maxLen = this._config.rows * this._config.columns;
            while (this._dataList.length > this._list.length && this._list.length < maxLen) {
                this._list.push(this.createCell(this._list.length));
            }
        }
        for (let i = 0; i < this._list.length; ++i) {
            let cell = this._list[i];
            if (i >= this._dataList.length) {
                cell.nowClass.transform.visible = false;
                cell.visibleFlag = false;
            } else {
                let data = this._dataList[i];
                cell.nowClass.transform.visible = true;
                cell.setData(data);
                cell.visibleFlag = cell.nowClass.transform.visible;
            }
        }
        if (updateTrans) {
            this.updateCellPos(flashbackCreation);
            this.updateTrans();
        }
    }

    /**
     * 向 grid 中添加一条新的数据
     * @param data 数据
     * @param updateTrans 是否立即更新 cell 位置信息
     */
    public add(data: TData, updateTrans: boolean = true) {
        this._dataList.push(data);
        let index = this._list.length;
        let cell = this.createCell(index);
        this._list.push(cell);

        cell.nowClass.transform.visible = true;
        cell.setData(data);
        cell.visibleFlag = cell.nowClass.transform.visible;

        if (!this._config.isDynamic) {
            let pos = this.getPosByIndex(index);
            this.setCellPos(cell, pos.x, pos.y);
            if (updateTrans) {
                this.updateWH();
            }
        } else if (updateTrans) {
            this.updateCellPos();
        }
        if (updateTrans) {
            this.updateTrans();
        }
    }

    /**
     * 插入多条数据
     * @param datas 数据列表
     * @param updateTrans 是否立即更新 cell 位置信息
     */
    public addList(datas: TData[], updateTrans: boolean = true) {
        for (let data of datas) {
            this._dataList.push(data);
            let index = this._list.length;
            let cell = this.createCell(index);
            this._list.push(cell);

            cell.nowClass.transform.visible = true;
            cell.setData(data);
            cell.visibleFlag = cell.nowClass.transform.visible;

            if (!this._config.isDynamic) {
                let pos = this.getPosByIndex(index);
                this.setCellPos(cell, pos.x, pos.y);
            }
        }

        if (!this._config.isDynamic) {
            if (updateTrans) {
                this.updateWH();
            }
        } else if (updateTrans) {
            this.updateCellPos();
        }
        if (updateTrans) {
            this.updateTrans();
        }
    }

    /**
     * 向 grid 指定位置处插入一条新的数据
     * @param index 索引
     * @param newData 插入的数据
     * @param updateTrans 是否立即更新 cell 位置信息
     */
    public addByIndex(index: number, newData: TData, updateTrans: boolean = true) {
        if (index >= this.length) {
            if (index == 0) {
                this.add(newData, updateTrans);
                return;
            }
            throw new Error(`索引: ${index} 超过列表最大索引!`);
        }
        //this.changedindexes.push(index);
        if (this._selectIndex >= index) {
            this._selectIndex += 1;
        }
        this._dataList.splice(index, 0, newData);
        this._list.push(this.createCell(this._list.length));
        for (let i = index; i < this._list.length; ++i) {
            let cell = this._list[i];
            let data = this._dataList[i];
            cell.nowClass.transform.visible = true;
            cell.setData(data);
            cell.visibleFlag = cell.nowClass.transform.visible;

            if (!this._config.isDynamic) {
                let pos = this.getPosByIndex(i);
                this.setCellPos(cell, pos.x, pos.y);
            }
        }

        if (!this._config.isDynamic) {
            if (updateTrans) {
                this.updateWH();
            }
        } else if (updateTrans) {
            this.updateCellPos();
        }
        if (updateTrans) {
            this.updateTrans();
        }
    }

    /**
     * 根据索引修改数据
     * @param index 索引
     * @param newData 修改后的数据
     * @param updateTrans 是否立即更新 cell 位置信息
     */
    public updateByIndex(index: number, newData: TData, updateTrans: boolean = true) {
        if (index >= this.length) {
            throw new Error(`索引: ${index} 超过列表最大索引!`);
        }
        this._dataList[index] = newData;
        let cell = this._list[index];
        cell.nowClass.transform.visible = true;
        cell.setData(newData);
        cell.visibleFlag = cell.nowClass.transform.visible;

        if (this._config.isDynamic && updateTrans) {
            this.updateCellPos();
            this.updateTrans();
        }
    }

    /**
     * 根据索引移除数据
     * @param index 索引
     * @param updateTrans 是否立即更新 cell 位置信息
     */
    public removeByIndex(index: number, updateTrans: boolean = true) {
        if (index >= this.length) {
            throw new Error(`索引: ${index} 超过列表最大索引!`);
        }
        //this.changedindexes.push(index);
        if (this.selectIndex > index) {
            this.selectIndex -= 1;
        } else if (this.selectIndex == index) {
            this.selectIndex = -1;
        }
        this._dataList.splice(index, 1);
        for (let i = index; i < this._list.length; ++i) {
            let cell = this._list[i];
            if (i >= this._dataList.length) {
                cell.nowClass.transform.visible = false;
                cell.visibleFlag = false;
            } else {
                let data = this._dataList[i];
                cell.nowClass.transform.visible = true;
                cell.setData(data);
                cell.visibleFlag = cell.nowClass.transform.visible;

                if (!this._config.isDynamic) {
                    let pos = this.getPosByIndex(i);
                    this.setCellPos(cell, pos.x, pos.y);
                }
            }
        }

        if (!this._config.isDynamic) {
            if (updateTrans) {
                this.updateWH();
            }
        } else if (updateTrans) {
            this.updateCellPos();
        }
        if (updateTrans) {
            this.updateTrans();
        }
    }

    /**
     * 移除所有数据
     * @param updateTrans 是否立即更新 cell 位置信息
     */
    public removeAll(updateTrans: boolean = true) {
        this.selectIndex = -1;
        this._dataList.length = 0;
        for (let cell of this._list) {
            cell.nowClass.transform.visible = false;
            cell.visibleFlag = false;
        }
        this._width = 0;
        this._height = 0;
        if (this._config.extendHeight != null) {
            this._height += this._config.extendHeight;
        }
        if (updateTrans) {
            this.updateTrans();
        }
    }

    // public RefreshAllCellIndex() {
    //     if (this.changedindexes.length == 0) {
    //         return;
    //     }
    //     let nums = this.changedindexes.sort((a, b) => {
    //         return a - b;
    //     });
    //     for (let i = 0; i < this._dataList.length; i++) {
    //         if (i >= nums[0]) {
    //             this._list[i].cellHandler.index = i;
    //             this._list[i].refreshIndexFun(i);
    //         }
    //     }
    //     this.changedindexes.length = 0;
    // }

    /**
     * 跳转到列表顶部
     */
    public goTop() {
        // console.error("goTop() 和 goBottom() 函数在unity端存在问题! 目前先禁止调用");
        this.scrollRect.content.transform.localTranslate = new m4m.math.vector2(0, 0);
        this.scrollRect.content.transform.markDirty();
        this.updateScrollTrans();
    }

    /**
     * 跳转到列表底部
     */
    public goBottom() {
        // console.error("goTop() 和 goBottom() 函数在unity端存在问题! 目前先禁止调用");
        if (this.scrollRect.vertical) { //开启水平滑动
            if (this._width < this.scrollExtend.transform.width) {
                this.goTop();
                return;
            }
        } else {
            if (this._height < this.scrollExtend.transform.height) {
                this.goTop();
                return;
            }
        }
        let ctrans = this.scrollRect.content.transform;
        let cpos = ctrans.localTranslate;
        ctrans.localTranslate = new m4m.math.vector2(cpos.x, -(ctrans.height - this.scrollRect.transform.height));

        this.scrollRect.content.transform.markDirty();
        this.updateScrollTrans();
    }

    /**
     * 设置滑动组件的偏移
     * @param x x轴偏移
     * @param y y轴偏移
     */
    public setScrollOffset(x: number, y: number) {
        let ctrans = this.scrollRect.content.transform;
        ctrans.localTranslate = new m4m.math.vector2(x, y);
        this.scrollRect.content.transform.markDirty();
        this.updateScrollTrans();
    }

    /**
     * 获取滑动组件偏移量
     */
    public getScrollOffset(): m4m.math.vector2 {
        return this.scrollRect.content.transform.localTranslate;
    }

    /**
     * 获取当前grid组件纵轴的滑动进度 (0 - 1) , 如果没有设置滑动组件, 则返回 0
     */
    public getVerticalSlidProgress(): number {
        if (!this._config.scroll) {
            return 0;
        }
        if (this.height < this.scrollHeight) {
            return 0;
        }
        let nowY = this.getScrollOffset().y;
        if (globalThis.window) {
            nowY = -nowY;
        }
        let num = (nowY - this.scrollStartY) / (this.height - this.scrollHeight);
        if (num < 0) {
            num = 0;
        } else if (num > 1) {
            num = 1;
        }
        return num;
    }

    /**
     * 设置当前grid组件纵轴的滑动进度(0 - 1)
     */
    public setVerticalSlidProgress(value: number) {
        if (!this._config.scroll) {
            return;
        }
        if (this.height < this.scrollHeight) {
            return;
        }
        if (value < 0) {
            value = 0;
        } else if (value > 1) {
            value = 1;
        }
        let offset = this.getScrollOffset();
        if (globalThis.window) {
            this.setScrollOffset(offset.x, -(this.height - this.scrollHeight) * value);
        } else {
            this.setScrollOffset(offset.x, this.scrollStartY + (this.height - this.scrollHeight) * value);
        }
    }

    /**
     * 动态修改配置
     */
    public upDateConfig(node: TUi, config: GridConfig) {
        let cellTrans = node.transform;

        this.girdData.offsetX = config.offsetX ? config.offsetX : 0;
        this.girdData.offsetY = config.offsetY ? config.offsetY : 0;

        this.girdData.columns = config.columns;
        this.girdData.rows = config.rows;
        this.girdData.initXPlace = cellTrans.getLayoutValue(this.lox) + config.startX ? config.startX : 0;
        this.girdData.initYPlace = cellTrans.getLayoutValue(this.loy) + config.startY ? config.startY : 0;
    }

    /**
     * 销毁 grid
     */
    public dispose() {
        if (this.disposeFlag) {
            return;
        }
        this.disposeFlag = true;

        if (this._config.dragCellHandler) {
            this._config.dragCellHandler.dispose();
        } else if (this._connectDragCellHandler) {
            this._connectDragCellHandler.masterGrid.disconnectDragGrid(this);
        }

        for (let i = 0; i < this._list.length; i++) {
            let cell: CellPreinstall<TUi> = this._list[i];
            if (cell.dispose) {
                cell.dispose();
            }
        }

        if (this._config.scrollSlider) {
            FrameMgr.Remove(this.updateDragScrollFunc, this);
            DragUiManager.Instance.removeDragEvent(this._config.scrollSlider);
        }

        this._list.length = 0;
        //this.changedindexes.length = 0;
        this._config = null;
    }

    /**
     * 连接到另一个网格, 用于网格间的cell拖拽, 使用该功能必须在当前网格的config中设置dragCellHandler,
     * enabelDrag: 被连接的网格是否开启cell拖拽
     */
    public connectDragGrid(other: GridExtend<any, any>, enabelDrag: boolean = true) {
        if (this._config.dragCellHandler == null) {
            throw new Error("未在config中设置 dragCellHandler! 不能连接grid!");
        }
        if (other._config.dragCellHandler != null) {
            throw new Error("当前grid已经设置了dragCellHandler来处理拖拽事件, 那么需要连接的grid就不能设置dragCellHandler了, 如果设置了就会导致处理冲突!");
        }
        if (other._connectDragCellHandler != null) {
            throw new Error("需要连接的grid已经有连接到其它网格了!");
        }
        if (enabelDrag) {
            other._connectDragCellHandler = this._config.dragCellHandler;
        }
        this._config.dragCellHandler.addConnectDragGrid(other);
    }

    /**
     * 取消连接到另一个网格
     */
    public disconnectDragGrid(other: GridExtend<any, any>) {
        if (this._config.dragCellHandler != null) {
            other._connectDragCellHandler = null;
            this._config.dragCellHandler.removeConnectDragGrid(other);
        }
    }

    private updateWH() {
        this._width = Math.min(this._dataList.length, this._config.columns) * (this.girdData.cellData.width + this.girdData.offsetX);
        this._height = Math.ceil(this._dataList.length / this._config.columns) * (this.girdData.cellData.height + this.girdData.offsetY);
        if (this._config.extendHeight != null) {
            this._height += this._config.extendHeight;
        }
    }

    /** 通知刷新数据列表 */
    private updateTrans() {
        if (this.scrollExtend) {
            this.scrollContent.transform.width = Math.max(this._width, this.minWidth);
            this.scrollContent.transform.height = Math.max(this._height, this.minHeight);
            this.scrollContent.transform.markDirty();

            if (this.onRefreshData) {
                this.onRefreshData();
            }

            // if (this.config.changeReply == ChangeReply.GoTop) {
            //     this.goTop();
            // } else if (this.config.changeReply == ChangeReply.GoBottom) {
            //     this.goBottom();
            // } else {
            //     this.updateScrollTrans();
            // }
        }
    }
    /** 获取layout属性 */

    private toLayout(num: number): [number, number] {
        let lay: [number, number] = [1, 2];
        let temp = this.getMask(num);

        let n1 = 2 ** temp[0];
        let n2 = 2 ** temp[1];

        switch (n1) {
            case m4m.framework.layoutOption.LEFT:
            case m4m.framework.layoutOption.H_CENTER:
            case m4m.framework.layoutOption.RIGHT:
                lay[0] = n1;
                lay[1] = n2;
                break;
            default:
                lay[0] = n2;
                lay[1] = n1;
        }

        return lay;
    }

    /** 获取掩码下标值组 */
    private getMask(maskNum: number): number[] {
        let index = 0;
        let list: number[] = [];
        let num = maskNum;
        while (num > 0) {
            // tslint:disable-next-line: no-unused-expression
            num & 1 && list.push(index);
            num >>= 1;
            index++;
        }
        return list;
    }

    //创建指定位置的cell
    private createCell(index: number): CellPreinstall<TUi> {
        let cellData: CellData = this.girdData.cellData.Clone();
        cellData.index = index;

        let cellClass: TUi = UiTools.cloneUi(this.girdData.cell);
        this.girdData.parentTrans.addChild(cellClass.transform);
        let cell = cellClass.transform.addComponent("CellPreinstall") as CellPreinstall<TUi>;
        cellClass.transform.layoutState = this.girdData.cellLayoutX | this.girdData.cellLayoutY;

        cell.cellData = cellData;
        cell.clickCallBackFun = (v) => {
            let cellTemp = this._list[v];
            if (cellTemp.cellHandler.onClick) {
                cellTemp.cellHandler.onClick();
            }
            this.selectIndex = v;
            if (cellTemp.transform) {
                cellTemp.visibleFlag = cellTemp.transform.visible;
            }
        };
        cell.setCellClass({ nowClass: cellClass, cellHandler: this.handlerClass, config: this._config });
        return cell;
    }

    private setCellPos(cell: CellPreinstall<TUi>, x: number, y: number) {
        let layoutOptX = this.girdData.cellLayoutX;
        let layoutOptY = this.girdData.cellLayoutY;
        let cellTrans = cell.nowClass.transform;
        if (layoutOptX != null || layoutOptY != null) {
            if (layoutOptX) {
                cellTrans.setLayoutValue(layoutOptX, x);
            }
            if (layoutOptY) {
                cellTrans.setLayoutValue(layoutOptY, y);
            }
        } else {
            //如果没有使用布局设置
            cellTrans.localTranslate = new m4m.math.vector2(x, y);
        }
        cellTrans.markDirty();
    }

    // tslint:disable-next-line: cyclomatic-complexity
    private updateCellPos(flashbackCreation: boolean = false) {
        let x: number = this.girdData.initXPlace;
        let y: number = this.girdData.initYPlace;
        let ox = this.girdData.offsetX;
        let oy = this.girdData.offsetY;
        let isDynamic = this._config.isDynamic;
        let X = 0;
        let Y = 0;
        this._width = 0;
        this._height = 0;
        if (flashbackCreation) {
            for (let i = this._dataList.length - 1; i >= 0; --i) {
                let cell = this._list[i];
                if (cell != null) {
                    let trans = cell.nowClass.transform;

                    let cellWidth = isDynamic ? trans.width : this.girdData.cellData.width;
                    let cellHeight = isDynamic ? trans.height : this.girdData.cellData.height;

                    let rowsNum = Math.floor(i / this.girdData.columns);
                    if (rowsNum != 0) {//不是第一行
                        Y = y + (cellHeight + oy) * rowsNum;
                    } else {
                        Y = y;
                    }
                    let columnsNum = i % this.girdData.columns;
                    X = x + (cellWidth + ox) * columnsNum;
                    //算宽高
                    if (i < this.girdData.columns) {
                        this._width += cellWidth + ox;
                    }
                    if (i % this.girdData.columns == 0) {
                        this._height += cellHeight + oy;
                    }
                    console.log("倒叙设置cell 位置 ：x" + X + "  y:" + Y);
                    this.setCellPos(cell, X, Y);
                    cell.onSetLastPosData();
                }
            }
        } else {
            for (let i = 0; i < this._dataList.length; ++i) {
                let cell = this._list[i];
                if (cell != null) {
                    let trans = cell.nowClass.transform;

                    let cellWidth = isDynamic ? trans.width : this.girdData.cellData.width;
                    let cellHeight = isDynamic ? trans.height : this.girdData.cellData.height;

                    //算宽高
                    if (i < this.girdData.columns) {
                        this._width += cellWidth + ox;
                    }
                    if (i % this.girdData.columns == 0) {
                        this._height += cellHeight + oy;
                    }
                    this.setCellPos(cell, x, y);
                    cell.onSetLastPosData();
                    //算下一个cell坐标
                    if ((i + 1) % this.girdData.columns == 0) {
                        x = this.girdData.initXPlace;
                        y += cellHeight + oy;
                    } else {
                        x += cellWidth + ox;
                    }
                }
            }
        }
        if (this._config.extendHeight != null) {
            this._height += this._config.extendHeight;
        }
    }

    private updateScrollTrans() {
        if (!this._updateFlag) {
            this._updateFlag = true;
            FrameMgr.nextFrameCall(() => FrameMgr.nextFrameCall(() => {
                if (this.disposeFlag) {
                    return;
                }
                this._updateFlag = false;
                this.scrollExtend.upDateTrans();
                if (this._config.changeReply == undefined) {
                    // let pos = this.scrollRect.content.transform.getWorldTranslate();
                    // if (this.scrollExtend["worldEndPos"]) {
                    //     if (this.scrollRect.vertical) {
                    //         if (this.scrollRect.content.transform.localTranslate.x < 0 && pos.x + this._width < this.scrollExtend["worldEndPos"].x) {
                    //             this.goTop();
                    //         }
                    //     } else {
                    //         if (this.scrollRect.content.transform.localTranslate.y < 0 && pos.y + this._height < this.scrollExtend["worldEndPos"].y) {
                    //             this.goTop();
                    //         }
                    //     }
                    // }
                }
            }));
        }
    }



    private getPosByIndex(index: number): m4m.math.Ivec2 {
        let xy = this.indexToXY(index);
        return {
            x: this.girdData.initXPlace + xy.x * (this.girdData.cellData.width + this.girdData.offsetX),
            y: this.girdData.initYPlace + xy.y * (this.girdData.cellData.height + this.girdData.offsetY),
        };
    }

    private indexToXY(index: number): m4m.math.Ivec2 {
        return {
            x: index % this._config.columns,
            y: Math.floor(index / this._config.columns),
        };
    }

    private updateDragScroll(delta: number) {
        if (this._dragging) {
            return;
        }
        let num = this.getVerticalSlidProgress();
        if (this.prevNum != num) {
            this.prevNum = num;
            if (globalThis.window) {
                this._dragBtnTrans.localTranslate = new m4m.math.vector2(
                    this.btnScrollStartX,
                    this.btnScrollStartY + (this._dragBtnParentTrans.height - this._dragBtnTrans.height * 2) * num
                );
            } else {
                this._dragBtnTrans.localTranslate = new m4m.math.vector2(
                    this.btnScrollStartX,
                    this.btnScrollStartY - (this._dragBtnParentTrans.height - this._dragBtnTrans.height * 2) * num
                );
            }

            this._dragBtnTrans.markDirty();
        }
    }

    private dragScroll(x: number, y: number, state: DragState) {
        if (state == DragState.DragStart) {
            this._dragging = true;
            this._dragStartY = y;

            this._dragTempY = this._dragBtnTrans.localTranslate.y;
        } else if (state == DragState.DragMove) {
            this._dragging = true;
            let offsetY = this._dragStartY - y;

            let parentHeight = this._dragBtnParentTrans.height;
            let height = this._dragBtnTrans.height;
            let vy: number = this._dragTempY - offsetY;

            let schedule: number = 0;
            if (globalThis.window) {
                if (vy < this.btnScrollStartY) {
                    vy = this.btnScrollStartY;
                } else if (vy > this.btnScrollStartY + (parentHeight - height * 2)) {
                    vy = this.btnScrollStartY + (parentHeight - height * 2);
                }
                schedule = (vy - this.btnScrollStartY) / (parentHeight - height * 2);
            } else {
                if (vy > this.btnScrollStartY) {
                    vy = this.btnScrollStartY;
                } else if (vy < this.btnScrollStartY - (parentHeight - height * 2)) {
                    vy = this.btnScrollStartY - (parentHeight - height * 2);
                }
                schedule = (this.btnScrollStartY - vy) / (parentHeight - height * 2);
            }
            this._dragBtnTrans.localTranslate = new m4m.math.vector2(
                this.btnScrollStartX,
                vy
            );
            this._dragBtnTrans.markDirty();
            this.setVerticalSlidProgress(schedule);
        } else {
            this._dragging = false;
        }
    }

    // -------------------------------------------------------------------------------------------------------
    private onDragCellFunc(x: number, y: number, state: DragState) {
        if (state == DragState.DragStart) {
            if (this._config.scroll) {
                if (this._config.scrollType == ScrollType.horizontalAndVertical) {
                    this._config.scroll.scrollRect.vertical = false;
                    this._config.scroll.scrollRect.horizontal = false;
                } else if (this._config.scrollType == ScrollType.horizontal) {
                    this._config.scroll.scrollRect.horizontal = false;
                } else {
                    this._config.scroll.scrollRect.vertical = false;
                }
            }

            if (this._connectDragCellHandler == null) {
                this._config.dragCellHandler.dragStart(
                    InputManager.lastPoint_x,
                    InputManager.lastPoint_y,
                    this, this._list[this.selectIndex].cellHandler
                );
            } else {
                this._connectDragCellHandler.dragStart(
                    InputManager.lastPoint_x,
                    InputManager.lastPoint_y,
                    this, this._list[this.selectIndex].cellHandler
                );
            }

        } else if (state == DragState.DragEnd) {
            if (this._config.scroll) {
                if (this._config.scrollType == ScrollType.horizontalAndVertical) {
                    this._config.scroll.scrollRect.vertical = true;
                    this._config.scroll.scrollRect.horizontal = true;
                } else if (this._config.scrollType == ScrollType.horizontal) {
                    this._config.scroll.scrollRect.horizontal = true;
                } else {
                    this._config.scroll.scrollRect.vertical = true;
                }
            }
            if (this._connectDragCellHandler == null) {
                this._config.dragCellHandler.dragEnd();
            } else {
                this._connectDragCellHandler.dragEnd();
            }

        } else {
            if (this._connectDragCellHandler == null) {
                this._config.dragCellHandler.dragMove(InputManager.lastPoint_x, InputManager.lastPoint_y);
            } else {
                this._connectDragCellHandler.dragMove(InputManager.lastPoint_x, InputManager.lastPoint_y);
            }
        }
    }
}