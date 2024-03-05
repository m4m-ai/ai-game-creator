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


export namespace Start {
    export class Start extends newUiBase {
        public static Instance: Start;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.textbg.buttonbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.buttonbg_btn_event, this);


        }
        //按钮事件
        private buttonbg_btn_event(){if(this.buttonbg_btn_btnEvent)this.buttonbg_btn_btnEvent();};
        /**this.textbg.buttonbg_btn.button 的按钮事件*/
        public buttonbg_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public text1_lab_text(text: string){this.textbg.textbg1_img.text1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public button_lab_text(text: string){this.textbg.buttonbg_btn.button_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public text_lab_text(text: string){this.textbg.text_lab.label.text=text;}

        public uiName:string="Start";

        public bg: bg = new bg();
        /***/
        public bg1_img: bg1_img = new bg1_img();
        public textbg: textbg = new textbg();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class textbg {
        public transform: m4m.framework.transform2D;
        /***/
        public textbg1_img: textbg1_img = new textbg1_img();
        public buttonbg_btn: buttonbg_btn = new buttonbg_btn();
        /***/
        public text_lab: text_lab = new text_lab();
    }
    export class textbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public text1_lab: text1_lab = new text1_lab();
    }
    export class text1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class buttonbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public button_lab: button_lab = new button_lab();
    }
    export class button_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}