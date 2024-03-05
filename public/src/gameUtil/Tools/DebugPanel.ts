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
import { FrameMgr } from "./FrameMgr";
import transform2D = m4m.framework.transform2D;
import vector2 = m4m.math.vector2;
import layoutOption = m4m.framework.layoutOption;

declare const $: any;

enum HandlerType {
    none,
    choose,
    move,
    scale,
    rotate
}

export class DebugPanel {
    //--------------------------
    private static gameContainer: HTMLDivElement;
    private static gameMask: HTMLDivElement;
    private static debugRoot: HTMLDivElement;
    private static attrRoot: HTMLElement;
    private static resetBtn: HTMLButtonElement;
    private static chooseUiBtn: HTMLButtonElement;
    private static moveUiBtn: HTMLButtonElement;
    private static scaleUiBtn: HTMLButtonElement;
    private static rotationUiBtn: HTMLButtonElement;
    private static handlerTypeLabel: HTMLLabelElement;
    private static hoverbtn: HTMLButtonElement;

    private static _handlerType: HandlerType = HandlerType.none;
    private static _transMap = new Map<number, any>();
    private static _debugRootVisible = false;
    private static maskMouseDown: boolean = false;
    private static _prevX: number = -1;
    private static _prevY: number = -1;
    private static _startX: number = -1;
    private static _startY: number = -1;

    //--------------------------
    private static app: m4m.framework.application;
    private static canvas: m4m.framework.overlay2D;
    //组件数据
    private static _component2d: { [key: string]: string[] } = {};
    
    //边框元素
    private static outlineElement: HTMLDivElement;
    //边框宽度
    private static outlineWidth = 3;
    private static currentTrans: transform2D;
    private static _pickUIContinuity: transform2D[] = [];
    private static _prevPos: vector2 = new vector2();
    
