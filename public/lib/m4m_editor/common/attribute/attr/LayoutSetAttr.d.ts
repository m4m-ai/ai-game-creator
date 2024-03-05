import { IAttrComponent } from "../Attribute";
export declare type LayoutSetData = {
    checked: boolean;
    value: number;
    isshow: string;
}[];
export interface ILayoutSetAttrData extends IAttrComponent<LayoutSetData> {
}
/**
 * 布局框属性
 */
export declare function LayoutSetAttr(data: ILayoutSetAttrData): JSX.Element;
