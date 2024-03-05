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


export namespace ChapterSceneMenu {
    export class ChapterSceneMenu extends newUiBase {
        public static Instance: ChapterSceneMenu;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg2.naturalbtnbg.savebg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.savebg_btn_event, this);
            this.bg2.naturalbtnbg.multiplebgbtnc_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.multiplebgbtnc_btn_event, this);
            this.bg2.naturalbtnbg.multiplebgbtncbg2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.multiplebgbtncbg2_btn_event, this);
            this.bg2.naturalbtnbg.uncheckedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.uncheckedbg_btn_event, this);
            this.bg2.naturalbtnbg.ashbg1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.ashbg1_btn_event, this);
            this.bg2.naturalbtnbg.ashbg3_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.ashbg3_btn_event, this);
            this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.chapterbg2.edit_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.edit_btn_event, this);
            this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.sectionbg3_img.edit1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.edit1_btn_event, this);
            this.bg2.textbg_img.back_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.back_btn_event, this);


        }
        //按钮事件
        private savebg_btn_event(){if(this.savebg_btn_btnEvent)this.savebg_btn_btnEvent();};
        /**this.bg2.naturalbtnbg.savebg_btn.button 的按钮事件*/
        public savebg_btn_btnEvent: ()=>any;
        private multiplebgbtnc_btn_event(){if(this.multiplebgbtnc_btn_btnEvent)this.multiplebgbtnc_btn_btnEvent();};
        /** 的按钮事件*/
        public multiplebgbtnc_btn_btnEvent: ()=>any;
        private multiplebgbtncbg2_btn_event(){if(this.multiplebgbtncbg2_btn_btnEvent)this.multiplebgbtncbg2_btn_btnEvent();};
        /** 的按钮事件*/
        public multiplebgbtncbg2_btn_btnEvent: ()=>any;
        private uncheckedbg_btn_event(){if(this.uncheckedbg_btn_btnEvent)this.uncheckedbg_btn_btnEvent();};
        /**this.bg2.naturalbtnbg.uncheckedbg_btn.button 的按钮事件*/
        public uncheckedbg_btn_btnEvent: ()=>any;
        private ashbg1_btn_event(){if(this.ashbg1_btn_btnEvent)this.ashbg1_btn_btnEvent();};
        /**this.bg2.naturalbtnbg.ashbg1_btn.button 的按钮事件*/
        public ashbg1_btn_btnEvent: ()=>any;
        private ashbg3_btn_event(){if(this.ashbg3_btn_btnEvent)this.ashbg3_btn_btnEvent();};
        /**this.bg2.naturalbtnbg.ashbg3_btn.button 的按钮事件*/
        public ashbg3_btn_btnEvent: ()=>any;
        private edit_btn_event(){if(this.edit_btn_btnEvent)this.edit_btn_btnEvent();};
        /**this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.chapterbg2.edit_btn.button 的按钮事件*/
        public edit_btn_btnEvent: ()=>any;
        private edit1_btn_event(){if(this.edit1_btn_btnEvent)this.edit1_btn_btnEvent();};
        /**this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.sectionbg3_img.edit1_btn.button 的按钮事件*/
        public edit1_btn_btnEvent: ()=>any;
        private back_btn_event(){if(this.back_btn_btnEvent)this.back_btn_btnEvent();};
        /**this.bg2.textbg_img.back_btn.button 的按钮事件*/
        public back_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public save_lab_text(text: string){this.bg2.naturalbtnbg.savebg_btn.save_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public multiplebgbtnlabc1_lab_text(text: string){this.bg2.naturalbtnbg.multiplebgbtnc_btn.multiplebgbtnlabc1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public multiplebgbtnlabc2_lab_text(text: string){this.bg2.naturalbtnbg.multiplebgbtncbg2_btn.multiplebgbtnlabc2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public unchecked_lab_text(text: string){this.bg2.naturalbtnbg.uncheckedbg_btn.unchecked_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public ash_lab_text(text: string){this.bg2.naturalbtnbg.ashbg1_btn.ash_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public ash3_lab_text(text: string){this.bg2.naturalbtnbg.ashbg3_btn.ash3_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public chaptername1_lab_text(text: string){this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.chapterbg2.chaptername1_lab.label.text=text;}
        /**修改label 新建章节修改label文字方法*/
        public new2_lab_text(text: string){this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.chapterbg2.new2bg.new2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public chaptername_lab_text(text: string){this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.sectionbg3_img.chaptername_lab.label.text=text;}
        /**修改label 新建章节修改label文字方法*/
        public new1_lab_text(text: string){this.bg2.bg3_img.scr_scr.scrcontent.chapterbg1.new1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public text_lab_text(text: string){this.bg2.textbg_img.text_lab.label.text=text;}

        public uiName:string="ChapterSceneMenu";

        public bg: bg = new bg();
        public bg2: bg2 = new bg2();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg2 {
        public transform: m4m.framework.transform2D;
        public naturalbtnbg: naturalbtnbg = new naturalbtnbg();
        /***/
        public bg3_img: bg3_img = new bg3_img();
        /***/
        public textbg_img: textbg_img = new textbg_img();
    }
    export class naturalbtnbg {
        public transform: m4m.framework.transform2D;
        public savebg_btn: savebg_btn = new savebg_btn();
        /***/
        public multiplebgbtnc_btn: multiplebgbtnc_btn = new multiplebgbtnc_btn();
        /***/
        public multiplebgbtncbg2_btn: multiplebgbtncbg2_btn = new multiplebgbtncbg2_btn();
        public uncheckedbg_btn: uncheckedbg_btn = new uncheckedbg_btn();
        public ashbg1_btn: ashbg1_btn = new ashbg1_btn();
        public ashbg3_btn: ashbg3_btn = new ashbg3_btn();
    }
    export class savebg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public save_lab: save_lab = new save_lab();
    }
    export class save_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class multiplebgbtnc_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public multiplebgbtnlabc1_lab: multiplebgbtnlabc1_lab = new multiplebgbtnlabc1_lab();
    }
    export class multiplebgbtnlabc1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class multiplebgbtncbg2_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public multiplebgbtnlabc2_lab: multiplebgbtnlabc2_lab = new multiplebgbtnlabc2_lab();
    }
    export class multiplebgbtnlabc2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class uncheckedbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public unchecked_lab: unchecked_lab = new unchecked_lab();
    }
    export class unchecked_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class ashbg1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public ash_lab: ash_lab = new ash_lab();
    }
    export class ash_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class ashbg3_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public ash3_lab: ash3_lab = new ash3_lab();
    }
    export class ash3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class bg3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public scr_scr: scr_scr = new scr_scr();
    }
    export class scr_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public scrcontent: scrcontent = new scrcontent();
    }
    export class scrcontent {
        public transform: m4m.framework.transform2D;
        public chapterbg1: chapterbg1 = new chapterbg1();
    }
    export class chapterbg1 {
        public transform: m4m.framework.transform2D;
        public chapterbg2: chapterbg2 = new chapterbg2();
        public sectionbg3_img: sectionbg3_img = new sectionbg3_img();
        /**新建章节*/
        public new1_lab: new1_lab = new new1_lab();
    }
    export class chapterbg2 {
        public transform: m4m.framework.transform2D;
        public sectionbg_img: sectionbg_img = new sectionbg_img();
        public sectionbg1: sectionbg1 = new sectionbg1();
        public section2_img: section2_img = new section2_img();
        /***/
        public file_img: file_img = new file_img();
        public edit_btn: edit_btn = new edit_btn();
        /***/
        public chaptername1_lab: chaptername1_lab = new chaptername1_lab();
        public new2bg: new2bg = new new2bg();
    }
    export class sectionbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class sectionbg1 {
        public transform: m4m.framework.transform2D;
    }
    export class section2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class file_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class edit_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class chaptername1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class new2bg {
        public transform: m4m.framework.transform2D;
        /**新建章节*/
        public new2_lab: new2_lab = new new2_lab();
        public plus2_img: plus2_img = new plus2_img();
    }
    export class new2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class plus2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class sectionbg3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public folder_img: folder_img = new folder_img();
        /***/
        public chaptername_lab: chaptername_lab = new chaptername_lab();
        public edit1_btn: edit1_btn = new edit1_btn();
        public arrowt_img: arrowt_img = new arrowt_img();
        public arrowb_img: arrowb_img = new arrowb_img();
    }
    export class folder_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class chaptername_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class edit1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class arrowt_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class arrowb_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class new1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
        public plus1_img: plus1_img = new plus1_img();
    }
    export class plus1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class textbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public back_btn: back_btn = new back_btn();
        /***/
        public text_lab: text_lab = new text_lab();
    }
    export class back_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class text_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}