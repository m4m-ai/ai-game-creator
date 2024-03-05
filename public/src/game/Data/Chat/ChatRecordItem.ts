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
import { cMap } from "Data/Map";
import { AIChatDataType, AIChatSoundData, AIChatTextData, AiGuideMessageSelectButton, CustomButton } from "../DataType";
import { ChatMessageDataManager } from "../../Manager/ChatMessageDataManager";
import { ChatTabEnum } from "../EnumType";

//聊天内容数据
export class ChatRecordItem {
    
    public constructor(index: number, chatType: ChatTabEnum, originData: Entity.ChatMessageData) {
        this.index = index;
        this.chatType = chatType;
        this.chatTitle = originData.title;
        this.originData = originData;
    }
    
    public index: number;

    /** 是否来自服务器消息 */
    public isFromServer: boolean = false;
    /** 当前用户消息是否发送给服务器了 */
    public isSendToServer: boolean = false;

    /** 返回是否是ai */
    public get isAi() {
        return this.type != null && this.type !== AIChatDataType.user;
    }

    //聊天表数据
    public originData: Entity.ChatMessageData;

    public chatType: ChatTabEnum;
    public chatTitle: string;

    /** 聊天类型 */
    public type: AIChatDataType;
    /** AI 文本聊天 */
    public aiChatTextDic:cMap<AIChatTextData>;
    
    /** 选项按钮 */
    public selectBtn: AiGuideMessageSelectButton[];
    /** 是否开启多选 */
    public multipleChoice: boolean;
    
    /** 重新生成按钮 */
    public regenBtn: CustomButton;
    /** 自定义按钮 */
    public customButton: CustomButton;
    /** 强制显示按钮 */
    public compelDisplayButton: boolean = false;

    /** 用户聊天文本 */
    public userChatText: string;

    //图片说明文本
    public pictureDesText: string;
    public usePictureButton: CustomButton;
    //public pictureUrlList: AIChatPicData[];

    //声音说明文本
    public soundDesText: string;
    public soundUrlList: AIChatSoundData[];

    /**
     * 返回是否能显示按钮
     */
    public canShowButton() {
        //return this.originData.isOver && this.useButton && this.originData.jsondata != null && this.originData.jsondata.length > 0;
        return this.originData.isOver && this.customButton && 
        (
            this.compelDisplayButton ||
            (this.isFromServer && this.originData.jsondata != null && this.originData.jsondata.length > 0) ||
            !this.isFromServer
        );
    }

    /** 获取上一条对话 */
    public getPrevChatRecordItem() {
        let tab = ChatMessageDataManager.Instance.getChatTab(this.chatTitle);
        if (tab) {
            return tab.recordList[this.index - 1];
        }
        return null;
    }
}