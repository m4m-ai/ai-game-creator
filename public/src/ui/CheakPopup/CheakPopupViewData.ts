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
import { ViewBaseData } from "Data/ViewBaseData";
import { CheakPopupView } from "./CheakPopupView";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "Data/BindKeyName";
import { AIChatDataType, ChatMessageUpdateResult, ChatRecordItem, ChatTab } from "Data/DataType";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { UiNode } from "Data/GridExtend/GridExtend";
import { UiTools } from "PSDUI/UiTools";
import { PopupBase } from "./Popup/PopupBase";
import { UserTextPopup } from "./Popup/UserTextPopup";
import { TextPopup } from "./Popup/TextPopup";
import { FrameMgr } from "Tools/FrameMgr";
import { ImagePopup } from "./Popup/ImagePopup";
import { UiManager } from "PSDUI/UiManager";
import { SoundPopup } from "./Popup/SoundPopup";
import { cMap } from "Data/Map";



export class CheakPopupViewData implements ViewBaseData {

    private currentTab: string;
    //key: title
    private chatTabMap: Map<string, {
        list: PopupBase<UiNode>[],
        waitHandlerAppend: boolean,
        waitChatRecordItemList: ChatRecordItem[],
    }> = new Map();
    private binderList: FunctionBinder[] = [];
    private popupOffset: number = 50;
    public cellIndexDic: cMap<number> = new cMap();


    public constructor(public view: CheakPopupView) {
        //AI聊天消息更新
        this.binderList.push(UiDataManager.bindFunctionData(BindKeyName.AIChatMessageUpDate, this.autoUpdateChatData.bind(this)));
        this.binderList.push(UiDataManager.bindFunctionData(BindKeyName.OnChangeChatTab, this.onChangeChatTab.bind(this)));
    }

    public initData() {

    }

    public dispose() {
        this.cellIndexDic.clear();
        this.cellIndexDic = null;
        for (let item of this.binderList) {
            UiDataManager.unBindFunctionDataByBinder(item);
        }
        //记得把所有气泡ui销毁
    }

    /**
     * 切换页签
     */
    private onChangeChatTab(tab: ChatTab) {
        if (tab.title === this.currentTab) {
            return;
        }
        if (this.chatTabMap.has(this.currentTab)) {
            let prevList = this.chatTabMap.get(this.currentTab).list;
            for (let item of prevList) {
                this.view.scrollRoot.removeChild(item.ui.transform);
                item.ui.transform.visible = false;
            }
        }
        this.currentTab = tab.title;
        if (this.chatTabMap.has(this.currentTab)) {
            let nowList = this.chatTabMap.get(this.currentTab).list;
            for (let item of nowList) {
                this.view.scrollRoot.addChild(item.ui.transform);
                item.ui.transform.visible = true;
            }
        } else {
            this.chatTabMap.set(this.currentTab, {
                list: [],
                waitChatRecordItemList: [],
                waitHandlerAppend: false,
            });
        }

        if (tab.scrollHeight < this.view.scrollMinHeight) {
            tab.scrollHeight = this.view.scrollMinHeight;
        }
        if (tab.needRefresh && tab.needRefreshIndex >= 0) {
            //刷新滑动组件高度
            let tempData = this.chatTabMap.get(this.currentTab).list;
            let popupBase = tempData[tab.needRefreshIndex];
            //刷新后面气泡的位置
            let newHeight = popupBase.getHeight();
            let y = popupBase.topValue + newHeight + this.popupOffset;
            for (let i = tab.needRefreshIndex + 1; i < tempData.length; i++) {
                let tempBase = tempData[i];
                tempBase.ui.transform.setLayoutValue(m4m.framework.layoutOption.TOP, y);
                tempBase.topValue = y;
                y += tempBase.getHeight() + this.popupOffset;
            }

            //滑动组件高度
            y -= this.popupOffset;
            tab.scrollHeight = y;
            this.view.scroll.scrollRect.content.transform.height = y;
        } else {
            this.view.scroll.scrollRect.content.transform.height = tab.scrollHeight;
        }

        tab.needRefresh = false;
        tab.needRefreshIndex = -1;
        //回到底部
        this.goBottom();
    }

    // -------------------------------------------------------------------------------


