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
import { cMap } from "../Data/Map";
import { MetaUIManager } from "../UIBase/MetaUIManager";
import { newUiBase } from "./newUiBase";
import { LoaderLibManager } from "../Loader/LoaderLibManager";
import { consTool } from "../Tools/consTool";
import { LoaderManage, LoadType } from "../Loader/LoaderManage";
declare let System;

class UiManagerEventer extends m4m.AEvent {
    //
}

/**
 * UI 管理类 （type2）
 */
export class UiManager extends MetaUIManager {
    /** 创建UI 事件 */
    public static readonly ON_CREATE_UI = "onCreateUI";
    /** UI显示（show）事件 */
    public static readonly ON_SHOW_UI = "onShowUI";
    /** UI隐藏（hide）事件 */
    public static readonly ON_HIDE_UI = "onHideUI";
    //开始加载
    public static startLoadCallBack: Function;
    //加载结束
    public static endLoadCallBack: Function;
    //隐藏 不主动释放UI列表
    public static dontDisposeUIList: string[] = [];

    // private static _fullScreenTran: m4m.framework.transform2D;
    private static scene: m4m.framework.scene;
    //UI加载中列表
    private static nowLoadingMap: cMap<boolean> = new cMap<boolean>();
    //已创建完成的 UI实例列表
    private static uiMap: cMap<newUiBase> = new cMap<newUiBase>();
    //已组装完成的 UItrans实例
    // private static uiTransMap: cMap<m4m.framework.transform2D> = new cMap<m4m.framework.transform2D>();

    public static viewName: string = "View";

    //看引用没有什么地方用 先注掉
    // private static jsonList: cMap<any> = new cMap<any>();
    private static _eventer = new UiManagerEventer();
    /** uiManager 事件 控制对象 */
    public static get eventer() { return this._eventer; }

    public static dontDisposeUIPush(uiName: string) {
        this.dontDisposeUIList.push(uiName);
    }
    // private static instance: UiManager;
    // public static get Instance(): UiManager {
    //     if (this.instance == null) {
    //         this.instance = new UiManager();
    //     }
    //     return this.instance;
    // }
    public static hideLayerAll(layer: uiLayerType) {
        let layerTran: newUiBase[] = newUiBase.baselayerPages;
        switch (layer) {
            case -1: layerTran = newUiBase.downlayerPages; break;
            case 1: layerTran = newUiBase.midlayerPages; break;
            case 2: layerTran = newUiBase.highlayerPages; break;
            case 3: layerTran = newUiBase.poplayerPages; break;
            default: let temp;
        }
        layerTran.forEach((page) => {
            page.hide();
        });
    }
    public static hideAllUi(...without: string[]) {
        newUiBase.pages.forEach((page) => {
            if (!without || without.indexOf(page.uiName) != -1) {
                page.hide();
            }
        });
    }
    // public static overlay: m4m.framework.overlay2D;
    // public static downlayer: m4m.framework.transform2D;
    // public static baselayer: m4m.framework.transform2D;
    // public static midlayer: m4m.framework.transform2D;
    // public static highlayer: m4m.framework.transform2D;
    // public static poplayer: m4m.framework.transform2D;

    protected static uiRoot: m4m.framework.transform2D;
    //用于测试时调用 项目游戏逻辑一般不会用到
    public static getUiRootTest(): m4m.framework.transform2D {
        return UiManager.uiRoot;
    }
    protected static isInited = false;
    protected static uiLogList: string[] = [];
    protected static logLimit = 3;
    protected static logUiNow = false;
    protected static logUi(UIName: string) {
        if (this.uiLogList.length >= this.logLimit) {
            this.uiLogList.shift();
        }
        this.logUiNow = true;
        this.uiLogList.push(UIName);
    }
    public static openLastUI(uiName: string, arg: any = null, isOpenUI = true) {
        // if (this.uiLogList.length <= 0) {
        //     return;
        // }
        // if (this.logUiNow && this.uiLogList.length <= 1) {
        //     return;
        // }
        // let lastUiName = this.uiLogList.pop();
        // if (this.logUiNow) {
        //     lastUiName = this.uiLogList.pop();
        // }
        // this.showUi(lastUiName);
        if (this.uiLogList.length <= 0) {
            return null;
        }
        if (uiName == this.uiLogList[0]) {
            return null;
        }
        let tempList = this.uiLogList.concat();
        let lastUiName = tempList.pop();
        if (lastUiName == uiName) {
            lastUiName = tempList.pop();
        }
        if (isOpenUI) {
            this.uiLogList = tempList;
            this.showUi(lastUiName, arg);
        }
        return lastUiName;
    }

