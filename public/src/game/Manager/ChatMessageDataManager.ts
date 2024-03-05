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
import { ChatMessageData } from "ChatMessageData";
import { cMap } from "Data/Map";
import { UiDataManager } from "PSDUI/UiDataManager";
import { ChatMessageDataEvent } from "../AutoCode/Net/DataEvents/ChatMessageDataEvent";
import { WebsocketTool } from "../AutoCode/Net/WebsocketTool";
import { WsDataManager } from "../AutoCode/Net/WsDataManager";
import { BindKeyName } from "../Data/BindKeyName";
import { GameProjectManager } from "./GameProjectManager";
import { AIChatDataType, AIChatTextData, ChatMessageUpdateResult, ChatRecordItem, ChatTab, ChatTabList, ProjectChatRecord } from "../Data/DataType";
import { AppMain } from "../appMain";
import { ChatGuideManager } from "./ChatGuideManager";
import { ChatApiType, ChatTabEnum } from "../Data/EnumType";
import { ResManager } from "./ResManager";
import { CommonPoupManager } from "./CommonPoupManager";

// globalThis["test1"] = () => {
//     ChatMessageDataManager.Instance["sendToAIByType"](ChatApiType.role, "角色设定", "生成男兽人主角", {});
// }

export class ChatMessageDataManager {
    private static _instance: ChatMessageDataManager;
    public static get Instance(): ChatMessageDataManager {
        if (this._instance == null) {
            this._instance = new ChatMessageDataManager();
        }
        return this._instance;
    }

    /** 这里记录所有项目的聊天数据, 改数据需要序列化和存服务器的 */
    public projectChatRecord: ProjectChatRecord = {};

    /**
     * 聊天是否结束
     */
    public get chatIsOver() {
        return this.currChatIsOver;
    }

    /** 选中的聊天页签名称 */
    public get selectTabTitle() {
        return this._selectTabTitle;
    }

    /** 选中聊天页签的类型 */
    public get selectTabType() {
        return this.getChatTabTypeByTitle(this._selectTabTitle);
    }

    /** 当前选中的页签 */
    public get selectTab() {
        return this.currentTabList[this._selectTabTitle];
    }

    /** 当前项目所有的会话列表 */
    public get currentTabList() {
        if (!GameProjectManager.instance.currentGalData) {
            return null;
        }
        let projectId = GameProjectManager.instance.currentGalData.id;
        if (projectId in this.projectChatRecord) {
            return this.projectChatRecord[projectId];
        }
        let chatList: ChatTabList = {};
        this.projectChatRecord[projectId] = chatList;
        return chatList;
    }

    //一条文本聊天 数组 (组合)
    //private chatTextDic: cMap<any[]> = new cMap();
    private currChatIsOver: boolean = true;
    private currChatTextId: string;
    private currChatTextArr: ChatMessageData[] = [];

    private _selectTabTitle: string;
    private _userChatIndex: number = 0;
    //记录页签索引
    private chatTabIndex: number = 0;

    private _backStoryDataResult: Entity.BackStoryData;
    private _galRoleDataResult: Entity.GalRoleData;
    private _galChapterDataResult: Entity.ChapterData[];

    //----------
    //记录选中的角色
    private _selectRole: Entity.GalRoleData[];

