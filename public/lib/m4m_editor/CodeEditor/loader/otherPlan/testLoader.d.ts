import { Loader } from "./Loader";
declare enum LoadType {
    ARRAYBUFFER = 0,
    JSON = 1,
    IMAGE = 2
}
export declare class testLoader {
    fileCount: number;
    fileLoadedCount: number;
    sucessProgress: number;
    progress: number;
    private list;
    private loadedFile;
    private loadCallBack;
    private progressCallback;
    add(url: string, callback: Function, type?: LoadType): void;
    loaderEnd(loader: Loader, file: any): void;
    start(callback?: Function): void;
    LoadProgress(progress: number, fileLoadedCount: number, fileCount: number, bytesLoaded: number, bytesTotal: number): void;
}
export {};
