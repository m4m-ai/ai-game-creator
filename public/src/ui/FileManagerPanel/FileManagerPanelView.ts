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
import { SliderComponentExtend } from "Common/SliderComponentExtend";
import { CellData } from "Data/CellData";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { Grid } from "Data/Grid";
import { GridData } from "Data/GridData";
import { GridExtend, ScrollType } from "Data/GridExtend/GridExtend";
import { ListModel } from "Data/ListModel";
import { EditorAssetInfo } from "m4m_editor/Game/Asset/EditorAssetInfo";
import { FileManagerPanel } from "./FileManagerPanel";
import { FileManagerPanelBigCell } from "./FileManagerPanelBigCell";
import { FileManagerPanelCell } from "./FileManagerPanelCell";
import { FileManagerPanelViewData, newEditorAssetInfo } from "./FileManagerPanelViewData";
import { GameProjectManager } from "Manager/GameProjectManager";
import { resourceType } from "Manager/AIResourceManager";

export class FileManagerPanelView extends FileManagerPanel.FileManagerPanel {
    public static Instance: FileManagerPanelView;
    /** */
    public fileGrid: GridExtend<any>;
    /** */
    public bigFileGrid: GridExtend<any>;
    public viewData: FileManagerPanelViewData;
    // private sliderExtend: SliderComponentExtend;
    public onInit() {
        super.onInit();
        this.viewData = new FileManagerPanelViewData();

        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        //返回上一层
        this.previousstep_btn_btnEvent = this.upperFloorBtnClick.bind(this);
        //新建文件
        this.addto_btn_btnEvent = this.AddFileFun.bind(this);

        this.initFileCell();
        this.searchb_lab_text("/");

        // this.sliderExtend = this.displayarea.textbg_img.describbg.sho1_img.shor_bar.progressbar.transform.addComponent("SliderComponentExtend") as SliderComponentExtend;
        // this.sliderExtend.setSliderBtn = this.displayarea.textbg_img.describbg.sho1_img.showr1_btn.button;
        // this.sliderExtend.offsetPercent = 1.5;
        // this.sliderExtend.maxNum = 1;
        // this.sliderExtend.callBackFun = (sliderVale, dir) => {
        //     // if (dir > 0) {
        //     //     //往左滑动
        //     // } else if (dir < 0) {
        //     //     //往右滑动
        //     // }
        //     if (this.lastVale == sliderVale) {
        //         return;
        //     }
        //     this.lastVale = sliderVale;
        //     // console.error("进度 ", sliderVale);

        //     if (sliderVale == 0) {
        //         this.useBigCell = false;
        //         this.displayarea.textbg_img.textboxbg1.textbox_scr.transform.visible = true;
        //         this.displayarea.textbg_img.textboxbg1.textbox1_scr.transform.visible = false;
        //         this.viewData.refreshFileInfo();
        //     } else {
        //         this.useBigCell = true;
        //         this.displayarea.textbg_img.textboxbg1.textbox_scr.transform.visible = false;
        //         this.displayarea.textbg_img.textboxbg1.textbox1_scr.transform.visible = true;
        //         this.viewData.resBigCellFun(0.5 + sliderVale * 0.5);
        //     }
        // };
    }

    // private useBigCell: boolean = false;
    // private lastVale: number = -1;
    //返回上一层
    private upperFloorBtnClick() {
        if (this.viewData.openUiType == resourceType.resourceMgr) {
            console.log("资源管理器返回上一层 --- ");
            this.viewData.upperLevel();
        } else {
            console.log("AI资源库 返回上一层");
        }
    }

    //返回上一层是否可点击
    public canupperFun(value: boolean) {
        let def: number = 1;
        if (value) {
            def = 4;
        }
        let src = FileManagerPanelView.Instance.uiName + ".atlas.json_previousstep" + def;
        this.displayarea.crown.previousstep_btn.previousstep1_img.image.sprite = CommonUIUtils.getSprite(src);
    }
    //资源管理器 新建文件
    public AddFileFun() {
        console.log("新建文件");
        this.viewData.addNewFileFun();
    }

    //层级路径
    public levelUrl(value: string) {
        this.search_lab_text(value);
    }
    private initFileCell() {
        let cellTemplete = this.displayarea.textbg_img.textboxbg1.textbox_scr.textboxcontent.animationbg_img;
        this.fileGrid = new GridExtend(cellTemplete, FileManagerPanelCell, {
            rows: 10,
            columns: 1,
            scroll: this.displayarea.textbg_img.textboxbg1.textbox_scr,
            offsetY: 14,
            isDynamic: true
        });

        //大格子
        let bigCellTemplete = this.displayarea.textbg_img.textboxbg1.textbox1_scr.textbox1content.folderbg_img;
        // console.error(bigCellTemplete.transform.getLayoutValue(m4m.framework.layoutOption.LEFT) + "  " + bigCellTemplete.transform.getLayoutValue(m4m.framework.layoutOption.TOP));
        bigCellTemplete.transform.pivot = new m4m.math.vector2(0, 0);
        bigCellTemplete.folder1.editbg_img.transform.pivot = new m4m.math.vector2(1, 0);
        // console.error("大格子宽高  " + bigCellTemplete.transform.width + "   " + bigCellTemplete.transform.height);
        this.bigFileGrid = new GridExtend(bigCellTemplete, FileManagerPanelBigCell, {
            rows: 3,
            columns: 3,
            scroll: this.displayarea.textbg_img.textboxbg1.textbox1_scr,
            offsetX: 8,
            offsetY: 16,
            isDynamic: true
        });
    }
    public onShowFunc(type: number) {
        this.viewData.openUiType = type;
        this.viewData.initData();
    }
    //
    public setDataList(fileInfo: newEditorAssetInfo[]) {
        if (this.viewData.useBigCell) {
            //大格子
            let bigCellTemplete = this.displayarea.textbg_img.textboxbg1.textbox1_scr.textbox1content.folderbg_img;
            if (this.viewData.upDateConfig) {
                this.bigFileGrid.upDateConfig(bigCellTemplete, this.viewData.upDateConfig);
            }
            this.bigFileGrid.goTop();
            this.bigFileGrid.setDataList(fileInfo);
        } else {
            //先回到顶部
            this.fileGrid.goTop();
            this.fileGrid.setDataList(fileInfo);
        }
    }
    // public setFileGrid(){
    //     this.fileGrid.goTop();
    //     this.fileGrid.setDataList(fileInfo);
    // }

    public onHideFunc() {

    }

    public onDisposeFunc() {
        this.viewData.dispose();
        this.viewData = null;
        this.fileGrid.dispose();
        this.fileGrid = null;
        this.bigFileGrid.dispose();
        this.bigFileGrid = null;
    }
}