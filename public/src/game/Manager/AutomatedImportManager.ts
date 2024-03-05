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
import { BackStoryData } from "BackStoryData";
import { ProjectBasicSettingsManagerRequest } from "../AutoCode/Net/ClientRequest/ProjectBasicSettingsManagerRequest";
import { WebsocketTool } from "../AutoCode/Net/WebsocketTool";
import { AIChatSoundData, ChatRecordItem } from "../Data/DataType";
import { ChatMessageDataManager } from "./ChatMessageDataManager";
import { GameProjectManager } from "./GameProjectManager";
import { ChapterData } from "ChapterData";
import { SceneData } from "SceneData";
import { ChapterSceneDirectoryManager } from "./ChapterSceneDirectoryManager";
import { StoryImportManager } from "./StoryImportManager";
import { ChapterInfo } from "../Data/ChapterInfo";
import { SceneInfo } from "../Data/SceneInfo";
import { EditorManager } from "./EditorManager";
import { GalRoleData } from "GalRoleData";
import { RoleSettingManager } from "./RoleSettingManager";
import { ProjectRoleManagerRequest } from "../AutoCode/Net/ClientRequest/ProjectRoleManagerRequest";
import { StepPares } from "../Data/Process/StepPares";
import { ChatTabEnum } from "../Data/EnumType";
import { ChatMessageData } from "ChatMessageData";
import { BackGroundData } from "BackGroundData";
import { BackgroundPictureManager } from "./BackgroundPictureManager";
import { VoiceBase } from "VoiceBase";
import { ConversationStep } from "../Data/Process/ConversationStep";
import { StandingPaintingStep } from "../Data/Process/StandingPaintingStep";
import { StepType } from "../Data/Process/StepType";
import { VoiceStep } from "../Data/Process/VoiceStep";


export class StoryData {
    /**故事整体设定背景 */
    storySetting: string;
    /**故事的名称 */
    gameName: string;
    /**章节场景 */
    chapterData: ChapterList[];
    /**角色信息 */
    characterData: CharacterList[];
    backgroundData: backgroundList;
}

export class ChapterList {
    chapterName: string;
    chapterDesc: string;
    sceneData: SceneList
}

export class SceneList {
    sceneName: string;
    sceneDesc: string;
}


export class CharacterList {
    name: string;
    gender: string;
    rolePositioning: string;
    characterDesign: string;
    roleDrawing: string;
    voiceId: string;
}

export class backgroundList {
    image: string;
    imageDescription: string;
    imageName: string;
}

export class AutomatedImportManager {
    public static get Instance(): AutomatedImportManager {
        if (this._instance == null) {
            this._instance = new AutomatedImportManager()
        }
        return this._instance;
    }
    private static _instance: AutomatedImportManager;

    /** 聊天表数据 */
    public originData: ChatMessageData;

    /**当前角色ID */
    private roleName: string;

    private StroyImportdata: Entity.ChatMessageData;

    private roleindex: number = 0;

    private stroyData: StoryData;

    private chapterIndex: number = 0;

    private sceneIndex: number = 0;

    /**当前场景角色对话 */
    private SceneDialogud: Entity.ChatMessageData;

