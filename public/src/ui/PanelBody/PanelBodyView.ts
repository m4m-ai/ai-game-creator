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
import { PanelBody } from "./PanelBody";
import { GameMgr } from "GameMgr";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { GameCell } from "./GameCell";
import { PanelBodyViewData } from "./PanelBodyViewData";

export class PanelBodyView extends PanelBody.PanelBody {
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public grid: GridExtend<PanelBody.lbtnbg_img>;
    public viewData: PanelBodyViewData;
    public callBackFun: Function;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        this.lbtn_btn_btnEvent = this.testBtnFun.bind(this);
        this.viewData = new PanelBodyViewData();

        this.grid = new GridExtend<PanelBody.lbtnbg_img>(
            this.lbtnbg_img, GameCell, {
            columns: 1,
            rows: 20,
            offsetY: 5,
        });

    }
    private testBtnFun() {
        console.log("点击测试按钮");
        if (this.callBackFun) {
            this.callBackFun("测试用的回调 储存路径");
        }
    }
    //设置外部加载图
    private setRawImageFun() {
        let iconSrc = GameMgr.texttype + "midframe.png";
        CommonUIUtils.setTextureFun(this.bg_raw.rawImage2D, iconSrc);
    }
    public onShowFunc(callBack: Function) {
        this.callBackFun = callBack;
        this.setRawImageFun();
        // this.ltext1_lab_text("测试" + Math.random().toFixed(2));
        this.grid.setDataList(this.viewData.gridList);
    }

    public onHideFunc() {
        console.error("onHideFunc");
    }

    public onDisposeFunc() {
        console.error("onDisposeFunc");
    }
    //设置存储路径
    private setStoragePathFun() {
        this.ltext1_lab_text("选择储存路径");
        this.ltext1_lab_text("游戏名");
        this.ltext1_lab_text("美术风格");
        this.ltext1_lab_text("背景设定");
        this.ltext1_lab_text("保存");
        //直接给一个默认路径
        this.ltext1_lab_text("D:xx/xxx/xxxx");
    }
    private storagePathBtnFun() {
        console.log("点击了储存路径按钮！！");

    }


}