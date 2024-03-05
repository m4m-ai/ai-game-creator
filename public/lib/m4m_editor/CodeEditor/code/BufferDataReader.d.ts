import { binTool } from "./binBuffer";
export declare class BufferDataReader {
    static get Instance(): BufferDataReader;
    private static _instance;
    readArrayBuffer(className: string, br: binTool): any;
}
