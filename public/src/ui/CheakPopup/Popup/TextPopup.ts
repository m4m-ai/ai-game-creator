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
import { AiGuideMessageSelectButton, ChatRecordItem } from "Data/DataType";
import { CheakPopup } from "../CheakPopup";
import { PopupBase } from "./PopupBase";
import { GridExtend } from "Data/GridExtend/GridExtend";
import { CheakPopupAiTab } from "../CheakPopupAiTab";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { CheakPopupSelectCell } from "../CheakPopupSelectCell";

export class TextPopup extends PopupBase<CheakPopup.boxc_img> {

    private height: number = 0;
    //ai页签
    private aiTabList: GridExtend<CheakPopup.tabcbg, string>;
    //选择按钮
    private selectedGrid: GridExtend<CheakPopup.textnotselectedbg_btn, AiGuideMessageSelectButton>;
    private textBgDefH: number = 0;

    private flag1: boolean = false;
    private flag2: boolean = false;
    private flag3: boolean = false;

    private needRefreshHeight = false;

    public onInit(): void {
        this.textBgDefH = this.ui.transform.height;
        //自适应文本高度
        let lab = this.ui.textc1_lab.label;
        lab.richText = true;//设置为富文本
        lab.getMaterial();
        // lab.linespace=1.5;//可设置行高

        // lab.updateData(lab.font);
        // lab.render(lab.transform.canvas);

        this.ui.textc2_lab.label.text = "";
        let cellTemplete = this.ui.tabcbg;
        cellTemplete.tabc1_btn.tablabc1_lab.label.text = "ChatGPT";
        this.aiTabList = new GridExtend(cellTemplete, CheakPopupAiTab, {
            rows: 1,
            columns: 4,
        });
        this.aiTabList.selectBackFun = this.selectIndexBackFun.bind(this);

        //----------------
        this.ui.btncbg1.btnc1_btn.transform.visible = false;
        this.ui.btncbg1.btnc2_btn.transform.visible = false;
        this.ui.btncbg1.btnc3_btn.transform.visible = false;
    }