    public static init() {
        this.refreshComponents();

        this.gameContainer = globalThis.document.getElementById("gamecontainer") as HTMLDivElement;
        this.gameContainer.style.position = "unset";
        this.gameMask = document.createElement("div");
        this.gameMask.style.width = "100%";
        this.gameMask.style.height = "100%";
        this.gameMask.style.position = "absolute";
        this.gameMask.style.display = "none";
        this.gameMask.addEventListener("click", this.onMaskClick.bind(this))
        this.gameMask.addEventListener("mousemove", this.onMaskMouseMove.bind(this))
        this.gameMask.addEventListener("mousedown", (e) => {
            this.maskMouseDown = true;
            this._startX = e.clientX;
            this._startY = e.clientY;
            this._prevX = e.clientX;
            this._prevY = e.clientY;
        });
        this.gameMask.addEventListener("mouseup", () => {
            this.maskMouseDown = false;
            this._prevX = -1;
            this._prevY = -1;
        });
        this.gameContainer.firstChild.appendChild(this.gameMask);

        this.debugRoot = document.getElementById("gamedebugpanel") as HTMLDivElement;
        this.attrRoot = document.getElementById("attr-root") as HTMLDivElement;
        this.hoverbtn = document.getElementById("gamedebugpanel-hoverbtn") as HTMLButtonElement;
        this.hoverbtn.addEventListener("click", this.onGamedebugpanelBtn.bind(this));

        this.resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
        this.chooseUiBtn = document.getElementById("choose-ui") as HTMLButtonElement;
        this.moveUiBtn = document.getElementById("move-ui") as HTMLButtonElement;
        this.scaleUiBtn = document.getElementById("scale-ui") as HTMLButtonElement;
        this.rotationUiBtn = document.getElementById("rotation-ui") as HTMLButtonElement;
        this.handlerTypeLabel = document.getElementById("handlerType") as HTMLLabelElement;

        this.handlerTypeLabel.innerText = this.resetBtn.innerText;
        this.resetBtn.addEventListener("click", () => {
            this._handlerType = HandlerType.none;
            this.handlerTypeLabel.innerText = this.resetBtn.innerText;
            this._prevPos.x = 0;
            this._prevPos.y = 0;
            this._pickUIContinuity.length = 0;
            this.gameMask.style.display = "none";
            this.hideOutline();
        });
        this.chooseUiBtn.addEventListener("click", () => {
            this._handlerType = HandlerType.choose;
            this.handlerTypeLabel.innerText = this.chooseUiBtn.innerText;
            this._prevPos.x = 0;
            this._prevPos.y = 0;
            this._pickUIContinuity.length = 0;
            this.gameMask.style.display = "block";
        });
        this.moveUiBtn.addEventListener("click", () => {
            this._handlerType = HandlerType.move;
            this.handlerTypeLabel.innerText = this.moveUiBtn.innerText;
            this._prevPos.x = 0;
            this._prevPos.y = 0;
            this._pickUIContinuity.length = 0;
            this.gameMask.style.display = "block";
        });
        this.scaleUiBtn.addEventListener("click", () => {
            this._handlerType = HandlerType.scale;
            this.handlerTypeLabel.innerText = this.scaleUiBtn.innerText;
            this._prevPos.x = 0;
            this._prevPos.y = 0;
            this._pickUIContinuity.length = 0;
            this.gameMask.style.display = "block";
        });
        this.rotationUiBtn.addEventListener("click", () => {
            this._handlerType = HandlerType.rotate;
            this.handlerTypeLabel.innerText = this.rotationUiBtn.innerText;
            this._prevPos.x = 0;
            this._prevPos.y = 0;
            this._pickUIContinuity.length = 0;
            this.gameMask.style.display = "block";
        });

        //-----------------------------------

        this.app = m4m.framework.sceneMgr.app;
        this.canvas = this.app.getScene().mainCamera.getOverLays()[0] as m4m.framework.overlay2D;
        
        FrameMgr.Add(this.update, this);
        
        //加载trans树
        let tree = $("#tree-root");
        tree.loadTree(
            {
                data: {
                    //************** 从自定义方法获取数据 ******************
                    //自定义方法获取数据,函数返回数据,function(){return data},
                    func: () => {
                        this._transMap.clear();
                        let data = [];
                        let children = this.canvas.canvas.getRoot().children;
                        for (const trans of children) {
                            data.push(this.transToTreeData(trans));
                        }
                        return data;
                    }
                },
                process: {
                    //是否打开树节点,默认false,参数为 boolean值 或者 function(item,index,layer){return boolean},
                    open: false,
                    //是否启用该节点,默认true,如果为false,那么该节点以及该节点的所有子节点都不会启用,参数为 boolean值 或者 function(item,index,layer){return boolean},
                    enable: true,
                    //显示的图标,bootstrap的图标样式,参数为 icon字段名 或者 function(item,index,layer){return str | jqueryObj},
                    icon: 'icon',
                    //checkbox,如果为 undefined 将不显示checkbox,
                    //你可以直接写 checkbox : function(item,index,layer){return checkboxObj} ,函数返回一个checkbox对象
                    //当然也可以像下面这样
                    checkbox: undefined,
                    //标题(鼠标悬停时显示),参数为 title字段名 或者 function(item,index,layer){return str | JQueryObj},
                    title: undefined,
                    //树节点显示内容,参数为 text字段名 或者 function(item,index,layer){return str | JQueryObj},
                    text: 'text',
                    //后面的自定义内容,function(data,index,layer){return JQueryObj},
                    after: (data) => {
                        let trans: transform2D = data.trans;
                        let flag = trans.visible;
                        let _self = $('<div style="float: right;" class="glyphicon glyphicon-unchecked"></div>');
                        let refreshVisible = () => {
                            if (flag) {
                                _self.removeClass("glyphicon-unchecked");
                                _self.addClass("glyphicon-check");
                            } else {
                                _self.addClass("glyphicon-unchecked");
                                _self.removeClass("glyphicon-check");
                            }
                        }
                        refreshVisible();
                        return _self.click((e) => {
                            e.stopPropagation();
                            flag = !flag;
                            if (!trans.beDispose) {
                                trans.visible = flag;
                            }
                            refreshVisible();
                        });
                    },
                    //子级(list集合),参数为 自己集合的字段名 或者 function(item,index,layer){return list}
                    child: 'list',
                    //节点点击事件
                    //可以直接 onClick : function(e,node,data,type){return void}
                    //参数 node 为当前节点(span)的jquery对象 ,参数 type 为点击的节点类型 : 'parent' 或 'child'
                    //当然也可以像下面这样
                    onClick: (e,node,data,type) => {
                        //node.remove();
                        let trans: transform2D = data.trans;
                        this.showOutline(trans);
                    },
                    //当以上操作全部完成后,执行自定义操作,function (liObj,item,index,layer) {return void},参数 liObj 为当前列表的jquery对象
                    custom: (liObj,item,index,layer) => {
                        let trans: transform2D = item.trans;
                        if (!trans.beDispose) {
                            this._transMap.set(trans.insId.getInsID(), liObj);
                        }
                    },
                },
                //节点树是否占满父级节点,默认false
                fill: true,
                //字体大小
                fontSize: "11px",
                //行距,默认3px
                spacing: "1px",
                //行高
                height: "13px",
                //是否启用辅助线条, 默认true, 也可以填指定颜色, 如 auxiliaryLine: #2A508E , 默认颜色 : #BABABA
                auxiliaryLine: true
            }
        )

        //查询trans树
        let searchInput = $("#search-input");
        let searchBtn = $("#search-btn");
        searchBtn.click(() => {
            let val = searchInput.val();
            tree.queryTree(val);
        })

        //刷新trans树
        let refresh = $("#refresh-btn");
        refresh.click(() => {
            tree.reloadTree();
        });
    }

