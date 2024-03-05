import { binTool } from "./binBuffer";
export declare class NetData {
    /**
     * json字符串
     */
    code: string;
    arrayBuffer: any;
    /**
     * 头部字符串
     */
    head: string;
    isBuffer: boolean;
    constructor(str: any);
    private static reg;
    private obj;
    /**
     * 获取json对象
     */
    GetJson(): any;
    private getParams;
    private getDataClassByTypeId;
    private getDataByBuffer;
    static readString(bytes: binTool): string;
}
