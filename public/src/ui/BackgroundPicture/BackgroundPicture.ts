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


export namespace BackgroundPicture {
    export class BackgroundPicture extends newUiBase {
        public static Instance: BackgroundPicture;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg1.imagebg_img.image1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.image1_btn_event, this);
            this.bg1.imagebg_img.upload_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.upload_btn_event, this);
            this.bg1.savebg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.savebg_btn_event, this);
            this.bg1.naturalbtnbg.multiplebgbtnc_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.multiplebgbtnc_btn_event, this);
            this.bg1.naturalbtnbg.multiplebgbtncbg2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.multiplebgbtncbg2_btn_event, this);
            this.bg1.naturalbtnbg.uncheckedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.uncheckedbg_btn_event, this);
            this.bg1.naturalbtnbg.ashbg1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.ashbg1_btn_event, this);
            this.bg1.naturalbtnbg.ashbg3_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.ashbg3_btn_event, this);
            this.bg1.setbacbg2.setbackgbg.setbackgroundbg1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.setbackgroundbg1_btn_event, this);
            this.bg1.setbacbg2.setbackgbg1.setbackgrobg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.setbackgrobg_btn_event, this);
            this.bg1.crown.previousstep_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.previousstep_btn_event, this);


        }
        //按钮事件
        private image1_btn_event(){if(this.image1_btn_btnEvent)this.image1_btn_btnEvent();};
        /**this.bg1.imagebg_img.image1_btn.button 的按钮事件*/
        public image1_btn_btnEvent: ()=>any;
        private upload_btn_event(){if(this.upload_btn_btnEvent)this.upload_btn_btnEvent();};
        /**this.bg1.imagebg_img.upload_btn.button 的按钮事件*/
        public upload_btn_btnEvent: ()=>any;
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
        /**this.bg1.naturalbtnbg.uncheckedbg_btn.button 的按钮事件*/
        public uncheckedbg_btn_btnEvent: ()=>any;
        private ashbg1_btn_event(){if(this.ashbg1_btn_btnEvent)this.ashbg1_btn_btnEvent();};
        /**this.bg1.naturalbtnbg.ashbg1_btn.button 的按钮事件*/
        public ashbg1_btn_btnEvent: ()=>any;
        private ashbg3_btn_event(){if(this.ashbg3_btn_btnEvent)this.ashbg3_btn_btnEvent();};
        /**this.bg1.naturalbtnbg.ashbg3_btn.button 的按钮事件*/
        public ashbg3_btn_btnEvent: ()=>any;
        private setbackgroundbg1_btn_event(){if(this.setbackgroundbg1_btn_btnEvent)this.setbackgroundbg1_btn_btnEvent();};
        /**this.bg1.setbacbg2.setbackgbg.setbackgroundbg1_btn.button 的按钮事件*/
        public setbackgroundbg1_btn_btnEvent: ()=>any;
        private setbackgrobg_btn_event(){if(this.setbackgrobg_btn_btnEvent)this.setbackgrobg_btn_btnEvent();};
        /**this.bg1.setbacbg2.setbackgbg1.setbackgrobg_btn.button 的按钮事件*/
        public setbackgrobg_btn_btnEvent: ()=>any;
        private previousstep_btn_event(){if(this.previousstep_btn_btnEvent)this.previousstep_btn_btnEvent();};
        /**this.bg1.crown.previousstep_btn.button 的按钮事件*/
        public previousstep_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public save_lab_text(text: string){this.bg1.savebg_btn.save_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public multiplebgbtnlabc1_lab_text(text: string){this.bg1.naturalbtnbg.multiplebgbtnc_btn.multiplebgbtnlabc1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public multiplebgbtnlabc2_lab_text(text: string){this.bg1.naturalbtnbg.multiplebgbtncbg2_btn.multiplebgbtnlabc2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public unchecked_lab_text(text: string){this.bg1.naturalbtnbg.uncheckedbg_btn.unchecked_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public ash_lab_text(text: string){this.bg1.naturalbtnbg.ashbg1_btn.ash_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public ash3_lab_text(text: string){this.bg1.naturalbtnbg.ashbg3_btn.ash3_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtexta1_lab_text(text: string){this.bg1.inpa3.inpa_inp.inputtexta1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtexta_lab_text(text: string){this.bg1.inpa3.inpa_inp.inputtexta_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtextb1_lab_text(text: string){this.bg1.inpbbg2.inpb_inp.inputtextb1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtextb_lab_text(text: string){this.bg1.inpbbg2.inpb_inp.inputtextb_lab.label.text=text;}
        /**修改label 设置背景图修改label文字方法*/
        public text4_lab_text(text: string){this.bg1.text4_lab.label.text=text;}
        /**修改label 背景图片修改label文字方法*/
        public text3_lab_text(text: string){this.bg1.text3_lab.label.text=text;}
        /**修改label 背景描述修改label文字方法*/
        public text2_lab_text(text: string){this.bg1.text2_lab.label.text=text;}
        /**修改label 背景图名修改label文字方法*/
        public text1_lab_text(text: string){this.bg1.text1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public search2_lab_text(text: string){this.bg1.crown.searchbg1_img.search2_lab.label.text=text;}

        public uiName:string="BackgroundPicture";

        public bg: bg = new bg();
        public bg1: bg1 = new bg1();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg1 {
        public transform: m4m.framework.transform2D;
        /***/
        public imagebg_img: imagebg_img = new imagebg_img();
        public savebg_btn: savebg_btn = new savebg_btn();
        public naturalbtnbg: naturalbtnbg = new naturalbtnbg();
        public setbacbg2: setbacbg2 = new setbacbg2();
        public inpa3: inpa3 = new inpa3();
        public inpbbg2: inpbbg2 = new inpbbg2();
        /**设置背景图*/
        public text4_lab: text4_lab = new text4_lab();
        /**背景图片*/
        public text3_lab: text3_lab = new text3_lab();
        /**背景描述*/
        public text2_lab: text2_lab = new text2_lab();
        /**背景图名*/
        public text1_lab: text1_lab = new text1_lab();
        public crown: crown = new crown();
    }
    export class imagebg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public image_raw: image_raw = new image_raw();
        public image1_btn: image1_btn = new image1_btn();
        public upload_btn: upload_btn = new upload_btn();
    }
    export class image_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class image1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class upload_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
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
    export class setbacbg2 {
        public transform: m4m.framework.transform2D;
        public setbackgbg: setbackgbg = new setbackgbg();
        public setbackgbg1: setbackgbg1 = new setbackgbg1();
    }
    export class setbackgbg {
        public transform: m4m.framework.transform2D;
        public setbackgroundbg1_btn: setbackgroundbg1_btn = new setbackgroundbg1_btn();
        public setbackground_img: setbackground_img = new setbackground_img();
    }
    export class setbackgroundbg1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class setbackground_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class setbackgbg1 {
        public transform: m4m.framework.transform2D;
        public setbackgrobg_btn: setbackgrobg_btn = new setbackgrobg_btn();
        public setbackgro_img: setbackgro_img = new setbackgro_img();
    }
    export class setbackgrobg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class setbackgro_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inpa3 {
        public transform: m4m.framework.transform2D;
        public inpa_inp: inpa_inp = new inpa_inp();
    }
    export class inpa_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public searchbg_img: searchbg_img = new searchbg_img();
        /***/
        public inputtexta1_lab: inputtexta1_lab = new inputtexta1_lab();
        /***/
        public inputtexta_lab: inputtexta_lab = new inputtexta_lab();
    }
    export class searchbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputtexta1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtexta_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inpbbg2 {
        public transform: m4m.framework.transform2D;
        public inpb_inp: inpb_inp = new inpb_inp();
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
    export class text4_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text1_lab {
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