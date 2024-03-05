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
import { CTimer } from "Time/CTimer";
import { TimeUtil } from "Time/TimeUtil";

//心跳管理
export class HeartBeatManager {
    static get Instance() {
        if (this._instance == null) {
            this._instance = new HeartBeatManager();
        }
        return this._instance;
    }
    constructor() {
        //每10秒
        CTimer.Instance.loopTimeUpdate(10000, this.updateFun.bind(this));
    }
    private static _instance: HeartBeatManager;

    //心跳  同步服务器时间
    public SyncServerTime() {
        let gameTime: number = Math.floor(TimeUtil.realtimeSinceStartup / 1000);
        console.error("当前游戏启动时间秒 " + gameTime);
    }

    private updateFun() {
        // 
        this.SyncServerTime();
    }
}