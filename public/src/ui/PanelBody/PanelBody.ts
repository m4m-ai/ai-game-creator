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


export namespace PanelBody {
    export class PanelBody extends newUiBase {
        public static Instance: PanelBody;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.lbtnbg_img.lbtn_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.lbtn_btn_event, this);


        }
        //按钮事件
        private lbtn_btn_event(){if(this.lbtn_btn_btnEvent)this.lbtn_btn_btnEvent();};
        /**this.lbtnbg_img.lbtn_btn.button 的按钮事件*/
        public lbtn_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 开始游戏修改label文字方法*/
        public ltext1_lab_text(text: string){this.lbtnbg_img.ltext1_lab.label.text=text;}

        public uiName:string="PanelBody";

        public bg_raw: bg_raw = new bg_raw();
        public lbtnbg_img: lbtnbg_img = new lbtnbg_img();
        public test_aabb: test_aabb = new test_aabb();
    }
    export class bg_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class lbtnbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public lbtn_btn: lbtn_btn = new lbtn_btn();
        /**开始游戏*/
        public ltext1_lab: ltext1_lab = new ltext1_lab();
    }
    export class lbtn_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public lbtn1_img: lbtn1_img = new lbtn1_img();
    }
    export class lbtn1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class ltext1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class test_aabb {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }

}