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
import { CommonUIUtils } from "Data/CommonUIUtils";
import { GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { CheakPopup } from "./CheakPopup";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { FrameMgr } from "Tools/FrameMgr";
import { ResManager } from "Manager/ResManager";

export class CheakPopupPictureCell implements ICellHandler {
    nowClass: CheakPopup.pickb_img;
    index: number;
    config: GridConfig;
    cellData: {
        key: string,
        path: string,
        btnText: string,
    };
    private isPlaying: boolean = false;
    private expansionbtn: m4m.framework.button;
    private useBtn: m4m.framework.button;
    public onInit(): void {
        this.nowClass.pickb1_img.transform.visible = false;
        // //展开按钮
        // this.expansionbtn = this.nowClass.btnb_img.transform.addComponent("button") as m4m.framework.button;
        // this.expansionbtn.addListener(m4m.event.UIEventEnum.PointerClick, this.expansionClickFun, this);

        //应用按钮
        this.useBtn= this.nowClass.pickb1_img.btnb1_img.transform.addComponent("button") as m4m.framework.button;
        this.useBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.useBtnClickFun, this);

        //放大按钮
        this.nowClass.scale_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.onScaleClick, this);
        this.nowClass.scale_btn.transform.visible = false;

        this.nowClass.buffer_img.transform.visible = false;
    }
    public onSetData(value: CheakPopupPictureCell["cellData"]): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;

            this.nowClass.pickb1_img.btnb1_img.btnlabb1_lab.label.text=value.btnText;
            if (this.isValidPath()) { //加载成功
                this.nowClass.scale_btn.transform.visible = true;
                this.nowClass.picb_raw.transform.visible=true;
                // console.error(ChatMessageDataManager.Instance.getResFullPath(value.path));
                // let lastIndex=value.path.lastIndexOf(".");
                // let imageJson=value.path.slice(0,lastIndex)+".json";
                // ResManager.loadJson(ChatMessageDataManager.Instance.getResFullPath(imageJson), (txt) => {
                //     let obj = txt;
                //     if (typeof (txt) == "string") {
                //         obj = JSON.parse(txt);
                //     }
                //     console.error(obj);
                // });
                CommonUIUtils.setTextureFuncProportionalScaling(this.nowClass.picb_raw.rawImage2D,ChatMessageDataManager.Instance.getResFullPath(value.path));
                this.stopLoading();
            } else { //加载中
                this.nowClass.picb_raw.transform.visible=false;
                this.playLoading();
                this.nowClass.scale_btn.transform.visible = false;
                this.nowClass.pickb1_img.transform.visible = false;
            }
            
            //CommonUIUtils.setTextureFun(this.nowClass.rawImage2D, GameMgr.Role + "ST15.png");
            // console.error(element.value);
        } else {
            this.nowClass.transform.visible = false;
        }
    }

    private isValidPath() {
        return this.cellData.path != null && this.cellData.path.length !== 0;
    }

    // private expansionClickFun() {
    //     console.error("展开 " + this.cellData.key);
    // }

    private useBtnClickFun()
    {
        //if (!this.config.clickUse) {
        this.config.clickUse = true;
        ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, `选择第${this.index + 1}张图`, false);
        this.config.useCallback(this.cellData.key,this.config.chatID);
        console.error("选择 " + this.cellData.key,this.config.chatID);
        //}
        
    }

    public onSelect() {
        if (this.isValidPath()) {
            this.nowClass.pickb1_img.transform.visible = true;
        }
    }

    public onUnSelect(): void {
        this.nowClass.pickb1_img.transform.visible = false;
    }

    public onDispose(): void {
        // this.expansionbtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.expansionClickFun, this);
        this.useBtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.useBtnClickFun, this);
        this.stopLoading();
    }

    private onScaleClick() {
        if (this.isValidPath()) {
            UIOpenOrHideManager.Instance.OpenFullScreenDisplayView(this.cellData.path);
        }
    }

    private playLoading() {
        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        this.nowClass.buffer_img.transform.visible = true;
        FrameMgr.Add(this._runLoadingFunc, this);
    }

    private stopLoading() {
        if (!this.isPlaying) {
            return;
        }
        this.isPlaying = false;
        this.nowClass.buffer_img.transform.visible = false;
        FrameMgr.Remove(this._runLoadingFunc, this);
    }

    private _runLoadingFunc = this.runLoading.bind(this);
    private runLoading(delta: number) {
        this.nowClass.buffer_img.transform.localRotate += Math.PI * delta;
        this.nowClass.buffer_img.transform.markDirty();
    }
}