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
import { FontMgr } from "Tools/FontMgr";
import { PlatformType, PlatformUtil } from "Tools/PlatformUtil";

export class GameStart {
    public static get Instance(): GameStart {
        if (this._instance == null) {
            this._instance = new GameStart();
        }
        return this._instance;
    }
    private static _instance: GameStart;

    public init() {
        //动态加载字体 
        // tslint:disable-next-line: max-line-length
        let useBufferMode = PlatformUtil.WXGetSystemPlatformType == PlatformType.iPhone;
        let isIosBol = PlatformUtil.WXGetSystemPlatformType == PlatformType.iPhone;
        if (globalThis.window) {
            FontMgr.Instance.init(useBufferMode, isIosBol);
        }
    }
}