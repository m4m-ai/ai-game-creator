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


export namespace Gamedesc {
    export class Gamedesc extends newUiBase {
        public static Instance: Gamedesc;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.generalbg_img.textboxbg.searchbg2.animation_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.animation_btn_event, this);
            this.generalbg_img.button.button2.notoptionalbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.notoptionalbg_btn_event, this);
            this.generalbg_img.button.button2.uncheckedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.uncheckedbg_btn_event, this);
            this.generalbg_img.button.selecbg2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.selecbg2_btn_event, this);


        }
        //按钮事件
        private animation_btn_event(){if(this.animation_btn_btnEvent)this.animation_btn_btnEvent();};
        /**this.generalbg_img.textboxbg.searchbg2.animation_btn.button 的按钮事件*/
        public animation_btn_btnEvent: ()=>any;
        private notoptionalbg_btn_event(){if(this.notoptionalbg_btn_btnEvent)this.notoptionalbg_btn_btnEvent();};
        /**this.generalbg_img.button.button2.notoptionalbg_btn.button 的按钮事件*/
        public notoptionalbg_btn_btnEvent: ()=>any;
        private uncheckedbg_btn_event(){if(this.uncheckedbg_btn_btnEvent)this.uncheckedbg_btn_btnEvent();};
        /**this.generalbg_img.button.button2.uncheckedbg_btn.button 的按钮事件*/
        public uncheckedbg_btn_btnEvent: ()=>any;
        private selecbg2_btn_event(){if(this.selecbg2_btn_btnEvent)this.selecbg2_btn_btnEvent();};
        /**this.generalbg_img.button.selecbg2_btn.button 的按钮事件*/
        public selecbg2_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public inputdl_lab_text(text: string){this.generalbg_img.textboxbg.input_inp.inputdl_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtext_lab_text(text: string){this.generalbg_img.textboxbg.input_inp.inputtext_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public path_lab_text(text: string){this.generalbg_img.textboxbg.searchbg2.path_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public text_lab_text(text: string){this.generalbg_img.textboxbg.textbg.text_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public text1_lab_text(text: string){this.generalbg_img.textboxbg.textbg.text1_lab.label.text=text;}
        /**修改label 文本修改label文字方法*/
        public description_lab_text(text: string){this.generalbg_img.textboxbg.description_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public notoptional_lab_text(text: string){this.generalbg_img.button.button2.notoptionalbg_btn.notoptional_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public unchecked_lab_text(text: string){this.generalbg_img.button.button2.uncheckedbg_btn.unchecked_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public selec2_lab_text(text: string){this.generalbg_img.button.selecbg2_btn.selec2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title_lab_text(text: string){this.generalbg_img.title_lab.label.text=text;}

        public uiName:string="Gamedesc";

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
        public textboxbg: textboxbg = new textboxbg();
        public button: button = new button();
        /***/
        public title_lab: title_lab = new title_lab();
    }
    export class textboxbg {
        public transform: m4m.framework.transform2D;
        public input_inp: input_inp = new input_inp();
        public searchbg2: searchbg2 = new searchbg2();
        public textbg: textbg = new textbg();
        /**文本*/
        public description_lab: description_lab = new description_lab();
    }
    export class input_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public inputbg_img: inputbg_img = new inputbg_img();
        /***/
        public inputdl_lab: inputdl_lab = new inputdl_lab();
        /***/
        public inputtext_lab: inputtext_lab = new inputtext_lab();
    }
    export class inputbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputdl_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtext_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class searchbg2 {
        public transform: m4m.framework.transform2D;
        public searchbg1_img: searchbg1_img = new searchbg1_img();
        /***/
        public path_lab: path_lab = new path_lab();
        public animation_btn: animation_btn = new animation_btn();
    }
    export class searchbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class path_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class animation_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class textbg {
        public transform: m4m.framework.transform2D;
        /***/
        public text_lab: text_lab = new text_lab();
        /***/
        public text1_lab: text1_lab = new text1_lab();
    }
    export class text_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class description_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class button {
        public transform: m4m.framework.transform2D;
        public button2: button2 = new button2();
        public selecbg2_btn: selecbg2_btn = new selecbg2_btn();
    }
    export class button2 {
        public transform: m4m.framework.transform2D;
        public notoptionalbg_btn: notoptionalbg_btn = new notoptionalbg_btn();
        public uncheckedbg_btn: uncheckedbg_btn = new uncheckedbg_btn();
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
    export class title_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}