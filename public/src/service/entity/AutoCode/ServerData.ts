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
import { AwaitDataManager } from "Net/AwaitDataManager";
import { FrontDataManagerRequest } from "AutoCode/Net/ClientRequest/FrontDataManagerRequest";
import { QueryWapper } from "QueryWapper";

export type ExcelTypeList = {
    BackGroundData: BackGroundData;
    BackStoryData: BackStoryData;
    ChapterData: ChapterData;
    ChatMessageData: ChatMessageData;
    DialogData: DialogData;
    GalData: GalData;
    GalPreviewData: GalPreviewData;
    LanguageData: LanguageData;
    LanguageDataCN: LanguageDataCN;
    ProjectData: ProjectData;
    GalRoleData: GalRoleData;
    SceneData: SceneData;
    UserProjectData: UserProjectData;
    VoiceBase: VoiceBase;
    ErrorInfo: ErrorInfo;
    Formulas: Formulas;
    ServerLog: ServerLog;
    ServerUserData: ServerUserData;
    SeverConfigBase: SeverConfigBase;
    SeverData: SeverData;
    TimeEvent: TimeEvent;
    WalletErrLog: WalletErrLog;
    WalletLog: WalletLog;
}
export type CsTypeList = ExcelTypeList & {
    Byte: number;
    Short: number;
    Int: number;
    Long: number;
    Uint: number;
    Ushort: number;
    Ulong: number;
    Float: number;
    Double: number;
    Bool: boolean;
    Char: string;
    String: string;
    Object: any;
}
export enum CshapType {
    Byte = "Byte",
    Short = "Short",
    Int = "Int",
    Long = "Long",
    Uint = "Uint",
    Ushort = "Ushort",
    Ulong = "Ulong",
    Float = "Float",
    Double = "Double",
    Bool = "Bool",
    Char = "Char",
    String = "String",
    Object = "Object",
    BackGroundData = "BackGroundData",
    BackStoryData = "BackStoryData",
    ChapterData = "ChapterData",
    ChatMessageData = "ChatMessageData",
    DialogData = "DialogData",
    GalData = "GalData",
    GalPreviewData = "GalPreviewData",
    LanguageData = "LanguageData",
    LanguageDataCN = "LanguageDataCN",
    ProjectData = "ProjectData",
    GalRoleData = "GalRoleData",
    SceneData = "SceneData",
    UserProjectData = "UserProjectData",
    VoiceBase = "VoiceBase",
    ErrorInfo = "ErrorInfo",
    Formulas = "Formulas",
    ServerLog = "ServerLog",
    ServerUserData = "ServerUserData",
    SeverConfigBase = "SeverConfigBase",
    SeverData = "SeverData",
    TimeEvent = "TimeEvent",
    WalletErrLog = "WalletErrLog",
    WalletLog = "WalletLog",
}
type DictionaryItem<V> = {
    [key: string]: V;
}
type DictionaryMethod<K, V> = {
    get Count(): number;
    Add(k: K, v: V): void;
    ContainsKey(k: K): boolean;
    Remove(k: K): boolean;
    Clear(): void;
}
export type Dictionary<K, V> = DictionaryItem<V> & DictionaryMethod<K, V>;
export type List<V> = {
    [key: number]: V;
    get Count(): number;
    Add(v: V): void;
    IndexOf(v: V): number;
    LastIndexOf(v: V): number;
    Contains(v: V): boolean;
    Remove(v: V): boolean;
    Clear(): void;
}

