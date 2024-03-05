import "./Attribute.css";
import React from "react";
import { AttributeMap } from "./AttributeManager";
import { IComponentFieldInfo } from "../../Game/Component/EditorComponentMgr";
/**
 * 属性数据接口
 */
export interface IAttributeData<T extends IAttrComponent<any> = any> {
    /** 显示文本 */
    title: string;
    /** 类型 */
    type: keyof (typeof AttributeMap);
    /** 字段描述 */
    describe?: string;
    /** 右侧组件宽度, 默认 70% */
    rightWidth?: string;
    /** 传入attr组件的数据 */
    attr: T;
    /** 如果是数组， 则传入的数据 */
    arrayData?: any[];
    /** 是否是数组 */
    isArray?: boolean;
    /** 压入默认模板, 有数组才有 */
    defaultTemplate?: object;
}
/**
 * 属性组件数据接口
 */
export interface IAttrComponent<T> {
    /** 属性值 */
    attrValue: T;
    /** 导出属性配置信息 */
    fieldInfo: IComponentFieldInfo;
    /** 是否禁用, 默认 false */
    disable?: boolean;
    /** 设置刷新函数 */
    setRefresh: (refresh: React.Dispatch<React.SetStateAction<T>>) => void;
    /** 值改变时调用, 子类提供回调数据 */
    onChange: (data: T) => void;
}
/**
 * 组件属性
 * @param data
 */
export declare function Attribute(data: IAttributeData): JSX.Element;
