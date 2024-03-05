import { CSSProperties } from "react";
export interface INumberInputData {
    value: number;
    setValue: (value: number) => void;
    onChange: (valeu: number) => void;
    isshow?: string;
    disable?: boolean;
    max?: number;
    min?: number;
    step?: number;
    style?: CSSProperties;
}
/**
 * 数字输入框
 * @param data
 */
export declare function NumberInput(data: INumberInputData): JSX.Element;
