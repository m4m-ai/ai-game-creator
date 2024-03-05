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
import { Gamedesc } from "./Gamedesc";
import { FrameMgr } from "Tools/FrameMgr";
import { GamedescData } from "Manager/GamedescManager";

export class GamedescView extends Gamedesc.Gamedesc {
    public static Instance: GamedescView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public officialFun: Function;
    public rightFun: Function;

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.uiLayer = uiLayerType.poplayer;
        FrameMgr.Add(this.onUpdate, this);

        this.animation_btn_btnEvent = this.AnimationBtnFun.bind(this);
        this.selecbg2_btn_btnEvent = this.selecbg2BtnFun.bind(this);
        this.uncheckedbg_btn_btnEvent = this.uncheckeBtnFun.bind(this);
        this.generalbg_img.textboxbg.description_lab.transform.visible = false;

    }
    private firstInpShowBol = true;
    //如果有输入框时 输入框内容不为空 ，高亮保存按钮显示
    public onUpdate() {
        if (this.firstInpShowBol) {
            if (this.generalbg_img.textboxbg.input_inp.inputField.text != "") {//输入框的内容不为空
                this.generalbg_img.button.selecbg2_btn.transform.visible = true;
            } else {
                this.generalbg_img.button.selecbg2_btn.transform.visible = false;
            }
        } else {
            this.generalbg_img.button.selecbg2_btn.transform.visible = true;
        }
    }


    private onShowFunc(data: GamedescData) {
        if (this.generalbg_img.textboxbg.input_inp.inputField.text != "") {
            this.generalbg_img.textboxbg.input_inp.inputField.clearText();
        }
        if (data.titleStr) {
            this.title_lab_text(data.titleStr);
        }
        if (data.leftBtnCallBack) {
            this.officialFun = data.leftBtnCallBack;
        }
        if (data.rightBtnCallBack) {
            this.rightFun = data.rightBtnCallBack
        }
        if (data.leftbtnStr) {
            this.unchecked_lab_text(data.leftbtnStr);
        }
        if (data.rightbtnStr) {
            this.selec2_lab_text(data.rightbtnStr);
            this.notoptional_lab_text(data.rightbtnStr);
        }
        if (data.firstInputDefaultTitle || data.firstInputTitle) {
            this.text_lab_text(data.firstInputTitle);
            this.inputdl_lab_text(data.firstInputDefaultTitle);
            this.inputtext_lab_text(data.firstInputDefaultTitle);
        }
        if (data.secondTitle || data.secondDefaultTitle) {
            this.text1_lab_text(data.secondTitle);
            this.path_lab_text(data.secondDefaultTitle);
        }
    }

    private onHideFunc() {

    }

    private onDisposeFunc() {
        FrameMgr.Remove(this.onUpdate, this);
    }

    /**创建按钮事件 */
    private selecbg2BtnFun() {
        if (this.rightFun) {
            let inputStr = "";
            if (this.generalbg_img.textboxbg.input_inp.inputField.text && this.generalbg_img.textboxbg.input_inp.inputField.text != "") {
                inputStr = this.generalbg_img.textboxbg.input_inp.inputField.text;
            }
            this.rightFun(inputStr);
        }
    }

    /**取消按钮事件 */
    private uncheckeBtnFun() {
        if (this.officialFun) {
            this.officialFun();
        }
    }

    /**上传文件按钮事件 */
    private AnimationBtnFun() {

    }
}