    /**
     * 获取UI当前 初始化 状态
     * @param uiClassName UI名字
     * @returns UI当前是否已经初始化
     */
    public static isUiInited(uiClassName: string) {
        let className = uiClassName;
        let ui = this.uiMap.get(className);
        if (ui) {
            return ui.isInited;
        }
        return false;
    }

    /**
     * 获取UI当前显示状态
     * @param uiClassName UI名字
     * @returns UI当前是否显示
     */
    public static isUiShow(uiClassName: string) {
        let className = uiClassName;
        let ui = this.uiMap.get(className);
        if (ui) {
            return ui.isShow;
        }
        return false;
    }
    /**
     * 加载UI
     * @param uiClassName UI名字
     * @param coverLayer 覆盖 UI 放置到的层级设定
     * @param notHideOnOtherShow 其他UI打开时，自己不会被隐藏
     * @param oninit 初始化方法
     */
    public static InitUi(uiClassName: string, oninit: () => void = null) {
        let className = uiClassName;
        let ui = this.uiMap.get(className);
        if (!ui) {
            this.getUi(uiClassName, null, false, () => { }, oninit);
            return;
        }
    }
    /**
     * 显示UI
     * @param uiClassName UI名字
     * @param arg 打开ui传入的参数, 在 UI 的 onShow 回调里可以获取到该参数
     * @param notHideOnOtherShow 其他UI打开时，自己不会被隐藏
     * @param oninit 初始化方法
     */
    public static showUi(uiClassName: string, arg: any = null, oninit: () => void = null, needCallBack: boolean = true) {
        let className = uiClassName;
        this.logUiNow = false;
        let ui = this.uiMap.get(className);
        if (!ui) {
            if (this.startLoadCallBack && needCallBack) { this.startLoadCallBack(uiClassName); }
            this.getUi(uiClassName, arg, true, () => { }, oninit);
            return;
        }
        if (ui.isLogUi) {
            this.logUi(uiClassName);
        }

        ui.show(arg);
    }
    /**
     * 隐藏UI
     * @param uiClassName UI名字
     */
    public static hideUi(uiClassName: string) {
        let ui = this.uiMap.get(uiClassName);
        if (!ui) {
            console.error("当前需要隐藏的UI未找到 " + uiClassName);
            return;
        }
        ui.hide();
    }
    /**
    * 销毁UI
    * @param uiClassName UI类名字
    */
    public static disposeUi(uiClassName: string, _ui: any) {
        let ui = this.uiMap.get(uiClassName);
        if (!ui) {
            if (_ui == null) {
                console.error("当前需要销毁的UI未找到 " + uiClassName);
                return;
            } else {
                ui = _ui;
            }
        } else {
            this.uiMap.delete(uiClassName);
        }
        if (this.nowLoadingMap.has(uiClassName)) {
            this.nowLoadingMap.delete(uiClassName);
        }
        ui.dispose();
    }

    /**
    * 隐藏时 销毁UI 通用 直接在UI hide时会被调用
    * @param uiClassName UI类名字
    */
    public static OnHideDisposeUi(uiClassName: string, ui: any) {
        //大部分UI隐藏就释放资源 如果有常用的UI 添加到列表中不做hide释放处理
        if (this.dontDisposeUIList.indexOf(uiClassName) == -1) {
            UiManager.disposeUi(uiClassName, ui);
        }
    }


