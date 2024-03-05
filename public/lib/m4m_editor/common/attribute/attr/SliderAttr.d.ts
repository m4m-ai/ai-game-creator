import { IAttrComponent } from "../Attribute";
export interface ISliderAttrData extends IAttrComponent<number> {
    min: number;
    max: number;
    step?: number;
}
/**
 * 滑块
 */
export declare function SliderAttr(data: ISliderAttrData): JSX.Element;
