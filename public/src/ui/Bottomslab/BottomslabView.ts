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

import { uiLayerType } from "PSDUI/UiManager";
import { Bottomslab } from "./Bottomslab";
import { commonPopupData } from "Manager/CommonPoupManager";
import { BottomslabViewData } from "./BottomslabViewData";
import { FrameMgr } from "Tools/FrameMgr";

export class BottomslabView extends Bottomslab.Bottomslab {
    public static Instance: BottomslabView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public leftBtnCallBackFun: Function;
    public midBtnCallBackFun: Function;
    public rightBtnCallBackFun: Function;
    public uploadBtnCallBackFun: Function;
    public viewData: BottomslabViewData;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.uiLayer = uiLayerType.poplayer;
        this.viewData = new BottomslabViewData();

        this.uncheckedbg_btn_btnEvent = this.closeBtnFun.bind(this);
        this.selectedbg_btn_btnEvent = this.officialBtnFun.bind(this);
        this.selecg1_btn_btnEvent = this.officialBtnFun.bind(this);
        // this.notoptionalbg_btn_btnEvent = this.AIBtnFun.bind(this);
        this.selecbg2_btn_btnEvent = this.AIBtnFun.bind(this);

        this.animation_btn_btnEvent = this.uloadBtnFun.bind(this);