    /**
     * 获取不是单例的UI对象 此方法可获取重复UI
     * @param uiClass UI类 对象
     * @param parentTrans 父对象
     * @param isShowUi 是否显示UI
     * @param callBack 获取UI后回调
     */
    public static getUIByName<T extends newUiBase>(className: string, parentTrans: m4m.framework.transform2D, callBack: (uiObj: T) => void, isShowUi = true) {
        let uiClass = consTool[className + this.viewName];//***************暂时处理 用 潜规则写法 
        let classObj: T;
        if (uiClass) {
            classObj = new uiClass();
            this.uiReferenceCreat(classObj, parentTrans, callBack, className, null, isShowUi);
        } else {
            //加载 分包
            let libSrc = `lib/node_modules/@types/${className}.js`;
            // console.error("开始加载UI ", libSrc);
            let loadFun = LoaderLibManager.Instance.addLib;
            loadFun = loadFun.bind(LoaderLibManager.Instance);
            loadFun(libSrc, (isSucc) => {
                if (!isSucc) {
                    console.error("找不到这个UI资源", libSrc);
                    return;
                }
                System.init();
                consTool.init();
                uiClass = consTool[className + this.viewName];//***************暂时处理 用 潜规则写法
                if (uiClass == null) {
                    console.error(" 未找到 " + (className + this.viewName));
                    return;
                }
                classObj = new uiClass();
                this.uiReferenceCreat(classObj, parentTrans, callBack, className, null, isShowUi);
            });
        }
    }

    //
    private static uiReferenceCreat(classObj, parentTrans: m4m.framework.transform2D, callBack, className, oninit, isShowUi) {
        this.creatUi(classObj, (obj) => {
            //--------------------------------
            classObj.transform = obj;
            classObj.parentTrans = parentTrans;

            // console.error("创建一个UI " + className);
            //测试clone trans显示没有问题 但对应代码的引用有问题 暂时不用
            // let atest: m4m.framework.transform2D = obj.clone();
            // let layTran = UiManager.highlayer
            // atest.setLayoutValue(m4m.framework.layoutOption.LEFT, 200);
            // atest.markDirty();
            // layTran.addChild(atest);
            // atest.visible = true;

            if (oninit) {
                classObj.onInite = oninit;
            }
            classObj.onInit();
            if (isShowUi) {
                classObj.show();
            }
            if (callBack) {
                callBack(classObj);
            }
        });
    }

    /**
     * 获取UI对象
     * @param uiClass UI类 对象
     * @param isShowUi 是否显示UI
     * @param callBack 获取UI后回调
     * @param oninit 初始化方法
     * @param coverLayer 覆盖 UI 放置到的层级设定
     * @param notHideOnOtherShow 其他UI打开时，自己不会被隐藏
     */
    public static getUi<T extends newUiBase>(uiClassName: string, arg: any, isShowUi = false, callBack: (uiObj: T) => void, oninit: () => void) {
        let className = uiClassName;
        if (this.nowLoadingMap.has(className)) {
            // console.error("当前UI正在加载和初始化中！", className);
            return;
        }
        this.nowLoadingMap.set(className, true);
        let ui: T = this.uiMap.get(className) as any;
        if (ui) {
            if (ui.isLogUi && isShowUi) {
                this.logUi(uiClassName);
            }
            if (callBack) {
                callBack(ui);
            }
            if (isShowUi) {
                ui.show();
            }
            return;
        }
        let uiClass = consTool[uiClassName + this.viewName];//***************暂时处理 用 潜规则写法 
        let classObj: T;
        if (uiClass) {
            classObj = new uiClass();
            this.setCreatUi(classObj, arg, callBack, className, uiClass, oninit, isShowUi);
        } else {
            //加载 分包
            let libSrc = `lib/node_modules/@types/${uiClassName}.js`;
            // console.error("开始加载UI ", libSrc);
            let loadFun = LoaderLibManager.Instance.addLib;
            loadFun = loadFun.bind(LoaderLibManager.Instance);
            loadFun(libSrc, (isSucc) => {
                if (!isSucc) {
                    console.error("找不到这个UI资源", libSrc);
                    return;
                }
                System.init();
                consTool.init();
                uiClass = consTool[uiClassName + this.viewName];//***************暂时处理 用 潜规则写法
                if (uiClass == null) {
                    console.error(" 未找到 " + (uiClassName + this.viewName));
                    return;
                }
                // console.error("开始创建**** UI ", libSrc);
                classObj = new uiClass();
                this.setCreatUi(classObj, arg, callBack, className, uiClass, oninit, isShowUi);
            });
        }

    }

    public static init(uiWidth: number, uiHeight: number, screenMatchRate: number, uiPrefabPath: string, atlasPath: string) {
        if (this.isInited) { return; }
        MetaUIManager._ActiveSelf = this;
        super.init(uiWidth, uiHeight, screenMatchRate, uiPrefabPath, atlasPath);
    }

