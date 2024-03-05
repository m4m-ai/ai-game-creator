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
import { Newgame } from "./Newgame";
import { NewgameData } from "Manager/NewgameManager";

export class NewgameView extends Newgame.Newgame {
    public static Instance: NewgameView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public officialFun: Function;
    public middleFun: Function;
    public rightFun: Function;
    public uncheckeFun: Function;

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.uiLayer = uiLayerType.poplayer;
        this.selecg1_btn_btnEvent = this.officialBtnFun.bind(this);
        this.selecbg2_btn_btnEvent = this.middleBtnFun.bind(this);
        this.selecbg4_btn_btnEvent = this.rightBtnFun.bind(this);
        this.uncheckedbg_btn_btnEvent = this.uncheckeBtnFun.bind(this);
        this.generalbg_img.button.button1.selecbg_btn.transform.visible = false;
    }

    private onShowFunc(data: NewgameData) {
        if (data.titleStr) {
            this.title_lab_text(data.titleStr);
        }
        if (data.descStr) {
            this.inputtext_lab_text(data.descStr);
        }
        if (data.leftBtnCallBack) {
            this.officialFun = data.leftBtnCallBack;
        }
        if (data.midBtnCallBack) {
            this.middleFun = data.midBtnCallBack;
        }
        if (data.rightBtnCallBack) {
            this.rightFun = data.rightBtnCallBack;
        }
        if (data.uploadBtnCallBack) {
            this.uncheckeFun = data.uploadBtnCallBack;
        }
        if (data.leftbtnStr) {
            this.selec1_lab_text(data.leftbtnStr);
        }

        if (data.midbtnStr) {
            this.selec2_lab_text(data.midbtnStr)
        }
        if (data.rightbtnStr) {
            this.selec4_lab_text(data.rightbtnStr);
        }
        if (data.uploadBtnStr) {
            this.unchecked_lab_text(data.uploadBtnStr)
        }
    }

    private onHideFunc() {

    }

    private onDisposeFunc() {
        if (this.officialFun) {
            this.officialFun = null;
        }
        if (this.middleFun) {
            this.middleFun = null;
        }
        if (this.rightFun) {
            this.rightFun = null;
        }
        if (this.uncheckeFun) {
            this.uncheckeFun = null;
        }
    }


    private officialBtnFun() {
        if (this.officialFun) {
            this.officialFun();
        }
    }

    private middleBtnFun() {
        if (this.middleFun) {
            this.middleFun();
        }
    }

    private rightBtnFun() {
        if (this.rightFun) {
            this.rightFun();
        }
    }

    private uncheckeBtnFun() {
        if (this.uncheckeFun) {
            this.uncheckeFun();
        }
    }
}