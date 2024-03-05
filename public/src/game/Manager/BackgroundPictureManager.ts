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
import { BackGroundData } from "BackGroundData";
import { cMap } from "Data/Map";
import { BackGroundImageManagerRequest } from "../AutoCode/Net/ClientRequest/BackGroundImageManagerRequest";
import { BackGroundDataEvent } from "../AutoCode/Net/DataEvents/BackGroundDataEvent";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { ChapterSceneDirectoryManager } from "./ChapterSceneDirectoryManager";
import { GameProjectManager } from "./GameProjectManager";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "../Data/BindKeyName";

export class PictureData {
    content: string; //对话内容
    imageName: string; //背景图片名称
    imageDescription: string; //背景图片描述
    image: string; //背景图片
}

export class BackgroundPictureData {
    background: BackGroundData;
    pictureBool: boolean;
}

export class BackgroundPictureManager {
    public static get Instance(): BackgroundPictureManager {
        if (this._instance == null) {
            this._instance = new BackgroundPictureManager();
        }
        return this._instance;
    }

    private static _instance: BackgroundPictureManager;
    public backgrounPicture: PictureData;
    /**当前图片id */
    public backGroundId: string;
    /**当前场景的背景图片列表 */
    // public backgrounPictureList: Array<BackGroundData>;
    private GalChapterScenePictureMap: cMap<cMap<Array<BackgroundPictureData>>> = new cMap<cMap<Array<BackgroundPictureData>>>();
    private binder: FunctionBinder;

    private constructor() {

    }
    public init() {
        this.backgrounPicture = new PictureData();
        WsDataManager.BackGroundDataData.addEventListener(BackGroundDataEvent.All, this.BackGroundDataFun.bind(this));
        this.binder = UiDataManager.bindFunctionData(BindKeyName.getGalDataById, this.initBackgroundData.bind(this));
    }

    public BackGroundDataFun(data: BackGroundData) {
        this.addBackgrounPictureData(data);
    }

    private initBackgroundData() {
        this.GetAllBackGround();
    }

    public dispose(): void {
        this.backgrounPicture = null;
        this.GalChapterScenePictureMap.clear();
        this.GalChapterScenePictureMap = null;

        UiDataManager.unBindFunctionDataByBinder(this.binder);
    }


    public getbackgrounPictureList() {
        let projectId = GameProjectManager.instance.currentGalData.id
        let sceneData = this.GalChapterScenePictureMap.get(projectId);
        let id = this.chapterSceneID();
        if (sceneData) {
            let data = sceneData.get(id);
            if (!data) {
                data = [];
                sceneData.set(id, data);
            }
            return data;
        }
        return [];
    }

