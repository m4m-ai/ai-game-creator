import { IAttrComponent } from "../Attribute";
export interface ISelectAttrData extends IAttrComponent<string | number> {
    options: {
        value: string | number;
        label: string;
    }[];
}
export declare function SelectAttr(data: ISelectAttrData): JSX.Element;
