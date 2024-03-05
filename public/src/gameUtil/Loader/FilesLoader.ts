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
import { Loader } from "./loader";
import { LoaderManage, LoadType } from "./LoaderManage";

export class FileLoadBaseData {
    public url: string;
    public type: LoadType;
    /// <summary>
    /// 优先级,数值越高越优先
    /// </summary>
    public priority: number = 0;
}
//多个文件加载处理类 所有文件加载完成 回调
export class FilesLoader {
    //总需要加载的文件数量
    public fileCount: number = 0;
    //当前已经加载文件数量
    public fileLoadedCount: number = 0;
    //加载文件完成的进度
    public sucessProgress: number = 0;
    //总进度
    public progress: number = 0;

    private list: FileLoadBaseData[] = [];
    private loadedFile = [];
    private loadCallBack: Function;
    private loaderEndFun: any;
    public add(url: string, type: LoadType = LoadType.ARRAYBUFFER, priority: number = 0) {
        let data = new FileLoadBaseData();
        data.url = url;
        data.type = type;
        data.priority = priority;
        this.list.push(data);
        this.fileCount++;
    }
    public loaderEnd(loader: Loader, file: any): void {
        if (file) {
            this.fileLoadedCount++;
            this.sucessProgress = this.fileLoadedCount / this.fileCount;

            this.loadedFile.push(file);
            if (this.loadCallBack && this.fileLoadedCount >= this.fileCount) {
                this.loadCallBack(this.loadedFile);
                this.dispose();
            }
        }
    }
    public start(callback: Function): void {
        this.loadCallBack = callback;
        if (this.fileCount <= 0) {
            callback(null);
            return;
        }
        this.loaderEndFun = this.loaderEnd.bind(this);
        for (let i: number = 0; i < this.list.length; i++) {
            let data: FileLoadBaseData = this.list[i];
            let loader: Loader = LoaderManage.Instance.load(data.url, this.loaderEndFun, data.type, data.priority);
        }
    }

    public dispose() {
        this.list.length = 0;
        this.list = null;
        this.loadedFile.length = 0;
        this.loadedFile = null;

        this.loadCallBack = null;
    }
}