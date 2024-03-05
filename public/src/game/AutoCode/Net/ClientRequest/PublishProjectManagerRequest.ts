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

export class PublishProjectManagerRequest {
    public static get Instance(): PublishProjectManagerRequest {
        if (this._instance == null) {
            this._instance = new PublishProjectManagerRequest();
        }

        return this._instance;
    }
    private static _instance: PublishProjectManagerRequest;


    /***
     * 发布完整项目 args：发布相关参数
     */
    public PublishProject(projectId, args) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(args)},`;
        let mess = WebsocketTool.Instance.getMsg("PublishProjectManager","PublishProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 只发布指定章节段 args：发布相关参数
     */
    public PublishProjectOnlyChapter(projectId, ChapterId, args) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(ChapterId)},"a2":${JSON.stringify(args)},`;
        let mess = WebsocketTool.Instance.getMsg("PublishProjectManager","PublishProjectOnlyChapter",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 只发布指定场景对话 args：发布相关参数
     */
    public PublishProjectOnlyScene(projectId, ChapterId, sceneId, args) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(ChapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(args)},`;
        let mess = WebsocketTool.Instance.getMsg("PublishProjectManager","PublishProjectOnlyScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}