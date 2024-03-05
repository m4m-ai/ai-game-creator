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
import { CommonTips } from "./CommonTips";

export class CommonTipsView extends CommonTips {
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
    }
    public onShowFunc() {
        this.frame_img.text1_lab.transform.visible=false;
        this.text_lab_text("测试 "+Math.random().toFixed(2));
    }
  
    public onHideFunc() {

    }

    public onDisposeFunc() {
        
    }
}