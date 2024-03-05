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


export namespace TutorialBackground {
    export class TutorialBackground extends newUiBase {
        public static Instance: TutorialBackground;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg1.textbox_img.savebg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.savebg_btn_event, this);
            this.bg1.titlebg_img.poreviousstepbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.poreviousstepbg_btn_event, this);
            this.bg1.titlebg_img.nextbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.nextbg_btn_event, this);


        }
        //按钮事件
        private savebg_btn_event(){if(this.savebg_btn_btnEvent)this.savebg_btn_btnEvent();};
        /**this.bg1.textbox_img.savebg_btn.button 的按钮事件*/
        public savebg_btn_btnEvent: ()=>any;
        private poreviousstepbg_btn_event(){if(this.poreviousstepbg_btn_btnEvent)this.poreviousstepbg_btn_btnEvent();};
        /**this.bg1.titlebg_img.poreviousstepbg_btn.button 的按钮事件*/
        public poreviousstepbg_btn_btnEvent: ()=>any;
        private nextbg_btn_event(){if(this.nextbg_btn_btnEvent)this.nextbg_btn_btnEvent();};
        /**this.bg1.titlebg_img.nextbg_btn.button 的按钮事件*/
        public nextbg_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public save_lab_text(text: string){this.bg1.textbox_img.savebg_btn.save_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public poreviousstep_lab_text(text: string){this.bg1.titlebg_img.poreviousstepbg_btn.poreviousstep_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public next_lab_text(text: string){this.bg1.titlebg_img.nextbg_btn.next_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title2_lab_text(text: string){this.bg1.titlebg_img.title2_lab.label.text=text;}

        public uiName:string="TutorialBackground";

        public bg: bg = new bg();
        public bg1: bg1 = new bg1();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg1 {
        public transform: m4m.framework.transform2D;
        public textbox_img: textbox_img = new textbox_img();
        public titlebg_img: titlebg_img = new titlebg_img();
    }
    export class textbox_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public savebg_btn: savebg_btn = new savebg_btn();
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
    export class titlebg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public poreviousstepbg_btn: poreviousstepbg_btn = new poreviousstepbg_btn();
        public nextbg_btn: nextbg_btn = new nextbg_btn();
        public titlebg1: titlebg1 = new titlebg1();
        /***/
        public title2_lab: title2_lab = new title2_lab();
        public title3_img: title3_img = new title3_img();
        public chaptera_img: chaptera_img = new chaptera_img();
    }
    export class poreviousstepbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public poreviousstep_lab: poreviousstep_lab = new poreviousstep_lab();
    }
    export class poreviousstep_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class nextbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public next_lab: next_lab = new next_lab();
    }
    export class next_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class titlebg1 {
        public transform: m4m.framework.transform2D;
    }
    export class title2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class title3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class chaptera_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }

}