    public init(result, str) {

        this.originData = new ChatMessageData();

        if (result.title === "背景设定") {
            // str = str.replace(/^\{/, '');
            // str = str.replace(/\}$/, '');
            // str = str.replace(/",\n/g, '\n\n');
            // str = str.replace('  "worldName": "', '世界名称: ');
            // str = str.replace('  "backStory": "', '背景故事: ');
            // str = str.replace('  "camps": "', '势力: ');
            // str = str.replace('  "encapsulate": "', '简述: ');

            str = str.replace(/^\{/, '');
            str = str.replace(/\}$/, '');
            str = str.replace(/\n/g, '');
            str = str.replace(/ /g, '');//说是返回的空格应该是没有用的 暂时先全部替换掉
            str = str.replace(/\\\n/g, '\n');
            str = str.replace(/\\n/g, '\n');

            str = this.replaceTagFun(str, '"worldName":', '<color=#ff0000>世界名称:</color>', "\n\n");
            str = this.replaceTagFun(str, '"backStory":', '<color=#ff0000>背景故事:</color>', "\n\n");
            str = this.replaceTagFun(str, '"camps":', '<color=#00ff00>势力:</color>', "\n\n");
            str = this.replaceTagFun(str, '"encapsulate":', '<color=#ff0000>简述:</color>', "\n\n");
            str = str.replace(/"/g, '');
        } else if (result.title === "角色设定") {
            // str = str.replace(/^\{/, '');
            // str = str.replace(/\}$/, '');
            // str = str.replace(/",\n/g, '\n\n');
            // str = str.replace(/"\n/g, '\n\n');
            // str = str.replace('  "RoleName": "', '角色名称: ');
            // str = str.replace('  "Gender": "', '性别: ');
            // str = str.replace('  "RoleDefinition": "', '定位: ');
            // str = str.replace('  "Appearance": "', '外貌: ');
            // str = str.replace('  "Profile": "', '简介: ');

            str = str.replace(/^\{/, '');
            str = str.replace(/\}$/, '');
            str = str.replace(/\n/g, '');
            str = str.replace(/ /g, '');//说是返回的空格应该是没有用的 暂时先全部替换掉

            str = this.replaceTagFun(str, '"RoleName":', '<color=#00ff00>角色名称:</color><color=#ff0000>', "</color>\n\n");
            str = this.replaceTagFun(str, '"Gender":', '<color=#00ff00>性别:</color><color=#ff0000>', "</color>\n\n");
            str = this.replaceTagFun(str, '"RoleDefinition":', '<color=#00ff00>定位:</color><color=#ff0000>', "</color>\n\n");
            str = this.replaceTagFun(str, '"Appearance":', '<color=#00ff00>外貌:</color>', "\n\n");
            str = this.replaceTagFun(str, '"Profile":', '<color=#00ff00>简介:</color>', "");
            str = str.replace(/"/g, '');
        } else if (result.title === "章节场景") {
            // str = str.replace(/\[/g, '');
            // str = str.replace(/\]/g, '');
            // str = str.replace(/\{/g, '');
            // str = str.replace(/\}/g, '');
            // str = str.replace(/",\n/g, '\n');
            // str = str.replace(/,\n/g, '\n');
            // str = str.replace(/"\n/g, '');
            // str = str.replace(/ {4}"ChapterName": "/g, '章节: ');
            // str = str.replace(/ {4}"backStory": "/g, '简介: ');
            // str = str.replace(/ {4}"Scenes": \n/g, '');
            // str = str.replace(/ {4}"SceneName": "/g, '场景: ');


            str = str.replace(/\[/g, '');
            str = str.replace(/\]/g, '');
            str = str.replace(/\{/g, '');
            str = str.replace(/\}/g, '');
            // console.error(str);

            str = str.replace(/\n/g, '');
            str = str.replace(/ /g, '');//说是返回的空格应该是没有用的 暂时先全部替换掉
            str = this.replaceTagFun(str, '"SceneName":', '<color=#00ff00>场景:</color>', "\n\n");
            str = this.replaceTagFun(str, '"backStory":', '<color=#00ff00>简介:</color>', "\n\n");
            str = this.replaceTagFun(str, '"ChapterName":', '<color=#00ff00>章节:</color><color=#ff0000>', "</color>\n\n");
            str = this.replaceTagFun(str, '"Scenes":', '', "\n\n");
            str = str.replace(/"/g, '');
        } else if (result.title === "场景对话") {
            // str = str.replace(/\[/g, '');
            // str = str.replace(/\]/g, '');
            // str = str.replace(/\{/g, '');
            // str = str.replace(/\}/g, '');
            // str = str.replace(/",\n/g, '');
            // str = str.replace(/,/g, '');
            // str = str.replace(/"Think": ""\n/g, '');
            // str = str.replace(/"RoleName": "/g, '');
            // //str = str.replace(/"Expression": " {4}"Content": "/g, ': ');
            // str = str.replace(/"Expression": "/g, '[');
            // str = str.replace(/"Content": "/g, ']: ');

            let startIndex = str.indexOf("[");
            let startStr;
            if (startIndex != -1) {
                startStr = str.slice(0, startIndex);
                str = str.replace(startStr, "");
            }

            str = str.replace(/\[/, '\n\n'); //第一个[换行
            str = str.replace(/\[/g, '');
            str = str.replace(/\]/g, '');
            str = str.replace(/\{/g, '');
            str = str.replace(/\}/g, '');
            // console.error(str);

            str = str.replace(/\n/g, '');
            str = str.replace(/ /g, '');//说是返回的空格应该是没有用的 暂时先全部替换掉

            str = this.replaceTagFun(str, '"RoleName":', '', " ");
            str = this.replaceTagFun(str, '"Expression":', '<color=#ff0000>[', "]</color>:");
            str = this.replaceTagFun(str, '"Content":', '', "\n");
            str = this.replaceTagFun(str, '"Think":', '', "\n");
            str = str.replace(/"/g, '');
            str = str.replace(/动作描述/g, "旁白");
            str = str.replace(/\[\]/g, "");
            if (startStr != null && startStr.length > 0) {
                str = startStr + "\n" + str;
            }
            // console.warn(str);
        }

        this.originData.content = str;
        this.originData.title = result.title;
        this.originData.isOver = result.isOver;
        this.originData.jsonType = result.jsonType;
        this.originData.jsondata = result.jsondata;
        this.originData.images = result.images;
        this.originData["imagesJson"] = result.imagesJson;
        this.originData.sounds = result.sounds;
        this.originData["soundsJson"] = result.soundsJson;
    }


    private replaceTagFun(str: string, tagStr: string, replaceStr: string, tagEndStr: string) {
        let index = str.indexOf(tagStr);
        if (index != -1) {
            let dou = str.indexOf(",", index);
            if (dou != -1) {
                let contentIndex = index + tagStr.length;
                let contentStr = str.slice(contentIndex, dou);//.replace(/"/g, '');//可把内容中的双引号都替换掉 如果确认所有内容中都不会出现"的话可以改成在最终的文本替换
                // console.error(tagStr+"  **  "+contentStr);
                str = str.slice(0, contentIndex) + contentStr + tagEndStr + str.slice(dou + 1);//去掉逗号
            }
            // console.error(index + "     " + dou);
            str = str.replace(tagStr, replaceStr);

            return this.replaceTagFun(str, tagStr, replaceStr, tagEndStr);
        }
        return str;
    }


    public refreshAiChat(chatRecordItem: Entity.ChatMessageData) {
        if (chatRecordItem.isOver) {
            if (chatRecordItem.title == "自动导入") {
                this.StroyImportdata = chatRecordItem;
                this.stroyData = JSON.parse(this.StroyImportdata.content);
                this.setNewBackstoryDataFun(this.stroyData.storySetting, this.stroyData.gameName);
                setTimeout(() => {
                    this.AddChapterScenes(this.stroyData.chapterData);
                    setTimeout(() => {
                        this.SetRoleImage();
                    }, 5000);
                }, 5000);
            }
            if (chatRecordItem.title == "角色设定") {
                let index = this.roleindex - 1;
                let image: string
                for (const key in chatRecordItem.images) {
                    const element = chatRecordItem.images[key];
                    image = element;
                }
                let path = ChatMessageDataManager.Instance.getResFullPath(image);
                let Character = this.stroyData.characterData[index];
                Character.roleDrawing = path;
                if (Character.gender == "男" || Character.gender == "男性") {
                    Character.voiceId = this.randomChoose(ChapterSceneDirectoryManager.Instance.maleList).id;
                } else {
                    Character.voiceId = this.randomChoose(ChapterSceneDirectoryManager.Instance.femaleList).id;
                }
                this.SetRoleImage();
            }

            if (chatRecordItem.title == "场景对话") {
                this.SceneDialogud = chatRecordItem;
                let chapterIndex = this.chapterIndex;
                let sceneIndex = this.sceneIndex - 1;
                let scene = EditorManager.Instance.chapterList[chapterIndex].sceneList[sceneIndex];
                let str = this.SceneDialogud.content.replace(/<[\w+=#/]+>/g, "");
                scene.createStepByText(str);
                scene.createDialogListByStep();
                scene.sendDialogDataToServer();
                setTimeout(() => {
                    this.GetVoiceByScene(scene.chapter.id, scene.id, "对话生成")
                }, 5000);
            }



            if (chatRecordItem.title == "对话生成") {
                if (this.soundsBool(chatRecordItem)) {
                    this.SetSound(chatRecordItem);
                    setTimeout(() => {
                        this.SetDialog();
                    }, 5000)
                }
            }

            if (chatRecordItem.title == "背景图") {
                let chapterIndex = this.chapterIndex;
                let sceneIndex = this.sceneIndex - 1;
                let scene = EditorManager.Instance.chapterList[chapterIndex].sceneList[sceneIndex];
                let image: string
                for (const key in chatRecordItem.images) {
                    const element = chatRecordItem.images[key];
                    image = element;
                }
                let path = ChatMessageDataManager.Instance.getResFullPath(image);
                let backgroundStep = StepPares.createDefaultBackgroundStep(chapterIndex.toString(), path);
                scene.setBackground(backgroundStep);
                scene.sendDialogDataToServer();
                this.Addbackground(scene.sceneName, "背景", scene, path);
                this.SetImage();
            }
        }
    }


    public soundsBool(chatRecordItem: Entity.ChatMessageData) {
        let sound: string
        for (const key in chatRecordItem.sounds) {
            const element = chatRecordItem.sounds[key];
            sound = element;
        }
        return sound != "";
    }


    public SetSound(data: Entity.ChatMessageData) {
        //音效列表
        let sound = data.sounds;
        let list: AIChatSoundData[] = [];
        let chapterIndex = this.chapterIndex;
        let sceneIndex = this.sceneIndex - 1;
        let sceneData = EditorManager.Instance.chapterList[chapterIndex].sceneList[sceneIndex];
        if (sceneData) {
            //是否切换过音效
            let changeSound: boolean = false;
            let stepList = sceneData.stepList;
            for (let i = 0; i < stepList.length; i++) {
                let item = stepList[i];
                if (item.type == StepType.conversation) {
                    let conversationStep = item as ConversationStep;
                    if (conversationStep.data.dialogData != null && conversationStep.data.dialogData.id in sound) {
                        let path = sound[conversationStep.data.dialogData.id];
                        list.push({
                            id: conversationStep.data.dialogData.id,
                            name: path,
                            url: path
                        });

                        if (path != null && path.length > 0) {
                            //创建音效step
                            let index = stepList.findIndex((value) => {
                                return value.type == StepType.voice &&
                                    (value as VoiceStep).data.dialogData != null &&
                                    (value as VoiceStep).data.dialogData.id == conversationStep.data.dialogData.id;
                            });
                            let voiceStep = StepPares.createDefaultVoiceStep("1", path);
                            voiceStep.data.dialogData = conversationStep.data.dialogData;
                            if (index >= 0) {
                                sceneData.replaceStep(voiceStep, index);
                            } else {
                                sceneData.insertStep(voiceStep, i);
                                i++;
                            }
                            changeSound = true;
                            // console.error(voiceStep.prevStep.type+"    "+voiceStep.nextStep.type);
                            if (voiceStep.prevStep.type == StepType.standingPainting) {
                                let standingPaintingStep = voiceStep.prevStep as StandingPaintingStep;
                                voiceStep.data.x = this.getAudioPosFun(standingPaintingStep.data.anchorX);//根据位置关系 -1  0  1
                                voiceStep.data.y = this.getAudioPosFun(standingPaintingStep.data.anchorY);//根据位置关系
                                // console.error(standingPaintingStep);
                            } else if (voiceStep.nextStep.type == StepType.standingPainting) {
                                let standingPaintingStep = item.nextStep as StandingPaintingStep;
                                voiceStep.data.x = this.getAudioPosFun(standingPaintingStep.data.anchorX);//根据位置关系
                                voiceStep.data.y = this.getAudioPosFun(standingPaintingStep.data.anchorY);//根据位置关系
                                // console.error(standingPaintingStep);
                            }
                        }
                    }
                }
            }

            if (changeSound) {
                sceneData.createDialogListByStep();
                sceneData.sendDialogDataToServer();
            }
        } else {
            for (let key in sound) {
                let path = sound[key];
                list.push({
                    id: key,
                    name: path,
                    url: path
                });
            }
        }

    }
    private getAudioPosFun(num: number) {
        let res = 0;
        if (num == 0.5) {
            res = 0;
        } else if (num < 0.5) {
            res = num * 2 - 1;
        } else {
            res = num * 2;
        }
        return res;
    }

    public randRangeInt(min: number, max: number): number {
        if (min > max)
            return Math.floor(Math.random() * (min - max + 1) + max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    private setNewBackstoryDataFun(storySetting: string, gameName: string) {
        GameProjectManager.instance.currentBackStoryData = new BackStoryData();
        GameProjectManager.instance.currentBackStoryData.id = GameProjectManager.instance.currentGalData.id;
        GameProjectManager.instance.currentBackStoryData.backStory = storySetting;
        GameProjectManager.instance.currentBackStoryData.worldName = gameName;
        let backStoryStr = JSON.stringify(GameProjectManager.instance.currentBackStoryData)
        ProjectBasicSettingsManagerRequest.Instance.SetBackStory(GameProjectManager.instance.currentGalData.id, backStoryStr);
    }

    private randomChoose(list: VoiceBase[]) {
        return list[this.randRangeInt(0, list.length - 1)]
    }


    private SetRoleImage() {

        let characterData = this.stroyData.characterData[this.roleindex];

        if (characterData) {
            let currentID = GameProjectManager.instance.currentGalData.id;

            let message = "性别: " + characterData.gender + ", " + characterData.characterDesign;

            let chatID = null;

            let title = "角色设定";

            WebsocketTool.Instance.ProjectRoleManager_StableDiffusio_GetRole(currentID, title, 1, 0, message, chatID);

            this.roleindex++;
        } else {
            this.AddRole(this.stroyData.characterData);
            this.SetDialog();
        }
    }

    private GetVoiceByScene(chapterId: string, sceneId: string, title: string) {
        let currentID = GameProjectManager.instance.currentGalData.id;
        WebsocketTool.Instance.DialogManager_VITS_GetVoiceByScene(currentID, title, chapterId, sceneId);
    }

    private SetDialog() {
        let chapter = EditorManager.Instance.chapterList[this.chapterIndex];
        if (chapter) {
            let scene = chapter.sceneList[this.sceneIndex];

            if (!chapter.chapterName) {
                return;
            }
            if (scene) {
                let currentID = GameProjectManager.instance.currentGalData.id;

                let title = "场景对话";

                let roles = this.getRoleIDs();

                WebsocketTool.Instance.DialogManager_LLM_GetDialog(currentID, title, 0, roles, chapter.id, scene.id);

                this.sceneIndex++;
            } else {
                this.sceneIndex = 0;

                this.chapterIndex++;

                this.SetDialog();
            }
        } else {
            this.chapterIndex = 0;
            this.sceneIndex = 0;
            this.SetImage();
        }
    }



    private SetImage() {
        let chapter = EditorManager.Instance.chapterList[this.chapterIndex];
        if (chapter) {
            let scene = chapter.sceneList[this.sceneIndex];
            if (!chapter.chapterName) {
                return;
            }
            if (scene) {
                let currentID = GameProjectManager.instance.currentGalData.id;

                let title = "背景图";

                let message = scene.sceneName;

                let sceneId = scene.id;

                let chapterId = chapter.id;

                WebsocketTool.Instance.BackGroundImageManager_StableDiffusio_GetBackGround(currentID, title, chapterId, sceneId, message, null);

                this.sceneIndex++;
            } else {
                this.sceneIndex = 0;

                this.chapterIndex++;

                this.SetImage();
            }
        } else {
            this.chapterIndex = 0;
            this.sceneIndex = 0;
        }
    }

    public getRoleIDs() {
        let roleList = RoleSettingManager.instance.newGetCurentProjectRoles();
        let data: string[] = []
        for (let index = 0; index < roleList.length; index++) {
            const element = roleList[index];
            data.push(element.id);
        }
        return data;
    }

    public AddRole(CharacterList: CharacterList[]) {
        let getRoleDataList: GalRoleData[] = [];
        for (let index = 0; index < CharacterList.length; index++) {
            const role = CharacterList[index];
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
            currentGalroleData.roleDrawing = { "normal": role.roleDrawing };//["normal"]
            currentGalroleData.voiceID = role.voiceId;
            RoleSettingManager.instance.newAddRoleData(currentGalroleData);
            getRoleDataList.push(currentGalroleData);
        }
        let galroleData = JSON.stringify(getRoleDataList);
        ProjectRoleManagerRequest.Instance.SetRoleSettingList(GameProjectManager.instance.currentGalData.id, galroleData);
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

        }
        for (let item of data) {
            let chapter = new ChapterInfo(item.id, item.ChapterName);
            for (let i = 0; i < item.scenes.length; i++) {
                chapter.appendScene(new SceneInfo(item.scenes[i], item.scensName[i]));
            }
            EditorManager.Instance.appendChapter(chapter);
        }
        ChapterSceneDirectoryManager.Instance.SetChapters(data, sceneDataList);
    }

    public Addbackground(desc: string, name: string, scene: SceneInfo, image,) {
        let backgrounData = new BackGroundData();
        let id = ChapterSceneDirectoryManager.Instance.uuid();
        backgrounData.id = id;
        backgrounData.projectId = GameProjectManager.instance.currentGalData.id;
        backgrounData.backStory = desc;
        backgrounData.resPath = image;
        backgrounData.BGName = name;
        backgrounData.chapter = scene.chapter.id;
        backgrounData.scene = scene.id;

        BackgroundPictureManager.Instance.addBackgrounPictureData(backgrounData);
        const res = JSON.stringify(backgrounData);
        BackgroundPictureManager.Instance.SetBackGroundByScene(scene.chapter.id, scene.id, res);
    }
}
