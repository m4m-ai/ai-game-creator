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
import { CheakPopupView } from "CheakPopupView";


export namespace Chatbackground {
    export class Chatbackground extends newUiBase {
        public static Instance: Chatbackground;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg1.chatmenubg_img.chatmenubg1.chatmenuscr_scr.chatmenuscrcontent.newchatbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.newchatbg_btn_event, this);
            this.bg1.chatmenubg_img.chatmenubg1.chatmenuscr_scr.chatmenuscrcontent.newchatbg_btn.newchattext1_lab.definition_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.definition_btn_event, this);
            this.bg1.chatmenubg_img.chatmenubg1.newchatbg1.newchat1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.newchat1_btn_event, this);
            this.bg1.divider_img.inputbg.delete_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.delete_btn_event, this);
            this.bg1.divider_img.inputbg.app_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.app_btn_event, this);
            this.bg1.divider_img.inputbg.sending_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.sending_btn_event, this);


        }
        //按钮事件
        private newchatbg_btn_event(){if(this.newchatbg_btn_btnEvent)this.newchatbg_btn_btnEvent();};
        /**this.bg1.chatmenubg_img.chatmenubg1.chatmenuscr_scr.chatmenuscrcontent.newchatbg_btn.button 的按钮事件*/
        public newchatbg_btn_btnEvent: ()=>any;
        private definition_btn_event(){if(this.definition_btn_btnEvent)this.definition_btn_btnEvent();};
        /**this.bg1.chatmenubg_img.chatmenubg1.chatmenuscr_scr.chatmenuscrcontent.newchatbg_btn.newchattext1_lab.definition_btn.button 的按钮事件*/
        public definition_btn_btnEvent: ()=>any;
        private newchat1_btn_event(){if(this.newchat1_btn_btnEvent)this.newchat1_btn_btnEvent();};
        /**this.bg1.chatmenubg_img.chatmenubg1.newchatbg1.newchat1_btn.button 的按钮事件*/
        public newchat1_btn_btnEvent: ()=>any;
        private delete_btn_event(){if(this.delete_btn_btnEvent)this.delete_btn_btnEvent();};
        /**this.bg1.divider_img.inputbg.delete_btn.button 的按钮事件*/
        public delete_btn_btnEvent: ()=>any;
        private app_btn_event(){if(this.app_btn_btnEvent)this.app_btn_btnEvent();};
        /**this.bg1.divider_img.inputbg.app_btn.button 的按钮事件*/
        public app_btn_btnEvent: ()=>any;
        private sending_btn_event(){if(this.sending_btn_btnEvent)this.sending_btn_btnEvent();};
        /**this.bg1.divider_img.inputbg.sending_btn.button 的按钮事件*/
        public sending_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public newchattext1_lab_text(text: string){this.bg1.chatmenubg_img.chatmenubg1.chatmenuscr_scr.chatmenuscrcontent.newchatbg_btn.newchattext1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public newchattext_lab_text(text: string){this.bg1.chatmenubg_img.chatmenubg1.newchatbg1.newchattext_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtext_lab_text(text: string){this.bg1.divider_img.inputbg.inputbox_inp.inputtext_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtext1_lab_text(text: string){this.bg1.divider_img.inputbg.inputbox_inp.inputtext1_lab.label.text=text;}

        public uiName:string="Chatbackground";

        public bg: bg = new bg();
        public bg1: bg1 = new bg1();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg1 {
        public transform: m4m.framework.transform2D;
        /**30_r30_t150_b150*/
        public chatmenubg_img: chatmenubg_img = new chatmenubg_img();
        /***/
        public divider_img: divider_img = new divider_img();
    }
    export class chatmenubg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public chatmenubg1: chatmenubg1 = new chatmenubg1();
    }
    export class chatmenubg1 {
        public transform: m4m.framework.transform2D;
        /***/
        public chatmenuscr_scr: chatmenuscr_scr = new chatmenuscr_scr();
        public newchatbg1: newchatbg1 = new newchatbg1();
    }
    export class chatmenuscr_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public chatmenuscrcontent: chatmenuscrcontent = new chatmenuscrcontent();
    }
    export class chatmenuscrcontent {
        public transform: m4m.framework.transform2D;
        public newchatbg_btn: newchatbg_btn = new newchatbg_btn();
    }
    export class newchatbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public newchattext1_lab: newchattext1_lab = new newchattext1_lab();
        public frame_img: frame_img = new frame_img();
    }
    export class newchattext1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
        public texticon_img: texticon_img = new texticon_img();
        public definition_btn: definition_btn = new definition_btn();
    }
    export class texticon_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class definition_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class frame_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class newchatbg1 {
        public transform: m4m.framework.transform2D;
        public newchat1_btn: newchat1_btn = new newchat1_btn();
        /***/
        public newchattext_lab: newchattext_lab = new newchattext_lab();
    }
    export class newchat1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class newchattext_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class divider_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public chatmenubg2_scr: chatmenubg2_scr = new chatmenubg2_scr();
        public inputbg: inputbg = new inputbg();
    }
    export class chatmenubg2_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public chatmenubg2content: chatmenubg2content = new chatmenubg2content();
    }
    export class chatmenubg2content {
        public transform: m4m.framework.transform2D;
        public body: CheakPopupView;
    }
    export class inputbg {
        public transform: m4m.framework.transform2D;
        public delete_btn: delete_btn = new delete_btn();
        public app_btn: app_btn = new app_btn();
        public sending_btn: sending_btn = new sending_btn();
        public inputbox_inp: inputbox_inp = new inputbox_inp();
    }
    export class delete_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class app_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class sending_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public sending1_img: sending1_img = new sending1_img();
    }
    export class sending1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputbox_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public inputbox1_img: inputbox1_img = new inputbox1_img();
        /***/
        public inputtext_lab: inputtext_lab = new inputtext_lab();
        /***/
        public inputtext1_lab: inputtext1_lab = new inputtext1_lab();
    }
    export class inputbox1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputtext_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtext1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}