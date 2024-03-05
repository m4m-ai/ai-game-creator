/// <reference types="./src/m4m" />
import { ComponentFieldEnum } from "./ComponentFieldEnum";
import transform2D = m4m.framework.transform2D;
import transform = m4m.framework.transform;
import INodeComponent = m4m.framework.INodeComponent;
import I2DComponent = m4m.framework.I2DComponent;
import { ComponentFieldHandler } from "./ComponentFieldHandler";
export interface IComponentInfo {
    title: string;
    name: string;
    type: "2D" | "3D";
    assembly: string;
    classInfo: {
        new (): INodeComponent | I2DComponent;
    };
    /** 包含的字段 */
    fields: IComponentFieldInfo[];
}
export interface IComponentFieldInfo {
    /** 字段名称 */
    name: string;
    /** 字段在编辑器中显示的名称 */
    title: string;
    /** 组件类型 */
    type: ComponentFieldEnum;
    /** 默认值 */
    defaultValue: any;
    /** 是否是引用类型 */
    isRef: boolean;
    /** 是否是数组 */
    isArray: boolean;
}
/**
 * 编辑器中的组件管理对象
 */
export declare class EditorComponentMgr {
    private static readonly _component2d;
    private static readonly _component3d;
    private static readonly _componentFiled;
    /**
     * 获取所有2D组件
     * @constructor
     */
    static getAll2DComponents(): IComponentInfo[];
    /**
     * 获取所有3D组件
     * @constructor
     */
    static getAll3DComponents(): IComponentInfo[];
    /**
     * 获取 组件 数据
     * @param name 组件名称
     */
    static getComponentInfo(name: string): IComponentInfo;
    /**
     * 往 trans2D 上挂载2D组件, 并初始化默认值
     * @param trans trans对象
     * @param componentName 组件名称
     */
    static mountComponent2D(trans: transform2D, componentName: string): I2DComponent;
    /**
     * 往 trans 上挂载组件, 并初始化默认值
     * @param trans trans对象
     * @param componentName 组件名称
     */
    static mountComponent3D(trans: transform, componentName: string): INodeComponent;
    /**
     * 初始化默认组件, 该函数必须在加载用户脚本之前调用
     */
    static initComponent(): void;
    /**
     * 卸载组件
     */
    static uninstallComponents(assembly: string): void;
    /**
     * 刷新组件数据
     */
    static refreshComponents(assembly: string): void;
    /**
     * 注册字段类型
     */
    static registerComponentField(fieldType: string, handler: ComponentFieldHandler<any>): void;
    /**
     *
     */
    static getComponentField(): void;
    /**
     * 设置组件值
     */
    private static componentSetValue;
    /**
     * 获取所有字段描述
     */
    private static getFields;
    private static mappingType;
}
