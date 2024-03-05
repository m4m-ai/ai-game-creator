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
import { ChapterData } from "ChapterData";
import { BindKeyName } from "Data/BindKeyName";
import { ChapterInfo } from "Data/ChapterInfo";
import { cMap } from "Data/Map";
import { SceneInfo } from "Data/SceneInfo";
import { ViewBaseData } from "Data/ViewBaseData";
import { ChapterSceneDirectoryManager } from "Manager/ChapterSceneDirectoryManager";
import { CommonPoupManager } from "Manager/CommonPoupManager";
import { EditorManager } from "Manager/EditorManager";
import { GameProjectManager } from "Manager/GameProjectManager";
import { UiNames } from "Manager/UIData/UiNames";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { ManipulatebubblesView } from "ManipulatebubblesView";
import { UiDataManager } from "PSDUI/UiDataManager";
import { UiManager } from "PSDUI/UiManager";
import { SceneData } from "SceneData";
import { ChapterSceneMenuCell } from "./ChapterSceneMenuCell";
import { ChapterSceneMenuView } from "./ChapterSceneMenuView";

export class ChapterSceneMenuViewData implements ViewBaseData {
    //当前选中场景数据
    public SceneData: SceneInfo;
    public TransDic: cMap<ManipulatebubblesView> = new cMap<ManipulatebubblesView>();
    private changeBasicUIposition: Function;
    private onRefreshChapterFun: Function;
    public constructor() {
        // ChapterSceneDirectoryManager.Instance.init();
        this.changeBasicUIposition = this.CenterDisplayBol.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.ChapterSceneMenuByAI, this.changeBasicUIposition);
        this.onRefreshChapterFun = this.onRefreshChapterFunBind.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.OnRefreshChapter, this.onRefreshChapterFun)
    }
    public totalTransHideFun() {
        this.TransDic.forEach((v, k) => {
            v.hide();
        });
        this.TransDic.clear();
    }

    public onRefreshChapterFunBind() {
        ChapterSceneMenuView.Instance.setGridListDataFun(this.getChapterSceneData());
    }
    public getChapterSceneData() {
        return EditorManager.Instance.chapterList;
    }
    /**
      * 删除场景
      */
    public DeleteScene(chapterID: string, sceneID: string) {
        EditorManager.Instance.deleteScene(chapterID, sceneID);
    }

    /**
     * 删除章节
     * @param deleteIndex 
     */
    public DeleteChapter(chapterID: string) {
        EditorManager.Instance.deleteChapter(chapterID);
    }

    /**
     * 添加章节
     * @param chapterName 章节名称
     * @param ChapterData 章节数据
     */
    public appendChapter(chapterName: string, ChapterData: ChapterInfo): ChapterInfo {
        let id = ChapterSceneDirectoryManager.Instance.uuid();
        let Chapter: ChapterInfo = new ChapterInfo(id.toString(), chapterName);
        EditorManager.Instance.appendChapter(Chapter);
        return Chapter;
    }

    /**
     * 添加场景
     * @param sceneName 场景名称
     * @param chapterData 章节数据
     * @param sceneData 场景数据
     */
    public appendScene(sceneName: string, chapterData: ChapterInfo, sceneData: SceneInfo): SceneInfo {
        let id = ChapterSceneDirectoryManager.Instance.uuid();
        let scene: SceneInfo = new SceneInfo(id.toString(), sceneName);
        chapterData.appendScene(scene);
        return scene;
    }

    /**
     * 修改章节
     * @param chapterName 章节名称
     * @param chapterData 章节数据
     */
    public updateChapter(chapterName: string, chapterData: ChapterInfo) {
        let chapter = EditorManager.Instance.getChapterById(chapterData.id);
        chapter.updateChapterName(chapterName);
    }

    /**
     * 修改场景名称
     * @param scenenName 场景名称
     * @param SceneData 场景数据
     */
    public updateScene(scenenName: string, SceneData: SceneInfo) {
        SceneData.updateSceneName(scenenName);
    }


    public saveChapter() {
        let id = "";
        if (GameProjectManager.instance.currentGalData.id != "") {
            id = GameProjectManager.instance.currentGalData.id;
        }
        let chapter = this.getChapterSceneData();
        let chapterData: ChapterData[] = [];
        let sceneData: SceneData[] = [];
        for (const iterator of chapter) {
            if (iterator.chapterName) {
                let data: ChapterData = new ChapterData();
                data.galID = id;
                data.ChapterName = iterator.chapterName;
                data.id = iterator.id;
                let scenelist: string[] = [];
                let sceneName: string[] = [];
                for (const scene of iterator.sceneList) {
                    if (scene.sceneName) {
                        scenelist.push(scene.id);
                        sceneName.push(scene.sceneName);
                        let data: SceneData = new SceneData();
                        data.ChapterId = iterator.id;
                        data.Dialogs = [];
                        data.galID = id;
                        data.id = scene.id;
                        data.sceneName = scene.sceneName;
                        data.storyOutLine = "";
                        sceneData.push(data);
                    }
                }
                data.scenes = scenelist;
                data.scensName = sceneName;
                data.storyOutLine = "";
                chapterData.push(data);
            }
        }

        ChapterSceneDirectoryManager.Instance.SetChapters(chapterData, sceneData);
    }


    public OpenTipPanel(index: number) {
        let cell = ChapterSceneMenuView.Instance.grid.getCell(index) as ChapterSceneMenuCell;
        UiManager.getUIByName(UiNames.Manipulatebubbles, cell.nowClass.sectionbg3_img.edit1_btn.transform, (uiObj) => {
            uiObj.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, -180);
            uiObj.transform.setLayoutValue(m4m.framework.layoutOption.TOP, -40);
            uiObj.transform.markDirty();
            let trans = uiObj as ManipulatebubblesView;
            trans.deleteCallBackFun = () => {
                this.setCommonPoupdelete("删除", "您确定要删除" + cell.cellData.chapterName + "吗?", () => {
                    this.DeleteChapter(cell.cellData.id);
                    ChapterSceneMenuView.Instance.setGridListDataFun(this.getChapterSceneData());
                });
            }
            trans.reSetCallBackFun = () => {
                console.log("游戏列表重新编辑回调，弹出重命名游戏弹窗");
                this.setCommonPoupData("重命名", "章节名", (res) => {
                    this.updateChapter(res, cell.cellData);
                    ChapterSceneMenuView.Instance.setGridListDataFun(this.getChapterSceneData());
                });
            }
            this.TransDic.set(index, trans);
        });
    }

    /**
     * 
     * @param titleStr 弹窗标题
     * @param firstInputTitle 输入框标题文字
     */
    public setCommonPoupData(titleStr: string, firstInputTitle: string, fun: Function) {
        CommonPoupManager.instance.openCommonPopupFun({
            titleStr, leftBtnBol: true, rightBtnBol: true, leftbtnStr: "取消", rightbtnStr: "保存", firstInputTitle,
            showDescribBol: true, showFirstInputFiledBol: true,
            leftBtnCallBack: () => {
                console.log("左侧按钮回调");
                UIOpenOrHideManager.Instance.HideBottomslabView();
            },
            rightBtnCallBack: (res) => {
                console.log("右侧按钮回调  保存");
                if (res) {
                    fun(res);
                    UIOpenOrHideManager.Instance.HideBottomslabView();
                } else {
                    console.log("没有输入" + titleStr);
                }
            }
        });
    }

    public setCommonPoupdelete(titleStr: string, describeStr: string, fun: Function) {
        CommonPoupManager.instance.openCommonPopupFun({
            titleStr, leftBtnBol: true, rightBtnBol: true, leftbtnStr: "取消", rightbtnStr: "确定删除",
            showDescribBol: true, describeStr,
            leftBtnCallBack: () => {
                console.log("左侧按钮回调");
                UIOpenOrHideManager.Instance.HideBottomslabView();
            },
            rightBtnCallBack: () => {
                console.log("右侧按钮回调  保存");
                fun();
                UIOpenOrHideManager.Instance.HideBottomslabView();
            }
        });
    }

    public posIndex() {
        let totalWidth = ChapterSceneMenuView.Instance.bg.transform.width;
        let uiWidth = ChapterSceneMenuView.Instance.bg2.transform.width;
        console.log("totalWidth  ", totalWidth, "  uiWidth  ", uiWidth);
        let posX = (totalWidth - uiWidth) / 2;
        return posX;
    }


    public CenterDisplayBol(CenterDisplayBol: boolean) {
        ChapterSceneMenuView.Instance.CenterDisplayBol = CenterDisplayBol;
        if (CenterDisplayBol) {
            const posX = this.posIndex();
            ChapterSceneMenuView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
            ChapterSceneMenuView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            ChapterSceneMenuView.Instance.bg2.transform.markDirty();
        } else {
            if (GameProjectManager.isInEditorBol) {
                ChapterSceneMenuView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
                ChapterSceneMenuView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
                ChapterSceneMenuView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
                ChapterSceneMenuView.Instance.bg2.transform.markDirty();
            } else {
                ChapterSceneMenuView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
                ChapterSceneMenuView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
                ChapterSceneMenuView.Instance.bg2.transform.markDirty();
            }
        }
    }


    public dispose() {
        UiDataManager.unBindFunctionData(BindKeyName.ChapterSceneMenuByAI, this.changeBasicUIposition);
        UiDataManager.unBindFunctionData(BindKeyName.OnRefreshChapter, this.onRefreshChapterFun)
    }
}