    private static onGamedebugpanelBtn(e) {
        if (this.debugRoot.style.width === "0px") {
            this.debugRoot.style.width = "400px";
        } else {
            this.debugRoot.style.width = "0px";
        }
        this._debugRootVisible = !this._debugRootVisible;
    }

    private static transToTreeData(trans: transform2D) {
        let data: any = {
            text: trans.name,
            trans
        }
        let c = trans.children;
        if (c.length > 0) {
            let list = [];
            for (const item of c) {
                list.push(this.transToTreeData(item));
            }
            data.list = list;
        }
        return data;
    }

    /**
     * 显示 transform 边框
     */
    public static showOutline(trans: transform2D) {
        this.currentTrans = trans;
        this.showAttr(this.currentTrans);
        this.showTransOutline(this.currentTrans);
    }

    /**
     * 隐藏 transform 边框
     */
    public static hideOutline() {
        this.currentTrans = null;
        if (this.outlineElement) {
            this.outlineElement.style.display = "none";
        }
    }

    private static showTransOutline(trans: transform2D) {
        if (trans.beDispose) {
            this.hideOutline();
            return;
        }
        let scaleWidth = this.canvas.getScaleWidth() / window.devicePixelRatio;
        let scaleHeight = this.canvas.getScaleHeight() / window.devicePixelRatio;

        let worldRotate = trans.getWorldRotate();
        let worldScale = trans.getWorldScale();
        let worldTranslate = trans.getWorldTranslate();
        let realWith = trans.width * worldScale.x * scaleWidth;
        let realHeight = trans.height * worldScale.y * scaleHeight;

        if (!this.outlineElement) {
            this.outlineElement = document.createElement("div");
            this.outlineElement.style.pointerEvents = "none";
            document.body.appendChild(this.outlineElement);
        } else {
            this.outlineElement.style.display = "block";
        }
        
        this.outlineElement.style.left = (worldTranslate.x * scaleWidth - realWith * trans.pivot.x - this.outlineWidth) + "px";
        this.outlineElement.style.top = (worldTranslate.y * scaleHeight - realHeight * trans.pivot.y - this.outlineWidth) + "px";

        this.outlineElement.style.width = (realWith + this.outlineWidth * 2) + "px";
        this.outlineElement.style.height = (realHeight + this.outlineWidth * 2) + "px";
        this.outlineElement.style.position = "absolute";
        this.outlineElement.style.transform = `rotate(${this.convertToDegrees(worldRotate.v)}deg)`;
        this.outlineElement.style.transformOrigin = `${trans.pivot.x * 100}% ${trans.pivot.y * 100}%`;
        this.outlineElement.style.border = `${this.outlineWidth}px solid red`;
    }

    private static _time: number = 0;
    //每帧更新
    private static update(delta: number) {
        if (this.currentTrans) {
            this.showTransOutline(this.currentTrans);
        }
        if (!this._debugRootVisible) {
            return;
        }
        this._time -= delta;
        if (this._time <= 0) {
            this._time = 0.5;
            this.showAttr(this.currentTrans);
        }
    }
    
    public static onMaskClick(e: MouseEvent) {
        if (this._handlerType == HandlerType.choose) {
            this.chooseUi(e.clientX, e.clientY);
        }
    }

