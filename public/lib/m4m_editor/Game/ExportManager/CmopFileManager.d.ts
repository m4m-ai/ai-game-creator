import { cMap } from "../../CodeEditor/code/Map";
export declare class CmopFileManager {
    static get Instance(): CmopFileManager;
    private static _instance;
    private compMap;
    getACompByKey(key: string): any;
    setACompByKey(key: string, comp: any): cMap<any>;
}
