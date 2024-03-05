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
import { LoaderManage } from "../Loader/LoaderManage";
import { ioTool } from "../Tools/ioTool";
import { EventDispatcher } from "./EventDispatcher";
import { cMap } from "./Map";

export class ExcelDataBase extends EventDispatcher {
    public static excelData = "res/ExcelData/";
    public static excelSplitData = "res/ExcelDataSplit/";
    //unity端缓存
    private static cacheDataList: Map<string, cMap<any>> = new Map<string, cMap<any>>();
    private static cacheDataMap: Map<string, any> = new Map<string, any>();

    private static _listMap: { [name: string]: cMap<any> } = {};
    protected static get _list() {
        let _name = this.name;  //当前子类 类名
        let _map = this._listMap[_name];
        if (!_map) {
            _map = this._listMap[_name] = new cMap();
        }
        return _map;
    }
    protected static set _list(v) {
        let _name = this.name;
        this._listMap[_name] = v;
    }
    public static getDataByIDCallBack(id: number | string, callBack: Function) {
        if (globalThis.window) {
            if (!this._list.get(id)) {
                let url = `${this.excelSplitData}${this.name}/${this.name}${id}.json`;
                LoaderManage.Instance.load(url, (loader, bd) => {
                    let bytes = new ioTool();
                    bytes.write(new Uint8Array(bd));
                    this.parseData(bytes);
                    bytes.dispose();
                    bytes = null;
                    if (callBack) {
                        callBack(this._list.get(id));
                    }
                });
            } else {
                if (callBack) {
                    callBack(this._list.get(id));
                }
            }
        } else {
            var data = this.cacheDataMap.get(this.name);
            if (!data) {
                data = globalThis.__getAllData__(this.name);
                this.cacheDataMap.set(this.name, data);
            }
            callBack(data[id]);
        }
    }

    public static getAllDataCallBack(callBack: (data: cMap<any>) => void) {
        if (globalThis.window) {
            let url = `${this.excelData}${this.name}.json`;
            LoaderManage.Instance.load(url, (loader, bd) => {
                // console.log("获取配置表数据:  ",url);
                let bytes = new ioTool();
                bytes.write(new Uint8Array(bd));
                this.parseData(bytes);
                bytes.dispose();
                bytes = null;
                if (callBack) {
                    callBack(this._list);
                }
            });
        } else {
            if (this.cacheDataList.has(this.name)) {
                callBack(this.cacheDataList.get(this.name));
                return;
            }
            //注意这里的data是C#字典, 不能通过[]访问
            var data = this.cacheDataMap.get(this.name);
            if (!data) {
                data = globalThis.__getAllData__(this.name);
                this.cacheDataMap.set(this.name, data);
            }
            let arr= new cMap();
            for (let key in data) {
                let value = data[key];
                arr.set(key, value);
            }
            this.cacheDataList.set(this.name, arr);
            callBack(arr);
        }
    }
    public static parseData(bytes: ioTool) {

    }
}