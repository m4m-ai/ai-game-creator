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
import { UIOpenOrHideManager } from "Manager/UIOpenOrHideManager";
import { Chatbackground } from "./Chatbackground";
import { ChatbackgroundCell } from "./ChatbackgroundCell";
import { ChatbackgroundViewData } from "./ChatbackgroundViewData";
import newchatbg_btn = Chatbackground.newchatbg_btn;
import { CheakPopupView } from "CheakPopupView";
import { ChatTab } from "Data/DataType";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { GameProjectManager } from "Manager/GameProjectManager";
import { ChatTabEnum } from "Data/EnumType";

export class ChatbackgroundView extends Chatbackground.Chatbackground {
    public static Instance: ChatbackgroundView;
    public viewData: ChatbackgroundViewData;
    public chatListGrid: GridExtend<newchatbg_btn, ChatTab>;

    /** 聊天区域 */
    public popupBody: CheakPopupView;

    public onInit() {
        super.onInit();

        this.popupBody = this.bg1.divider_img.chatmenubg2_scr.chatmenubg2content.body;
        this.viewData = new ChatbackgroundViewData(this);

        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);
        this.bg1.divider_img.chatmenubg2_scr.chatmenubg2content.body.transform.visible = false;

        // this.sending1_lab_text("发送");

        this.app_btn_btnEvent = this.appHideFun.bind(this);

        this.newchattext_lab_text("新建对话");
        this.newchat1_btn_btnEvent = this.createNewDialogueBthClick.bind(this);

        this.inputtext1_lab_text("来说点什么吧");
        //this.bg1.divider_img.inputbg.inputbox_inp.inputField.LineType = m4m.framework.lineType.MultiLine_NewLine;
        //清除历史记录
        this.delete_btn_btnEvent = this.clearBtnClickFun.bind(this);
        //发送
        this.sending_btn_btnEvent = this.sendMessageFun.bind(this);

