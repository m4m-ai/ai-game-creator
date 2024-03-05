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
import { PlayerGuideManager, editorGuideData } from "Manager/PlayerGuideManager";
import { Guide } from "./Guide";
import { GuideViewData } from "./GuideViewData";
import { GameProjectManager } from "Manager/GameProjectManager";
import { AppMain } from "appMain";
import { BuildType } from "GameEnum";


export class GuideView extends Guide.Guide {
    public static Instance: GuideView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public viewData: GuideViewData;
    public ClickFun: Function;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.viewData = new GuideViewData();

        this.btn_btn_btnEvent = this.clickBtnFun.bind(this);

    }
    private clickBtnFun() {
        console.log("按钮点击事件");
        if (this.ClickFun) {
            this.ClickFun();
        }
    }
    public onShowFunc(guideData: editorGuideData) {
        // console.log("引导 数据 ; ==== ", guideData);
        this.box_img.text_lab.label.horizontalOverflow = true;
        this.box_img.text_lab.label.verticalOverflow = true;//说明支持换行
        this.box_img.text_lab.label.linespace = 1.4;
        this.text_lab_text(guideData.tips);

        let posX = 0;
        if (GameProjectManager.isInEditorBol) {
            posX = this.bg.transform.width / 2;
        } else {
            posX = this.bg.transform.width / 2 + this.box_img.transform.width / 2;
        }
        this.box_img.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
        this.box_img.transform.markDirty();


        if (guideData.btnStr == "" && AppMain.buildType == BuildType.StoryType) {
            guideData.btnStr = PlayerGuideManager.BtnStr;
        }

        // let PosY = 0;
        if (guideData.btnStr != "") {
            this.box_img.btn_btn.transform.visible = true;
            // PosY = 60;
            this.text1_lab_text(guideData.btnStr);
            let width = this.box_img.btn_btn.transform.width
            if (width < this.newnatural()) {
                let testWidth = (this.newnatural() - width) + 10;
                this.box_img.btn_btn.transform.width += testWidth;
                this.box_img.btn_btn.transform.markDirty();
            }
        } else {
            this.box_img.btn_btn.transform.visible = false;
            // PosY = 120;
        }
        // this.box_img.text_lab.transform.setLayoutValue(m4m.framework.layoutOption.TOP, PosY);
        this.box_img.text_lab.transform.markDirty();

        if (guideData.callBack) {
            this.ClickFun = guideData.callBack;
        }

    }

    private newnatural() {
        let lab = this.box_img.btn_btn.text1_lab.label;
        //--------刷新 getDrawBounds ------
        this.transform.updateTran(true);
        lab.getMaterial();
        lab.updateData(lab.font);
        //--------------------------------
        let rect = lab.getDrawBounds();
        let addWW = rect.w;
        return addWW;
    }
    public onHideFunc() {
        console.error("onHideFunc");
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
        this.viewData.dispose();
        if (this.ClickFun) {
            this.ClickFun = null;
        }
    }


}