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
type cbFun = (isSuccess: boolean) => void;
type codeData = { queue: cbFun[], finish: boolean, scriptID?: string };

export class LoaderLibManager {
    private static instance: LoaderLibManager;
    public static get Instance(): LoaderLibManager {
        if (this.instance == null) {
            this.instance = new LoaderLibManager();
        }
        return this.instance;
    }
    private codeMap: { [url: string]: codeData } = {};
    private idIdx: number = 0;
    //加载js
    public addLib(lib: string, callback?: (isSuccess: boolean) => void) {
        let url: string = lib;
        if (this.codeMap[url]) {
            if (this.codeMap[url].finish != true) {
                this.codeMap[url].queue.push(callback);
                return;
            }
            return callback != null ? callback(true) : null;
        }

        let script = document.createElement("script");
        script.onload = () => {
            //this.codeMap[url] = script.id;
            // if (callback)
            //    callback();
            let load = this.codeMap[url];
            load.finish = true;
            while (load.queue.length > 0) {
                load.queue.shift()(true);
            }
        };
        script.id = `${++this.idIdx}`;

        this.codeMap[url] = {
            queue: [],
            finish: false,
            scriptID: script.id,
        };
        this.codeMap[url].queue.push(callback);

        script.onerror = (e) => {
            console.error(e);
            return callback != null ? callback(false) : null;
        };

        script.src = url;
        document.getElementsByTagName("head")[0]
            .appendChild(script);
        document.head.appendChild(script);
    }
    //移除js
    public removeLib(lib: string): boolean {
        let url = lib;
        if (!this.codeMap[url]) {
            return false;
        }
        let script = document.getElementById(this.codeMap[url].scriptID);
        if (script) {
            script.remove();
        }
        return true;
    }
}