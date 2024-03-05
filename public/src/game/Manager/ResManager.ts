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
import { LoaderManage, LoadType } from "Loader/LoaderManage";
import { GameMgr } from "../GameMgr";

export class ResManager {
    private static isInit = false;

    // tslint:disable-next-line: member-ordering
    public static callBackFun: Function;
    public static init() {
        if (this.isInit) { return; }
        this.isInit = true;


        //lights add for font
        let deffontUrl = `${GameMgr.fontPath}cy_GBK.font.json`;
        let deffonttexUrl = `${GameMgr.fontPath}cy_GBK.TTF.png`;
        LoaderManage.Instance.load(deffonttexUrl, () => {
            LoaderManage.Instance.load(deffontUrl, () => {
                this.loadShaderTask();
            }, LoadType.assetMgr
            );
        },
            LoadType.assetMgr);


    }

    //派发加载完成事件
    private static postEventTask() {
        // EventMgr.dispatchEvent("res_dependent_loaded", new EventBase());
        if (ResManager.callBackFun) {
            ResManager.callBackFun();
        }
    }

    //加载shader
    private static loadShaderTask() {
        let shaderURL = `${GameMgr.shaderPath}customShader/customShader.assetbundle.json`;
        LoaderManage.Instance.load(shaderURL, () => {
            ResManager.postEventTask();
        }, LoadType.assetMgr);

    }

    /**
     * 下载 json
     * @param url 
     * @param callBackFun 
     */
    public static loadJson(url, callBackFun) {
        LoaderManage.Instance.load(url, (loader, value) => {
            if (callBackFun) {
                callBackFun(value);
            }
        }, LoadType.JSON);
    }

    /**
     * 下载 image
     * @param url 
     * @param callBackFun 
     */
    public static loadImage(url, callBackFun) {
        LoaderManage.Instance.load(url, () => {
            if (callBackFun) {
                callBackFun();
            }
        }, LoadType.IMAGE);
    }

    /**
     * 下载 二进制文件 ArrayBuffer
     * @param url 
     * @param callBackFun 
     */
    public static loadArrayBuffer(url, callBackFun) {
        LoaderManage.Instance.load(url, () => {
            if (callBackFun) {
                callBackFun();
            }
        }, LoadType.ARRAYBUFFER);
    }
}