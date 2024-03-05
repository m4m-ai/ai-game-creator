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
import { CheakPopup } from "./CheakPopup";
import { CheakPopupViewData } from "./CheakPopupViewData";
import { ScrollUiNode } from "Data/GridExtend/GridExtend";
import { GameMgr } from "GameMgr";
import { GameProjectManager } from "Manager/GameProjectManager";


export class CheakPopupView extends CheakPopup.CheakPopup {
    
    public viewData: CheakPopupViewData;

    /** 绑定的滑动区域 */
    public scroll: ScrollUiNode;
    public scrollRoot: m4m.framework.transform2D;
    /** 滑动区域最小高度 */
    public scrollMinHeight: number;
    public scrollHeight: number;
    public scrollStartY: number;

    public onInit() {
        super.onInit();
        this.onShow = this.onShowFunc.bind(this);
        this.onHide = this.onHideFunc.bind(this);
        this.onDispose = this.onDisposeFunc.bind(this);

        let label = this.boxd_img.textd1_lab.label;
        label.fontsize = 28;
        label.horizontalOverflow = false;
        label.verticalOverflow = true;
        label.verticalType = 1;
        label.linespace = 2;
        label.getMaterial();
        label.updateData(label.font);

        label = this.aibg.boxc_img.textc1_lab.label;
        label.fontsize = 28;
        label.horizontalOverflow = false;
        label.verticalOverflow = true;
        label.verticalType = 1;
        label.linespace = 2;
        label.getMaterial();
        label.updateData(label.font);

        label = this.aibg.boxa_img.texta1_lab.label;
        label.fontsize = 28;
        label.horizontalOverflow = false;
        label.verticalOverflow = true;
        label.verticalType = 1;
        label.linespace = 2;
        label.getMaterial();
        label.updateData(label.font);

        CommonUIUtils.setTextureFun(this.aibg.txboxbga.txboxa1_raw.rawImage2D, GameMgr.Role + "chatgpt.png");

        // this.btnlabc1_lab_text("重新生成");
        this.btnlabb2_lab_text("生成更多");
        this.btnlaba3_lab_text("生成更多");
        //多选按钮
        this.aibg.boxc_img.textnotselectedbg_btn.transform.visible = false;

        this.getAiHeadTemplate().transform.visible = false;
        this.getMusicTemplate().transform.visible = false;
        this.getImageTemplate().transform.visible = false;
        this.getTextTemplate().transform.visible = false;
        this.getUserHeadTemplate().transform.visible = false;
        
        this.viewData = new CheakPopupViewData(this);
    }

    /** 设置当前气泡组件绑定的滑动区域 */
    public initData(scroll: ScrollUiNode) {
        scroll.scrollRect.inertia = true;
        scroll.scrollRect.decelerationRate = 0.05;
        this.scroll = scroll;
        this.scrollRoot = scroll.scrollRect.content.transform;
        this.scrollMinHeight = scroll.transform.height;
        this.scrollHeight = scroll.scrollRect.content.transform.height;
        this.scrollStartY = scroll.scrollRect.content.transform.localTranslate.y;
        if (GameProjectManager.isInEditorBol) {
            this.scrollMinHeight-=110;
        }
    }


    public onShowFunc() {
        
    }

    public onHideFunc() {

    }

    public onDisposeFunc() {
        this.viewData.dispose();
    }

    /** ai头像模板 */
    public getAiHeadTemplate() {
        return this.aibg.txboxbga;
    }

    /** 音乐气泡模板 */
    public getMusicTemplate() {
        return this.aibg.boxa_img;
    }

    /** 图片气泡模板 */
    public getImageTemplate() {
        return this.aibg.boxb_img;
    }

    /** 纯文本气泡模板 */
    public getTextTemplate() {
        return this.aibg.boxc_img;
    }

    /** 用户气泡+头像模板 */
    public getUserHeadTemplate() {
        return this.boxd_img;
    }

    //--------------------------------------------------------------------------
}