    private static onMaskMouseMove(e: DragEvent) {
        if (!this.maskMouseDown || this.currentTrans == null || this.currentTrans.beDispose) {
            return;
        }
        let offsetX = e.clientX - this._prevX;
        let offsetY = e.clientY - this._prevY;
        if (offsetX == 0 && offsetY == 0) {
            return;
        }
        this._prevX = e.clientX;
        this._prevY = e.clientY;
        if (this._handlerType == HandlerType.move) {
            let pos = this.currentTrans.getWorldTranslate();
            pos = new vector2(pos.x + offsetX * 0.001 * window.devicePixelRatio, pos.y + offsetY * -0.0017 * window.devicePixelRatio);
            this.currentTrans.setWorldPosition(pos);
            this.currentTrans.markDirty();
        } else if (this._handlerType == HandlerType.scale) {
            let scale = this.currentTrans.localScale;
            scale = new vector2(scale.x + offsetX * 0.01, scale.y + offsetY * -0.01);
            this.currentTrans.localScale = scale;
            this.currentTrans.markDirty();
        } else if (this._handlerType == HandlerType.rotate) {
            let rot = this.currentTrans.localRotate;
            rot = rot + this.convertToRadians(offsetX * 0.1);
            this.currentTrans.localRotate = rot;
            this.currentTrans.markDirty();
        }
    }

    private static chooseUi(x, y) {
        this.hideOutline();
        let lay2d = this.canvas;
        //转换成 UI 坐标
        let mPos = new vector2();
        lay2d.calScreenPosToModelPos(new vector2(x, y), mPos);
        // commTool.screenPosToUIpos();

        if (this._prevPos.x != mPos.x || this._prevPos.y!= mPos.y) { //坐标有变动
            this._prevPos.x = mPos.x;
            this._prevPos.y = mPos.y;
            this._pickUIContinuity.length = 0;
        }

        //遍历 所有
        let uiRoot = lay2d.canvas.getRoot();
        let target: m4m.framework.transform2D;
        this.each2DTrans(uiRoot, (val, index, layer) => {
            if (layer >= 4 && val.visible) {
                //匹配点击区域
                let b = val.ContainsCanvasPoint(mPos);
                if (b) {
                    if (this._pickUIContinuity.indexOf(val) == -1) {
                        this._pickUIContinuity.push(val);
                        target = val;
                        return false;    //中断 遍历
                    }
                }
            }
        });

        if (target == null && this._pickUIContinuity.length > 0) {
            this._pickUIContinuity.length = 1;
            target = this._pickUIContinuity[0];
        }

        if (!target) {
            console.log(` 没有获取到任何一个 ui 节点`);
            return;
        }
    
        //展开树
        let id = target.insId.getInsID();
        if (this._transMap.has(id)) {
            let node = this._transMap.get(id);
            node.spreadTreeNode();
        }
        this.showOutline(target);
    }

    private static showAttr(target: transform2D) {
        if (!target) {
            this.attrRoot.innerText = "";
            return;
        }
        if (target.beDispose) {
            this.attrRoot.innerText = "该物体已被销毁!";
            return;
        }

        let pos = target.localTranslate;
        let scale = target.localScale;
        let angle = this.convertToDegrees(target.localRotate);
        let wpos = target.getWorldTranslate();
        let wscale = target.getWorldScale();
        let wangle = this.convertToDegrees(target.getWorldRotate().v);

        let str = "名称：" + target.name + "\n";
        str += `标签：${target.tag}\n`;
        str += `层级：${target.layer}\n`;
        str += `本地坐标：(${pos.x}, ${pos.y})\n`;
        str += `本地缩放：(${scale.x}, ${scale.y})\n`;
        str += `本地旋转：${angle}\n`;
        str += `世界坐标：(${wpos.x}, ${wpos.y})\n`;
        str += `世界缩放：(${wscale.x}, ${wscale.y})\n`;
        str += `世界旋转：${wangle}\n`;
        str += `宽：${target.width}\n`;
        str += `高：${target.height}\n`;
        str += `锚点：(${target.pivot.x}, ${target.pivot.y})\n`;

        //布局相关
        str += "布局：\n"
        let layoutState = target.layoutState;
        if ((layoutState & layoutOption.LEFT) != 0) {
            str += `        l：${target.getLayoutValue(layoutOption.LEFT)}\n`
        }
        if ((layoutState & layoutOption.H_CENTER) != 0) {
            str += `        h：${target.getLayoutValue(layoutOption.H_CENTER)}\n`
        }
        if ((layoutState & layoutOption.RIGHT) != 0) {
            str += `        r：${target.getLayoutValue(layoutOption.RIGHT)}\n`
        }
        if ((layoutState & layoutOption.TOP) != 0) {
            str += `        t：${target.getLayoutValue(layoutOption.TOP)}\n`
        }
        if ((layoutState & layoutOption.V_CENTER) != 0) {
            str += `        v：${target.getLayoutValue(layoutOption.V_CENTER)}\n`
        }
        if ((layoutState & layoutOption.BOTTOM) != 0) {
            str += `        b：${target.getLayoutValue(layoutOption.BOTTOM)}\n`
        }

        //组件
        str += `组件：\n`;
        str += target.components.map((val) => {
            let copm = val.comp;
            let cn = copm["constructor"].name;
            let temp = `----${cn}\n`;
            let arr = this._component2d[cn];
            if (arr != null) {
                for (const key of arr) {
                    temp += `       ${key}：${this.valueToString(copm[key])}\n`;
                }
            }
            return temp;
        }).join("")

        this.attrRoot.innerText = str;
    }

