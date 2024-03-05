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
import { BindKeyName } from "Data/BindKeyName";
import { ViewBaseData } from "Data/ViewBaseData";
import { UiDataManager } from "PSDUI/UiDataManager";
import { GuideView } from "./GuideView";
import { editorGuideData } from "Manager/PlayerGuideManager";
import { GameProjectManager } from "Manager/GameProjectManager";

export class GuideViewData implements ViewBaseData {
    public constructor() {
        this.refreshGuideTips = this.refreshGuideTipsFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.refreshGuideDescribe, this.refreshGuideTips);
    }
    public refreshGuideTips: Function;
    public refreshGuideTipsFun(guideData: editorGuideData) {
        if (guideData.tips) {
            GuideView.Instance.text_lab_text(guideData.tips);
        }
        let posX = 0;
        if (GameProjectManager.isInEditorBol) {
            posX = GuideView.Instance.bg.transform.width / 2;
        } else {
            posX = GuideView.Instance.transform.width / 2 + GuideView.Instance.box_img.transform.width / 2;
        }
        GuideView.Instance.box_img.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
        GuideView.Instance.box_img.transform.markDirty();
        // let PosY = 0;
        if (guideData.btnStr != "") {
            GuideView.Instance.box_img.btn_btn.transform.visible = true;
            // PosY = 60;
            GuideView.Instance.text1_lab_text(guideData.btnStr);
        } else {
            GuideView.Instance.box_img.btn_btn.transform.visible = false;
            // PosY = 120;
        }
        // GuideView.Instance.box_img.text_lab.transform.setLayoutValue(m4m.framework.layoutOption.TOP, PosY);
        GuideView.Instance.box_img.text_lab.transform.markDirty();

        if (guideData.callBack) {
            GuideView.Instance.ClickFun = guideData.callBack;
        }
    }
    public dispose() {
        UiDataManager.unBindFunctionData(BindKeyName.refreshGuideDescribe, this.refreshGuideTips);
    }
}