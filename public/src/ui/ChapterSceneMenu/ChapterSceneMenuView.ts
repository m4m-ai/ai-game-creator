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
import { CellData } from "Data/CellData";
import { ChapterInfo } from "Data/ChapterInfo";
import { GridExtend } from "Data/GridExtend/GridExtend";
import { ChapterSceneDirectoryManager, ChapterSceneType, ChpaterSceneTypeData } from "Manager/ChapterSceneDirectoryManager";
import { EditorGuideType, GuideIndexType, guideUIName, PlayerGuideManager, StoryIndexType } from "Manager/PlayerGuideManager";
import { UiManager } from "PSDUI/UiManager";
import { UiTools } from "PSDUI/UiTools";
import { ChapterSceneMenu } from "./ChapterSceneMenu";
import { ChapterSceneMenuCell } from "./ChapterSceneMenuCell";
import { ChapterSceneMenuViewData } from "./ChapterSceneMenuViewData";
import { ChapterSceneMenuPop } from "./ChapterSceneMenuPop";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { FrameMgr } from "Tools/FrameMgr";
import { UiNames } from "Manager/UIData/UiNames";
import { EditUIType, GameProjectManager } from "Manager/GameProjectManager";
import { AIResourceManager } from "Manager/AIResourceManager";
import { AppMain } from "appMain";
import { BuildType } from "GameEnum";
import { SkipBoxManager } from "Manager/SkipBoxManager";

export class ChapterSceneMenuView extends ChapterSceneMenu.ChapterSceneMenu {
    public static Instance: ChapterSceneMenuView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public ipt: m4m.framework.inputMgr;
    public picRaw: ChapterSceneMenu.chapterbg1;
    public gameData: ChapterInfo;
    public index: number;
    public gridXY: m4m.math.vector2 = new m4m.math.vector2();
    public grid: GridExtend<ChapterSceneMenu.chapterbg1, any>;
    public viewData: ChapterSceneMenuViewData;
    public openType: ChapterSceneType;
    public CenterDisplayBol: boolean;

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.viewData = new ChapterSceneMenuViewData();
        this.grid = new GridExtend<ChapterSceneMenu.chapterbg1>(
            this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1, ChapterSceneMenuCell, {
            columns: 1,
            rows: this.viewData.getChapterSceneData().length,
            offsetY: 0,
            offsetX: 0,
            viewData: this.viewData,
        });
        this.ipt = m4m.framework.sceneMgr.app.getInputMgr();
        //监听点击
        // this.ipt.addPointListener(m4m.event.PointEventEnum.PointUp, this.onClickUP, this);
        // this.ipt.addPointListener(m4m.event.PointEventEnum.PointMove, this.onMove, this);
        this.savebg_btn_btnEvent = this.SaveBgBtnFun.bind(this);
        this.uncheckedbg_btn_btnEvent = this.uncheckedbgFunBind.bind(this);
        //编辑器保存
        this.multiplebgbtnc_btn_btnEvent = this.multiplebgbtncFunBind.bind(this);
        //编辑器AI重新生成
        this.multiplebgbtncbg2_btn_btnEvent = this.multiplebgbtncbgFunBind.bind(this);
        //返回按钮
        this.back_btn_btnEvent = this.backBtnFun.bind(this);

        this.multiplebgbtnlabc2_lab_text("AI重新生成");
        this.multiplebgbtnlabc1_lab_text("保存");
        this.unchecked_lab_text("保存");
        this.ash_lab_text("保存");
        this.ash3_lab_text("AI重新生成");

