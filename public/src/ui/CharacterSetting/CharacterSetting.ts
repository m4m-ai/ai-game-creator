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


export namespace CharacterSetting {
    export class CharacterSetting extends newUiBase {
        public static Instance: CharacterSetting;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg3.slidingbg.sliding_scr.slidingcontent.desbg1.desbg_img.editbg.edit1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.edit1_btn_event, this);
            this.bg3.slidingbg.sliding_scr.slidingcontent.desbg1.image1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.image1_btn_event, this);
            this.bg3.playbg.playerbg1.barbtn_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.barbtn_btn_event, this);
            this.bg3.crown.previousstep_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.previousstep_btn_event, this);


        }
        //按钮事件
        private edit1_btn_event(){if(this.edit1_btn_btnEvent)this.edit1_btn_btnEvent();};
        /**this.bg3.slidingbg.sliding_scr.slidingcontent.desbg1.desbg_img.editbg.edit1_btn.button 的按钮事件*/
        public edit1_btn_btnEvent: ()=>any;
        private image1_btn_event(){if(this.image1_btn_btnEvent)this.image1_btn_btnEvent();};
        /**this.bg3.slidingbg.sliding_scr.slidingcontent.desbg1.image1_btn.button 的按钮事件*/
        public image1_btn_btnEvent: ()=>any;
        private barbtn_btn_event(){if(this.barbtn_btn_btnEvent)this.barbtn_btn_btnEvent();};
        /**this.bg3.playbg.playerbg1.barbtn_btn.button 的按钮事件*/
        public barbtn_btn_btnEvent: ()=>any;
        private previousstep_btn_event(){if(this.previousstep_btn_btnEvent)this.previousstep_btn_btnEvent();};
        /**this.bg3.crown.previousstep_btn.button 的按钮事件*/
        public previousstep_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public time1_lab_text(text: string){this.bg3.slidingbg.sliding_scr.slidingcontent.desbg1.desbg_img.time1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public time_lab_text(text: string){this.bg3.playbg.time_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public search2_lab_text(text: string){this.bg3.crown.searchbg1_img.search2_lab.label.text=text;}

        public uiName:string="CharacterSetting";

        public bg: bg = new bg();
        public bg3: bg3 = new bg3();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg3 {
        public transform: m4m.framework.transform2D;
        public slidingbg: slidingbg = new slidingbg();
        public playbg: playbg = new playbg();
        public crown: crown = new crown();
    }
    export class slidingbg {
        public transform: m4m.framework.transform2D;
        /**滑动区域*/
        public sliding_scr: sliding_scr = new sliding_scr();
    }
    export class sliding_scr {
        public transform: m4m.framework.transform2D;
        public scrollRect: m4m.framework.scrollRect;
        public slidingcontent: slidingcontent = new slidingcontent();
    }
    export class slidingcontent {
        public transform: m4m.framework.transform2D;
        public desbg1: desbg1 = new desbg1();
    }
    export class desbg1 {
        public transform: m4m.framework.transform2D;
        public desbg_img: desbg_img = new desbg_img();
        public image1_btn: image1_btn = new image1_btn();
        public redpoint_img: redpoint_img = new redpoint_img();
    }
    export class desbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public editbg: editbg = new editbg();
        public view_img: view_img = new view_img();
        /***/
        public time1_lab: time1_lab = new time1_lab();
    }
    export class editbg {
        public transform: m4m.framework.transform2D;
        public edit1_btn: edit1_btn = new edit1_btn();
        public desbg3_img: desbg3_img = new desbg3_img();
    }
    export class edit1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class desbg3_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class view_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public view1_raw: view1_raw = new view1_raw();
    }
    export class view1_raw {
        public transform: m4m.framework.transform2D;
        public rawImage2D: m4m.framework.rawImage2D;
    }
    export class time1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class image1_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class redpoint_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class playbg {
        public transform: m4m.framework.transform2D;
        public playerbg1: playerbg1 = new playerbg1();
        /***/
        public time_lab: time_lab = new time_lab();
    }
    export class playerbg1 {
        public transform: m4m.framework.transform2D;
        public playerbg2_img: playerbg2_img = new playerbg2_img();
        public barbtn_btn: barbtn_btn = new barbtn_btn();
    }
    export class playerbg2_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public player_bar: player_bar = new player_bar();
        public player1_img: player1_img = new player1_img();
    }
    export class player_bar {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public progressbar: m4m.framework.progressbar;
        public playercut: playercut = new playercut();
    }
    export class playercut {
        public transform: m4m.framework.transform2D;
    }
    export class player1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class barbtn_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class time_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class crown {
        public transform: m4m.framework.transform2D;
        public searchbg1_img: searchbg1_img = new searchbg1_img();
        public previousstep_btn: previousstep_btn = new previousstep_btn();
    }
    export class searchbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public search2_lab: search2_lab = new search2_lab();
    }
    export class search2_lab {
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

}