    /**
     * 根据数据自动判断是需要调用 appendChatData() 还是 updateChatData()
     */
    private autoUpdateChatData(data: ChatMessageUpdateResult) {
        if (!data.isRefresh) {
            this.appendChatData(data.chatRecordItem);
        } else {
            this.updateChatData(data.chatRecordItem, data.refreshIndex);
        }
    }

    /**
     * 初始化气泡数据, 请在初始化时调用, 这个函数会刷新整个聊天列表, 所以速度较慢, 如果要更新单条数据, 请使用 appendChatData() 和 updateChatData()
     */
    private initChatData() {
        
    }

    
    /**
     * 往后插入一条聊天数据, 该函数不会刷新整个列表, 性能较好
     */
    private appendChatData(data: ChatRecordItem) {
        let temp = this.chatTabMap.get(data.chatTitle);
        if (temp.waitHandlerAppend) {
            temp.waitChatRecordItemList.push(data);
            return;
        }
        this.handlerAppendChatData(data);
    }

    private handlerAppendChatData(data: ChatRecordItem) {
        let tab = ChatMessageDataManager.Instance.getChatTab(data.chatTitle);
        if (!tab) {
            console.error("未找到聊天页签: " + data.chatTitle);
            return;
        }
        let temp = this.chatTabMap.get(data.chatTitle);
        temp.waitHandlerAppend = true;
        //console.log("插入新的聊天数据: ", data.originData);
        let tempData = temp.list;
        let templateUi = this.getCloneTemplateUi(data);

        let popupBase = this.handlerUi(data, templateUi, tempData.length, tempData);
        popupBase.ui.transform.transform.visible = true;
        this.view.scrollRoot.addChild(popupBase.ui.transform);
        tempData.push(popupBase);

        //设置y坐标
        let y = 0;
        for (let i = 0; i < tempData.length - 1; i++) {
            let item = tempData[i];
            y += item.getHeight() + this.popupOffset;
        }
        popupBase.ui.transform.setLayoutValue(m4m.framework.layoutOption.TOP, y);
        popupBase.topValue = y;
        popupBase.onInit();

        //是当前页面才能刷新
        let currentTab = this.currentTab;
        if (data.chatTitle === currentTab) {
            tab.needRefreshIndex = -1;
            tab.needRefresh = false;
        } else {
            tab.needRefreshIndex = popupBase.index;
            tab.needRefresh = true;
        }


        popupBase.data = data;
        popupBase.onSetData(data, true);

        //刷新滑动组件高度
        FrameMgr.nextFrameCall(() => {
            FrameMgr.nextFrameCall(() => {
                //设置y坐标
                let y = 0;
                for (let i = 0; i < tempData.length - 1; i++) {
                    let item = tempData[i];
                    y += item.getHeight() + this.popupOffset;
                }
                if (data.chatTitle === currentTab) {
                    //滑动组件高度
                    y += popupBase.getHeight();
                    if (y > this.view.scrollMinHeight) {
                        console.log("更新滑动组件高度...");
                        tab.scrollHeight = y;
                        this.view.scroll.scrollRect.content.transform.height = y;
                        //回到底部
                        this.goBottom();
                    }
                }

                if (temp.waitChatRecordItemList.length > 0) {
                    FrameMgr.nextFrameCall(() => {
                        this.handlerAppendChatData(temp.waitChatRecordItemList.shift());
                    });
                } else {
                    temp.waitHandlerAppend = false;
                }
            });
        });
    }

