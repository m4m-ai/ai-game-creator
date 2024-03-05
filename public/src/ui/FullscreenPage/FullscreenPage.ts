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


export namespace FullscreenPage {
    export class FullscreenPage extends newUiBase {
        public static Instance: FullscreenPage;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.aibg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.aibg_btn_event, this);


        }
        //按钮事件
        private aibg_btn_event(){if(this.aibg_btn_btnEvent)this.aibg_btn_btnEvent();};
        /**this.aibg_btn.button 的按钮事件*/
        public aibg_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public title_lab_text(text: string){this.titlebg1_img.titlebg.title_lab.label.text=text;}

        public uiName:string="FullscreenPage";

        /***/
        public bg_img: bg_img = new bg_img();
        /**标题背景*/
        public titlebg1_img: titlebg1_img = new titlebg1_img();
        public aibg_btn: aibg_btn = new aibg_btn();
    }
    export class bg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class titlebg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public titlebg: titlebg = new titlebg();
    }
    export class titlebg {
        public transform: m4m.framework.transform2D;
        /***/
        public title_lab: title_lab = new title_lab();
        public loog_img: loog_img = new loog_img();
    }
    export class title_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class loog_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class aibg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }

}