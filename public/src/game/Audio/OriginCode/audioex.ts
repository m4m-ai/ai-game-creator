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
import { cMap } from "Data/Map";
import { Loader } from "Loader/loader";
import { LoaderManage, LoadType } from "Loader/LoaderManage";
import { CAudioChannel } from "./CAudioChannel";

export class CAudioEx {
    public static instance(): CAudioEx {
        if (CAudioEx.g_this == null) {
            CAudioEx.g_this = new CAudioEx();
        }

        return CAudioEx.g_this;
    }

    private static loadArrayBuffer(url: string, fun: (_bin: ArrayBuffer, _err: Error) => void, failCount: number = 0): void {
        // try {
        //     let req = new XMLHttpRequest();//ness
        //     req.open("GET", url);
        //     req.responseType = "arraybuffer";//ie 一定要在open之后修改responseType
        //     req.onreadystatechange = () => {
        //         if (req.readyState == 4) {
        //             switch (req.status) {
        //                 case 200:
        //                 case 304:
        //                 case 404:
        //                     break;
        //                 default:
        //                     {
        //                         if (failCount < 20) {
        //                             setTimeout(() => {
        //                                 // tslint:disable-next-line: no-parameter-reassignment
        //                                 CAudioEx.loadArrayBuffer(url, fun, ++failCount);
        //                             }, 500);
        //                         } else {
        //                             console.error(`${url} 多次尝试下载失败 ,请检查资源是否损坏.`);
        //                         }
        //                     }
        //                     return;
        //             }
        //             if (req.status == 404) {
        //                 fun(null, new Error("onerr 404"));
        //             } else {
        //                 fun(req.response, null);
        //             }
        //         }
        //     };
        //     req.onerror = () => {
        //         fun(null, new Error("onerr in req:"));//ness
        //     };
        //     req.send();
        // } catch (er) {
        //     console.error(url + "     Error   " + er);
        // }
    }

    public audioContext: AudioContext;
    // tslint:disable-next-line: variable-name
    private static g_this: CAudioEx;
    private constructor() {
        try {
            let _AudioContext = window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"] || window["msAudioContext"];
            this.audioContext = new _AudioContext();
            console.log("audio Context inited");
        } catch (e) {
            // throw new Error("!Your browser does not support AudioContext");
            console.error("!Your browser does not support AudioContext");
        }
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 初始化声音api，注意：在ios上面必须手动点击某个按钮来调用初始化，否则无法播放声音
     */
    public clickInit() {
        if (!this.isAvailable()) {
            return;
        }
        // create empty buffer
        if (this.audioContext != null) {
            let buffer = this.audioContext.createBuffer(1, 1, 22050);
            let source = this.audioContext.createBufferSource();
            source.buffer = buffer;

            // connect to output (your speakers)
            source.connect(this.audioContext.destination);

            // play the file
            source.start();
        }
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 初始化声音api，注意：在ios上面必须手动点击某个按钮来调用初始化，否则无法播放声音
     */
    public isAvailable(): boolean {
        return this.audioContext ? true : false;
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 从arraybuffer转成audiobuffer
     * @param ab  二进制声音数据
     * @param fun 
     */
    public loadAudioBufferFromArrayBuffer(ab: ArrayBuffer, fun: (buf: AudioBuffer, _err: Error) => void): void {
        this.audioContext.decodeAudioData(ab, (audiobuffer) => {
            fun(audiobuffer, null);
        });
    }

    private _audioBufferDic: cMap<AudioBuffer> = new cMap();
    //音頻解析中字典
    private _audioBufferDecodeIngDic: cMap<Function[]> = new cMap();
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 从本地文件加载音频数据，返回audiobuffer
     * @param url  文件地址
     * @param fun 
     */
    public loadAudioBuffer(url: string, fun: (buf: AudioBuffer, loader: Loader) => void): void {
        // // tslint:disable-next-line: variable-name
        // CAudioEx.loadArrayBuffer(url, (_ab, __err) => {
        //     if (__err != null) {
        //         fun(null, __err);
        //     } else {
        //         try {
        //             let inst = CAudioEx.instance();
        //             if (!inst.audioContext) {
        //                 return console.log(`加载音频失败 :${url}  音频上下文初始化失败!`);
        //             }
        //             inst.audioContext.decodeAudioData(_ab, (audiobuffer) => {
        //                 console.log(`音频解析完成 :${url}`);
        //                 fun(audiobuffer, null);
        //             });
        //             //this.audioContext.decodeAudioData(_ab, (audiobuffer) => {
        //             //    fun(audiobuffer, null);
        //             //});
        //         } catch (er) {
        //             console.error(url + "     Error   " + er);
        //         }
        //     }
        // });
        // console.warn("开始加载资源 " + url.replace("http://localhost:9696/res/AiFiles", ""));
        LoaderManage.Instance.load(url, (loader: Loader, _ab: ArrayBuffer) => {
            try {
                let inst = CAudioEx.instance();
                if (inst._audioBufferDic.has(loader.url)) {
                    let audio: AudioBuffer = inst._audioBufferDic.get(loader.url);
                    fun(audio, loader);
                } else {
                    if (!inst.audioContext) {
                        return console.log(`加载音频失败 :${loader.url}  音频上下文初始化失败!`);
                    }
                    // console.error(loader.url.replace("http://localhost:9696/res/AiFiles", "") + "     " + _ab.byteLength);
                    if (inst._audioBufferDecodeIngDic.has(loader.url)) {
                        //如果在解析中列表中 加入回调数组
                        let decIngArr=inst._audioBufferDecodeIngDic.get(loader.url);
                        decIngArr.push(fun);
                    } else {
                        let decIngArr=[];
                        decIngArr.push(fun);
                        inst._audioBufferDecodeIngDic.set(loader.url,decIngArr);
                        inst.audioContext.decodeAudioData(_ab, (audiobuffer) => {
                            console.log(`音频解析完成 :${loader.url}`);
                            inst._audioBufferDic.set(loader.url, audiobuffer);
                            // fun(audiobuffer, loader);
                            //音频解析完成 回调数组 回调 清空
                            if (inst._audioBufferDecodeIngDic.has(loader.url)) {
                                let decIngArr:Function[]=inst._audioBufferDecodeIngDic.get(loader.url);
                                for (let i = 0; i < decIngArr.length; i++) {
                                    let callback: Function = decIngArr[i];
                                    if (callback != null) {
                                        callback(audiobuffer, loader);
                                    }
                                }
                                decIngArr.length = 0;
                                inst._audioBufferDecodeIngDic.delete(loader.url);
                            }                            
                        });
                    }
                }
            } catch (er) {
                console.error(loader.url + "     Error   " + er);
            }
        }, LoadType.ARRAYBUFFER);
    }

    public createAudioChannel(channel?: CAudioChannel): CAudioChannel {
        let cc: CAudioChannel;
        if (channel != null) {
            cc = channel;
        } else {
            cc = new CAudioChannel();
        }
        if (!this.audioContext) {
            console.error("出错 audioContext 未初始化!");
            return cc;
        }
        cc.source = this.audioContext.createBufferSource();
        cc.audioContextCurrentTime = this.audioContext.currentTime;

        cc.gainNode = this.audioContext.createGain();
        cc.pannerNode = this.audioContext.createPanner();
        cc.source.connect(cc.gainNode);
        cc.gainNode.connect(cc.pannerNode);
        cc.pannerNode.connect(this.audioContext.destination);

        //声音调节
        cc.gainNode.gain.value = 1;
        return cc;
    }
}