    public init() {

        //收到服务器返回的 AI聊天消息
        WsDataManager.ChatMessageDataData.addEventListener(ChatMessageDataEvent.All, (result: ChatMessageData) => {
            // console.log(result);
            console.log("返回内容: '" + result.content + "'");

            if (this.currChatIsOver) {
                if (this.currChatTextId != result.id) {
                    this.currChatTextArr.length = 0;
                    this.currChatIsOver = false;
                    this.currChatTextId = result.id;
                }
            } else {
                if (this.currChatTextId != result.id) {
                    console.error("出错 上一条消息没有完结 又来了一条新的消息！");
                    return;
                }
            }
            this.currChatTextArr.push(result);

            //数字越大排最上
            this.currChatTextArr.sort((a, b) => {
                return a.sendTime - b.sendTime;
            });

            let str = "";
            for (let i = 0; i < this.currChatTextArr.length; i++) {
                let textData = this.currChatTextArr[i];
                str += textData.content;
            }

            let isError: boolean = false;
            if (str.indexOf("_>=retry=<_") != -1) {
                // console.error("AI 返回出错 自动重新生成 或 提示出错 让用户自己点重新生成");
                str = str.replace("_>=retry=<_", "");
                isError = true;
                //如果服务器返回的不是over 强行设置为结束
                result.isOver = true;
            }
            if (result.isOver) {
                //结束清掉用于排列的列表
                if (!this.currChatIsOver) {
                    this.currChatIsOver = true;
                    console.log("消息返回完成: \n" + str);
                }
            }

            //某会话中具体的聊天数据
            if (!this.hasChatTab(result.title)) {
                //console.error("不存在页签: " + result.title);
                //console.log(str);
                return;
            }
            let index = this.getChatRecordItemIndex(result.title, result.id);
            let tab = this.getChatTab(result.title);

            if (tab.type === ChatTabEnum.backgroundSetting) {
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
            } else if (tab.type === ChatTabEnum.role) {
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
            } else if (tab.type === ChatTabEnum.chapterScenes) {
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
            } else if (tab.type === ChatTabEnum.sceneDialogue) {
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
            //console.log(str);

            //str = str.replace(/ {2}"\w+": "/g, '');
            //str = str.replace(/ {2}"\w+": "/g, '');
            if (isError) {
                str += '\n\n<color=#ff0000>AI生成出错!请重新生成</color>';
            }

            let restr = "重新生成";
            let chatRecordItem = tab.recordList[index];
            if (!chatRecordItem) { //没有该记录, 就需要创建
                let saveObj: Entity.ChatMessageData = new ChatMessageData();
                saveObj.id = result.id;
                saveObj.sendTime = result.sendTime;
                saveObj.isOver = result.isOver;
                saveObj.content = str;
                saveObj.images = result.images;
                saveObj["imagesJson"] = result.imagesJson;
                saveObj.sounds = result.sounds;
                saveObj["soundsJson"] = result.soundsJson;

                //title 为具体哪个会话的标记 由客户端发给服务器 然后由了务器原封不动返回这个字段
                saveObj.title = result.title;

                let guide = this.getTabCurrentGuide(result.title);
                this.appendAiChat(result.title, saveObj, (data) => {
                    data.isFromServer = true;
                    data.isError = isError;
                    if (isError) {
                        /** 自定义按钮 */
                        if (data.customButton && data.customButton.text != restr)
                            data.customButton = null;
                        /** 重新生成按钮 */
                        if (data.regenBtn && data.regenBtn.text != restr)
                            data.regenBtn = null;
                        /** 生成更多按钮 */
                        if (data.moreButton && data.moreButton.text != restr)
                            data.moreButton = null;
                        /** 选中图片/音效按钮 */
                        if (data.useButton && data.useButton.text != restr)
                            data.useButton = null;
                    }
                    if (guide.customHanderChatRecordItem) {
                        guide.customHanderChatRecordItem(data);
                    }
                });
            } else {
                chatRecordItem.originData.content = str;
                chatRecordItem.isError = isError;
                if (isError) {
                    /** 自定义按钮 */
                    if (chatRecordItem.customButton && chatRecordItem.customButton.text != restr)
                        chatRecordItem.customButton = null;
                    /** 重新生成按钮 */
                    if (chatRecordItem.regenBtn && chatRecordItem.regenBtn.text != restr)
                        chatRecordItem.regenBtn = null;
                    /** 生成更多按钮 */
                    if (chatRecordItem.moreButton && chatRecordItem.moreButton.text != restr)
                        chatRecordItem.moreButton = null;
                    /** 选中图片/音效按钮 */
                    if (chatRecordItem.useButton && chatRecordItem.useButton.text != restr)
                        chatRecordItem.useButton = null;
                }
                if (!chatRecordItem.originData.isOver) {
                    chatRecordItem.originData.isOver = result.isOver;
                    chatRecordItem.originData.jsonType = result.jsonType;
                    chatRecordItem.originData.jsondata = result.jsondata;
                    chatRecordItem.originData.images = result.images;
                    chatRecordItem.originData["imagesJson"] = result.imagesJson;
                    chatRecordItem.originData.sounds = result.sounds;
                    chatRecordItem.originData["soundsJson"] = result.soundsJson;

                    if (chatRecordItem.originData.isOver) {
                        // if ((result.jsondata != null && result.jsondata.length > 0) || tab.type === ChatTabEnum.sceneDialogue) {
                        //     chatRecordItem.showCustomButton = true;
                        // }
                        console.log("ai返回消息完成: ", chatRecordItem);
                    }
                } else {
                    //如果是原聊天中返回已完成的消息 那就是生成更多 往原内容中加入新的内容
                    if (result.images) {
                        //把没有图片路径的key已删掉 再加新的
                        for (const oriKey in chatRecordItem.originData.images) {
                            if (chatRecordItem.originData.images[oriKey] == "") {
                                delete chatRecordItem.originData.images[oriKey];
                            }
                        }
                        for (const key in result.images) {
                            chatRecordItem.originData.images[key] = result.images[key];
                        }
                    }
                    if (result.sounds) {
                        for (const oriKey in chatRecordItem.originData.sounds) {
                            if (chatRecordItem.originData.sounds[oriKey] == "") {
                                delete chatRecordItem.originData.sounds[oriKey];
                            }
                        }
                        for (const key in result.sounds) {
                            chatRecordItem.originData.sounds[key] = result.sounds[key];
                        }
                    }
                    console.log("ai返回 生成更多消息完成: ", chatRecordItem);
                }
                this.refreshAiChat(chatRecordItem, index);
            }
        });
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

    //以类型格式 发消息给AI
    private sendToAIByType(callApiType: ChatApiType, title: string, message: string, param: any) {
        let currentID = GameProjectManager.instance.currentGalData.id;
        //console.error(currentID);
        //WebsocketTool.Instance.BackGroundImageManager_StableDiffusio_GetBackGround(currentID,title, "", "", message);
        switch (callApiType) {
            case ChatApiType.backgroundSetting://背景设定
                //通过语言模型生成指定项目的背景设定，llmType：调用的语言模型
                message += "\n\n请使用中文回答, 并且请返回格式化好的json数据";
                WebsocketTool.Instance.ProjectBasicSettingsManager_LLM_GetBackStory(currentID, title, 1, message);
                break;
            case ChatApiType.role://角色设定
                //通过语言模型生成角色设定，llmType：调用的语言模型
                message += "\n\n角色名称请使用欧美风格, 请使用中文回答, 并且请返回格式化好的json数据";
                WebsocketTool.Instance.ProjectRoleManager_LLM_GetRoleSetting(currentID, title, 0, message);
                break;
            case ChatApiType.rolePortrait: //角色立绘
                console.error("角色立绘 " + param);
                let chatID = null;
                if(param!=null){
                    let chatType=param.callApiType;
                    chatID = param.chatID;
                    if(chatType==ChatApiType.roleEmote){//角色表情
                        console.error("可以发角色表情 " + param,chatID);
                        let path=param.path;
                        console.error(path);
                        let lastIndex=path.lastIndexOf(".");
                        let imageJson=path.slice(0,lastIndex)+".json";
                        // CommonPoupManager.instance.openCommonPopupFun({
                        //     titleStr: "删除", leftBtnBol: true, midBtnBol: false, rightBtnBol: true, leftbtnStr: "取消", midbtnStr: "", rightbtnStr: "确认删除",
                        //     showDescribBol: true, describeStr: "您确定想要删除此项目吗？",
                        //     leftBtnCallBack: () => {

                        //     },
                        //     rightBtnCallBack: (str: string) => {
                        //     },
                        // });
                        ResManager.loadJson(imageJson, (txt) => {
                            let jsonStr = txt;
                            if (typeof (txt) == "string") {
                            }else
                            {
                                jsonStr=JSON.stringify(txt);
                            }
                            // console.error(jsonStr);
                            //如果需要生成更多图片, 则chatid应该传上一条消息id
                            WebsocketTool.Instance.ProjectRoleManager_SetBiaoqing(currentID, title, jsonStr, chatID);
                        });
                        return;
                    }else
                    {

                    }
                }
                //如果需要生成更多图片, 则chatid应该传上一条消息id
                WebsocketTool.Instance.ProjectRoleManager_StableDiffusio_GetRole(currentID, title, 1, 0, message, chatID);
                break
            case ChatApiType.chapterScenes://对话场景
                message += "\n\n请使用中文回答, 并且请返回格式化好的json数据";
                WebsocketTool.Instance.ChapterManager_LLM_GetChapters(currentID, title, 0, param.chapterCount, 3, 6, message);
                break;
            case ChatApiType.sceneDialogue://场景对话
                //通过语言模型生成场景的对话,llmType:选择的模型
                message += "\n\n请使用中文回答, 并且请返回格式化好的json数据";
                WebsocketTool.Instance.DialogManager_LLM_GetDialog(currentID, title, 0, param.roles, param.chapterId, param.sceneId);
                break;
            case ChatApiType.backgroundImage://背景图片
                // console.error(param);
                //如果需要生成更多图片, 则chatid应该传上一条消息id
                WebsocketTool.Instance.BackGroundImageManager_StableDiffusio_GetBackGround(currentID, title, param.chapterId, param.sceneId, message, param.chatID);
                break;
            case ChatApiType.free: //自由聊天
                WebsocketTool.Instance.OtherApiManager_LLM_Free(currentID, title, 0, message);
                break;
            case ChatApiType.projectName: //生成项目名称
                WebsocketTool.Instance.ProjectBasicSettingsManager_LLM_GetProjectName(currentID, title, 0, param.backStory, message);
                break;
            case ChatApiType.daiglogVoices: //生成语音
                WebsocketTool.Instance.DialogManager_VITS_GetVoicesByDaiglog(currentID, title, param.daiglogId);
                break;
            case ChatApiType.sceneDaiglogVoices: //生成语音
                WebsocketTool.Instance.DialogManager_VITS_GetVoiceByScene(currentID, title, param.chapterId, param.sceneId);
                break;
        }

        //通过语言模型生成场景的背景描述,llmType:选择的模型
        // WebsocketTool.Instance.BackGroundImageManager_LLM_GetBackGroundByScene(currentID,title, "", "", 0, "");
        // //通过语言模型生成全游戏章节和场景，chapterCount：章节数量，minSceneCount：单个章节最小场景数量，maxSceneCount：单个章节最大场景数量
        // WebsocketTool.Instance.ChapterManager_LLM_GetChapters(currentID,title, 0, 0, 0, 0, "");
        // //通过语言模型生成指定章节的场景，chapterId：章节id，minSceneCount：单个章节最小场景数量，maxSceneCount：单个章节最大场景数量
        // WebsocketTool.Instance.ChapterManager_LLM_GetChapter(currentID,title, "", 0, 0, "");
        // //通过语言模型生成场景的大纲,llmType:选择的模型
        // WebsocketTool.Instance.DialogManager_LLM_GetOutline(currentID,title, "", "", 0, "");

        // //通过语言模型生成场景的音乐描述,llmType:选择的模型
        // WebsocketTool.Instance.MusicManager_LLM_GetMusicByScene(currentID,title, "", "", 0, "");
        // //语言模型自由API
        // WebsocketTool.Instance.OtherApiManager_LLM_Free(currentID,title, 0, "");
        // //通过语言模型生成指定项目的项目名，llmType：调用的语言模型
        // WebsocketTool.Instance.ProjectBasicSettingsManager_LLM_GetProjectName(currentID,title, 0, "");
    }

    public getResFullPath(path: string) {
        return AppMain.ResUrl + "res/" + path;
    }

    /**
     * 根据 type 枚举获取页签名称
     */
    public getDefaultChatTabName(type: ChatTabEnum) {
        let title: string;
        switch (type) {
            case ChatTabEnum.backgroundSetting:
                title = "背景设定";
                break;
            case ChatTabEnum.role:
                title = "角色设定";
                break;
            case ChatTabEnum.chapterScenes:
                title = "章节场景";
                break;
            case ChatTabEnum.sceneDialogue:
                title = "场景对话";
                break;
            case ChatTabEnum.backgroundImage:
                title = "背景图";
                break;
            default:
                return;
        }
        return title;
    }

    /**
     * 根据标题名称获取聊天类型
     */
    public getChatTabTypeByTitle(title: string): ChatTabEnum {
        let temp = this.currentTabList[title];
        if (!temp) {
            return null;
        }
        return temp.type;
    }

    /**
     * 发送聊天数据给Ai
     * @param title 聊天框名称
     * @param str 文本内容
     * @param sendToServer 是否发送给服务器
     */
    public sendMessage(title: string, str: string, sendToServer?: boolean): ChatRecordItem;
    /**
     * 发送聊天数据给Ai
     * @param title 聊天框名称
     * @param sendText 发给服务器的文本内容
     * @param showText 在前端显示的文本内容
     */
    public sendMessage(title: string, sendText: string, showText: string, param?: any): ChatRecordItem;

    public sendMessage(title: string, str: string, arg3?: boolean | string, arg4?: any) {
        let guide = this.getTabCurrentGuide(title);
        if (arg3 == null || typeof (arg3) == "boolean") {
            let result = this.appendUserChat(title, str);
            if (arg3 == null || arg3 === true) {
                if (guide && guide.onUserActiveSendMessage) {
                    guide.onUserActiveSendMessage(str);
                }
                if (!arg4 && guide && guide.onGetUserSendMessageParam) {
                    arg4 = guide.onGetUserSendMessageParam(str);
                }
                this.sendToAIByType(guide.callApiType, title, str, arg4);
            }
            return result;
        } else {
            let result = this.appendUserChat(title, arg3);
            if (!arg4 && guide && guide.onGetUserSendMessageParam) {
                arg4 = guide.onGetUserSendMessageParam(str);
            }
            this.sendToAIByType(guide.callApiType, title, str, arg4);
            return result;
        }
    }

    /**
     * 发送聊天数据给用户
     * @param title 聊天框名称
     * @param sendText 发给用户的文本内容
     */
    public sendMessageToUser(title: string, sendText: string, customHandler?: (data: ChatRecordItem) => void) {
        let id = (this._userChatIndex++).toString();
        let data: Entity.ChatMessageData = {
            id,
            title,
            content: sendText,
            isOver: true,
            sendTime: Date.now(),
        };
        return this.appendAiChat(title, data, customHandler);
    }

    /**
     * 获取指定title的会话页签
     */
    public getChatTab(title: string) {
        let chatList = this.currentTabList;
        if (title in chatList) {
            return chatList[title];
        }
        console.error("当前对话不存在 " + title);
        return null;
    }

    /** 切换或者创建对话页签 */
    public createOrChangeChatTab(type: ChatTabEnum) {
        let map = this.currentTabList;
        for (let key in map) {
            let item = map[key];
            if (item.type === type) {
                this.changeChatTab(item.title);
                return;
            }
        }
        this.createChatTab(type, this.getDefaultChatTabName(type));
    }

    /**
     * 者创建指定title的会话内容
     */
    public createChatTab(type: ChatTabEnum, title: string): string {
        let currentTabList = this.currentTabList;
        if (title in currentTabList) {
            let element = title[title.length - 1];
            let num = parseInt(element);
            if (isNaN(num)) {
                let tempTitle = title + "1";
                this.createChatTab(type, tempTitle);
                return tempTitle;
            } else {
                let tempTitle = title.substring(0, title.length - 1) + (num + 1);
                this.createChatTab(type, tempTitle);
                return tempTitle;
            }
        } else {
            //创建
            let temp: ChatTab = {
                title: title,
                time: Date.now(),
                type: type,
                needRefresh: true,
                needRefreshIndex: -1,
                scrollHeight: 0,
                guideIndex: 0,
                recordList: []
            };
            currentTabList[title] = temp;
            console.log("创建聊天列表: ", temp);
            UiDataManager.changeFunctionData(BindKeyName.OnCreateChatTab, temp);
            this.changeChatTab(title);

            this.onCreateTab(temp);
            return title;
        }
    }

    /**
     * 返回是否存在指定页签
     */
    public hasChatTab(title: string): boolean {
        if (this.currentTabList) {
            return title in this.currentTabList;
        }
        return false;
    }

    /**
     * 切换页签
     */
    public changeChatTab(title: string) {
        if (this._selectTabTitle == title) {
            return;
        }
        this._selectTabTitle = title;
        console.log("切换聊天列表: ", this.selectTab);
        UiDataManager.changeFunctionData(BindKeyName.OnChangeChatTab, this.selectTab);
    }

    /**
     * 获取指定聊天内容
     */
    public getChatRecordItem(title: string, id: string) {
        let chatRecordList = this.getChatTab(title);
        if (chatRecordList) {
            return chatRecordList.recordList.find((value) => {
                return value.originData.id === id;
            });
        }
        return null;
    }

    /**
     * 获取指定聊天内容索引
     */
    public getChatRecordItemIndex(title: string, id: string): number {
        let chatRecordList = this.getChatTab(title);
        if (chatRecordList) {
            return chatRecordList.recordList.findIndex((value) => {
                return value.originData.id === id;
            });
        }
        return -1;
    }

    /**
     * 添加用户聊天内容
     */
    public appendUserChat(title: string, content: string) {
        if (content == "" || content == null) {
            //如果用户发的消息为空 不显示
            return;
        }
        let chatRecord = this.getChatTab(title);
        if (chatRecord) {
            let id = (this._userChatIndex++).toString();
            let data: Entity.ChatMessageData = {
                id,
                title,
                content,
                isOver: true,
                sendTime: Date.now(),
            };
            let chatRecordItem: ChatRecordItem = this.createChatRecordItem(chatRecord.recordList.length, data, false);
            chatRecord.recordList.push(chatRecordItem);
            let result: ChatMessageUpdateResult = {
                chatRecordItem,
                isRefresh: false,
            }
            UiDataManager.changeFunctionData(BindKeyName.AIChatMessageUpDate, result);
            return chatRecordItem;
        }
        return null;
    }

    /**
     * 添加ai聊天内容
     */
    private appendAiChat(title: string, data: Entity.ChatMessageData, customHandler?: (data: ChatRecordItem) => void) {
        let chatRecord = this.getChatTab(title);
        if (chatRecord) {
            let chatRecordItem: ChatRecordItem = this.createChatRecordItem(chatRecord.recordList.length, data, true);
            //自定义处理
            if (customHandler) {
                customHandler(chatRecordItem);
            }
            chatRecord.recordList.push(chatRecordItem);
            let result: ChatMessageUpdateResult = {
                chatRecordItem,
                isRefresh: false,
            }
            UiDataManager.changeFunctionData(BindKeyName.AIChatMessageUpDate, result);
            return chatRecordItem;
        }
        return null;
    }

    /**
     * 更新ai聊天内容
     */
    private refreshAiChat(chatRecordItem: ChatRecordItem, index: number) {
        let result: ChatMessageUpdateResult = {
            chatRecordItem,
            isRefresh: true,
            refreshIndex: index
        }
        UiDataManager.changeFunctionData(BindKeyName.AIChatMessageUpDate, result);
    }

    //
    private createChatRecordItem(index: number, chatMeesagteData: Entity.ChatMessageData, isAi: boolean) {
        if (chatMeesagteData.images != null && Object.keys(chatMeesagteData.images).length > 0) {
            //图片
            let picture = new ChatRecordItem(index, this.getChatTabTypeByTitle(chatMeesagteData.title), chatMeesagteData);
            picture.type = AIChatDataType.picture;
            return picture;
        } else if (chatMeesagteData.sounds != null && Object.keys(chatMeesagteData.sounds).length > 0) {
            //声音
            let sound = new ChatRecordItem(index, this.getChatTabTypeByTitle(chatMeesagteData.title), chatMeesagteData);
            sound.type = AIChatDataType.sound;
            return sound;
        } else {
            if (!isAi) { //用户发的
                let conData = new ChatRecordItem(index, this.getChatTabTypeByTitle(chatMeesagteData.title), chatMeesagteData);
                conData.type = AIChatDataType.user;
                return conData;
            } else { //ai发的
                let conData = new ChatRecordItem(index, this.getChatTabTypeByTitle(chatMeesagteData.title), chatMeesagteData);
                conData.type = AIChatDataType.text;
                conData.aiChatTextDic = new cMap();
                let text = new AIChatTextData();
                text.aiContentText = chatMeesagteData.content;
                text.aiTipsText = "";
                //具体哪个AI 后续根据服务器给的标签 设置
                conData.aiChatTextDic.set("ChatGPT", text);

                return conData;
            }
        }
    }

    private onCreateTab(tab: ChatTab) {
        this.runGuideMessage(tab);
    }

    public runGuideFinish(tab: ChatTab) {
        tab.guideIndex++;
        this.runGuideMessage(tab);
    }

    private runGuideMessage(tab: ChatTab) {
        let type = tab.type;
        let index = tab.guideIndex;
        let map = ChatGuideManager.Instance.aiGrideMessageMap.get(type);
        if (map && map[index]) {
            let data = map[index];
            this.sendMessageToUser(tab.title, data.message, data.customHanderChatRecordItem);
        }
    }

    private getTabCurrentGuide(title: string) {
        let tab = this.getChatTab(title);
        let map = ChatGuideManager.Instance.aiGrideMessageMap.get(tab.type);
        if (map && map[tab.guideIndex]) {
            let data = map[tab.guideIndex];
            return data;
        }
        return null;
    }
}