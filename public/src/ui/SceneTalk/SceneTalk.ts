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


export namespace SceneTalk {
    export class SceneTalk extends newUiBase {
        public static Instance: SceneTalk;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg2.naturalbtnbg.multiplebgbtnc_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.multiplebgbtnc_btn_event, this);
            this.bg2.naturalbtnbg.savebg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.savebg_btn_event, this);
            this.bg2.naturalbtnbg.multiplebgbtncbg2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.multiplebgbtncbg2_btn_event, this);
            this.bg2.naturalbtnbg.uncheckedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.uncheckedbg_btn_event, this);
            this.bg2.naturalbtnbg.ashbg1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.ashbg1_btn_event, this);
            this.bg2.naturalbtnbg.ashbg3_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.ashbg3_btn_event, this);
            this.bg2.textbg_img.back_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.back_btn_event, this);


        }
        //按钮事件
        private multiplebgbtnc_btn_event(){if(this.multiplebgbtnc_btn_btnEvent)this.multiplebgbtnc_btn_btnEvent();};
        /** 的按钮事件*/
        public multiplebgbtnc_btn_btnEvent: ()=>any;
        private savebg_btn_event(){if(this.savebg_btn_btnEvent)this.savebg_btn_btnEvent();};
        /**this.bg2.naturalbtnbg.savebg_btn.button 的按钮事件*/
        public savebg_btn_btnEvent: ()=>any;
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
        private back_btn_event(){if(this.back_btn_btnEvent)this.back_btn_btnEvent();};
        /**this.bg2.textbg_img.back_btn.button 的按钮事件*/
        public back_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public multiplebgbtnlabc1_lab_text(text: string){this.bg2.naturalbtnbg.multiplebgbtnc_btn.multiplebgbtnlabc1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public save_lab_text(text: string){this.bg2.naturalbtnbg.savebg_btn.save_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public multiplebgbtnlabc2_lab_text(text: string){this.bg2.naturalbtnbg.multiplebgbtncbg2_btn.multiplebgbtnlabc2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public unchecked_lab_text(text: string){this.bg2.naturalbtnbg.uncheckedbg_btn.unchecked_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public ash_lab_text(text: string){this.bg2.naturalbtnbg.ashbg1_btn.ash_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public ash3_lab_text(text: string){this.bg2.naturalbtnbg.ashbg3_btn.ash3_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtextb1_lab_text(text: string){this.bg2.bg3.inpb_inp.inputtextb1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtextb_lab_text(text: string){this.bg2.bg3.inpb_inp.inputtextb_lab.label.text=text;}
        /**修改label 场景对话修改label文字方法*/
        public text1_lab_text(text: string){this.bg2.bg3.text1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public text_lab_text(text: string){this.bg2.textbg_img.text_lab.label.text=text;}

        public uiName:string="SceneTalk";

        public bg: bg = new bg();
        public bg2: bg2 = new bg2();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg2 {
        public transform: m4m.framework.transform2D;
        public naturalbtnbg: naturalbtnbg = new naturalbtnbg();
        public bg3: bg3 = new bg3();
        /***/
        public textbg_img: textbg_img = new textbg_img();
    }
    export class naturalbtnbg {
        public transform: m4m.framework.transform2D;
        /***/
        public multiplebgbtnc_btn: multiplebgbtnc_btn = new multiplebgbtnc_btn();
        public savebg_btn: savebg_btn = new savebg_btn();
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
    export class bg3 {
        public transform: m4m.framework.transform2D;
        public inpb_inp: inpb_inp = new inpb_inp();
        /**场景对话*/
        public text1_lab: text1_lab = new text1_lab();
    }
    export class inpb_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        /***/
        public desbg_img: desbg_img = new desbg_img();
        /***/
        public inputtextb1_lab: inputtextb1_lab = new inputtextb1_lab();
        /***/
        public inputtextb_lab: inputtextb_lab = new inputtextb_lab();
    }
    export class desbg_img {
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
    export class text1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
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