    private static setCreatUi(classObj, arg: any, callBack, className, uiClass, oninit, isShowUi) {
        this.creatUi(classObj, (obj) => {
            if (this.nowLoadingMap.has(className)) {
                //---- show hide 事件包装----------
                let oldShow: Function = classObj.show;
                classObj.show = () => {
                    oldShow.apply(classObj, [arg]);
                    this._eventer.Emit(this.ON_SHOW_UI, className);
                };
                let oldHide: Function = classObj.hide;
                classObj.hide = () => {
                    oldHide.apply(classObj);
                    this._eventer.Emit(this.ON_HIDE_UI, className);
                };
                //--------------------------------
                classObj.transform = obj;
                uiClass.Instance = classObj;
                if (callBack) {
                    callBack(classObj);
                }
                if (oninit) {
                    classObj.onInite = oninit;
                }
                classObj.onInit();
                //加载完成时回调
                if (this.endLoadCallBack) { this.endLoadCallBack(className); }
                this.nowLoadingMap.delete(className);
                if (uiClass.Instance.isLogUi && isShowUi) {
                    this.logUi(className);
                }
                // console.error("先走的显示");
                //UI组装完成
                this.uiMap.set(className, classObj);
                if (isShowUi) {
                    classObj.show();
                }
                //
                this._eventer.Emit(this.ON_CREATE_UI, className);
            } else {
                if (callBack) {
                    callBack(classObj);
                }
            }
        });
    }
    private static creatUi(uiClass, callBack) {
        let uiName = uiClass.uiName;
        // let url = "Resources/newUi/" + uiName + "/resources/" + uiName + "_json.json";
        let url = this.uiPrefabPath + uiName + "/" + uiName + "_json.json";
        // let url = this.uiPrefabPath + uiName + "/resources/" + uiName + "_json.json";
        // let uijsonLoder = new combinNewLoader();
        // uijsonLoder.add(url, () => { }, LoadType.JSON);
        LoaderManage.Instance.load(`${this.atlasPath}${uiName}/${uiName}.assetbundle.json`, () => {
            // loadMgr.Instance.syncLoadList([`${this.atlasPath}${uiName}/${uiName}.assetbundle.json`], 110)
            //     .then(() => {
            LoaderManage.Instance.load(url, (loader, data) => {
                // uijsonLoder.start((data) => {
                let jsonData = data;
                if (!jsonData) {
                    console.error("ui资源json有错误在请检查文件  " + url);
                    return;
                }
                // this.jsonList.set(url, jsonData);
                let uiInfo = jsonData[0];
                if (!uiInfo) {
                    console.error("ui资源json有错误在请检查文件  " + url);
                    return;
                }
                let trans;
                //经测试 trans clone()的数据不能直接用 先用每次都创建组装
                // if (this.uiTransMap.has(uiName)) {
                //     let orgTrans=this.uiTransMap.get(uiName);
                //     trans=orgTrans.clone();
                // } else {
                let insidMap: { [key: number]: any } = {};
                let nodeDic: cMap<number> = new cMap();
                let compMap = [];
                trans = this.makeTran(uiInfo, uiClass, insidMap, nodeDic);
                this.setCompsToTran2D(trans, uiInfo, insidMap, compMap, uiClass);
                this.referenceComps(insidMap, compMap);

                // console.error("开始组装 " + uiName);
                //开始组装 引用的UI
                this.makeReferenceTran(uiInfo, uiClass, insidMap, nodeDic, (res) => {
                    if (nodeDic.size <= 0) {
                        nodeDic = null;
                        // console.error("组装完成 " + uiName);
                        if (callBack) {
                            callBack(trans);
                        }
                    }
                });
                // // this.uiTransMap.set(uiName, trans);
                // // console.error("组装好一个UI " + uiName);
                // // }
                // if (callBack) {
                //     callBack(trans);
                // }
                // // });
            }, LoadType.JSON);
            // });
        }, LoadType.assetMgr);
    }

    private static referenceComps(insidMap, compMap) {
        for (let index = 0; index < compMap.length; index++) {
            const element = compMap[index];
            this.referenceComp(element, insidMap);
        }

    }
    private static setCompsToTran2D(trans: m4m.framework.transform2D, pfInfo, insidMap, compMap, uiClass) {

        for (let i = 0; i < pfInfo.components.length; i++) {
            let compInfo = pfInfo.components[i];
            let rawComp = this.makeAComp2D(compInfo, insidMap, compMap, uiClass);
            if (rawComp) {
                trans.addComponentDirect(rawComp);
            }
        }

        //递归组装子对象
        for (let i = 0; i < trans.children.length; i++) {
            let childTran = trans.children[i];
            let childTranInfo = pfInfo.children[i];
            this.setCompsToTran2D(childTran, childTranInfo, insidMap, compMap, uiClass[childTran.name]);
        }
    }

