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
import {SceneInfo} from "../Data/SceneInfo";
import {UiDataManager} from "PSDUI/UiDataManager";
import {BindKeyName} from "../Data/BindKeyName";
import {Step} from "../Data/Process/Step";
import {StepContext} from "../Data/StepContext";
import {StepType} from "../Data/Process/StepType";
import {ChapterInfo} from "../Data/ChapterInfo";
import {SceneManager} from "./SceneManager";
import {StepPares} from "../Data/Process/StepPares";
import { UIOpenOrHideManager } from "./UIOpenOrHideManager";
import { FrameMgr } from "Tools/FrameMgr";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { DialogDataEvent } from "../AutoCode/Net/DataEvents/DialogDataEvent";
import { DialogManagerRequest } from "../AutoCode/Net/ClientRequest/DialogManagerRequest";
import { GameProjectManager } from "./GameProjectManager";

export class EditorManager {

    public static get Instance() {
        return this._instance;
    }

    private static _instance: EditorManager = new EditorManager();

    private constructor() {

    }

    /**
     * 播放状态
     */
    public get isPlay(): boolean {
        return this._isPlay;
    }

    /**
     * 播放状态
     */
    public set isPlay(value: boolean) {
        this._isPlay = value;
        if (value) {
            //开始播放
            this.startPlay();
        } else {
            //结束播放
            this.exitPlay();
        }
    }

    /** 获取当前章节 */
    public get currChapter() {
        return this.currentContext.currScene.chapter;
    }

    /**
     * 当前打开的场景
     */
    public get currScene(): SceneInfo {
        return this.currentContext.currScene;
    }

    /**
     * 章节列表
     */
    public get chapterList() {
        return this._chapterList;
    }

    private _init: boolean = false;
    private _isPlay: boolean = false;
    //编辑器运行状态
    private _editorContext: StepContext = new StepContext();
    //运行状态上下文
    private _playContext: StepContext;
    private _startScene: SceneInfo;

    //章节列表
    private _chapterList: ChapterInfo[] = [];

    /** 获取当前上下文数据, 用于区分编辑和play状态数据 */
    public get currentContext() {
        if (this._isPlay) {
            if (!this._playContext) {
                this._playContext = new StepContext();
            }
            return this._playContext;
        }
        return this._editorContext;
    }

    /**
     * 初始化工程
     */
    public initProject() {
        if (this._init) {
            return;
        }
        this._init = true;

        WsDataManager.DialogDataData.addEventListener(DialogDataEvent.ChangeList, (data: { [key: string]: Entity.DialogData }) => {
            //UiDataManager.changeFunctionData(BindKeyName.OnSetDialogData, data);
            this.queueResult(data);
        });

        // let data = SceneManager.Instance.getTestDataList();
        // StepPares.parse(data);
    }

    /** 获取初始场景 */
    public getStartScene() {
        let chapterInfo = this._chapterList[0];
        if (chapterInfo) {
            return chapterInfo.sceneList[0];
        }
        return null;
    }

    /**
     * 执行下一步
     */
    public runNextStep() {
        if (!this.isPlay) {
            console.error("请在Play模式下调用nextStep()!");
            return;
        }
        let step = this.currentContext.currStep;
        if (step && step.nextStep) {
            this.setStepIndex(step.nextStep.index);
        } else {
            //跳转下一个场景
            if (!this.runChangeNextScene(this.currentContext.currScene)) {
                UiDataManager.changeFunctionData(BindKeyName.OnStepExecuteFinish, null);
            }
        }
    }

    /**
     * 执行上一步
     */
    public runPrevStep() {
        if (!this.isPlay) {
            console.error("请在Play模式下调用prevStep()!");
            return;
        }
        let currentContext = this.currentContext;
        let step = currentContext.currStep;
        let prevStep: Step = null;
        if (step.prevStep) {
            for (let i = step.prevStep.index; i >= 0; i--) {
                let item = currentContext.currScene.stepList[i];
                if (item.type == StepType.conversation) {
                    prevStep = item;
                    break;
                }
            }
        }
        if (prevStep) {
            this.setStepIndex(prevStep.index);
        } else {
            //跳转上一个场景
        }
    }

    public runRestart() {
        if (!this.isPlay) {
            console.error("请在Play模式下调用restart()!");
            return;
        }
        this.setStepIndex(0);
    }
    
    /**
     * 设置执行的步骤索引
     */
    public setStepIndex(index: number) {
        if (index >= this.currentContext.currScene.stepList.length) {
            console.error(`索引'${index}'超出范围!`);
            return;
        }
        let from = this.currentContext.currStep.index;
        if (from == index) {
            return;
        }
        this.currentContext.currStep = this.currentContext.currScene.stepList[index];
        this.jumpIndex(from, index);
    }

