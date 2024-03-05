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

export class ProjectRoleManagerRequest {
    public static get Instance(): ProjectRoleManagerRequest {
        if (this._instance == null) {
            this._instance = new ProjectRoleManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ProjectRoleManagerRequest;


    /***
     * 获取已设定的指定角色的设定
     */
    public GetRoleSetting(projectId, roleId) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "GetRoleSetting", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已设定的指定角色的语音设定
     */
    public GetRoleVoice(projectId, roleId) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "GetRoleVoice", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已设定的指定角色的立绘
     */
    public GetRole(projectId, roleId) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "GetRole", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成角色设定，llmType：调用的语言模型
     */
    public LLM_GetRoleSetting(projectId, title, llmType, prompt) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "LLM_GetRoleSetting", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定角色的设定
     */
    public SetRoleSetting(projectId, roleId, roleSetting) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},"a2":${JSON.stringify(roleSetting)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "SetRoleSetting", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    public SetRoleSettingList(projectId, roleSettingList) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleSettingList)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "SetRoleSettingList", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }


    /***
     * 由AI判断适合的声线，挑选适合的语音模型 count 挑选数量
     */
    public VITS_GetRoleVoice(projectId, title, roleId, count, prompt) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(roleId)},"a3":${JSON.stringify(count)},"a4":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "VITS_GetRoleVoice", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取所有语音模型，count 挑选数量，type:1 幼年女性 2 青年女性 3中年女性 4老年女性 5幼年男性 6青年男性 7中年男性 8老年男性，9 所有女性 10 所有男性，11其他，0 全部
     */
    public VITS_GetAllVoice(projectId, title, roleId, count, type) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(roleId)},"a3":${JSON.stringify(count)},"a4":${JSON.stringify(type)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "VITS_GetAllVoice", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定角色的语音模型
     */
    public SetRoleVoice(projectId, roleId, voiceId) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},"a2":${JSON.stringify(voiceId)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "SetRoleVoice", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过词条生成角色立绘，count 生成数量
     */
    public StableDiffusio_GetRole(projectId, title, count, roleId, prompt, chatID) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(count)},"a3":${JSON.stringify(roleId)},"a4":${JSON.stringify(prompt)},"a5":${JSON.stringify(chatID)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "StableDiffusio_GetRole", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定角色立绘
     */
    public SetRole(projectId, roleId, imageId) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},"a2":${JSON.stringify(imageId)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "SetRole", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 生成表情
     */
    public SetBiaoqing(projectId, title, jsonStr, chatID) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(jsonStr)},"a3":${JSON.stringify(chatID)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "SetBiaoqing", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除角色
     */
    public DeleteRole(projectId, roleId) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "DeleteRole", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改角色名字
     */
    public ChangeRoleName(projectId, roleId, newName) {
        let paramJsons = `"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},"a2":${JSON.stringify(newName)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectRoleManager", "ChangeRoleName", `${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}