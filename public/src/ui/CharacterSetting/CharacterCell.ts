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
import { CharacterSetting } from "./CharacterSetting";
import { CharacterSettingView } from "./CharacterSettingView";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { CharacterSettingViewData, FileInfoData } from "./CharacterSettingViewData";

export class CharacterCell implements ICellHandler {
    config: GridConfig;
    cellData: FileInfoData;
    public nowClass: CharacterSetting.desbg1;
    public index: number;
    public isSelect = false;
    //存储的数据
    //英雄数据
    public roleData: any;
    private defFontSize: number = 0;

    public onInit(): void {
        this.defFontSize = this.nowClass.desbg_img.time1_lab.label.fontsize;
        this.nowClass.image1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.clickBtnFun, this);
        this.nowClass.desbg_img.editbg.edit1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.editBtnFun, this);
    }

    public onSetData(value: FileInfoData): void {
        if (value) {
            this.cellData = value;
            //选中图
            this.nowClass.desbg_img.editbg.desbg3_img.transform.visible = false;
            //三点按钮
            this.nowClass.desbg_img.editbg.transform.visible = false;
            //角色立绘图
            this.nowClass.desbg_img.view_img.transform.visible = false;
            //
            this.nowClass.image1_btn.transform.visible = false;
            let id = value.id;
            if (id != "") {//已创建的角色
                this.nowClass.desbg_img.time1_lab.label.text = value.FileName;
                this.nowClass.desbg_img.editbg.transform.visible = true;
                this.nowClass.desbg_img.view_img.transform.visible = true;
                // console.log("角色图片 ：", value.FileImage);
                // CommonUIUtils.setTextureFun(this.nowClass.desbg_img.view_img.view1_raw.rawImage2D, value.FileImage);
                //按照比例进行缩放 而非按照格子大小进行拉伸填充
                CommonUIUtils.setTextureFuncProportionalScaling(this.nowClass.desbg_img.view_img.view1_raw.rawImage2D, value.FileImage);
            } else {//新建角色
                this.nowClass.desbg_img.time1_lab.label.text = value.FileName;
                this.nowClass.image1_btn.transform.visible = true;
            }

            let changeFontSize = this.defFontSize / CharacterSettingViewData.scaleNum;
            // console.error(this.defFontSize + "   " + changeFontSize);
            this.nowClass.desbg_img.time1_lab.label.fontsize = changeFontSize;
            this.nowClass.transform.localScale.x = CharacterSettingViewData.scaleNum;
            this.nowClass.transform.localScale.y = CharacterSettingViewData.scaleNum;
            this.nowClass.transform.localScale = this.nowClass.transform.localScale;
            this.nowClass.transform.markDirty();
            this.nowClass.transform.visible = true;
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    public clickBtnFun() {
        // console.log("点击了新建按钮---");
        CharacterSettingView.Instance.viewData.createNewRole();
    }
    public onClick(): void {
        // console.log("选中要查看的角色数据 ---", this.cellData);
        CharacterSettingView.Instance.viewData.viewRoleInfoFun(this.cellData);
    }
    public onUnSelect() {

    }
    public editBtnFun() {
        console.log("点击了 角色中的 二次菜单按钮+++++++++++++++++++++++++");
        CharacterSettingView.Instance.viewData.totalTransHideFun();
        CharacterSettingView.Instance.viewData.OpenTipPanel(this.index);
    }
}