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
import { ChatRecordItem } from "../DataType";
import { ChatApiType } from "../EnumType";

export abstract class ChatGuide {

    /**
     * 消息内容, 如果不为空, 则执行到这一步ai会发消息给用户, 消息内容为message
     */
    public message: string;

    /**
     * 执行当前引导步骤时, 用户给服务器发送消息调用的api类型, 如果为空, 则用户发送的消息不会发给服务器
     */
    public readonly callApiType: ChatApiType;

    /**
     * 用户主动发送消息给服务器时调用, 可用于记录用户消息
     */
    public abstract onUserActiveSendMessage(message: string): void;
    
    /**
     * 在用户给服务器发送消息前获取发给服务器的参数, 参数以 key - value 对象形式返回
     */
    public abstract onGetUserSendMessageParam(message: string): any | void;

    /**
     * 创建 ChatRecordItem 后自定义处理事件
     */
    public abstract customHanderChatRecordItem(chatItem: ChatRecordItem): void;

    /** 随机选择 */
    public static randomChoose<T>(list: T[]) {
        return list[this.randRangeInt(0, list.length - 1)];
    }

    /** 返回一个区间内的随机整数 */
    public static randRangeInt(min: number, max: number): number {
        if (min > max)
            return Math.floor(Math.random() * (min - max + 1) + max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    protected static backStoryDataResult: Entity.BackStoryData;
    protected static galRoleDataResult: Entity.GalRoleData;
    protected static galChapterDataResult: Entity.ChapterData[];
    protected static selectRole: Entity.GalRoleData[];
}