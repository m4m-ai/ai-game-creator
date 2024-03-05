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
import { UiDataManager } from "PSDUI/UiDataManager";
import { AppMain } from "../appMain";
import { CAudioEx } from "../Audio/OriginCode/audioex";
import { BindKeyName } from "../Data/BindKeyName";
import { ChapterInfo } from "../Data/ChapterInfo";
import { BackgroundStep } from "../Data/Process/BackgroundStep";
import { SoundStep } from "../Data/Process/SoundStep";
import { StandingPaintingStep } from "../Data/Process/StandingPaintingStep";
import { Step } from "../Data/Process/Step";
import { StepType } from "../Data/Process/StepType";
import { VoiceStep } from "../Data/Process/VoiceStep";
import { SceneInfo } from "../Data/SceneInfo";
import { ChatMessageDataManager } from "./ChatMessageDataManager";
import { EditorManager } from "./EditorManager";

export class ScenePreloadData {
    //章节ID
    public chapterId: string;
    //场景ID
    public sceneId: string;
    //
    public stepId: number;
    public url: string;
    public resType: PreloadResType;
    public sceneName: string;

    //当前章节所引
    public chapterIndex: number;
    //当前场景所引
    public sceneIndex: number;
}

//
export enum PreloadState {
    /**
     * 开始加载
     */
    start = 1,
    /**
    * 加载完成
    */
    complete = 2,
    /**
    * 加载取消
    */
    cancel = 3,
}

export enum PreloadResType {
    /**
     * 图片
     */
    img = 1,
    /**
    * 声音
    */
    audio = 2,
}

export class ScenePreloadManager {
    private static _instance: ScenePreloadManager;
    public static get Instance(): ScenePreloadManager {
        if (this._instance == null) {
            this._instance = new ScenePreloadManager();
        }
        return this._instance;
    }

