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

export class BackGroundImageManagerRequest {
    public static get Instance(): BackGroundImageManagerRequest {
        if (this._instance == null) {
            this._instance = new BackGroundImageManagerRequest();
        }

        return this._instance;
    }
    private static _instance: BackGroundImageManagerRequest;


    /***
     * 获取已有的背景图
     */
    public GetBackGround(projectId, backGroundId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(backGroundId)},`;
        let mess = WebsocketTool.Instance.getMsg("BackGroundImageManager","GetBackGround",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取所有的背景图
     */
    public GetAllBackGround(projectId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},`;
        let mess = WebsocketTool.Instance.getMsg("BackGroundImageManager","GetAllBackGround",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成场景的背景描述,llmType:选择的模型
     */
    public LLM_GetBackGroundByScene(projectId, title, chapterId, SceneId, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(SceneId)},"a4":${JSON.stringify(llmType)},"a5":${JSON.stringify(prompt)},`;
        let mess = WebsocketTool.Instance.getMsg("BackGroundImageManager","LLM_GetBackGroundByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定场景的背景描述
     */
    public SetBackGroundByScene(projectId, chapterId, SceneId, content) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(SceneId)},"a3":${JSON.stringify(content)},`;
        let mess = WebsocketTool.Instance.getMsg("BackGroundImageManager","SetBackGroundByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过绘图模型生成场景的背景
     */
    public StableDiffusio_GetBackGround(projectId, title, chapterId, SceneId, prompt, chatID) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(SceneId)},"a4":${JSON.stringify(prompt)},"a5":${JSON.stringify(chatID)},`;
        let mess = WebsocketTool.Instance.getMsg("BackGroundImageManager","StableDiffusio_GetBackGround",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定场景的背景
     */
    public SetBackGroundImageByScene(projectId, chapterId, SceneId, imageId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(SceneId)},"a3":${JSON.stringify(imageId)},`;
        let mess = WebsocketTool.Instance.getMsg("BackGroundImageManager","SetBackGroundImageByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 保存生成的音乐
     */
    public SaveBackGroundImage(projectId, imageId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(imageId)},`;
        let mess = WebsocketTool.Instance.getMsg("BackGroundImageManager","SaveBackGroundImage",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}