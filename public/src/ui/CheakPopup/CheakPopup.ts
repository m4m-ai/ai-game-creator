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


export namespace CheakPopup {
    export class CheakPopup extends newUiBase {
        public static Instance: CheakPopup;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.aibg.boxc_img.btncbg1.btnc2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.btnc2_btn_event, this);
            this.aibg.boxc_img.btncbg1.btnc3_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.btnc3_btn_event, this);
            this.aibg.boxc_img.btncbg1.btnc1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.btnc1_btn_event, this);
            this.aibg.boxc_img.tabcbg.tabc1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.tabc1_btn_event, this);
            this.aibg.boxc_img.textnotselectedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.textnotselectedbg_btn_event, this);
            this.aibg.boxb_img.btnb2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.btnb2_btn_event, this);
            this.aibg.boxb_img.listbgb1_img.pickb_img.scale_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.scale_btn_event, this);
            this.aibg.boxa_img.btna4_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.btna4_btn_event, this);
            this.aibg.boxa_img.listbg3.listbga2.listbga.barbga_img.barbtna_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.barbtna_btn_event, this);


        }
        //按钮事件
        private btnc2_btn_event(){if(this.btnc2_btn_btnEvent)this.btnc2_btn_btnEvent();};
        /** 的按钮事件*/
        public btnc2_btn_btnEvent: ()=>any;
        private btnc3_btn_event(){if(this.btnc3_btn_btnEvent)this.btnc3_btn_btnEvent();};
        /** 的按钮事件*/
        public btnc3_btn_btnEvent: ()=>any;
        private btnc1_btn_event(){if(this.btnc1_btn_btnEvent)this.btnc1_btn_btnEvent();};
        /** 的按钮事件*/
        public btnc1_btn_btnEvent: ()=>any;
        private tabc1_btn_event(){if(this.tabc1_btn_btnEvent)this.tabc1_btn_btnEvent();};
        /**this.aibg.boxc_img.tabcbg.tabc1_btn.button 的按钮事件*/
        public tabc1_btn_btnEvent: ()=>any;
        private textnotselectedbg_btn_event(){if(this.textnotselectedbg_btn_btnEvent)this.textnotselectedbg_btn_btnEvent();};
        /**this.aibg.boxc_img.textnotselectedbg_btn.button 的按钮事件*/
        public textnotselectedbg_btn_btnEvent: ()=>any;
        private btnb2_btn_event(){if(this.btnb2_btn_btnEvent)this.btnb2_btn_btnEvent();};
        /** 的按钮事件*/
        public btnb2_btn_btnEvent: ()=>any;
        private scale_btn_event(){if(this.scale_btn_btnEvent)this.scale_btn_btnEvent();};
        /**this.aibg.boxb_img.listbgb1_img.pickb_img.scale_btn.button 的按钮事件*/
        public scale_btn_btnEvent: ()=>any;
        private btna4_btn_event(){if(this.btna4_btn_btnEvent)this.btna4_btn_btnEvent();};
        /**this.aibg.boxa_img.btna4_btn.button 的按钮事件*/
        public btna4_btn_btnEvent: ()=>any;
        private barbtna_btn_event(){if(this.barbtna_btn_btnEvent)this.barbtna_btn_btnEvent();};
        /**this.aibg.boxa_img.listbg3.listbga2.listbga.barbga_img.barbtna_btn.button 的按钮事件*/
        public barbtna_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public textd1_lab_text(text: string){this.boxd_img.textd1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public btnlabc2_lab_text(text: string){this.aibg.boxc_img.btncbg1.btnc2_btn.btnlabc2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public btnlabc3_lab_text(text: string){this.aibg.boxc_img.btncbg1.btnc3_btn.btnlabc3_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public btnlabc1_lab_text(text: string){this.aibg.boxc_img.btncbg1.btnc1_btn.btnlabc1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public tablabc1_lab_text(text: string){this.aibg.boxc_img.tabcbg.tabc1_btn.tablabc1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public tablabc2_lab_text(text: string){this.aibg.boxc_img.tabcbg.tabc2_img.tablabc2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public textc2_lab_text(text: string){this.aibg.boxc_img.textc2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public textc1_lab_text(text: string){this.aibg.boxc_img.textc1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public textnotselected_lab_text(text: string){this.aibg.boxc_img.textnotselectedbg_btn.textnotselected_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public btnlabb2_lab_text(text: string){this.aibg.boxb_img.btnb2_btn.btnlabb2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public btnlabb1_lab_text(text: string){this.aibg.boxb_img.listbgb1_img.pickb_img.pickb1_img.btnb1_img.btnlabb1_lab.label.text=text;}
        /**修改label 拷贝修改label文字方法*/
        public textb1_lab_text(text: string){this.aibg.boxb_img.textb1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public btnlaba3_lab_text(text: string){this.aibg.boxa_img.btna4_btn.btnlaba3_lab.label.text=text;}
        /**修改label 音乐1修改label文字方法*/
        public texta2_lab_text(text: string){this.aibg.boxa_img.listbg3.listbga2.listbga.texta2_lab.label.text=text;}
        /**修改label 总时间修改label文字方法*/
        public texta3_lab_text(text: string){this.aibg.boxa_img.listbg3.listbga2.listbga.texta3_lab.label.text=text;}
        /**修改label 播放时间修改label文字方法*/
        public texta4_lab_text(text: string){this.aibg.boxa_img.listbg3.listbga2.listbga.texta4_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public btnlaba1_lab_text(text: string){this.aibg.boxa_img.listbg3.listbga2.listbga.btna1_img.btnlaba1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public texta1_lab_text(text: string){this.aibg.boxa_img.texta1_lab.label.text=text;}

        public uiName:string="CheakPopup";

        public bg: bg = new bg();
        /***/
        public boxd_img: boxd_img = new boxd_img();
        public aibg: aibg = new aibg();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class boxd_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public textd1_lab: textd1_lab = new textd1_lab();
        public txboxbgb: txboxbgb = new txboxbgb();
    }
    export class textd1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class txboxbgb {
        public transform: m4m.framework.transform2D;
        public txboxb1_raw: txboxb1_raw = new txboxb1_raw();
        public txboxa3_img: txboxa3_img = new txboxa3_img();
    }
    export class txboxb1_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class txboxa3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class aibg {
        public transform: m4m.framework.transform2D;
        /***/
        public boxc_img: boxc_img = new boxc_img();
        /***/
        public boxb_img: boxb_img = new boxb_img();
        /***/
        public boxa_img: boxa_img = new boxa_img();
        public txboxbga: txboxbga = new txboxbga();
    }
    export class boxc_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public btncbg1: btncbg1 = new btncbg1();
        public tabcbg: tabcbg = new tabcbg();
        /***/
        public textc2_lab: textc2_lab = new textc2_lab();
        /***/
        public textc1_lab: textc1_lab = new textc1_lab();
        public textnotselectedbg_btn: textnotselectedbg_btn = new textnotselectedbg_btn();
    }
    export class btncbg1 {
        public transform: m4m.framework.transform2D;
        /***/
        public btnc2_btn: btnc2_btn = new btnc2_btn();
        /***/
        public btnc3_btn: btnc3_btn = new btnc3_btn();
        /***/
        public btnc1_btn: btnc1_btn = new btnc1_btn();
    }
    export class btnc2_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public btnlabc2_lab: btnlabc2_lab = new btnlabc2_lab();
    }
    export class btnlabc2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class btnc3_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public btnlabc3_lab: btnlabc3_lab = new btnlabc3_lab();
    }
    export class btnlabc3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class btnc1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public btnlabc1_lab: btnlabc1_lab = new btnlabc1_lab();
    }
    export class btnlabc1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class tabcbg {
        public transform: m4m.framework.transform2D;
        public tabc1_btn: tabc1_btn = new tabc1_btn();
        public tabc2_img: tabc2_img = new tabc2_img();
    }
    export class tabc1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public markc_img: markc_img = new markc_img();
        /***/
        public tablabc1_lab: tablabc1_lab = new tablabc1_lab();
    }
    export class markc_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class tablabc1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class tabc2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public markc1_img: markc1_img = new markc1_img();
        /***/
        public tablabc2_lab: tablabc2_lab = new tablabc2_lab();
    }
    export class markc1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class tablabc2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class textc2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class textc1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class textnotselectedbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public textselectionbg1_img: textselectionbg1_img = new textselectionbg1_img();
        /***/
        public textnotselected_lab: textnotselected_lab = new textnotselected_lab();
    }
    export class textselectionbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class textnotselected_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class boxb_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public btnb2_btn: btnb2_btn = new btnb2_btn();
        /***/
        public listbgb1_img: listbgb1_img = new listbgb1_img();
        /**拷贝*/
        public textb1_lab: textb1_lab = new textb1_lab();
    }
    export class btnb2_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public btnlabb2_lab: btnlabb2_lab = new btnlabb2_lab();
    }
    export class btnlabb2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class listbgb1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public pickb_img: pickb_img = new pickb_img();
    }
    export class pickb_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public picb_raw: picb_raw = new picb_raw();
        /***/
        public pickb1_img: pickb1_img = new pickb1_img();
        public scale_btn: scale_btn = new scale_btn();
        public buffer_img: buffer_img = new buffer_img();
    }
    export class picb_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class pickb1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public btnb1_img: btnb1_img = new btnb1_img();
    }
    export class btnb1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public btnlabb1_lab: btnlabb1_lab = new btnlabb1_lab();
    }
    export class btnlabb1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class scale_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class buffer_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class textb1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class boxa_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public btna4_btn: btna4_btn = new btna4_btn();
        public listbg3: listbg3 = new listbg3();
        /***/
        public texta1_lab: texta1_lab = new texta1_lab();
    }
    export class btna4_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public btnlaba3_lab: btnlaba3_lab = new btnlaba3_lab();
    }
    export class btnlaba3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class listbg3 {
        public transform: m4m.framework.transform2D;
        public listbga2: listbga2 = new listbga2();
    }
    export class listbga2 {
        public transform: m4m.framework.transform2D;
        public listbga: listbga = new listbga();
    }
    export class listbga {
        public transform: m4m.framework.transform2D;
        public btna3_img: btna3_img = new btna3_img();
        public btna2_img: btna2_img = new btna2_img();
        /**音乐1*/
        public texta2_lab: texta2_lab = new texta2_lab();
        /**总时间*/
        public texta3_lab: texta3_lab = new texta3_lab();
        /**播放时间*/
        public texta4_lab: texta4_lab = new texta4_lab();
        public barbga_img: barbga_img = new barbga_img();
        public btna1_img: btna1_img = new btna1_img();
    }
    export class btna3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class btna2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class texta2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class texta3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class texta4_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class barbga_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public bara1_bar: bara1_bar = new bara1_bar();
        public barbtna_btn: barbtna_btn = new barbtna_btn();
    }
    export class bara1_bar {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public progressbar: m4m.framework.progressbar;
        public bara1cut: bara1cut = new bara1cut();
    }
    export class bara1cut {
        public transform: m4m.framework.transform2D;
        public bara2_img: bara2_img = new bara2_img();
    }
    export class bara2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class barbtna_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class btna1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public btnlaba1_lab: btnlaba1_lab = new btnlaba1_lab();
    }
    export class btnlaba1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class texta1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class txboxbga {
        public transform: m4m.framework.transform2D;
        public txboxa1_raw: txboxa1_raw = new txboxa1_raw();
        public txboxa_img: txboxa_img = new txboxa_img();
    }
    export class txboxa1_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class txboxa_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }

}