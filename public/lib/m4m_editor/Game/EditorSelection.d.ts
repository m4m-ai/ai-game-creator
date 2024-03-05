/// <reference types="./src/m4m" />
import transform = m4m.framework.transform;
import IEditorCode = m4m.framework.IEditorCode;
import transform2D = m4m.framework.transform2D;
import { ValueType } from "./ValueType";
import I2DComponent = m4m.framework.I2DComponent;
import { ElementInputMap } from "./Input/ElementInputMap";
import { EditorAssetInfo } from "./Asset/EditorAssetInfo";
import INodeComponent = m4m.framework.INodeComponent;
/**
 * 编辑器选中对象管理类
 */
export declare class EditorSelection implements IEditorCode {
    /**
     * 当前选中的transform
     */
    get activeTransform(): transform | transform2D;
    private _activeTransform;
    /**
     * 选中的资源
     */
    get activeAsset(): EditorAssetInfo;
    private _activeAssetKey;
    /**
     * 当前选中的文件夹
     */
    get activeFolderPath(): string;
    /**
     * 当前选中的文件夹的描述数据
     */
    get activeFolderInfo(): EditorAssetInfo;
    private _activeFolderKey;
    private propertyListenerList;
    /**
     * 设置选中的物体
     */
    setActiveTrans(trans: transform | transform2D): void;
    isClosed(): boolean;
    onStart(app: m4m.framework.application): any;
    /**
     * 选中资源
     */
    setActiveAsset(assetData: EditorAssetInfo): void;
    /**
     * 拖拽资源操作, 返回高阶函数, 用于拖拽事件的回调
     */
    dragAsset(resData: EditorAssetInfo): ElementInputMap["TouchDrag"];
    /**
     * 拖拽 transfrom 操作, 返回高阶函数, 用于拖拽事件的回调
     */
    dragTrans(trans: transform | transform2D): ElementInputMap["TouchDrag"];
    onUpdate(delta: number): any;
    /**
     * 添加属性数据监听, 主要用于 Inspector 面板数据双向绑定, 返回的函数为设置被监听属性的函数, 如果需要设置该属性, 必须调用该函数
     * @param inst 被监听的实例对象
     * @param property 属性名称
     * @param type 数据类型
     * @param onChange 当数据改变时的回调函数
     */
    addPropertyListener<T extends (INodeComponent | transform | transform2D | I2DComponent), P extends keyof T>(inst: T, property: P, type: ValueType, onChange: (value: T[P]) => void): (v: T[P]) => void;
    getLayoutAttrData(inst: any, property: any): {};
    clearPropertyListener(): void;
}
