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


export namespace Basicsettings {
    export class Basicsettings extends newUiBase {
        public static Instance: Basicsettings;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg1.bg2.artstylebg2.unfoldbg2_img.unfold_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.unfold_btn_event, this);
            this.bg1.bg2.artstylebg2.unfoldbg2_img.collapse_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.collapse_btn_event, this);
            this.bg1.savebg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.savebg_btn_event, this);
            this.bg3.naturalbtnbg.multiplebgbtnc_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.multiplebgbtnc_btn_event, this);
            this.bg3.naturalbtnbg.multiplebgbtncbg2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.multiplebgbtncbg2_btn_event, this);
            this.bg3.naturalbtnbg.uncheckedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.uncheckedbg_btn_event, this);
            this.bg3.naturalbtnbg.ashbg1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.ashbg1_btn_event, this);
            this.bg3.naturalbtnbg.ashbg3_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.ashbg3_btn_event, this);
            this.bg3.crown.previousstep_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.previousstep_btn_event, this);


        }
        //按钮事件
        private unfold_btn_event(){if(this.unfold_btn_btnEvent)this.unfold_btn_btnEvent();};
        /**this.bg1.bg2.artstylebg2.unfoldbg2_img.unfold_btn.button 的按钮事件*/
        public unfold_btn_btnEvent: ()=>any;
        private collapse_btn_event(){if(this.collapse_btn_btnEvent)this.collapse_btn_btnEvent();};
        /**this.bg1.bg2.artstylebg2.unfoldbg2_img.collapse_btn.button 的按钮事件*/
        public collapse_btn_btnEvent: ()=>any;
        private savebg_btn_event(){if(this.savebg_btn_btnEvent)this.savebg_btn_btnEvent();};
        /**this.bg1.savebg_btn.button 的按钮事件*/
        public savebg_btn_btnEvent: ()=>any;
        private multiplebgbtnc_btn_event(){if(this.multiplebgbtnc_btn_btnEvent)this.multiplebgbtnc_btn_btnEvent();};
        /** 的按钮事件*/
        public multiplebgbtnc_btn_btnEvent: ()=>any;
        private multiplebgbtncbg2_btn_event(){if(this.multiplebgbtncbg2_btn_btnEvent)this.multiplebgbtncbg2_btn_btnEvent();};
        /** 的按钮事件*/
        public multiplebgbtncbg2_btn_btnEvent: ()=>any;
        private uncheckedbg_btn_event(){if(this.uncheckedbg_btn_btnEvent)this.uncheckedbg_btn_btnEvent();};
        /**this.bg3.naturalbtnbg.uncheckedbg_btn.button 的按钮事件*/
        public uncheckedbg_btn_btnEvent: ()=>any;
        private ashbg1_btn_event(){if(this.ashbg1_btn_btnEvent)this.ashbg1_btn_btnEvent();};
        /**this.bg3.naturalbtnbg.ashbg1_btn.button 的按钮事件*/
        public ashbg1_btn_btnEvent: ()=>any;
        private ashbg3_btn_event(){if(this.ashbg3_btn_btnEvent)this.ashbg3_btn_btnEvent();};
        /**this.bg3.naturalbtnbg.ashbg3_btn.button 的按钮事件*/
        public ashbg3_btn_btnEvent: ()=>any;
        private previousstep_btn_event(){if(this.previousstep_btn_btnEvent)this.previousstep_btn_btnEvent();};
        /**this.bg3.crown.previousstep_btn.button 的按钮事件*/
        public previousstep_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public inputtextb1_lab_text(text: string){this.bg1.bg2.setbg1.textinput_inp.inputtextb1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtextb_lab_text(text: string){this.bg1.bg2.setbg1.textinput_inp.inputtextb_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title4_lab_text(text: string){this.bg1.bg2.setbg1.textinput_inp.title4_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public sound1_lab_text(text: string){this.bg1.bg2.artstylebg2.artstylebg.unfoldbg_img.unfoldbg1_scr.unfoldbg1content.sound2.sound1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public artstyle1_lab_text(text: string){this.bg1.bg2.artstylebg2.artstylebg.artstylebg1_img.artstyle1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public gamename_lab_text(text: string){this.bg1.bg2.searchbg1.iuput_inp.gamename_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public gamename1_lab_text(text: string){this.bg1.bg2.searchbg1.iuput_inp.gamename1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public save_lab_text(text: string){this.bg1.savebg_btn.save_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title2_lab_text(text: string){this.bg1.titlebg.title2_lab.label.text=text;}
        /**修改label  this.bg1.titlebg.text3_lab.label 修改label文字方法*/
        public text3_lab_text(text: string){this.bg1.titlebg.text3_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public multiplebgbtnlabc1_lab_text(text: string){this.bg3.naturalbtnbg.multiplebgbtnc_btn.multiplebgbtnlabc1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public multiplebgbtnlabc2_lab_text(text: string){this.bg3.naturalbtnbg.multiplebgbtncbg2_btn.multiplebgbtnlabc2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public unchecked_lab_text(text: string){this.bg3.naturalbtnbg.uncheckedbg_btn.unchecked_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public ash_lab_text(text: string){this.bg3.naturalbtnbg.ashbg1_btn.ash_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public ash3_lab_text(text: string){this.bg3.naturalbtnbg.ashbg3_btn.ash3_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public search2_lab_text(text: string){this.bg3.crown.searchbg1_img.search2_lab.label.text=text;}

        public uiName:string="Basicsettings";

        public bg: bg = new bg();
        public bg1: bg1 = new bg1();
        public bg3: bg3 = new bg3();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg1 {
        public transform: m4m.framework.transform2D;
        public bg2: bg2 = new bg2();
        public savebg_btn: savebg_btn = new savebg_btn();
        public titlebg: titlebg = new titlebg();
    }
    export class bg2 {
        public transform: m4m.framework.transform2D;
        public setbg1: setbg1 = new setbg1();
        public artstylebg2: artstylebg2 = new artstylebg2();
        public searchbg1: searchbg1 = new searchbg1();
    }
    export class setbg1 {
        public transform: m4m.framework.transform2D;
        public textinput_inp: textinput_inp = new textinput_inp();
    }
    export class textinput_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public setbg_img: setbg_img = new setbg_img();
        /***/
        public inputtextb1_lab: inputtextb1_lab = new inputtextb1_lab();
        /***/
        public inputtextb_lab: inputtextb_lab = new inputtextb_lab();
        /***/
        public title4_lab: title4_lab = new title4_lab();
    }
    export class setbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputtextb1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtextb_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class title4_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class artstylebg2 {
        public transform: m4m.framework.transform2D;
        public artstylebg: artstylebg = new artstylebg();
        public unfoldbg2_img: unfoldbg2_img = new unfoldbg2_img();
    }
    export class artstylebg {
        public transform: m4m.framework.transform2D;
        public unfoldbg_img: unfoldbg_img = new unfoldbg_img();
        /***/
        public artstylebg1_img: artstylebg1_img = new artstylebg1_img();
    }
    export class unfoldbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /**滑动区域*/
        public unfoldbg1_scr: unfoldbg1_scr = new unfoldbg1_scr();
    }
    export class unfoldbg1_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public unfoldbg1content: unfoldbg1content = new unfoldbg1content();
    }
    export class unfoldbg1content {
        public transform: m4m.framework.transform2D;
        public sound2: sound2 = new sound2();
    }
    export class sound2 {
        public transform: m4m.framework.transform2D;
        public line_img: line_img = new line_img();
        /***/
        public sound1_lab: sound1_lab = new sound1_lab();
    }
    export class line_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class sound1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class artstylebg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public artstyle1_lab: artstyle1_lab = new artstyle1_lab();
    }
    export class artstyle1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class unfoldbg2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public unfold_btn: unfold_btn = new unfold_btn();
        public collapse_btn: collapse_btn = new collapse_btn();
    }
    export class unfold_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class collapse_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class searchbg1 {
        public transform: m4m.framework.transform2D;
        public iuput_inp: iuput_inp = new iuput_inp();
    }
    export class iuput_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public searchbg_img: searchbg_img = new searchbg_img();
        /***/
        public gamename_lab: gamename_lab = new gamename_lab();
        /***/
        public gamename1_lab: gamename1_lab = new gamename1_lab();
    }
    export class searchbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class gamename_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class gamename1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class savebg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public savebg1_img: savebg1_img = new savebg1_img();
        /***/
        public save_lab: save_lab = new save_lab();
    }
    export class savebg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class save_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class titlebg {
        public transform: m4m.framework.transform2D;
        /***/
        public title2_lab: title2_lab = new title2_lab();
        public text3_lab: text3_lab = new text3_lab();
    }
    export class title2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class bg3 {
        public transform: m4m.framework.transform2D;
        public naturalbtnbg: naturalbtnbg = new naturalbtnbg();
        public crown: crown = new crown();
    }
    export class naturalbtnbg {
        public transform: m4m.framework.transform2D;
        /***/
        public multiplebgbtnc_btn: multiplebgbtnc_btn = new multiplebgbtnc_btn();
        /***/
        public multiplebgbtncbg2_btn: multiplebgbtncbg2_btn = new multiplebgbtncbg2_btn();
        public uncheckedbg_btn: uncheckedbg_btn = new uncheckedbg_btn();
        public ashbg1_btn: ashbg1_btn = new ashbg1_btn();
        public ashbg3_btn: ashbg3_btn = new ashbg3_btn();
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
    export class crown {
        public transform: m4m.framework.transform2D;
        public searchbg1_img: searchbg1_img = new searchbg1_img();
        public previousstep_btn: previousstep_btn = new previousstep_btn();
    }
    export class searchbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public search2_lab: search2_lab = new search2_lab();
    }
    export class search2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class previousstep_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public previousstep1_img: previousstep1_img = new previousstep1_img();
    }
    export class previousstep1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }

}