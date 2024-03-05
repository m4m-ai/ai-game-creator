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


export namespace FileManagerPanel {
    export class FileManagerPanel extends newUiBase {
        public static Instance: FileManagerPanel;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.displayarea.crown.previousstep_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.previousstep_btn_event, this);
            this.displayarea.crown.addto_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.addto_btn_event, this);
            this.displayarea.crown.upload_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.upload_btn_event, this);
            this.displayarea.crownb.previousstepb_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.previousstepb_btn_event, this);


        }
        //按钮事件
        private previousstep_btn_event(){if(this.previousstep_btn_btnEvent)this.previousstep_btn_btnEvent();};
        /**this.displayarea.crown.previousstep_btn.button 的按钮事件*/
        public previousstep_btn_btnEvent: ()=>any;
        private addto_btn_event(){if(this.addto_btn_btnEvent)this.addto_btn_btnEvent();};
        /**this.displayarea.crown.addto_btn.button 的按钮事件*/
        public addto_btn_btnEvent: ()=>any;
        private upload_btn_event(){if(this.upload_btn_btnEvent)this.upload_btn_btnEvent();};
        /**this.displayarea.crown.upload_btn.button 的按钮事件*/
        public upload_btn_btnEvent: ()=>any;
        private previousstepb_btn_event(){if(this.previousstepb_btn_btnEvent)this.previousstepb_btn_btnEvent();};
        /**this.displayarea.crownb.previousstepb_btn.button 的按钮事件*/
        public previousstepb_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public animation2_lab_text(text: string){this.displayarea.textbg_img.textboxbg1.textbox_scr.textboxcontent.animationbg_img.picture2_img.animation2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public folder2_lab_text(text: string){this.displayarea.textbg_img.textboxbg1.textbox1_scr.textbox1content.folderbg_img.folder1.folder2_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public search_lab_text(text: string){this.displayarea.crown.searchbg_img.search_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public searchb_lab_text(text: string){this.displayarea.crownb.searchbgb_img.searchb_lab.label.text=text;}

        public uiName:string="FileManagerPanel";

        public bg: bg = new bg();
        public displayarea: displayarea = new displayarea();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class displayarea {
        public transform: m4m.framework.transform2D;
        public textbg_img: textbg_img = new textbg_img();
        public crown: crown = new crown();
        public crownb: crownb = new crownb();
    }
    export class textbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public textboxbg: textboxbg = new textboxbg();
        public textboxbg1: textboxbg1 = new textboxbg1();
    }
    export class textboxbg {
        public transform: m4m.framework.transform2D;
    }
    export class textboxbg1 {
        public transform: m4m.framework.transform2D;
        /**滑动区域*/
        public textbox_scr: textbox_scr = new textbox_scr();
        /**滑动区域*/
        public textbox1_scr: textbox1_scr = new textbox1_scr();
    }
    export class textbox_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public textboxcontent: textboxcontent = new textboxcontent();
    }
    export class textboxcontent {
        public transform: m4m.framework.transform2D;
        public animationbg_img: animationbg_img = new animationbg_img();
    }
    export class animationbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public animati1_img: animati1_img = new animati1_img();
        public picture2_img: picture2_img = new picture2_img();
    }
    export class animati1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class picture2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public pictur2_img: pictur2_img = new pictur2_img();
        /***/
        public animation2_lab: animation2_lab = new animation2_lab();
        public edit1_img: edit1_img = new edit1_img();
        public picture1_raw: picture1_raw = new picture1_raw();
    }
    export class pictur2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class animation2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class edit1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class picture1_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class textbox1_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public textbox1content: textbox1content = new textbox1content();
    }
    export class textbox1content {
        public transform: m4m.framework.transform2D;
        public folderbg_img: folderbg_img = new folderbg_img();
    }
    export class folderbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public foldrbg1_img: foldrbg1_img = new foldrbg1_img();
        public folder1: folder1 = new folder1();
    }
    export class foldrbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class folder1 {
        public transform: m4m.framework.transform2D;
        public picture_raw: picture_raw = new picture_raw();
        /***/
        public folder2_lab: folder2_lab = new folder2_lab();
        public editbg_img: editbg_img = new editbg_img();
    }
    export class picture_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class folder2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class editbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public edit_img: edit_img = new edit_img();
    }
    export class edit_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class crown {
        public transform: m4m.framework.transform2D;
        public searchbg_img: searchbg_img = new searchbg_img();
        public previousstep_btn: previousstep_btn = new previousstep_btn();
        public addto_btn: addto_btn = new addto_btn();
        public upload_btn: upload_btn = new upload_btn();
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
    export class addto_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public addto1_img: addto1_img = new addto1_img();
    }
    export class addto1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class upload_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public upload1_img: upload1_img = new upload1_img();
    }
    export class upload1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class crownb {
        public transform: m4m.framework.transform2D;
        public searchbgb_img: searchbgb_img = new searchbgb_img();
        public previousstepb_btn: previousstepb_btn = new previousstepb_btn();
    }
    export class searchbgb_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public searchb_lab: searchb_lab = new searchb_lab();
    }
    export class searchb_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class previousstepb_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        public previousstepb1_img: previousstepb1_img = new previousstepb1_img();
    }
    export class previousstepb1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }

}