let _awaitMessageIndex: number = 1;
// tslint:disable-next-line: max-classes-per-file
export class BackGroundData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 项目Id */
    public projectId: string = null;
    /** 表类型: string, 注释: 章节ID */
    public chapter: string = null;
    /** 表类型: string, 注释: 场景ID */
    public scene: string = null;
    /** 表类型: string, 注释: 背景名字 */
    public BGName: string = null;
    /** 表类型: string, 注释: 背景设定 */
    public backStory: string = null;
    /** 表类型: string, 注释: 资源地址 */
    public resPath: string = null;
}
export enum BackGroundDataField {
    id = "id",
    projectId = "projectId",
    chapter = "chapter",
    scene = "scene",
    BGName = "BGName",
    backStory = "backStory",
    resPath = "resPath",
}
export type BackGroundDataType = {
    id?: string,
    projectId?: string,
    chapter?: string,
    scene?: string,
    BGName?: string,
    backStory?: string,
    resPath?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class BackStoryData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 世界名 */
    public worldName: string = null;
    /** 表类型: string, 注释: 设定 */
    public backStory: string = null;
    /** 表类型: string, 注释: 势力 */
    public camps: string = null;
    /** 表类型: string, 注释: 简述 */
    public encapsulate: string = null;
    /** 表类型: string, 注释: GALid */
    public projectId: string = null;
}
export enum BackStoryDataField {
    id = "id",
    worldName = "worldName",
    backStory = "backStory",
    camps = "camps",
    encapsulate = "encapsulate",
    projectId = "projectId",
}
export type BackStoryDataType = {
    id?: string,
    worldName?: string,
    backStory?: string,
    camps?: string,
    encapsulate?: string,
    projectId?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class ChapterData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 章节名 */
    public ChapterName: string = null;
    /** 表类型: string, 注释: 所属GAL */
    public galID: string = null;
    /** 表类型: strings, 注释: 场景列表 */
    public scenes: List<string> = null;
    /** 表类型: strings, 注释: 场景名字 */
    public scensName: List<string> = null;
    /** 表类型: string, 注释: 故事大纲 */
    public storyOutLine: string = null;
}
export enum ChapterDataField {
    id = "id",
    ChapterName = "ChapterName",
    galID = "galID",
    scenes = "scenes",
    scensName = "scensName",
    storyOutLine = "storyOutLine",
}
export type ChapterDataType = {
    id?: string,
    ChapterName?: string,
    galID?: string,
    scenes?: List<string>,
    scensName?: List<string>,
    storyOutLine?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class ChatMessageData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 标题 */
    public title: string = null;
    /** 表类型: string, 注释: 内容 */
    public content: string = null;
    /** 表类型: stringMap, 注释: 图片 */
    public images: Dictionary<string, string> = null;
    /** 表类型: stringMap, 注释: 声音 */
    public sounds: Dictionary<string, string> = null;
    /** 表类型: intMap, 注释: 按钮 */
    public buttons: Dictionary<string, number> = null;
    /** 表类型: bool, 注释: 是否结束 */
    public isOver: boolean = false;
    /** 表类型: long, 注释: 时间 */
    public sendTime: number = 0;
    /** 表类型: string, 注释: json类型 */
    public jsonType: string = null;
    /** 表类型: string, 注释: json内容 */
    public jsondata: string = null;
}
export enum ChatMessageDataField {
    id = "id",
    title = "title",
    content = "content",
    images = "images",
    sounds = "sounds",
    buttons = "buttons",
    isOver = "isOver",
    sendTime = "sendTime",
    jsonType = "jsonType",
    jsondata = "jsondata",
}
export type ChatMessageDataType = {
    id?: string,
    title?: string,
    content?: string,
    images?: Dictionary<string, string>,
    sounds?: Dictionary<string, string>,
    buttons?: Dictionary<string, number>,
    isOver?: boolean,
    sendTime?: number,
    jsonType?: string,
    jsondata?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class DialogData {
    /** 表类型: string, 注释: 对话ID */
    public id: string = null;
    /** 表类型: string, 注释: galId */
    public gal: string = null;
    /** 表类型: string, 注释: 章节ID */
    public chapter: string = null;
    /** 表类型: string, 注释: 场景ID */
    public scene: string = null;
    /** 表类型: string, 注释: 角色ID */
    public roleId: string = null;
    /** 表类型: string, 注释: 展示名字 */
    public showName: string = null;
    /** 表类型: string, 注释: 展示文本 */
    public content: string = null;
    /** 表类型: string, 注释: 表情 */
    public emote: string = null;
    /** 表类型: stringsMap, 注释: 角色立绘 */
    public roleDraws: Dictionary<string, List<string>> = null;
    /** 表类型: stringsMap, 注释: 背景 */
    public backGround: Dictionary<string, List<string>> = null;
    /** 表类型: stringsMap, 注释: 声音 */
    public sound: Dictionary<string, List<string>> = null;
    /** 表类型: stringsMap, 注释: 语音 */
    public voice: Dictionary<string, List<string>> = null;
    /** 表类型: float, 注释: 显示延迟 */
    public showDelay: number = 0;
    /** 表类型: byte, 注释: 跳过设置 */
    public skipType: number = 0;
    /** 表类型: floats, 注释: 振屏 */
    public screenShake: List<number> = null;
    /** 表类型: bool, 注释: 不清除文本 */
    public notClear: boolean = false;
    /** 表类型: strings, 注释: 变量设定 */
    public VariableFormula: List<string> = null;
    /** 表类型: strings, 注释: 脚本 */
    public script: List<string> = null;
}
export enum DialogDataField {
    id = "id",
    gal = "gal",
    chapter = "chapter",
    scene = "scene",
    roleId = "roleId",
    showName = "showName",
    content = "content",
    emote = "emote",
    roleDraws = "roleDraws",
    backGround = "backGround",
    sound = "sound",
    voice = "voice",
    showDelay = "showDelay",
    skipType = "skipType",
    screenShake = "screenShake",
    notClear = "notClear",
    VariableFormula = "VariableFormula",
    script = "script",
}
export type DialogDataType = {
    id?: string,
    gal?: string,
    chapter?: string,
    scene?: string,
    roleId?: string,
    showName?: string,
    content?: string,
    emote?: string,
    roleDraws?: Dictionary<string, List<string>>,
    backGround?: Dictionary<string, List<string>>,
    sound?: Dictionary<string, List<string>>,
    voice?: Dictionary<string, List<string>>,
    showDelay?: number,
    skipType?: number,
    screenShake?: List<number>,
    notClear?: boolean,
    VariableFormula?: List<string>,
    script?: List<string>,
};
// tslint:disable-next-line: max-classes-per-file
export class GalData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 项目Id */
    public projectId: string = null;
    /** 表类型: int, 注释: 进度记录 */
    public schedule: number = 0;
    /** 表类型: string, 注释: ga名字 */
    public galName: string = null;
    /** 表类型: string, 注释: 背景设定 */
    public backStory: string = null;
    /** 表类型: string, 注释: 故事大纲 */
    public storyOutLine: string = null;
    /** 表类型: string, 注释: 美术风格 */
    public artStyle: string = null;
    /** 表类型: stringMap, 注释: 背景图片 */
    public BackGrounds: Dictionary<string, string> = null;
    /** 表类型: stringMap, 注释: 角色 */
    public roles: Dictionary<string, string> = null;
    /** 表类型: strings, 注释: 章节 */
    public chapters: List<string> = null;
    /** 表类型: stringsMap, 注释: 章节场景树 */
    public chapterScenes: Dictionary<string, List<string>> = null;
    /** 表类型: strings, 注释: 章节名字 */
    public chaptersName: List<string> = null;
    /** 表类型: stringsMap, 注释: 章节场景树名字 */
    public chapterScenesName: Dictionary<string, List<string>> = null;
}
export enum GalDataField {
    id = "id",
    projectId = "projectId",
    schedule = "schedule",
    galName = "galName",
    backStory = "backStory",
    storyOutLine = "storyOutLine",
    artStyle = "artStyle",
    BackGrounds = "BackGrounds",
    roles = "roles",
    chapters = "chapters",
    chapterScenes = "chapterScenes",
    chaptersName = "chaptersName",
    chapterScenesName = "chapterScenesName",
}
export type GalDataType = {
    id?: string,
    projectId?: string,
    schedule?: number,
    galName?: string,
    backStory?: string,
    storyOutLine?: string,
    artStyle?: string,
    BackGrounds?: Dictionary<string, string>,
    roles?: Dictionary<string, string>,
    chapters?: List<string>,
    chapterScenes?: Dictionary<string, List<string>>,
    chaptersName?: List<string>,
    chapterScenesName?: Dictionary<string, List<string>>,
};
// tslint:disable-next-line: max-classes-per-file
export class GalPreviewData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 项目Id */
    public projectId: string = null;
    /** 表类型: string, 注释: gal名字 */
    public galName: string = null;
    /** 表类型: string, 注释: 预览图片 */
    public previewImage: string = null;
    /** 表类型: string, 注释: 图标 */
    public icon: string = null;
    /** 表类型: date, 注释: 上次登陆时间 */
    public lastTime: number = 0;
}
export enum GalPreviewDataField {
    id = "id",
    projectId = "projectId",
    galName = "galName",
    previewImage = "previewImage",
    icon = "icon",
    lastTime = "lastTime",
}
export type GalPreviewDataType = {
    id?: string,
    projectId?: string,
    galName?: string,
    previewImage?: string,
    icon?: string,
    lastTime?: number,
};
// tslint:disable-next-line: max-classes-per-file
export class LanguageData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 内容 */
    public content: string = null;
}
export enum LanguageDataField {
    id = "id",
    content = "content",
}
export type LanguageDataType = {
    id?: string,
    content?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class LanguageDataCN {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 内容 */
    public content: string = null;
}
export enum LanguageDataCNField {
    id = "id",
    content = "content",
}
export type LanguageDataCNType = {
    id?: string,
    content?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class ProjectData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 项目名 */
    public projectName: string = null;
    /** 表类型: string, 注释: 项目备注 */
    public projectDesc: string = null;
    /** 表类型: string, 注释: 项目目录 */
    public projectPath: string = null;
    /** 表类型: string, 注释: 用户名 */
    public userName: string = null;
    /** 表类型: string, 注释: 上一次修改时间 */
    public lastTime: string = null;
    /** 表类型: string, 注释: 创建时间时间 */
    public creatTime: string = null;
}
export enum ProjectDataField {
    id = "id",
    projectName = "projectName",
    projectDesc = "projectDesc",
    projectPath = "projectPath",
    userName = "userName",
    lastTime = "lastTime",
    creatTime = "creatTime",
}
export type ProjectDataType = {
    id?: string,
    projectName?: string,
    projectDesc?: string,
    projectPath?: string,
    userName?: string,
    lastTime?: string,
    creatTime?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class GalRoleData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 角色名字 */
    public RoleName: string = null;
    /** 表类型: string, 注释: 性别 */
    public Gender: string = null;
    /** 表类型: string, 注释: 定位 */
    public RoleDefinition: string = null;
    /** 表类型: string, 注释: 外貌 */
    public Appearance: string = null;
    /** 表类型: string, 注释: 简介 */
    public Profile: string = null;
    /** 表类型: string, 注释: 离场场景 */
    public exitScene: string = null;
    /** 表类型: stringMap, 注释: 角色立绘 */
    public roleDrawing: Dictionary<string, string> = null;
    /** 表类型: string, 注释: 选用语音 */
    public voiceID: string = null;
}
export enum GalRoleDataField {
    id = "id",
    RoleName = "RoleName",
    Gender = "Gender",
    RoleDefinition = "RoleDefinition",
    Appearance = "Appearance",
    Profile = "Profile",
    exitScene = "exitScene",
    roleDrawing = "roleDrawing",
    voiceID = "voiceID",
}
export type GalRoleDataType = {
    id?: string,
    RoleName?: string,
    Gender?: string,
    RoleDefinition?: string,
    Appearance?: string,
    Profile?: string,
    exitScene?: string,
    roleDrawing?: Dictionary<string, string>,
    voiceID?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class SceneData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 场景名 */
    public sceneName: string = null;
    /** 表类型: string, 注释: 所属GAL */
    public galID: string = null;
    /** 表类型: string, 注释: 所属章节 */
    public ChapterId: string = null;
    /** 表类型: strings, 注释: 场景列表 */
    public Dialogs: List<string> = null;
    /** 表类型: string, 注释: 故事大纲 */
    public storyOutLine: string = null;
}
export enum SceneDataField {
    id = "id",
    sceneName = "sceneName",
    galID = "galID",
    ChapterId = "ChapterId",
    Dialogs = "Dialogs",
    storyOutLine = "storyOutLine",
}
export type SceneDataType = {
    id?: string,
    sceneName?: string,
    galID?: string,
    ChapterId?: string,
    Dialogs?: List<string>,
    storyOutLine?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class UserProjectData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 用户名 */
    public userName: string = null;
    /** 表类型: string*, 注释: 用户密码 */
    public passWord: string = null;
    /** 表类型: string, 注释: 创建时间 */
    public lastLoginTime: string = null;
    /** 表类型: stringMap, 注释: 项目列表 */
    public projects: Dictionary<string, string> = null;
    /** 表类型: stringMap, 注释: Gal列表 */
    public gal: Dictionary<string, string> = null;
}
export enum UserProjectDataField {
    id = "id",
    userName = "userName",
    passWord = "passWord",
    lastLoginTime = "lastLoginTime",
    projects = "projects",
    gal = "gal",
}
export type UserProjectDataType = {
    id?: string,
    userName?: string,
    passWord?: string,
    lastLoginTime?: string,
    projects?: Dictionary<string, string>,
    gal?: Dictionary<string, string>,
};
// tslint:disable-next-line: max-classes-per-file
export class VoiceBase {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 备注 */
    public desc: string = null;
    /** 表类型: int, 注释: 性别 */
    public Gender: number = 0;
    /** 表类型: int, 注释: 年龄段 */
    public age: number = 0;
    /** 表类型: string, 注释: 简介 */
    public Profile: string = null;
    /** 表类型: string, 注释: 文件名 */
    public fileName: string = null;
    /** 表类型: string, 注释: 说话人 */
    public speaker: string = null;
    /** 表类型: string, 注释: 语言TAG */
    public langTag: string = null;
}
export enum VoiceBaseField {
    id = "id",
    desc = "desc",
    Gender = "Gender",
    age = "age",
    Profile = "Profile",
    fileName = "fileName",
    speaker = "speaker",
    langTag = "langTag",
}
export type VoiceBaseType = {
    id?: string,
    desc?: string,
    Gender?: number,
    age?: number,
    Profile?: string,
    fileName?: string,
    speaker?: string,
    langTag?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class ErrorInfo {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: string, 注释: 错误消息 */
    public message: string = null;
    /** 表类型: string, 注释: 异常类型 */
    public errorType: string = null;
    /** 表类型: string, 注释: 创建时间 */
    public time: string = null;
    /** 表类型: string, 注释: 机型 */
    public modelType: string = null;
    /** 表类型: string, 注释: IP地址 */
    public ip: string = null;
}
export enum ErrorInfoField {
    id = "id",
    message = "message",
    errorType = "errorType",
    time = "time",
    modelType = "modelType",
    ip = "ip",
}
export type ErrorInfoType = {
    id?: string,
    message?: string,
    errorType?: string,
    time?: string,
    modelType?: string,
    ip?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class Formulas {
    /** 表类型: string, 注释: 配置ID */
    public id: string = null;
    /** 表类型: string, 注释: 备注 */
    public depict: string = null;
    /** 表类型: string, 注释: 公式 */
    public formulas: string = null;
    /** 表类型: float, 注释: 浮动范围（填0.1代表 ±0.1 即为 0.9~1.1） */
    public randomRange: number = 0;
}
export enum FormulasField {
    id = "id",
    depict = "depict",
    formulas = "formulas",
    randomRange = "randomRange",
}
export type FormulasType = {
    id?: string,
    depict?: string,
    formulas?: string,
    randomRange?: number,
};
// tslint:disable-next-line: max-classes-per-file
export class ServerLog {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: ulongMap*, 注释: 道具相关记录 */
    public itemCount: Dictionary<string, number> = null;
    /** 表类型: ulongMap*, 注释: 战斗相关记录 */
    public battleCount: Dictionary<string, number> = null;
    /** 表类型: ulongMap*, 注释: 商店相关记录 */
    public shopCount: Dictionary<string, number> = null;
    /** 表类型: ulongMap*, 注释: 其他记录 */
    public otherCount: Dictionary<string, number> = null;
}
export enum ServerLogField {
    id = "id",
    itemCount = "itemCount",
    battleCount = "battleCount",
    shopCount = "shopCount",
    otherCount = "otherCount",
}
export type ServerLogType = {
    id?: string,
    itemCount?: Dictionary<string, number>,
    battleCount?: Dictionary<string, number>,
    shopCount?: Dictionary<string, number>,
    otherCount?: Dictionary<string, number>,
};
// tslint:disable-next-line: max-classes-per-file
export class ServerUserData {
    /** 表类型: string, 注释: ID */
    public id: string = null;
    /** 表类型: int, 注释: 玩家ID数量记录 */
    public playerIDCount: number = 0;
    /** 表类型: intMap, 注释: 玩家阵营数量记录 */
    public userCampCount: Dictionary<string, number> = null;
}
export enum ServerUserDataField {
    id = "id",
    playerIDCount = "playerIDCount",
    userCampCount = "userCampCount",
}
export type ServerUserDataType = {
    id?: string,
    playerIDCount?: number,
    userCampCount?: Dictionary<string, number>,
};
// tslint:disable-next-line: max-classes-per-file
export class SeverConfigBase {
    /** 表类型: string, 注释: 配置ID */
    public id: string = null;
    /** 表类型: string, 注释: 备注 */
    public depict: string = null;
    /** 表类型: string, 注释: ip */
    public ip: string = null;
    /** 表类型: string, 注释: 网关地址 */
    public gateWay: string = null;
    /** 表类型: string, 注释: 区服ID */
    public serverID: string = null;
    /** 表类型: string, 注释: 区服名称 */
    public serverName: string = null;
    /** 表类型: byte, 注释: 区服状态:
1.爆满
2.维护
3.流畅 */
    public serverState: number = 0;
    /** 表类型: bool, 注释: 新区 */
    public newServer: boolean = false;
    /** 表类型: string, 注释: MAC地址 */
    public MAC: string = null;
    /** 表类型: date, 注释: 启动时间 */
    public setupTime: number = 0;
    /** 表类型: byte, 注释: 状态 */
    public status: number = 0;
    /** 表类型: uint, 注释: 当前人数 */
    public playerSum: number = 0;
    /** 表类型: bool, 注释: 是否为网关 */
    public isGate: boolean = false;
    /** 表类型: string, 注释: 备注IP */
    public descIP: string = null;
    /** 表类型: ulong, 注释: 地图更新序号 */
    public mapSaveVer: number = 0;
    /** 表类型: byte, 注释: 小地图显示玩家等级下限 */
    public mapShowLevel: number = 0;
    /** 表类型: int, 注释: 地图分割尺寸 */
    public mapSplit: number = 0;
    /** 表类型: uint, 注释: 心跳断开限制 */
    public heatbeatLimit: number = 0;
    /** 表类型: int, 注释: 每日最大野外战斗次数 */
    public battleTimes: number = 0;
    /** 表类型: float, 注释: 行军速度 */
    public marchSpeed: number = 0;
    /** 表类型: int, 注释: 战役推图玩家基础最大体力 */
    public campaignMaxStamina: number = 0;
    /** 表类型: int, 注释: 每日购买体力基础次数 */
    public PhysicalTime: number = 0;
    /** 表类型: int, 注释: 上阵基础数量 */
    public arrangeNum: number = 0;
    /** 表类型: int, 注释: 战役起始关卡 */
    public campaignStartId: number = 0;
    /** 表类型: string, 注释: 扫荡模式变更 */
    public sweepModeChanged: string = null;
    /** 表类型: string, 注释: 推荐阵营奖励 */
    public recomCampReward: string = null;
    /** 表类型: byte, 注释: 阵营加入等级 */
    public campJoin: number = 0;
    /** 表类型: int, 注释: 围攻等待时间 */
    public siegeWaitTime: number = 0;
    /** 表类型: int, 注释: 围攻提高消耗时间 */
    public siegeMaxTime: number = 0;
    /** 表类型: string, 注释: 突袭消耗 */
    public strikeCost: string = null;
    /** 表类型: string, 注释: 围攻低消耗 */
    public siegeMinCost: string = null;
    /** 表类型: string, 注释: 围攻高消耗 */
    public siegeMaxCost: string = null;
    /** 表类型: string, 注释: 召回功能消耗道具与数量 */
    public callBack: string = null;
    /** 表类型: string, 注释: 快速召回消耗道具与数量 */
    public fastCallBack: string = null;
    /** 表类型: string, 注释: 行军加速消耗道具与数量 */
    public marchSpeedUp: string = null;
    /** 表类型: string, 注释: 超级行军加速消耗道具与数量 */
    public superMarchSpeedUp: string = null;
    /** 表类型: string, 注释: 炸矿消耗 */
    public minerAttack: string = null;
    /** 表类型: int, 注释: 同阵营炸矿每日次数 */
    public sameCampMinerAttackLim: number = 0;
    /** 表类型: int, 注释: 领地失守后免战时间（秒） */
    public avoidWarTime: number = 0;
    /** 表类型: string, 注释: 免战特效 */
    public avoidWarEffect: string = null;
    /** 表类型: int, 注释: 装备库最终解锁容量上限 */
    public maxEquipVolume: number = 0;
    /** 表类型: string, 注释: 突破解锁条件 */
    public breakOutUnlock: string = null;
    /** 表类型: string, 注释: 日常任务解锁条件 */
    public dailyEventUnlock: string = null;
    /** 表类型: int, 注释: 解锁野外需要的玩家等级 */
    public unlockWildLevel: number = 0;
    /** 表类型: string, 注释: 军情功能解锁条件 */
    public IntelligenceUnlock: string = null;
    /** 表类型: byte, 注释: 装备自动锁定品质 */
    public equipAuutoLock: number = 0;
    /** 表类型: int, 注释: 普通成长恢复时间（秒） */
    public commonGrowthRecover: number = 0;
    /** 表类型: int, 注释: 普通成长恢复最大上限 */
    public commonGrowthMaxTime: number = 0;
    /** 表类型: string, 注释: 没有使用 */
    public seniorGrowthCost: string = null;
    /** 表类型: int, 注释: 跳过战斗时间（秒） */
    public battleJumpTime: number = 0;
    /** 表类型: int, 注释: 狂暴开始回合 */
    public furiousRound: number = 0;
    /** 表类型: float, 注释: 狂暴强化倍率 */
    public furiousStrengthen: number = 0;
    /** 表类型: float, 注释: 狂暴强化上限 */
    public furiousMaxStrengthen: number = 0;
    /** 表类型: int, 注释: 据点免战时间（秒） */
    public fortifiedAvoidWarTime: number = 0;
    /** 表类型: int, 注释: 申请总督时长（秒） */
    public applyGvernorTime: number = 0;
    /** 表类型: int, 注释: 据点总督撤离时间（秒） */
    public fortifiedRetreatTime: number = 0;
    /** 表类型: string, 注释: 玩家进攻据点限制 */
    public fortifiedAvailable: string = null;
    /** 表类型: int, 注释: 资源田收取间隔（间隔多少秒可以收取一次资源） */
    public resourceGetInterval: number = 0;
    /** 表类型: int, 注释: 资源田计算时间（每隔多少秒获取一次addrescue） */
    public resourceGetTime: number = 0;
    /** 表类型: string, 注释: 初次引导气泡获取奖励 */
    public firstGuideReward: string = null;
    /** 表类型: int, 注释: 掠夺资源数量% */
    public plunderPrecent: number = 0;
    /** 表类型: int, 注释: 工人掠夺的数量% */
    public HamalplunderPrecent: number = 0;
    /** 表类型: int, 注释: 工人损失数量% */
    public HamalLostPrecent: number = 0;
    /** 表类型: int, 注释: 阵营建设每日最大次数 */
    public campDevelopMaxTime: number = 0;
    /** 表类型: string, 注释: 改名卡消耗 */
    public changNameCost: string = null;
    /** 表类型: string, 注释: 改名卡消耗不足替换 */
    public changNameExchange: string = null;
    /** 表类型: string, 注释: 喇叭消耗 */
    public hornCost: string = null;
    /** 表类型: string, 注释: 喇叭消耗不足替换 */
    public hornCostExchange: string = null;
    /** 表类型: int, 注释: 聊天间隔cd */
    public chatCd: number = 0;
    /** 表类型: string, 注释: 解锁队列1介绍 */
    public Arrangement1UnlockDesc: string = null;
    /** 表类型: string, 注释: 解锁队列2介绍 */
    public Arrangement2UnlockDesc: string = null;
    /** 表类型: int, 注释: 邮件分享CD */
    public mailShareCd: number = 0;
    /** 表类型: int, 注释: 邮件默认保存时间 */
    public mailSaveTime: number = 0;
    /** 表类型: int, 注释: 邮件最大持有数量 */
    public mailMaxKeep: number = 0;
    /** 表类型: int, 注释: 免费附魔恢复间隔时间 */
    public enchantingFreeRefreshInterval: number = 0;
    /** 表类型: string, 注释: 普通附魔消耗 */
    public commonGrowthCost: string = null;
    /** 表类型: string, 注释: 高级附魔每次消耗 */
    public seniorEnchantingCost: string = null;
    /** 表类型: string, 注释: 终极附魔消耗 */
    public ultimateEnchantingCost: string = null;
    /** 表类型: int, 注释: 免费附魔最大次数 */
    public enchantingFreeTimesLimit: number = 0;
    /** 表类型: int, 注释: 附魔气泡出现免费次数 */
    public EnchantingBubble: number = 0;
    /** 表类型: int, 注释: 祭坛出现条件，（消耗n倍时出现） */
    public altarBubble: number = 0;
    /** 表类型: string, 注释: 活动按钮出现条件 */
    public activityIconAvailable: string = null;
    /** 表类型: string, 注释: 福利按钮出现条件 */
    public welfareIconAvailable: string = null;
    /** 表类型: string, 注释: 特惠按钮出现条件 */
    public preferentialIconAvailable: string = null;
}
export enum SeverConfigBaseField {
    id = "id",
    depict = "depict",
    ip = "ip",
    gateWay = "gateWay",
    serverID = "serverID",
    serverName = "serverName",
    serverState = "serverState",
    newServer = "newServer",
    MAC = "MAC",
    setupTime = "setupTime",
    status = "status",
    playerSum = "playerSum",
    isGate = "isGate",
    descIP = "descIP",
    mapSaveVer = "mapSaveVer",
    mapShowLevel = "mapShowLevel",
    mapSplit = "mapSplit",
    heatbeatLimit = "heatbeatLimit",
    battleTimes = "battleTimes",
    marchSpeed = "marchSpeed",
    campaignMaxStamina = "campaignMaxStamina",
    PhysicalTime = "PhysicalTime",
    arrangeNum = "arrangeNum",
    campaignStartId = "campaignStartId",
    sweepModeChanged = "sweepModeChanged",
    recomCampReward = "recomCampReward",
    campJoin = "campJoin",
    siegeWaitTime = "siegeWaitTime",
    siegeMaxTime = "siegeMaxTime",
    strikeCost = "strikeCost",
    siegeMinCost = "siegeMinCost",
    siegeMaxCost = "siegeMaxCost",
    callBack = "callBack",
    fastCallBack = "fastCallBack",
    marchSpeedUp = "marchSpeedUp",
    superMarchSpeedUp = "superMarchSpeedUp",
    minerAttack = "minerAttack",
    sameCampMinerAttackLim = "sameCampMinerAttackLim",
    avoidWarTime = "avoidWarTime",
    avoidWarEffect = "avoidWarEffect",
    maxEquipVolume = "maxEquipVolume",
    breakOutUnlock = "breakOutUnlock",
    dailyEventUnlock = "dailyEventUnlock",
    unlockWildLevel = "unlockWildLevel",
    IntelligenceUnlock = "IntelligenceUnlock",
    equipAuutoLock = "equipAuutoLock",
    commonGrowthRecover = "commonGrowthRecover",
    commonGrowthMaxTime = "commonGrowthMaxTime",
    seniorGrowthCost = "seniorGrowthCost",
    battleJumpTime = "battleJumpTime",
    furiousRound = "furiousRound",
    furiousStrengthen = "furiousStrengthen",
    furiousMaxStrengthen = "furiousMaxStrengthen",
    fortifiedAvoidWarTime = "fortifiedAvoidWarTime",
    applyGvernorTime = "applyGvernorTime",
    fortifiedRetreatTime = "fortifiedRetreatTime",
    fortifiedAvailable = "fortifiedAvailable",
    resourceGetInterval = "resourceGetInterval",
    resourceGetTime = "resourceGetTime",
    firstGuideReward = "firstGuideReward",
    plunderPrecent = "plunderPrecent",
    HamalplunderPrecent = "HamalplunderPrecent",
    HamalLostPrecent = "HamalLostPrecent",
    campDevelopMaxTime = "campDevelopMaxTime",
    changNameCost = "changNameCost",
    changNameExchange = "changNameExchange",
    hornCost = "hornCost",
    hornCostExchange = "hornCostExchange",
    chatCd = "chatCd",
    Arrangement1UnlockDesc = "Arrangement1UnlockDesc",
    Arrangement2UnlockDesc = "Arrangement2UnlockDesc",
    mailShareCd = "mailShareCd",
    mailSaveTime = "mailSaveTime",
    mailMaxKeep = "mailMaxKeep",
    enchantingFreeRefreshInterval = "enchantingFreeRefreshInterval",
    commonGrowthCost = "commonGrowthCost",
    seniorEnchantingCost = "seniorEnchantingCost",
    ultimateEnchantingCost = "ultimateEnchantingCost",
    enchantingFreeTimesLimit = "enchantingFreeTimesLimit",
    EnchantingBubble = "EnchantingBubble",
    altarBubble = "altarBubble",
    activityIconAvailable = "activityIconAvailable",
    welfareIconAvailable = "welfareIconAvailable",
    preferentialIconAvailable = "preferentialIconAvailable",
}
export type SeverConfigBaseType = {
    id?: string,
    depict?: string,
    ip?: string,
    gateWay?: string,
    serverID?: string,
    serverName?: string,
    serverState?: number,
    newServer?: boolean,
    MAC?: string,
    setupTime?: number,
    status?: number,
    playerSum?: number,
    isGate?: boolean,
    descIP?: string,
    mapSaveVer?: number,
    mapShowLevel?: number,
    mapSplit?: number,
    heatbeatLimit?: number,
    battleTimes?: number,
    marchSpeed?: number,
    campaignMaxStamina?: number,
    PhysicalTime?: number,
    arrangeNum?: number,
    campaignStartId?: number,
    sweepModeChanged?: string,
    recomCampReward?: string,
    campJoin?: number,
    siegeWaitTime?: number,
    siegeMaxTime?: number,
    strikeCost?: string,
    siegeMinCost?: string,
    siegeMaxCost?: string,
    callBack?: string,
    fastCallBack?: string,
    marchSpeedUp?: string,
    superMarchSpeedUp?: string,
    minerAttack?: string,
    sameCampMinerAttackLim?: number,
    avoidWarTime?: number,
    avoidWarEffect?: string,
    maxEquipVolume?: number,
    breakOutUnlock?: string,
    dailyEventUnlock?: string,
    unlockWildLevel?: number,
    IntelligenceUnlock?: string,
    equipAuutoLock?: number,
    commonGrowthRecover?: number,
    commonGrowthMaxTime?: number,
    seniorGrowthCost?: string,
    battleJumpTime?: number,
    furiousRound?: number,
    furiousStrengthen?: number,
    furiousMaxStrengthen?: number,
    fortifiedAvoidWarTime?: number,
    applyGvernorTime?: number,
    fortifiedRetreatTime?: number,
    fortifiedAvailable?: string,
    resourceGetInterval?: number,
    resourceGetTime?: number,
    firstGuideReward?: string,
    plunderPrecent?: number,
    HamalplunderPrecent?: number,
    HamalLostPrecent?: number,
    campDevelopMaxTime?: number,
    changNameCost?: string,
    changNameExchange?: string,
    hornCost?: string,
    hornCostExchange?: string,
    chatCd?: number,
    Arrangement1UnlockDesc?: string,
    Arrangement2UnlockDesc?: string,
    mailShareCd?: number,
    mailSaveTime?: number,
    mailMaxKeep?: number,
    enchantingFreeRefreshInterval?: number,
    commonGrowthCost?: string,
    seniorEnchantingCost?: string,
    ultimateEnchantingCost?: string,
    enchantingFreeTimesLimit?: number,
    EnchantingBubble?: number,
    altarBubble?: number,
    activityIconAvailable?: string,
    welfareIconAvailable?: string,
    preferentialIconAvailable?: string,
};
// tslint:disable-next-line: max-classes-per-file
export class SeverData {
    /** 表类型: string, 注释: 配置ID */
    public id: string = null;
    /** 表类型: byte, 注释: 区服状态:
1.爆满
2.维护
3.流畅 */
    public serverState: number = 0;
    /** 表类型: bool, 注释: 新区 */
    public newServer: boolean = false;
    /** 表类型: date, 注释: 启动时间 */
    public setupTime: number = 0;
    /** 表类型: byte, 注释: 状态 */
    public status: number = 0;
    /** 表类型: uint, 注释: 当前人数 */
    public playerSum: number = 0;
    /** 表类型: ulong, 注释: 地图更新序号 */
    public mapSaveVer: number = 0;
    /** 表类型: date, 注释: 开服时间 */
    public openTime: number = 0;
    /** 表类型: long, 注释: 服务器偏移时间 */
    public addTime: number = 0;
}
export enum SeverDataField {
    id = "id",
    serverState = "serverState",
    newServer = "newServer",
    setupTime = "setupTime",
    status = "status",
    playerSum = "playerSum",
    mapSaveVer = "mapSaveVer",
    openTime = "openTime",
    addTime = "addTime",
}
export type SeverDataType = {
    id?: string,
    serverState?: number,
    newServer?: boolean,
    setupTime?: number,
    status?: number,
    playerSum?: number,
    mapSaveVer?: number,
    openTime?: number,
    addTime?: number,
};
// tslint:disable-next-line: max-classes-per-file
export class TimeEvent {
    /** 表类型: string, 注释: 配置ID */
    public id: string = null;
    /** 表类型: string, 注释: 任务名称 */
    public eventName: string = null;
    /** 表类型: ulong, 注释: 任务实际开始时间 */
    public taskstartTime: number = 0;
    /** 表类型: ulong, 注释: 任务结束时间 */
    public taskEndTime: number = 0;
    /** 表类型: ulong, 注释: 上次开始时间 */
    public lastStartTime: number = 0;
    /** 表类型: ulong, 注释: 上次结束时间 */
    public lastEndTime: number = 0;
    /** 表类型: int, 注释: 默认时间是0也就是utc时间 */
    public serverTimeZone: number = 0;
    /** 表类型: int, 注释: 重复循环次数，0就是无限次循环 */
    public LoopCount: number = 0;
    /** 表类型: int, 注释: 已经重复的次数 */
    public LoopTimers: number = 0;
    /** 表类型: bool, 注释: 第一次是否有cd */
    public isFristNoCD: boolean = false;
    /** 表类型: ulong, 注释: 任务间隔执行时间 */
    public taskLoopTime: number = 0;
    /** 表类型: byte, 注释: 循环类型
1.日循环
2.周循环
3.月循环 */
    public timeType: number = 0;
    /** 表类型: ulong, 注释: 每天任务开始的时间，和loopTime共同执行 */
    public startTime: number = 0;
    /** 表类型: ulong, 注释: 每天任务开始的时间的结束时间 */
    public startLimitTime: number = 0;
    /** 表类型: string, 注释: 前置任务id，可以组成任务集合 */
    public predecessorTaskID: string = null;
    /** 表类型: string, 注释: 任务的回调事件名字 */
    public taskEventString: string = null;
    /** 表类型: string, 注释: 任务执行日志列表 */
    public taskEventLog: string = null;
    /** 表类型: int, 注释: 任务目前状态，0等待执行，1正在执行，2执行错误，3执行成功 */
    public taskState: number = 0;
    /** 表类型: int, 注释: 任务之前的执行状态，1正在执行，2执行错误，3执行成功，注意写任务的一定要注意可能服务器被中断的情况 */
    public taskPreviousState: number = 0;
}
export enum TimeEventField {
    id = "id",
    eventName = "eventName",
    taskstartTime = "taskstartTime",
    taskEndTime = "taskEndTime",
    lastStartTime = "lastStartTime",
    lastEndTime = "lastEndTime",
    serverTimeZone = "serverTimeZone",
    LoopCount = "LoopCount",
    LoopTimers = "LoopTimers",
    isFristNoCD = "isFristNoCD",
    taskLoopTime = "taskLoopTime",
    timeType = "timeType",
    startTime = "startTime",
    startLimitTime = "startLimitTime",
    predecessorTaskID = "predecessorTaskID",
    taskEventString = "taskEventString",
    taskEventLog = "taskEventLog",
    taskState = "taskState",
    taskPreviousState = "taskPreviousState",
}
export type TimeEventType = {
    id?: string,
    eventName?: string,
    taskstartTime?: number,
    taskEndTime?: number,
    lastStartTime?: number,
    lastEndTime?: number,
    serverTimeZone?: number,
    LoopCount?: number,
    LoopTimers?: number,
    isFristNoCD?: boolean,
    taskLoopTime?: number,
    timeType?: number,
    startTime?: number,
    startLimitTime?: number,
    predecessorTaskID?: string,
    taskEventString?: string,
    taskEventLog?: string,
    taskState?: number,
    taskPreviousState?: number,
};
// tslint:disable-next-line: max-classes-per-file
export class WalletErrLog {
    /** 表类型: string, 注释: 记录ID */
    public id: string = null;
    /** 表类型: string, 注释: 类名 */
    public className: string = null;
    /** 表类型: string, 注释: 方法名 */
    public methodName: string = null;
    /** 表类型: string, 注释: 玩家ID */
    public userToken: string = null;
    /** 表类型: string, 注释: log信息 */
    public logMessage: string = null;
    /** 表类型: date, 注释: 记录时间 */
    public resultTime: number = 0;
}
export enum WalletErrLogField {
    id = "id",
    className = "className",
    methodName = "methodName",
    userToken = "userToken",
    logMessage = "logMessage",
    resultTime = "resultTime",
}
export type WalletErrLogType = {
    id?: string,
    className?: string,
    methodName?: string,
    userToken?: string,
    logMessage?: string,
    resultTime?: number,
};
// tslint:disable-next-line: max-classes-per-file
export class WalletLog {
    /** 表类型: string, 注释: 记录ID */
    public id: string = null;
    /** 表类型: string, 注释: 类名 */
    public className: string = null;
    /** 表类型: string, 注释: 方法名 */
    public methodName: string = null;
    /** 表类型: string, 注释: 玩家ID */
    public userToken: string = null;
    /** 表类型: string, 注释: log信息 */
    public logMessage: string = null;
    /** 表类型: date, 注释: 记录时间 */
    public resultTime: number = 0;
}
export enum WalletLogField {
    id = "id",
    className = "className",
    methodName = "methodName",
    userToken = "userToken",
    logMessage = "logMessage",
    resultTime = "resultTime",
}
export type WalletLogType = {
    id?: string,
    className?: string,
    methodName?: string,
    userToken?: string,
    logMessage?: string,
    resultTime?: number,
};

// tslint:disable-next-line: max-classes-per-file
export class ServerBackGroundData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: BackGroundData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: BackGroundData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: BackGroundData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackGroundData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: BackGroundData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackGroundData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<BackGroundData>,
                            success: (datas: BackGroundData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackGroundData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "queryData", [index, wapper.getSql("BackGroundDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<BackGroundData>,
                             success: (datas: BackGroundData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackGroundData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "queryDatas", [index, wapper.getSql("BackGroundDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: BackGroundDataType, columns: (keyof BackGroundData)[],
                           success: (data: BackGroundData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackGroundData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: BackGroundDataType, columns: (keyof BackGroundData)[],
                            success: (data: BackGroundData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackGroundData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: BackGroundData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackGroundData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: BackGroundDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof BackGroundData>(id: string, prototype: T, value: BackGroundData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: BackGroundDataType, data: BackGroundDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: BackGroundDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<BackGroundData>, data: BackGroundDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "updateByQueryWrapper", [index, wapper.getSql("BackGroundDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackGroundData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackGroundData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerBackStoryData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: BackStoryData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: BackStoryData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: BackStoryData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackStoryData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: BackStoryData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackStoryData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<BackStoryData>,
                            success: (datas: BackStoryData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackStoryData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "queryData", [index, wapper.getSql("BackStoryDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<BackStoryData>,
                             success: (datas: BackStoryData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackStoryData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "queryDatas", [index, wapper.getSql("BackStoryDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: BackStoryDataType, columns: (keyof BackStoryData)[],
                           success: (data: BackStoryData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackStoryData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: BackStoryDataType, columns: (keyof BackStoryData)[],
                            success: (data: BackStoryData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackStoryData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: BackStoryData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("BackStoryData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: BackStoryDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof BackStoryData>(id: string, prototype: T, value: BackStoryData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: BackStoryDataType, data: BackStoryDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: BackStoryDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<BackStoryData>, data: BackStoryDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "updateByQueryWrapper", [index, wapper.getSql("BackStoryDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("BackStoryData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("BackStoryData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerChapterData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: ChapterData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: ChapterData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: ChapterData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChapterData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: ChapterData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChapterData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<ChapterData>,
                            success: (datas: ChapterData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChapterData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "queryData", [index, wapper.getSql("ChapterDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<ChapterData>,
                             success: (datas: ChapterData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChapterData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "queryDatas", [index, wapper.getSql("ChapterDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: ChapterDataType, columns: (keyof ChapterData)[],
                           success: (data: ChapterData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChapterData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: ChapterDataType, columns: (keyof ChapterData)[],
                            success: (data: ChapterData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChapterData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: ChapterData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChapterData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: ChapterDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof ChapterData>(id: string, prototype: T, value: ChapterData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: ChapterDataType, data: ChapterDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: ChapterDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<ChapterData>, data: ChapterDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "updateByQueryWrapper", [index, wapper.getSql("ChapterDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChapterData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChapterData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerChatMessageData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: ChatMessageData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: ChatMessageData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: ChatMessageData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChatMessageData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: ChatMessageData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChatMessageData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<ChatMessageData>,
                            success: (datas: ChatMessageData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChatMessageData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "queryData", [index, wapper.getSql("ChatMessageDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<ChatMessageData>,
                             success: (datas: ChatMessageData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChatMessageData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "queryDatas", [index, wapper.getSql("ChatMessageDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: ChatMessageDataType, columns: (keyof ChatMessageData)[],
                           success: (data: ChatMessageData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChatMessageData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: ChatMessageDataType, columns: (keyof ChatMessageData)[],
                            success: (data: ChatMessageData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChatMessageData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: ChatMessageData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ChatMessageData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: ChatMessageDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof ChatMessageData>(id: string, prototype: T, value: ChatMessageData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: ChatMessageDataType, data: ChatMessageDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: ChatMessageDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<ChatMessageData>, data: ChatMessageDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "updateByQueryWrapper", [index, wapper.getSql("ChatMessageDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ChatMessageData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ChatMessageData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerDialogData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: DialogData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: DialogData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: DialogData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("DialogData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("DialogData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: DialogData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("DialogData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("DialogData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<DialogData>,
                            success: (datas: DialogData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("DialogData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("DialogData", "queryData", [index, wapper.getSql("DialogDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<DialogData>,
                             success: (datas: DialogData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("DialogData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("DialogData", "queryDatas", [index, wapper.getSql("DialogDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: DialogDataType, columns: (keyof DialogData)[],
                           success: (data: DialogData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("DialogData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("DialogData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: DialogDataType, columns: (keyof DialogData)[],
                            success: (data: DialogData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("DialogData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("DialogData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: DialogData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("DialogData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("DialogData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: DialogDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof DialogData>(id: string, prototype: T, value: DialogData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: DialogDataType, data: DialogDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: DialogDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<DialogData>, data: DialogDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "updateByQueryWrapper", [index, wapper.getSql("DialogDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("DialogData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("DialogData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerGalData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: GalData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: GalData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: GalData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: GalData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<GalData>,
                            success: (datas: GalData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalData", "queryData", [index, wapper.getSql("GalDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<GalData>,
                             success: (datas: GalData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalData", "queryDatas", [index, wapper.getSql("GalDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: GalDataType, columns: (keyof GalData)[],
                           success: (data: GalData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: GalDataType, columns: (keyof GalData)[],
                            success: (data: GalData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: GalData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: GalDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof GalData>(id: string, prototype: T, value: GalData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: GalDataType, data: GalDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: GalDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<GalData>, data: GalDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "updateByQueryWrapper", [index, wapper.getSql("GalDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerGalPreviewData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: GalPreviewData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: GalPreviewData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: GalPreviewData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalPreviewData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: GalPreviewData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalPreviewData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<GalPreviewData>,
                            success: (datas: GalPreviewData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalPreviewData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "queryData", [index, wapper.getSql("GalPreviewDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<GalPreviewData>,
                             success: (datas: GalPreviewData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalPreviewData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "queryDatas", [index, wapper.getSql("GalPreviewDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: GalPreviewDataType, columns: (keyof GalPreviewData)[],
                           success: (data: GalPreviewData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalPreviewData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: GalPreviewDataType, columns: (keyof GalPreviewData)[],
                            success: (data: GalPreviewData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalPreviewData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: GalPreviewData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalPreviewData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: GalPreviewDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof GalPreviewData>(id: string, prototype: T, value: GalPreviewData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: GalPreviewDataType, data: GalPreviewDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: GalPreviewDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<GalPreviewData>, data: GalPreviewDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "updateByQueryWrapper", [index, wapper.getSql("GalPreviewDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalPreviewData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalPreviewData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerLanguageData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: LanguageData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: LanguageData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: LanguageData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: LanguageData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<LanguageData>,
                            success: (datas: LanguageData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "queryData", [index, wapper.getSql("LanguageDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<LanguageData>,
                             success: (datas: LanguageData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "queryDatas", [index, wapper.getSql("LanguageDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: LanguageDataType, columns: (keyof LanguageData)[],
                           success: (data: LanguageData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: LanguageDataType, columns: (keyof LanguageData)[],
                            success: (data: LanguageData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: LanguageData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: LanguageDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof LanguageData>(id: string, prototype: T, value: LanguageData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: LanguageDataType, data: LanguageDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: LanguageDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<LanguageData>, data: LanguageDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "updateByQueryWrapper", [index, wapper.getSql("LanguageDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerLanguageDataCN {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: LanguageDataCN,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: LanguageDataCN[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: LanguageDataCN) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageDataCN.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: LanguageDataCN[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageDataCN.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<LanguageDataCN>,
                            success: (datas: LanguageDataCN) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageDataCN.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "queryData", [index, wapper.getSql("LanguageDataCNs")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<LanguageDataCN>,
                             success: (datas: LanguageDataCN[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageDataCN.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "queryDatas", [index, wapper.getSql("LanguageDataCNs")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: LanguageDataCNType, columns: (keyof LanguageDataCN)[],
                           success: (data: LanguageDataCN) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageDataCN.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: LanguageDataCNType, columns: (keyof LanguageDataCN)[],
                            success: (data: LanguageDataCN[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageDataCN.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: LanguageDataCN[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("LanguageDataCN.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: LanguageDataCNType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof LanguageDataCN>(id: string, prototype: T, value: LanguageDataCN[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: LanguageDataCNType, data: LanguageDataCNType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: LanguageDataCNType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<LanguageDataCN>, data: LanguageDataCNType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "updateByQueryWrapper", [index, wapper.getSql("LanguageDataCNs"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("LanguageDataCN.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("LanguageDataCN", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerProjectData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: ProjectData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: ProjectData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: ProjectData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ProjectData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: ProjectData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ProjectData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<ProjectData>,
                            success: (datas: ProjectData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ProjectData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "queryData", [index, wapper.getSql("ProjectDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<ProjectData>,
                             success: (datas: ProjectData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ProjectData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "queryDatas", [index, wapper.getSql("ProjectDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: ProjectDataType, columns: (keyof ProjectData)[],
                           success: (data: ProjectData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ProjectData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: ProjectDataType, columns: (keyof ProjectData)[],
                            success: (data: ProjectData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ProjectData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: ProjectData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ProjectData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: ProjectDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof ProjectData>(id: string, prototype: T, value: ProjectData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: ProjectDataType, data: ProjectDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: ProjectDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<ProjectData>, data: ProjectDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "updateByQueryWrapper", [index, wapper.getSql("ProjectDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ProjectData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ProjectData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerGalRoleData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: GalRoleData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: GalRoleData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: GalRoleData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalRoleData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: GalRoleData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalRoleData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<GalRoleData>,
                            success: (datas: GalRoleData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalRoleData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "queryData", [index, wapper.getSql("GalRoleDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<GalRoleData>,
                             success: (datas: GalRoleData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalRoleData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "queryDatas", [index, wapper.getSql("GalRoleDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: GalRoleDataType, columns: (keyof GalRoleData)[],
                           success: (data: GalRoleData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalRoleData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: GalRoleDataType, columns: (keyof GalRoleData)[],
                            success: (data: GalRoleData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalRoleData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: GalRoleData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("GalRoleData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: GalRoleDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof GalRoleData>(id: string, prototype: T, value: GalRoleData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: GalRoleDataType, data: GalRoleDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: GalRoleDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<GalRoleData>, data: GalRoleDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "updateByQueryWrapper", [index, wapper.getSql("GalRoleDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("GalRoleData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("GalRoleData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerSceneData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: SceneData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: SceneData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: SceneData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SceneData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SceneData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: SceneData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SceneData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SceneData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<SceneData>,
                            success: (datas: SceneData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SceneData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SceneData", "queryData", [index, wapper.getSql("SceneDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<SceneData>,
                             success: (datas: SceneData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SceneData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SceneData", "queryDatas", [index, wapper.getSql("SceneDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: SceneDataType, columns: (keyof SceneData)[],
                           success: (data: SceneData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SceneData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SceneData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: SceneDataType, columns: (keyof SceneData)[],
                            success: (data: SceneData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SceneData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SceneData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: SceneData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SceneData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SceneData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: SceneDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof SceneData>(id: string, prototype: T, value: SceneData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: SceneDataType, data: SceneDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: SceneDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<SceneData>, data: SceneDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "updateByQueryWrapper", [index, wapper.getSql("SceneDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SceneData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SceneData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerUserProjectData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: UserProjectData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: UserProjectData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: UserProjectData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("UserProjectData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: UserProjectData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("UserProjectData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<UserProjectData>,
                            success: (datas: UserProjectData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("UserProjectData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "queryData", [index, wapper.getSql("UserProjectDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<UserProjectData>,
                             success: (datas: UserProjectData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("UserProjectData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "queryDatas", [index, wapper.getSql("UserProjectDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: UserProjectDataType, columns: (keyof UserProjectData)[],
                           success: (data: UserProjectData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("UserProjectData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: UserProjectDataType, columns: (keyof UserProjectData)[],
                            success: (data: UserProjectData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("UserProjectData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: UserProjectData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("UserProjectData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: UserProjectDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof UserProjectData>(id: string, prototype: T, value: UserProjectData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: UserProjectDataType, data: UserProjectDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: UserProjectDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<UserProjectData>, data: UserProjectDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "updateByQueryWrapper", [index, wapper.getSql("UserProjectDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("UserProjectData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("UserProjectData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerVoiceBase {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: VoiceBase,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: VoiceBase[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: VoiceBase) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("VoiceBase.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: VoiceBase[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("VoiceBase.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<VoiceBase>,
                            success: (datas: VoiceBase) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("VoiceBase.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "queryData", [index, wapper.getSql("VoiceBases")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<VoiceBase>,
                             success: (datas: VoiceBase[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("VoiceBase.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "queryDatas", [index, wapper.getSql("VoiceBases")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: VoiceBaseType, columns: (keyof VoiceBase)[],
                           success: (data: VoiceBase) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("VoiceBase.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: VoiceBaseType, columns: (keyof VoiceBase)[],
                            success: (data: VoiceBase[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("VoiceBase.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: VoiceBase[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("VoiceBase.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: VoiceBaseType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof VoiceBase>(id: string, prototype: T, value: VoiceBase[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: VoiceBaseType, data: VoiceBaseType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: VoiceBaseType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<VoiceBase>, data: VoiceBaseType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "updateByQueryWrapper", [index, wapper.getSql("VoiceBases"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("VoiceBase.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("VoiceBase", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerErrorInfo {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: ErrorInfo,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: ErrorInfo[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: ErrorInfo) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ErrorInfo.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: ErrorInfo[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ErrorInfo.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<ErrorInfo>,
                            success: (datas: ErrorInfo) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ErrorInfo.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "queryData", [index, wapper.getSql("ErrorInfos")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<ErrorInfo>,
                             success: (datas: ErrorInfo[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ErrorInfo.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "queryDatas", [index, wapper.getSql("ErrorInfos")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: ErrorInfoType, columns: (keyof ErrorInfo)[],
                           success: (data: ErrorInfo) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ErrorInfo.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: ErrorInfoType, columns: (keyof ErrorInfo)[],
                            success: (data: ErrorInfo[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ErrorInfo.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: ErrorInfo[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ErrorInfo.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: ErrorInfoType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof ErrorInfo>(id: string, prototype: T, value: ErrorInfo[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: ErrorInfoType, data: ErrorInfoType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: ErrorInfoType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<ErrorInfo>, data: ErrorInfoType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "updateByQueryWrapper", [index, wapper.getSql("ErrorInfos"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ErrorInfo.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ErrorInfo", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerFormulas {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: Formulas,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: Formulas[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: Formulas) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("Formulas.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("Formulas", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: Formulas[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("Formulas.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("Formulas", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<Formulas>,
                            success: (datas: Formulas) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("Formulas.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("Formulas", "queryData", [index, wapper.getSql("Formulass")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<Formulas>,
                             success: (datas: Formulas[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("Formulas.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("Formulas", "queryDatas", [index, wapper.getSql("Formulass")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: FormulasType, columns: (keyof Formulas)[],
                           success: (data: Formulas) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("Formulas.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("Formulas", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: FormulasType, columns: (keyof Formulas)[],
                            success: (data: Formulas[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("Formulas.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("Formulas", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: Formulas[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("Formulas.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("Formulas", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: FormulasType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof Formulas>(id: string, prototype: T, value: Formulas[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: FormulasType, data: FormulasType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: FormulasType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<Formulas>, data: FormulasType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "updateByQueryWrapper", [index, wapper.getSql("Formulass"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("Formulas.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("Formulas", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerServerLog {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: ServerLog,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: ServerLog[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: ServerLog) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerLog.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: ServerLog[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerLog.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<ServerLog>,
                            success: (datas: ServerLog) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerLog.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "queryData", [index, wapper.getSql("ServerLogs")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<ServerLog>,
                             success: (datas: ServerLog[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerLog.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "queryDatas", [index, wapper.getSql("ServerLogs")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: ServerLogType, columns: (keyof ServerLog)[],
                           success: (data: ServerLog) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerLog.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: ServerLogType, columns: (keyof ServerLog)[],
                            success: (data: ServerLog[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerLog.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: ServerLog[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerLog.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: ServerLogType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof ServerLog>(id: string, prototype: T, value: ServerLog[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: ServerLogType, data: ServerLogType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: ServerLogType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<ServerLog>, data: ServerLogType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "updateByQueryWrapper", [index, wapper.getSql("ServerLogs"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerLog.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerLog", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerServerUserData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: ServerUserData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: ServerUserData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: ServerUserData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerUserData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: ServerUserData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerUserData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<ServerUserData>,
                            success: (datas: ServerUserData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerUserData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "queryData", [index, wapper.getSql("ServerUserDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<ServerUserData>,
                             success: (datas: ServerUserData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerUserData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "queryDatas", [index, wapper.getSql("ServerUserDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: ServerUserDataType, columns: (keyof ServerUserData)[],
                           success: (data: ServerUserData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerUserData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: ServerUserDataType, columns: (keyof ServerUserData)[],
                            success: (data: ServerUserData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerUserData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: ServerUserData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("ServerUserData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: ServerUserDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof ServerUserData>(id: string, prototype: T, value: ServerUserData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: ServerUserDataType, data: ServerUserDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: ServerUserDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<ServerUserData>, data: ServerUserDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "updateByQueryWrapper", [index, wapper.getSql("ServerUserDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("ServerUserData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("ServerUserData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerSeverConfigBase {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: SeverConfigBase,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: SeverConfigBase[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: SeverConfigBase) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverConfigBase.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: SeverConfigBase[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverConfigBase.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<SeverConfigBase>,
                            success: (datas: SeverConfigBase) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverConfigBase.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "queryData", [index, wapper.getSql("SeverConfigBases")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<SeverConfigBase>,
                             success: (datas: SeverConfigBase[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverConfigBase.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "queryDatas", [index, wapper.getSql("SeverConfigBases")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: SeverConfigBaseType, columns: (keyof SeverConfigBase)[],
                           success: (data: SeverConfigBase) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverConfigBase.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: SeverConfigBaseType, columns: (keyof SeverConfigBase)[],
                            success: (data: SeverConfigBase[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverConfigBase.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: SeverConfigBase[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverConfigBase.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: SeverConfigBaseType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof SeverConfigBase>(id: string, prototype: T, value: SeverConfigBase[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: SeverConfigBaseType, data: SeverConfigBaseType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: SeverConfigBaseType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<SeverConfigBase>, data: SeverConfigBaseType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "updateByQueryWrapper", [index, wapper.getSql("SeverConfigBases"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverConfigBase.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverConfigBase", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerSeverData {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: SeverData,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: SeverData[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: SeverData) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverData.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverData", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: SeverData[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverData.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverData", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<SeverData>,
                            success: (datas: SeverData) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverData.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverData", "queryData", [index, wapper.getSql("SeverDatas")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<SeverData>,
                             success: (datas: SeverData[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverData.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverData", "queryDatas", [index, wapper.getSql("SeverDatas")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: SeverDataType, columns: (keyof SeverData)[],
                           success: (data: SeverData) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverData.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverData", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: SeverDataType, columns: (keyof SeverData)[],
                            success: (data: SeverData[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverData.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverData", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: SeverData[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("SeverData.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("SeverData", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: SeverDataType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof SeverData>(id: string, prototype: T, value: SeverData[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: SeverDataType, data: SeverDataType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: SeverDataType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<SeverData>, data: SeverDataType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "updateByQueryWrapper", [index, wapper.getSql("SeverDatas"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("SeverData.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("SeverData", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerTimeEvent {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: TimeEvent,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: TimeEvent[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: TimeEvent) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("TimeEvent.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: TimeEvent[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("TimeEvent.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<TimeEvent>,
                            success: (datas: TimeEvent) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("TimeEvent.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "queryData", [index, wapper.getSql("TimeEvents")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<TimeEvent>,
                             success: (datas: TimeEvent[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("TimeEvent.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "queryDatas", [index, wapper.getSql("TimeEvents")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: TimeEventType, columns: (keyof TimeEvent)[],
                           success: (data: TimeEvent) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("TimeEvent.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: TimeEventType, columns: (keyof TimeEvent)[],
                            success: (data: TimeEvent[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("TimeEvent.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: TimeEvent[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("TimeEvent.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: TimeEventType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof TimeEvent>(id: string, prototype: T, value: TimeEvent[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: TimeEventType, data: TimeEventType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: TimeEventType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<TimeEvent>, data: TimeEventType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "updateByQueryWrapper", [index, wapper.getSql("TimeEvents"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("TimeEvent.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("TimeEvent", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerWalletErrLog {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: WalletErrLog,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: WalletErrLog[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: WalletErrLog) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletErrLog.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: WalletErrLog[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletErrLog.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<WalletErrLog>,
                            success: (datas: WalletErrLog) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletErrLog.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "queryData", [index, wapper.getSql("WalletErrLogs")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<WalletErrLog>,
                             success: (datas: WalletErrLog[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletErrLog.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "queryDatas", [index, wapper.getSql("WalletErrLogs")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: WalletErrLogType, columns: (keyof WalletErrLog)[],
                           success: (data: WalletErrLog) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletErrLog.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: WalletErrLogType, columns: (keyof WalletErrLog)[],
                            success: (data: WalletErrLog[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletErrLog.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: WalletErrLog[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletErrLog.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: WalletErrLogType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof WalletErrLog>(id: string, prototype: T, value: WalletErrLog[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: WalletErrLogType, data: WalletErrLogType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: WalletErrLogType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<WalletErrLog>, data: WalletErrLogType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "updateByQueryWrapper", [index, wapper.getSql("WalletErrLogs"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletErrLog.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletErrLog", "removeByIds", [index, ids]);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerWalletLog {
    /**
     * 向数据表中添加一条数据
     * @param data 需要添加的对象
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static add(data: WalletLog,
                      success?: () => void,
                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.add_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "add", [index, data]);
    }
    /**
     * 向数据表中添加多条数据
     * @param datas 需要添加的对象数组
     * @param success 添加成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static addList(datas: WalletLog[],
                          success?: () => void,
                          error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.addList_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "addList", [index, datas]);
    }
    /**
     * 根据 id 获取数据, 如果没查到数据, 则回调函数参数值为 null
     * @param id 需要查询的 id
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDataById(id: string,
                              success: (data: WalletLog) => void,
                              error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletLog.getDataById_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "getDataById", [index, id]);
    }
    /**
     * 根据 id 集合获取多条数据, 如果没查到数据, 则回调函数参数值为空数组对象
     * @param ids 需要查询的 id 数组
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static getDatasByIds(ids: string[],
                                success: (data: WalletLog[]) => void,
                                error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletLog.getDatasByIds_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "getDatasByIds", [index, ids]);
    }
    /**
     * 根据条件查询器获取单条数据, 如果没有查询到, 则回调函数参数值为 null, 如果满足条件的数据不止一条, 则会产生异常.
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryData(wapper: QueryWapper<WalletLog>,
                            success: (datas: WalletLog) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletLog.queryData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "queryData", [index, wapper.getSql("WalletLogs")]);
    }
    /**
     * 根据条件查询器获取多条数据, 如果没有查询到, 则回调函数参数值为空数组对象
     * 
     * 注意: 该函数仅针对特殊和复杂的条件查询, 非特殊情况, 禁止使用该方法, 如果需要多条件查询, 请使用 findData 和 findDatas
     * @param wapper 查询条件
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static queryDatas(wapper: QueryWapper<WalletLog>,
                             success: (datas: WalletLog[]) => void,
                             error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletLog.queryDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "queryDatas", [index, wapper.getSql("WalletLogs")]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的单条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为 null, 如果匹配的数据不止一条, 则会产生异常.
     * 
     * 例如: findData({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findData(condition: WalletLogType, columns: (keyof WalletLog)[],
                           success: (data: WalletLog) => void,
                           error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletLog.findData_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "findData", [index, condition, columns]);
    }
    /**
     * 根据 condition 中的属性与值查询匹配的多条数据, columns 为需要返回的列, 如果没有匹配的数据, 则回调函数参数值为空数组对象
     * 
     * 例如: findDatas({ playerName: "test", passWord: "123456" }, [UserVarBaseField.id]);
     * 
     * 以上会匹配 playerName 为 test, passWord 为 123456 的数据, 返回列为 id,playerName,passWord
     * @param condition 需要匹配的数据内容
     * @param columns 需要返回的列, 默认包含匹配的条件字段, 如果 columns 为 null, 则返回所有列
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     * @param error 发生错误时的回调函数
     */
    public static findDatas(condition: WalletLogType, columns: (keyof WalletLog)[],
                            success: (data: WalletLog[]) => void,
                            error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletLog.findDatas_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "findDatas", [index, condition, columns]);
    }
    /**
     * 获取表中的所有数据, 因查询的数据量较大, 慎用该方法
     * @param success 获取成功后走的回调函数, 参数为查询的结果
     */
    public static getAll(success: (datas: WalletLog[]) => void,
                         error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        AwaitDataManager.awaitFor("WalletLog.getAll_#" + index,
        (data) => success(data[1]), error && ((data) => error(data[1])));
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "getAll", [index]);
    }
    /**
     * 根据 id 修改某条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param id 需要修改的数据的id
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateById(id: string, data: WalletLogType,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.updateById_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "updateById", [index, id, data]);
    }
    /**
     * 根据 id 修改某条属性的值
     * @param id 需要修改的数据的id
     * @param prototype 属性名称
     * @param value 修改的值
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updatePrototypeById<T extends keyof WalletLog>(id: string, prototype: T, value: WalletLog[T],
                                      success?: () => void,
                                      error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.updatePrototypeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "updatePrototypeById", [index, id, prototype, value]);
    }
    /**
     * 根据 condition 中的属性与值, 修改所有匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param condition 需要匹配的数据内容
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByConditions(condition: WalletLogType, data: WalletLogType,
                                     success?: () => void,
                                     error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.updateByConditions_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "updateByConditions", [index, condition, data]);
    }
    /**
     * 根据多个 id 修改多条数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param ids 需要修改数的id的数组
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByIds(ids: string[], data: WalletLogType,
                              success?: () => void,
                              error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.updateByIds_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "updateByIds", [index, ids, data]);
    }
    /**
     * 根据多个 wapper 查询匹配的数据, data 中包含的字段就是需要修改的值
     * 
     * 注意: 不变的字段不要设置到 data 字段中
     * @param wapper 查询条件
     * @param data 需要修改的数据
     * @param success 修改成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static updateByQueryWrapper(wapper: QueryWapper<WalletLog>, data: WalletLogType,
                                       success?: () => void,
                                       error?: (msg: string) => void) {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.updateByQueryWrapper_#" + index,
            () => success(), error && ((d) => error(d[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "updateByQueryWrapper", [index, wapper.getSql("WalletLogs"), data]);
    }
    /**
     * 根据 id 删除某条数据
     * @param id 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
    public static removeById(id: string,
                             success?: () => void,
                             error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.removeById_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "removeById", [index, id]);
    }
    /**
     * 根据多个 id 删除多条数据
     * @param ids 需要删除的数据的id
     * @param success 删除成功后的回调函数
     * @param error 发生错误时的回调函数
     */
     public static removeByIds(ids: string[],
                               success?: () => void,
                               error?: (msg: string) => void): void {
        let index = _awaitMessageIndex++;
        if (success) {
            AwaitDataManager.awaitFor("WalletLog.removeByIds_#" + index,
            () => success(), error && ((data) => error(data[1])));
        }
		FrontDataManagerRequest.Instance.callFunc("WalletLog", "removeByIds", [index, ids]);
    }
}
export enum EntityType {
    BackGroundData = "BackGroundData",
    BackStoryData = "BackStoryData",
    ChapterData = "ChapterData",
    ChatMessageData = "ChatMessageData",
    DialogData = "DialogData",
    GalData = "GalData",
    GalPreviewData = "GalPreviewData",
    LanguageData = "LanguageData",
    LanguageDataCN = "LanguageDataCN",
    ProjectData = "ProjectData",
    GalRoleData = "GalRoleData",
    SceneData = "SceneData",
    UserProjectData = "UserProjectData",
    VoiceBase = "VoiceBase",
    ErrorInfo = "ErrorInfo",
    Formulas = "Formulas",
    ServerLog = "ServerLog",
    ServerUserData = "ServerUserData",
    SeverConfigBase = "SeverConfigBase",
    SeverData = "SeverData",
    TimeEvent = "TimeEvent",
    WalletErrLog = "WalletErrLog",
    WalletLog = "WalletLog",
}
// tslint:disable-next-line: max-classes-per-file
export class ServerData {
    public static BackGroundData: typeof ServerBackGroundData = ServerBackGroundData;
    public static BackStoryData: typeof ServerBackStoryData = ServerBackStoryData;
    public static ChapterData: typeof ServerChapterData = ServerChapterData;
    public static ChatMessageData: typeof ServerChatMessageData = ServerChatMessageData;
    public static DialogData: typeof ServerDialogData = ServerDialogData;
    public static GalData: typeof ServerGalData = ServerGalData;
    public static GalPreviewData: typeof ServerGalPreviewData = ServerGalPreviewData;
    public static LanguageData: typeof ServerLanguageData = ServerLanguageData;
    public static LanguageDataCN: typeof ServerLanguageDataCN = ServerLanguageDataCN;
    public static ProjectData: typeof ServerProjectData = ServerProjectData;
    public static GalRoleData: typeof ServerGalRoleData = ServerGalRoleData;
    public static SceneData: typeof ServerSceneData = ServerSceneData;
    public static UserProjectData: typeof ServerUserProjectData = ServerUserProjectData;
    public static VoiceBase: typeof ServerVoiceBase = ServerVoiceBase;
    public static ErrorInfo: typeof ServerErrorInfo = ServerErrorInfo;
    public static Formulas: typeof ServerFormulas = ServerFormulas;
    public static ServerLog: typeof ServerServerLog = ServerServerLog;
    public static ServerUserData: typeof ServerServerUserData = ServerServerUserData;
    public static SeverConfigBase: typeof ServerSeverConfigBase = ServerSeverConfigBase;
    public static SeverData: typeof ServerSeverData = ServerSeverData;
    public static TimeEvent: typeof ServerTimeEvent = ServerTimeEvent;
    public static WalletErrLog: typeof ServerWalletErrLog = ServerWalletErrLog;
    public static WalletLog: typeof ServerWalletLog = ServerWalletLog;
}