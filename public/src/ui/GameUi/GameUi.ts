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


export namespace GameUi {
    export class GameUi extends newUiBase {
        public static Instance: GameUi;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg.xxbtn_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.xxbtn_btn_event, this);


        }
        //按钮事件
        private xxbtn_btn_event(){if(this.xxbtn_btn_btnEvent)this.xxbtn_btn_btnEvent();};
        /**this.bg.xxbtn_btn.button 的按钮事件*/
        public xxbtn_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public btnlab_lab_text(text: string){this.bg.xxbtn_btn.btnlab_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public talklab1_lab_text(text: string){this.bg.talkbg_img.talklab1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public talklab_lab_text(text: string){this.bg.talkbg_img.talklab_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public buffer1_lab_text(text: string){this.bg3.bg1_img.buffer1_lab.label.text=text;}

        public uiName:string="GameUi";

        public bg2_raw: bg2_raw = new bg2_raw();
        public bg: bg = new bg();
        public bg1_raw: bg1_raw = new bg1_raw();
        public bg3: bg3 = new bg3();
    }
    export class bg2_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class bg {
        public transform: m4m.framework.transform2D;
        public lihui_raw: lihui_raw = new lihui_raw();
        public xxbtn_btn: xxbtn_btn = new xxbtn_btn();
        /***/
        public talkbg_img: talkbg_img = new talkbg_img();
    }
    export class lihui_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class xxbtn_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public btnlab_lab: btnlab_lab = new btnlab_lab();
    }
    export class btnlab_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class talkbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public talklab1_lab: talklab1_lab = new talklab1_lab();
        /***/
        public talklab_lab: talklab_lab = new talklab_lab();
    }
    export class talklab1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class talklab_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class bg1_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class bg3 {
        public transform: m4m.framework.transform2D;
        /***/
        public bg1_img: bg1_img = new bg1_img();
    }
    export class bg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public buffer_img: buffer_img = new buffer_img();
        /***/
        public buffer1_lab: buffer1_lab = new buffer1_lab();
    }
    export class buffer_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class buffer1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}