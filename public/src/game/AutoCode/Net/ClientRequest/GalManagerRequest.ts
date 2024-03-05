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

export class GalManagerRequest {
    public static get Instance(): GalManagerRequest {
        if (this._instance == null) {
            this._instance = new GalManagerRequest();
        }

        return this._instance;
    }
    private static _instance: GalManagerRequest;


    /***
     * 获取GAL预览
     */
    public GreatAllGalPreviewDatasAsync() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("GalManager","GreatAllGalPreviewDatasAsync",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建GAL工程
     */
    public CreatAGal(projectId, galName) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(galName)},`;
        let mess = WebsocketTool.Instance.getMsg("GalManager","CreatAGal",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}