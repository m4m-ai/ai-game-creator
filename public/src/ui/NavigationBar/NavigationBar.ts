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
import { GameUiView } from "GameUiView";


export namespace NavigationBar {
    export class NavigationBar extends newUiBase {
        public static Instance: NavigationBar;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg1.viewbg.newb1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.newb1_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.aibg1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.aibg1_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.retreatbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.retreatbg_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.suspendbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.suspendbg_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.forwardbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.forwardbg_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.playbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.playbg_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.refreshbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.refreshbg_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.nextstepbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.nextstepbg_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.backbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.backbg_btn_event, this);
            this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.abbreviationbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.abbreviationbg_btn_event, this);
            this.bg1.windowbg_img.dialogbg2.dialogbg1_scr.dialogbg1content.cellbg.window_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.window_btn_event, this);
            this.bg1.expandbg.expand_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.expand_btn_event, this);
            this.bg1.expandbg.contractbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.contractbg_btn_event, this);


        }
        //按钮事件
        private newb1_btn_event(){if(this.newb1_btn_btnEvent)this.newb1_btn_btnEvent();};
        /**this.bg1.viewbg.newb1_btn.button 的按钮事件*/
        public newb1_btn_btnEvent: ()=>any;
        private aibg1_btn_event(){if(this.aibg1_btn_btnEvent)this.aibg1_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.aibg1_btn.button 的按钮事件*/
        public aibg1_btn_btnEvent: ()=>any;
        private retreatbg_btn_event(){if(this.retreatbg_btn_btnEvent)this.retreatbg_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.retreatbg_btn.button 的按钮事件*/
        public retreatbg_btn_btnEvent: ()=>any;
        private suspendbg_btn_event(){if(this.suspendbg_btn_btnEvent)this.suspendbg_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.suspendbg_btn.button 的按钮事件*/
        public suspendbg_btn_btnEvent: ()=>any;
        private forwardbg_btn_event(){if(this.forwardbg_btn_btnEvent)this.forwardbg_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.forwardbg_btn.button 的按钮事件*/
        public forwardbg_btn_btnEvent: ()=>any;
        private playbg_btn_event(){if(this.playbg_btn_btnEvent)this.playbg_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.playbg_btn.button 的按钮事件*/
        public playbg_btn_btnEvent: ()=>any;
        private refreshbg_btn_event(){if(this.refreshbg_btn_btnEvent)this.refreshbg_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.refreshbg_btn.button 的按钮事件*/
        public refreshbg_btn_btnEvent: ()=>any;
        private nextstepbg_btn_event(){if(this.nextstepbg_btn_btnEvent)this.nextstepbg_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.nextstepbg_btn.button 的按钮事件*/
        public nextstepbg_btn_btnEvent: ()=>any;
        private backbg_btn_event(){if(this.backbg_btn_btnEvent)this.backbg_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.backbg_btn.button 的按钮事件*/
        public backbg_btn_btnEvent: ()=>any;
        private abbreviationbg_btn_event(){if(this.abbreviationbg_btn_btnEvent)this.abbreviationbg_btn_btnEvent();};
        /**this.bg1.bottombg_img.bottombg2.bottombg1.bottombg.abbreviationbg_btn.button 的按钮事件*/
        public abbreviationbg_btn_btnEvent: ()=>any;
        private window_btn_event(){if(this.window_btn_btnEvent)this.window_btn_btnEvent();};
        /**this.bg1.windowbg_img.dialogbg2.dialogbg1_scr.dialogbg1content.cellbg.window_btn.button 的按钮事件*/
        public window_btn_btnEvent: ()=>any;
        private expand_btn_event(){if(this.expand_btn_btnEvent)this.expand_btn_btnEvent();};
        /**this.bg1.expandbg.expand_btn.button 的按钮事件*/
        public expand_btn_btnEvent: ()=>any;
        private contractbg_btn_event(){if(this.contractbg_btn_btnEvent)this.contractbg_btn_btnEvent();};
        /**this.bg1.expandbg.contractbg_btn.button 的按钮事件*/
        public contractbg_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 添加语句修改label文字方法*/
        public new_lab_text(text: string){this.bg1.viewbg.newb1_btn.new_lab.label.text=text;}
        /**修改label 选中修改label文字方法*/
        public title1_lab_text(text: string){this.bg1.windowbg_img.dialogbg2.dialogbg1_scr.dialogbg1content.cellbg.title1_lab.label.text=text;}

        public uiName:string="NavigationBar";

        public bg: bg = new bg();
        public bg1: bg1 = new bg1();
        /***/
        public popupbg2_img: popupbg2_img = new popupbg2_img();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg1 {
        public transform: m4m.framework.transform2D;
        public viewbg: viewbg = new viewbg();
        /***/
        public bottombg_img: bottombg_img = new bottombg_img();
        /***/
        public menubg_img: menubg_img = new menubg_img();
        /**滑动背景*/
        public windowbg_img: windowbg_img = new windowbg_img();
        public expandbg: expandbg = new expandbg();
    }
    export class viewbg {
        public transform: m4m.framework.transform2D;
        /***/
        public gameuibg_img: gameuibg_img = new gameuibg_img();
        public newb1_btn: newb1_btn = new newb1_btn();
    }
    export class gameuibg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public gameui: GameUiView;
    }
    export class newb1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public new1_img: new1_img = new new1_img();
        /**添加语句*/
        public new_lab: new_lab = new new_lab();
    }
    export class new1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class new_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class bottombg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public bottombg2: bottombg2 = new bottombg2();
    }
    export class bottombg2 {
        public transform: m4m.framework.transform2D;
        public bottombg1: bottombg1 = new bottombg1();
    }
    export class bottombg1 {
        public transform: m4m.framework.transform2D;
        public bottombg: bottombg = new bottombg();
    }
    export class bottombg {
        public transform: m4m.framework.transform2D;
        public aibg1_btn: aibg1_btn = new aibg1_btn();
        public savebg_ben: savebg_ben = new savebg_ben();
        public retreatbg_btn: retreatbg_btn = new retreatbg_btn();
        public suspendbg_btn: suspendbg_btn = new suspendbg_btn();
        public forwardbg_btn: forwardbg_btn = new forwardbg_btn();
        public playbg_btn: playbg_btn = new playbg_btn();
        public refreshbg_btn: refreshbg_btn = new refreshbg_btn();
        public nextstepbg_btn: nextstepbg_btn = new nextstepbg_btn();
        public backbg_btn: backbg_btn = new backbg_btn();
        public abbreviationbg_btn: abbreviationbg_btn = new abbreviationbg_btn();
    }
    export class aibg1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public ai2_img: ai2_img = new ai2_img();
    }
    export class ai2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class savebg_ben {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public save_img: save_img = new save_img();
    }
    export class save_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class retreatbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public retreat_img: retreat_img = new retreat_img();
    }
    export class retreat_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class suspendbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public suspend_img: suspend_img = new suspend_img();
    }
    export class suspend_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class forwardbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public forward_img: forward_img = new forward_img();
    }
    export class forward_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class playbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public play_img: play_img = new play_img();
    }
    export class play_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class refreshbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public refresh_img: refresh_img = new refresh_img();
    }
    export class refresh_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class nextstepbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public nextstep_img: nextstep_img = new nextstep_img();
    }
    export class nextstep_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class backbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public back_img: back_img = new back_img();
    }
    export class back_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class abbreviationbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public abbreviation_img: abbreviation_img = new abbreviation_img();
    }
    export class abbreviation_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class menubg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public menbg2_img: menbg2_img = new menbg2_img();
        public menubg1: menubg1 = new menubg1();
        public filebg1: filebg1 = new filebg1();
    }
    export class menbg2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class menubg1 {
        public transform: m4m.framework.transform2D;
    }
    export class filebg1 {
        public transform: m4m.framework.transform2D;
        public filebg_img: filebg_img = new filebg_img();
        public file1_img: file1_img = new file1_img();
    }
    export class filebg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class file1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class windowbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public dialogbg2: dialogbg2 = new dialogbg2();
    }
    export class dialogbg2 {
        public transform: m4m.framework.transform2D;
        /**滑动区域*/
        public dialogbg1_scr: dialogbg1_scr = new dialogbg1_scr();
    }
    export class dialogbg1_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public dialogbg1content: dialogbg1content = new dialogbg1content();
    }
    export class dialogbg1content {
        public transform: m4m.framework.transform2D;
        public cellbg: cellbg = new cellbg();
    }
    export class cellbg {
        public transform: m4m.framework.transform2D;
        public window_btn: window_btn = new window_btn();
        /**未选中*/
        public title_raw: title_raw = new title_raw();
        /**选中*/
        public title1_lab: title1_lab = new title1_lab();
    }
    export class window_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class title_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class title1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class expandbg {
        public transform: m4m.framework.transform2D;
        public expand_btn: expand_btn = new expand_btn();
        public contractbg_btn: contractbg_btn = new contractbg_btn();
    }
    export class expand_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class contractbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class popupbg2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public popupbg1_img: popupbg1_img = new popupbg1_img();
    }
    export class popupbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }

}