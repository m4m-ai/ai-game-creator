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
import { ChatMessageDataManager } from "../../Manager/ChatMessageDataManager";
import { AIChatDataType, ChatRecordItem } from "../DataType";
import { ChatGuide } from "./ChatGuide";
import { BindKeyName } from "../BindKeyName";
import { ChatApiType } from "../EnumType";
import { GameProjectManager } from "../../Manager/GameProjectManager";

let userRoleDescription: string;

const preinstall = ["生成男主角", "生成女主角", "生成男配角", "生成女配角", "生成男反派", "生成女反派", "生成最终boss"];

class RoleSettingGuide0 extends ChatGuide {

    public message: string = `您好！我是AI，我们来给您的游戏创建角色设定。\n您需要简单描述一下您的角色。\n例如：是男女主角/反派、NPC, 他有XXXXXX（一些特征）`;

    public onUserActiveSendMessage(message: string): void {
        userRoleDescription = message;
    }
    public onGetUserSendMessageParam() {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 1;
        //随机生成
        chatItem.customButton = {
            text: "随机生成",
            callback: () => {
                userRoleDescription = ChatGuide.randomChoose(preinstall);
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, userRoleDescription, "随机生成");
            }
        };
    }
}

class RoleSettingGuide1 extends ChatGuide {

    public callApiType = ChatApiType.role;


    public onUserActiveSendMessage(message: string): void {
        userRoleDescription = message;
    }
    public onGetUserSendMessageParam() {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            //设置重新生成按钮
            chatItem.regenBtn = {
                text: "重新生成",
                callback: () => {
                    if (userRoleDescription) {
                        ChatMessageDataManager.Instance.sendMessage(chatItem.chatTitle, userRoleDescription, "重新生成");
                    }
                }
            }
            //应用
            chatItem.customButton = {
                text: "应用角色设定",
                callback: () => {
                    if (chatItem.originData.jsonType === "RoleData" && chatItem.originData.jsondata) {
                        let roldData: Entity.GalRoleData = JSON.parse(chatItem.originData.jsondata);
                        console.error(roldData);
                        ChatGuide.galRoleDataResult = roldData;
                        UiDataManager.changeFunctionData(BindKeyName.OnAiSetRoleSetting, {
                            roleName: roldData.RoleName,
                            roleSetting: roldData.Profile,
                            RoleDefinition: roldData.RoleDefinition,
                        });
                        ChatMessageDataManager.Instance.sendMessage(chatItem.originData.title, "应用角色设定", false);
                        ChatMessageDataManager.Instance.sendMessageToUser(chatItem.originData.title, "已应用角色设定");
                        ChatMessageDataManager.Instance.runGuideFinish(ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title));
                    }
                }
            };
        }
    }
}

class RoleSettingGuide2 extends ChatGuide {
    public message = `是否为您生成角色立绘?`;
    public callApiType = ChatApiType.rolePortrait;

    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam() {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        //生成角色立绘
        chatItem.customButton = {
            text: "生成角色立绘",
            callback: () => {
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle,
                    "性别: " + ChatGuide.galRoleDataResult.Gender + ", " +
                    ChatGuide.galRoleDataResult.Appearance, "生成角色立绘");
                ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 3;
            }
        };
    }
}
class RoleSettingGuide3_0 extends ChatGuide {
    public callApiType = ChatApiType.rolePortrait;
    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam() {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            //应用角色立绘
            chatItem.useButton = {
                text: "选择当前图片",
                callback: (key: number,chatID:string) => {
                    let path = ChatMessageDataManager.Instance.getResFullPath(chatItem.originData.images[key]);
                    console.error(this.callApiType,"选择当前图片: ", key, path);
                    //
                    ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, ChatGuide.galRoleDataResult.Appearance, "",{callApiType:ChatApiType.roleEmote,chatID,path});

                    // UiDataManager.changeFunctionData(BindKeyName.OnAiSetRoleSetting, {
                    //     standingPainting: {
                    //         "normal": path
                    //     },
                    // })
                    // ChatMessageDataManager.Instance.sendMessageToUser(chatItem.originData.title, "已应用到角色立绘");
                    // ChatMessageDataManager.Instance.runGuideFinish(ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title));
                }
            };
            chatItem.moreButton = {
                text: "生成更多2",
                callback: (chatID: string) => {
                    // console.log("生成更多", ChatMessageDataManager.Instance.selectTabTitle, ChatGuide.galRoleDataResult.Appearance);
                    //生成更多按钮
                    ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, ChatGuide.galRoleDataResult.Appearance, "",{callApiType:ChatApiType.roleEmote,chatID});
                }
            }
        }
    }
}

//表情
class RoleSettingGuide3_1 extends ChatGuide {
    public callApiType = ChatApiType.rolePortrait;
    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam() {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            //应用角色立绘
            chatItem.useButton = {
                text: "应用",
                callback: (key: number) => {
                    let path = ChatMessageDataManager.Instance.getResFullPath(chatItem.originData.images[key]);
                    //console.log("应用图片: ", key, path);
                    UiDataManager.changeFunctionData(BindKeyName.OnAiSetRoleSetting, {
                        standingPainting: {
                            "normal": path
                        },
                    })
                    ChatMessageDataManager.Instance.sendMessageToUser(chatItem.originData.title, "已应用到角色立绘");
                    ChatMessageDataManager.Instance.runGuideFinish(ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title));
                }
            };
            chatItem.moreButton = {
                text: "生成更多",
                callback: (chatID: string) => {
                    console.log("生成更多", ChatMessageDataManager.Instance.selectTabTitle, ChatGuide.galRoleDataResult.Appearance);
                    //生成更多按钮
                    ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, ChatGuide.galRoleDataResult.Appearance, "",{callApiType:ChatApiType.rolePortrait,chatID});
                }
            }
        }
    }
}

class RoleSettingGuide4 extends ChatGuide {

    public message: string = "请选择角色声线，已为您生成以下声线可供选择：";

    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam() {

    }

    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        chatItem.type = AIChatDataType.sound;
        let list = GameProjectManager.instance.prviewVoiceList;
        chatItem.originData.sounds = {};
        for (let item of list) {
            chatItem.originData.sounds[item.id] = "AiFiles/VoiceSimple/" + item.fileName;
        }
        chatItem.useButton = {
            text: "选择",
            callback: (id: string) => {
                let temp = list.find((item) => item.id === id);
                if (temp) {
                    UiDataManager.changeFunctionData(BindKeyName.OnAiSetRoleSetting, {
                        voice: {
                            name: temp.desc,
                            value: temp.id
                        }
                    })
                }
            }
        }
    }
}

export const roleSettingGuideList: ChatGuide[] = [
    new RoleSettingGuide0(),
    new RoleSettingGuide1(),
    new RoleSettingGuide2(),
    // new RoleSettingGuide3_0(),
    new RoleSettingGuide3_1(),
    new RoleSettingGuide4()
];