// export class CheakPopupView extends CheakPopup.CheakPopup {
//     /**打开时不影响其他uiPage */
//     public noAffected: boolean = true;
//     /**其他面板show 时 不隐藏 */
//     public notHideOnOtherShow = true;
//     private viewData: CheakPopupViewData;
//     private aiTabList: GridExtend<any>;
//     private picGrid: GridExtend<any>;
//     private soundGrid: GridExtend<any>;
//     private selectedGrid: GridExtend<textnotselectedbg_btn, any>;
//     private useCallbackFunc: Function;
    
//     public onInit() {
//         super.onInit();

//         this.viewData = new CheakPopupViewData();

//         this.onShow = this.onShowFunc.bind(this);
//         this.onHide = this.onHideFunc.bind(this);
//         this.onDispose = this.onDisposeFunc.bind(this);

//         this.aibg.transform.visible = true;

//         this.btnlabc1_lab_text("重新生成");

//         //文本聊天 重新生成
//         this.btnc1_btn_btnEvent = this.regenFun.bind(this);
//         this.btnc2_btn_btnEvent = this.useToBackgroundFun.bind(this);

//         this.btnlabb2_lab_text("生成更多");
//         //图片 生成更多按钮
//         this.btnb2_btn_btnEvent = this.picCreateMoreFun.bind(this);

//         this.btnlaba3_lab_text("生成更多");
//         //声音 生成更多
//         this.btna4_btn_btnEvent = this.soundCreateMoreFun.bind(this);

//         //多选按钮
//         this.aibg.boxc_img.textnotselectedbg_btn.transform.visible = false;

//         let label = this.boxd_img.textd1_lab.label;
//         label.fontsize = 28;
//         label.horizontalOverflow = false;
//         label.verticalOverflow = true;
//         label.verticalType = 1;
//         label.linespace = 2;

//         label = this.aibg.boxc_img.textc1_lab.label;
//         label.fontsize = 28;
//         label.horizontalOverflow = false;
//         label.verticalOverflow = true;
//         label.verticalType = 1;
//         label.linespace = 2;



//     }

//     public onShowFunc() {
//         console.log("this.aibg.boxc_img.transform.height: ", this.aibg.boxc_img.transform.height)
//     }

//     //图片生成更多
//     private picCreateMoreFun() {
//         console.error("图片生成更多");
//     }

//     //声音生成更多
//     private soundCreateMoreFun() {
//         console.error("声音生成更多");
//     }

//     //重新生成
//     private regenFun() {
//         console.error("重新生成");
//         UiDataManager.changeFunctionData(BindKeyName.OnSendMessageToAi, {
//             message: "重新生成",
//             sendToServer: true,
//         })
//     }

//     //应用到背景设定
//     private useToBackgroundFun() {
//         console.error("应用");
//         if (this.useCallbackFunc) {
//             this.useCallbackFunc();
//         }
//     }
//     private chatData: AIChatContentData;
//     private tablist: string[];
//     //文本聊天默认框高度
//     private textBgDefH: number = 0;

//     // public setData(value: AIChatContentData) {
//     //     this.chatData = value;
//     //     //声音
//     //     this.aibg.boxa_img.transform.visible = false;
//     //     //图片
//     //     this.aibg.boxb_img.transform.visible = false;
//     //     //文本
//     //     this.aibg.boxc_img.transform.visible = false;

//     //     // this.aibg.txboxbga.transform.visible=true;
//     //     //如果是用户就加用户头像
//     //     if (value.type == AIChatDataType.user) {
//     //         // this.boxd_img.txboxbgb.txboxb_img.transform.visible=false;
//     //         CommonUIUtils.setTextureFun(this.boxd_img.txboxbgb.txboxb1_raw.rawImage2D, GameMgr.Role + "flagr4.png");
//     //     } else {
//     //         // this.aibg.txboxbga.txboxa_img.transform.visible=false;
//     //         CommonUIUtils.setTextureFun(this.aibg.txboxbga.txboxa1_raw.rawImage2D, GameMgr.Role + "chatgpt.png");
//     //     }
//     //     //用户文本框
//     //     this.boxd_img.transform.visible = false;
//     //     // console.error("传入数据 " + value.type);
//     //     switch (value.type) {
//     //         case AIChatDataType.text:
//     //             this.aibg.boxc_img.transform.visible = true;
//     //             this.textBgDefH = this.aibg.boxc_img.transform.height;
//     //             this.initTabCellFun();
//     //             this.tablist = [];
//     //             value.aiChatTextDic.forEach((val, key: string) => {
//     //                 this.tablist.push(key);
//     //             });

