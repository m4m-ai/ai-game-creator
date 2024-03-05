import { IAttrComponent } from "../Attribute";
export declare type NumberInputDataType = {
    value: number;
    max?: number;
    min?: number;
    step?: number;
};
/**
 * 数字输入框属性
 */
export declare function NumberInputAttr(data: IAttrComponent<NumberInputDataType>): JSX.Element;
