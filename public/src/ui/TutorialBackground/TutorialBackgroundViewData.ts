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
import { ViewBaseData } from "Data/ViewBaseData";
import { PlayerGuideManager } from "Manager/PlayerGuideManager";
import { TutorialBackgroundView } from "./TutorialBackgroundView";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "Data/BindKeyName";
import { GameProjectManager } from "Manager/GameProjectManager";

export class TutorialBackgroundViewData implements ViewBaseData {
    public constructor() {
        this.changeTutorialUIposition = this.changeTutorialUIpositionFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.TutorialBgPosChange, this.changeTutorialUIposition);
    }
    public changeTutorialUIposition: Function;
    public setTitleDataFun() {
        let titleDic = PlayerGuideManager.instance.getbasicDic();
        let titleData = titleDic.get(PlayerGuideManager.instance.guideStepIndex);
        if (GameProjectManager.isInEditorBol) {//编辑器中
            TutorialBackgroundView.Instance.title2_lab_text("AI资源库");
            TutorialBackgroundView.Instance.bg1.titlebg_img.poreviousstepbg_btn.transform.visible = false;
            TutorialBackgroundView.Instance.bg1.titlebg_img.nextbg_btn.transform.visible = false;
        } else {
            //设置标题 和上一步  下一步按钮文本及显示状态
            TutorialBackgroundView.Instance.title2_lab_text(titleData.title);
            if (titleData.lastStepStr && titleData.lastStepStr != "") {
                TutorialBackgroundView.Instance.bg1.titlebg_img.poreviousstepbg_btn.transform.visible = true;
                TutorialBackgroundView.Instance.poreviousstep_lab_text(titleData.lastStepStr);
            } else {
                TutorialBackgroundView.Instance.bg1.titlebg_img.poreviousstepbg_btn.transform.visible = false;
            }
            if (titleData.nextStepStr && titleData.nextStepStr != "") {
                TutorialBackgroundView.Instance.bg1.titlebg_img.nextbg_btn.transform.visible = true;
                TutorialBackgroundView.Instance.next_lab_text(titleData.nextStepStr);
            } else {
                TutorialBackgroundView.Instance.bg1.titlebg_img.nextbg_btn.transform.visible = false;
            }
        }
    }

    // private newnatural(lab: m4m.framework.label, fun: Function) {
    //     // let lab = TutorialBackgroundView.Instance.bg1.titlebg_img.nextbg_btn.next_lab.label;
    //     //--------刷新 getDrawBounds ------
    //     TutorialBackgroundView.Instance.transform.updateTran(true);
    //     lab.getMaterial();
    //     lab.updateData(lab.font);
    //     //--------------------------------
    //     setTimeout(() => {
    //         let rect = lab.getDrawBounds();
    //         let addWW = rect.w;
    //         fun(addWW)
    //     }, 50);
    // }
    // private setLabFontFun(rechangeLab: m4m.framework.label, labWidth: number, btnWidth: number) {
    //     if (labWidth > btnWidth) {
    //         // let newFontsize = labFontsize - 5;
    //         // let labLen = rechangeLab.text.length;
    //         // let newFontSize = Math.floor(btnWidth / labLen);
    //         // console.log("计算得到的字体大小 :");
    //         rechangeLab.fontsize -= 5;
    //         rechangeLab.transform.markDirty();
    //         rechangeLab.text = "下一步：章节场景目录";
    //     }
    // }
    public changeTutorialUIpositionFun(isCenter: boolean) {
        if (isCenter) {
            let totalWidth = TutorialBackgroundView.Instance.bg.transform.width;
            let uiWidth = TutorialBackgroundView.Instance.bg1.transform.width;
            let posX = (totalWidth - uiWidth) / 2;
            TutorialBackgroundView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
            if (!GameProjectManager.isInEditorBol) {
                TutorialBackgroundView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 0);
            }
            TutorialBackgroundView.Instance.bg1.transform.markDirty();
        } else {
            if (GameProjectManager.isInEditorBol) {
                TutorialBackgroundView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
                TutorialBackgroundView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
                TutorialBackgroundView.Instance.bg1.transform.markDirty();
            } else {
                TutorialBackgroundView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
                TutorialBackgroundView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 0);
                TutorialBackgroundView.Instance.bg1.transform.markDirty();
            }
        }
        TutorialBackgroundView.Instance.transform.markDirty();
        PlayerGuideManager.isCenteredStateBol = isCenter;
        this.setTitleDataFun();
    }
    public dispose() {
        UiDataManager.unBindFunctionData(BindKeyName.TutorialBgPosChange, this.changeTutorialUIposition);
    }
}