        this.initCellFun();
    }

    public onShowFunc() {
        this.popupBody.initData(this.bg1.divider_img.chatmenubg2_scr);
        // console.log("AI 聊天的水平位置", this.bg1.divider_img.transform.getLayoutValue(m4m.framework.layoutOption.RIGHT), this.bg1.chatmenubg_img.transform.getLayoutValue(m4m.framework.layoutOption.RIGHT));
        // console.log("AI 聊天的垂直位置", this.bg1.divider_img.transform.getLayoutValue(m4m.framework.layoutOption.BOTTOM), this.bg1.chatmenubg_img.transform.getLayoutValue(m4m.framework.layoutOption.BOTTOM));
        // console.log("AI聊天bg 高度 ", this.bg1.divider_img.transform.height, "  ---   ", this.bg1.chatmenubg_img.transform.height);
        // console.log("top ：", this.bg1.divider_img.transform.getLayoutValue(m4m.framework.layoutOption.TOP));
        // console.log("滑动区域得最小高度 ：", this.popupBody.scrollMinHeight);
        if (GameProjectManager.isInEditorBol) {
            this.bg1.divider_img.transform.setLayoutValue(m4m.framework.layoutOption.RIGHT, 125);
            this.bg1.divider_img.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 110);
            this.bg1.divider_img.transform.width = 1100;
            this.bg1.divider_img.transform.markDirty();
            this.bg1.chatmenubg_img.transform.setLayoutValue(m4m.framework.layoutOption.RIGHT, 1225);
            this.bg1.chatmenubg_img.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 110);
            this.bg1.chatmenubg_img.transform.markDirty();
        } else {
            this.bg1.divider_img.transform.setLayoutValue(m4m.framework.layoutOption.RIGHT, 0);
            this.bg1.divider_img.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 0);
            this.bg1.divider_img.transform.width = 1334;
            this.bg1.divider_img.transform.markDirty();
            this.bg1.chatmenubg_img.transform.setLayoutValue(m4m.framework.layoutOption.RIGHT, 1334);
            this.bg1.chatmenubg_img.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 0);
            this.bg1.chatmenubg_img.transform.markDirty();
        }
    }

    /** 获取选中的页签数据 */
    public getSelectChatTabData() {
        return this.chatListGrid.getData(this.chatListGrid.selectIndex);
    }

    /** 获取选中的页签名称 */
    public getSelectChatTabName() {
        let data = this.getSelectChatTabData();
        if (data) {
            return data.title;
        }
        return null;
    }

    private sendMessageFun() {
        let str = this.bg1.divider_img.inputbg.inputbox_inp.inputField.text;
        if (str != null && str.length > 0) {
            if (ChatMessageDataManager.Instance.chatIsOver) {
                console.log("发送 " + str);
                this.bg1.divider_img.inputbg.inputbox_inp.inputField.text = "";
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, str);
            } else {
                console.error("ai还在回消息中!");
            }
        }
    }

    private clearBtnClickFun() {
        console.log("清除聊天记录");
    }

    private initCellFun() {
        let cellTemplete = this.bg1.chatmenubg_img.chatmenubg1.chatmenuscr_scr.chatmenuscrcontent.newchatbg_btn;
        this.chatListGrid = new GridExtend(cellTemplete, ChatbackgroundCell, {
            rows: 10,
            columns: 1,
            viewInstance: this
        });
    }

    //新建对话
    private createNewDialogueBthClick() {
        ChatMessageDataManager.Instance.createChatTab(ChatTabEnum.free, "新对话");
    }
    //收起面板
    public appHideFun() {
        UIOpenOrHideManager.Instance.HideChatbackgroundView();
    }

    //private cheakPopupArr: Array<CheakPopupView> = new Array<CheakPopupView>();
    //private offsetY: number = 50;


    // public setChatData(arrList: Array<AIChatContentData>) {
    //     for (let i = 0; i < this.cheakPopupArr.length; i++) {
    //         let checkObj = this.cheakPopupArr[i];
    //         checkObj.transform.visible = false;
    //     }
    //     let yy: number = 0;
    //     for (let i = 0; i < arrList.length; i++) {
    //         let data = arrList[i];
    //         let cloneObj: CheakPopupView;
    //         if (i >= this.cheakPopupArr.length) {
    //             let cellTemplate = this.bg1.divider_img.chatmenubg2_scr.chatmenubg2content.body;
    //             cloneObj = UiTools.cloneUi(cellTemplate);
    //             cellTemplate.transform.parent.addChild(cloneObj.transform);
    //             this.cheakPopupArr.push(cloneObj);
    //         } else {
    //             cloneObj = this.cheakPopupArr[i];
    //         }
    //         // cloneObj.setData(data);
    //         // cloneObj.transform.visible = true;
    //         // let h = cloneObj.getH();
    //         // // console.error("显示的UI高度 " + h);
    //         // cloneObj.transform.setLayoutValue(m4m.framework.layoutOption.TOP, yy);
    //         // cloneObj.transform.markDirty();

    //         // yy += h + this.offsetY;

    //         // console.error(cloneObj.transform.getLayoutValue(m4m.framework.layoutOption.TOP));
    //         // console.error(cloneObj.transform.getLayoutValue(m4m.framework.layoutOption.LEFT));
    //     }

    //     this.transform.updateTran(true);

    //     //全都加到tran节点下再来刷新位置
    //     for (let i = 0; i < arrList.length; i++) {
    //         let data = arrList[i];
    //         let cloneObj: CheakPopupView = this.cheakPopupArr[i];
    //         cloneObj.setData(data);
    //         cloneObj.transform.visible = true;
    //         let h = cloneObj.getH();
    //         // console.error("显示的UI高度 " + h);
    //         cloneObj.transform.setLayoutValue(m4m.framework.layoutOption.TOP, yy);
    //         cloneObj.transform.markDirty();

    //         yy += h + this.offsetY;
    //     }


    //     let scrllRect_scr = this.bg1.divider_img.chatmenubg2_scr;
    //     scrllRect_scr.chatmenubg2content.transform.height = yy;

    //     // console.warn(yy);
    //     // console.warn(scrllRect_scr.scrollRect.transform.height);
    //     // console.error(scrllRect_scr.scrollRect.transform.height - yy);
    //     scrllRect_scr.chatmenubg2content.transform.localTranslate.y = scrllRect_scr.scrollRect.transform.height - yy;
    //     scrllRect_scr.chatmenubg2content.transform.localTranslate = scrllRect_scr.chatmenubg2content.transform.localTranslate;
    //     scrllRect_scr.chatmenubg2content.transform.markDirty();

    // }

    public onHideFunc() {

    }

    public onDisposeFunc() {
        this.viewData.dispose();
        this.viewData = null;
        this.chatListGrid.dispose();
        this.chatListGrid = null;
    }
}