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


export namespace StoragePath {
    export class StoragePath extends newUiBase {
        public static Instance: StoragePath;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.btnbg.selectedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.selectedbg_btn_event, this);
            this.btnbg.uncheckedbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.uncheckedbg_btn_event, this);
            this.crown.previousstep_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.previousstep_btn_event, this);


        }
        //按钮事件
        private selectedbg_btn_event(){if(this.selectedbg_btn_btnEvent)this.selectedbg_btn_btnEvent();};
        /**this.btnbg.selectedbg_btn.button 的按钮事件*/
        public selectedbg_btn_btnEvent: ()=>any;
        private uncheckedbg_btn_event(){if(this.uncheckedbg_btn_btnEvent)this.uncheckedbg_btn_btnEvent();};
        /**this.btnbg.uncheckedbg_btn.button 的按钮事件*/
        public uncheckedbg_btn_btnEvent: ()=>any;
        private previousstep_btn_event(){if(this.previousstep_btn_btnEvent)this.previousstep_btn_btnEvent();};
        /**this.crown.previousstep_btn.button 的按钮事件*/
        public previousstep_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public animation2_lab_text(text: string){this.picture3_img.animationbg.animationbg1_scr.animationbg1content.picturbg3.animation2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public selected_lab_text(text: string){this.btnbg.selectedbg_btn.selected_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public unchecked_lab_text(text: string){this.btnbg.uncheckedbg_btn.unchecked_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public search_lab_text(text: string){this.crown.searchbg_img.search_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public title_lab_text(text: string){this.title_lab.label.text=text;}

        public uiName:string="StoragePath";

        public bg: bg = new bg();
        public generalbg_img: generalbg_img = new generalbg_img();
        public picture3_img: picture3_img = new picture3_img();
        public btnbg: btnbg = new btnbg();
        public crown: crown = new crown();
        /***/
        public title_lab: title_lab = new title_lab();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class generalbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class picture3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public animationbg: animationbg = new animationbg();
    }
    export class animationbg {
        public transform: m4m.framework.transform2D;
        /**滑动区域*/
        public animationbg1_scr: animationbg1_scr = new animationbg1_scr();
    }
    export class animationbg1_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public animationbg1content: animationbg1content = new animationbg1content();
    }
    export class animationbg1content {
        public transform: m4m.framework.transform2D;
        public picturbg3: picturbg3 = new picturbg3();
    }
    export class picturbg3 {
        public transform: m4m.framework.transform2D;
        public animationbg2_img: animationbg2_img = new animationbg2_img();
        public picture1_raw: picture1_raw = new picture1_raw();
        /***/
        public animation2_lab: animation2_lab = new animation2_lab();
    }
    export class animationbg2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class picture1_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class animation2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class btnbg {
        public transform: m4m.framework.transform2D;
        public selectedbg_btn: selectedbg_btn = new selectedbg_btn();
        public uncheckedbg_btn: uncheckedbg_btn = new uncheckedbg_btn();
    }
    export class selectedbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public selected_lab: selected_lab = new selected_lab();
    }
    export class selected_lab {
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
    export class crown {
        public transform: m4m.framework.transform2D;
        public searchbg_img: searchbg_img = new searchbg_img();
        public previousstep_btn: previousstep_btn = new previousstep_btn();
    }
    export class searchbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public search_lab: search_lab = new search_lab();
    }
    export class search_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class previousstep_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public previousstep1_img: previousstep1_img = new previousstep1_img();
    }
    export class previousstep1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class title_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}