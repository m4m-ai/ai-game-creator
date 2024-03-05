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

export class MySqlManagerRequest {
    public static get Instance(): MySqlManagerRequest {
        if (this._instance == null) {
            this._instance = new MySqlManagerRequest();
        }

        return this._instance;
    }
    private static _instance: MySqlManagerRequest;


    /***
     * 备份数据库
     */
    public copyMySqlClient(PW) {
        let paramJsons =`"a0":${JSON.stringify(PW)},`;
        let mess = WebsocketTool.Instance.getMsg("MySqlManager","copyMySqlClient",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 还原数据库
     */
    public uploadDataClien(PW) {
        let paramJsons =`"a0":${JSON.stringify(PW)},`;
        let mess = WebsocketTool.Instance.getMsg("MySqlManager","uploadDataClien",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}