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
import { DebugLineTool2d } from "Tools/DebugLineTool2d";
import { FrameMgr } from "Tools/FrameMgr";
import { commTool } from "Tools/commTool";

/**
 * datGUI  调试GUI 工具
 * dat使用教程 @see http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
 */
export class DatGUITool {

    public static uiPickFolder: dat.GUI;

    private static getGUI() {
        if (this._currGUI) {
            this.clear();
        }
        //@ts-ignore
        this._currGUI = new dat.GUI();
        return this._currGUI;
    }
    private static getTitleName(text: string) {
        let idx = text.indexOf("\n");
        if (idx == -1) { return ""; }
        return text.substring(0, 2);
    }

    private static ckOpenEvent(innerText: string, map) {
        let name = this.getTitleName(innerText);
        let fun = map[name];
        if (fun) {
            fun();
        }
    }
    private static makeOpenClose() {
        //@ts-ignore
        let dom = dat.dom.dom;
        let oldCloseFun = dom.addClass;
        dom.addClass = (elem, className: string) => {
            oldCloseFun(elem, className);
            if (className == "closed") {
                this.ckOpenEvent(elem.innerText, this.TitleCloseEventMap);
            }
        };

        let oldOpenFun = dom.removeClass;
        dom.removeClass = (elem, className: string) => {
            oldOpenFun(elem, className);
            if (className == "closed") {
                this.ckOpenEvent(elem.innerText, this.TitleOpenEventMap);
            }
        };
    }

    /** 注册 title 点击 open */
    public static onTitleOpen(titleName: string, cb: () => any) {
        this.TitleOpenEventMap[titleName] = cb;
    }

    /** 注册 title 点击 close */
    public static onTitleClose(titleName: string, cb: () => any) {
        this.TitleCloseEventMap[titleName] = cb;
    }

    public static clear() {
        if (!this._currGUI) { return; }
        let selfEle = this._currGUI.domElement as HTMLElement;
        (selfEle.parentElement as HTMLElement).removeChild(selfEle);
        this._currGUI = null;
    }

    /** 使用样例 */
    public static example() {
        //@ts-ignore
        if (!dat) { return; }
        let FizzyText = function () {
            this.message = "dat.gui";
            this.speed = 0.8;
            this.displayOutline = false;
            this.explode = () => { console.log(`do explode`); };
            // Define render logic ...
        };

        let text = new FizzyText();
        let gui = this.getGUI();
        gui.add(text, "message");
        gui.add(text, "speed", -5, 5);
        gui.add(text, "displayOutline");
        gui.add(text, "explode");
        let folderF = gui.addFolder("Folder");
    }
    //游戏运行调试
    public static runGameGUI() {
        let obj = this.runGameContent;
        if (!this.runGameContent) {
            obj = this.runGameContent = new SetContent();
        }

        //@ts-ignore
        let gui = this.runGameDatGUIObj = new dat.GUI({ closeOnTop: true, name: "runGameGUI" });
        gui.close();
        
        gui.add(obj, "title")
            .listen();
        let folderDebug = gui.addFolder("调试");//----------------------------------------
        //--------------------------全局设置-----------------------------
        folderDebug.add(obj, "switchFPS")  //fps
            .name("显示FPS");
        folderDebug.add(obj, "switchDrawCall")  //drawcall
            .name("显示DrawCall数量");
        folderDebug.add(obj, "enablePickUI")  //拣选UI节点
            .listen()
            .name("拣选UI节点");

        // //----------------UI 点选--------------------------------
        let uiPickFolder = this.uiPickFolder = folderDebug.addFolder("UI选中");
        uiPickFolder.add(obj, "pickUIVisiable")  //
            .listen()
            .name("显示UI");
        uiPickFolder.add(obj, "pickUIName")  //
            .listen()
            .name("UI名字");
        uiPickFolder.add(obj, "pickUIPos")  //
            .listen()
            .name("UI世界坐标");
        uiPickFolder.add(obj, "pickUISize")  //
            .listen()
            .name("UI宽高");
        uiPickFolder.add(obj, "pickUIPivot")  //
            .listen()
            .name("UI锚点");
        uiPickFolder.add(obj, "pickUILayout")  //
            .listen()
            .name("UI对齐状态(像素)");
        uiPickFolder.add(obj, "pickUILayoutPerc")  //
            .listen()
            .name("UI对齐状态(百分比)");
        uiPickFolder.add(obj, "pickUIComponents")  //
            .listen()
            .name("UI挂在的组件");
        uiPickFolder.add(obj, "pickUIPath")  //
            .listen()
            .name("UI全局路径");
        // //--------------------------------------------------------------

        // //--------------------------------测试------------------------------
        // let folderTest = gui.addFolder("测试");//----------------------------------------
        // folderTest.add(obj, "testCutUIView")
        //     .name("筛选可见UI");
        // let folderPolygon = folderTest.addFolder("UI矢量多边形");
        // folderPolygon.add(obj, "aboveUiPosX")
        //     .name("UI坐标X");
        // folderPolygon.add(obj, "aboveUiPosY")
        //     .name("UI坐标Y");
        // folderPolygon.add(obj, "aboveScale")
        //     .name("UI缩放");
        // folderPolygon.add(obj, "uiPolygonPoint")
        //     .name("点坐标");
        // folderPolygon.add(obj, "addUIPolygonPoint")
        //     .name("添加点");
        // folderPolygon.add(obj, "clearUIPolygonPoint")
        //     .name("清理");

        //dom
        this.makeOpenClose();
    }

