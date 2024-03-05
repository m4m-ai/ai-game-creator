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
import { BindKeyName } from "../BindKeyName";
import { ChatRecordItem } from "../DataType";
import { ChatGuide } from "./ChatGuide";
import { ChapterSceneDirectoryManager } from "../../Manager/ChapterSceneDirectoryManager";
import { ChatApiType } from "../EnumType";
import { AppMain } from "../../appMain";
import { BuildType } from "../../GameEnum";

let userMessage: string;
const preinstall = ["花园", "森林", "村庄", "农田"];

class BackgroundImageGuide0 extends ChatGuide {
    public message = `您好！我是AI，请简单描述一下当前场景，我们会为您生成场景背景图片。`;

    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam() {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 1;

        if (AppMain.buildType == BuildType.StoryType) {
            //随机生成
            chatItem.customButton = {
                text: "生成",
                callback: () => {
                    // userMessage = ChatGuide.randomChoose(preinstall);
                    let SceneData = ChapterSceneDirectoryManager.Instance.SceneData;
                    userMessage = SceneData.sceneName;
                    ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, userMessage, "生成");
                }
            };
        } else {
            //随机生成
            chatItem.customButton = {
                text: "随机生成",
                callback: () => {
                    userMessage = ChatGuide.randomChoose(preinstall);
                    ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, userMessage, "随机生成");
                }
            };
        }
    }
}

// class BackgroundImageGuide0 extends ChatGuide {
//         public message = `测试生成语音`;
//         public callApiType: ChatApiType = ChatApiType.sceneDaiglogVoices;
//         public onUserActiveSendMessage(message: string): void {

//         }
//         public onGetUserSendMessageParam() {
//             let selectScene = ChapterSceneDirectoryManager.Instance.SceneData;
//             return {
//                 sceneId: selectScene.id,
//                 chapterId: selectScene.chapter.id,
//             }
//         }
//         public customHanderChatRecordItem(chatItem: ChatRecordItem): void {

//         }
//     }

class BackgroundImageGuide1 extends ChatGuide {
    public callApiType = ChatApiType.backgroundImage;
    public onUserActiveSendMessage(message: string): void {
        userMessage = message;
    }
    public onGetUserSendMessageParam() {
        let selectScene = ChapterSceneDirectoryManager.Instance.SceneData;
        return {
            sceneId: selectScene.id,
            chapterId: selectScene.chapter.id,
            chatID: null,
        }
    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        if (chatItem.isFromServer) {
            //应用背景图片
            chatItem.useButton = {
                text: "应用",
                callback: (key: number) => {
                    let path = ChatMessageDataManager.Instance.getResFullPath(chatItem.originData.images[key]);
                    //console.log("应用图片: ", key, path);
                    UiDataManager.changeFunctionData(BindKeyName.OnAiSetSceneDialog, {
                        image: path,
                        imageDescription: userMessage,
                        imageName: "背景"
                    });
                }
            }
            //随机生成
            chatItem.moreButton = {
                text: "生成更多",
                callback: (chatID: string) => {
                    // console.error(chatID + "  %%  " + userMessage);
                    let param = this.onGetUserSendMessageParam();
                    param["chatID"] = chatID;
                    ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, userMessage, "", param);
                }
            };
        }
    }
}

export const backgroundImageGuideList: ChatGuide[] = [
    new BackgroundImageGuide0(),
    new BackgroundImageGuide1()
];