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
import { BindKeyName } from "Data/BindKeyName";
import { ChatTab } from "Data/DataType";
import { ViewBaseData } from "Data/ViewBaseData";
import { FunctionBinder, UiDataManager } from "PSDUI/UiDataManager";
import { ChatbackgroundView } from "./ChatbackgroundView";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";

export class ChatbackgroundViewData implements ViewBaseData {
    private binder2: FunctionBinder;
    private binder4: FunctionBinder;
    
    constructor(public view: ChatbackgroundView) {
        this.binder2 = UiDataManager.bindFunctionData(BindKeyName.OnChangeChatTab, this.onChangeChatTab.bind(this));
        this.binder4 = UiDataManager.bindFunctionData(BindKeyName.OnCreateChatTab, this.onCreateChatTab.bind(this));
    }
    
    //切换对话列表
    private onChangeChatTab(tab: ChatTab) {
        if (ChatMessageDataManager.Instance.hasChatTab(tab.title)) {
            let chatListGrid = this.view.chatListGrid;
            let index = -1;
            chatListGrid.forEachCell((cell) => {
                if (cell.cellData.title === tab.title) {
                    index = cell.index;
                    return false;
                }
            })
            chatListGrid.selectIndex = index;
        }
    }

    //创建聊天列表
    private onCreateChatTab(tabData: ChatTab) {
        let chatListGrid = this.view.chatListGrid;
        let list: ChatTab[] = [];
        let tabList = ChatMessageDataManager.Instance.currentTabList;
        for (let key in tabList) {
            list.push(tabList[key]);
        }
        list.reverse();
        chatListGrid.setDataList(list);
    }

    public dispose() {
        UiDataManager.unBindFunctionDataByBinder(this.binder2);
        UiDataManager.unBindFunctionDataByBinder(this.binder4);
    }
}