    /**
     * 获取当前执行步骤的索引
     */
    public getStepIndex(): number {
        return this.currentContext.currStep.index;
    }

    /**
     * 获取当前执行步骤最大索引
     */
    public getMaxStepIndex(): number {
        return this.currentContext.currScene.stepList.length - 1;
    }

    /**
     * 切换场景
     */
    public changeScene(scene: SceneInfo) {
        let flag = !this._isPlay && this.currentContext.currScene != null;
        if (flag) {
            this.clearScene();
        }
        this.currentContext.currStep = scene.stepList[0];
        this.currentContext.currScene = scene;
        this.currentContext.sceneIndex++;
        UiDataManager.changeFunctionData(BindKeyName.OnChangeScene, {scene,reset:false});//如果跳转到某场景 reset 需要为true
        if (this.currentContext.currStep) {
            this.runStep(this.currentContext.currStep);
        }
    }

    /**
     * 添加章节
     */
    public appendChapter(chapter: ChapterInfo) {
        let index = this._chapterList.findIndex(value => value.id == chapter.id);
        if (index != -1) {
            console.error("当前章节数据已经存在了!")
            return;
        }
        this._chapterList.push(chapter);
    }

    /**
     * 删除章节
     * @param chapterID 章节ID 
     * @returns 
     */
    public deleteChapter(chapterID: string) {
        let index = this._chapterList.findIndex(value => value.id == chapterID);
        if (index == -1) {
            console.error("章节数据不存在");
            return;
        }
        this._chapterList.splice(index, 1);
    }

   
    /**
     * 删除场景
     * @param chapterID 章节ID
     * @param sceneID 场景ID
     * @returns 
     */
    public deleteScene(chapterID: string, sceneID: string) {
        const chapter = this._chapterList.find(value => value.id == chapterID);
        if (chapter == null) {
            console.error("章节数据不存在");
            return;
        }
        const sceneIndex = chapter.sceneList.findIndex(value => value.id == sceneID);
        if (sceneIndex == -1) {
            console.error("场景数据不存在");
            return;
        }
        chapter.sceneList.splice(sceneIndex, 1);

    }

    /** 根据id获取章节 */
    public getChapterById(chapterId: string) {
        return this._chapterList.find(value => value.id == chapterId);
    }

    /** 根据名称获取章节 */
    public getChapterByName(chapterName: string) {
        return this._chapterList.find(value => value.chapterName == chapterName);
    }

    /** 获取当前章节下的场景 */
    public getSceneByName(sceneName: string): SceneInfo {
        return this.currChapter.getSceneByName(sceneName);
    }

    public dispose() {

    }

    //切换下一个场景
    private runChangeNextScene(currScene: SceneInfo): boolean {
        let chapter = currScene.chapter;
        let index = chapter.sceneList.indexOf(currScene);
        if (index < chapter.sceneList.length - 1) { //还有下一个场景
            let nextScene = currScene.getChapterNextScene();
            if (nextScene != null) { //下一个场景
                this.changeScene(nextScene);
                return true;
            }
        }
        index = this.chapterList.indexOf(chapter);
        if (index < 0) {
            return false;
        }
        index++;
        for (;index < this.chapterList.length; index++) {
            let nextChapter: ChapterInfo = this.chapterList[index];
            if (nextChapter != null) {
                for (let scene of nextChapter.sceneList) {
                    if (scene != null && scene.stepList.length > 0) {
                        this.changeScene(scene);
                        return true;
                    }
                }
            }
        }

        //结束
        return false;
    }

    //清理场景
    private clearScene() {
        UiDataManager.changeFunctionData(BindKeyName.OnChangeSound, null);
        UiDataManager.changeFunctionData(BindKeyName.OnChangeBackground, null);
        UiDataManager.changeFunctionData(BindKeyName.OnChangeStandingPainting, null);
        UiDataManager.changeFunctionData(BindKeyName.OnChangeConversation, null);
        UiDataManager.changeFunctionData(BindKeyName.OnChangeVoice, null);
        UiDataManager.changeFunctionData(BindKeyName.OnChangeConversationOptions, null);
    }

    //开始播放
    private startPlay() {
        UiDataManager.changeFunctionData(BindKeyName.OnPlay, null);
        this.changeScene(this.getStartScene());
    }

    //退出播放
    private exitPlay() {
        this.clearScene();
        UiDataManager.changeFunctionData(BindKeyName.OnExitPlay, null);
        this._playContext = null;
    }

    //执行下一步
    private runStep(step: Step) {
        this.currentContext.currStep = step;
        UiDataManager.changeFunctionData(BindKeyName.OnChangeStep, step.index);
        this.callStepRun(step);
    }

