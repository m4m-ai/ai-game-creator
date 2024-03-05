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
import { ProjectManagerRequest } from "AutoCode/Net/ClientRequest/ProjectManagerRequest";
import { SkipBoxManager } from "Manager/SkipBoxManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { CTimer } from "Time/CTimer";
import { FrameMgr } from "Tools/FrameMgr";
import { Register } from "./Register";

export class RegisterView extends Register.Register {

    public static Instance: RegisterView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    private confirmndBtn: m4m.framework.button;
    private confirmFun: any;
    private passwordBtn: m4m.framework.button;
    private passFun: any;
    //倒计时
    public bool: boolean = true;
    public leftTime: number;
    public startTimeID: number;

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.title_lab_text("注册");
        this.title1_lab_text("手机号")
        this.titl1_lab_text("密码");
        this.titl_lab_text("确认密码")
        this.title3_lab_text("验证码");

        this.returntologin_lab_text("返回登录");
        this.register1_lab_text("注册");
        this.message_lab_text("点击获取");
        this.register2_lab_text("登录");
        // this.regi
        this.returntologinbg_btn_btnEvent = this.registerFun.bind(this);
        this.registerbg_btn_btnEvent = this.LogOnFun.bind(this);

        this.bg1_img.inputbg.inputbg4.input_inp.inputField.PlaceholderLabel.text = "请输入手机号码";
        this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.inputField.PlaceholderLabel.text = "密码为10位以上至少包含数字和字母的组合";
        this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.inputField.PlaceholderLabel.text = "密码为10位以上至少包含数字和字母的组合"
        this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.inputField.PlaceholderLabel.text = "";
        this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.inputField.PlaceholderLabel.text = "";
        this.bg1_img.inputbg.inputbg4.messageinput1_inp.inputField.PlaceholderLabel.text = "请输入验证码"

        this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.inputField.ContentType = 64;
        this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.transform.visible = false;
        this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.inputField.ContentType = 64;
        this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.transform.visible = false;



        this.confirmndBtn = this.bg1_img.inputbg.inputbg4.confirmdbg.show_img.transform.addComponent("button") as m4m.framework.button;
        this.confirmFun = this.connfirFunBtnBind.bind(this)
        this.confirmndBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.confirmFun, this)

        this.passwordBtn = this.bg1_img.inputbg.inputbg4.passworbg.show1_img.transform.addComponent("button") as m4m.framework.button;
        this.passFun = this.passFunBtnBind.bind(this);
        this.passwordBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.passFun, this);

        this.bg1_img.inputbg.inputbg4.passworbg.show1_img.show2_img.passworshow1_img.transform.visible = false;
        this.bg1_img.inputbg.inputbg4.confirmdbg.show_img.show4_img.confirmdshow1_img.transform.visible = false;

        this.messagebg_btn_btnEvent = this.MessagebgFun.bind(this);

    }
    private onShowFunc() {
        FrameMgr.Add(this.updata, this);
    }

    private onHideFunc() {
        FrameMgr.Remove(this.updata, this);
    }

    private onDisposeFunc() {
        this.confirmndBtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.confirmFun, this);
        this.passwordBtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.passFun, this);

    }

    private updata() {
        let text = this.bg1_img.inputbg.inputbg4.input_inp.inputField.text;
        let pass = this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.inputField.text;
        let code = this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.inputField.text;
        let message = this.bg1_img.inputbg.inputbg4.messageinput1_inp.inputField.text;
        //&& message
        let bool = (text && pass && code) ? false : true;
        this.bg1_img.inputbg.buttonbg.registerbg1_btn.transform.visible = bool;
        if (this.isshow) {
            this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.inputField.text = this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.inputField.text;
        }
        if (this.isConnfir) {
            this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.inputField.text = this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.inputField.text;
        }
        // this.inpChange();
    }
    private isshow: boolean = true;
    private passFunBtnBind() {
        this.bg1_img.inputbg.inputbg4.passworbg.show1_img.show2_img.passworhide_img.transform.visible = !this.isshow;
        this.bg1_img.inputbg.inputbg4.passworbg.show1_img.show2_img.passworshow1_img.transform.visible = this.isshow;
        this.seePwdFun();
        this.isshow = !this.isshow;
    }

    private isConnfir: boolean = true;

    private connfirFunBtnBind() {
        this.bg1_img.inputbg.inputbg4.confirmdbg.show_img.show4_img.confirmdrhide_img.transform.visible = !this.isConnfir;
        this.bg1_img.inputbg.inputbg4.confirmdbg.show_img.show4_img.confirmdshow1_img.transform.visible = this.isConnfir;
        this.seePwdFun1();
        this.isConnfir = !this.isConnfir;
    }


    private registerFun() {
        UIOpenOrHideManager.Instance.HideRegisterView();
        UIOpenOrHideManager.Instance.OpenLogonView();
    }

    private LogOnFun() {
        let name = this.bg1_img.inputbg.inputbg4.input_inp.inputField.text
        let reg = this.regExp(name);
        if (!reg) {
            //注意：手机号或密码不正确，请您重新填写
            SkipBoxManager.Instance.ShowSkipBox("注意：手机号格式错误，请您重新填写");
            return;
        }
        let pass = this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.inputField.text;
        let passBool = this.passwordExp(pass);
        if (!passBool) {
            //注意：手机号或密码不正确，请您重新填写
            SkipBoxManager.Instance.ShowSkipBox("注意：密码格式错误，请您输入密码为10位以上至少包含数字和字母的组合");
            return;
        }
        let confirmdbg = this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.inputField.text;
        let confirmdbgBool = this.passwordExp(confirmdbg);
        if (!confirmdbgBool) {
            SkipBoxManager.Instance.ShowSkipBox("注意：密码格式错误，请您输入密码为10位以上至少包含数字和字母的组合");
            return;
        }
        if (pass != confirmdbg) {
            SkipBoxManager.Instance.ShowSkipBox("注意：两次输入的密码不一致");
            return;
        }
        // let code = this.bg1_img.inputbg.inputbg4.messageinput1_inp.inputField.text;
        // if (code.length < 6) {
        //     return;
        // }
        SkipBoxManager.Instance.passwrod = pass;
        SkipBoxManager.Instance.phone = name;
        // console.log("登录按钮");
        ProjectManagerRequest.Instance.RegisterAnAccount(name, pass);
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
        let reg = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;
        let bool = reg.test(value);
        return bool;
    }

    // //看见密码判断
    public seePwdFun() {
        if (this.isshow) {
            this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.transform.visible = false;
            this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.transform.visible = true;
        } else {
            this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.transform.visible = true;
            this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.transform.visible = false;
            let test = this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.inputField.text;
            this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.inputField.text = test;
            this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.inputField.TextLabel.text = test.replace(/[\S|\s]/g, "*");
        }
    }
    public seePwdFun1() {
        if (this.isConnfir) {
            this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.transform.visible = false;
            this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.transform.visible = true;
        } else {
            this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.transform.visible = true;
            this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.transform.visible = false;
            let test = this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.inputField.text;
            this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.inputField.text = test;
            this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.inputField.TextLabel.text = test.replace(/[\S|\s]/g, "*");
        }
    }


    public MessagebgFun() {
        if (this.bool) {
            this.RefreshResetTime(60);
        }
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