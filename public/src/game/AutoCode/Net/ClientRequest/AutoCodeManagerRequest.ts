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
import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class AutoCodeManagerRequest {
    public static get Instance(): AutoCodeManagerRequest {
        if (this._instance == null) {
            this._instance = new AutoCodeManagerRequest();
        }

        return this._instance;
    }
    private static _instance: AutoCodeManagerRequest;


    /***
     * 下载自动代码
     */
    public DownloadAutoCode() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("AutoCodeManager","DownloadAutoCode",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}