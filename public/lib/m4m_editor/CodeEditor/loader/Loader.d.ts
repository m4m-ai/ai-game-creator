import { LoadType } from "./LoaderManager";
export declare class Loader {
    id: number;
    loaderEvents: CallBackData[];
    url: string;
    priority: number;
    timeoutCount: number;
    timeout: number;
    userCount: number;
    progress: number;
    bytesLoaded: number;
    bytesTotal: number;
    fileCount: number;
    fileLoadedCount: number;
    loaderType: LoadType;
    bin: any;
    loadEndFunction: Function;
    constructor();
    load(): void;
    dispose(): void;
    addCallBack(callBack: Function): void;
    private downLoadFinish;
    private loadFail;
    private completeCallBack;
}
declare class CallBackData {
    callback: Function;
    dispose(): void;
}
export {};
