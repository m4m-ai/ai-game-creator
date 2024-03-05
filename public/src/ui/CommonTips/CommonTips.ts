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
export class CommonTips extends newUiBase {
    public static Instance: CommonTips;
    public onInit(){
        if (this.onInite) {
            this.onInite();
        }
        //添加按钮事件


    }
    //按钮事件

    //文字修改方法
    /**修改label 修改label文字方法*/
    public text_lab_text(text:string){this.frame_img.text_lab.label.text=text;}
    /**修改label 修改label文字方法*/
    public text1_lab_text(text:string){this.frame_img.text1_lab.label.text=text;}

 public uiName:string="CommonTips";

 public bg:bg=new bg();
 /***/
 public frame_img:frame_img=new frame_img();
}
export class bg{
 public transform:m4m.framework.transform2D;
}
export class frame_img{
 public transform:m4m.framework.transform2D;
 public image:m4m.framework.image2D;
 /***/
 public text_lab:text_lab=new text_lab();
 /***/
 public text1_lab:text1_lab=new text1_lab();
}
export class text_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
export class text1_lab{
 public transform:m4m.framework.transform2D;
 public label:m4m.framework.label;
}
