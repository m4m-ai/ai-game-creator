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
import { ErrorInfoManagerRequest } from "AutoCode/Net/ClientRequest/ErrorInfoManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class ErrorInfoManager {
    public static get Instance(): ErrorInfoManager {
        if (this._instance == null) {
            this._instance = new ErrorInfoManager();
        }

        return this._instance;
    }
    private static _instance: ErrorInfoManager;

    /**
     * 记录客户端异常消息
     */
    public CreateErrorInfo(message: string, modelType: string, clientData: ClientData) {
        ErrorInfoManagerRequest.Instance.CreateErrorInfo(message, modelType);
    }
}