    public static viewResourceGUI() {
        // if (wxTool.wx || !dat) { return; }
        // let obj = setViewResContent.instance;

        // // let gui = this.getGUI();
        // let gui = this.viewResourceGUIObj = new dat.GUI();
        // gui.add(obj, "title");
        // gui.add(obj, "backGameGUI");
        // gui.add(obj, "resType", obj.PathList, "角色");
        // gui.add(obj, "resName");
        // gui.add(obj, "viewModel");
    }

    public static roleViewCtrObj;
    private static TitleOpenEventMap: { [titleName: string]: Function } = {};
    private static TitleCloseEventMap: { [titleName: string]: Function } = {};
    private static runGameDatGUIObj;
    private static _currGUI: any;
    private static runGameContent: SetContent;
}

class SetContent {

    private static readonly helpV2 = new m4m.math.vector2();
    private static readonly helpV2v1 = new m4m.math.vector2();

    private title = "游戏运行调试";
    private isshowFps = false;
    private isshowDrawCall = false;
    private _enablePickUI: boolean = false;
    private _lineRoot: m4m.framework.transform2D;
    private _DrawLineInited: boolean;
    private _overLay2d: m4m.framework.overlay2D;
    private _currPickedUI: m4m.framework.transform2D;
    private _canvas: m4m.framework.canvas;
    private pickUIName: string = "";
    private pickUIComponents: string = "";
    private pickUIPath: string = "";
    private pickUIPos: string = "";
    private pickUISize: string = "";
    private pickUIPivot: string = "";
    private pickUILayout: string = "";
    private pickUILayoutPerc: string = "";
    private _pickUIContinuity: number[] = [];

    public get pickUIVisiable() {
        if (!this._currPickedUI) { return false; }
        return this._currPickedUI.visible;
    }
    public set pickUIVisiable(val: boolean) {
        if (!this._currPickedUI) { return; }
        this._currPickedUI.visible = val;
    }

    public get UICanvas() {
        if (!this._canvas) {
            let uiLay = this.OverLay2D;
            if (uiLay) {
                this._canvas = uiLay.canvas;
            }
        }

        return this._canvas;
    }

    public get OverLay2D() {
        if (!this._overLay2d) {
            let lays = m4m.framework.sceneMgr.scene.mainCamera.getOverLays();
            let uiLay: m4m.framework.overlay2D;
            for (let i = 0, len = lays.length; i < len; i++) {
                if (lays[i] instanceof (m4m.framework.overlay2D)) {
                    uiLay = lays[i] as m4m.framework.overlay2D;
                    break;
                }
            }

            this._overLay2d = uiLay;
        }

        return this._overLay2d;
    }

    constructor() {
        FrameMgr.Add(this.update, this);
    }

    public update(dt: number) {

        if (this._DrawLineInited) {
            DebugLineTool2d.update();
            let _t = this._currPickedUI;
            if (_t) {
                let tWpos = _t.getWorldTranslate();
                let tp = _t.pivot;
                DebugLineTool2d.drawRect(tWpos.x - (tp.x * _t.width), tWpos.y - (tp.y * _t.height), _t.width, _t.height, 5, 1, 0.8);
            }
        }
    }

    public switchFPS() {
        if (this.isshowFps) {
            m4m.framework.sceneMgr.app.closeFps();
        } else {
            m4m.framework.sceneMgr.app.showFps();
        }

        this.isshowFps = !this.isshowFps;
    }
    public switchDrawCall() {
        if (this.isshowDrawCall) {
            m4m.framework.sceneMgr.app.closeDrawCall();
        } else {
            m4m.framework.sceneMgr.app.showDrawCall();
        }

        this.isshowDrawCall = !this.isshowDrawCall;
    }

