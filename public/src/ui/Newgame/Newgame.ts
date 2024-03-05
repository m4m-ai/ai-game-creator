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


export namespace Newgame {
    export class Newgame extends newUiBase {
        public static Instance: Newgame;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.generalbg_img.button.button2.selectedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.selectedbg_btn_event, this);
            this.generalbg_img.button.button2.notoptionalbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.notoptionalbg_btn_event, this);
            this.generalbg_img.button.button2.uncheckedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.uncheckedbg_btn_event, this);
            this.generalbg_img.button.button1.selecbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.selecbg_btn_event, this);
            this.generalbg_img.button.button1.selecg1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.selecg1_btn_event, this);
            this.generalbg_img.button.button1.selecbg2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.selecbg2_btn_event, this);
            this.generalbg_img.button.button1.selecbg4_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.selecbg4_btn_event, this);


        }
        //按钮事件
        private selectedbg_btn_event(){if(this.selectedbg_btn_btnEvent)this.selectedbg_btn_btnEvent();};
        /**this.generalbg_img.button.button2.selectedbg_btn.button 的按钮事件*/
        public selectedbg_btn_btnEvent: ()=>any;
        private notoptionalbg_btn_event(){if(this.notoptionalbg_btn_btnEvent)this.notoptionalbg_btn_btnEvent();};
        /**this.generalbg_img.button.button2.notoptionalbg_btn.button 的按钮事件*/
        public notoptionalbg_btn_btnEvent: ()=>any;
        private uncheckedbg_btn_event(){if(this.uncheckedbg_btn_btnEvent)this.uncheckedbg_btn_btnEvent();};
        /**this.generalbg_img.button.button2.uncheckedbg_btn.button 的按钮事件*/
        public uncheckedbg_btn_btnEvent: ()=>any;
        private selecbg_btn_event(){if(this.selecbg_btn_btnEvent)this.selecbg_btn_btnEvent();};
        /**this.generalbg_img.button.button1.selecbg_btn.button 的按钮事件*/
        public selecbg_btn_btnEvent: ()=>any;
        private selecg1_btn_event(){if(this.selecg1_btn_btnEvent)this.selecg1_btn_btnEvent();};
        /**this.generalbg_img.button.button1.selecg1_btn.button 的按钮事件*/
        public selecg1_btn_btnEvent: ()=>any;
        private selecbg2_btn_event(){if(this.selecbg2_btn_btnEvent)this.selecbg2_btn_btnEvent();};
        /**this.generalbg_img.button.button1.selecbg2_btn.button 的按钮事件*/
        public selecbg2_btn_btnEvent: ()=>any;
        private selecbg4_btn_event(){if(this.selecbg4_btn_btnEvent)this.selecbg4_btn_btnEvent();};
        /**this.generalbg_img.button.button1.selecbg4_btn.button 的按钮事件*/
        public selecbg4_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public inputtext_lab_text(text: string){this.generalbg_img.inputtext_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public selected_lab_text(text: string){this.generalbg_img.button.button2.selectedbg_btn.selected_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public notoptional_lab_text(text: string){this.generalbg_img.button.button2.notoptionalbg_btn.notoptional_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public unchecked_lab_text(text: string){this.generalbg_img.button.button2.uncheckedbg_btn.unchecked_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public selec_lab_text(text: string){this.generalbg_img.button.button1.selecbg_btn.selec_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public selec1_lab_text(text: string){this.generalbg_img.button.button1.selecg1_btn.selec1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public selec2_lab_text(text: string){this.generalbg_img.button.button1.selecbg2_btn.selec2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public selec4_lab_text(text: string){this.generalbg_img.button.button1.selecbg4_btn.selec4_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title_lab_text(text: string){this.generalbg_img.title_lab.label.text=text;}

        public uiName:string="Newgame";

        public bg: bg = new bg();
        public bg1: bg1 = new bg1();
        public generalbg_img: generalbg_img = new generalbg_img();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg1 {
        public transform: m4m.framework.transform2D;
    }
    export class generalbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public inputtext_lab: inputtext_lab = new inputtext_lab();
        public button: button = new button();
        /***/
        public title_lab: title_lab = new title_lab();
    }
    export class inputtext_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class button {
        public transform: m4m.framework.transform2D;
        public button2: button2 = new button2();
        public button1: button1 = new button1();
    }
    export class button2 {
        public transform: m4m.framework.transform2D;
        public selectedbg_btn: selectedbg_btn = new selectedbg_btn();
        public notoptionalbg_btn: notoptionalbg_btn = new notoptionalbg_btn();
        public uncheckedbg_btn: uncheckedbg_btn = new uncheckedbg_btn();
    }
    export class selectedbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public selected_lab: selected_lab = new selected_lab();
    }
    export class selected_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class notoptionalbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public notoptional_lab: notoptional_lab = new notoptional_lab();
    }
    export class notoptional_lab {
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
    export class button1 {
        public transform: m4m.framework.transform2D;
        public selecbg_btn: selecbg_btn = new selecbg_btn();
        public selecg1_btn: selecg1_btn = new selecg1_btn();
        public selecbg2_btn: selecbg2_btn = new selecbg2_btn();
        public selecbg4_btn: selecbg4_btn = new selecbg4_btn();
    }
    export class selecbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public selec_lab: selec_lab = new selec_lab();
    }
    export class selec_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class selecg1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public selec1_lab: selec1_lab = new selec1_lab();
    }
    export class selec1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class selecbg2_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public selec2_lab: selec2_lab = new selec2_lab();
    }
    export class selec2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class selecbg4_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public selec4_lab: selec4_lab = new selec4_lab();
    }
    export class selec4_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class title_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}