    //组装 引用UI
    private static makeReferenceTran(pfInfo, uiClass, insidMap, nodeDic: cMap<number>, callBack: Function) {
        //已组装完成的数量
        let assembleComNum = 0;
        //递归组装子对象
        if (pfInfo.children && pfInfo.children.length > 0) {
            for (let i = 0; i < pfInfo.children.length; i++) {
                let childTranInfo = pfInfo.children[i];
                //如果有引用别的PSD
                if (childTranInfo.refUiName != null) {
                    // console.error(childTranInfo.tranName + " 引用了PSD " + childTranInfo.refUiName);
                    let trans = uiClass.transform;
                    // console.error(trans.name + " ********* " + trans.width + "    " + trans.height);
                    UiManager.getUIByName(childTranInfo.refUiName, trans, (uiObj) => {
                        // console.error(childTranInfo.tranName + " 先走的回调");

                        let newTrans = uiObj.transform;
                        //给trans 赋值
                        this.assignmentTran(newTrans, childTranInfo, insidMap);

                        uiClass[childTranInfo.tranName] = uiObj;
                        uiObj.show();

                        assembleComNum++;
                        let needNum = nodeDic.get(pfInfo.tranName + "+" + pfInfo.prefab);
                        if (needNum == null) {
                            console.error("组装 引用UI 出错1!");
                        }
                        // console.log(pfInfo.tranName + "   子对象length " + needNum + " *********  已组装完成长度" + assembleComNum);
                        if (assembleComNum == needNum) {
                            nodeDic.delete(pfInfo.tranName + "+" + pfInfo.prefab);
                            // console.log(pfInfo.tranName + " id是多少 " + "%%%%%%%%%%  " + pfInfo.prefab);
                            if (callBack) {
                                callBack(pfInfo.tranName + "+" + pfInfo.prefab);
                            }
                        }
                    }, false);
                } else {
                    assembleComNum++;
                    this.makeReferenceTran(childTranInfo, uiClass[childTranInfo.tranName], insidMap, nodeDic, callBack);
                }
            }
        }
        let needAssembleNum = nodeDic.get(pfInfo.tranName + "+" + pfInfo.prefab);
        if (needAssembleNum == null) {
            console.error("组装 引用UI 出错!");
        }
        // console.log(pfInfo.tranName + "  子对象length " + needAssembleNum + "   已组装完成长度" + assembleComNum);
        if (assembleComNum == needAssembleNum) {
            nodeDic.delete(pfInfo.tranName + "+" + pfInfo.prefab);//完成
            // console.log(pfInfo.tranName + " id是多少 " + pfInfo.tranName + "  " + pfInfo.prefab);
            if (callBack) {
                callBack(pfInfo.tranName + "+" + pfInfo.prefab);
            }
        }
    }
    //给trans 赋值
    private static assignmentTran(trans: m4m.framework.transform2D, pfInfo, insidMap) {
        trans.name = pfInfo.tranName;
        trans.prefab = pfInfo.prefab;
        trans.layer = pfInfo.layer;
        trans.tag = pfInfo.tag;
        trans.isStatic = pfInfo.isStatic;
        trans.width = pfInfo.width;
        trans.height = pfInfo.height;
        m4m.math.vec2Clone(pfInfo.pivot, trans.pivot);
        trans.visible = pfInfo._visible;
        m4m.math.vec2Clone(pfInfo.localTranslate, trans.localTranslate);
        m4m.math.vec2Clone(pfInfo.localScale, trans.localScale);
        trans.localRotate = pfInfo.localRotate;
        trans.isMask = pfInfo.isMask;
        trans.layoutState = pfInfo.layoutState;
        trans.layoutPercentState = pfInfo.layoutPercentState;
        trans.setLayoutValue(m4m.framework.layoutOption.LEFT, pfInfo.layoutValueMap.n1);
        trans.setLayoutValue(m4m.framework.layoutOption.TOP, pfInfo.layoutValueMap.n2);
        trans.setLayoutValue(m4m.framework.layoutOption.RIGHT, pfInfo.layoutValueMap.n4);
        trans.setLayoutValue(m4m.framework.layoutOption.BOTTOM, pfInfo.layoutValueMap.n8);
        trans.setLayoutValue(m4m.framework.layoutOption.H_CENTER, pfInfo.layoutValueMap.n16);
        trans.setLayoutValue(m4m.framework.layoutOption.V_CENTER, pfInfo.layoutValueMap.n32);
        if (pfInfo.insid != null) {
            insidMap[pfInfo.insid] = trans;
        }
    }
    private static makeTran(pfInfo, uiClass, insidMap, nodeDic: cMap<number>) {
        if (uiClass == null) {
            console.error("UI组装出错!");
            return;
        }
        let trans = new m4m.framework.transform2D();
        uiClass.transform = trans;
        this.assignmentTran(trans, pfInfo, insidMap);
        //需要组装的数量
        let needAssembleNum = 0;
        //递归组装子对象
        if (pfInfo.children && pfInfo.children.length > 0) {
            needAssembleNum = pfInfo.children.length;
            for (let i = 0; i < pfInfo.children.length; i++) {
                let childTranInfo = pfInfo.children[i];
                //如果有引用别的PSD
                if (childTranInfo.refUiName != null) {

                } else {
                    let childTran = this.makeTran(childTranInfo, uiClass[childTranInfo.tranName], insidMap, nodeDic);
                    trans.addChild(childTran);
                }
            }
        }
        //
        nodeDic.set(pfInfo.tranName + "+" + pfInfo.prefab, needAssembleNum);
        return trans;
    }
    private static makeAComp2D(compInfo: any, insidMap, compMap, uiClass) {
        let name = compInfo.cmop as string || compInfo.className as string;
        switch (name) {
            case "button":
                let compButton = new m4m.framework.button();
                compButton.transition = compInfo.transition;
                compButton["_origianlSpriteName"] = compInfo._origianlSpriteName;
                compButton["_pressedSpriteName"] = compInfo._pressedSpriteName;
                m4m.math.colorClone(compInfo.normalColor, compButton.normalColor);
                m4m.math.colorClone(compInfo.pressedColor, compButton.pressedColor);
                compButton.fadeDuration = compInfo.fadeDuration;
                compInfo["_comp"] = compButton;
                uiClass.button = compButton;
                compMap.push(compInfo);
                return compButton;
            case "image2D":
                let compImage2D = new m4m.framework.image2D();
                m4m.math.colorClone(compInfo.color, compImage2D.color);
                compImage2D.imageType = compInfo.imageType;
                compImage2D.fillMethod = compInfo.fillMethod;
                compImage2D.fillAmmount = compInfo.fillAmmount;
                // compImage2D.sprite = m4m.framework.sceneMgr.app.getAssetMgr().getDefaultSprite("grid_sprite");
                let assetMgr = m4m.framework.sceneMgr.app.getAssetMgr();
                let _sp = assetMgr.getDefaultSprite(compInfo._spriteName);
                if (!_sp) {
                    _sp = assetMgr.getAssetByName(compInfo._spriteName);

                }
                compImage2D.sprite = _sp;
                compImage2D["_spriteName"] = compInfo._spriteName;
                compImage2D["_imageBorder"].l = compInfo._imageBorder.l;
                compImage2D["_imageBorder"].t = compInfo._imageBorder.t;
                compImage2D["_imageBorder"].r = compInfo._imageBorder.r;
                compImage2D["_imageBorder"].b = compInfo._imageBorder.b;
                uiClass.image = compImage2D;
                return compImage2D;
            case "label":
                let compLabel = new m4m.framework.label();
                compLabel.text = compInfo.text;
                //compLabel.font = new m4m.framework.font(compInfo._fontName);
                //compLabel["_fontName"] = compInfo._fontName;

                //lights add
                if (m4m.framework.label.commonfontSelector == null) {
                    let fontname = "Microsoft YaHei";
                    if (compInfo._fontName != "defFont.font.json") {
                        fontname = compInfo._fontName;
                    }
                    m4m.framework.label.commonfontSelector = new m4m.framework.FontSelector_autoSize(this.overlay, fontname);
                }
                //compLabel. =new m4m.framework.FontSelector_autoSize(this.overlay,fontname,compInfo.fontsize);
                compLabel.fontsize = compInfo.fontsize;
                compLabel.linespace = compInfo.linespace;
                compLabel.horizontalType = compInfo.horizontalType;
                compLabel.verticalType = compInfo.verticalType;
                compLabel.horizontalOverflow = compInfo.horizontalOverflow;
                compLabel.verticalOverflow = compInfo.verticalOverflow;
                m4m.math.colorClone(compInfo.color, compLabel.color);
                m4m.math.colorClone(compInfo.color2, compLabel.color2);
                //compInfo.color2 = new m4m.math.color(0,0,0,0);
                uiClass.label = compLabel;
                return compLabel;
            case "scrollRect":
                let compScrollRect = new m4m.framework.scrollRect();
                compScrollRect.content = insidMap[compInfo.content];
                compScrollRect.horizontal = compInfo.horizontal;
                compScrollRect.vertical = compInfo.vertical;
                compScrollRect.inertia = compInfo.inertia;
                compScrollRect.decelerationRate = compInfo.decelerationRate;
                uiClass.scrollRect = compScrollRect;
                return compScrollRect;
            case "rawImage2D":
                let compRawImage2D = new m4m.framework.rawImage2D();
                m4m.math.colorClone(compInfo.color, compRawImage2D.color);
                uiClass.rawImage2D = compRawImage2D;
                return compRawImage2D;
            case "progressbar":
                let compProgressbar = new m4m.framework.progressbar();
                compProgressbar.value = compInfo.value;
                compProgressbar.cutPanel = insidMap[compInfo.cutPanel];
                // compProgressbar.barOverImg = insidMap[compInfo.barOverImg];
                // compProgressbar.barBg = insidMap[compInfo.barBg];
                compInfo["_comp"] = compProgressbar;
                compMap.push(compInfo);
                uiClass.progressbar = compProgressbar;
                return compProgressbar;
            case "input":
                let compinput = new m4m.framework.inputField();
                compinput.characterLimit = compInfo.characterLimit;
                compinput.LineType = compInfo.LineType;
                compinput.ContentType = compInfo.ContentType;

                // compinput.frameImage=insidMap[compInfo.frameImage];
                // compinput.TextLabel=insidMap[compInfo.TextLabel];
                // compinput.PlaceholderLabel=insidMap[compInfo.PlaceholderLabel];
                compInfo["_comp"] = compinput;
                compMap.push(compInfo);
                uiClass.inputField = compinput;
                return compinput;
            default: return null;
        }
    }