        this.bg2.naturalbtnbg.ashbg3_btn.transform.visible = false;
        this.bg2.naturalbtnbg.ashbg1_btn.transform.visible = false;
    }

    private onShowFunc(data: ChpaterSceneTypeData) {
        this.transform.updateTran(true);
        this.viewData.CenterDisplayBol(data.CenterDisplayBol);
        this.CenterDisplayBol = data.CenterDisplayBol;
        this.openType = data.chapterSceneUItype;
        if (this.openType != ChapterSceneType.AITalkResource && this.openType != ChapterSceneType.AIPictrueResoure && this.openType != ChapterSceneType.SceneType) {
            AIResourceManager.currentUIname = UiNames.ChapterSceneMenu;
            GameProjectManager.instance.editCurrentUIType = EditUIType.ChapterScenarios;
        }
        if (this.openType == ChapterSceneType.ChapterType) {
            this.save_lab_text("保存");
        } else if (this.openType == ChapterSceneType.SceneType) {
            this.save_lab_text("确定");
        }
        if (this.openType == ChapterSceneType.AITalkResource) {
            this.text_lab_text("/场景对话");
        } else if (this.openType == ChapterSceneType.AIPictrueResoure) {
            this.text_lab_text("/背景图");
        }
        // if (!UiManager.isUiShow(UiNames.Chatbackground)) {
        let bool = (data.chapterSceneUItype == ChapterSceneType.ChapterType || data.chapterSceneUItype == ChapterSceneType.SceneType);

        let AITalkResourceBool = data.chapterSceneUItype == ChapterSceneType.AITalkResource;

        let AIPictrueResoureBool = data.chapterSceneUItype == ChapterSceneType.AIPictrueResoure;

        let chpatbool = data.chapterSceneUItype == ChapterSceneType.ChpaterSceneType;

        this.bg2.textbg_img.transform.visible = (AITalkResourceBool || AIPictrueResoureBool);

        this.bg2.naturalbtnbg.ashbg1_btn.transform.visible = chpatbool;
        this.bg2.naturalbtnbg.multiplebgbtnc_btn.transform.visible = chpatbool;
        this.bg2.naturalbtnbg.multiplebgbtncbg2_btn.transform.visible = chpatbool;

        this.bg2.naturalbtnbg.uncheckedbg_btn.transform.visible = bool;
        this.bg2.naturalbtnbg.savebg_btn.transform.visible = bool;

        this.bg2.naturalbtnbg.ashbg1_btn.transform.visible = false;
        this.bg2.naturalbtnbg.uncheckedbg_btn.transform.visible = false;

        FrameMgr.Add(this.updata, this);

        this.setGridListDataFun(this.viewData.getChapterSceneData());
        if (AITalkResourceBool || AIPictrueResoureBool) {
            let layoutOption = m4m.framework.layoutOption
            let top = this.bg2.bg3_img.transform.getLayoutValue(layoutOption.TOP);
            this.bg2.bg3_img.transform.setLayoutValue(layoutOption.TOP, top + 100)
        }
    }

    public updata() {
        let bool = (this.viewData.getChapterSceneData().length > 1) ? false : true;
        if (this.openType == ChapterSceneType.ChapterType) {
            this.bg2.naturalbtnbg.uncheckedbg_btn.transform.visible = bool;
        } else if (this.openType == ChapterSceneType.ChpaterSceneType) {
            this.bg2.naturalbtnbg.ashbg1_btn.transform.visible = bool;
        }
    }

    private onHideFunc() {
        console.error("onHideFunc");
        FrameMgr.Remove(this.updata, this);
        AIResourceManager.currentUIname = "";
        GameProjectManager.instance.editCurrentUIType = -1;
    }

    private onDisposeFunc() {
        console.error("onDisposeFunc");
        this.grid.dispose();
        this.viewData.dispose();
        this.disposePop();
        //监听点击
        // this.ipt.removePointListener(m4m.event.PointEventEnum.PointUp, this.onClickUP, this);
        // this.ipt.removePointListener(m4m.event.PointEventEnum.PointMove, this.onMove, this);
    }

    public setGrid(data: ChapterInfo, index: number, pos: m4m.math.vector2) {
        console.log("setGrid");
        this.picRaw = this.BtnbRpicGrid(data, pos).tanClass;
        this.gameData = data;
        this.index = index;
        this.gridXY = Object.assign(this.picRaw.transform.localTranslate);
    }

    public DisposeGrid() {
        this.picRaw = null;
        this.gameData = null;
        this.index = null;
        this.gridXY = null;
        this.grid.enableScroll = true;
        let pop = this.showPop[0]
        this.visiblePop(pop, false);
    }

    private onClickUP([x, y]: [number, number]) {
        if (!this.picRaw && !this.gameData || !this.isMove) {
            return;
        }
        let scrPos = m4m.math.pool.new_vector2();
        UiManager.ActiveSelf.overlay.calScreenPosToCanvasPos(new m4m.math.vector2(x, y), scrPos);
        if (this.CenterDisplayBol) {
            scrPos.x -= this.viewData.posIndex();
        }
        scrPos.y -= 200;

        let posXY = scrPos.y;
        let chapterSceneData = this.viewData.getChapterSceneData();

        this.grid.forEachCell<ChapterSceneMenuCell>((cell) => {
            let nowPos = cell.nowClass.transform.localTranslate;
            let nowposXy = nowPos.y;
            let num = Math.abs(posXY - nowposXy);
            if (num <= 30) {
                chapterSceneData.splice(this.index, 1, ...chapterSceneData.splice(cell.index, 1, chapterSceneData[this.index]));
                this.setGridListDataFun(chapterSceneData);
            }
        });

        let pop = this.showPop[0];
        this.visiblePop(pop, false);

        this.picRaw = null;
        this.gameData = null;
        this.grid.enableScroll = true;
        this.isMove = false;
    }

    private isMove: boolean = false;

    private onMove([x, y]: [number, number]) {
        if (!this.picRaw && !this.gameData) {
            return;
        }
        let pop = this.showPop[0];
        this.visiblePop(pop, true);

        let scrPos = m4m.math.pool.new_vector2();
        UiManager.ActiveSelf.overlay.calScreenPosToCanvasPos(new m4m.math.vector2(x, y), scrPos);
        if (this.CenterDisplayBol) {
            scrPos.x -= this.viewData.posIndex();
        }
        scrPos.y -= 200;

        this.picRaw.transform.localTranslate = scrPos;
        this.picRaw.transform.markDirty();

        this.isMove = true;
    }

    public setGridListDataFun(list: Array<ChapterInfo>) {
        let data: any[] = Object.assign(list);
        let ChapterData = data.findIndex(value => value.id == "80001");
        if (this.openType == ChapterSceneType.ChapterType || this.openType == ChapterSceneType.ChpaterSceneType) {
            if (ChapterData == -1) {
                let chapter = { id: "80001", chapterName: "" }
                data.push(chapter);
            } else if (ChapterData != (data.length - 1)) {
                data.splice(ChapterData, 1);
                let chapter = { id: "80001", chapterName: "" }
                data.push(chapter);
            }
        } else {
            if (ChapterData != -1) {
                data.splice(ChapterData, 1);
            }
        }
        this.grid.removeAll();
        this.grid.setDataList(list);
        // this.grid.forEachCell<ChapterSceneMenuCell>((cell) => {
        //滑动区域的长度
        this.bg2.bg3_img.scr_scr.scrcontent.transform.height = this.grid.height;
        this.bg2.bg3_img.scr_scr.scrcontent.transform.width = this.grid.width;
        this.bg2.bg3_img.scr_scr.scrcontent.transform.markDirty();
        // if (this.openType == ChapterSceneType.ChapterType) {
        let bgheight = (0.76 * this.bg.transform.height);
        let height = this.grid.height;
        if (bgheight > height) {
            this.bg2.bg3_img.transform.height = this.grid.height;
            this.bg2.bg3_img.transform.width = this.grid.width;
            this.bg2.bg3_img.transform.markDirty();
        } else {
            this.bg2.bg3_img.transform.height = bgheight;
            this.bg2.bg3_img.transform.width = this.grid.width;
            this.bg2.bg3_img.transform.markDirty();
        }
        // } else {
        //     this.bg2.bg3_img.transform.height = this.grid.height;
        //     this.bg2.bg3_img.transform.width = this.grid.width;
        //     this.bg2.bg3_img.transform.markDirty();
        // }
        // });
        if (this.openType == ChapterSceneType.AITalkResource && data.length == 0) {
            this.bg2.bg3_img.transform.visible = false;
        }
        if (this.openType == ChapterSceneType.AIPictrueResoure && data.length == 0) {
            this.bg2.bg3_img.transform.visible = false;
        }
    }

    public SaveBgBtnFun() {
        if (AppMain.buildType == BuildType.StoryType) {
            if (this.viewData.SceneData) {
                ChapterSceneDirectoryManager.Instance.SceneData = this.viewData.SceneData;
                PlayerGuideManager.instance.StoryGuideIndex(StoryIndexType.SceneType);
            } else {
                SkipBoxManager.Instance.ShowSkipBox("请选择场景");
            }
            return;
        }
        if (this.openType == ChapterSceneType.ChapterType) {
            if (this.viewData.getChapterSceneData().length > 1) {
                if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.SelectScene) {
                    GameProjectManager.instance.currentSchedule = GuideIndexType.SelectScene;
                    GameProjectManager.instance.sendGuideIndexToService();
                }
                //保存
                this.viewData.saveChapter();
                UIOpenOrHideManager.Instance.HideChapterSceneMenuView();
                UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
                PlayerGuideManager.instance.newSetUIshowByIndex(true, guideUIName.ChapterMenu, EditorGuideType.editorChapterScenariosSave);
            }
        } else if (this.openType == ChapterSceneType.SceneType) {
            if (PlayerGuideManager.isNewGuideBol && GameProjectManager.instance.currentSchedule < GuideIndexType.SceneTalk) {
                GameProjectManager.instance.currentSchedule = GuideIndexType.SceneTalk;
                GameProjectManager.instance.sendGuideIndexToService();
                // ProjectBasicSettingsManagerRequest.Instance.SetSchedule(GameProjectManager.instance.currentGalData.id, GameProjectManager.instance.currentSchedule);
            }
            //选择场景跳转场景对话
            console.debug("请选择场景");
            if (this.viewData.SceneData) {
                ChapterSceneDirectoryManager.Instance.SceneData = this.viewData.SceneData;
                PlayerGuideManager.instance.guideStepIndex = 4;
                PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
                PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
            }
        }
    }

    public uncheckedbgFunBind() {

    }

    public multiplebgbtncbgFunBind() {
        console.log("ai 重新生成");
        if (PlayerGuideManager.isNewGuideBol) {
            UIOpenOrHideManager.Instance.HideNavigationBarView();
        }
        PlayerGuideManager.instance.setAIGuidByIndex(2);
    }

    public multiplebgbtncFunBind() {
        console.log("编辑器 保存");
        if (this.openType == ChapterSceneType.ChpaterSceneType) {
            //保存
            this.viewData.saveChapter();
            UIOpenOrHideManager.Instance.HideChapterSceneMenuView();
            UIOpenOrHideManager.Instance.HideTutorialBackgroundView();
        } else {
            //保存
            this.viewData.saveChapter();
            UIOpenOrHideManager.Instance.HideNavigationBarView();
            PlayerGuideManager.instance.guideStepIndex = 3;
            PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex - 1;
            PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);

        }
    }

    public backBtnFun() {
        console.log("返回上一层");
        if (!PlayerGuideManager.isNewGuideBol) {
            AIResourceManager.instance.editorRebackOrSave();
        }
    }

    private BtnbRpicGrid(dataList: ChapterInfo, pos: m4m.math.vector2) {
        if (this.showPop.length == 0) {
            this.clearAllPop();
            let pop = this.getPop();
            pop.setData(dataList, pos);
            pop.tanClass.transform.localTranslate = pos;
            this.showPop.push(pop);
            this.visiblePop(pop, false);
        } else {
            let pop = this.showPop[0]
            pop.setData(dataList, pos);
            this.visiblePop(pop, false);
        }
        return this.showPop[0];
    }

    public showPop: ChapterSceneMenuPop[] = [];
    private popPoor: any[] = [];

    private getPop(): ChapterSceneMenuPop {
        if (this.popPoor.length > 0) {
            let newPop = this.popPoor.pop();
            this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.transform.parent.addChild(newPop.tanClass.transform);
            return newPop;
        }
        let cellData = new CellData();
        let cellClass = UiTools.cloneUi(this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1);
        let cellTrans = cellClass.transform;
        let cellTransPercentWidth = cellTrans.width;
        let cellTransPercentheight = cellTrans.height;
        cellData.width = cellTransPercentWidth;
        cellData.height = cellTransPercentheight;

        this.bg2.bg3_img.scr_scr.scrcontent.transform.parent.addChild(cellClass.transform);

        return new ChapterSceneMenuPop(cellClass, cellData);
    }

    private clearAllPop() {
        for (let index = 0; index < this.showPop.length; index++) {
            let pop = this.showPop[index];
            this.deletPop(pop);
        }
        this.showPop.length = 0;
    }

    public disposePop() {
        for (let index = 0; index < this.showPop.length; index++) {
            let pop = this.showPop[index];
            pop.dispose();
        }
    }

    private deletPop(pop: ChapterSceneMenuPop) {
        if (pop.tanClass.transform.parent) {
            pop.tanClass.transform.parent.removeChild(pop.tanClass.transform);
        }
        this.popPoor.push(pop);
    }

    private visiblePop(pop: ChapterSceneMenuPop, visible: boolean) {
        if (pop) {
            pop.tanClass.transform.visible = visible;
        }
    }
}