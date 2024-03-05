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
import { OtherApiManagerRequest } from "AutoCode/Net/ClientRequest/OtherApiManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class OtherApiManager {
    public static get Instance(): OtherApiManager {
        if (this._instance == null) {
            this._instance = new OtherApiManager();
        }

        return this._instance;
    }
    private static _instance: OtherApiManager;

    /**
     * 语言模型自由API
     */
    public LLM_Free(projectId: string, title: string, llmType: number, prompt: string, clientData: ClientData) {
        OtherApiManagerRequest.Instance.LLM_Free(projectId, title, llmType, prompt);
    }
    /**
     * 图画模型自由API
     */
    public StableDiffusion_Free(projectId: string, title: string, json: string, clientData: ClientData) {
        OtherApiManagerRequest.Instance.StableDiffusion_Free(projectId, title, json);
    }
    /**
     * 语音模型自由API
     */
    public VITS_Free(projectId: string, title: string, voiceId: string, txt: string, clientData: ClientData) {
        OtherApiManagerRequest.Instance.VITS_Free(projectId, title, voiceId, txt);
    }
    /**
     * 一键补完项目
     */
    public OneClickCompletion(projectId: string, title: string, args: string[], clientData: ClientData) {
        OtherApiManagerRequest.Instance.OneClickCompletion(projectId, title, args);
    }
}