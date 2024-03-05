import { LightCodeData, LightCodePanel } from "./LightCodeData";
export declare type blockHandler = {
    data: LightCodePanel;
    setInAttriVal: Function;
};
export declare type LineType = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export declare type BserType = {
    id: number;
    path: string;
    stroke: string;
};
export declare class LightCodeMgr {
    static blockDatas: LightCodeData;
    static List: Map<number, blockHandler>;
    static line: LineType;
    static bserList: any[];
    static lineOpacity: number;
    static add(data: blockHandler): void;
    static removeAll(): void;
    static addBlock(data: LightCodePanel): void;
    static changeOpacity(data: number): void;
    static drawLine(data: LineType): void;
    static drawBser(): void;
}
