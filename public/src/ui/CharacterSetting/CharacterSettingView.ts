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
import { CharacterSetting } from "./CharacterSetting";
import { CharacterSettingViewData } from "./CharacterSettingViewData";
import { CharacterCell } from "./CharacterCell";
import { EditUIType, GameProjectManager } from "Manager/GameProjectManager";
import { CharacterFactionType, CharacterSettingManager } from "Manager/CharacterSettingManager";
import { ChapterSceneDirectoryManager, ChapterSceneType } from "Manager/ChapterSceneDirectoryManager";
import { SliderComponentExtend } from "Common/SliderComponentExtend";
import { AIResourceManager } from "Manager/AIResourceManager";
import { PlayerGuideManager } from "Manager/PlayerGuideManager";
import { UiNames } from "Manager/UIData/UiNames";
export class CharacterSettingView extends CharacterSetting.CharacterSetting {
    public static Instance: CharacterSettingView;
    /**打开时不影响其他uiPage */
    public noAffected: boolean = true;
    /**其他面板show 时 不隐藏 */
    public notHideOnOtherShow = true;
    public grid: GridExtend<CharacterSetting.desbg1>;
    public viewData: CharacterSettingViewData;
    public callBackFun: Function;
    public type: CharacterFactionType;
    // private sliderExtend: SliderComponentExtend;
    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.viewData = new CharacterSettingViewData();

        let CellTemplete = this.bg3.slidingbg.sliding_scr.slidingcontent.desbg1;
        CellTemplete.transform.pivot = new m4m.math.vector2(0, 0);
        CellTemplete.desbg_img.editbg.transform.pivot = new m4m.math.vector2(1, 0);
        this.grid = new GridExtend<CharacterSetting.desbg1>(
            this.bg3.slidingbg.sliding_scr.slidingcontent.desbg1,
            CharacterCell, {
            columns: 3,
            rows: 20,
            offsetY: 5,
            scroll: this.bg3.slidingbg.sliding_scr,
            isDynamic: true
        });

        this.previousstep_btn_btnEvent = this.reBackFun.bind(this);
        // this.sliderExtend = this.bg3.playbg.playerbg1.playerbg2_img.player_bar.progressbar.transform.addComponent("SliderComponentExtend") as SliderComponentExtend;
        // this.sliderExtend.setSliderBtn = this.bg3.playbg.playerbg1.barbtn_btn.button;
        // this.sliderExtend.offsetPercent = 1.5;
        // this.sliderExtend.maxNum = 1;
        // this.sliderExtend.callBackFun = (sliderVale, dir) => {
        //     if (this.lastVale == sliderVale) {
        //         return;
        //     }
        //     this.lastVale = sliderVale;
        //     // console.error("进度 ", sliderVale)
        //     this.viewData.resCellFun(0.5 + sliderVale * 0.5);
        // };
    }
    private lastVale: number = -1;
    public reBackFun() {
        console.log("返回上一层");
        if (!PlayerGuideManager.isNewGuideBol) {
            // AIResourceManager.instance.editorRebackOrSave();
            if (this.type == CharacterFactionType.backgroundPicture) {
                AIResourceManager.instance.editorRebackOrSave(ChapterSceneType.AIPictrueResoure);
                AIResourceManager.openUIname = UiNames.FileManagerPanel;
                AIResourceManager.closeUIname = UiNames.ChapterSceneMenu;
            } else {
                AIResourceManager.instance.editorRebackOrSave();
            }
        }
    }
    public onShowFunc(type: CharacterFactionType) {
        AIResourceManager.currentUIname = UiNames.CharacterSetting;
        this.viewData.progressbarValueChange(AIResourceManager.instance.SpreadingPlateProcessValue);
        this.bg3.playbg.transform.visible = false;
        // this.sliderExtend.setValue(0);
        this.time_lab_text("图标大小");
        this.type = type;
        this.searchTest(type)
        //滑动区域的长度
        CharacterSettingView.Instance.bg3.slidingbg.sliding_scr.slidingcontent.transform.localTranslate.y = 0;
        CharacterSettingView.Instance.bg3.slidingbg.sliding_scr.slidingcontent.transform.height = this.grid.height;
        CharacterSettingView.Instance.bg3.slidingbg.sliding_scr.slidingcontent.transform.width = this.grid.width;
        CharacterSettingView.Instance.bg3.slidingbg.sliding_scr.slidingcontent.transform.markDirty();

        if (GameProjectManager.isInEditorBol) {
            this.bg3.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
            this.bg3.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
            this.bg3.transform.markDirty();
            this.bg3.slidingbg.sliding_scr.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
            this.bg3.slidingbg.sliding_scr.transform.markDirty();
        } else {
            this.bg3.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
            this.bg3.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 0);
            this.bg3.transform.markDirty();
        }
    }
    public searchTest(type) {
        switch (type) {
            case CharacterFactionType.role:
                GameProjectManager.instance.editCurrentUIType = EditUIType.RoleResource;
                this.search2_lab_text("/角色设定");
                this.viewData.setGridListFun();
                this.grid.setDataList(this.viewData.roleList);
                break;
            case CharacterFactionType.backgroundPicture:
                // GameProjectManager.instance.editCurrentUIType = EditUIType.RoleResource;
                let name = "/" + ChapterSceneDirectoryManager.Instance.SceneData.chapter.chapterName + "/" + ChapterSceneDirectoryManager.Instance.SceneData.sceneName;
                this.search2_lab_text(name);
                this.viewData.setPictureFun();
                this.grid.setDataList(this.viewData.roleList);
                break;
        }
    }
    public onHideFunc() {
        console.error("onHideFunc");
    }
    public onDisposeFunc() {
        console.error("onDisposeFunc");
        this.grid.dispose();
        this.viewData.dispose();
        this.viewData = null;
        this.grid = null;
    }

}