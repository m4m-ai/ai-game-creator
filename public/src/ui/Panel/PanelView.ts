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
import { UiNames } from "Manager/UIData/UiNames";
import { PanelBodyView } from "PanelBodyView";
import { UiManager } from "PSDUI/UiManager";
import { UiTools } from "PSDUI/UiTools";
import { Panel } from "./Panel";

export class PanelView extends Panel.Panel {
    
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
    }
    public onShowFunc() {
        // console.error(m4m.framework.layoutOption.RIGHT | m4m.framework.layoutOption.TOP);
        // console.error(m4m.framework.layoutOption.H_CENTER | m4m.framework.layoutOption.V_CENTER);
        // console.error(m4m.framework.layoutOption.RIGHT | m4m.framework.layoutOption.TOP | m4m.framework.layoutOption.LEFT | m4m.framework.layoutOption.BOTTOM);
        
        // this.transform.updateTran(true);
        // console.error(this.body2.transform.layoutState);
        // console.error(this.body2.transform.localTranslate);
        // console.error(this.body2.transform.width + "     " + this.body2.transform.height);
        // console.error(this.body2.transform.getLayoutValue(1));
        // console.error(this.body2.transform.getLayoutValue(2));
        // console.error(this.body2.transform.getLayoutValue(4));
        // console.error(this.body2.transform.getLayoutValue(8));
        // console.error(this.body2.transform.getLayoutValue(16));
        // console.error(this.body2.transform.getLayoutValue(32));


        // console.error(this.transform.width + "     " + this.transform.height);
        // console.error(this.transform.localTranslate);

        // console.error(this.panelbg_img.body.transform.layoutState);


        // this.body2.transform.visible=false;
        // this.panelbg_img.body.transform.visible=false;

        // UiManager.getUIByName(UiNames.PanelBody, this.panelbg_img.transform, (uiObj) => {
        //     // uiObj.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 10);
        //     // uiObj.transform.markDirty();
        // });

        UiManager.getUIByName("Manipulatebubbles", this.panelbg_img.title_img.transform, (uiObj) => {
            // uiObj.transform.localTranslate = new m4m.math.vector2(-100, -100);
            // uiObj.transform.markDirty();
            // uiObj.transform.setLayoutValue(m4m.framework.layoutOption.TOP, -100);
            // uiObj.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, -100);
            // uiObj.transform.markDirty();
        });

        // let body2ui: PanelBodyView = UiTools.cloneUi(this.body2);
        // body2ui.ltext1_lab_text("复制body2");
        // let body2Trans: m4m.framework.transform2D = body2ui.transform;
        // body2Trans.setLayoutValue(32,200);
        // this.body2.transform.parent.addChild(body2Trans);
        //
        //
        // let bodyui: PanelBodyView = UiTools.cloneUi(this.panelbg_img.body);
        // bodyui.ltext1_lab_text("复制body");
        // let bodyTrans: m4m.framework.transform2D = bodyui.transform;
        // bodyTrans.setLayoutValue(32,-200);
        // this.panelbg_img.body.transform.parent.addChild(bodyTrans);
        //
        //
        // let tabClass: Panel.panelbg_img = UiTools.cloneUi(this.panelbg_img);
        // tabClass.body.ltext1_lab_text("复制panelbg_img");
        // let tabTrans: m4m.framework.transform2D = tabClass.transform;
        // tabTrans.setLayoutValue(16,-500);
        // this.panelbg_img.transform.parent.addChild(tabTrans);

        // let tabClass2: Panel.panelbg_img = UiTools.cloneUi(this.panelbg_img);
        // tabClass2.body.ltext1_lab_text("复制的2");
        // let tabTrans2: m4m.framework.transform2D = tabClass2.transform;
        // tabTrans2.setLayoutValue(16,500);
        // tabTrans2.setLayoutValue(32,100);
        // this.panelbg_img.transform.parent.addChild(tabTrans2);

        // tabClass.dispose();
    }

    public onHideFunc() {
        
    }

    public onDisposeFunc() {

    }
}