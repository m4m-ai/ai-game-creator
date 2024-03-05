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

export class FrontDataManagerRequest {
    public static get Instance(): FrontDataManagerRequest {
        if (this._instance == null) {
            this._instance = new FrontDataManagerRequest();
        }

        return this._instance;
    }
    private static _instance: FrontDataManagerRequest;


    /***
     * callService
     */
    public callService(className, funcName, args) {
        let paramJsons =`"a0":${JSON.stringify(className)},"a1":${JSON.stringify(funcName)},"a2":${JSON.stringify(args)},`;
        let mess = WebsocketTool.Instance.getMsg("FrontDataManager","callService",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * callFunc
     */
    public callFunc(tableName, funcName, args) {
        let paramJsons =`"a0":${JSON.stringify(tableName)},"a1":${JSON.stringify(funcName)},"a2":${JSON.stringify(args)},`;
        let mess = WebsocketTool.Instance.getMsg("FrontDataManager","callFunc",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}