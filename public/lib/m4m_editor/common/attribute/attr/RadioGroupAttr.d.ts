import { IAttrComponent } from '../Attribute';
export declare type RadioGroupDataType = {
    value: boolean;
    options: {
        label: string;
        value: string | number;
    }[];
};
/**
 * 单选框按钮组
 */
export declare function RadioGroupAttr(data: IAttrComponent<RadioGroupDataType>): JSX.Element;
