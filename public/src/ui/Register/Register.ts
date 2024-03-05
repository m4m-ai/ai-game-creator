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
import { newUiBase } from "PSDUI/newUiBase";


export namespace Register {
    export class Register extends newUiBase {
        public static Instance: Register;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg1_img.inputbg.inputbg4.messagebg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.messagebg_btn_event, this);
            this.bg1_img.inputbg.buttonbg.registerbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.registerbg_btn_event, this);
            this.bg1_img.inputbg.buttonbg.registerbg1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.registerbg1_btn_event, this);
            this.bg1_img.inputbg.buttonbg.returntologinbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.returntologinbg_btn_event, this);


        }
        //按钮事件
        private messagebg_btn_event(){if(this.messagebg_btn_btnEvent)this.messagebg_btn_btnEvent();};
        /**this.bg1_img.inputbg.inputbg4.messagebg_btn.button 的按钮事件*/
        public messagebg_btn_btnEvent: ()=>any;
        private registerbg_btn_event(){if(this.registerbg_btn_btnEvent)this.registerbg_btn_btnEvent();};
        /**this.bg1_img.inputbg.buttonbg.registerbg_btn.button 的按钮事件*/
        public registerbg_btn_btnEvent: ()=>any;
        private registerbg1_btn_event(){if(this.registerbg1_btn_btnEvent)this.registerbg1_btn_btnEvent();};
        /**this.bg1_img.inputbg.buttonbg.registerbg1_btn.button 的按钮事件*/
        public registerbg1_btn_btnEvent: ()=>any;
        private returntologinbg_btn_event(){if(this.returntologinbg_btn_btnEvent)this.returntologinbg_btn_btnEvent();};
        /**this.bg1_img.inputbg.buttonbg.returntologinbg_btn.button 的按钮事件*/
        public returntologinbg_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public inputdl_lab_text(text: string){this.bg1_img.inputbg.inputbg4.input_inp.inputdl_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtext_lab_text(text: string){this.bg1_img.inputbg.inputbg4.input_inp.inputtext_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public passwordinputdl_lab_text(text: string){this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.passwordinputdl_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public passwordinputtext_lab_text(text: string){this.bg1_img.inputbg.inputbg4.passworbg.passwordinput_inp.passwordinputtext_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public passputdl_lab_text(text: string){this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.passputdl_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public passnputtext_lab_text(text: string){this.bg1_img.inputbg.inputbg4.passworbg.passnput_inp.passnputtext_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public confirminputdl_lab_text(text: string){this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.confirminputdl_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public confirminputtext_lab_text(text: string){this.bg1_img.inputbg.inputbg4.confirmdbg.confirmdinput_inp.confirminputtext_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public confirminpdl_lab_text(text: string){this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.confirminpdl_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public confirminputte_lab_text(text: string){this.bg1_img.inputbg.inputbg4.confirmdbg.confirminp_inp.confirminputte_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public messageinputdl1_lab_text(text: string){this.bg1_img.inputbg.inputbg4.messageinput1_inp.messageinputdl1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public messageinputtext1_lab_text(text: string){this.bg1_img.inputbg.inputbg4.messageinput1_inp.messageinputtext1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public message_lab_text(text: string){this.bg1_img.inputbg.inputbg4.messagebg_btn.message_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public register1_lab_text(text: string){this.bg1_img.inputbg.buttonbg.registerbg_btn.register1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public register2_lab_text(text: string){this.bg1_img.inputbg.buttonbg.registerbg1_btn.register2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public returntologin_lab_text(text: string){this.bg1_img.inputbg.buttonbg.returntologinbg_btn.returntologin_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title_lab_text(text: string){this.bg1_img.inputbg.title_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title1_lab_text(text: string){this.bg1_img.inputbg.title_lab.title1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title3_lab_text(text: string){this.bg1_img.inputbg.title_lab.title3_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public titl_lab_text(text: string){this.bg1_img.inputbg.title_lab.titl_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public titl1_lab_text(text: string){this.bg1_img.inputbg.title_lab.titl1_lab.label.text=text;}

        public uiName:string="Register";

        public bg: bg = new bg();
        public bg1_img: bg1_img = new bg1_img();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public inputbg: inputbg = new inputbg();
    }
    export class inputbg {
        public transform: m4m.framework.transform2D;
        public inputbg4: inputbg4 = new inputbg4();
        public buttonbg: buttonbg = new buttonbg();
        /***/
        public title_lab: title_lab = new title_lab();
    }
    export class inputbg4 {
        public transform: m4m.framework.transform2D;
        public input_inp: input_inp = new input_inp();
        public passworbg: passworbg = new passworbg();
        public confirmdbg: confirmdbg = new confirmdbg();
        public messageinput1bg: messageinput1bg = new messageinput1bg();
        public messageinput1_inp: messageinput1_inp = new messageinput1_inp();
        public messagebg_btn: messagebg_btn = new messagebg_btn();
    }
    export class input_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public inputbg1_img: inputbg1_img = new inputbg1_img();
        /***/
        public inputdl_lab: inputdl_lab = new inputdl_lab();
        /***/
        public inputtext_lab: inputtext_lab = new inputtext_lab();
    }
    export class inputbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputdl_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtext_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class passworbg {
        public transform: m4m.framework.transform2D;
        public passwordinput_inp: passwordinput_inp = new passwordinput_inp();
        public passnput_inp: passnput_inp = new passnput_inp();
        public show1_img: show1_img = new show1_img();
    }
    export class passwordinput_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public passwordinputbg1_img: passwordinputbg1_img = new passwordinputbg1_img();
        /***/
        public passwordinputdl_lab: passwordinputdl_lab = new passwordinputdl_lab();
        /***/
        public passwordinputtext_lab: passwordinputtext_lab = new passwordinputtext_lab();
    }
    export class passwordinputbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class passwordinputdl_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class passwordinputtext_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class passnput_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public passnputbg1_img: passnputbg1_img = new passnputbg1_img();
        /***/
        public passputdl_lab: passputdl_lab = new passputdl_lab();
        /***/
        public passnputtext_lab: passnputtext_lab = new passnputtext_lab();
    }
    export class passnputbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class passputdl_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class passnputtext_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class show1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public show2_img: show2_img = new show2_img();
    }
    export class show2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public passworhide_img: passworhide_img = new passworhide_img();
        public passworshow1_img: passworshow1_img = new passworshow1_img();
    }
    export class passworhide_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class passworshow1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class confirmdbg {
        public transform: m4m.framework.transform2D;
        public confirmdinput_inp: confirmdinput_inp = new confirmdinput_inp();
        public confirminp_inp: confirminp_inp = new confirminp_inp();
        public show_img: show_img = new show_img();
    }
    export class confirmdinput_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public confirminputbg1_img: confirminputbg1_img = new confirminputbg1_img();
        /***/
        public confirminputdl_lab: confirminputdl_lab = new confirminputdl_lab();
        /***/
        public confirminputtext_lab: confirminputtext_lab = new confirminputtext_lab();
    }
    export class confirminputbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class confirminputdl_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class confirminputtext_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class confirminp_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public confirminpbg1_img: confirminpbg1_img = new confirminpbg1_img();
        /***/
        public confirminpdl_lab: confirminpdl_lab = new confirminpdl_lab();
        /***/
        public confirminputte_lab: confirminputte_lab = new confirminputte_lab();
    }
    export class confirminpbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class confirminpdl_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class confirminputte_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class show_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public show4_img: show4_img = new show4_img();
    }
    export class show4_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public confirmdrhide_img: confirmdrhide_img = new confirmdrhide_img();
        public confirmdshow1_img: confirmdshow1_img = new confirmdshow1_img();
    }
    export class confirmdrhide_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class confirmdshow1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class messageinput1bg {
        public transform: m4m.framework.transform2D;
    }
    export class messageinput1_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public messageinputbg3_img: messageinputbg3_img = new messageinputbg3_img();
        /***/
        public messageinputdl1_lab: messageinputdl1_lab = new messageinputdl1_lab();
        /***/
        public messageinputtext1_lab: messageinputtext1_lab = new messageinputtext1_lab();
    }
    export class messageinputbg3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class messageinputdl1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class messageinputtext1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class messagebg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public message_lab: message_lab = new message_lab();
    }
    export class message_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class buttonbg {
        public transform: m4m.framework.transform2D;
        public registerbg_btn: registerbg_btn = new registerbg_btn();
        public registerbg1_btn: registerbg1_btn = new registerbg1_btn();
        public returntologinbg_btn: returntologinbg_btn = new returntologinbg_btn();
    }
    export class registerbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public register1_lab: register1_lab = new register1_lab();
    }
    export class register1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class registerbg1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public register2_lab: register2_lab = new register2_lab();
    }
    export class register2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class returntologinbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public returntologin_lab: returntologin_lab = new returntologin_lab();
    }
    export class returntologin_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class title_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
        /***/
        public title1_lab: title1_lab = new title1_lab();
        /***/
        public title3_lab: title3_lab = new title3_lab();
        /***/
        public titl_lab: titl_lab = new titl_lab();
        /***/
        public titl1_lab: titl1_lab = new titl1_lab();
    }
    export class title1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class title3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class titl_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class titl1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}