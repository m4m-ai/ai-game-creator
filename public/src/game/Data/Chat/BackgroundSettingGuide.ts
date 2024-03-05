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
import { UiDataManager } from "PSDUI/UiDataManager";
import { AIChatDataType, ChatRecordItem } from "../DataType";
import { ChatGuide } from "./ChatGuide";
import { BindKeyName } from "../BindKeyName";
import { ChatMessageDataManager } from "../../Manager/ChatMessageDataManager";
import { ChatApiType } from "../EnumType";

let userBackgroundDescription: string;

const preinstall = ["生成中土世界", "生成剑与魔法的世界", "生成赛博朋克世界", "生成龙与魔法的世界", "生成魔兽世界", "生成原始世界", "生成现代世界"];

class BackgroundSettingGuide0 extends ChatGuide {

    public message: string = "你好，我是AI，我们先来给您的游戏创建背景设定，您需要简单描述下您想要的游戏世界。\n例如：请为我构思一个赛博朋克世界观的背景设定";

    public onUserActiveSendMessage(message: string): void {
        
    }
    public onGetUserSendMessageParam() {
        
    }

    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 1;
        //随机生成
        chatItem.customButton = {
            text: "随机生成",
            callback: () => {
                userBackgroundDescription = ChatGuide.randomChoose(preinstall);
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, userBackgroundDescription, "随机生成");
            }
        };
    }
}

class BackgroundSettingGuide1 extends ChatGuide {
    public callApiType: ChatApiType = ChatApiType.backgroundSetting;

    public onUserActiveSendMessage(message: string): void {
        userBackgroundDescription = message;
    }
    public onGetUserSendMessageParam(message: string) {
        
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            //设置重新生成按钮
            chatItem.regenBtn = {
                text: "重新生成",
                callback: () => {
                    if (userBackgroundDescription) {
                        ChatMessageDataManager.Instance.sendMessage(chatItem.chatTitle, userBackgroundDescription, "重新生成");
                    }
                }
            }
            //应用
            chatItem.customButton = {
                text: "应用背景设定",
                callback: () => {
                    if (chatItem.originData.jsonType === "BackStoryData" && chatItem.originData.jsondata) {
                        let result: Entity.BackStoryData = JSON.parse(chatItem.originData.jsondata);
                        ChatGuide.backStoryDataResult = result;
                        UiDataManager.changeFunctionData(BindKeyName.OnAiSetBasicSettings, {
                            backgroundSetting: result.backStory,
                        });
                        ChatMessageDataManager.Instance.sendMessage(chatItem.originData.title, "应用背景设定", false);
                        ChatMessageDataManager.Instance.sendMessageToUser(chatItem.originData.title, "已应用到背景设定");
                        ChatMessageDataManager.Instance.runGuideFinish(ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title));
                    }
                }
            };
        }
    }
}

class BackgroundSettingGuide2 extends ChatGuide {

    public message: string = "是否为您生成项目名称?";
    public callApiType: ChatApiType = ChatApiType.projectName;

    public onUserActiveSendMessage(message: string): void {
        
    }
    public onGetUserSendMessageParam() {
        return {
            backStory: ChatGuide.backStoryDataResult.backStory
        }
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        //应用
        chatItem.customButton = {
            text: "生成项目名称",
            callback: () => {
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, "", "生成项目名称");
                ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 3;
            }
        };
    }
}

class BackgroundSettingGuide3 extends ChatGuide {
    public callApiType: ChatApiType = ChatApiType.projectName;

    public onUserActiveSendMessage(message: string): void {
        
    }
    public onGetUserSendMessageParam() {
        return {
            backStory: ChatGuide.backStoryDataResult.backStory
        }
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            chatItem.compelDisplayButton = true;
            //重新生成
            chatItem.regenBtn = {
                text: "重新生成",
                callback: () => {
                    ChatMessageDataManager.Instance.sendMessage(chatItem.chatTitle, "", "重新生成");
                }
            }
            //应用
            chatItem.customButton = {
                text: "应用项目名称",
                callback: () => {
                    UiDataManager.changeFunctionData(BindKeyName.OnAiSetBasicSettings, {
                        gameName: chatItem.originData.content,
                    });
                    ChatMessageDataManager.Instance.sendMessage(chatItem.originData.title, "应用项目名称", false);
                    ChatMessageDataManager.Instance.sendMessageToUser(chatItem.originData.title, "已应用到项目名称");
                }
            };
        }
    }
}

export const backgroundSettingGuideList: ChatGuide[] = [
    new BackgroundSettingGuide0(),
    new BackgroundSettingGuide1(),
    new BackgroundSettingGuide2(),
    new BackgroundSettingGuide3()
];