    public get enablePickUI() { return this._enablePickUI; }
    public set enablePickUI(enable: boolean) {
        if (this._enablePickUI == enable) { return; }
        this._enablePickUI = enable;
        enable ? this.doEnablePickUI() : this.doDisablePickUI();
    }

    //开启 拣选 UI
    public doEnablePickUI() {
        this.DrawLineInit();
        this._lineRoot.visible = true;
        DatGUITool.uiPickFolder.open();
        //监听点击
        let ipt = m4m.framework.sceneMgr.app.getInputMgr();
        ipt.addPointListener(m4m.event.PointEventEnum.PointDown, this.onPickUIclick, this);

    }

    //关闭 拣选UI
    public doDisablePickUI() {
        if (this._lineRoot) {
            this._lineRoot.visible = false;
        }
        DatGUITool.uiPickFolder.close();
        let ipt = m4m.framework.sceneMgr.app.getInputMgr();
        ipt.removePointListener(m4m.event.PointEventEnum.PointDown, this.onPickUIclick, this);

    }

    public DrawLineInit() {
        if (this._DrawLineInited) { return; }
        let lay2d = this.OverLay2D;
        let lineRoot = this._lineRoot = new m4m.framework.transform2D();
        lineRoot.name = "drawLineRoot";
        let opt = m4m.framework.layoutOption;
        lineRoot.layoutState = opt.BOTTOM | opt.LEFT | opt.RIGHT | opt.TOP;
        lay2d.canvas.addChild(lineRoot);
        DebugLineTool2d.init(lineRoot);
        this._DrawLineInited = true;
        commTool.makeUIEventDiscard(lineRoot);
    }

    public onPickUIclick([x, y]) {
        this.pickUIName = "";
        this.pickUIPath = "";
        this.pickUIComponents = "";
        this._currPickedUI = null;

        let lay2d = this.OverLay2D;
        //转换成 UI 坐标
        let sPos = SetContent.helpV2;
        m4m.math.vec2Set(sPos, x, y);
        let mPos = SetContent.helpV2v1;
        lay2d.calScreenPosToModelPos(sPos, mPos);
        // commTool.screenPosToUIpos();

        //遍历 所有
        let canvas = this.UICanvas;
        let uiRoot = canvas.getRoot();
        let target: m4m.framework.transform2D;
        let firstTrans: m4m.framework.transform2D;
        let contnuIdx = 0;
        commTool.forEachTransform2DTree(uiRoot, (val) => {
            if (val.visible && val != this._lineRoot) {
                //匹配点击区域
                let b = val.ContainsCanvasPoint(mPos);
                if (b) {
                    console.log(val.name);
                    let lastID = this._pickUIContinuity[contnuIdx];
                    let currID = val.insId.getInsID();
                    if (lastID == null || lastID != currID) {
                        this._pickUIContinuity[contnuIdx] = currID;
                        this._pickUIContinuity.length = contnuIdx + 1;
                        target = val;
                        return true;    //中断 遍历
                    }

                    contnuIdx++;

                    if (!firstTrans) {
                        firstTrans = val;
                    }
                }
            }
        });

        if (!firstTrans) {
            console.warn(` 没有获取到任何一个 ui 节点`);
            return;
        }

        if (!target) {
            //切换一个轮回了
            target = firstTrans;
            this._pickUIContinuity.length = 1;
        }
        this.pickUIVisiable = target.visible;
        this.pickUIName = target.name;
        this.pickUIPos = JSON.stringify(target.getWorldTranslate());
        this.pickUISize = `width: ${target.width}, height: ${target.height}`;
        this.pickUIPivot = JSON.stringify(target.pivot);
        this.pickUILayout = this.getUIlayoutStr(target.layoutState);
        this.pickUILayoutPerc = this.getUIlayoutStr(target.layoutPercentState);
        // this.pickUIPath = JSON.stringify(this.getUIPath(target));

        this.pickUIPath = commTool.getUIPathStr(target);
        let compNames = target.components.map((val) => { return val.comp["constructor"].name; }); //获取组件 类名
        this.pickUIComponents = JSON.stringify(compNames);

        this._currPickedUI = target;
    }

    public getUIlayoutStr(layout: number) {
        let str = "";
        let lo = m4m.framework.layoutOption;
        let arr = [lo.BOTTOM, lo.H_CENTER, lo.LEFT, lo.RIGHT, lo.TOP, lo.V_CENTER];
        arr.forEach((val) => {
            if (val & layout) {
                str += `${m4m.framework.layoutOption[val]};`;
            }
        });
        return str;
    }

}