//     //             this.setAiTabListFun(this.tablist);
//     //             this.aiTabList.selectBackFun = this.selectIndexBackFun.bind(this);
//     //             //默认选中第一个
//     //             this.aiTabList.selectIndex = 0;
//     //             break;
//     //         case AIChatDataType.user:
//     //             this.boxd_img.transform.visible = true;
//     //             this.aibg.txboxbga.transform.visible = false;
//     //             this.boxd_img.textd1_lab.label.text = value.userChatText;
//     //             break;
//     //         case AIChatDataType.picture:
//     //             this.aibg.boxb_img.transform.visible = true;
//     //             this.aibg.boxb_img.textb1_lab.label.text = value.pictureDesText;
//     //             this.initPicCellFun();
//     //             //设置图片数据
//     //             this.setPicListFun(value.pictureUrlList);
//     //             break;
//     //         case AIChatDataType.sound:
//     //             this.aibg.boxa_img.transform.visible = true;
//     //             this.aibg.boxa_img.texta1_lab.label.text = value.soundDesText;
//     //             this.initSoundCellFun();
//     //             //
//     //             this.setSoundListFun(value.soundUrlList);
//     //             break;
//     //     }

//     //     if (value.selectBtn != null && value.selectBtn.length > 0) { //多选
//     //         if (!this.selectedGrid) {
//     //             this.selectedGrid = new GridExtend<CheakPopup.textnotselectedbg_btn, any>(this.aibg.boxc_img.textnotselectedbg_btn, CheakPopupSelectCell, {
//     //                 columns: 5,
//     //                 offsetX: 10,
//     //             });
//     //         }
//     //         this.selectedGrid.setDataList(value.selectBtn);

//     //         this.aibg.boxc_img.btncbg1.btnc1_btn.transform.visible = false;
//     //         this.aibg.boxc_img.btncbg1.btnc2_btn.transform.visible = true;
//     //         let width = this.aibg.boxc_img.btncbg1.btnc2_btn.transform.width * 0.5;
//     //         this.aibg.boxc_img.btncbg1.btnc2_btn.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, this.aibg.boxc_img.btncbg1.transform.width * 0.5 - width);
//     //         this.aibg.boxc_img.btncbg1.btnc2_btn.transform.markDirty()
//     //         this.btnlabc2_lab_text("选择");

//     //         this.useCallbackFunc = () => {
//     //             let data = this.selectedGrid.getData(this.selectedGrid.selectIndex);
                
//     //             UiDataManager.changeFunctionData(BindKeyName.OnSendMessageToAi, {
//     //                 message: data,
//     //                 sendToServer: false,
//     //             })
//     //         }
            
//     //     } else if (value.useButton == null) { //无按钮
//     //         this.aibg.boxc_img.btncbg1.btnc1_btn.transform.visible = false;
//     //         this.aibg.boxc_img.btncbg1.btnc2_btn.transform.visible = false;
//     //         if (this.selectedGrid) {
//     //             this.selectedGrid.removeAll();
//     //         }
            
//     //     } else { //应用
//     //         this.aibg.boxc_img.btncbg1.btnc1_btn.transform.visible = true;
//     //         this.aibg.boxc_img.btncbg1.btnc2_btn.transform.visible = true;
//     //         this.btnlabc2_lab_text(value.useButton.text);
//     //         if (this.selectedGrid) {
//     //             this.selectedGrid.removeAll();
//     //         }

//     //         this.useCallbackFunc = () => {
//     //             UiDataManager.changeFunctionData(BindKeyName.OnSendMessageToAi, {
//     //                 message: value.useButton.text,
//     //                 sendToServer: false,
//     //             });
//     //             value.useButton.callback();
//     //         }
//     //     }

//     // }

