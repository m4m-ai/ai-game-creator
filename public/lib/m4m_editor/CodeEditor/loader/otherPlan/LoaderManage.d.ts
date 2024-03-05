import { cMap } from "../../code/Map";
import { Loader } from "./Loader";
export declare enum ResLoadType {
    NONE = 0,
    SCENE = 1
}
export declare enum LoadType {
    ARRAYBUFFER = 0,
    JSON = 1,
    IMAGE = 2
}
export declare class LoaderManage {
    static get Instance(): LoaderManage;
    static loaderCount: number;
    loaders: cMap<Loader>;
    currentLoaders: Loader[];
    waitLoaders: Loader[];
    constructor();
    private static instance;
    private index;
    private loadFailBackList;
    load(url: string, onLoadFinished: Function, data?: any, loadType?: LoadType): Loader;
    startLoader(): void;
    loaderEnd(loader: Loader): void;
    addLoader(loader: Loader): void;
    removeLoader(url: string): void;
    addFail(loader: Loader): void;
    private getNextLoader;
    private failBackFun;
}