    //调用step的run函数
    private callStepRun(step: Step) {
        let currSceneIndex = this.currentContext.sceneIndex;
        step.run(() => {
            if (this.currentContext.sceneIndex != currSceneIndex) { //切换过场景
                console.log("检测到切换过场景")
            } else if (this.currentContext.currStep != step) { //跳转过索引
                console.log("检测到跳转过索引")
            } else {
                this.runNextSuccess(this.currentContext.currStep.nextStep);
            }
        });
    }

    //下一步执行完成
    private runNextSuccess(next: Step) {
        if (next) {
            //执行下一步
            this.runStep(next);
        } else {
            //跳转下一个场景
            let flag = this.runChangeNextScene(this.currentContext.currScene);
            if (!flag) {
                //所有步骤执行完成
                UiDataManager.changeFunctionData(BindKeyName.OnStepExecuteFinish, null);
            }
        }
    }

    //跳转索引
    private jumpIndex(from: number, to: number) {
        console.log("跳转索引: ", from, to);
        let start: number;
        let end: number;
        if (to > from) { //往后跳
            start = from;
            end = to;
        } else { //往前跳
            start = 0;
            end = to;
        }
        let stepList = this.currentContext.currScene.stepList;

        let tempMap: Map<StepType, boolean> = new Map();
        let endStep = stepList[end];
        if (endStep.jumpNeedRun) {
            tempMap.set(endStep.type, true);
        }

        let tempList: Step[] = [endStep];
        for (let i = end - 1; i >= start; i--) {
            let item = stepList[i];
            if (item.jumpNeedRun) {
                if (!tempMap.has(item.type)) {
                    tempMap.set(item.type, true);
                    tempList.push(item);
                }
            }
        }

        if (to <= from) { //往前跳需要特殊处理
            if (!tempMap.has(StepType.conversation)) {
                UiDataManager.changeFunctionData(BindKeyName.OnChangeConversation, null);
            }
            if (!tempMap.has(StepType.conversationOptions)) {
                UiDataManager.changeFunctionData(BindKeyName.OnChangeConversationOptions, null);
            }
            if (!tempMap.has(StepType.background)) {
                UiDataManager.changeFunctionData(BindKeyName.OnChangeBackground, null);
            }
            if (!tempMap.has(StepType.sound)) {
                UiDataManager.changeFunctionData(BindKeyName.OnChangeSound, null);
            }
            if (!tempMap.has(StepType.voice)) {
                UiDataManager.changeFunctionData(BindKeyName.OnChangeVoice, null);
            }
            if (!tempMap.has(StepType.standingPainting)) {
                UiDataManager.changeFunctionData(BindKeyName.OnChangeStandingPainting, null);
            }
        }

        tempList.reverse();
        for (let i = 0; i < tempList.length; i++) {
            if (i == tempList.length - 1) {
                this.callStepRun(tempList[i]);
            } else {
                tempList[i].run(() => { });
            }
        }
    }

    //----------------------------------------------------------------------
    private _queueSceneList: SceneInfo[] = [];

    public initChapterSceneStep() {
        for (let chapter of this._chapterList) {
            for (let scene of chapter.sceneList) {
                this._queueSceneList.push(scene);
            }
        }
        if (this._queueSceneList.length > 0) {
            let temp = this._queueSceneList[0];
            this.requestDaiglogData(temp);
        }
    }

    private queueResult(data: { [key: string]: Entity.DialogData }) {
        let item = this._queueSceneList.shift();
        if (item != null) {
            if (data != null) {
                let list: Entity.DialogData[] = [];
                for (let key in data) {
                    let item = data[key];
                    list.push(item);
                }
                item.createStepByDialogList(list);
            } else {
                item.createStepByDialogList([]);
            }
            if (this._queueSceneList.length > 0) {
                let temp = this._queueSceneList[0];
                this.requestDaiglogData(temp);
            }
        }
    }

    private requestDaiglogData(sceneInfo: SceneInfo) {
        //请求对话数据
        DialogManagerRequest.Instance.GetVoicesByDaiglog(GameProjectManager.instance.currentGalData.id, sceneInfo.chapter.id, sceneInfo.id);
    }

    //------------------------------ test ----------------------------------

    public runTestPlay() {

        UIOpenOrHideManager.Instance.OpenGameUiView();

        //---------------------------
        UiDataManager.bindFunctionData(BindKeyName.OnPlay, () => {
            console.log("播放游戏");
        })
        UiDataManager.bindFunctionData(BindKeyName.OnExitPlay, () => {
            console.log("退出播放游戏");
        })
        UiDataManager.bindFunctionData(BindKeyName.OnStepExecuteFinish, () => {
            console.log("所有对话执行完成!");
            this.isPlay = false;
            //this.isPlay = true;
        });
        let list = SceneManager.Instance.getTestDataList();
        StepPares.parse(list);
        
        setTimeout(() => {
            //开始播放
            this.isPlay = true;
            //this.setStepIndex(7);
        }, 1000)
    }


}