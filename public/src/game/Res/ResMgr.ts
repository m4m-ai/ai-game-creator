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
import { GameMgr } from "../GameMgr";

export class ResMgr {
    public static ExcelConfigClassList: any[]=[];

    /** 表格配置bufferdata 字典 */
    public static ExcelConfigBufferMap: cMap<ArrayBuffer> = new cMap<ArrayBuffer>();
    public static mainConfig: string;
    private static isInit = false;

    // tslint:disable-next-line: member-ordering
    public static callBackFun: Function;
    public static init() {
        if (this.isInit) { return; }
        this.isInit = true;

        this.loadShaderTask(this.postEventTask);
    }

    //派发加载完成事件
    private static postEventTask() {
        // EventMgr.dispatchEvent("res_dependent_loaded", new EventBase());
        if (ResMgr.callBackFun) {
            ResMgr.callBackFun();
        }
    }

    //加载shader
    private static loadShaderTask(cb: Function) {
        let shaderURL = `${GameMgr.shaderPath}customShader/customShader.assetbundle.json`;
        // loadMgr.Instance.load(shaderURL, () => {
        //     cb();
        // });
    }
}