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
import { ChatApiType } from "../EnumType";
import { ChatGuide } from "./ChatGuide";
import { BindKeyName } from "../BindKeyName";
import { GameProjectManager } from "../../Manager/GameProjectManager";
import { RoleSettingManager } from "../../Manager/RoleSettingManager";

class RolePortraitGuide0 extends ChatGuide {
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
                let roleArr = RoleSettingManager.instance.newGalRoleDataDic.get(GameProjectManager.instance.currentGalData.id);
                let roleIndex = roleArr.findIndex(value => value.id == RoleSettingManager.instance.currentRoleID);
                if (roleIndex != -1) {
                    let currentGalroleData = roleArr[roleIndex];
                    ChatGuide.galRoleDataResult = currentGalroleData;
                }
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle,
                    "性别: " + ChatGuide.galRoleDataResult.Gender + ", " +
                    ChatGuide.galRoleDataResult.Appearance, "生成角色立绘");
                ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 1;
            }
        };
    }
}


//表情
class RolePortraitGuide1 extends ChatGuide {
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
                    ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, ChatGuide.galRoleDataResult.Appearance, "", { callApiType: ChatApiType.rolePortrait, chatID });
                }
            }
        }
    }
}


class RolePortraitGuide2 extends ChatGuide {

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

export const RolePortraitGuideList: ChatGuide[] = [
    new RolePortraitGuide0(),
    new RolePortraitGuide1(),
    new RolePortraitGuide2()
];