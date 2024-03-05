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
import { GridExtend } from "Data/GridExtend/GridExtend";
import { GameMgr } from "GameMgr";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { AlistofgameItems } from "./AlistofgameItems";
import { GameCell } from "./GameCell";
import {  GameProjectManager } from "Manager/GameProjectManager";
import { AlistofgameItemsViewData } from "./AlistofgameItemsViewData";
import { UiManager } from "PSDUI/UiManager";

export class AlistofgameItemsView extends AlistofgameItems.AlistofgameItems {
    public static Instance: AlistofgameItemsView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public grid: GridExtend<AlistofgameItems.newprojectbg_img>;
    public viewData: AlistofgameItemsViewData;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        // this.viewData = new PanelBodyViewData();
        this.title_lab_text("游戏列表");
        this.viewData = new AlistofgameItemsViewData();

        this.grid = new GridExtend<AlistofgameItems.newprojectbg_img>(
            this.viewport.viewport1_scr.viewport1content.newprojectbg_img, GameCell, {
            columns: 3,
            rows: 10,
            offsetY: 30,
            offsetX: 30,
        });
        this.grid.enableScroll = true;
    }
    public setGridListDataFun(list) {
        this.grid.setDataList(list);
        //滑动区域的长度
        AlistofgameItemsView.Instance.viewport.viewport1_scr.viewport1content.transform.localTranslate.y = 0;
        AlistofgameItemsView.Instance.viewport.viewport1_scr.viewport1content.transform.height = this.grid.height + 120;
        AlistofgameItemsView.Instance.viewport.viewport1_scr.viewport1content.transform.width = this.grid.width + 50;
        AlistofgameItemsView.Instance.viewport.viewport1_scr.viewport1content.transform.markDirty();
    }
    public onShowFunc() {
        console.log("游戏列表数据 ---------  ：", GameProjectManager.instance.GameDataArr);
        this.setGridListDataFun(GameProjectManager.instance.GameDataArr);
    }

    public onHideFunc() {
        console.error("onHideFunc");
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
        this.grid.dispose();
        this.viewData.dispose();
    }
}