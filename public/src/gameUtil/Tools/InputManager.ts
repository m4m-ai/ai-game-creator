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
import { UiManager } from "PSDUI/UiManager";

export class InputManager {
    public static init() {
        let inputMgr = m4m.framework.sceneMgr.app.getInputMgr();
        inputMgr.addPointListener(m4m.event.PointEventEnum.PointMove, this.onMove, this);
        inputMgr.addPointListener(m4m.event.PointEventEnum.PointDown, this.onDown, this);
        inputMgr.addPointListener(m4m.event.PointEventEnum.PointUp, this.onUp, this);
    }
    //横向滑动
    public static onHorizTouch: Function;
    //竖向滑动
    public static onDragTouch: Function;
    // tslint:disable-next-line: variable-name
    public static lastPoint_x = -1;
    // tslint:disable-next-line: variable-name
    public static lastPoint_y = 0;
    //按下的起点
    public static downPointX = -1;
    public static downPointY = 0;
    //弹起的坐标点
    public static upPointX = -1;
    public static upPointY = 0;
    private static upCallBackList: Function[] = new Array();
    private static downCallBackList: Function[] = new Array();
    private static isDonw = false;
    private static lastPos = new m4m.math.vector3();
    public static addUpCallBackFun(callBackFun: Function) {
        this.upCallBackList.push(callBackFun);
    }
    public static removeUpCallBackFun(callBackFun: Function) {
        let index = this.upCallBackList.indexOf(callBackFun);
        if (index != -1) {
            this.upCallBackList.splice(index, 1);
        }
    }

    //添加按下回调
    public static addDownCallBackFun(callBackFun: Function) {
        this.downCallBackList.push(callBackFun);
    }
    public static removeDownCallBackFun(callBackFun: Function) {
        let index = this.downCallBackList.indexOf(callBackFun);
        if (index != -1) {
            this.downCallBackList.splice(index, 1);
        }
    }

    private static moveCallBackList: Function[] = new Array();
    public static addMoveCallBackFun(callBackFun: Function) {
        this.moveCallBackList.push(callBackFun);
    }
    public static removeMoveCallBackFun(callBackFun: Function) {
        let index = this.moveCallBackList.indexOf(callBackFun);
        if (index != -1) {
            this.moveCallBackList.splice(index, 1);
        }
    }
    private static oldColor;
    //
    private static test: boolean = false;
    private static onDown([x, y]) {
        this.isDonw = true;
        // if (this.test) {
        //     console.error("按下 ", x, y);
        //     let trans: m4m.framework.transform2D[] = UiManager.ActiveSelf.overlay.pickAll2d(x, y);
        //     console.error(trans);
        //     for (let i = 0; i < trans.length; i++) {
        //         const element = trans[i];
        //         let raw = element.getComponent("rawImage2D") as m4m.framework.rawImage2D;
        //         if (raw && element.name == "测试图片") {
        //             let reader = (raw.image.glTexture as m4m.render.glTexture2D).getReader();
        //             if (reader) {
        //                 let worldPos = element.getWorldTranslate();
        //                 let scrPos = m4m.math.pool.new_vector2();
        //                 UiManager.ActiveSelf.overlay.calScreenPosToCanvasPos(new m4m.math.vector2(x, y), scrPos);
        //                 console.error(element.name, worldPos, scrPos);
        //                 let reX = Math.floor(scrPos.x - worldPos.x);
        //                 let reY = Math.floor(scrPos.y - worldPos.y);
        //                 console.error("点中图片的像素！", reX, reY);
        //                 let pix = reader.getPixel(reX, raw.image.glTexture.height - reY);
        //                 console.error(pix);
        //                 if (this.oldColor == null) {
        //                     this.oldColor = raw.color;
        //                 }

        //                 raw.color = new m4m.math.color(pix.r / 255, pix.g / 255, pix.b / 255, pix.a / 255);
        //                 raw.transform.markDirty();
        //                 setTimeout(() => {
        //                     raw.color = this.oldColor;
        //                     raw.transform.markDirty();
        //                     let worldPosition = element.getWorldTranslate();
        //                     console.error(element.name, worldPosition);
        //                 }, 1000);
        //             } else {
        //                 console.warn(`getReader() fail : }`);
        //                 return;
        //             }
        //         }
        //     }
        // }
        //console.error("按下坐标", x, y);
        this.lastPoint_x = x;
        this.lastPoint_y = y;
        this.downPointX = x;
        this.downPointY = y;
        this.lastPos.x = x;
        this.lastPos.y = y;
        this.downCallBackList.forEach((callBackFun) => {
            if (callBackFun) {
                callBackFun(x, y);
            }
        });
    }
    private static onUp([x, y]) {
        this.isDonw = false;
        this.upPointX = x;
        this.upPointY = y;
        //console.error("弹起坐标", x, y);
        this.onHorizTouch = null;
        this.onDragTouch = null;
        this.upCallBackList.forEach((callBackFun) => {
            if (callBackFun) {
                callBackFun(x, y);
            }
        });
    }
    //对应unity中 getSlideValue 获取ui 坐标系下的滑动距离
    private static getSlideValue(x, y, lastX, lastY) {
        return 0;
    }
    private static onMove([x, y]) {
        // // console.error("移动--- ", x, y)
        this.moveCallBackList.forEach((callBackFun) => {
            if (callBackFun) {
                callBackFun(x, y);
            }
        });
        if (!this.isDonw) {
            return;
        }

        if (this.onHorizTouch) {//横向滑动
            let len = Math.abs(this.lastPoint_x - x);
            if (len > 0.1) {
                let dir = Math.sign(this.lastPoint_x - x);
                let slideValue = this.getSlideValue(x, y, this.lastPoint_x, this.lastPoint_y);
                // console.error(a);
                if (slideValue != 0) {
                    len = Math.abs(slideValue);
                }
                this.onHorizTouch(dir * len);
                // console.error("滑动 ", dir * len);
            }
        }

        if (this.onDragTouch) {//竖向滑动
            let foo = this.lastPoint_y - y;
            if (Math.abs(foo) > 0.1) {
                this.onDragTouch(foo);
            }
        }

        this.lastPoint_x = x;
        this.lastPoint_y = y;
    }
}