export declare class WsDataManager {
    static setData(className: any, data: any, addType?: string): void;
    static changeDataList(className: string, data: any, addType?: string): void;
    static changeData(className: string, proName: string, paramType: string, data: any, addType?: string): void;
    static dispatchTipData(className: string, data: any): void;
}
