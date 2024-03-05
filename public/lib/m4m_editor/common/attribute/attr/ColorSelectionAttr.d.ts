/// <reference types="./src/m4m" />
import { IAttrComponent } from "../Attribute";
import color = m4m.math.color;
export interface IColorSelectionAttrData extends IAttrComponent<color> {
}
export declare function ColorSelectionAttr(data: IColorSelectionAttrData): JSX.Element;
