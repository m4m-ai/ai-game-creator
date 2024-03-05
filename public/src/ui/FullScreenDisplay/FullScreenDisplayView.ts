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
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { FullScreenDisplay } from "./FullScreenDisplay";
import { uiLayerType } from "PSDUI/UiManager";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { commTool } from "Tools/commTool";

export class FullScreenDisplayView extends FullScreenDisplay.FullScreenDisplay {
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public uiLayer: uiLayerType = uiLayerType.poplayer;

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.back_btn_btnEvent = this.onClose.bind(this);
        this.bg1_img.imageloadingbg_img.transform.visible = false;
        commTool.makeUIEventDiscard(this.bg1_img.transform);
    }

    public onShowFunc(path: string) {
        let url = ChatMessageDataManager.Instance.getResFullPath(path);
        CommonUIUtils.setTextureFuncProportionalScaling(this.bg1_img.bg_raw.rawImage2D, url);
        //CommonUIUtils.setTextureFun(this.bg1_img.bg_raw.rawImage2D, url);
    }

    public onHideFunc() {
        
    }

    public onDisposeFunc() {

    }

    public onClose() {
        UIOpenOrHideManager.Instance.HideFullScreenDisplayView();
    }
}