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
import { ChatMessageDataManager } from "../Manager/ChatMessageDataManager";
import { ChatApiType, ChatTabEnum } from "./EnumType";


/**
 * Ai回复数据
 */
export type ChatReplyData = {
    chatName: string;
    chatData: any;
}

/** 所有项目聊天数据(需要序列化) */
export type ProjectChatRecord = {
    /** key: 项目id */
    [key: string]: ChatTabList;
}

/** 项目中的聊天列表(需要序列化) */
export type ChatTabList = {
    /** key: 列表名称(对话名) */
    [key: string]: ChatTab;
}

/** 聊天页签(需要序列化) */
export type ChatTab = {
    /** 对话名 */
    title: string;
    /** 聊天类型 */
    type: ChatTabEnum;
    /** 创建事件 */
    time: number;
    /** 切换会页签是否需要刷新 */
    needRefresh: boolean;
    /** 从哪一步开始更新 */
    needRefreshIndex: number;
    /** 记录滑动组件高度 */
    scrollHeight: number;
    /** 引导进度 */
    guideIndex: number;
    /** 对话数据 */
    recordList: ChatRecordItem[];
};

export type CustomButton = {
    text: string,
    callback: Function;
};

export type AiGuideMessageSelectButton<T = any> = { text: string, data: T };

export type AiGuideMessage = {
    /** 发送的消息内容 */
    message?: string,
    /** 调用的api类型 */
    callApiType?: ChatApiType,
    /** 创建 ChatRecordItem 后自定义处理事件 */
    customHanderChatRecordItem?: (data: ChatRecordItem) => void;
    /** 获取用户发送给ai的参数 */
    onGetUserSendMessageParam?: (message: string) => any;
    /** 用户主动发送消息给服务器时调用, 可用于记录用户消息 */
    onUserActiveSendMessage?: (message: string) => void;

    [key: string]: any;
}

//chat
export enum AIChatDataType {
    /**
     * 用户
     */
    user = 1,
    /**
     * 文本
     */
    text = 2,
    /**
     * 图片
     */
    picture = 3,
    /**
     * 声音
     */
    sound = 4,
}

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

    /** 是否发生错误 */
    public isError: boolean = false;

    /** 聊天表数据 */
    public originData: Entity.ChatMessageData;
    /** 页签类型 */
    public chatType: ChatTabEnum;
    /** 页签标题 */
    public chatTitle: string;

    /** 聊天类型 */
    public type: AIChatDataType;
    /** AI 文本聊天 */
    public aiChatTextDic: cMap<AIChatTextData>;

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

    /** 生成更多按钮 */
    public moreButton: CustomButton;

    /** 选中图片/音效按钮 */
    public useButton: CustomButton;

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

//AI 文本聊天
export class AIChatTextData {
    //AI回复文本内容
    public aiContentText: string;
    //AI回复提示文本
    public aiTipsText: string;
}

// //图片信息
// export class AIChatPicData {
//     public id: string;
//     //图片url
//     public url: string;
//     public useCallback: () => void;
// }


//声音信息
export class AIChatSoundData {
    public id: string;
    //声音name
    public name: string;
    //声音url
    public url: string;
    // //时长(秒)
    // public time: number;
}

export class ChatMessageUpdateResult {
    chatRecordItem: ChatRecordItem;
    /** 是否只是刷新数据 */
    isRefresh: boolean;
    /** 如果是刷新数据, 刷新的索引索引 */
    refreshIndex?: number;
}