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
import { SkipBoxManager } from "../../Manager/SkipBoxManager";


class StoryImportGuide0 extends ChatGuide {
    public message = `您好！我是AI，请输入您的故事或小说，我将为您生成背景设定，角色列表和场景列表。`;

    public onUserActiveSendMessage(message: string): void {

    }
    public onGetUserSendMessageParam(message: string) {

    }
    public customHanderChatRecordItem(chatItem: ChatRecordItem): void {
        ChatMessageDataManager.Instance.getChatTab(chatItem.originData.title).guideIndex = 1;
    }
}

class StoryImportGuide1 extends ChatGuide {
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
                    try {
                        let data = JSON.parse(chatItem.originData.content);
                        if (!data.chapterData[0].sceneData) {
                            SkipBoxManager.Instance.ShowSkipBox("生成数据解析错误，请重新输入您的故事或小说");
                            return
                        }

                        StoryImportManager.Instance.dataImport = data;

                        this.setNewBackstoryDataFun(data.storySetting, data.gameName);

                        for (let index = 0; index < StoryImportManager.Instance.dataImport.characterData.length; index++) {
                            const role = StoryImportManager.Instance.dataImport.characterData[index];
                            this.AddRole(role);
                        }

                        this.AddChapterScenes(data.chapterData);

                        setTimeout(() => {
                            PlayerGuideManager.instance.StoryGuideIndex(StoryIndexType.storyImport);
                        }, 50)
                    } catch (error) {
                        SkipBoxManager.Instance.ShowSkipBox("生成数据解析错误，请重新输入您的故事或小说");
                    }
                }
            };
        }
    }

    private setNewBackstoryDataFun(storySetting: string, gameName: string) {
        GameProjectManager.instance.currentBackStoryData = new BackStoryData();
        GameProjectManager.instance.currentBackStoryData.id = GameProjectManager.instance.currentGalData.id;
        GameProjectManager.instance.currentBackStoryData.backStory = storySetting;
        GameProjectManager.instance.currentBackStoryData.worldName = gameName;
        let backStoryStr = JSON.stringify(GameProjectManager.instance.currentBackStoryData)
        ProjectBasicSettingsManagerRequest.Instance.SetBackStory(GameProjectManager.instance.currentGalData.id, backStoryStr);
    }

    public AddRole(role) {
        let currentRoleUUid = ChapterSceneDirectoryManager.Instance.uuid();
        let currentGalroleData = new GalRoleData();
        currentGalroleData = new GalRoleData();
        currentGalroleData.id = currentRoleUUid;
        currentGalroleData.RoleName = role.name;
        currentGalroleData.Gender = role.gender;
        currentGalroleData.RoleDefinition = role.rolePositioning;
        currentGalroleData.Appearance = role.characterDesign;
        currentGalroleData.Profile = role.characterDesign;
        currentGalroleData.exitScene = "";
        currentGalroleData.roleDrawing = { "normal": "" };//["normal"]
        currentGalroleData.voiceID = "";
        RoleSettingManager.instance.newAddRoleData(currentGalroleData);
        StoryImportManager.Instance.getRoleDataList.push(currentGalroleData);
    }

    public AddChapterScenes(chapterData) {
        if (chapterData == null) {
            console.error("章节数据出错!");
            return;
        }
        let data: ChapterData[] = [];
        let sceneDataList: SceneData[] = [];
        for (let index = 0; index < chapterData.length; index++) {
            let chapter = new ChapterData();
            const element = chapterData[index];
            chapter.id = ChapterSceneDirectoryManager.Instance.uuid();
            chapter.galID == GameProjectManager.instance.currentGalData.id;
            chapter.ChapterName = element.chapterName
            chapter.storyOutLine = element.chapterDesc
            chapter.scenes = [];
            chapter.scensName = [];
            if (element.sceneData) {
                for (let index = 0; index < element.sceneData.length; index++) {
                    const scene = element.sceneData[index];
                    let scenedata = new SceneData();
                    scenedata.ChapterId = chapter.id;
                    scenedata.id = ChapterSceneDirectoryManager.Instance.uuid();
                    scenedata.galID = GameProjectManager.instance.currentGalData.id;
                    scenedata.sceneName = scene.sceneName;
                    scenedata.storyOutLine = scene.sceneDesc;

                    chapter.scenes.push(scenedata.id);
                    chapter.scensName.push(scenedata.sceneName);
                    sceneDataList.push(scenedata);
                    StoryImportManager.Instance.sceneDataList.push(scenedata);
                }
            }
            data.push(chapter);
            StoryImportManager.Instance.ChapterDataList.push(chapter);

        }
        ChatGuide.galChapterDataResult = data as unknown as Entity.ChapterData[];
        for (let item of data) {
            let chapter = new ChapterInfo(item.id, item.ChapterName);
            for (let i = 0; i < item.scenes.length; i++) {
                chapter.appendScene(new SceneInfo(item.scenes[i], item.scensName[i]));
            }
            EditorManager.Instance.appendChapter(chapter);
        }
    }
}



export const StoryImportGuideGuideList: ChatGuide[] = [
    new StoryImportGuide0(),
    new StoryImportGuide1(),
];