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
import { RoleSettingManager } from "../../Manager/RoleSettingManager";
import { AiGuideMessageSelectButton, ChatRecordItem } from "../DataType";
import { ChatGuide } from "./ChatGuide";
import { BindKeyName } from "../BindKeyName";
import { ChapterSceneDirectoryManager } from "../../Manager/ChapterSceneDirectoryManager";
import { ChatApiType } from "../EnumType";

const preinstall = ["主角进入新手村", "主角发现危机", "反派的阴谋"];
let userMessage: string;

class SceneDialogueGuide0 extends ChatGuide {
    public message = `您好！我是AI，我们来为这个场景生成一段对话。\n请先为该对话场景选择角色（可多选）。以下是您已创建的角色。`;
    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam() {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        // let roleMap = RoleSettingManager.instance.getCurrentProjectRoles();
        let list: AiGuideMessageSelectButton[] = [];
        // roleMap.forEach((value) => {
        //     list.push({
        //         text: value.RoleName,
        //         data: value,
        //     });
        // });
        let roleArr = RoleSettingManager.instance.newGetCurrentProjectRoles();
        for (let i = 0; i < roleArr.length - 1; i++) {
            let roledata = roleArr[i];
            list.push({
                text: roledata.RoleName,
                data: roledata,
            });
        }
        //多选按钮
        chatItem.selectBtn = list;
        chatItem.multipleChoice = true;

        //选择
        chatItem.customButton = {
            text: "选择",
            callback: (data: AiGuideMessageSelectButton<Entity.GalRoleData>[]) => {
                ChatGuide.selectRole = [];
                for (let item of data) {
                    ChatGuide.selectRole.push(item.data);
                }
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, "使用角色: " + ChatGuide.selectRole.map((item) => item.RoleName).join("，"), false);
                ChatMessageDataManager.Instance.runGuideFinish(ChatMessageDataManager.Instance.getChatTab(ChatMessageDataManager.Instance.selectTabTitle));
            }
        }
    }
}

class SceneDialogueGuide1 extends ChatGuide {
    public message = `请简单描述一下在角色在这个场景发生的故事，我们会根据您描述的内容来生成角色对话内容。`;
    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam() {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 2;
        //随机生成
        chatItem.customButton = {
            text: "随机生成",
            callback: () => {
                ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 2;
                userMessage = ChatGuide.randomChoose(preinstall);
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, userMessage, "随机生成");
            }
        };
    }
}

class SceneDialogueGuide2 extends ChatGuide {
    public callApiType = ChatApiType.sceneDialogue;
    public onUserActiveSendMessage(message: string): void {
        userMessage = message;
    }
    public onGetUserSendMessageParam() {
        let selectScene = ChapterSceneDirectoryManager.Instance.SceneData;
        return {
            roles: ChatGuide.selectRole.map((item) => item.id),
            chapterId: selectScene.chapter.id,
            sceneId: selectScene.id
        }
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            chatItem.compelDisplayButton = true;
            //重新生成
            chatItem.regenBtn = {
                text: "重新生成",
                callback: () => {
                    if (userMessage) {
                        ChatMessageDataManager.Instance.sendMessage(chatItem.chatTitle, userMessage, "重新生成");
                    }
                }
            }
            //应用
            chatItem.customButton = {
                text: "应用场景对话",
                callback: () => {
                    let str = chatItem.originData.content.replace(/<[\w+=#/]+>/g, "");
                    UiDataManager.changeFunctionData(BindKeyName.OnAiSetSceneDialog, {
                        content: str
                    });
                    ChatMessageDataManager.Instance.runGuideFinish(ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title));
                }
            };
        }
    }
}

class SceneDialogueGuide3 extends ChatGuide {
    public message: string = "是否为您生成角色对话语音？";
    public onUserActiveSendMessage(message: string): void {
        
    }
    public onGetUserSendMessageParam(message: string) {
        
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        chatItem.customButton = {
            text: "生成对话语音",
            callback: () => {
                ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 4;
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, "", "随机生成");
            }
        };
    }
}

class SceneDialogueGuide4 extends ChatGuide {
    //public message: string = "是否为您生成角色对话语音？";
    public callApiType: ChatApiType = ChatApiType.sceneDaiglogVoices;
    public onUserActiveSendMessage(message: string): void {
        
    }
    public onGetUserSendMessageParam(message: string) {
        let selectScene = ChapterSceneDirectoryManager.Instance.SceneData;
        return {
            sceneId: selectScene.id,
            chapterId: selectScene.chapter.id,
        }
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            chatItem.useButton = {
                text: "重新生成",
                callback: () => {
                    console.log("点击了重新生成");
                }
            };
            chatItem.customButton = {
                text: "应用语音",
                callback: () => {
                    
                }
            };
        }
    }
}

export const sceneDialogueGuideList: ChatGuide[] = [
    new SceneDialogueGuide0(),
    new SceneDialogueGuide1(),
    new SceneDialogueGuide2(),
    new SceneDialogueGuide3(),
    new SceneDialogueGuide4()
];