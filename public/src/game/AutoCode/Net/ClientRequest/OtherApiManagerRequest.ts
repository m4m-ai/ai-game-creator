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

export class OtherApiManagerRequest {
    public static get Instance(): OtherApiManagerRequest {
        if (this._instance == null) {
            this._instance = new OtherApiManagerRequest();
        }

        return this._instance;
    }
    private static _instance: OtherApiManagerRequest;


    /***
     * 语言模型自由API
     */
    public LLM_Free(projectId, title, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("OtherApiManager","LLM_Free",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 图画模型自由API
     */
    public StableDiffusion_Free(projectId, title, json) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(json)},`;
        let mess = WebsocketTool.Instance.getMsg("OtherApiManager","StableDiffusion_Free",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 语音模型自由API
     */
    public VITS_Free(projectId, title, voiceId, txt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(voiceId)},"a3":${JSON.stringify(txt)},`;
        let mess = WebsocketTool.Instance.getMsg("OtherApiManager","VITS_Free",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 一键补完项目
     */
    public OneClickCompletion(projectId, title, args) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(args)},`;
        let mess = WebsocketTool.Instance.getMsg("OtherApiManager","OneClickCompletion",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}