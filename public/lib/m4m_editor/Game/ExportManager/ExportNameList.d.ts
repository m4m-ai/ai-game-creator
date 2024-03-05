import { cMap } from "../../CodeEditor/code/Map";
export declare class ExportNameList {
    static get Instance(): ExportNameList;
    /**********是否需要请求 配置数据***********
    */
    private static _instance;
    private isInit;
    exportList: cMap<cMap<number>>;
    isExport(compName: string, proName: string): number;
    init(): void;
}
