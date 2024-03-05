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
import { GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { AlistofgameItems } from "./AlistofgameItems";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { GameMgr } from "GameMgr";
import { AlistofgameItemsView } from "./AlistofgameItemsView";

export class GameCell implements ICellHandler {
    config: GridConfig;
    cellData: any;
    public nowClass: AlistofgameItems.newprojectbg_img;
    public index: number;
    public isSelect = false;
    //存储的数据
    //英雄数据
    public roleData: any;

    public onInit(): void {
        this.nowClass.newprojectbg1.windoweditingbg.bottom.definition_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.clickSettingBtnFun, this);
        this.nowClass.newprojectbg1_img.new_lab.new1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.createNewGameBtnFun, this);
        this.nowClass.newprojectbg1.windoweditingbg.view_img.editbg_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.startEditBtnFun, this);
    }

    public onSetData(value): void {
        if (value) {
            // console.log("当前的游戏格子 数据 ：", value);
            this.cellData = value;
            this.nowClass.transform.visible = true;

            //新建游戏格子
            this.nowClass.newprojectbg1_img.transform.visible = false;

            //已有游戏内容
            this.nowClass.newprojectbg1.transform.visible = false;
            this.nowClass.newprojectbg1.windoweditingbg.view_img.masking_img.transform.visible = false;
            this.nowClass.newprojectbg1.windoweditingbg.bottom.definition_btn.transform.visible = false;
            this.nowClass.newprojectbg1.windoweditingbg.view_img.editbg_btn.transform.visible = false;
            this.nowClass.newprojectbg1.windoweditingbg.view_img.edit_lab.transform.visible = false;


            if (value.lastTime == "") {//新建游戏格子
                this.nowClass.newprojectbg1_img.transform.visible = true;
                this.nowClass.newprojectbg1_img.new_lab.label.text = "新建游戏";
                this.nowClass.newprojectbg1_img.new_lab.transform.visible = true;
                this.nowClass.newprojectbg1_img.new_lab.new1_btn.transform.visible = true;
            } else {//已有游戏格子
                this.nowClass.newprojectbg1.transform.visible = true;
                let gameName = "";
                if (value.galName == "") {
                    gameName = "游戏名" + this.index;
                } else {
                    gameName = value.galName;
                }
                this.nowClass.newprojectbg1.windoweditingbg.bottom.name_lab.label.text = "修改时间：" + this.index + "天前";
                this.nowClass.newprojectbg1.windoweditingbg.bottom.time_lab.label.text = "D:/xx/xxx/xxx";
                //存储路径
                this.nowClass.newprojectbg1.windoweditingbg.bottom.directory_lab.label.text = gameName;
                this.nowClass.newprojectbg1.windoweditingbg.view_img.edit_lab.label.text = "开始编辑";
                // //游戏预览图
                if (value.previewImage == "") {//未拿到预览图
                    // gameScr = GameMgr.GameIcon + "gamePreviewIcon.png";
                } else {//拿到预览图
                    // console.log("游戏预览图 ", gameScr);
                    CommonUIUtils.setTextureFun(this.nowClass.newprojectbg1.windoweditingbg.view_img.view1_raw.rawImage2D, value.previewImage);
                }

                if (value.icon == "") {
                } else {
                // console.log("游戏小图标 ：", gameIconScr);
                CommonUIUtils.setTextureFun(this.nowClass.newprojectbg1.windoweditingbg.bottom.thumbnail_raw.rawImage2D, value.icon);
                }

            }
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    public clickSettingBtnFun() {
        // console.log("点击了设置按钮--- 显示二级菜单");
        AlistofgameItemsView.Instance.viewData.OpenTipPanel(this.index);
    }
    onClick() {
    }
    onPointDown() {
        // AlistofgameItemsView.Instance.setGrid(this.nowClass, this.cellData, this.index);
    }
    public onSelect() {

        // console.log("选中状态---", this.cellData);
        AlistofgameItemsView.Instance.viewData.totalTransHideFun();

        if (this.cellData.lastTime == "") {//创建游戏
            // console.log("创建新游戏！");
        } else {
            this.nowClass.newprojectbg1.windoweditingbg.view_img.editbg_btn.transform.visible = true;
            this.nowClass.newprojectbg1.windoweditingbg.view_img.edit_lab.transform.visible = true;
            this.nowClass.newprojectbg1.windoweditingbg.bottom.definition_btn.transform.visible = true;
            this.nowClass.newprojectbg1.windoweditingbg.view_img.masking_img.transform.visible = true;
        }
    }
    public onUnSelect() {
        if (this.cellData.lastTime != "") {
            this.nowClass.newprojectbg1.windoweditingbg.view_img.editbg_btn.transform.visible = false;
            this.nowClass.newprojectbg1.windoweditingbg.view_img.edit_lab.transform.visible = false;
            this.nowClass.newprojectbg1.windoweditingbg.bottom.definition_btn.transform.visible = false;
            this.nowClass.newprojectbg1.windoweditingbg.view_img.masking_img.transform.visible = false;
        }
    }
    public createNewGameBtnFun() {
        // console.log("点击新建游戏按钮 ！");
        // AlistofgameItemsView.Instance.viewData.setCommonPoupData();
        AlistofgameItemsView.Instance.viewData.GotoGuideFun();
    }
    public startEditBtnFun() {
        // console.log("开始编辑 按钮");
        //打开项目事件
        // EditorEventMgr.Instance.emitEvent("OnOpenProject", cb => cb("test1"));
        AlistofgameItemsView.Instance.viewData.editProjectFun(this.cellData.id);
    }
}