        let bgBtn = this.bg.transform.addComponent("button") as m4m.framework.button;
        bgBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.BgBtnFun, this);
        FrameMgr.Add(this.onUpdate, this);
    }
    private BgBtnFun() {
        console.log("bg  屏蔽按钮事件");
    }
    private closeBtnFun() {
        // UIOpenOrHideManager.Instance.HideBottomslabView();
        if (this.leftBtnCallBackFun) {
            this.leftBtnCallBackFun();
        }
    }
    private officialBtnFun() {
        // console.log("专业模式按钮");
        if (this.midBtnCallBackFun) {
            this.midBtnCallBackFun();
        }
    }
    private AIBtnFun() {
        // console.log("ai模式创建");
        // UIOpenOrHideManager.Instance.HideBottomslabView();
        // UIOpenOrHideManager.Instance.HideAlistofgameItemsView();
        if (this.rightBtnCallBackFun) {
            let inputStr = "";
            if (this.generalbg_img.textboxbg.input_inp.inputField.text && this.generalbg_img.textboxbg.input_inp.inputField.text != "") {
                inputStr = this.generalbg_img.textboxbg.input_inp.inputField.text;
            }
            this.rightBtnCallBackFun(inputStr);
        }
    }
    private uloadBtnFun() {
        if (this.uploadBtnCallBackFun) {
            this.uploadBtnCallBackFun();
        }
    }
    //设置弹窗标题
    public setTitleFun(title: string) {
        this.title_lab_text(title);
    }
    //左侧按钮状态
    private setLeftBtnState(bol1: boolean = false, lab1: string = "") {
        this.unchecked_lab_text(lab1);//"取消"
        this.generalbg_img.button.button2.uncheckedbg_btn.transform.visible = bol1;
    }
    //中间按钮状态
    private setMidBtnState(bol2: boolean = false, lab2: string = "") {
        this.selected_lab_text(lab2);//"专业模式"
        this.generalbg_img.button.button2.selectedbg_btn.transform.visible = bol2;
        this.generalbg_img.button.button1.selecg1_btn.transform.visible = bol2;
        this.generalbg_img.button.button1.selecg1_btn.selec1_lab.label.text = lab2;
    }
    //右侧按钮状态
    private setRightBtnState(bol3: boolean = false, lab3: string = "") {
        this.notoptional_lab_text(lab3);//"AI引导模式"
        this.generalbg_img.button.button2.notoptionalbg_btn.transform.visible = bol3;
        //右侧按钮文字设置
        this.selec2_lab_text(lab3);
    }
    //设置描述文本 以及是否需要换行处理
    public setDescribeText(showbol: boolean = false, describeStr: string = "", bol: boolean = false) {
        // this.generalbg_img.textboxbg.textboxbg1.description_lab.transform.visible = showbol;
        this.generalbg_img.textboxbg.description_lab.transform.visible = showbol;
        this.description_lab_text(describeStr);//"您想使用那种方式创作游戏？\nAI引导模式：全程AI引导创作，适合新人使用\n专业模式:直接进入编辑器，可以自行使用AI进行创作"
        if (bol) {
            // this.generalbg_img.textboxbg.textboxbg1.description_lab.label.verticalOverflow
            this.generalbg_img.textboxbg.description_lab.label.horizontalOverflow = true;
            this.generalbg_img.textboxbg.description_lab.label.verticalOverflow = true;//说明支持换行
            this.generalbg_img.textboxbg.description_lab.label.linespace = 1.4;
            // this.generalbg_img.textboxbg.textboxbg1.description_lab.label.outlineWidth = 3;
            // this.generalbg_img.textboxbg.textboxbg1.description_lab.label.horizontalType = m4m.framework.HorizontalType.Left;
        }
    }
    //第一行输入框
    private setFirstInputState(bol1: boolean = false, tipStr1: string = "", defaultStr: string = "") {
        this.firstInpShowBol = bol1;
        this.generalbg_img.textboxbg.input_inp.transform.visible = bol1;
        this.generalbg_img.textboxbg.textbg.text_lab.transform.visible = bol1;
        this.text_lab_text(tipStr1);
        this.inputdl_lab_text(defaultStr);
        this.inputtext_lab_text(defaultStr);
    }
    //第二行输入框
    private setSecondInputState(bol2: boolean = false, tipStr2: string = "", defaultStr: string = "") {
        this.generalbg_img.textboxbg.textbg.text1_lab.transform.visible = bol2;
        this.text1_lab_text(tipStr2);
        this.path_lab_text(defaultStr);
        this.generalbg_img.textboxbg.searchbg2.searchbg1_img.transform.visible = bol2;
        this.generalbg_img.textboxbg.searchbg2.path_lab.transform.visible = bol2;
        this.generalbg_img.textboxbg.searchbg2.path_lab.label.text = tipStr2;
        this.generalbg_img.textboxbg.searchbg2.animation_btn.transform.visible = bol2;
        this.generalbg_img.textboxbg.searchbg2.path_lab.transform.visible = bol2;
        this.generalbg_img.textboxbg.searchbg2.animation_btn.transform.visible = bol2;
    }
    private firstInpShowBol = false;
    //如果有输入框时 输入框内容不为空 ，高亮保存按钮显示
    public onUpdate() {
        if (this.firstInpShowBol) {
            if (this.generalbg_img.textboxbg.input_inp.inputField.text != "") {//输入框的内容不为空
                this.generalbg_img.button.button1.selecbg2_btn.transform.visible = true;
            } else {
                this.generalbg_img.button.button1.selecbg2_btn.transform.visible = false;
            }
        } else {
            this.generalbg_img.button.button1.selecbg2_btn.transform.visible = true;
        }
    }
    public onShowFunc(data: commonPopupData) {
        // this.generalbg_img.button.button1.transform.visible = false;
        this.generalbg_img.button.button1.selecbg_btn.transform.visible = false;
        this.generalbg_img.button.button1.selecg1_btn.transform.visible = false;
        if (this.generalbg_img.textboxbg.input_inp.inputField.text != "") {
            this.generalbg_img.textboxbg.input_inp.inputField.clearText();
        }
        if (data.leftBtnCallBack) {
            this.leftBtnCallBackFun = data.leftBtnCallBack;
        }
        if (data.midBtnCallBack) {
            this.midBtnCallBackFun = data.midBtnCallBack;
        }
        if (data.rightBtnCallBack) {
            this.rightBtnCallBackFun = data.rightBtnCallBack;
        }
        if (data.uploadBtnCallBack) {
            this.uploadBtnCallBackFun = data.uploadBtnCallBack;
        }
        this.setTitleFun(data.titleStr);
        if (data.leftBtnBol) {
            this.setLeftBtnState(data.leftBtnBol, data.leftbtnStr);
        } else {
            this.setLeftBtnState();
        }
        if (data.midBtnBol) {
            this.setMidBtnState(data.midBtnBol, data.midbtnStr);
        } else {
            this.setMidBtnState();
        }
        if (data.rightBtnBol) {
            this.setRightBtnState(data.rightBtnBol, data.rightbtnStr);
        } else {
            this.setRightBtnState();
        }
        if (data.showDescribBol) {
            if (data.changeLineBol) {
                this.setDescribeText(data.showDescribBol, data.describeStr, data.changeLineBol);
            } else {
                this.setDescribeText(data.showDescribBol, data.describeStr);
            }
        } else {
            this.setDescribeText(data.showDescribBol);
        }
        if (data.showFirstInputFiledBol) {
            this.setFirstInputState(true, data.firstInputTitle, data.firstInputDefaultTitle);
        } else {
            this.setFirstInputState();
        }
        if (data.showSecondBol) {
            this.setSecondInputState(true, data.secondTitle, data.secondDefaultTitle);
        } else {
            this.setSecondInputState();
        }
    }

    public onHideFunc() {
        console.error("onHideFunc");
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
        if (this.leftBtnCallBackFun) {
            this.leftBtnCallBackFun = null;
        }
        if (this.midBtnCallBackFun) {
            this.midBtnCallBackFun = null;
        }
        if (this.rightBtnCallBackFun) {
            this.rightBtnCallBackFun = null;
        }
        if (this.uploadBtnCallBackFun) {
            this.uploadBtnCallBackFun = null;
        }
        FrameMgr.Remove(this.onUpdate, this);
        this.viewData.dispose();
    }
}