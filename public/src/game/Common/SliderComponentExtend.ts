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
import { SliderComponent } from "Data/SliderComponent";
import { UiManager } from "PSDUI/UiManager";
import { InputManager } from "Tools/InputManager";

//滑动组件
@m4m.reflect.node2DComponent
export class SliderComponentExtend extends SliderComponent {
    public offsetPercent: number = 0.6;
    public offsetWidth: number = 0;
    public callBackFun: Function;

    //弹起回调
    public upCallBackFun: Function;
    //最大阶段值
    public maxNum: number = -1;

    private scrPos: m4m.math.vector2 = new m4m.math.vector2();
    private canvasPos: m4m.math.vector2 = new m4m.math.vector2();
    protected get transWidth(): number {
        if (this._transWidth == null) {
            this._transWidth = this.progressbar.transform.width + this.offsetWidth;
        }
        return this._transWidth;
    }

    private _bgWorldPos: m4m.math.vector2
    protected get bgWorldPos(): m4m.math.vector2 {
        if (this._bgWorldPos == null) {
            this._bgWorldPos = this.bgBtn.transform.getWorldTranslate();
        }
        return this._bgWorldPos;
    }
    private bgUpBindOjb: any;
    private isDown: boolean = false;
    //按钮 按下
    public btnDown_event() {
        // console.error("按钮 按下");
        InputManager.onHorizTouch = this.onHorizTouchFun.bind(this);
        this.isDown = true;
        this.bgUpBindOjb = this.bgUp_event.bind(this);
        InputManager.addUpCallBackFun(this.bgUpBindOjb);
    }

    private downProVal: number = 0;
    //背景被点击
    public bgDown_event() {
        this.isDown = true;
        this.bgUpBindOjb = this.bgUp_event.bind(this);
        InputManager.addUpCallBackFun(this.bgUpBindOjb);
        //按下的起点
        let x = InputManager.downPointX;
        let y = InputManager.downPointY;
        this.scrPos.x = x;
        this.scrPos.y = y;
        // console.error(x, y);

        UiManager.ActiveSelf.overlay.calScreenPosToCanvasPos(this.scrPos, this.canvasPos);
        // console.error(this.canvasPos);

        //当前点中的X值
        let nowClickWidth = this.canvasPos.x - this.bgWorldPos.x;
        // console.error(this.bgWorldPos);
        // console.error(this.bgBtn.transform.width);
        let progress = nowClickWidth / this.bgBtn.transform.width;
        // console.error(progress);

        this.downProVal = progress;
        this._setValueFun(progress, true);
    }
    //背景弹起
    public bgUp_event() {
        InputManager.removeUpCallBackFun(this.bgUpBindOjb);
        if (this.isDown) {
            if (this.upCallBackFun) {
                this.upCallBackFun(this.downProVal);
            }
        }
        this.isDown = false;
    }

    /****设置值
     * maxNum 如果有设置值 需传入小于等于maxNum的值  
     * maxNum 默认值 -1   需传入百分比值 0.x
    */
    public setValue(value: number) {
        this._setValueFun(value, !this.isDown);
    }
    private _setValueFun(value: number, resh: boolean = false) {
        let percentValue;
        if (this.maxNum == -1) {
            if (value > 1) {
                console.error("SliderComponentExtend 当前需设置百分比值 " + value);
                return;
            }
            percentValue = value;
        } else {
            percentValue = value / this.maxNum;
        }
        if (percentValue < 0) {
            percentValue = 0;
        } else if (percentValue > 1) {
            percentValue = 1;
        }
        this.reshPosFun(percentValue, 0, resh);
    }

    private reshPosFun(sliderVale: number, dir: number, resh: boolean = false) {
        if (resh) {
            let setX = sliderVale * this.transWidth;
            this.btn.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, setX);
            // console.error("滑动 ", sliderVale);
            this.progressbar.value = sliderVale;
            if (this.callBackFun) {
                this.callBackFun(sliderVale, dir);
            }
        }
    }

    private onHorizTouchFun(moveX: number) {
        // console.error("滑动 ", moveX);
        let xx = this.btn.transform.getLayoutValue(m4m.framework.layoutOption.LEFT);
        let setX = xx - moveX * this.offsetPercent;
        if (setX < 0) {
            setX = 0;
        } else if (setX > this.transWidth) {
            setX = this.transWidth;
        }
        this.downProVal = setX / this.transWidth;
        this.reshPosFun(this.downProVal, moveX, true);
    }
}