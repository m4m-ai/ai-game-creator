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

export class DialogManagerRequest {
    public static get Instance(): DialogManagerRequest {
        if (this._instance == null) {
            this._instance = new DialogManagerRequest();
        }

        return this._instance;
    }
    private static _instance: DialogManagerRequest;


    /***
     * 通过语言模型生成场景的大纲,llmType:选择的模型
     */
    public LLM_GetOutline(projectId, title, chapterId, sceneId, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(sceneId)},"a4":${JSON.stringify(llmType)},"a5":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","LLM_GetOutline",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定大纲
     */
    public SetOutLine(projectId, chapterId, sceneId, outLine) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(outLine)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","SetOutLine",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成场景的对话,llmType:选择的模型
     */
    public LLM_GetDialog(projectId, title, llmType, roles, chapterId, sceneId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(roles)},"a4":${JSON.stringify(chapterId)},"a5":${JSON.stringify(sceneId)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","LLM_GetDialog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定对话
     */
    public SetDialog(projectId, chapterId, sceneId, dialog) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(dialog)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","SetDialog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语音模型生成场景的对话语音
     */
    public VITS_GetVoicesByDaiglog(projectId, title, daiglogId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(daiglogId)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","VITS_GetVoicesByDaiglog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定对话语音
     */
    public SetVoicesByDaiglog(projectId, chapterId, sceneId, daiglogId, voicesPath) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(daiglogId)},"a4":${JSON.stringify(voicesPath)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","SetVoicesByDaiglog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已有对话语音
     */
    public GetVoicesByDaiglog(projectId, chapterId, sceneId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","GetVoicesByDaiglog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语音模型生成指定文本的语音
     */
    public VITS_GetVoiceByTxt(projectId, title, roleId, txt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(roleId)},"a3":${JSON.stringify(txt)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","VITS_GetVoiceByTxt",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 生成整段语音
     */
    public VITS_GetVoiceByScene(projectId, title, chapterId, sceneId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(sceneId)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","VITS_GetVoiceByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定对话的语音
     */
    public SetVoiceToTxt(projectId, chapterId, sceneId, txtId, voiceId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(txtId)},"a4":${JSON.stringify(voiceId)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","SetVoiceToTxt",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取指定对话已有的语音
     */
    public GetVoiceToTxt(projectId, chapterId, sceneId, txtId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(txtId)},`;
        let mess = WebsocketTool.Instance.getMsg("DialogManager","GetVoiceToTxt",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}