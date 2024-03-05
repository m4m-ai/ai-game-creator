import { IAttrComponent } from "../Attribute";
export interface ISelectListAttrData extends IAttrComponent<string | number> {
    options: {
        value: string | number;
        label: string;
    }[];
    onClick: () => void;
    onSetData: (val: any) => void;
}
/**
 * 选择列表属性
 */
export declare function SelectListAttr(data: ISelectListAttrData): JSX.Element;
