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


export namespace SpreadingPlate {
    export class SpreadingPlate extends newUiBase {
        public static Instance: SpreadingPlate;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.describbg.sho1_img.showr1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.showr1_btn_event, this);


        }
        //按钮事件
        private showr1_btn_event(){if(this.showr1_btn_btnEvent)this.showr1_btn_btnEvent();};
        /**this.describbg.sho1_img.showr1_btn.button 的按钮事件*/
        public showr1_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public describe_lab_text(text: string){this.describbg.describe_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title_lab_text(text: string){this.launch.titlebg_img.title_lab.label.text=text;}

        public uiName:string="SpreadingPlate";

        public textbox_img: textbox_img = new textbox_img();
        public describbg: describbg = new describbg();
        public launch: launch = new launch();
    }
    export class textbox_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class describbg {
        public transform: m4m.framework.transform2D;
        public sho1_img: sho1_img = new sho1_img();
        /***/
        public describe_lab: describe_lab = new describe_lab();
    }
    export class sho1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public shor_bar: shor_bar = new shor_bar();
        public showr1_btn: showr1_btn = new showr1_btn();
    }
    export class shor_bar {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public progressbar: m4m.framework.progressbar;
        public shorcut: shorcut = new shorcut();
    }
    export class shorcut {
        public transform: m4m.framework.transform2D;
        public shor1_img: shor1_img = new shor1_img();
    }
    export class shor1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class showr1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class describe_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class launch {
        public transform: m4m.framework.transform2D;
        public titlebg_img: titlebg_img = new titlebg_img();
    }
    export class titlebg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public title_lab: title_lab = new title_lab();
        public title3_img: title3_img = new title3_img();
        public title1_img: title1_img = new title1_img();
    }
    export class title_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class title3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class title1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }

}