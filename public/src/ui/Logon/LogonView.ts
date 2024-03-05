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
import { WebsocketTool } from "AutoCode/Net/WebsocketTool";
import { SkipBoxManager } from "Manager/SkipBoxManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { uiLayerType } from "PSDUI/UiManager";
import { CTimer } from "Time/CTimer";
import { FrameMgr } from "Tools/FrameMgr";
import { Logon } from "./Logon";

export class LogonView extends Logon.Logon {

    public static Instance: LogonView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public uiLayer = uiLayerType.midlayer

    public currentPass: string;

    private showFunBtn: m4m.framework.button;

    private showFun: any;
    //倒计时
    public bool: boolean = true;
    public leftTime: number;
    public startTimeID: number;

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.title_lab_text("登录");
        this.title1_lab_text("手机号");
        this.title2_lab_text("密码");
        this.title3_lab_text("验证码");

        this.returntologin_lab_text("注册");
        this.register1_lab_text("登录");
        this.message_lab_text("点击获取")
        this.register2_lab_text("登录")
        // this.regi
        this.returntologinbg_btn_btnEvent = this.registerFun.bind(this);
        this.registerbg_btn_btnEvent = this.LogOnFun.bind(this);
        this.messagebg_btn_btnEvent = this.MessagebgFun.bind(this);
        // this.registerbg1_btn_btnEvent = this
        this.bg1_img.inputbg.inputbg4.inputt_inp.inputField.PlaceholderLabel.text = "请输入手机号码";
        this.bg1_img.inputbg.inputbg4.input1_inp.inputField.PlaceholderLabel.text = "请输入验证码";
        this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.inputField.PlaceholderLabel.text = "密码为10位以上至少包含数字和字母的组合";
        this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputField.PlaceholderLabel.text = "密码为10位以上至少包含数字和字母的组合";

        this.showFunBtn = this.bg1_img.inputbg.inputbg4.inpu1.show_img.transform.addComponent("button") as m4m.framework.button;
        this.showFun = this.showFunBtnBind.bind(this);
        this.showFunBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.showFun, this);
        this.bg1_img.inputbg.inputbg4.inpu1.show_img.sho1_img.show1_img.transform.visible = false;

        this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputField.ContentType = m4m.framework.contentType.PassWord;
        this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.transform.visible = false;

    }

    private onShowFunc() {
        if (SkipBoxManager.Instance.passwrod && SkipBoxManager.Instance.phone) {
            this.bg1_img.inputbg.inputbg4.inputt_inp.inputField.text = SkipBoxManager.Instance.phone;
            this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputField.text = SkipBoxManager.Instance.passwrod;
            this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputField.TextLabel.text = SkipBoxManager.Instance.passwrod.replace(/[\S|\s]/g, "*");
            this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputField.PlaceholderLabel.text = "";
            this.bg1_img.inputbg.inputbg4.inputt_inp.inputField.PlaceholderLabel.text = "";
        }
        FrameMgr.Add(this.updata, this);
    }

    private onHideFunc() {
        FrameMgr.Remove(this.updata, this);
        SkipBoxManager.Instance.passwrod = ""
        SkipBoxManager.Instance.phone = ""
    }

    private onDisposeFunc() {
        this.showFunBtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.showFun, this);
    }

    private isshow: boolean = true;

    private showFunBtnBind() {
        this.bg1_img.inputbg.inputbg4.inpu1.show_img.sho1_img.hide_img.transform.visible = !this.isshow;
        this.bg1_img.inputbg.inputbg4.inpu1.show_img.sho1_img.show1_img.transform.visible = this.isshow;
        this.seePwdFun()
        this.isshow = !this.isshow;
    }

    private updata() {
        let text = this.bg1_img.inputbg.inputbg4.inputt_inp.inputField.text;
        let pass = this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.inputField.text;
        // let code = this.bg1_img.inputbg.inputbg4.input1_inp.inputField.text;
        //&& code
        let bool = (text && pass) ? false : true;
        this.bg1_img.inputbg.buttonbg.registerbg1_btn.transform.visible = bool;
        if (this.isshow) {
            this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.inputField.text = this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputField.text;
        }
        // this.inpChange();
    }

    private registerFun() {
        console.log("注册按钮");
        UIOpenOrHideManager.Instance.OpenRegisterView();
        UIOpenOrHideManager.Instance.HideLogonView();
    }

    private LogOnFun() {
        let name = this.bg1_img.inputbg.inputbg4.inputt_inp.inputField.text
        let reg = this.regExp(name);
        if (!reg) {
            console.log("注意：手机号格式不正确，请您重新填写")
            SkipBoxManager.Instance.ShowSkipBox("注意：手机号格式不正确，请您重新填写");
            return;
        }
        let pass = this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.inputField.text;
        let passBool = this.passwordExp(pass);
        if (!passBool) {
            console.log("注意：密码格式错误，请您输入密码为10位以上至少包含数字和字母的组合");
            SkipBoxManager.Instance.ShowSkipBox("注意：密码格式错误，请您输入密码为10位以上至少包含数字和字母的组合");
            return;
        }
        // let code = this.bg1_img.inputbg.inputbg4.input1_inp.inputField.text;
        // if (code.length < 6) {
        //     return;
        // }
        console.log("登录按钮");
        WebsocketTool.Instance.ProjectManager_login(name, pass);
    }

    /**
     * 使用正则表达式验证手机号
     * @param value 手机号
     * @returns 
     */
    public regExp(value: string) {
        let reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        let bool = reg.test(value);
        return bool;
    }
    /**
     * 使用正则表达式验证密码
     * @param value 密码
     */
    public passwordExp(value: string) {
        let reg = /^.*(?=.{10,})(?=.*\d)(?=.*[a-z]).*$/;
        let bool = reg.test(value);
        return bool;
    }

    // //看见密码判断
    public seePwdFun() {
        if (this.isshow) {
            this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.transform.visible = false;
            this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.transform.visible = true;
        } else {
            this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.transform.visible = true;
            this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.transform.visible = false;
            let test = this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.inputField.text;
            this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputField.text = test;
            this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputField.TextLabel.text = test.replace(/[\S|\s]/g, "*");
        }
    }


    public MessagebgFun() {
        this.RefreshResetTime(60);
    }


    //重置
    public RefreshResetTime(leftTime: number) {
        if (this.bool) {
            if (leftTime != null) {
                this.leftTime = leftTime;
                console.warn(this.leftTime);
                this.starCDTime();
            }
            this.bool = false;
        }
    }
    // //定时器
    public starCDTime() {
        this.StopTime();
        this.startTimeID = CTimer.Instance.loopTimeUpdate(1000, this.cdUpdateFun.bind(this));
        console.warn(this.startTimeID);
    }
    //停掉定时器
    public StopTime() {
        if (this.startTimeID != -1) {
            CTimer.Instance.stop(this.startTimeID);
            this.bool = true;
            this.message_lab_text("点击获取");
        }
    }
    //定时器回调
    public cdUpdateFun() {
        if (--this.leftTime > 0) {
            let str = this.leftTime;
            this.message_lab_text(`${str}秒后可以重新获取`);
            // console.warn(this.startTimeID);
        } else {
            this.StopTime();
            this.leftTime = 0;
        }
    }
}