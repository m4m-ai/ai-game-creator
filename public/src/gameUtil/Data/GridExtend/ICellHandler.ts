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
import { GridConfig, UiNode } from "./GridExtend";

/**
 * Cell逻辑处理接口
 * 泛型：TData：存储的数据类型
 */
export interface ICellHandler<TData = any> {
    /**
     * 当前 cell 的克隆出来的 ui 组件
     */
    nowClass: UiNode;
    /**
     * 当前 cell 在整个网格组件的索引位置
     */
    index: number;
    /**
     * 当前grid的配置
     */
    config: GridConfig;
    /**
     * 当前cell存储的数据
     */
    cellData: TData;
    /**
     * 初始化 cell 调用, 只会调用一次, 一般用于初始化 nowClass 样式
     */
    onInit(): void;
    /**
     * 当前往网格组件中设置值的时候调用
     */
    onSetData(value: TData): void;
    /**
     * 在onSetData方法设置完位置会进入这里
     */
    onSetLastPosData?(): void;
    /**
     * 当点击到当前 cell 时调用
     */
    onClick?(): void;
    /**
     * 双击
     */
    onDoubleClick?(): void;
    /**
     * 当按下cell的时候调用
     */
    onPointDown?(): void;
    /**
     * 当按下鼠标移入调用
     */
    onPointEnter?(): void;
    /**
     * 当按下鼠标移出调用
     */
    onPointExit?(): void;
    /**
     * 当index更新之后调用，若index发生改变才调用
     */
    onRefreshIndex?(index: number): void;
    /**
     * 返回是否能选择当前格子
     */
    canScelect?(): boolean;
    /**
     * 当选中到当前 cell 时调用
     */
    onSelect?(): void;
    /**
     * 当前取消选中当前 cell 时调用
     */
    onUnSelect?(): void;
    /**
     * 当前 cell 销毁时调用
     */
    onDispose?(): void;
}