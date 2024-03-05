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

export class PrefabExportRequest {
    public static get Instance(): PrefabExportRequest {
        if (this._instance == null) {
            this._instance = new PrefabExportRequest();
        }

        return this._instance;
    }
    private static _instance: PrefabExportRequest;


    /***
     * 导出3D Prefab
     */
    public exportPrefab3D(dirKey, fileName, json) {
        let paramJsons =`"a0":${JSON.stringify(dirKey)},"a1":${JSON.stringify(fileName)},"a2":${JSON.stringify(json)},`;
        let mess = WebsocketTool.Instance.getMsg("PrefabExport","exportPrefab3D",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 导出Scene
     */
    public exportScene(dirKey, fileName, json, fog) {
        let paramJsons =`"a0":${JSON.stringify(dirKey)},"a1":${JSON.stringify(fileName)},"a2":${JSON.stringify(json)},"a3":${JSON.stringify(JSON.stringify(fog))},`;
        let mess = WebsocketTool.Instance.getMsg("PrefabExport","exportScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * testtesttest
     */
    public testExport(json) {
        let paramJsons =`"a0":${JSON.stringify(json)},`;
        let mess = WebsocketTool.Instance.getMsg("PrefabExport","testExport",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 导出2D Prefab
     */
    public exportPrefab2D(dirKey, fileName, json) {
        let paramJsons =`"a0":${JSON.stringify(dirKey)},"a1":${JSON.stringify(fileName)},"a2":${JSON.stringify(json)},`;
        let mess = WebsocketTool.Instance.getMsg("PrefabExport","exportPrefab2D",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}