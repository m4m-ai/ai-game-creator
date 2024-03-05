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


export namespace Manipulatebubbles {
    export class Manipulatebubbles extends newUiBase {
        public static Instance: Manipulatebubbles;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bubble_img.delete_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.delete_btn_event, this);
            this.bubble_img.revise_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.revise_btn_event, this);


        }
        //按钮事件
        private delete_btn_event(){if(this.delete_btn_btnEvent)this.delete_btn_btnEvent();};
        /**this.bubble_img.delete_btn.button 的按钮事件*/
        public delete_btn_btnEvent: ()=>any;
        private revise_btn_event(){if(this.revise_btn_btnEvent)this.revise_btn_btnEvent();};
        /**this.bubble_img.revise_btn.button 的按钮事件*/
        public revise_btn_btnEvent: ()=>any;

        //文字修改方法

        public uiName:string="Manipulatebubbles";

        public bg: bg = new bg();
        public bubble_img: bubble_img = new bubble_img();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bubble_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public delete_btn: delete_btn = new delete_btn();
        public revise_btn: revise_btn = new revise_btn();
    }
    export class delete_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class revise_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }

}