    public init() {
        this.loadComBind = this.loadComFun.bind(this);
        this.audioLoadComBind = this.audioLoadComFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.OnChangeScene, this.onChangeScene.bind(this));
    }

    //首次加载资源数量
    public firstPreloadLength: number = 5;
    //外部设置参数
    public preloadLength: number = 10;
    //缓存的资源数量 如果小于这个值 继续加载后续资源
    private _preloadLength: number = 0;
    //同时加载几个文件
    public _preloadNum: number = 3;
    private _chapterDic: cMap<cMap<ScenePreloadData[]>> = new cMap();
    private _initAllData: boolean = false;
    //保存需要下载的列表
    private _needLoadArr: ScenePreloadData[];

    //预加载进行中的资源列表
    private _preLoadIngDic: cMap<ScenePreloadData> = new cMap();

    //预加载 已下载完成 资源列表
    private _preLoadedDic: cMap<string> = new cMap();

    //是否需要加载回调
    private _needLoadCallBack: boolean = false;

    public preloadStart(scene: SceneInfo, reset: boolean) {
        //初始化 所有章节需加载资源的数据
        if (!this._initAllData) {
            this._initAllData = true;
            //首次加载
            this._preloadLength = this.firstPreloadLength;
            let chapterList = EditorManager.Instance.chapterList;
            // console.error("章节列表");
            // console.error(chapterList);
            for (let i = 0; i < chapterList.length; i++) {
                let chapterData: ChapterInfo = chapterList[i];
                //scene
                let sceneDic: cMap<ScenePreloadData[]>;
                if (this._chapterDic.has(chapterData.id)) {
                    sceneDic = this._chapterDic.get(chapterData.id);
                } else {
                    sceneDic = new cMap();
                    this._chapterDic.set(chapterData.id, sceneDic);
                }
                for (let sce = 0; sce < chapterData.sceneList.length; sce++) {
                    let sceneInfo: SceneInfo = chapterData.sceneList[sce];
                    let stepArr;
                    if (sceneDic.has(sceneInfo.id)) {
                        stepArr = sceneDic.get(sceneInfo.id);
                    } else {
                        stepArr = [];
                        sceneDic.set(sceneInfo.id, stepArr);
                    }
                    for (let tep = 0; tep < sceneInfo.stepList.length; tep++) {
                        let step: Step = sceneInfo.stepList[tep];
                        switch (step.type) {
                            case StepType.background:
                                let backgro: BackgroundStep = step as BackgroundStep;
                                if (backgro.data.resPath != null && backgro.data.resPath.length > 0) {
                                    stepArr.push(this.getScenePreloadData(sceneInfo.chapter.id, sceneInfo.id, backgro.index, backgro.data.resPath, PreloadResType.img, backgro.scene.sceneName, i, sce));
                                }
                                break;
                            case StepType.sound:
                                let sound: SoundStep = step as SoundStep;
                                if (sound.data.resPath != null && sound.data.resPath.length > 0)
                                    stepArr.push(this.getScenePreloadData(sceneInfo.chapter.id, sceneInfo.id, sound.index, ChatMessageDataManager.Instance.getResFullPath(sound.data.resPath), PreloadResType.audio, sound.scene.sceneName, i, sce));
                                break;
                            case StepType.voice:
                                let voice: VoiceStep = step as VoiceStep;
                                if (voice.data.resPath != null && voice.data.resPath.length > 0)
                                    stepArr.push(this.getScenePreloadData(sceneInfo.chapter.id, sceneInfo.id, voice.index, ChatMessageDataManager.Instance.getResFullPath(voice.data.resPath), PreloadResType.audio, voice.scene.sceneName, i, sce));
                                break;
                            case StepType.standingPainting:
                                let stand: StandingPaintingStep = step as StandingPaintingStep;
                                if (stand.data.resPath != null && stand.data.resPath.length > 0) {
                                    stepArr.push(this.getScenePreloadData(sceneInfo.chapter.id, sceneInfo.id, stand.index, stand.data.resPath, PreloadResType.img, stand.scene.sceneName, i, sce));
                                }
                                break;
                        }
                    }
                    // console.error(sceneInfo.sceneName, stepArr);
                }
            }
        }
        console.error("当前场景  " + scene.sceneName);
        // console.error(scene);
        //初始化 或 者跳场景了重置数据
        if (this._needLoadArr == null || reset) {
            // console.error("数据被重置 ");
            this._needLoadCallBack = true;
            UiDataManager.changeFunctionData(BindKeyName.PreloadStateChange, PreloadState.start);
            this.clear();
            this.preloadArrFun(scene);
        }

        // let index = scene.chapter.sceneList.indexOf(scene);
        // if (index != -1) {
        //     if (index != scene.chapter.sceneList.length - 1) {
        //         let nextScene = scene.chapter.sceneList[index + 1];
        //         console.error("下一个场景数据");
        //         console.error(nextScene);
        //     } else {
        //         console.error("已经是当前场景的最后一话");

        //         console.error("当前章节名称 " + scene.chapter.chapterName);

        //         let chapIndex = chapterList.indexOf(scene.chapter);
        //         if (chapIndex != chapterList.length - 1) {
        //             let nextChapter = chapterList[chapIndex + 1];
        //             console.error("下一章节名称 " + nextChapter.chapterName);
        //         } else {
        //             console.error("已到达最后一章");
        //         }

        //     }
        // } else {
        //     console.error("取场景数据出错");
        // }

        this.startLoadFun();
    }
    private onChangeScene(sceneObj: any) {

        let scene: SceneInfo = sceneObj.scene;
        //是否重置  如果跳场景了 数据重置
        let reset: boolean = sceneObj.reset;
        this.preloadStart(scene, reset);
    }

    private preloadArrFun(scene: SceneInfo) {
        if (this._chapterDic.has(scene.chapter.id)) {
            let sceneDic = this._chapterDic.get(scene.chapter.id);
            //取出当前章节数据
            if (sceneDic.has(scene.id)) {
                //取出当前场景数据
                let scenePreData: ScenePreloadData[] = sceneDic.get(scene.id);
                //取一个新的 当前场景数据数组
                this._needLoadArr = scenePreData.concat();
                // console.error("取新的需要预加载的场景列表 ");
                // console.error(this._needLoadArr);
                if (this._needLoadArr == null || this._needLoadArr.length == 0) {
                    console.error("未取到场景数据 那可能是配置的最后一话!");
                }
            } else {
                console.error("未取到当前场景数据");
            }
        } else {
            console.error("未取到当前章节数据");
        }
    }

    //取接下来要预加载的资源数据
    private getNeedPreloadArrFun(preData: ScenePreloadData) {
        let chapterList = EditorManager.Instance.chapterList;
        if (preData.chapterIndex < chapterList.length) {
            let chapterData: ChapterInfo = chapterList[preData.chapterIndex];
            if (preData.sceneIndex + 1 < chapterData.sceneList.length) {
                let nextScene: SceneInfo = chapterData.sceneList[preData.sceneIndex + 1];
                console.error("有下一个场景数据 " + nextScene.sceneName);
                // console.error(nextScene);
                this.preloadArrFun(nextScene);
            } else {
                console.error("当前章节名称 " + chapterData.chapterName + " 章节场景的最后一话");
                //
                if (preData.chapterIndex + 1 < chapterList.length) {
                    let nextChapter: ChapterInfo = chapterList[preData.chapterIndex + 1];
                    console.error("下一章节名称 " + nextChapter.chapterName);
                    let nextScene: SceneInfo = nextChapter.sceneList[0];
                    this.preloadArrFun(nextScene);
                } else {
                    console.error("最后一章的最后一话 完结");
                }
            }
        } else {
            console.error("取章节数据出错");
        }
    }

    private loadComBind: any;
    private audioLoadComBind: any;
    //加载资源
    private startLoadFun() {
        if (this._preLoadedDic.size + this._preLoadIngDic.size >= this._preloadLength) {
            //如果没有加载中的资源 并且缓存资源数已达到设置值
            if (this._preLoadIngDic.size == 0) {
                if (this._needLoadCallBack) {
                    this._needLoadCallBack = false;
                    this._preloadLength = this.preloadLength;
                    console.warn("预加载 资源完成 关掉预加载loading窗口 当前缓存资源数 " + this._preLoadedDic.size);
                    UiDataManager.changeFunctionData(BindKeyName.PreloadStateChange, PreloadState.complete);
                }
            }
            return;
        }

        if (this._preLoadIngDic.size >= this._preloadNum) {
            //同时只加载 this._preloadNum 个 加载完成后再继续
            return;
        }

        if (this._needLoadArr == null || this._needLoadArr.length == 0) {
            return;
        }
        //从数组中取出 一段需要预加载资源 长度
        // console.error("需要加载资源的长度 " + this._needLoadArr.length);
        let scenePreData: ScenePreloadData = this._needLoadArr.shift();
        if (scenePreData == null) {
            return;
        }
        if (this._needLoadArr.length == 0) {
            //取下一场景数据
            this.getNeedPreloadArrFun(scenePreData);
        }
        let urlID = scenePreData.chapterId + "_" + scenePreData.sceneId + "_" + scenePreData.stepId;
        // console.warn("开始加载资源 " + scenePreData.sceneName + "   " + urlID + "   " + scenePreData.url);
        this._preLoadIngDic.set(urlID, scenePreData);
        if (scenePreData.resType == PreloadResType.img) {
            LoaderManage.Instance.load(scenePreData.url, this.loadComBind, LoadType.IMAGE);
        } else if (scenePreData.resType == PreloadResType.audio) {
            CAudioEx.instance().loadAudioBuffer(scenePreData.url, this.audioLoadComBind);
        }
        if (this._preLoadIngDic.size < this._preloadNum) {
            this.startLoadFun();
        }
    }
    private audioLoadComFun(buf: AudioBuffer, loader: Loader) {
        this.loadComFun(loader);
    }

    private clearArr: string[] = [];
    //加载资源完成
    private loadComFun(loader: Loader) {
        //放入已下载完成列表
        this.clearArr.length = 0;
        this._preLoadIngDic.forEach((value: ScenePreloadData, key: string) => {
            // console.error("@@     "+key);
            if (value.url == loader.url) {
                this._preLoadedDic.set(key, loader.url);
                // console.error(key + "  加进来了啥东西   " + loader.url);
                this.clearArr.push(key);
            }
        });
        // console.error(this._preLoadedDic.size + " 资源加载完成 " + loader.url.replace(AppMain.ResUrl + "res/", "").replace("http://localhost:9696/res/AiFiles", ""));
        for (let i = 0; i < this.clearArr.length; i++) {
            let str: string = this.clearArr[i];
            if (this._preLoadIngDic.has(str)) {
                this._preLoadIngDic.delete(str);

                this.startLoadFun();

            } else {
                console.error(str);
                console.error("出错 加载完成的资源 不在加载中的列表中?");
            }
        }
    }

    //刷新数据 当前使用到这里的资源 看是否已加载完成
    public refresh(setpID: number, url: string) {
        let urlID = EditorManager.Instance.currScene.chapter.id + "_" + EditorManager.Instance.currScene.id + "_" + setpID;
        // console.warn("当前使用资源  " + url.replace(AppMain.ResUrl + "res/", "").replace("http://localhost:9696/res/AiFiles", ""));
        if (this._preLoadedDic.has(urlID)) {
            let loadedurl: string = this._preLoadedDic.get(urlID);
            if (loadedurl == url) {
                //资源已使用 从缓冲列表长度 中去掉
                this._preLoadedDic.delete(urlID);

            } else {
                //加载的资源和需的的对不上?
                console.error("应该进不了这里 " + url);
            }
        } else {
            // this._preLoadedDic.forEach((valu,key:string) => {
            //     console.error("@@     "+key+"    "+valu.replace(AppMain.ResUrl + "res/","").replace("http://localhost:9696/res/AiFiles",""));
            // });
            //使用时如果没有在已完成列表中 说明加载的过慢了
            console.warn("id: " + urlID + "  使用时如果没有在已完成列表中 说明加载的过慢了");
            if (this._preLoadIngDic.has(urlID)) {
                //如果这个资源在加载中列表中
                this._preLoadIngDic.delete(urlID);
                console.warn("在加载中列表中 移除");
            } else {
                this._preLoadIngDic.clear();
                this._preLoadedDic.clear();
                //如果发现加载过慢 把原加载的资源列表清空 开始 加后续资源
                if (this._needLoadArr.length > 0) {
                    let data: ScenePreloadData = this._needLoadArr[0];
                    console.warn("清掉已有缓存从 新的位置开始加 " + (data.sceneId == EditorManager.Instance.currScene.id));
                    if (data.sceneId == EditorManager.Instance.currScene.id) {//如果列表还在当前场景
                        let index: number = 0;
                        for (let i = 0; i < this._needLoadArr.length; i++) {
                            let element: ScenePreloadData = this._needLoadArr[i];
                            if (element.stepId == setpID) {
                                index = i;
                                if (index + 1 < this._needLoadArr.length) {
                                    index++;
                                }
                                break;
                            }
                        }
                        this._needLoadArr.splice(0, index);
                    }
                }
            }
        }
        console.warn(setpID + " 可用的缓冲资源数 " + this._preLoadedDic.size);
        // if(this._preLoadedDic.size<5)
        // {
        //     this._preLoadedDic.forEach((value: string, key: string) => {
        //         console.error(key+"    可用的缓冲资源    "+value);
        //     });
        // }
        this.startLoadFun();
    }

    private getScenePreloadData(_chapterId: string, _sceneId: string, _stepId: number, _url: string, _resType: PreloadResType, _sceneName: string, _chapterIndex: number, _sceneIndex) {
        let data = new ScenePreloadData();
        data.chapterId = _chapterId;
        data.sceneId = _sceneId;
        data.stepId = _stepId;
        data.url = _url;
        data.resType = _resType;
        data.sceneName = _sceneName;
        data.chapterIndex = _chapterIndex;
        data.sceneIndex = _sceneIndex;
        return data;
    }

    public clear() {
        if (this._needLoadArr) {
            //保存需要下载的列表
            this._needLoadArr.length = 0;
        }

        if (this._preLoadIngDic) {
            //预加载进行中的资源列表
            this._preLoadIngDic.clear();
        }

        if (this._preLoadedDic) {
            //预加载 已下载完成 资源列表
            this._preLoadedDic.clear();
        }
    }
}