/**
@license
Copyright (c) 2022 meta4d.me Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
import { LoadType, LoaderManage } from "./LoaderManage";
import { cMap } from "src/gameUtil/Data/Map";
import { loadTools } from "./loadTools";

export class Loader {
    public id: number;

    public loaderEvents: CallBackData[];
    /// <summary>
    /// 加载路径
    /// </summary>
    public url: string;

    /// <summary>
    /// 优先级,数值越高越优先
    /// </summary>
    public priority: number = 0;

    /// <summary>
    /// 加载失败的重试次数
    /// </summary>
    /// <returns></returns>
    public timeoutCount: number = 3;

    /// <summary>
    /// 加载失败的重试次数
    /// </summary>
    /// <returns></returns>
    public timeout: number = 3;
    /// <summary>
    /// 资源的引用次数
    /// </summary>
    public userCount: number = 0;

    /// <summary>
    /// 加载进度
    /// </summary>
    /// <returns></returns>
    public progress: number = 0;

    ///已经加载的字节大小
    public bytesLoaded: number = 0;
    //总需求加载大小
    public bytesTotal: number = 0;
    public timer: cMap<number> = new cMap<number>();
    //总需要加载的文件数量
    public fileCount: number = 0;
    //当前已经加载文件数量
    public fileLoadedCount: number = 0;
    public loaderType = LoadType.ARRAYBUFFER;
    public bin: any;

    //加载结束 不管成功失败都回调
    public loadEndFunction: Function;
    public constructor() {
        this.loaderEvents = new Array<CallBackData>();
    }

    public load() {
        if (this.bin) {
            this.completeCallBack();
            return;
        }
        // this.timer.set(this.url, Date.now());
        // console.error(this.loaderType+" 加载资源 "+this.url);
        try {
            switch (this.loaderType) {
                case LoadType.ARRAYBUFFER:
                    // return new Promise((resolve: ((a: ArrayBuffer) => void)) => {
                        // console.error("ARRAYBUFFER 开始加载       " + this.url + "         " + (this.timer.get(this.url) - Date.now()) + "     ");
                        loadTools.loadArrayBuffer(LoaderManage.CDNURL + this.url, (bin, urlStr, isLoadFail) => {
                            if (isLoadFail) {
                                // console.error("ARRAYBUFFER 加载失败 ");
                                LoaderManage.Instance.addFail(this);
                                // LoaderManage.Instance.addFail(this);
                                // console.error("11111111111111111111111111111111");
                                // resolve(null);
                            } else {
                                // tslint:disable-next-line: max-line-length
                                // console.error("ARRAYBUFFER 加载成功       " + this.url + "         " + (this.timer.get(this.url) - Date.now()) + "     ");
                                if (bin) {
                                    bin["_url_"] = this.url;
                                    this.bin = bin;
                                    this.completeCallBack();
                                    // if (BeginnerGuidManger.needGuid) {
                                    //     jsManager.noviceGuideFun(url, 1)
                                    // }
                                }
                                // resolve(bin);
                            }
                            if (this.loadEndFunction) { this.loadEndFunction(this); }
                        });
                    // });
                    return;
                case LoadType.IMAGE:
                    // return new Promise((resolve: ((a: HTMLImageElement) => void)) => {
                    //     // console.error("IMAGE 开始加载       ");
                    //     // if (miniGame.miniType == miniAPIType.wechat) {
                    //     loadTools.loadImg(this.url, (bin, isLoadFail) => {
                    //         // console.error("IMAGE 加载失败 ");
                    //         if (isLoadFail) {
                    //             LoaderManage.Instance.addFail(this);
                    //             resolve(null);
                    //         } else {
                    //             // console.error("IMAGE 加载成功 ");
                    //             if (bin) {
                    //                 bin["_url_"] = this.url;
                    //                 this.bin = bin;
                    //                 this.completeCallBack();
                    //                 // if (BeginnerGuidManger.needGuid) {
                    //                 //     jsManager.noviceGuideFun(url, 1)
                    //                 // }
                    //             }
                    //             resolve(bin);
                    //         }
                    //         if (this.loadEndFunction) { this.loadEndFunction(this); }
                    //     });
                    // });
                    m4m.io.loadImg(this.url, (bin, isLoadFail) => {
                        // console.error("IMAGE 加载失败 ");
                        if (isLoadFail) {
                            LoaderManage.Instance.addFail(this);
                        } else {
                            // console.error("IMAGE 加载成功 ");
                            if (bin) {
                                bin["_url_"] = this.url;
                                this.bin = bin;
                                this.completeCallBack();
                            }
                        }
                        if (this.loadEndFunction) { this.loadEndFunction(this); }
                    });
                    return;
                case LoadType.JSON:
                    return new Promise((resolve: ((a: string) => void)) => {
                        // console.error("JSON 开始加载       " + this.url + "         " + (this.timer.get(this.url) - Date.now()) + "     ");
                        loadTools.loadJson(this.url, (bin, urlStr, isLoadFail: boolean) => {
                            if (isLoadFail) {
                                // console.error("JSON 加载失败 ");
                                LoaderManage.Instance.addFail(this);
                                resolve(null);
                            } else {
                                // console.error("JSON 加载成功       " + this.url + "         " + (this.timer.get(this.url) - Date.now()) + "     ");
                                if (bin) {
                                    bin["_url_"] = this.url;
                                    this.bin = bin;
                                    this.completeCallBack();
                                }
                                resolve(bin);
                            }
                            if (this.loadEndFunction) { this.loadEndFunction(this); }
                        });
                    });
                case LoadType.assetMgr:
                    //downLoadFinish  回调  下载完成就触发
                    if (m4m.framework.sceneMgr.app) {
                        // console.error("LoadType.assetMgr 开始加载       ");
                        let assetmgr = m4m.framework.sceneMgr.app.getAssetMgr();
                        assetmgr.load(this.url, m4m.framework.AssetTypeEnum.Auto, this.onloading.bind(this), this.downLoadFinish.bind(this));
                    }
                    return;
                default:
            }

        } catch (er) {
            console.error(this.url + " 报错 " + er);
        }
    }

    public dispose() {
        for (let i = 0; i < this.loaderEvents.length; i++) {
            let data: CallBackData = this.loaderEvents[i];
            data.dispose();
            data = null;
        }
        this.loaderEvents.length = 0;
        this.loaderEvents = null;
        this.timer.clear();
        this.timer = null;
        this.bin = null;
        this.loadEndFunction = null;
    }
    public addCallBack(callBack: Function) {
        let cb: CallBackData = new CallBackData();
        cb.callback = callBack;
        this.loaderEvents.push(cb);
    }

    private downLoadFinish() {
        //下载完成回调
    }

    private onloading(sta: m4m.framework.stateLoad) {
        if (this.bin) { return; }    //已近完成不再回调
        if (sta.iserror) {
            let errStr = `err by loader.onloading()\n URL:${this.url} \n`;
            sta.errs.forEach((error) => {
                errStr += `\n ${error.stack}`;
            });
            console.error(`onloading 下载资源错误！  ${errStr}`);
        }

        if (sta.isloadFail || sta.iserror) {
            if (this.loadEndFunction) { this.loadEndFunction(this); }
            //加载失败
            LoaderManage.Instance.addFail(this);
            return;
        }

        this.fileCount = sta.totaltask;
        this.fileLoadedCount = sta.curtask;
        this.progress = sta.progress;
        // this.resSize = sta.totalByteLength;
        // this.loadedSize = sta.curByteLength;
        // if (this.onProgress) {
        //     this.onProgress(this.progress, this.fileCount, this.loadedSize);
        // }

        if (sta.isfinish) {
            //拿这个来判断 所以给一个数据先  后续修改
            // console.error("LoadType.assetMgr 加载成功      ");
            if (this.loadEndFunction) { this.loadEndFunction(this); }
            this.bin = {};
            this.completeCallBack();
        }
    }

    //完成时回调
    private completeCallBack(): void {
        for (let i = 0; i < this.loaderEvents.length; i++) {
            let cbd: CallBackData = this.loaderEvents[i];
            if (cbd.callback != null) {
                cbd.callback(this, this.bin);
            }
            cbd.dispose();
            cbd = null;
        }
        this.loaderEvents.length = 0;
    }
}

class CallBackData {
    public callback: Function;
    public dispose() {
        this.callback = null;
    }
}