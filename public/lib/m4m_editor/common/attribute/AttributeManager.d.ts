import { SelectAttr } from "./attr/SelectAttr";
import { CheckboxAttr } from "./attr/CheckboxAttr";
import { Vector2Attr } from "./attr/Vector2Attr";
import { Vector3Attr } from "./attr/Vector3Attr";
import { RectAttr } from "./attr/RectAttr";
import { NumberInputAttr } from "./attr/NumberInputAttr";
import { SliderAttr } from "./attr/SliderAttr";
import { StringInputAttr } from "./attr/StringInputAttr";
import { SelectListAttr } from "./attr/SelectListAttr";
import { LayoutSetAttr } from "./attr/LayoutSetAttr";
import { AssetSelectionAttr } from "./attr/AssetSelectionAttr";
import { ColorSelectionAttr } from "./attr/ColorSelectionAttr";
import { RadioGroupAttr } from "./attr/RadioGroupAttr";
import { IAttrComponent, IAttributeData } from "./Attribute";
export declare const AttributeMap: {
    select: typeof SelectAttr;
    checkbox: typeof CheckboxAttr;
    vector2: typeof Vector2Attr;
    vector3: typeof Vector3Attr;
    rect: typeof RectAttr;
    number: typeof NumberInputAttr;
    slider: typeof SliderAttr;
    string: typeof StringInputAttr;
    selectList: typeof SelectListAttr;
    layoutSet: typeof LayoutSetAttr;
    asset: typeof AssetSelectionAttr;
    color: typeof ColorSelectionAttr;
    radioGroup: typeof RadioGroupAttr;
};
/**
 * 通用属性管理器
 */
export declare class AttributeManager {
    private static _map;
    /**
     * 初始化所有属性数据
     */
    static init(): void;
    /**
     * 注册属性
     * @param typeName 类型名称
     * @param func 属性对应的 react 组件
     */
    static registerAttribute(typeName: string, func: (data: any) => JSX.Element): void;
    /**
     * 根据类型和传入的数据实例化属性组件
     */
    static getAttribute(typeName: string, data: IAttrComponent<any>): JSX.Element;
    /**
     * 根据组件描述数据实例化属性列表
     */
    static getAttributeList(attrs: IAttributeData[]): JSX.Element;
}
