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

import { UiManager, uiLayerType } from "PSDUI/UiManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { FullscreenPage } from "./FullscreenPage";
import { GameMgr } from "GameMgr";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { UiNames } from "Manager/UIData/UiNames";
import { PlayerGuideManager } from "Manager/PlayerGuideManager";
import { AIResourceManager } from "Manager/AIResourceManager";
import { GameProjectManager } from "Manager/GameProjectManager";
import { FrameMgr } from "Tools/FrameMgr";
import { ProjectBasicSettingsManagerRequest } from "AutoCode/Net/ClientRequest/ProjectBasicSettingsManagerRequest";
export class FullscreenPageView extends FullscreenPage.FullscreenPage {
    public static Instance: FullscreenPageView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.aibg_btn_btnEvent = this.AIbtnFun.bind(this);
        this.title_lab_text("");

        //let bgScr = GameMgr.texttype + "bg.png";
        //CommonUIUtils.setTextureFun(this.bg_raw.rawImage2D, bgScr);
        FrameMgr.Add(this.onUpdate, this);
        this.titlebg1_img.titlebg.loog_img.transform.visible = false;
    }
    private AIbtnFun() {
        console.log("点击了 ai 按钮");
        let showChatBol = AIResourceManager.instance.canShowChatByUIname();
        if (showChatBol) {
            PlayerGuideManager.instance.setAIGuidByIndex(GameProjectManager.instance.editCurrentUIType);
        }
        // console.log("------");
    }
    public onUpdate() {
        // console.log("帧管理 ----");
        if (GameProjectManager.instance.currentBackStoryData) {
            if (GameProjectManager.instance.currentBackStoryData.worldName) {
                this.title_lab_text("正在编辑 ：" + GameProjectManager.instance.currentBackStoryData.worldName);
            }
        } else {
            if (GameProjectManager.instance.currentGalData) {
                if (GameProjectManager.instance.currentGalData.backStory && GameProjectManager.instance.currentGalData.backStory != "") {
                    ProjectBasicSettingsManagerRequest.Instance.GetBackStory(GameProjectManager.instance.currentGalData.backStory);
                }
            }
        }
    }
    public onShowFunc() {
        // UiManager.showUi(UiNames.AlistofgameItems);
    }

    public onHideFunc() {
        console.error("onHideFunc");
        FrameMgr.Remove(this.onUpdate, this);
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
    }
}