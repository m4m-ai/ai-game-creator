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

export class ProjectBasicSettingsManagerRequest {
    public static get Instance(): ProjectBasicSettingsManagerRequest {
        if (this._instance == null) {
            this._instance = new ProjectBasicSettingsManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ProjectBasicSettingsManagerRequest;


    /***
     * 获取指定项目的背景设定
     */
    public GetBackStory(projectId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectBasicSettingsManager","GetBackStory",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定项目进度
     */
    public SetSchedule(projectId, schedule) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(schedule)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectBasicSettingsManager","SetSchedule",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定项目的背景设定
     */
    public SetBackStory(projectId, projectBack) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(projectBack)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectBasicSettingsManager","SetBackStory",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成指定项目的背景设定，llmType：调用的语言模型
     */
    public LLM_GetBackStory(projectId, title, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectBasicSettingsManager","LLM_GetBackStory",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定项目的项目名
     */
    public SetProjectName(projectId, projectName) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(projectName)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectBasicSettingsManager","SetProjectName",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成指定项目的项目名，llmType：调用的语言模型
     */
    public LLM_GetProjectName(projectId, title, llmType, backStory, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(backStory)},"a4":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectBasicSettingsManager","LLM_GetProjectName",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取支持的画风，count：获取数量, isRandom:(是否随机画风，还是由AI判断适合的画风)
     */
    public StableDiffusio_GetStyleExample(projectId, title, count, isRandom) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(count)},"a3":${JSON.stringify(isRandom)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectBasicSettingsManager","StableDiffusio_GetStyleExample",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定项目的画风模型
     */
    public SetStyle(projectId, styleId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(styleId)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectBasicSettingsManager","SetStyle",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}