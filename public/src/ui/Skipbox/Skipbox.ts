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


export namespace Skipbox {
    export class Skipbox extends newUiBase {
        public static Instance: Skipbox;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件


        }
        //按钮事件

        //文字修改方法
        /**修改label 修改label文字方法*/
        public skipbox_lab_text(text: string){this.skipboxbg_img.skipbox_lab.label.text=text;}

        public uiName:string="Skipbox";

        public bg: bg = new bg();
        public skipboxbg_img: skipboxbg_img = new skipboxbg_img();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class skipboxbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public skipbox_lab: skipbox_lab = new skipbox_lab();
    }
    export class skipbox_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}