//     //ai标签
//     private initTabCellFun() {
//         if (this.aiTabList == null) {
//             let cellTemplete = this.aibg.boxc_img.tabcbg;
//             this.aiTabList = new GridExtend(cellTemplete, CheakPopupAiTab, {
//                 rows: 1,
//                 columns: 3,
//             });
//         }
//     }
//     //
//     public setAiTabListFun(arr: string[]) {
//         this.aiTabList.setDataList(arr);
//     }

//     private selectIndexBackFun(value: number) {
//         // console.error("选中所引 " + value);
//         let key = this.tablist[value];
//         if (this.chatData.aiChatTextDic.has(key)) {
//             let data = this.chatData.aiChatTextDic.get(key);
//             this.aibg.boxc_img.textc1_lab.label.text = data.aiContentText;
//             this.aibg.boxc_img.textc2_lab.label.text = data.aiTipsText;

//             // console.error(data.aiContentText);
//             let lab = this.aibg.boxc_img.textc1_lab.label;
//             //--------刷新 getDrawBounds ------
//             lab.getMaterial();
//             lab.updateData(lab.font);

//             let rect = lab.getDrawBounds();
//             let addHH = rect.h;
//             // console.error(this.aibg.boxc_img.textc1_lab.transform.getLayoutValue(m4m.framework.layoutOption.TOP) + "文本高度", (this.aibg.boxc_img.textc1_lab.transform.getLayoutValue(m4m.framework.layoutOption.TOP) + addHH + 220));
//             let hh = this.aibg.boxc_img.textc1_lab.transform.getLayoutValue(m4m.framework.layoutOption.TOP) + addHH + 220;
//             if (hh > this.textBgDefH) {
//                 this.aibg.boxc_img.transform.height = hh;
//                 this.aibg.boxc_img.transform.markDirty();
//             }
//         }
//     }

//     //初始化图片格子
//     private initPicCellFun() {
//         if (this.picGrid == null) {
//             let cellTemplete = this.aibg.boxb_img.listbgb1_img.picb_raw;
//             this.picGrid = new GridExtend(cellTemplete, CheakPopupPictureCell, {
//                 rows: 2,
//                 columns: 2,
//             });
//         }
//     }

//     //设置图片
//     public setPicListFun(arr: AIChatPicData[]) {
//         this.picGrid.setDataList(arr);
//     }

//     //初始化声音格子
//     private initSoundCellFun() {
//         if (this.soundGrid == null) {
//             let cellTemplete = this.aibg.boxa_img.listbga1_img.listbga2.listbga;
//             this.soundGrid = new GridExtend(cellTemplete, CheakPopupSoundCell, {
//                 rows: 4,
//                 columns: 1,
//                 offsetY: 25
//             });
//         }
//     }

//     //设置声音
//     public setSoundListFun(arr: AIChatSoundData[]) {
//         this.soundGrid.setDataList(arr);
//     }

//     public getH(): number {
//         switch (this.chatData.type) {
//             case AIChatDataType.text:
//                 this.aibg.boxc_img.transform.visible = true;
//                 return this.aibg.boxc_img.transform.height;
//             case AIChatDataType.user:
//                 this.boxd_img.transform.visible = true;
//                 return this.boxd_img.transform.height;
//             case AIChatDataType.picture:
//                 this.aibg.boxb_img.transform.visible = true;
//                 return this.aibg.boxb_img.transform.height;
//             case AIChatDataType.sound:
//                 this.aibg.boxa_img.transform.visible = true;
//                 return this.aibg.boxa_img.transform.height;
//             default:
//                 console.error("未知类型");
//                 return 0;
//         }
//     }

//     public onHideFunc() {

//     }

//     public onDisposeFunc() {
//         this.viewData.dispose();
//         this.viewData = null;

//         if (this.tablist) {
//             this.tablist.length = 0;
//             this.tablist = null;
//         }

//         if (this.picGrid) {
//             this.picGrid.dispose();
//             this.picGrid = null;
//         }

//         if (this.aiTabList) {
//             this.aiTabList.dispose();
//             this.aiTabList = null;
//         }

//         if (this.soundGrid) {
//             this.soundGrid.dispose();
//             this.soundGrid = null;
//         }

//         if (this.selectedGrid) {
//             this.selectedGrid.dispose();
//             this.selectedGrid = null;
//         }
//     }
// }