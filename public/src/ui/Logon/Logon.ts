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


export namespace Logon {
    export class Logon extends newUiBase {
        public static Instance: Logon;
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
        public inputdt_lab_text(text: string){this.bg1_img.inputbg.inputbg4.inputt_inp.inputdt_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtextt_lab_text(text: string){this.bg1_img.inputbg.inputbg4.inputt_inp.inputtextt_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputde_lab_text(text: string){this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.inputde_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtet_lab_text(text: string){this.bg1_img.inputbg.inputbg4.inpu1.inpu_inp.inputtet_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputd_lab_text(text: string){this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputd_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputte_lab_text(text: string){this.bg1_img.inputbg.inputbg4.inpu1.inp_inp.inputte_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputdl1_lab_text(text: string){this.bg1_img.inputbg.inputbg4.input1_inp.inputdl1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtext1_lab_text(text: string){this.bg1_img.inputbg.inputbg4.input1_inp.inputtext1_lab.label.text=text;}
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
        /**修改label 拷贝修改label文字方法*/
        public title2_lab_text(text: string){this.bg1_img.inputbg.title_lab.title2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title3_lab_text(text: string){this.bg1_img.inputbg.title_lab.title3_lab.label.text=text;}

        public uiName:string="Logon";

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
        public inputt_inp: inputt_inp = new inputt_inp();
        public inpu1: inpu1 = new inpu1();
        public input4: input4 = new input4();
        public input1_inp: input1_inp = new input1_inp();
        public messagebg_btn: messagebg_btn = new messagebg_btn();
    }
    export class inputt_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public inputbgt_img: inputbgt_img = new inputbgt_img();
        /***/
        public inputdt_lab: inputdt_lab = new inputdt_lab();
        /***/
        public inputtextt_lab: inputtextt_lab = new inputtextt_lab();
    }
    export class inputbgt_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputdt_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtextt_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inpu1 {
        public transform: m4m.framework.transform2D;
        public inpu_inp: inpu_inp = new inpu_inp();
        public inp_inp: inp_inp = new inp_inp();
        public show_img: show_img = new show_img();
    }
    export class inpu_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public inputb_img: inputb_img = new inputb_img();
        /***/
        public inputde_lab: inputde_lab = new inputde_lab();
        /***/
        public inputtet_lab: inputtet_lab = new inputtet_lab();
    }
    export class inputb_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputde_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtet_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inp_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public input_img: input_img = new input_img();
        /***/
        public inputd_lab: inputd_lab = new inputd_lab();
        /***/
        public inputte_lab: inputte_lab = new inputte_lab();
    }
    export class input_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputd_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputte_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class show_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public sho1_img: sho1_img = new sho1_img();
    }
    export class sho1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public hide_img: hide_img = new hide_img();
        public show1_img: show1_img = new show1_img();
    }
    export class hide_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class show1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class input4 {
        public transform: m4m.framework.transform2D;
    }
    export class input1_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public inputbg3_img: inputbg3_img = new inputbg3_img();
        /***/
        public inputdl1_lab: inputdl1_lab = new inputdl1_lab();
        /***/
        public inputtext1_lab: inputtext1_lab = new inputtext1_lab();
    }
    export class inputbg3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputdl1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtext1_lab {
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
        /**拷贝*/
        public title2_lab: title2_lab = new title2_lab();
        /***/
        public title3_lab: title3_lab = new title3_lab();
    }
    export class title1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class title2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class title3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}