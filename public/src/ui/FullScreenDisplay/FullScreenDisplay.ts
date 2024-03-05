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


export namespace FullScreenDisplay {
    export class FullScreenDisplay extends newUiBase {
        public static Instance: FullScreenDisplay;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg1_img.back_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.back_btn_event, this);


        }
        //按钮事件
        private back_btn_event(){if(this.back_btn_btnEvent)this.back_btn_btnEvent();};
        /**this.bg1_img.back_btn.button 的按钮事件*/
        public back_btn_btnEvent: ()=>any;

        //文字修改方法

        public uiName:string="FullScreenDisplay";

        /***/
        public bg1_img: bg1_img = new bg1_img();
    }
    export class bg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public bg_raw: bg_raw = new bg_raw();
        /***/
        public imageloadingbg_img: imageloadingbg_img = new imageloadingbg_img();
        public imageloading_raw: imageloading_raw = new imageloading_raw();
        public back_btn: back_btn = new back_btn();
    }
    export class bg_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class imageloadingbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class imageloading_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class back_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }

}