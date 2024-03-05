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

export class BindKeyName {
    /** 执行的步骤发生改变 */
    public static OnChangeStep = "OnChangeStep";
    /** 所有步骤执行完成 */
    public static OnStepExecuteFinish = "OnStepExecuteFinish";
    /** 开始播放 */
    public static OnPlay = "OnPlay";
    /** 退出播放 */
    public static OnExitPlay = "OnExitPlay";
    /** 切换场景 */
    public static OnChangeScene = "OnChangeScene";
    /** 文件树更新 */
    public static OnRefreshFileTree = "OnRefreshFileTree";

    //----------------------- 逻辑块相关 -------------------------

    /** 切换立绘, 如果参数为空表示关闭立绘 */
    public static OnChangeStandingPainting = "OnChangeStandingPainting";
    /** 切换背景, 如果参数为空表示关闭背景 */
    public static OnChangeBackground = "OnChangeBackground";
    /** 切换背景音效, 如果参数为空表示关闭音效 */
    public static OnChangeSound = "OnChangeSound";
    /** 切换语音, 如果参数为空表示关闭语音 */
    public static OnChangeVoice = "OnChangeVoice";
    /** 切换对话文本, 如果参数为空表示关闭对话 */
    public static OnChangeConversation = "OnChangeConversationText";
    /** 切换对话选项, 如果参数为空表示关闭对话选项 */
    public static OnChangeConversationOptions = "OnChangeConversationOptions";

    //-----------------------------------------------------------

    //----------------------- Ai对话填充页面数据 -------------------------

    /**
     * Ai设置游戏基础设定: 数据类型: 
     * {
     *     gameName: string, //游戏名称
     *     backgroundSetting: string, //背景设定
     *     beauxArtStyle: string, //美术风格
     * }
     */
    public static OnAiSetBasicSettings = "OnAiSetBasicSettings";

    /**
     * Ai设置角色设定: 数据类型:
     * {
     *     roleName: string, //角色名称
     *     roleSetting: string, //角色设定
     *     RoleDefinition: string //角色定位
     *     voice: { name: string, value: string }, //角色声线,
     *     standingPainting: { [key: string]: string }, //角色立绘, key: 立绘表情, value: 立绘路径
     * }
     */
    public static OnAiSetRoleSetting = "OnAiSetRoleSetting";

    /**
     * Ai设置场景对话: 数据类型
     * {
     *     content: string, //对话内容
     *     imageName: string, //背景图片名称
     *     imageDescription: string, //背景图片描述
     *     image: string, //背景图片
     * }
     */
    public static OnAiSetSceneDialog = "OnAiSetSceneDialog";

    /** 章节场景目录: 刷新章节数据 (无参数, 需要数据请取 EditorManager.Instance.chapterList) */
    public static OnRefreshChapter = "OnRefreshChapter";

    /**
     * Ai设置场景音乐: 数据类型:
     * {
     *     musicName: string, //音乐名称
     *     musicDescription: string, //音乐描述
     *     music: string, //音乐
     * }
     */
    public static OnAiSetMusic = "OnAiSetMusic";

    //-----------------------------------------------------------

    /**
     * AI聊天消息更新, 参数类型: ChatMessageUpdateResult
    */
    public static AIChatMessageUpDate = "AIChatMessageUpDate";

    //AI引导进行游戏基础设定
    public static GameBaseSettingByAI = "GameBaseSettingByAI";
    //AI引导进行角色设定
    public static RoleSettingByAI = "RoleSettingByAI";
    //AI引导进行章节场景目录
    public static ChapterSceneMenuByAI = "ChapterSceneMenuByAI";
    public static SceneTalkByAI = "SceneTalkByAI";
    public static BackgroundPictureByAI = "BackgroundPictureByAI";
    public static BackgroundMusicByAI = "BackgroundMusicByAI";
    //左侧展示框 进度条被拖动 进度更新
    public static SpreadingPlateProgressbarValue = "SpreadingPlateProgressbarValue";
    //AI引导 声音开始播放
    public static AIAudioPlayFun = "AIAudioPlayFun";
    //预加载资源 状态
    public static PreloadStateChange = "PreloadStateChange";
    //刷新引导框内容
    public static refreshGuideDescribe = "refreshGuideDescribe";
    //引导底框位置变化
    public static TutorialBgPosChange = "TutorialBgPosChange";
    //储存路径修改
    public static ModifyPath = "ModifyPath";
    // 项目列表刷新
    public static projectListRefresh = "projectListRefresh";
    //切换对话页签: 数据类型: ChatTab
    public static OnChangeChatTab = "OnChangeChatTab";
    //创建对话页签, 数据类型: ChatTab
    public static OnCreateChatTab = "OnCreateChatTab";
    //获取当前创建的项目 GALdata
    public static GetCurrentGALdata = "GetCurrentGALdata";
    //刷新编辑器页面
    public static refreshEditorUI = "refreshEditorUI";
    //获取已创建的项目 GALData
    public static getGalDataById = "getGalDataById";
    //获取项目的背景设定
    public static getBackStoryById = "getBackStoryById";
    /**获取支持的画风 */
    public static GetStyleExample = "GetStyleExample";
    //设置对话数据, 数据类型: { [key: string]: Entity.DialogData }
    public static OnSetDialogData = "OnSerDialogData";
    //获取场景对话数据
    public static SceneTalkData = "SceneTalkData";
}