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
import { DialogManagerRequest } from "AutoCode/Net/ClientRequest/DialogManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class DialogManager {
    public static get Instance(): DialogManager {
        if (this._instance == null) {
            this._instance = new DialogManager();
        }

        return this._instance;
    }
    private static _instance: DialogManager;

    /**
     * 通过语言模型生成场景的大纲,llmType:选择的模型
     */
    public LLM_GetOutline(projectId: string, title: string, chapterId: string, sceneId: string, llmType: number, prompt: string, clientData: ClientData) {
        DialogManagerRequest.Instance.LLM_GetOutline(projectId, title, chapterId, sceneId, llmType, prompt);
    }
    /**
     * 设定大纲
     */
    public SetOutLine(projectId: string, chapterId: string, sceneId: string, outLine: string, clientData: ClientData) {
        DialogManagerRequest.Instance.SetOutLine(projectId, chapterId, sceneId, outLine);
    }
    /**
     * 通过语言模型生成场景的对话,llmType:选择的模型
     */
    public LLM_GetDialog(projectId: string, title: string, llmType: number, roles: string[], chapterId: string, sceneId: string, clientData: ClientData) {
        DialogManagerRequest.Instance.LLM_GetDialog(projectId, title, llmType, roles, chapterId, sceneId);
    }
    /**
     * 设定对话
     */
    public SetDialog(projectId: string, chapterId: string, sceneId: string, dialog: string, clientData: ClientData) {
        DialogManagerRequest.Instance.SetDialog(projectId, chapterId, sceneId, dialog);
    }
    /**
     * 通过语音模型生成场景的对话语音
     */
    public VITS_GetVoicesByDaiglog(projectId: string, title: string, daiglogId: string, clientData: ClientData) {
        DialogManagerRequest.Instance.VITS_GetVoicesByDaiglog(projectId, title, daiglogId);
    }
    /**
     * 设定对话语音
     */
    public SetVoicesByDaiglog(projectId: string, chapterId: string, sceneId: string, daiglogId: string, voicesPath: string, clientData: ClientData) {
        DialogManagerRequest.Instance.SetVoicesByDaiglog(projectId, chapterId, sceneId, daiglogId, voicesPath);
    }
    /**
     * 获取已有对话语音
     */
    public GetVoicesByDaiglog(projectId: string, chapterId: string, sceneId: string, clientData: ClientData) {
        DialogManagerRequest.Instance.GetVoicesByDaiglog(projectId, chapterId, sceneId);
    }
    /**
     * 通过语音模型生成指定文本的语音
     */
    public VITS_GetVoiceByTxt(projectId: string, title: string, roleId: string, txt: string, clientData: ClientData) {
        DialogManagerRequest.Instance.VITS_GetVoiceByTxt(projectId, title, roleId, txt);
    }
    /**
     * 生成整段语音
     */
    public VITS_GetVoiceByScene(projectId: string, title: string, chapterId: string, sceneId: string, clientData: ClientData) {
        DialogManagerRequest.Instance.VITS_GetVoiceByScene(projectId, title, chapterId, sceneId);
    }
    /**
     * 设定指定对话的语音
     */
    public SetVoiceToTxt(projectId: string, chapterId: string, sceneId: string, txtId: string, voiceId: string, clientData: ClientData) {
        DialogManagerRequest.Instance.SetVoiceToTxt(projectId, chapterId, sceneId, txtId, voiceId);
    }
    /**
     * 获取指定对话已有的语音
     */
    public GetVoiceToTxt(projectId: string, chapterId: string, sceneId: string, txtId: string, clientData: ClientData) {
        DialogManagerRequest.Instance.GetVoiceToTxt(projectId, chapterId, sceneId, txtId);
    }
}