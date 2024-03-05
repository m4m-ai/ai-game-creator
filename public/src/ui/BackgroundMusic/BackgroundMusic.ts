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


export namespace BackgroundMusic {
    export class BackgroundMusic extends newUiBase {
        public static Instance: BackgroundMusic;
        public onInit(){
            if (this.onInite) {
                this.onInite();
            }
            //添加按钮事件
            this.bg2.bg1.playbg.playerbg_img.barbtn_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.barbtn_btn_event, this);
            this.bg2.bg1.playbg.play_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.play_btn_event, this);
            this.bg2.bg1.playbg.pause_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.pause_btn_event, this);
            this.bg2.bg1.upload_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.upload_btn_event, this);
            this.bg2.bg1.back_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.back_btn_event, this);
            this.bg2.savebg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick,this.savebg_btn_event, this);


        }
        //按钮事件
        private barbtn_btn_event(){if(this.barbtn_btn_btnEvent)this.barbtn_btn_btnEvent();};
        /**this.bg2.bg1.playbg.playerbg_img.barbtn_btn.button 的按钮事件*/
        public barbtn_btn_btnEvent: ()=>any;
        private play_btn_event(){if(this.play_btn_btnEvent)this.play_btn_btnEvent();};
        /**this.bg2.bg1.playbg.play_btn.button 的按钮事件*/
        public play_btn_btnEvent: ()=>any;
        private pause_btn_event(){if(this.pause_btn_btnEvent)this.pause_btn_btnEvent();};
        /**this.bg2.bg1.playbg.pause_btn.button 的按钮事件*/
        public pause_btn_btnEvent: ()=>any;
        private upload_btn_event(){if(this.upload_btn_btnEvent)this.upload_btn_btnEvent();};
        /**this.bg2.bg1.upload_btn.button 的按钮事件*/
        public upload_btn_btnEvent: ()=>any;
        private back_btn_event(){if(this.back_btn_btnEvent)this.back_btn_btnEvent();};
        /**this.bg2.bg1.back_btn.button 的按钮事件*/
        public back_btn_btnEvent: ()=>any;
        private savebg_btn_event(){if(this.savebg_btn_btnEvent)this.savebg_btn_btnEvent();};
        /**this.bg2.savebg_btn.button 的按钮事件*/
        public savebg_btn_btnEvent: ()=>any;

        //文字修改方法
        /**修改label 修改label文字方法*/
        public time_lab_text(text: string){this.bg2.bg1.playbg.time_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtexta1_lab_text(text: string){this.bg2.bg1.inpa_inp.inputtexta1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtexta_lab_text(text: string){this.bg2.bg1.inpa_inp.inputtexta_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtextb1_lab_text(text: string){this.bg2.bg1.inpb_inp.inputtextb1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public inputtextb_lab_text(text: string){this.bg2.bg1.inpb_inp.inputtextb_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public text4_lab_text(text: string){this.bg2.bg1.searchbg1_img.text4_lab.label.text=text;}
        /**修改label 音乐文件修改label文字方法*/
        public text3_lab_text(text: string){this.bg2.bg1.text3_lab.label.text=text;}
        /**修改label 音乐描述修改label文字方法*/
        public text2_lab_text(text: string){this.bg2.bg1.text2_lab.label.text=text;}
        /**修改label 背景音乐名修改label文字方法*/
        public text1_lab_text(text: string){this.bg2.bg1.text1_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public text_lab_text(text: string){this.bg2.bg1.text_lab.label.text=text;}
        /**修改label 修改label文字方法*/
        public save_lab_text(text: string){this.bg2.savebg_btn.save_lab.label.text=text;}

        public uiName:string="BackgroundMusic";

        public bg: bg = new bg();
        public bg2: bg2 = new bg2();
    }
    export class bg {
        public transform: m4m.framework.transform2D;
    }
    export class bg2 {
        public transform: m4m.framework.transform2D;
        public bg1: bg1 = new bg1();
        public savebg_btn: savebg_btn = new savebg_btn();
    }
    export class bg1 {
        public transform: m4m.framework.transform2D;
        public playbg: playbg = new playbg();
        public inpa_inp: inpa_inp = new inpa_inp();
        public inpb_inp: inpb_inp = new inpb_inp();
        public searchbg1_img: searchbg1_img = new searchbg1_img();
        public upload_btn: upload_btn = new upload_btn();
        /***/
        public textbg_img: textbg_img = new textbg_img();
        public back_btn: back_btn = new back_btn();
        /**音乐文件*/
        public text3_lab: text3_lab = new text3_lab();
        /**音乐描述*/
        public text2_lab: text2_lab = new text2_lab();
        /**背景音乐名*/
        public text1_lab: text1_lab = new text1_lab();
        /***/
        public text_lab: text_lab = new text_lab();
    }
    export class playbg {
        public transform: m4m.framework.transform2D;
        public playerbg_img: playerbg_img = new playerbg_img();
        /***/
        public time_lab: time_lab = new time_lab();
        public play_btn: play_btn = new play_btn();
        public pause_btn: pause_btn = new pause_btn();
    }
    export class playerbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public player1_bar: player1_bar = new player1_bar();
        public barbtn_btn: barbtn_btn = new barbtn_btn();
    }
    export class player1_bar {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public progressbar: m4m.framework.progressbar;
        public player1cut: player1cut = new player1cut();
    }
    export class player1cut {
        public transform: m4m.framework.transform2D;
        public player_img: player_img = new player_img();
    }
    export class player_img {
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
    export class play_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class pause_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class inpa_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        public searchbg_img: searchbg_img = new searchbg_img();
        /***/
        public inputtexta1_lab: inputtexta1_lab = new inputtexta1_lab();
        /***/
        public inputtexta_lab: inputtexta_lab = new inputtexta_lab();
    }
    export class searchbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputtexta1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtexta_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inpb_inp {
        public transform: m4m.framework.transform2D;
        public inputField: m4m.framework.inputField;
        /***/
        public desbg_img: desbg_img = new desbg_img();
        /***/
        public inputtextb1_lab: inputtextb1_lab = new inputtextb1_lab();
        /***/
        public inputtextb_lab: inputtextb_lab = new inputtextb_lab();
    }
    export class desbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class inputtextb1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class inputtextb_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class searchbg1_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        /***/
        public text4_lab: text4_lab = new text4_lab();
    }
    export class text4_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class upload_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class textbg_img {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
    }
    export class back_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
    }
    export class text3_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text2_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text1_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class text_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }
    export class savebg_btn {
        public transform: m4m.framework.transform2D;
        public image: m4m.framework.image2D;
        public button: m4m.framework.button;
        /***/
        public save_lab: save_lab = new save_lab();
    }
    export class save_lab {
        public transform: m4m.framework.transform2D;
        public label: m4m.framework.label;
    }

}