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
import { PrefabExportRequest } from "AutoCode/Net/ClientRequest/PrefabExportRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class PrefabExport {
    public static get Instance(): PrefabExport {
        if (this._instance == null) {
            this._instance = new PrefabExport();
        }

        return this._instance;
    }
    private static _instance: PrefabExport;

    /**
     * 导出3D Prefab
     */
    public exportPrefab3D(dirKey: string, fileName: string, json: string, clientData: ClientData) {
        PrefabExportRequest.Instance.exportPrefab3D(dirKey, fileName, json);
    }
    /**
     * 导出Scene
     */
    public exportScene(dirKey: string, fileName: string, json: string, fogJson: string, clientData: ClientData) {
        PrefabExportRequest.Instance.exportScene(dirKey, fileName, json, fogJson);
    }
    /**
     * testtesttest
     */
    public testExport(json: string, clientData: ClientData) {
        PrefabExportRequest.Instance.testExport(json);
    }
    /**
     * 导出2D Prefab
     */
    public exportPrefab2D(dirKey: string, fileName: string, json: string, clientData: ClientData) {
        PrefabExportRequest.Instance.exportPrefab2D(dirKey, fileName, json);
    }
}