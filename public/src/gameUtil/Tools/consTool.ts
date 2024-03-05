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
/** system 编译模式 ， 类对象扫描 收集工具 */
// tslint:disable-next-line: class-name
export class consTool {
    public static init() {
        m4m["__consTool"] = consTool;
        //this.scanAllUsercode();
        this.scan_new();
    }

    /** 标准 systemJs 使用 */
    private static scanAllUsercode() {
        let symbolkey = Reflect.ownKeys((window as any)["System"].registry)[1]; //固定位置
        let missObj = (window as any)["System"].registry[symbolkey];
        for (let key in missObj) {
            if (typeof (key) == "string") {
                let test = /__usercode__/.test(key);
                if (test) {
                    let arr = key.split("/");
                    let endStr = arr[arr.length - 1];
                    let temp = missObj[key][endStr];
                    if (temp) {
                        m4m["__consTool"][temp.name] = temp;
                    }
                }
            }
        }
    }

    /** 小青 版systemJs 使用 */
    private static scan_new() {
        let cached = "____CACHEDMAP____";
        let tag = "__consTool";
        if (!m4m[tag][cached]) {
            m4m[tag][cached] = {};
        }
        let missObj = (window as any)["System"].models;
        for (let key in missObj) {
            if (m4m[tag][cached][key]) { continue; }   //优化 性能

            for (let k in missObj[key]) {
                if (k.indexOf("____") != -1) { continue; }  //排除 ____imports____ ....
                let classObj = missObj[key][k];
                if (classObj) {
                    m4m[tag][k] = classObj;
                    m4m[tag][cached][key] = true;
                }
            }
        }
    }
}