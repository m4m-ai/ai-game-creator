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
import { ChatGuide } from "./ChatGuide";
import { GameProjectManager } from "../../Manager/GameProjectManager";
import { ChatApiType } from "../EnumType";
import { ChatMessageDataManager } from "../../Manager/ChatMessageDataManager";
import { RoleSettingManager } from "../../Manager/RoleSettingManager";
import { GalRoleData } from "GalRoleData";
import { ChapterSceneDirectoryManager } from "../../Manager/ChapterSceneDirectoryManager";
import { SceneInfo } from "../SceneInfo";
import { ChapterInfo } from "../ChapterInfo";
import { EditorManager } from "../../Manager/EditorManager";
import { ChapterData } from "ChapterData";
import { SceneData } from "SceneData";
import { BackStoryData } from "BackStoryData";
import { ProjectBasicSettingsManagerRequest } from "../../AutoCode/Net/ClientRequest/ProjectBasicSettingsManagerRequest";
import { PlayerGuideManager, StoryIndexType } from "../../Manager/PlayerGuideManager";
import { StoryImportManager } from "../../Manager/StoryImportManager";
import { UIOpenOrHideManager } from "../../Manager/UIOpenOrHideManager";



class AutomatedImportGuide0 extends ChatGuide {
    public message = `您好！我是AI，请输入您的故事或小说，我将为您生成背景设定，角色列表，场景列表，场景对话，。`;

    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam(message: string) {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 1;
    }
}

class AutomatedImportGuide1 extends ChatGuide {
    public callApiType: ChatApiType = ChatApiType.storyImport;

    public message: string = "数据正在生成...";

    public onUserActiveSendMessage(message: string): void {

    }

    public onGetUserSendMessageParam(message: string) {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            //设置重新生成按钮
            chatItem.regenBtn = {
                text: "取消",
                callback: () => {
                }
            }
            //应用
            chatItem.customButton = {
                text: "应用",
                callback: () => {
                    setTimeout(() => {
                        // PlayerGuideManager.instance.StoryGuideIndex(StoryIndexType.storyImport);
                        UIOpenOrHideManager.Instance.HideChatbackgroundView();
                        PlayerGuideManager.instance.guideStepIndex = 7;
                        PlayerGuideManager.instance.lastStepIndex = 5;
                        PlayerGuideManager.instance.setUIshowByIndex(PlayerGuideManager.instance.guideStepIndex, PlayerGuideManager.instance.lastStepIndex, true);
                    }, 50)
                }
            };
        }
    }
}



export const AutomatedImportGuideList: ChatGuide[] = [
    new AutomatedImportGuide0(),
    new AutomatedImportGuide1(),
];