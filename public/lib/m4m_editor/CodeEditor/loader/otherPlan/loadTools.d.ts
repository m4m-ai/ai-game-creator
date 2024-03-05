export declare class loadTools {
    static urlCaseDic: {
        [url: string]: number;
    };
    static retryTime: number;
    static retryCount: number;
    /**
     *
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     * @param loadedFun 正常加载完成后回调
     */
    static xhrLoad(url: string, fun: (ContentData: any, _err: Error, isloadFail?: boolean) => void, onprocess: (curLength: number, totalLength: number) => void, responseType: XMLHttpRequestResponseType, loadedFun: (req: XMLHttpRequest) => void): void;
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载text资源
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     * @version egret-gd3d 1.0
     */
    static loadJson(url: string, fun: (_txt: string, _err: Error, isloadFail?: boolean) => void, onprocess?: (curLength: number, totalLength: number) => void): void;
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载arraybuffer资源
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     */
    static loadArrayBuffer(url: string, fun: (_bin: ArrayBuffer, _err: Error, isloadFail?: boolean) => void, onprocess?: (curLength: number, totalLength: number) => void): void;
}
