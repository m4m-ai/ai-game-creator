import { cMap } from "../code/Map";
import { Loader } from "./Loader";
export declare enum ResLoadType {
    NONE = 0,
    SCENE = 1
}
export declare enum LoadType {
    ARRAYBUFFER = 0,
    JSON = 1,
    IMAGE = 2,
    Text = 3
}
export declare class LoaderManager {
    static get Instance(): LoaderManager;
    /** 项目资源 根路径 URL */
    static get CDNURL(): string;
    static loaderCount: number;
    loaders: cMap<Loader>;
    currentLoaders: Loader[];
    waitLoaders: Loader[];
    constructor();
    private static instance;
    private static _CDNURL;
    private index;
    private loadFailBackList;
    init(CDNURL: string): void;
    load(url: string, onLoadFinished: Function, loadType?: LoadType, priority?: number): Loader;
    startLoader(): void;
    loaderEnd(loader: Loader): void;
    addLoader(loader: Loader): void;
    removeLoader(url: string): void;
    addFail(loader: Loader): void;
    private getNextLoader;
    private failBackFun;
}
