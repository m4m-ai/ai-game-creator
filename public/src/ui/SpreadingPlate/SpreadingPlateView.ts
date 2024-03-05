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
import { SliderComponentExtend } from "Common/SliderComponentExtend";
import { BindKeyName } from "Data/BindKeyName";
import { UiDataManager } from "PSDUI/UiDataManager";
import { UiManager } from "PSDUI/UiManager";
import { InputManager } from "Tools/InputManager";
import { SpreadingPlate } from "./SpreadingPlate";
import { GameProjectManager } from "Manager/GameProjectManager";
import { AIResourceManager } from "Manager/AIResourceManager";

export class SpreadingPlateView extends SpreadingPlate.SpreadingPlate {
    public static Instance: SpreadingPlateView;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    private sliderExtend: SliderComponentExtend;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);



        this.describe_lab_text("图标大小");

        this.sliderExtend = this.describbg.sho1_img.shor_bar.progressbar.transform.addComponent("SliderComponentExtend") as SliderComponentExtend;
        this.sliderExtend.setSliderBtn = this.describbg.sho1_img.showr1_btn.button;
        this.sliderExtend.setSliderBgImage = this.describbg.sho1_img.transform;
        this.sliderExtend.offsetPercent = 1.6;
        this.sliderExtend.maxNum = 1;
        this.sliderExtend.callBackFun = (sliderVale, dir) => {
            // if (dir > 0) {
            //     //往左滑动
            // } else if (dir < 0) {
            //     //往右滑动
            // }
            // console.error("进度 ", sliderVale);

            UiDataManager.changeFunctionData(BindKeyName.SpreadingPlateProgressbarValue, sliderVale);
        };
    }

    public onShowFunc(titleStr: string) {
        this.sliderExtend.setValue(AIResourceManager.instance.SpreadingPlateProcessValue);
        this.title_lab_text(titleStr);
        // console.log(" 滑动条 bg 位置 ： "+this.textbox_img.transform.getLayoutValue(m4m.framework.layoutOption.LEFT));
        this.textbox_img.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
        this.textbox_img.transform.markDirty();
    }

    public onHideFunc() {

    }

    public onDisposeFunc() {
    }
}