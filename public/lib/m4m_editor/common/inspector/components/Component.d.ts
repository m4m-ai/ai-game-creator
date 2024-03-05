/// <reference types="./src/m4m" />
import INodeComponent = m4m.framework.INodeComponent;
import I2DComponent = m4m.framework.I2DComponent;
import transform = m4m.framework.transform;
import transform2D = m4m.framework.transform2D;
import { IAttributeData } from "../../attribute/Attribute";
export interface IComponentData {
    ticon: JSX.Element;
    title: string;
    component: INodeComponent | I2DComponent | transform | transform2D;
    /** 传null表示不显示checkbox */
    enable: boolean | null;
    attrs: IAttributeData[];
}
/**
 * GameObject绑定的组件
 * @constructor
 */
export declare function Component(data: IComponentData): JSX.Element;
