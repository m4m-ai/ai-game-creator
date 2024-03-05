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
import { StoragePath } from "./StoragePath";
import { StoragePathViewData } from "./StoragePathViewData";
import { FileCell } from "./FileCell";
import { uiLayerType } from "PSDUI/UiManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { commTool } from "Tools/commTool";

export class StoragePathView extends StoragePath.StoragePath {
    public static Instance: StoragePathView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public grid: GridExtend<StoragePath.picturbg3>;
    public viewData: StoragePathViewData;
    public callBackFun: Function;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.uiLayer = uiLayerType.poplayer;
        commTool.makeUIEventDiscard(this.generalbg_img.transform);
        this.viewData = new StoragePathViewData();

        this.grid = new GridExtend<StoragePath.picturbg3>(
            this.picture3_img.animationbg.animationbg1_scr.animationbg1content.picturbg3, FileCell, {
            columns: 1,
            rows: 20,
            // offsetY: 5,
        });

        this.uncheckedbg_btn_btnEvent = this.closeBtnFun.bind(this);
        this.selectedbg_btn_btnEvent = this.SaveBtnFun.bind(this);
        this.previousstep_btn_btnEvent = this.uptoLastLevelFun.bind(this);
        this.title_lab_text("选择储存路径");
        this.search_lab_text("/项目默认储存路径");
        this.unchecked_lab_text("取消");
        this.selected_lab_text("确认储存路径");

    }
    // //设置外部加载图
    // private setRawImageFun() {
    //     let iconSrc = GameMgr.texttype + "midframe.png";
    //     CommonUIUtils.setTextureFun(this.bg_raw.rawImage2D, iconSrc);
    // }
    public onShowFunc(callBack: Function) {
        this.callBackFun = callBack;
        // this.ltext1_lab_text("测试" + Math.random().toFixed(2));
        this.grid.setDataList(this.viewData.filesList);
        StoragePathView.Instance.picture3_img.animationbg.animationbg1_scr.animationbg1content.transform.localTranslate.y = 0;
        StoragePathView.Instance.picture3_img.animationbg.animationbg1_scr.animationbg1content.transform.height = this.grid.height;
        StoragePathView.Instance.picture3_img.animationbg.animationbg1_scr.animationbg1content.transform.width = this.grid.width;
        StoragePathView.Instance.picture3_img.animationbg.animationbg1_scr.animationbg1content.transform.markDirty();
    }

    public onHideFunc() {
        console.error("onHideFunc");
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
        this.viewData.dispose();
        this.grid.dispose();
        if (this.callBackFun) {
            this.callBackFun = null;
        }
    }
    private SaveBtnFun() {
        console.log("点击了储存路径按钮！！");
        if (this.callBackFun) {
            if (this.viewData.currentPath != "") {
                this.callBackFun(this.viewData.currentPath);
                UIOpenOrHideManager.Instance.HideStoragePathView();
            }
        }

    }
    private closeBtnFun() {
        UIOpenOrHideManager.Instance.HideStoragePathView();
    }
    private uptoLastLevelFun() {
        console.log("返回上一级");
    }


}