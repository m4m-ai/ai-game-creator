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
import { CellData } from "./CellData";
@m4m.reflect.node2DComponent
export class Cell extends m4m.framework.behaviour2d implements m4m.framework.I2DPointListener {

    protected baseData: CellData;
    public get cellData(): CellData {
        return this.baseData;
    }
    public set cellData(value: CellData) {
        this.baseData = value;
    }

    public get index(): number {
        return this.cellData.index;
    }
    public name: string = "Cell";
    //点击回调
    public clickCallBackFun: Function;
    private static readonly helpV2 = new m4m.math.vector2();
    //克隆生成的UI带引用关系对象
    private cellClass: any;
    public btn: m4m.framework.button;
    public onPlay() {
        if (this.btn == null) {
            this.addBtn();
        }
        // console.error("触发了几次？？" ,this.name);
        this.btn.addListener(m4m.event.UIEventEnum.PointerClick, this.pointerClickFun, this);
        //this.btn.addListener(m4m.event.UIEventEnum.PointerDown, this.pointerClickFun, this);
        // console.error("添加了按钮事件",this.cellData.index);
    }

    //克隆生成的UI带引用关系对象 如果默认格子需要Tips super这个方法
    public setCellClass(value: any) {
        // this.cellClass = value;
        // this.addBtn();
        //***因down事件会和滑动框里的事件有冲突 btn组件会吃掉往下传的dwon事件  这里特殊处理了 down的实现  实现 m4m.framework.I2DPointListener 接口
        // this.btn.addListener(m4m.event.UIEventEnum.PointerDown, this.pointerDownFun, this);
        if (!globalThis.window) {
            if (this.baseData.showTip) {
                //***因down事件会和滑动框里的事件有冲突 btn组件会吃掉往下传的dwon事件  这里特殊处理了 down的实现  实现 m4m.framework.I2DPointListener 接口
                this.btn.addListener(m4m.event.UIEventEnum.PointerDown, this.pointerDownFun, this);
                this.btn.addListener(m4m.event.UIEventEnum.PointerEnter, this.pointerEnterFun, this);
                this.btn.addListener(m4m.event.UIEventEnum.PointerExit, this.pointerExitFun, this);
            }
        }
    }

    //选中当前cell 时的fun
    public selectFun(selectbool: boolean) {
        if (this.baseData) {
            if (this.baseData.selectIcon) {
                this.baseData.selectIcon.visible = selectbool;
            }
            // console.log(selectbool);
        } else {
            console.error("CellData 未赋值！");
        }
    }

    public setData(value: any): void {
        //
    }

    public dispose() {
        //removeListener
        if (this.btn) {
            this.btn.removeListener(m4m.event.UIEventEnum.PointerClick, this.pointerClickFun, this);
            this.btn.removeListener(m4m.event.UIEventEnum.PointerDown, this.pointerDownFun, this);
            this.btn.removeListener(m4m.event.UIEventEnum.PointerEnter, this.pointerEnterFun, this);
            this.btn.removeListener(m4m.event.UIEventEnum.PointerExit, this.pointerExitFun, this);
        }
        // this.btn.removeListener(m4m.event.UIEventEnum.PointerDown, this.pointerDownFun, this);
    }
    //鼠标移入
    public pointerEnterFun() {
    }

    //鼠标移出
    public pointerExitFun() {
    }

    //按钮down 状态
    public pointerDownFun() {
    }

    public onPointEvent(canvas: m4m.framework.canvas, ev: m4m.framework.PointEvent, oncap: boolean) {
        //oncap==true 是捕获阶段，一般的行为，只在pop阶段处理
        if (oncap) { return; }
        let tv2 = Cell.helpV2;
        tv2.x = ev.x;
        tv2.y = ev.y;
        let b = this.transform.ContainsCanvasPoint(tv2);

        if (b) {
            if (ev.type == m4m.event.PointEventEnum.PointDown) {
                // console.error("onPointEventonPointEventonPointEventonPointEvent  PointDown");
                this.pointerDownFun();
            }
        }
    }

    protected pointerClickFun() {
        // console.error(this.index);
        if (this.clickCallBackFun) { this.clickCallBackFun(this.index); }
    }

    private addBtn() {
        this.btn = this.transform.getComponent("button") as m4m.framework.button;
        if (this.btn == null) {
            this.btn = this.transform.addComponent("button") as m4m.framework.button;
        }
    }
}