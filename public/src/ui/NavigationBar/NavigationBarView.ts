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
import { BindKeyName } from "Data/BindKeyName";
import { GridExtend, ScrollType } from "Data/GridExtend/GridExtend";
import { Step } from "Data/Process/Step";
import { EditorManager } from "Manager/EditorManager";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { NavigationBar } from "./NavigationBar";
import { NavigationBarViewData } from "./NavigationBarViewData";
import cellbg = NavigationBar.cellbg;
import { NavigationBarCell } from "./NavigationBarCell";
import { GameProjectManager } from "Manager/GameProjectManager";
import { UiManager } from "PSDUI/UiManager";
import { NavigationBarBackData } from "Manager/UIOpenOrHideManager";
import { UiNames } from "Manager/UIData/UiNames";
import { NavigationBarTabCell } from "./NavigationBarTabCell";
import { PlayerGuideManager } from "Manager/PlayerGuideManager";
import { AIResourceManager } from "Manager/AIResourceManager";
import { PreloadState, ScenePreloadManager } from "Manager/ScenePreloadManager";
import { SceneInfo } from "Data/SceneInfo";
import { StepType } from "Data/Process/StepType";
import { FrameMgr } from "Tools/FrameMgr";
import { AppMain } from "appMain";
import { BuildType } from "GameEnum";
// import layoutOption = m4m.framework.layoutOption;
// import vector3 = m4m.math.vector3;
// import transform = m4m.framework.transform;
// import CullingMask = m4m.framework.CullingMask;
// import { commTool } from "Tools/commTool";

export class NavigationBarView extends NavigationBar.NavigationBar {
    public static Instance: NavigationBarView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;

    public viewData: NavigationBarViewData;

    private binder: FunctionBinder
    private grid: GridExtend<cellbg, Step>;
    private tabGrid: GridExtend<NavigationBar.filebg1>

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.bg1.viewbg.newb1_btn.transform.visible = false;
        this.bg1.expandbg.contractbg_btn.transform.visible = false;

        //播放按钮
        this.forwardbg_btn_btnEvent = this.onPlay.bind(this);
        //上一步
        this.retreatbg_btn_btnEvent = this.prevStep.bind(this);
        //下一步
        this.suspendbg_btn_btnEvent = this.nextStep.bind(this);
        //重启
        this.refreshbg_btn_btnEvent = this.restart.bind(this);

        //AI
        this.aibg1_btn_btnEvent = this.AIbtnFun.bind(this);
        //返回上一步
        this.nextstepbg_btn_btnEvent = this.RebackBtnFun.bind(this);
        //返回下一步
        this.backbg_btn_btnEvent = this.GotoNextbtnFun.bind(this);
        //缩略
        this.abbreviationbg_btn_btnEvent = this.AbbreviationBtnFun.bind(this);
        //保存
        //this.savebg_btn_btnEvent = this.saveBtnFun.bind(this);


        this.grid = new GridExtend(this.bg1.windowbg_img.dialogbg2.dialogbg1_scr.dialogbg1content.cellbg, NavigationBarCell, {
            columns: 1,
            scroll: this.bg1.windowbg_img.dialogbg2.dialogbg1_scr,
            offsetY: 2,
            scrollType: ScrollType.vertical,
        });
        this.setCellData();

        this.viewData = new NavigationBarViewData(this);
        this.binder = UiDataManager.bindFunctionData(BindKeyName.OnStepExecuteFinish, this.onStepExecuteFinish.bind(this));
        this.tabGrid = new GridExtend(this.bg1.menubg_img.filebg1, NavigationBarTabCell, {
            columns: 1,
            rows: 4,
            offsetY: 45,
            viewdata: this.viewData,
        });
        this.tabGrid.setDataList(this.viewData.tabIconList);

