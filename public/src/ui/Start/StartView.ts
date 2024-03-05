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

import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { Start } from "./Start";

export class StartView extends Start.Start {
    public static Instance: StartView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public callBackFun: Function;
    public onInit() {
        super.onInit();
        console.log("初始化  startview");

        this.text_lab_text("注意");
        this.button_lab_text("确认");
        this.text1_lab_text("AI可能会生成不正确或误导性的信息，或者产生攻击性或有偏见的内容。\n此AI仅适用于游戏内容创作，无法提供其他专业建议，\n在没有进行自己的独立研究的情况下，建议不要依赖AI。\n禁止将AI用于有害用途，例如制作暴力、辱骂或欺骗性内容。");
        this.textbg.textbg1_img.text1_lab.label.horizontalOverflow = true;
        this.textbg.textbg1_img.text1_lab.label.verticalOverflow = true;//说明支持换行
        this.textbg.textbg1_img.text1_lab.label.linespace = 1.4;

        this.buttonbg_btn_btnEvent = this.sureBtnFun.bind(this);
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.textbg.textbg1_img.image.color.a = 0;
        this.textbg.text_lab.label.transform.visible = false;
        this.textbg.buttonbg_btn.transform.visible = false;
        this.textbg.textbg1_img.text1_lab.transform.visible = false;
    }
    private newnatural(lab: m4m.framework.label, fun: Function) {
        //--------刷新 getDrawBounds ------
        // this.textbg.textbg1_img.text1_lab.transform.visible = true;
        this.transform.updateTran(true);
        lab.getMaterial();
        lab.updateData(lab.font);
        //--------------------------------
        setTimeout(() => {
            let rect = lab.getDrawBounds();
            let addWW = rect.w;
            let labHeight = rect.h;
            fun(addWW, labHeight)
        }, 50);
    }
    public onShowFunc() {
        this.newnatural(this.textbg.textbg1_img.text1_lab.label, (labWidth, labHeight) => {
            console.log("文本宽高 " + labWidth + "   " + labHeight);
            if (labWidth < 867) {
                labWidth = 867;
            }
            this.textbg.text_lab.label.transform.visible = true;
            this.textbg.buttonbg_btn.transform.visible = true;
            this.textbg.textbg1_img.text1_lab.transform.visible = true;

            this.textbg.textbg1_img.image.color.a = 1;
            this.textbg.textbg1_img.transform.width = labWidth + 140;
            this.textbg.textbg1_img.transform.height = labHeight + 80;
            this.textbg.textbg1_img.transform.markDirty();

            let totalHeight = this.textbg.transform.height;
            let kuangHeight = this.textbg.textbg1_img.transform.height;
            let topPosY = Math.floor(totalHeight - kuangHeight) / 2 - this.textbg.text_lab.transform.height - 50;
            this.textbg.text_lab.transform.setLayoutValue(m4m.framework.layoutOption.TOP, topPosY);
            let bottomPosY = Math.floor(totalHeight - kuangHeight) / 2 - this.textbg.buttonbg_btn.transform.height;
            this.textbg.buttonbg_btn.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, bottomPosY);
        })
    }

    public onHideFunc() {
        console.error("onHideFunc");
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
    }
    private sureBtnFun() {
        UIOpenOrHideManager.Instance.HideStartView();
        UIOpenOrHideManager.Instance.OpenAlistofgameItemsView();
    }
}