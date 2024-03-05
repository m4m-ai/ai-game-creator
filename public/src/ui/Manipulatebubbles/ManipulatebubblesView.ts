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
import { uiLayerType } from "PSDUI/UiManager";
import { Manipulatebubbles } from "./Manipulatebubbles";
import { GameProjectManager } from "Manager/GameProjectManager";
import { AlistofgameItemsView } from "AlistofgameItemsView";


export class ManipulatebubblesView extends Manipulatebubbles.Manipulatebubbles {
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    // public viewData: PanelBodyViewData;
    public deleteCallBackFun: Function;
    public reSetCallBackFun: Function;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.uiLayer = uiLayerType.highlayer;
        this.delete_btn_btnEvent = this.DeleteBtnFun.bind(this);
        this.revise_btn_btnEvent = this.RenameBtnFun.bind(this);
    }
    private DeleteBtnFun() {
        if (this.deleteCallBackFun) {
            this.deleteCallBackFun();
        }
    }
    private RenameBtnFun() {
        console.log("点击了重新设置按钮");
        if (this.reSetCallBackFun) {
            this.reSetCallBackFun();
        }
    }
    public onShowFunc() {

    }

    public onHideFunc() {
        console.error("onHideFunc");
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
        if (this.deleteCallBackFun) {
            this.deleteCallBackFun = null;
        }
        if (this.reSetCallBackFun) {
            this.reSetCallBackFun = null;
        }
    }
}