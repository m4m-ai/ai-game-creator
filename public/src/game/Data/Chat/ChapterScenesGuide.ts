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
import { EditorManager } from "../../Manager/EditorManager";
import { BindKeyName } from "../BindKeyName";
import { ChapterInfo } from "../ChapterInfo";
import { ChatRecordItem } from "../DataType";
import { SceneInfo } from "../SceneInfo";
import { ChatGuide } from "./ChatGuide";
import { ChatApiType } from "../EnumType";

const preinstall = ["生成主角拯救世界的故事"];

class ChapterScenesGuide0 extends ChatGuide {
    public message = `您好！我是AI，请大致描述您的故事，并由我们来为您生成故事章节和场景。`;

    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam() {
        return {
            chapterCount: 6
        }
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 1;
        //随机生成
        chatItem.customButton = {
            text: "随机生成",
            callback: () => {
                ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 1;
                let userMessage = ChatGuide.randomChoose(preinstall);
                ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, userMessage, "随机生成");
            }
        };
    }
}

class ChapterScenesGuide1 extends ChatGuide {
    public callApiType = ChatApiType.chapterScenes;

    private userMessage: string;

    public onUserActiveSendMessage(message: string): void {
        this.userMessage = message;
    }
    public onGetUserSendMessageParam() {
        return {
            chapterCount: 6
        }
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            //重新生成
            chatItem.regenBtn = {
                text: "重新生成",
                callback: () => {
                    if (this.userMessage) {
                        ChatMessageDataManager.Instance.sendMessage(chatItem.chatTitle, this.userMessage, "重新生成");
                    }
                }
            }
            //应用
            chatItem.customButton = {
                text: "应用章节场景",
                callback: () => {
                    if (chatItem.originData.jsonType === "ChapterData" && chatItem.originData.jsondata!=null) {
                        console.error(chatItem.originData.jsondata);
                        let chapterData: Entity.ChapterData[] = JSON.parse(chatItem.originData.jsondata);
                        if(chapterData==null)
                        {
                            console.error("章节数据出错!");
                            return;
                        }
                        ChatGuide.galChapterDataResult = chapterData;
                        for (let item of chapterData) {
                            let chapter = new ChapterInfo(item.id, item.ChapterName);
                            for (let i = 0; i < item.scenes.length; i++) {
                                chapter.appendScene(new SceneInfo(item.scenes[i], item.scensName[i]));
                            }
                            EditorManager.Instance.appendChapter(chapter);
                        }

                        ChatMessageDataManager.Instance.sendMessage(chatItem.originData.title, "应用章节场景", false);
                        UiDataManager.changeFunctionData(BindKeyName.OnRefreshChapter, null)
                        ChatMessageDataManager.Instance.sendMessageToUser(chatItem.originData.title, "已应用应用章节场景");
                        ChatMessageDataManager.Instance.runGuideFinish(ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title));
                    }
                }
            };
        }
    }
}


export const chapterScenesGuideList: ChatGuide[] = [
    new ChapterScenesGuide0(),
    new ChapterScenesGuide1()
];