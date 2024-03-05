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
import { ChatRecordItem } from "Data/DataType";
import { PopupBase } from "./PopupBase";
import { CheakPopup } from "../CheakPopup";
import { CheakPopupPictureCell } from "../CheakPopupPictureCell";
import { GridExtend } from "Data/GridExtend/GridExtend";
import { cMap } from "Data/Map";

export class ImagePopup extends PopupBase<CheakPopup.boxb_img> {

    private height: number = 0;
    private picGrid: GridExtend<CheakPopup.pickb_img, CheakPopupPictureCell['cellData']>;
    private needRefreshHeight = false;
    private startY: number;
    public onInit(): void {
        let cellTemplete = this.ui.listbgb1_img.pickb_img;
        this.ui.textb1_lab.label.getMaterial();
        this.startY = this.ui.listbgb1_img.transform.getLayoutValue(m4m.framework.layoutOption.TOP);
        //生成更多按钮
        this.ui.btnb2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.generateMoreFun, this);

        this.picGrid = new GridExtend(cellTemplete, CheakPopupPictureCell, {
            columns: 2,
        });
    }
    public onSetData(data: ChatRecordItem, isFirst: boolean): void {
        this.needRefreshHeight = true;

        this.ui.textb1_lab.label.text = data.originData.content;
        let imgList: CheakPopupPictureCell['cellData'][] = [];
        let images = data.originData.images;
        let cellIndexDic = this.viewData.cellIndexDic;
        // console.error(images);
        // console.error("cellIndexDic");
        // console.error(cellIndexDic);
        for (let key in images) {
            if (cellIndexDic.has(key)) {
                let oldIndex = cellIndexDic.get(key);
                imgList[oldIndex] = {
                    key,
                    path: images[key],
                    btnText: data.useButton.text
                };
            }
        }
        for (let key in images) {
            if (cellIndexDic.has(key)) {
            } else {
                imgList.push({
                    key,
                    path: images[key],
                    btnText: data.useButton.text
                });
                if (key != "0" && key != "1" && key != "2" && key != "3") {
                    cellIndexDic.set(key, imgList.length - 1);
                }
            }
        }
        this.picGrid.config.useCallback = data.useButton.callback;
        if (data.moreButton) {
            this.callBackFun = data.moreButton.callback;
            this.ui.btnb2_btn.btnlabb2_lab.label.text = data.moreButton.text;
            this.chatID = data.originData.id;
        }
        if(this.chatID){
            this.picGrid.config.chatID=this.chatID;
        }
        // console.error(imgList);
        // console.error("imgList " + imgList.length);
        this.picGrid.setDataList(imgList);

        let isOver=true;
        for (let i = 0; i < imgList.length; i++) {
            let element = imgList[i];
            if(element.path==null||element.path.length == 0)
            {
                //如果发现图片路径为空 说明没有生成完成 等待中
                isOver=false;
                break;
            }
        }
        this.changeMoreBtnState(isOver);

    }
    public getHeight(): number {
        if (this.needRefreshHeight) {
            this.needRefreshHeight = false;

            let h = 0;
            let lab = this.ui.textb1_lab.label;
            if (lab.text != null && lab.text.length > 0) {
                let rect = lab.getDrawBounds();
                if (isNaN(rect.h)) {
                    rect.h = 0;
                }
                h = rect.h;
            }

            this.ui.listbgb1_img.transform.setLayoutValue(m4m.framework.layoutOption.TOP, this.startY + h);
            this.height = h + this.picGrid.height + 300;
            this.ui.transform.height = this.height;
        }
        return this.height;
    }

    private _moreBtnCanClick: boolean = false;
    private callBackFun: Function;
    private chatID: string;
    private changeMoreBtnState(isOver: boolean) {
        this._moreBtnCanClick = isOver;
        if (this._moreBtnCanClick) {
            this.ui.btnb2_btn.image.color = new m4m.math.color(1, 1, 1);
        } else {
            this.ui.btnb2_btn.image.color = new m4m.math.color(0.2, 0.2, 0.2);
        }
        this.ui.btnb2_btn.transform.markDirty();
    }
    //生成更多按钮
    private generateMoreFun() {
        if (this._moreBtnCanClick) {
            // console.error("生成更多按钮 被点击");
            if (this.callBackFun) {
                this.callBackFun(this.chatID);
            }
        }
    }
    public dispose(): void {
        this.ui.btnb2_btn.button.removeListener(m4m.event.UIEventEnum.PointerClick, this.generateMoreFun, this);
        this.picGrid.dispose();
        this.picGrid = null;
    }
}