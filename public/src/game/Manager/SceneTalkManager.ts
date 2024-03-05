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
import { cMap } from "Data/Map";
import { DialogData } from "DialogData";
import { UiDataManager } from "PSDUI/UiDataManager";
import { DialogManagerRequest } from "../AutoCode/Net/ClientRequest/DialogManagerRequest";
import { DialogDataEvent } from "../AutoCode/Net/DataEvents/DialogDataEvent";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { BindKeyName } from "../Data/BindKeyName";
import { ChapterSceneDirectoryManager } from "./ChapterSceneDirectoryManager";
import { GameProjectManager } from "./GameProjectManager";


export class SceneTalkData {
    content: string; //对话内容
    imageName: string; //背景图片名称
    imageDescription: string; //背景图片描述
    image: string; //背景图片
}
export class SceneTalkManager {
    public static get Instance(): SceneTalkManager {
        if (this._instance == null) {
            this._instance = new SceneTalkManager()
        }
        return this._instance;
    }
    private static _instance: SceneTalkManager;

    public GalChapterSceneTalkMap: cMap<cMap<Array<DialogData>>> = new cMap<cMap<Array<DialogData>>>();
    public SceneTalk: SceneTalkData;
    public SceneTalkLog: DialogData;
    private constructor() {
        this.SceneTalk = new SceneTalkData();
    }

    public init() {
        WsDataManager.DialogDataData.addEventListener(DialogDataEvent.ChangeList, this.dialogDataFun.bind(this));
    }

    public dialogDataFun(data: DialogData[]) {
        debugger
        console.log(data);
        for (const iterator of data) {
            this.addTalkData(iterator);
        }
        UiDataManager.changeFunctionData(BindKeyName.SceneTalkData, null);
    }


    public dispose(): void {
        this.SceneTalkLog = null;
        this.SceneTalk = null;
        this.GalChapterSceneTalkMap.clear();
        this.GalChapterSceneTalkMap = null;
    }

    public getTalkList() {
        let projectId = GameProjectManager.instance.currentGalData.id
        let sceneData = this.GalChapterSceneTalkMap.get(projectId);
        let id = this.chapterSceneID()
        let data = sceneData.get(id);
        return data;
    }

    /**
     * 初始化数据
     */
    public addgalTalk(TalkData) {
        let id = TalkData.chapter + "_" + TalkData.scene;
        let projectId = GameProjectManager.instance.currentGalData.id;
        if (!this.GalChapterSceneTalkMap.has(projectId)) {
            let sceneArray = new cMap<Array<DialogData>>();
            let backgrounArray = new Array<DialogData>();
            sceneArray.set(id, backgrounArray)
            this.GalChapterSceneTalkMap.set(projectId, sceneArray)
        } else {
            let chapterScene = this.GalChapterSceneTalkMap.get(projectId);
            if (!chapterScene.has(id)) {
                let backgrounArray = new Array<DialogData>();
                chapterScene.set(id, backgrounArray);
            }
        }
    }


    private chapterSceneID() {
        let sceneID = ChapterSceneDirectoryManager.Instance.SceneData.id;
        let chapterID = ChapterSceneDirectoryManager.Instance.SceneData.chapter.id;
        let id = chapterID + "_" + sceneID;
        return id;
    }

    /**
     * 添加对话数据
     * @param background 
     * @returns 
     */
    public addTalkData(TalkData: DialogData) {
        this.addgalTalk(TalkData);
        let TalkList: Array<DialogData>;
        let projectId = GameProjectManager.instance.currentGalData.id;
        let id = TalkData.chapter + "_" + TalkData.scene;
        TalkList = this.GalChapterSceneTalkMap.get(projectId).get(id);
        let index = TalkList.findIndex(value => value.id == TalkData.id);
        if (index != -1) {
            console.log("当前数据已经存在了!");
            return;
        }
        TalkList.push(TalkData);
    }

    /**
     * 获取对话数据
     */
    public getTalkData(TalkId: string) {
        let TalkList: Array<DialogData>;
        let projectId = GameProjectManager.instance.currentGalData.id;
        let id = this.chapterSceneID();
        TalkList = this.GalChapterSceneTalkMap.get(projectId).get(id);
        let Talk = TalkList.find(value => value.id == TalkId);
        if (Talk == null) {
            console.log("当前数据不存在");
            return;
        }
        return Talk;
    }

    /**
     * 删除对话数据
     */
    public deleteTalkData(TalkId: string) {
        let TalkList: Array<DialogData>;
        let projectId = GameProjectManager.instance.currentGalData.id;
        let id = this.chapterSceneID();
        TalkList = this.GalChapterSceneTalkMap.get(projectId).get(id);
        let Talk = TalkList.findIndex(value => value.id == TalkId);
        if (Talk == -1) {
            console.log("当前数据不存在");
            return;
        }
        return Talk;
    }

    /**
     * 设定指定对话的语音
     * @param chapterId 
     * @param sceneId 
     * @param txtId 
     * @param voiceId 
     */
    public SetVoiceToTxt(chapterId: string, sceneId: string, txtId: string, voiceId: string) {
        let projectId = GameProjectManager.instance.currentGalData.id;
        DialogManagerRequest.Instance.SetVoiceToTxt(projectId, chapterId, sceneId, txtId, voiceId);
    }


    /**
     * 设定对话
     * @param chapterId 章节id
     * @param sceneId 场景id
     * @param dialog 对话
     */
    public SetDialog(chapterId: string, sceneId: string, dialog: string) {
        let projectId = GameProjectManager.instance.currentGalData.id;
        DialogManagerRequest.Instance.SetDialog(projectId, chapterId, sceneId, dialog);
    }

    /**
     * 设定大纲
     */
    public SetOutLine(chapterId: string, sceneId: string, outLine: string) {
        let projectId = GameProjectManager.instance.currentGalData.id;
        DialogManagerRequest.Instance.SetOutLine(projectId, chapterId, sceneId, outLine);
    }

    /**
     * 获取已有对话语音
     * @param chapterId 
     * @param sceneId 
     */
    public GetVoicesByDaiglog(chapterId: string, sceneId: string) {
        let projectId = GameProjectManager.instance.currentGalData.id;
        DialogManagerRequest.Instance.GetVoicesByDaiglog(projectId, chapterId, sceneId);
    }
}