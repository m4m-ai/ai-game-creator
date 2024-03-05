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

import { GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { SceneInfo } from "Data/SceneInfo";
import { AIResourceManager } from "Manager/AIResourceManager";
import { ChapterSceneDirectoryManager, ChapterSceneType } from "Manager/ChapterSceneDirectoryManager";
import { CharacterFactionType } from "Manager/CharacterSettingManager";
import { PlayerGuideManager } from "Manager/PlayerGuideManager";
import { UiNames } from "Manager/UIData/UiNames";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { UiManager } from "PSDUI/UiManager";
import { ChapterSceneMenu } from "./ChapterSceneMenu";
import { ChapterSceneMenuCell } from "./ChapterSceneMenuCell";
import { ChapterSceneMenuView } from "./ChapterSceneMenuView";

export class SceneMenuCell implements ICellHandler {
    public nowClass: ChapterSceneMenu.chapterbg2;
    public index: number;
    public config: GridConfig;
    public cellData: SceneInfo;
    public onInit(): void {
        this.nowClass.edit_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.EditBtnFun, this);
        this.nowClass.new2bg.new2_lab.label.text = "新建场景"
    }
    public onSetData(value: SceneInfo): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;
            this.nowClass.chaptername1_lab.label.text = value.sceneName;
            this.nowClass.new2bg.transform.visible = true;
            this.nowClass.edit_btn.transform.visible = false;
            this.nowClass.file_img.transform.visible = false;
            switch (ChapterSceneMenuView.Instance.openType) {
                case ChapterSceneType.ChpaterSceneType:
                case ChapterSceneType.ChapterType:
                case ChapterSceneType.AIPictrueResoure:
                case ChapterSceneType.AITalkResource:
                case ChapterSceneType.SceneType :
                    if (value.sceneName != "") {
                        this.nowClass.new2bg.transform.visible = false;
                        this.nowClass.edit_btn.transform.visible = true;
                        this.nowClass.file_img.transform.visible = true;
                    }
                    break;
            }
            this.nowClass.section2_img.transform.visible = false;
            if (ChapterSceneMenuView.Instance.openType == ChapterSceneType.SceneType && value.sceneName == "") {
                this.nowClass.transform.visible = false;
            }
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    public onSetLastPosData?(): void {

    }
    public onClick?(): void {
        let index = ChapterSceneMenuView.Instance.index;

        let data = ChapterSceneMenuView.Instance.grid.getCell<ChapterSceneMenuCell>(index);

        data.totalTransHideFun();
        //console.log("onClick---");
        if (this.cellData.sceneName == "") {
            ChapterSceneMenuView.Instance.viewData.setCommonPoupData("新建场景", "场景名", (res) => {
                let scene = data.cellData.sceneList;
                let sceneData = data.cellData.sceneList[scene.length - 2];
                let sceneinfo = ChapterSceneMenuView.Instance.viewData.appendScene(res, data.cellData, sceneData);
                data.grid.addByIndex(data.grid.length - 1, sceneinfo);
                data.ShowScene(false, false);
                data.grid.forEachCell<SceneMenuCell>((cell) => {
                    let top = m4m.framework.layoutOption.TOP;
                    let topValue = cell.nowClass.transform.getLayoutValue(top);
                    cell.nowClass.transform.setLayoutValue(top, topValue + 100);
                    cell.nowClass.transform.markDirty()
                });
            });
        }

    }

    public onPointDown?(): void {
        // console.log("onPointDown---");
        let openType = ChapterSceneMenuView.Instance.openType
        if (openType == ChapterSceneType.AITalkResource) {
            ChapterSceneDirectoryManager.Instance.SceneData = this.cellData;
            if (!PlayerGuideManager.isNewGuideBol) {
                AIResourceManager.openUIname = UiNames.ChapterSceneMenu;
                AIResourceManager.closeUIname = UiNames.SceneTalk;
            }
            UIOpenOrHideManager.Instance.HideChapterSceneMenuView();
            UIOpenOrHideManager.Instance.OpenSceneTalkView(false, this.cellData);
        }

        if (openType == ChapterSceneType.AIPictrueResoure) {
            ChapterSceneDirectoryManager.Instance.SceneData = this.cellData;
            if (!PlayerGuideManager.isNewGuideBol) {
                AIResourceManager.openUIname = UiNames.ChapterSceneMenu;
                AIResourceManager.closeUIname = UiNames.CharacterSetting;
            }
            UIOpenOrHideManager.Instance.HideChapterSceneMenuView();
            UIOpenOrHideManager.Instance.OpenSpreadingPlateView("AI资源库");
            setTimeout(() => {
                UiManager.showUi(UiNames.CharacterSetting, CharacterFactionType.backgroundPicture);
            }, 50);
        }
    }

    public onPointEnter?(): void {

    }
    public onSelect?(): void {
        let openType = ChapterSceneMenuView.Instance.openType
        if (openType != ChapterSceneType.AIPictrueResoure && openType != ChapterSceneType.AITalkResource) {
            if (this.cellData.sceneName != "") {
                this.nowClass.sectionbg1.transform.visible = false;
                this.nowClass.section2_img.transform.visible = true;
                ChapterSceneMenuView.Instance.viewData.SceneData = this.cellData;
            }
        }
    }
    public onUnSelect?(): void {
        let openType = ChapterSceneMenuView.Instance.openType
        if (openType != ChapterSceneType.AIPictrueResoure && openType != ChapterSceneType.AITalkResource) {
            this.nowClass.sectionbg1.transform.visible = true;
            this.nowClass.section2_img.transform.visible = false;
        }
    }
    public onDispose?(): void {

    }

    public EditBtnFun() {
        let index = ChapterSceneMenuView.Instance.index;
        let data = ChapterSceneMenuView.Instance.grid.getCell<ChapterSceneMenuCell>(index);
        data.totalTransHideFun();
        data.OpenTipPanelScene(this.index);
    }

}