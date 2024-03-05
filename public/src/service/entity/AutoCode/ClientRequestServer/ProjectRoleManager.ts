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
import { ProjectRoleManagerRequest } from "AutoCode/Net/ClientRequest/ProjectRoleManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class ProjectRoleManager {
    public static get Instance(): ProjectRoleManager {
        if (this._instance == null) {
            this._instance = new ProjectRoleManager();
        }

        return this._instance;
    }
    private static _instance: ProjectRoleManager;

    /**
     * 获取已设定的指定角色的设定
     */
    public GetRoleSetting(projectId: string, roleId: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.GetRoleSetting(projectId, roleId);
    }
    /**
     * 获取已设定的指定角色的语音设定
     */
    public GetRoleVoice(projectId: string, roleId: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.GetRoleVoice(projectId, roleId);
    }
    /**
     * 获取已设定的指定角色的立绘
     */
    public GetRole(projectId: string, roleId: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.GetRole(projectId, roleId);
    }
    /**
     * 通过语言模型生成角色设定，llmType：调用的语言模型
     */
    public LLM_GetRoleSetting(projectId: string, title: string, llmType: number, prompt: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.LLM_GetRoleSetting(projectId, title, llmType, prompt);
    }
    /**
     * 设定指定角色的设定
     */
    public SetRoleSetting(projectId: string, roleId: string, roleSetting: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.SetRoleSetting(projectId, roleId, roleSetting);
    }
    /**
     * 由AI判断适合的声线，挑选适合的语音模型 count 挑选数量
     */
    public VITS_GetRoleVoice(projectId: string, title: string, roleId: string, count: number, prompt: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.VITS_GetRoleVoice(projectId, title, roleId, count, prompt);
    }
    /**
     * 获取所有语音模型，count 挑选数量，type:1 幼年女性 2 青年女性 3中年女性 4老年女性 5幼年男性 6青年男性 7中年男性 8老年男性，9 所有女性 10 所有男性，11其他，0 全部
     */
    public VITS_GetAllVoice(projectId: string, title: string, roleId: string, count: number, type: number, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.VITS_GetAllVoice(projectId, title, roleId, count, type);
    }
    /**
     * 设定指定角色的语音模型
     */
    public SetRoleVoice(projectId: string, roleId: string, voiceId: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.SetRoleVoice(projectId, roleId, voiceId);
    }
    /**
     * 通过词条生成角色立绘，count 生成数量
     */
    public StableDiffusio_GetRole(projectId: string, title: string, count: number, roleId: string, prompt: string, chatID: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.StableDiffusio_GetRole(projectId, title, count, roleId, prompt, chatID);
    }
    /**
     * 设定角色立绘
     */
    public SetRole(projectId: string, roleId: string, imageId: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.SetRole(projectId, roleId, imageId);
    }
    /**
     * 生成表情
     */
    public SetBiaoqing(projectId: string, title: string, jsonStr: string, chatID: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.SetBiaoqing(projectId, title, jsonStr, chatID);
    }
    /**
     * 删除角色
     */
    public DeleteRole(projectId: string, roleId: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.DeleteRole(projectId, roleId);
    }
    /**
     * 修改角色名字
     */
    public ChangeRoleName(projectId: string, roleId: string, newName: string, clientData: ClientData) {
        ProjectRoleManagerRequest.Instance.ChangeRoleName(projectId, roleId, newName);
    }
}