    private static valueToString(v: any) {
        if (v === null) {
            return "null";
        }
        switch (typeof v) {
            case "undefined":
                return "undefined";
            case "string":
                return v;
            case "number":
            case "boolean":
            case "bigint":
                return v.toString();
            case "function":
                return "function";
            case "symbol":
                return "symbol";
        }
        if (v instanceof m4m.math.vector2) {
            return `(${v.x}, ${v.y})`;
        }
        if (v instanceof m4m.math.vector3) {
            return `(${v.x}, ${v.y}, ${v.z})`;
        }
        if (v instanceof m4m.math.color) {
            return `(${v.r}, ${v.g}, ${v.b}, ${v.a})`;
        }
        if (v instanceof m4m.math.rect) {
            return `(x：${v.x}, y：${v.y}, w：${v.w}, h：${v.h})`;
        }
        if (v instanceof m4m.math.border) {
            return `(l：${v.l}, r：${v.r}, t：${v.t}, b：${v.b})`;
        }
        if (v instanceof transform2D) {
            return `{transform2D: ${v.name}}`;
        }
        if (v instanceof m4m.framework.gameObject) {
            return `{gameObject: ${v.transform.name}}`;
        }
        if (v instanceof m4m.framework.sprite) {
            return `{sprite: ${v.getName()}}`;
        }
        if (v instanceof m4m.framework.texture) {
            return `{texture: ${v.getName()}}`;
        }
        let name = v.constructor.name;
        return `{${name}}`;
    }
    
    /**
     * 将角度制转换为弧度制
     * @param {number} degrees - 角度值
     * @returns {number} - 弧度值
     */
    private static convertToRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    /**
     * 将弧度制转换为角度制
     * @param {number} radians - 弧度值
     * @returns {number} - 角度值
     */
    private static convertToDegrees(radians: number) {
        return radians * 180 / Math.PI;
    }

    private static each2DTrans(trans: transform2D, func: (child: transform2D, index?: number, layer?: number) => void | boolean, index: number = 0, layer: number = 1) {
        if (!trans) {
            return;
        }
        let children = trans.children;
        for (let i = children.length - 1; i >= 0; i--) {
            let c = children[i];
            if (this.each2DTrans(c, func, i, layer + 1) == false) return false;
            if (func(c, i, layer + 1) === false) return false;
        }
    }

    /**
     * 刷新组件数据
     */
    public static refreshComponents() {
        let gdmeta = m4m.m4m_reflect_root.__gdmeta__;
        //临时处理, 在 m4m.m4m_reflect_root 下寻找新组件数据
        for (let key in gdmeta) {
            let item = gdmeta[key];
            if (!item.__gdmeta__) {
                continue;
            }
            let gmmeta = item.__gdmeta__;
            let cls = gmmeta.class;
            if (cls && cls.custom) {
                let custom = cls.custom;
                if (custom["2dcomp"]) { //2d组件
                    if (!(cls.typename in this._component2d)) {
                        this._component2d[cls.typename] = this.getFields(gmmeta);
                    }
                }
            }
        }
    }
    
    /**
     * 获取所有字段描述
     */
    private static getFields(gmmeta) {
        let fields: string[] = [];
        for (let key in gmmeta) {
            let item = gmmeta[key];
            if (item.type == "field") {
                fields.push(key)
            }
        }
        return fields;
    }
}