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
import { ChapterManagerRequest } from "../AutoCode/Net/ClientRequest/ChapterManagerRequest";
import { SceneInfo } from "../Data/SceneInfo";
import { ExcelManagerRequest } from "../AutoCode/Net/ClientRequest/ExcelManagerRequest";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { ChapterDataEvent } from "../AutoCode/Net/DataEvents/ChapterDataEvent";
import { GameProjectManager } from "./GameProjectManager";
import { SceneDataEvent } from "../AutoCode/Net/DataEvents/SceneDataEvent";
import { ChapterData } from "ChapterData";
import { SceneData } from "SceneData";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "../Data/BindKeyName";
import { ChapterInfo } from "../Data/ChapterInfo";
import { EditorManager } from "./EditorManager";
import { BackgroundPictureManager } from "./BackgroundPictureManager";
import { VoiceBase } from "VoiceBase";
import { cMap } from "Data/Map";

/**不同路径打开章节场景目录显示不一样 */
export enum ChapterSceneType {
    /**ai引导创建章节创建类型/故事模式 */
    ChapterType,
    /**ai引导选择场景类型 /故事模式*/
    SceneType,
    /**ai资源库场景对话类型 */
    AITalkResource,
    /**ai导航栏类型 */
    ChpaterSceneType,
    /**ai资源库背景图片类型 */
    AIPictrueResoure
}
export class ChapterSceneDirectoryManager {

    public static get Instance(): ChapterSceneDirectoryManager {
        if (this._instance == null) {
            this._instance = new ChapterSceneDirectoryManager();
        }
        return this._instance;
    }

    private static _instance: ChapterSceneDirectoryManager;

    /** 当前选中的场景 */
    public SceneData: SceneInfo;

    public maleList: VoiceBase[] = []

    public femaleList: VoiceBase[] = []

    private constructor() {

    }
    public init() {
        WsDataManager.ChapterDataData.addEventListener(ChapterDataEvent.All, this.chapterData.bind(this));
        WsDataManager.SceneDataData.addEventListener(SceneDataEvent.All, this.sceneData.bind(this));
        UiDataManager.bindFunctionData(BindKeyName.getGalDataById, this.galDataby);

        VoiceBase.getAllDataCallBack((data: cMap<VoiceBase>) => {
            console.log(data);
            data.forEach((res) => {
                if (res.Gender == 0) {
                    this.maleList.push(res)
                } else if (res.Gender == 1) {
                    this.femaleList.push(res);
                }
            })
        })
    }

    public galDataby(result: Entity.GalData) {
        console.log("galdataby", result);
        for (let index = 0; index < result.chapters.length; index++) {
            const id = result.chapters[index];
            const chapterName = result.chaptersName[index];
            const Chapter: ChapterInfo = new ChapterInfo(id.toString(), chapterName);
            const sceneID = result.chapterScenes[id];
            const sceneName = result.chapterScenesName[id];
            for (let index = 0; index < sceneID.length; index++) {
                const id = sceneID[index];
                const name = sceneName[index];
                if (id && name) {
                    const scene = new SceneInfo(id, name);
                    Chapter.appendScene(scene);
                }
            }
            EditorManager.Instance.appendChapter(Chapter);
        }
        EditorManager.Instance.initChapterSceneStep();
        for (const key in result.BackGrounds) {
            const element = result.BackGrounds[key];
            if (element) {
                BackgroundPictureManager.Instance.GetBackGround(element);
            }
        }
    }

    public chapterData(data) {
        // console.log(data);
    }

    public sceneData(data) {
        // console.log(data);
    }

    public dialogDataFun(data) {
        console.log("dialogData", data);
    }



    /**
     * 设定全游戏章节信息   
     * @param chapters 章节列表
     * @param scenes 场景列表
     */
    public SetChapters(chapters: ChapterData[], scenes: SceneData[]) {
        let projectId = GameProjectManager.instance.currentGalData.id
        let chaptedata = JSON.stringify(chapters);
        let scenedata = JSON.stringify(scenes);
        ChapterManagerRequest.Instance.SetChapters(projectId, chaptedata, scenedata);
    }

    /**
     * @param value 添加chapterData数据
     */
    public addChapterDataData(chapterId, value: ChapterData) {
        let projectId = GameProjectManager.instance.currentGalData.id
        let chapter = JSON.stringify(value);
        ChapterManagerRequest.Instance.SetChapter(projectId, chapterId, chapter);
    }


    /**
     * 删除章节
     * @param chapterID 章节id
     */
    public removeChapterDataData(chapterID: string) {
        ExcelManagerRequest.Instance.removeChapterDataData(chapterID);
    }

    /**
     * 通过ID获取ChapterData数据
     * @param chapterID 章节id
     */
    public ChapterDataDataById(chapterID) {
        let projectId = GameProjectManager.instance.currentGalData.id
        ChapterManagerRequest.Instance.GetChapter(projectId, chapterID);
    }

    public SetScene(chapterId: string, sceneId: string, chapter: string) {
        let projectId = GameProjectManager.instance.currentGalData.id
        ChapterManagerRequest.Instance.SetScene(projectId, chapterId, sceneId, chapter);
    }

    /**
     *  通过ID获取SceneData数据
     * @param sceneID 
     */
    public SceneDataDataById(sceneID) {
        ExcelManagerRequest.Instance.SceneDataDataById(sceneID);
    }

    public dispose(): void {
        this.SceneData = null;
    }

    public uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23];

        var uuid = s.join("");
        return uuid;
    }
}

export class ChpaterSceneTypeData {
    CenterDisplayBol: boolean
    chapterSceneUItype: ChapterSceneType
}