        // // //this.bg1.viewbg.gameuibg_img.transform.setLocalPosition(new m4m.math.vector2(100, 100));
        // // NavigationbarView.createGameView();
        // // this.bg1.viewbg.gameuibg_img.transform.removeChild(this.bg1.viewbg.gameuibg_img.gameui.transform);
        // // this.bg1.viewbg.gameuibg_img.transform.addChild(NavigationbarView.axisPanel);
        // // //NavigationbarView.axisPanel.localTranslate = new m4m.math.vector2(0, 0);
        // // //NavigationbarView.axisPanel.markDirty();
        // // NavigationbarView.axisPanel.addChild(this.bg1.viewbg.gameuibg_img.gameui.transform);
        // // // commTool.forEachTransform2DTree(this.bg1.viewbg.gameuibg_img.gameui.transform, (trans) => {
        // // //     trans.layer = CullingMask.preview;
        // // // });

        // commTool.forEachTransform2DTree(this.bg1.viewbg.gameuibg_img.gameui.transform, (trans) => {
        //     console.log("1111");

        //     trans.layer = CullingMask.preview;
        // });

        FrameMgr.Add(this.update, this);
        this.popupbg2_img.transform.visible = false;
    }


    public onExitPlay() {
        this.grid.removeAll();
    }

    public update() {
        let currStep = EditorManager.Instance.currentContext.currStep;
        if (currStep) {
            this.grid.forEachCell<NavigationBarCell>((cell) => {
                if (cell.cellData.index == currStep.index) {
                    this.grid.selectIndex = cell.index;
                }
            })
        }
    }

    public onStepExecuteFinish() {
        console.log("所有对话执行完成!");
        EditorManager.Instance.isPlay = false;
    }

    private _clickPlayBtnState: boolean = false;
    public onPlay() {
        this._clickPlayBtnState = !this._clickPlayBtnState;
        if (EditorManager.Instance.isPlay == false && this._clickPlayBtnState) {
            //开始预加载
            let startScene: SceneInfo = EditorManager.Instance.getStartScene();
            console.warn("开始预加载资源");
            ScenePreloadManager.Instance.preloadStart(startScene, true);
        } else {
            UiDataManager.changeFunctionData(BindKeyName.PreloadStateChange, PreloadState.cancel);
            EditorManager.Instance.isPlay = false;
        }
    }

    public nextStep() {
        EditorManager.Instance.runNextStep();
    }

    public prevStep() {
        EditorManager.Instance.runPrevStep();
    }

    public restart() {
        EditorManager.Instance.runRestart();
    }
    public AIbtnFun() {
        if (!PlayerGuideManager.isNewGuideBol) {
            console.log("ai按钮");
            let showChatBol = AIResourceManager.instance.canShowChatByUIname();
            if (showChatBol) {
                PlayerGuideManager.instance.setAIGuidByIndex(GameProjectManager.instance.editCurrentUIType);
            }
        }
    }
    public RebackBtnFun() {
        console.log("返回上一步");
    }
    public GotoNextbtnFun() {
        console.log("返回下一步");
    }
    public AbbreviationBtnFun() {
        console.log("缩略按钮");
    }
    public saveBtnFun() {
        console.log("保存");
    }

    public onShowFunc(Data: NavigationBarBackData) {
        // this.tabGrid.selectIndex = 0;
        // if (AppMain.buildType == BuildType.AIType) {
            GameProjectManager.isInEditorBol = true;
        // }
        if (Data.uiname != "") {
            // UiManager.showUi(nextUIname, false);
            switch (Data.uiname) {
                case UiNames.TutorialBackground:
                    let commondata = Data.data;
                    UiManager.showUi(Data.uiname, commondata);
                    break;
            }
        }
    }

    public onHideFunc() {
        GameProjectManager.isInEditorBol = false;
    }

    public setCellData() {
        let currScene = EditorManager.Instance.currScene;
        if (currScene) {
            let data = [];
            for (let index = 0; index < currScene.stepList.length; index++) {
                const element = currScene.stepList[index];
                if (element.type == StepType.conversation) {
                    data.push(element)
                }
            }
            this.grid.setDataList([...data]);
        } else {
            this.grid.removeAll();
        }
    }

    public onDisposeFunc() {
        // NavigationbarView.axisPanel.removeChild(this.bg1.viewbg.gameuibg_img.gameui.transform);
        // this.bg1.viewbg.gameuibg_img.transform.removeChild(NavigationbarView.axisPanel);
        // this.bg1.viewbg.gameuibg_img.transform.addChild(this.bg1.viewbg.gameuibg_img.gameui.transform);
        UiDataManager.unBindFunctionDataByBinder(this.binder);
        this.viewData.dispose();
        this.grid.dispose();
        this.tabGrid.dispose();
        FrameMgr.Remove(this.update, this);
    }

    // private static _gameInit: boolean = false;
    // private static axisPanel: m4m.framework.transform2D;
    // private static _axisCameraTrans: transform = new transform();
    // //private static axisCamera: m4m.framework.camera;
    // private static overlay: m4m.framework.overlay2D;

    // //创建scene窗口右上角轴
    // private static createGameView() {
    //     if (this._gameInit) {
    //         return;
    //     }

    //     // this.axisPanel = new m4m.framework.transform2D();
    //     // this.axisPanel.layer = CullingMask.preview;
    //     // this.axisPanel.width = 1920;
    //     // this.axisPanel.height = 1080;
    //     // this.axisPanel.layoutState = layoutOption.LEFT | layoutOption.RIGHT | layoutOption.TOP | layoutOption.BOTTOM;
    //     // var raw = this.axisPanel.addComponent("rawImage2D") as m4m.framework.rawImage2D;
    //     // //this.overlay2D.addChild(this.axisPanel);

    //     // //需要一个相机单独渲染 axis
    //     // this._axisCameraTrans.name = "axisCamera";
    //     // this._axisCameraTrans.gameObject.layer = CullingMask.preview;
    //     // // this.axisCamera = this._axisCameraTrans.gameObject.addComponent("camera") as m4m.framework.camera;
    //     // // this.axisCamera.isEditorCam = true;

    //     // //创建overlayer2d
    //     // this.overlay = new m4m.framework.overlay2D();
    //     // this.overlay.scaleMode = m4m.framework.UIScaleMode.SCALE_WITH_SCREEN_SIZE;
    //     // this.overlay.matchReference_width = 1920;  //UI 固定分辨率
    //     // this.overlay.matchReference_height = 1080;
    //     // this.overlay.screenMatchRate = 0;//如果是以高度固定的 模屏 模式  要把这个值设置为1   默认为竖屏模式
    //     // // this.axisCamera.addOverLay(this.overlay);

    //     // UiManager.uiCamera.CullingMask = CullingMask.ui;
    //     // let root = UiManager.uiCamera.gameObject.transform.parent;
    //     // root.addChild(this._axisCameraTrans);

    //     // var color = new m4m.framework.cameraPostQueue_Color();
    //     // color.renderTarget = new m4m.render.glRenderTarget(m4m.framework.sceneMgr.app.webgl, 1920, 1080, true, false);

    //     // //this.axisCamera.CullingMask = CullingMask.editor;
    //     // // this.axisCamera.postQueues.push(color);
    //     // //相机渲染背景设置为透明
    //     // // this.axisCamera.backgroundColor = new m4m.math.color(0, 0, 0, 0);
    //     // // this.axisCamera.postClearUseFogColor = false;

    //     // // this.axisCamera.far = 15;
    //     // this._axisCameraTrans.localTranslate = new vector3(9999999, 9999999, 9999999);

    //     // var textcolor = new m4m.framework.texture("_color");
    //     // textcolor.glTexture = color.renderTarget;
    //     // raw.image = textcolor;

    //     // // //创建轴
    //     // // this._axisRoot = new transform();
    //     // // let tempRoot = new transform();
    //     // // m4m.math.vec3Set(tempRoot.localTranslate, -1, -1, -1);
    //     // // this._axisRoot.addChild(tempRoot);

    //     // // this._axisCameraTrans.addChild(this._axisRoot);
    //     // // this._axisRoot.localTranslate = new vector3(0, 0, 5);
    // }
}