    private static referenceComp(compInfo: any, insidMap) {
        let name = compInfo.cmop || compInfo.className;
        switch (name) {
            case "button":
                let compButton = compInfo["_comp"] as m4m.framework.button;
                if (insidMap[compInfo.targetImage]) {
                    let image = insidMap[compInfo.targetImage].getComponent("image2D") as m4m.framework.image2D;
                    compButton.targetImage = image;
                }
                break;
            case "progressbar":
                let compProgressbar = compInfo["_comp"] as m4m.framework.progressbar;
                if (insidMap[compInfo.barBg]) {
                    compProgressbar.barBg = insidMap[compInfo.barBg].getComponent("image2D") as m4m.framework.image2D;
                }
                if (insidMap[compInfo.barOverImg]) {
                    compProgressbar.barOverImg = insidMap[compInfo.barOverImg].getComponent("image2D") as m4m.framework.image2D;
                }
                break;
            case "input":
                let compinput = compInfo["_comp"] as m4m.framework.inputField;
                if (insidMap[compInfo.frameImage]) {
                    compinput.frameImage = insidMap[compInfo.frameImage].getComponent("image2D") as m4m.framework.image2D;
                }
                if (insidMap[compInfo.TextLabel]) {
                    compinput.TextLabel = insidMap[compInfo.TextLabel].getComponent("label") as m4m.framework.label;
                }
                if (insidMap[compInfo.PlaceholderLabel]) {
                    compinput.PlaceholderLabel = insidMap[compInfo.PlaceholderLabel].getComponent("label") as m4m.framework.label;
                }
                break;
            default: let temp;
        }
    }

}
export enum uiLayerType {
    downlayer = -1,
    baselayer = 0,
    midlayer = 1,
    highlayer = 2,
    poplayer = 3,
}