    /**
     * 初始化数据
     */
    public addgalChpaterScene(background: BackGroundData) {
        let id = background.chapter + "_" + background.scene;
        let projectId = GameProjectManager.instance.currentGalData.id;
        if (!this.GalChapterScenePictureMap.has(projectId)) {
            let sceneArray = new cMap<Array<BackgroundPictureData>>();
            let backgrounArray = new Array<BackgroundPictureData>();
            sceneArray.set(id, backgrounArray)
            this.GalChapterScenePictureMap.set(projectId, sceneArray)
        } else {
            let chapterScene = this.GalChapterScenePictureMap.get(projectId);
            if (!chapterScene.has(id)) {
                let backgrounArray = new Array<BackgroundPictureData>();
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
     * 添加背景图数据
     * @param background 
     * @returns 
     */
    public addBackgrounPictureData(background: BackGroundData) {
        this.addgalChpaterScene(background);
        let backgrounPictureList: Array<BackgroundPictureData>;
        let projectId = GameProjectManager.instance.currentGalData.id;
        let id = background.chapter + "_" + background.scene;
        backgrounPictureList = this.GalChapterScenePictureMap.get(projectId).get(id);
        let index = backgrounPictureList.findIndex(value => value.background.id == background.id);
        if (index != -1) {
            console.log("当前背景图数据已经存在了!");
            let Picture = backgrounPictureList.find(value => value.background.id == background.id);
            if (Picture) {
                Picture.background.BGName = background.BGName;
                Picture.background.resPath = background.resPath;
                Picture.background.backStory = background.backStory;
            }
            return;
        }
        let backgroundPicture = new BackgroundPictureData();
        backgroundPicture.background = background;
        backgroundPicture.pictureBool = false;
        backgrounPictureList.push(backgroundPicture);
    }

    /**
     * 获取背景图数据
     */
    public getBackgrounPictureData(backGroundId: string) {
        let backgrounPictureList: Array<BackgroundPictureData>;
        let projectId = GameProjectManager.instance.currentGalData.id;
        let id = this.chapterSceneID();
        if (!this.GalChapterScenePictureMap.has(projectId)) {
            console.log("没有数据")
            return
        }
        backgrounPictureList = this.GalChapterScenePictureMap.get(projectId).get(id);
        let background = backgrounPictureList.find(value => value.background.id == backGroundId);
        if (background == null) {
            console.log("当前背景图数据不存在");
            return;
        }
        return background;
    }


    /**
     * 删除背景图数据
     */
    public deleteBackgrounPictureData(backGroundId: string) {
        let backgrounPictureList: Array<BackgroundPictureData>;
        let projectId = GameProjectManager.instance.currentGalData.id;
        let id = this.chapterSceneID();
        backgrounPictureList = this.GalChapterScenePictureMap.get(projectId).get(id);
        let background = backgrounPictureList.findIndex(value => value.background.id == backGroundId);
        if (background == -1) {
            console.log("当前背景图数据不存在");
            return;
        }
        return background;
    }

    /**
     * 选中该背景图为场景背景图
     * @param backgroundID 背景图ID
     */
    public selectedBackgrounPictureData(backgroundID: string) {
        let backgrounPictureList: Array<BackgroundPictureData>;
        let projectId = GameProjectManager.instance.currentGalData.id;
        let id = this.chapterSceneID();
        backgrounPictureList = this.GalChapterScenePictureMap.get(projectId).get(id);

        let pictrueData = backgrounPictureList.find(value=>value.pictureBool == true);
        if(pictrueData){
            pictrueData.pictureBool = false;
        }
        let background = backgrounPictureList.find(value => value.background.id == backgroundID);
        if (background == null) {
            console.log("当前背景图数据不存在");
            return;
        }
        background.pictureBool = true;
    }


    /**
     * 获取已有的背景图
     * @param backGroundId 背景图ID
     */
    public GetBackGround(backGroundId: string) {
        let projectId = GameProjectManager.instance.currentGalData.id
        BackGroundImageManagerRequest.Instance.GetBackGround(projectId, backGroundId);
    }

    /**
     * 获取所有的背景图
     */
    public GetAllBackGround() {
        let projectId = GameProjectManager.instance.currentGalData.id
        BackGroundImageManagerRequest.Instance.GetAllBackGround(projectId);
    }

    /**
     * 设定场景的背景描述
     * @param chapterId 章节id
     * @param SceneId 场景id
     * @param content 背景描述
     */
    public SetBackGroundByScene(chapterId: string, SceneId: string, content: string,) {
        let projectId = GameProjectManager.instance.currentGalData.id
        BackGroundImageManagerRequest.Instance.SetBackGroundByScene(projectId, chapterId, SceneId, content);
    }


    /**
     * 设定场景的背景
     * @param chapterId 
     * @param SceneId 
     * @param imageId 
     */
    public SetBackGroundImageByScene(chapterId: string, SceneId: string, imageId: string) {
        let projectId = GameProjectManager.instance.currentGalData.id
        BackGroundImageManagerRequest.Instance.SetBackGroundImageByScene(projectId, chapterId, SceneId, imageId);
    }
}