    public onSetData(data: ChatRecordItem, isFirst: boolean): void {
        this.needRefreshHeight = true;
        if (isFirst) {
            //有选项按钮
            if (this.selectedGrid == null && data.selectBtn != null && data.selectBtn.length > 0) {
                this.selectedGrid = new GridExtend<CheakPopup.textnotselectedbg_btn, AiGuideMessageSelectButton>(this.ui.textnotselectedbg_btn, CheakPopupSelectCell, {
                    columns: 5,
                    offsetX: 10,
                    //多选
                    multipleChoice: data.multipleChoice,
                });
                this.selectedGrid.setDataList(data.selectBtn);
            }

            if (data.regenBtn) { //显示重新生成按钮
                //重新生成按钮
                this.ui.btncbg1.btnc1_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.regenFun, this);
                this.ui.btncbg1.btnc1_btn.btnlabc1_lab.label.text = data.regenBtn.text;
                this.flag1 = true;
            }
            if (data.customButton) {
                //应用按钮
                if (!data.regenBtn) { //调整确认按钮位置
                    this.ui.btncbg1.btnc3_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.useFun, this);
                    this.ui.btncbg1.btnc3_btn.btnlabc3_lab.label.text = data.customButton.text;
                    this.flag3 = true;
                } else {
                    this.ui.btncbg1.btnc2_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.useFun, this);
                    this.ui.btncbg1.btnc2_btn.btnlabc2_lab.label.text = data.customButton.text;
                    this.flag2 = true;
                }
            }
        }

        //更新过按钮
        if (data.aiChatTextDic.size !== this.aiTabList.length) {
            let list: string[] = [];
            data.aiChatTextDic.forEach((value, key: string) => {
                list.push(key);
            });
            this.aiTabList.setDataList(list);
            if (list.length > 0) {
                this.aiTabList.selectIndex = 0;
            }
        }

        //文本内容
        this.ui.textc1_lab.label.text = data.originData.content;

        //console.log("rect.h: ", rect.h, this.ui.transform.height, this.ui.btncbg1.transform.height, this.ui.textc1_lab.transform.height);

        if (data.canShowButton()) { //能显示按钮
            if (data.customButton) {
                this.ui.btncbg1.btnc2_btn.transform.visible = this.flag2;
                this.ui.btncbg1.btnc3_btn.transform.visible = this.flag3;
            }
        }
        if (data.originData.isOver&&data.regenBtn) {
            this.ui.btncbg1.btnc1_btn.transform.visible = this.flag1;
        }
    }
    public getHeight(): number {
        if (this.needRefreshHeight) {
            this.needRefreshHeight = false;

            //自适应文本高度
            let lab = this.ui.textc1_lab.label;
            // //--------刷新 getDrawBounds ------
            //lab.updateData(lab.font);
            let h = 0;
            if (lab.text != null && lab.text.length > 0) {
                let rect = lab.getDrawBounds();
                if (isNaN(rect.h)) {
                    rect.h = 0;
                }
                h = rect.h;
            }

            let height = h + 300;
            if (this.selectedGrid != null) {
                height += 150;
            }
            if (height !== this.textBgDefH) {
                this.textBgDefH = height;
                this.ui.transform.height = height;
                this.ui.transform.markDirty();
            }
            this.height = this.ui.transform.height;
        }
        return this.height;
    }
    public dispose(): void {
        this.aiTabList.dispose();
        this.aiTabList = null;
        if (this.selectedGrid != null) {
            this.selectedGrid.dispose();
            this.selectedGrid = null;
        }
    }

    // 重新生成
    private regenFun() {
        // let prevData = this.popupList[this.index - 1];
        // if (prevData != null) {
        //     ChatMessageDataManager.Instance.sendMessage(prevData.data.chatTitle, prevData.data.userChatText, "重新生成", {});
        // }
        if (this.data.regenBtn) {
            this.data.regenBtn.callback();
        }
    }

    // 应用
    private useFun() {
        if (this.data.customButton) {
            if (this.selectedGrid != null) {
                if (this.data.multipleChoice) { //开启多选
                    let selectCell: any[] = [];
                    this.selectedGrid.forEachCell((cell: CheakPopupSelectCell) => {
                        selectCell.push(cell.cellData);
                    });
                    if (selectCell.length > 0) {
                        this.data.customButton.callback(selectCell);
                    }
                } else { //单选
                    if (this.selectedGrid.selectIndex >= 0) {
                        this.data.customButton.callback([this.selectedGrid.getData(this.selectedGrid.selectIndex)]);
                    }
                }
            } else {
                this.data.customButton.callback();
            }
        }
    }

    private selectIndexBackFun(value: number) {
        if (this.data == null) {
            return;
        }
        // // console.error("选中所引 " + value);
        // let key = this.aiTabList.getData(value);
        // if (this.data.aiChatTextDic.has(key)) {
        //     let data = this.data.aiChatTextDic.get(key);
        //     this.ui.textc1_lab.label.text = data.aiContentText;
        //     this.ui.textc2_lab.label.text = data.aiTipsText;
        //     // // console.error(data.aiContentText);
        //     // let lab = this.ui.textc1_lab.label;
        //     // //--------刷新 getDrawBounds ------
        //     // lab.getMaterial();
        //     // lab.updateData(lab.font);

        //     // let rect = lab.getDrawBounds();
        //     // let addHH = rect.h;
        //     // // console.error(this.ui.textc1_lab.transform.getLayoutValue(m4m.framework.layoutOption.TOP) + "文本高度", (this.ui.textc1_lab.transform.getLayoutValue(m4m.framework.layoutOption.TOP) + addHH + 220));
        //     // let hh = this.ui.textc1_lab.transform.getLayoutValue(m4m.framework.layoutOption.TOP) + addHH + 220;
        //     // if (hh > this.textBgDefH) {
        //     //     this.ui.transform.height = hh;
        //     //     this.ui.transform.markDirty();
        //     // }
        // }
    }
}