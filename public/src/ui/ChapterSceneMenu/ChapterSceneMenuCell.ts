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
import { GridConfig, GridExtend } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { ChapterSceneMenuView } from "./ChapterSceneMenuView";
import { ChapterSceneType } from "Manager/ChapterSceneDirectoryManager";
import { ChapterSceneMenu } from "./ChapterSceneMenu";
import { UiManager } from "PSDUI/UiManager";
import { UiNames } from "Manager/UIData/UiNames";
import { SceneMenuCell } from "./SceneMenuCell";
import { ManipulatebubblesView } from "ManipulatebubblesView";
import { ChapterInfo } from "Data/ChapterInfo";
import { SceneInfo } from "Data/SceneInfo";
import { cMap } from "Data/Map";

export class ChapterSceneMenuCell implements ICellHandler {
    public config: GridConfig;
    public cellData: ChapterInfo;
    public nowClass: ChapterSceneMenu.chapterbg1;
    public index: number;
    public grid: GridExtend<ChapterSceneMenu.chapterbg2, any>;
    public TransDic: cMap<ManipulatebubblesView> = new cMap<ManipulatebubblesView>();
    public bool: boolean;

    public onInit(): void {
        this.nowClass.sectionbg3_img.arrowb_img.transform.visible = false;
        this.nowClass.sectionbg3_img.edit1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.EditBtnFun, this);
        this.nowClass.new1_lab.label.text = "新建章节";
        this.grid = new GridExtend<ChapterSceneMenu.chapterbg2>(
            this.nowClass.chapterbg2, SceneMenuCell, {
            columns: 1,
            rows: 10,
            offsetY: 0,
            offsetX: 0,
            isDynamic: true,
        });
        this.grid.enableScroll = true;
    }

    public totalTransHideFun() {
        this.TransDic.forEach((v, k) => {
            v.hide();
        });
    }

    public onSetData(value: ChapterInfo): void {
        if (value) {
            this.cellData = value;
            this.nowClass.sectionbg3_img.chaptername_lab.label.text = value.chapterName;
            this.setGridListDataFun(value.sceneList);
            this.nowClass.new1_lab.transform.visible = false;
            this.nowClass.sectionbg3_img.transform.visible = true;
            this.nowClass.transform.visible = true;
            if (this.bool) {
                this.grid.visible = this.bool;
            } else {
                this.grid.visible = false;
            }
            if (ChapterSceneMenuView.Instance.openType == ChapterSceneType.ChapterType && value.chapterName == "") {
                this.nowClass.sectionbg3_img.transform.visible = false;
                this.nowClass.new1_lab.transform.visible = true;
            }

            if (ChapterSceneMenuView.Instance.openType == ChapterSceneType.ChpaterSceneType && value.chapterName == "") {
                this.nowClass.sectionbg3_img.transform.visible = false;
                this.nowClass.new1_lab.transform.visible = true;
            }
            if (ChapterSceneMenuView.Instance.openType == ChapterSceneType.SceneType && value.chapterName == "") {
                this.nowClass.transform.visible = false;
            }
        } else {
            this.nowClass.transform.visible = false;
        }
    }

    public onSetLastPosData?(): void {
        // console.log("onSetLastPosData");
    }

    public setGridListDataFun(list: Array<SceneInfo>) {
        if (!list) {
            return;
        }
        let data: any[] = Object.assign(list);
        let res = data.find(value => value.sceneName == "");
        if (!res) {
            let num = (80002 + this.index).toString();
            let sceneIndex = data.findIndex(value => value.id == num);
            if (ChapterSceneMenuView.Instance.openType == ChapterSceneType.ChapterType || ChapterSceneMenuView.Instance.openType == ChapterSceneType.ChpaterSceneType) {
                if (data && data.length >= 0) {
                    let ChapterData = data.find(value => value.id == num);
                    if (ChapterData == null) {
                        let chapter = { id: num, sceneName: "" }
                        data.push(chapter);
                    }
                }
            } else {
                if (sceneIndex != -1) {
                    data.splice(sceneIndex, 1);
                }
            }
        } else {
            let num = (80002 + this.index).toString();
            let sceneIndex = data.findIndex(value => value.id == num);
            if (ChapterSceneMenuView.Instance.openType != ChapterSceneType.SceneType) {
                if (sceneIndex != -1) {
                    data.splice(sceneIndex, 1);
                    let chapter = { id: num, sceneName: "" }
                    data.push(chapter);
                }
            } else {
                if (sceneIndex) {
                    data.splice(sceneIndex, 1);
                }
            }
        }
        this.grid.removeAll();
        this.grid.setDataList(list);
        this.grid.forEachCell<SceneMenuCell>((cell) => {
            let top = m4m.framework.layoutOption.TOP;
            let topValue = cell.nowClass.transform.getLayoutValue(top);
            cell.nowClass.transform.setLayoutValue(top, topValue + 100);
            cell.nowClass.transform.markDirty()
        });
    }

    public onClick() {
        // console.log("onClick");
        const g_this = ChapterSceneMenuView.Instance;
        this.totalTransHideFun();
        g_this.DisposeGrid();
        this.config.viewData.totalTransHideFun();
        if (this.cellData.chapterName != "") {
            if (!this.cellData.sceneList && this.cellData.sceneList.length == 0) { return; }
            if (this.nowClass.sectionbg3_img.arrowb_img.transform.visible) {
                this.nowClass.sectionbg3_img.arrowb_img.transform.visible = false;
                this.nowClass.sectionbg3_img.arrowt_img.transform.visible = true;
                this.hideScene(this);
            } else {
                this.nowClass.sectionbg3_img.arrowb_img.transform.visible = true;
                this.nowClass.sectionbg3_img.arrowt_img.transform.visible = false;
                this.ShowScene(true, false);
            }
        } else {
            this.config.viewData.setCommonPoupData("新建章节", "章节名", (res) => {
                const index = this.config.viewData.getChapterSceneData();
                const chapter = this.config.viewData.getChapterSceneData()[index.length - 2];
                const chapterData = this.config.viewData.appendChapter(res, chapter);
                g_this.grid.addByIndex(g_this.grid.length - 1, chapterData);
                this.sceneLastPosData();
            });
        }
    }

    public sceneLastPosData() {
        const g_this = ChapterSceneMenuView.Instance;
        const bg3_img = g_this.bg2.bg3_img.transform;
        const bg3_img_scrcontent = g_this.bg2.bg3_img.scr_scr.scrcontent.transform;
        let sceneHeight: number = 0;
        g_this.grid.forEachCell<ChapterSceneMenuCell>((cell) => {
            if (cell.bool) {
                sceneHeight += cell.grid.height;
            }
        });
        let bgheight = (0.76 * g_this.bg.transform.height);
        if (bgheight > bg3_img.transform.height) {
            bg3_img.transform.height += 109;
            bg3_img.transform.markDirty();
        } else {
            bg3_img.transform.height = bgheight;
            bg3_img.transform.markDirty();
        }
        bg3_img_scrcontent.height += 109;
        bg3_img_scrcontent.markDirty();
        if (sceneHeight > 0) {
            g_this.grid.forEachCell<ChapterSceneMenuCell>((cell) => {
                if (cell.index > g_this.grid.length - 3) {
                    const topValue = cell.nowClass.transform.getLayoutValue(m4m.framework.layoutOption.TOP);
                    cell.nowClass.transform.setLayoutValue(m4m.framework.layoutOption.TOP, topValue + sceneHeight);
                    cell.nowClass.transform.markDirty();
                }
            });
        }
    }


    public ShowScene(bool: boolean, isScene) {
        const g_this = ChapterSceneMenuView.Instance;
        const bg3_img_scrcontent = g_this.bg2.bg3_img.scr_scr.scrcontent.transform;
        const bg3_img = g_this.bg2.bg3_img.transform;
        const nowClass = this.nowClass;
        const height = (bool ? this.grid.height : nowClass.transform.height);

        g_this.index = this.index;

        bg3_img_scrcontent.height += height;
        bg3_img_scrcontent.markDirty();
        let bgheight = (0.76 * g_this.bg.transform.height);
        if (bgheight > bg3_img.height) {
            bg3_img.height += height;
            bg3_img.markDirty();
        } else {
            bg3_img.height = bgheight;
            bg3_img.markDirty();
        }

        const sceneHeight = (this.grid.visible ? this.grid.height - (100 * (this.grid.length - 1)) : this.grid.height);


        this.grid.visible = true;

        g_this.grid.forEachCell<ChapterSceneMenuCell>((ChapterCell) => {
            if (ChapterCell.index > this.index) {
                const topValue = ChapterCell.nowClass.transform.getLayoutValue(m4m.framework.layoutOption.TOP);
                ChapterCell.nowClass.transform.setLayoutValue(m4m.framework.layoutOption.TOP, topValue + sceneHeight);
                ChapterCell.nowClass.transform.markDirty();
            }
        });

        this.bool = true;
    }

    public hideScene(cell: ChapterSceneMenuCell) {
        const g_this = ChapterSceneMenuView.Instance;
        const bg3_img_scrcontent = g_this.bg2.bg3_img.scr_scr.scrcontent.transform;
        const bg3_img = g_this.bg2.bg3_img.transform;
        const height = cell.grid.height;

        g_this.index = null;

        bg3_img_scrcontent.height -= height;
        bg3_img_scrcontent.markDirty();
        let bgheight = (0.76 * g_this.bg.transform.height);

        if (bgheight > ChapterSceneMenuView.Instance.grid.height) {
            bg3_img.height -= height;
            bg3_img.markDirty();
        }

        const sceneHeight = this.grid.height;

        this.grid.visible = false;

        g_this.grid.forEachCell<ChapterSceneMenuCell>((ChapterCell) => {
            if (ChapterCell.index > this.index) {
                const topValue = ChapterCell.nowClass.transform.getLayoutValue(m4m.framework.layoutOption.TOP);
                ChapterCell.nowClass.transform.setLayoutValue(m4m.framework.layoutOption.TOP, topValue - sceneHeight);
                ChapterCell.nowClass.transform.markDirty();
            }
        });

        this.bool = false;
    }

    public onPointDown() {
        const g_this = ChapterSceneMenuView.Instance;
        if (g_this.openType == ChapterSceneType.ChapterType || g_this.openType == ChapterSceneType.ChpaterSceneType) {
            g_this.setGrid(this.cellData, this.index, this.nowClass.transform.localTranslate);
        }
    }

    public onSelect() {
    }
    public onUnSelect() {
    }

    public EditBtnFun() {
        this.config.viewData.totalTransHideFun();
        this.config.viewData.OpenTipPanel(this.index);
    }


    public OpenTipPanelScene(index: number) {
        // console.log("选中了格子， 显示操作气泡", index);
        let cell = (this.grid.getCell(index) as SceneMenuCell);
        UiManager.getUIByName(UiNames.Manipulatebubbles, cell.nowClass.edit_btn.transform, (uiObj) => {
            uiObj.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, -180);
            uiObj.transform.setLayoutValue(m4m.framework.layoutOption.TOP, -40);
            uiObj.transform.markDirty();
            let trans = uiObj as ManipulatebubblesView;
            trans.deleteCallBackFun = () => {
                this.config.viewData.setCommonPoupdelete("删除", "您确定要删除" + cell.cellData.sceneName + "吗?", () => {
                    this.config.viewData.DeleteScene(this.cellData.id, cell.cellData.id);
                    const SceneData = this.config.viewData.getChapterSceneData();
                    const scene = SceneData[this.index];
                    // console.log(scene.sceneList);
                    this.setGridListDataFun(scene.sceneList);
                    // setTimeout(() => {
                    const index = ChapterSceneMenuView.Instance.index
                    ChapterSceneMenuView.Instance.grid.forEachCell<ChapterSceneMenuCell>((cell) => {
                        if (cell.index > index) {
                            let top = m4m.framework.layoutOption.TOP;
                            let topValue = cell.nowClass.transform.getLayoutValue(top);
                            cell.nowClass.transform.setLayoutValue(top, topValue - 100);
                            cell.nowClass.transform.markDirty()
                        }
                    });
                });
            }
            trans.reSetCallBackFun = () => {
                // console.log("游戏列表重新编辑回调，弹出重命名游戏弹窗");
                this.config.viewData.setCommonPoupData("重命名", "场景名", (res) => {
                    this.config.viewData.updateScene(res, cell.cellData);
                    this.setGridListDataFun(this.cellData.sceneList);
                });
            }
            this.TransDic.set(index, trans)
        });
    }
}