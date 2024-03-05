import { cMap } from "../../code/Map";
import { LoadType } from "./LoaderManage";
export declare class Loader {
    id: number;
    endFunction: Function;
    loaderEvents: CallBackData[];
    url: string;
    priority: number;
    timeoutCount: number;
    timeout: number;
    userCount: number;
    progress: number;
    bytesLoaded: number;
    bytesTotal: number;
    timer: cMap<number>;
    fileCount: number;
    fileLoadedCount: number;
    loaderType: LoadType;
    bin: any;
    constructor();
    private _progressCallBack;
    private removeList;
    load(): any;
    dispose(): void;
    addProgressCallBack(value: Function): void;
    addCallBack(callBack: Function, obj: any): void;
    removeCallBack(callBack: Function): void;
}
declare class CallBackData {
    callback: Function;
    data: any;
    dispose(): void;
}
export {};
