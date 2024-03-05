import './Window.css';
export interface IWindowData {
    /**
     * 窗口标题
     */
    title: string;
    /**
     * 窗体内容
     */
    body: JSX.Element;
    /**
     * 是否可以调整大小, 默认 true
     */
    resize?: boolean;
    /**
     * 是否显示关闭按钮, 默认 true
     */
    close?: boolean;
    /**
     * 当前窗口是否会阻挡其他地方的点击, 默认 false
     */
    keepOut?: boolean;
    /**
     * 是否显示, 默认 true
     */
    visible?: boolean;
    /**
     * 窗体的 x 轴
     */
    x?: number;
    /**
     * 窗体的 y 轴
     */
    y?: number;
    /**
     * 宽度
     */
    width?: number;
    /**
     * 高度
     */
    height?: number;
    /**
     * 最小宽度
     */
    minWidth?: number;
    /**
     * 最小高度
     */
    minHeight?: number;
    icon?: JSX.Element;
    /**
     * 关闭按钮点击时的回调, 如果函数返回 false, 则不会关闭窗口
     */
    onCloseBtnClick?: () => boolean | void;
    /**
     * 窗口上绑定的自定义数据
     */
    custom?: {
        [key: string]: any;
    };
}
export interface IWindowInstance extends IWindowData {
    /**
     * 实例 id
     */
    id: number;
}
export interface IWindowSlotInstance extends IWindowInstance {
    onTop(id: number): void;
    isTop(id: number): boolean;
}
/**
 * 通用窗体组件
 */
export declare function Window(data: IWindowSlotInstance): JSX.Element;
