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
@m4m.reflect.node2DComponent
export class SliderComponent extends m4m.framework.behaviour2d {
    public progressbar: m4m.framework.progressbar;
    public btn: m4m.framework.button;
    protected _transWidth: number;
    protected bgBtn: m4m.framework.button;
    public onPlay() {
        //
    }
    public set setSliderBtn(value: m4m.framework.button) {
        if (this.btn) {
            console.error("SliderComponent 组件已设置过按钮对象！");
            return;
        }
        this.btn = value;
        this.btn.addListener(m4m.event.UIEventEnum.PointerDown, this.btnDown_event, this);

        this.progressbar = this.transform.getComponent("progressbar") as m4m.framework.progressbar;
        if (this.progressbar == null) {
            console.error("progressbar 组件未找到！");
            return;
        }
    }

    //设置滑动条的底 用于支持点击
    public set setSliderBgImage(value: m4m.framework.transform2D) {
        let bgTrans = value;
        this.bgBtn = bgTrans.addComponent("button") as m4m.framework.button;
        this.bgBtn.addListener(m4m.event.UIEventEnum.PointerDown, this.bgDown_event, this);

        bgTrans.pivot = new m4m.math.vector2(0, 0);//设置锚点为左上角
        bgTrans.markDirty();
    }

    //背景被点击
    public bgDown_event() {

    }
    //背景弹起
    public bgUp_event(){

    }

    //按钮 按下
    public btnDown_event() {

    }

    remove() {
        this.btn.removeListener(m4m.event.UIEventEnum.PointerDown, this.btnDown_event, this);
        if (this.bgBtn) {
            this.bgBtn.removeListener(m4m.event.UIEventEnum.PointerDown, this.bgDown_event, this);
        }
    }
}