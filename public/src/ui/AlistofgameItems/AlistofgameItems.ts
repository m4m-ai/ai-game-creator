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


export namespace AlistofgameItems {
    export class AlistofgameItems extends newUiBase {
        public static Instance: AlistofgameItems;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1.windoweditingbg.view_img.editbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.editbg_btn_event, this);
            this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1.windoweditingbg.bottom.definition_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.definition_btn_event, this);
            this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1_img.new_lab.new1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.new1_btn_event, this);


        }
        //按钮事件
        private editbg_btn_event(){if(this.editbg_btn_btnEvent)this.editbg_btn_btnEvent();};
        /**this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1.windoweditingbg.view_img.editbg_btn.button 的按钮事件*/
        public editbg_btn_btnEvent: ()=>any;
        private definition_btn_event(){if(this.definition_btn_btnEvent)this.definition_btn_btnEvent();};
        /**this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1.windoweditingbg.bottom.definition_btn.button 的按钮事件*/
        public definition_btn_btnEvent: ()=>any;
        private new1_btn_event(){if(this.new1_btn_btnEvent)this.new1_btn_btnEvent();};
        /**this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1_img.new_lab.new1_btn.button 的按钮事件*/
        public new1_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public edit_lab_text(text: string){this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1.windoweditingbg.view_img.edit_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public name_lab_text(text: string){this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1.windoweditingbg.bottom.name_lab.label.text=text;}
        /**修改label 拷贝修改label文字方法*/
        public directory_lab_text(text: string){this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1.windoweditingbg.bottom.directory_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public time_lab_text(text: string){this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1.windoweditingbg.bottom.time_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public new_lab_text(text: string){this.viewport.viewport1_scr.viewport1content.newprojectbg_img.newprojectbg1_img.new_lab.label.text=text;}
        /**修改label  this.title_lab.label 修改label文字方法*/
        public title_lab_text(text: string){this.title_lab.label.text=text;}

        public uiName:string="AlistofgameItems";

        public bg: bg = new bg();
        public viewport: viewport = new viewport();
        /***/
        public viewpobg_img: viewpobg_img = new viewpobg_img();
        public title_lab: title_lab = new title_lab();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class viewport {
        public transform: m4m.framework.transform2D;
        /**滑动区域*/
        public viewport1_scr: viewport1_scr = new viewport1_scr();
    }
    export class viewport1_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public viewport1content: viewport1content = new viewport1content();
    }
    export class viewport1content {
        public transform: m4m.framework.transform2D;
        /**背景*/
        public newprojectbg_img: newprojectbg_img = new newprojectbg_img();
    }
    export class newprojectbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public newprojectbg1: newprojectbg1 = new newprojectbg1();
        public newprojectbg1_img: newprojectbg1_img = new newprojectbg1_img();
    }
    export class newprojectbg1 {
        public transform: m4m.framework.transform2D;
        public windoweditingbg: windoweditingbg = new windoweditingbg();
    }
    export class windoweditingbg {
        public transform: m4m.framework.transform2D;
        public view_img: view_img = new view_img();
        public bottom: bottom = new bottom();
    }
    export class view_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public view1_raw: view1_raw = new view1_raw();
        public view6_img: view6_img = new view6_img();
        public masking_img: masking_img = new masking_img();
        public editbg_btn: editbg_btn = new editbg_btn();
        /***/
        public edit_lab: edit_lab = new edit_lab();
    }
    export class view1_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class view6_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class masking_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class editbg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class edit_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class bottom {
        public transform: m4m.framework.transform2D;
        public thumbnail_raw: thumbnail_raw = new thumbnail_raw();
        public thumbnail1_img: thumbnail1_img = new thumbnail1_img();
        /***/
        public name_lab: name_lab = new name_lab();
        /**拷贝*/
        public directory_lab: directory_lab = new directory_lab();
        /***/
        public time_lab: time_lab = new time_lab();
        public definition_btn: definition_btn = new definition_btn();
    }
    export class thumbnail_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class thumbnail1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class name_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class directory_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class time_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class definition_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class newprojectbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public new_lab: new_lab = new new_lab();
    }
    export class new_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
        public new1_btn: new1_btn = new new1_btn();
    }
    export class new1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class viewpobg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class title_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}