    /**
     * 更新某个索引位置的聊天数据, 该函数不会刷新这个列表, 性能较好
     */
    private updateChatData(data: ChatRecordItem, index: number) {
        let tab = ChatMessageDataManager.Instance.getChatTab(data.chatTitle);
        if (!tab) {
            console.error("未找到聊天页签: " + data.chatTitle);
            return;
        }
        //console.log("更新聊天数据: ", data.originData);
        
        let temp = this.chatTabMap.get(data.chatTitle);
        let tempData = temp.list;
        let popupBase = tempData[index];

        if (!popupBase && temp.waitHandlerAppend) {
            let index = temp.waitChatRecordItemList.findIndex((value) => value.originData.id == data.originData.id);
            if (index >= 0) {
                temp.waitChatRecordItemList[index] = data;
            }
            return;
        }

        let prevHeight = popupBase.getHeight();
        popupBase.data = data;
        popupBase.onSetData(data, false);
        
        //是当前页面才能刷新
        if (data.chatTitle === this.currentTab) {
            tab.needRefreshIndex = -1;
            tab.needRefresh = false;
            FrameMgr.nextFrameCall(() => {
                FrameMgr.nextFrameCall(() => {
                    //刷新后面气泡的位置
                    let newHeight = popupBase.getHeight();
                    //如果高度发生变化
                    if (newHeight !== prevHeight) {
                        let y = popupBase.topValue + newHeight + this.popupOffset;
                        for (let i = index + 1; i < tempData.length; i++) {
                            let tempBase = tempData[i];
                            tempBase.ui.transform.setLayoutValue(m4m.framework.layoutOption.TOP, y);
                            tempBase.topValue = y;
                            y += tempBase.getHeight() + this.popupOffset;
                        }

                        //滑动组件高度
                        y -= this.popupOffset;
                        if (y > this.view.scrollMinHeight && (y < 39610 || y > 39620)) {
                            // let nowY = -this.getScrollOffset().y;
                            // let num = (nowY - this.view.scrollStartY) / (this.view.scroll.scrollRect.content.transform.height - this.view.scrollHeight);
                            // let flag = num >= 0.99;

                            console.log("更新滑动组件高度...", y);
                            tab.scrollHeight = y;
                            this.view.scroll.scrollRect.content.transform.height = y;
                            //debugger
                            this.goBottom();
                        }
                    }
                });
            });
        } else {
            if (tab.needRefreshIndex < 0 || popupBase.index < tab.needRefreshIndex) {
                tab.needRefreshIndex = popupBase.index;
            }
            tab.needRefresh = true;
        }
    }


    /**
     * 回到滑动组件底部
     */
    private goBottom() {
        let ctrans = this.view.scroll.scrollRect.content.transform;
        let cpos = ctrans.localTranslate;
        ctrans.localTranslate = new m4m.math.vector2(cpos.x, -(ctrans.height - this.view.scroll.scrollRect.transform.height));
        ctrans.markDirty();
    }

    /**
     * 获取滑动组件偏移量
     */
    public getScrollOffset(): m4m.math.vector2 {
        return this.view.scroll.scrollRect.content.transform.localTranslate;
    }

    private getCloneTemplateUi(data: ChatRecordItem): UiNode {
        if (!data.isAi) {
            return UiTools.cloneUi(this.view.getUserHeadTemplate());
        }
        if (data.type === AIChatDataType.text) {
            let popup = UiTools.cloneUi(this.view.getTextTemplate());
            let head = UiTools.cloneUi(this.view.getAiHeadTemplate());
            head.transform.visible = true;
            head.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, -head.transform.width - 15);
            popup.transform.addChild(head.transform);
            return popup;
        }
        if (data.type === AIChatDataType.picture) {
            let popup = UiTools.cloneUi(this.view.getImageTemplate());
            let head = UiTools.cloneUi(this.view.getAiHeadTemplate());
            head.transform.visible = true;
            head.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, -head.transform.width - 15);
            popup.transform.addChild(head.transform);
            return popup;
        }
        if (data.type === AIChatDataType.sound) {
            let popup = UiTools.cloneUi(this.view.getMusicTemplate());
            let head = UiTools.cloneUi(this.view.getAiHeadTemplate());
            head.transform.visible = true;
            head.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, -head.transform.width - 15);
            popup.transform.addChild(head.transform);
            return popup;
        }
    }

    private handlerUi(data: ChatRecordItem, templateUi: UiNode, index: number, popupList: PopupBase<UiNode>[]): PopupBase<UiNode> {
        let base: PopupBase<UiNode> = null;
        if (!data.isAi) {
            base = new UserTextPopup(index, templateUi as any, popupList,this);
        } else if (data.type === AIChatDataType.text) {
            base = new TextPopup(index, templateUi as any, popupList,this);
        } else if (data.type === AIChatDataType.picture) {
            base = new ImagePopup(index, templateUi as any, popupList,this);
        } else if (data.type === AIChatDataType.sound) {
            base = new SoundPopup(index, templateUi as any, popupList,this);
        }
        return base;
    }
}