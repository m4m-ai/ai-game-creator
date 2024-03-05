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
import { PanelBodyView } from "PanelBodyView";


export namespace Panel {
    export class Panel extends newUiBase {
        public static Instance: Panel;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件


        }
        //按钮事件

        //文字修改方法

        public uiName:string="Panel";

        public bg_raw: bg_raw = new bg_raw();
        public panelbg_img: panelbg_img = new panelbg_img();
        public body2: PanelBodyView;
    }
    export class bg_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class panelbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public body: PanelBodyView;
        public title_img: title_img = new title_img();
    }
    export class title_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }

}