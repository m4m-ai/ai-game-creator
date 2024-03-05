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
import { UiManager } from "PSDUI/UiManager";
import { TutorialBackground } from "./TutorialBackground";
import { TutorialBackgroundViewData } from "./TutorialBackgroundViewData";
import { PlayerGuideManager } from "Manager/PlayerGuideManager";
import { ChapterSceneDirectoryManager, ChapterSceneType } from "Manager/ChapterSceneDirectoryManager";
import { commonBackData } from "Manager/UIOpenOrHideManager";
import { GameProjectManager } from "Manager/GameProjectManager";
export class TutorialBackgroundView extends TutorialBackground.TutorialBackground {
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public viewData: TutorialBackgroundViewData;
    public callBackFun: Function;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.poreviousstepbg_btn_btnEvent = this.lastBtnClickFun.bind(this);
        this.nextbg_btn_btnEvent = this.nextBtnFun.bind(this);

        this.viewData = new TutorialBackgroundViewData();
    }
    private testBtnFun() {
        console.log("点击测试按钮");
    }
    private lastBtnClickFun() {
        // console.log("返回上一步");
        PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex;
        PlayerGuideManager.instance.guideStepIndex -= 1;
        PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex);

    }
    private nextBtnFun() {
        // console.log("跳往下一步");
        PlayerGuideManager.instance.lastStepIndex = PlayerGuideManager.instance.guideStepIndex;
        let bool: boolean = true;
        PlayerGuideManager.instance.guideStepIndex += 1;
        if (PlayerGuideManager.instance.guideStepIndex == 4 && ChapterSceneDirectoryManager.Instance.SceneData) {
            PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex);
            bool = false;
        } else if (PlayerGuideManager.instance.guideStepIndex != 4) {
            PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex);
            bool = false;
        }
        if (bool) {
            PlayerGuideManager.instance.guideStepIndex -= 1;
        }
    }

    public onShowFunc(data: commonBackData) {
        this.transform.updateTran(true)
        this.viewData.setTitleDataFun();
        PlayerGuideManager.isCenteredStateBol = data.CenterDisplayBol;
        console.log("------  ", data);
        if (data.CenterDisplayBol) {
            let totalWidth = this.bg.transform.width;
            let uiWidth = this.bg1.transform.width;
            // console.log("totalWidth  ", totalWidth, "  uiWidth  ", uiWidth);
            let posX = (totalWidth - uiWidth) / 2;
            // console.log("第一次居中位置  ：", posX);
            this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
            // this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 0);
            this.bg1.transform.markDirty();

        } else {
            if (GameProjectManager.isInEditorBol) {
                this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
                this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
                this.bg1.transform.markDirty();
            } else {
                this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
                this.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 0);
                this.bg1.transform.markDirty();
            }
        }
        this.bg1.textbox_img.savebg_btn.transform.visible = false;

        if (data.callBack) {
            this.callBackFun = data.callBack;
            this.callBackFun();
        }
    }

    public onHideFunc() {
        console.error("onHideFunc");
        if (this.callBackFun) {
            this.callBackFun = null;
        }
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
        this.viewData.dispose();
    }
}