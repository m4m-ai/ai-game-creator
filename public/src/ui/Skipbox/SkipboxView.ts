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
import { SkipBoxManager } from "Manager/SkipBoxManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { uiLayerType } from "PSDUI/UiManager";
import { commTool } from "Tools/commTool";
import { Skipbox } from "./Skipbox";

export class SkipboxView extends Skipbox.Skipbox {
    public static Instance: SkipboxView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;

    public uiLayer = uiLayerType.poplayer;

    public bgbtn: m4m.framework.button

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.bgbtn = this.bg.transform.addComponent("button") as m4m.framework.button;
        this.bgbtn.addListener(m4m.event.UIEventEnum.PointerClick, this.btBtnfunbind, this);
        commTool.makeUIEventDiscard(this.bgbtn.transform);
    }

    private onShowFunc() {
        this.skipbox_lab_text(SkipBoxManager.Instance.showSkipDesc);
    }

    private onHideFunc() {
    }

    private onDisposeFunc() {
        this.bgbtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.btBtnfunbind, this);
    }

    private btBtnfunbind() {
        UIOpenOrHideManager.Instance.HideSkipboxView();
    }
}