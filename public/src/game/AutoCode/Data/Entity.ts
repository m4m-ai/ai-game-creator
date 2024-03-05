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
namespace Entity {
    export type Dictionary<K, V> = {
        [key: string | number]: V;
    };
    export type List<V> = {
        [Symbol.iterator]: V;
        [key: number]: V;
        get length(): number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BackGroundData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 项目Id */
        projectId?: string;
        /** 表类型: string, 注释: 章节ID */
        chapter?: string;
        /** 表类型: string, 注释: 场景ID */
        scene?: string;
        /** 表类型: string, 注释: 背景名字 */
        BGName?: string;
        /** 表类型: string, 注释: 背景设定 */
        backStory?: string;
        /** 表类型: string, 注释: 资源地址 */
        resPath?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type BackStoryData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 世界名 */
        worldName?: string;
        /** 表类型: string, 注释: 设定 */
        backStory?: string;
        /** 表类型: string, 注释: 势力 */
        camps?: string;
        /** 表类型: string, 注释: 简述 */
        encapsulate?: string;
        /** 表类型: string, 注释: GALid */
        projectId?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ChapterData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 章节名 */
        ChapterName?: string;
        /** 表类型: string, 注释: 所属GAL */
        galID?: string;
        /** 表类型: strings, 注释: 场景列表 */
        scenes?: List<string>;
        /** 表类型: strings, 注释: 场景名字 */
        scensName?: List<string>;
        /** 表类型: string, 注释: 故事大纲 */
        storyOutLine?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ChatMessageData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 标题 */
        title?: string;
        /** 表类型: string, 注释: 内容 */
        content?: string;
        /** 表类型: stringMap, 注释: 图片 */
        images?: Dictionary<string, string>;
        /** 表类型: stringMap, 注释: 声音 */
        sounds?: Dictionary<string, string>;
        /** 表类型: intMap, 注释: 按钮 */
        buttons?: Dictionary<string, number>;
        /** 表类型: bool, 注释: 是否结束 */
        isOver?: boolean;
        /** 表类型: long, 注释: 时间 */
        sendTime?: number;
        /** 表类型: string, 注释: json类型 */
        jsonType?: string;
        /** 表类型: string, 注释: json内容 */
        jsondata?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type DialogData = {
        /** 表类型: string, 注释: 对话ID */
        id?: string;
        /** 表类型: string, 注释: galId */
        gal?: string;
        /** 表类型: string, 注释: 章节ID */
        chapter?: string;
        /** 表类型: string, 注释: 场景ID */
        scene?: string;
        /** 表类型: string, 注释: 角色ID */
        roleId?: string;
        /** 表类型: string, 注释: 展示名字 */
        showName?: string;
        /** 表类型: string, 注释: 展示文本 */
        content?: string;
        /** 表类型: string, 注释: 表情 */
        emote?: string;
        /** 表类型: stringsMap, 注释: 角色立绘 */
        roleDraws?: Dictionary<string, List<string>>;
        /** 表类型: stringsMap, 注释: 背景 */
        backGround?: Dictionary<string, List<string>>;
        /** 表类型: stringsMap, 注释: 声音 */
        sound?: Dictionary<string, List<string>>;
        /** 表类型: stringsMap, 注释: 语音 */
        voice?: Dictionary<string, List<string>>;
        /** 表类型: float, 注释: 显示延迟 */
        showDelay?: number;
        /** 表类型: byte, 注释: 跳过设置 */
        skipType?: number;
        /** 表类型: floats, 注释: 振屏 */
        screenShake?: List<number>;
        /** 表类型: bool, 注释: 不清除文本 */
        notClear?: boolean;
        /** 表类型: strings, 注释: 变量设定 */
        VariableFormula?: List<string>;
        /** 表类型: strings, 注释: 脚本 */
        script?: List<string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GalData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 项目Id */
        projectId?: string;
        /** 表类型: int, 注释: 进度记录 */
        schedule?: number;
        /** 表类型: string, 注释: ga名字 */
        galName?: string;
        /** 表类型: string, 注释: 背景设定 */
        backStory?: string;
        /** 表类型: string, 注释: 故事大纲 */
        storyOutLine?: string;
        /** 表类型: string, 注释: 美术风格 */
        artStyle?: string;
        /** 表类型: stringMap, 注释: 背景图片 */
        BackGrounds?: Dictionary<string, string>;
        /** 表类型: stringMap, 注释: 角色 */
        roles?: Dictionary<string, string>;
        /** 表类型: strings, 注释: 章节 */
        chapters?: List<string>;
        /** 表类型: stringsMap, 注释: 章节场景树 */
        chapterScenes?: Dictionary<string, List<string>>;
        /** 表类型: strings, 注释: 章节名字 */
        chaptersName?: List<string>;
        /** 表类型: stringsMap, 注释: 章节场景树名字 */
        chapterScenesName?: Dictionary<string, List<string>>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GalPreviewData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 项目Id */
        projectId?: string;
        /** 表类型: string, 注释: gal名字 */
        galName?: string;
        /** 表类型: string, 注释: 预览图片 */
        previewImage?: string;
        /** 表类型: string, 注释: 图标 */
        icon?: string;
        /** 表类型: date, 注释: 上次登陆时间 */
        lastTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LanguageData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 内容 */
        content?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type LanguageDataCN = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 内容 */
        content?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ProjectData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 项目名 */
        projectName?: string;
        /** 表类型: string, 注释: 项目备注 */
        projectDesc?: string;
        /** 表类型: string, 注释: 项目目录 */
        projectPath?: string;
        /** 表类型: string, 注释: 用户名 */
        userName?: string;
        /** 表类型: string, 注释: 上一次修改时间 */
        lastTime?: string;
        /** 表类型: string, 注释: 创建时间时间 */
        creatTime?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type GalRoleData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 角色名字 */
        RoleName?: string;
        /** 表类型: string, 注释: 性别 */
        Gender?: string;
        /** 表类型: string, 注释: 定位 */
        RoleDefinition?: string;
        /** 表类型: string, 注释: 外貌 */
        Appearance?: string;
        /** 表类型: string, 注释: 简介 */
        Profile?: string;
        /** 表类型: string, 注释: 离场场景 */
        exitScene?: string;
        /** 表类型: stringMap, 注释: 角色立绘 */
        roleDrawing?: Dictionary<string, string>;
        /** 表类型: string, 注释: 选用语音 */
        voiceID?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SceneData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 场景名 */
        sceneName?: string;
        /** 表类型: string, 注释: 所属GAL */
        galID?: string;
        /** 表类型: string, 注释: 所属章节 */
        ChapterId?: string;
        /** 表类型: strings, 注释: 场景列表 */
        Dialogs?: List<string>;
        /** 表类型: string, 注释: 故事大纲 */
        storyOutLine?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type UserProjectData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 用户名 */
        userName?: string;
        /** 表类型: string*, 注释: 用户密码 */
        passWord?: string;
        /** 表类型: string, 注释: 创建时间 */
        lastLoginTime?: string;
        /** 表类型: stringMap, 注释: 项目列表 */
        projects?: Dictionary<string, string>;
        /** 表类型: stringMap, 注释: Gal列表 */
        gal?: Dictionary<string, string>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type VoiceBase = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 备注 */
        desc?: string;
        /** 表类型: int, 注释: 性别 */
        Gender?: number;
        /** 表类型: int, 注释: 年龄段 */
        age?: number;
        /** 表类型: string, 注释: 简介 */
        Profile?: string;
        /** 表类型: string, 注释: 文件名 */
        fileName?: string;
        /** 表类型: string, 注释: 说话人 */
        speaker?: string;
        /** 表类型: string, 注释: 语言TAG */
        langTag?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ErrorInfo = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: string, 注释: 错误消息 */
        message?: string;
        /** 表类型: string, 注释: 异常类型 */
        errorType?: string;
        /** 表类型: string, 注释: 创建时间 */
        time?: string;
        /** 表类型: string, 注释: 机型 */
        modelType?: string;
        /** 表类型: string, 注释: IP地址 */
        ip?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type Formulas = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 备注 */
        depict?: string;
        /** 表类型: string, 注释: 公式 */
        formulas?: string;
        /** 表类型: float, 注释: 浮动范围（填0.1代表 ±0.1 即为 0.9~1.1） */
        randomRange?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ServerLog = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: ulongMap*, 注释: 道具相关记录 */
        itemCount?: Dictionary<string, number>;
        /** 表类型: ulongMap*, 注释: 战斗相关记录 */
        battleCount?: Dictionary<string, number>;
        /** 表类型: ulongMap*, 注释: 商店相关记录 */
        shopCount?: Dictionary<string, number>;
        /** 表类型: ulongMap*, 注释: 其他记录 */
        otherCount?: Dictionary<string, number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type ServerUserData = {
        /** 表类型: string, 注释: ID */
        id?: string;
        /** 表类型: int, 注释: 玩家ID数量记录 */
        playerIDCount?: number;
        /** 表类型: intMap, 注释: 玩家阵营数量记录 */
        userCampCount?: Dictionary<string, number>;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SeverConfigBase = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 备注 */
        depict?: string;
        /** 表类型: string, 注释: ip */
        ip?: string;
        /** 表类型: string, 注释: 网关地址 */
        gateWay?: string;
        /** 表类型: string, 注释: 区服ID */
        serverID?: string;
        /** 表类型: string, 注释: 区服名称 */
        serverName?: string;
        /** 表类型: byte, 注释: 区服状态:
1.爆满
2.维护
3.流畅 */
        serverState?: number;
        /** 表类型: bool, 注释: 新区 */
        newServer?: boolean;
        /** 表类型: string, 注释: MAC地址 */
        MAC?: string;
        /** 表类型: date, 注释: 启动时间 */
        setupTime?: number;
        /** 表类型: byte, 注释: 状态 */
        status?: number;
        /** 表类型: uint, 注释: 当前人数 */
        playerSum?: number;
        /** 表类型: bool, 注释: 是否为网关 */
        isGate?: boolean;
        /** 表类型: string, 注释: 备注IP */
        descIP?: string;
        /** 表类型: ulong, 注释: 地图更新序号 */
        mapSaveVer?: number;
        /** 表类型: byte, 注释: 小地图显示玩家等级下限 */
        mapShowLevel?: number;
        /** 表类型: int, 注释: 地图分割尺寸 */
        mapSplit?: number;
        /** 表类型: uint, 注释: 心跳断开限制 */
        heatbeatLimit?: number;
        /** 表类型: int, 注释: 每日最大野外战斗次数 */
        battleTimes?: number;
        /** 表类型: float, 注释: 行军速度 */
        marchSpeed?: number;
        /** 表类型: int, 注释: 战役推图玩家基础最大体力 */
        campaignMaxStamina?: number;
        /** 表类型: int, 注释: 每日购买体力基础次数 */
        PhysicalTime?: number;
        /** 表类型: int, 注释: 上阵基础数量 */
        arrangeNum?: number;
        /** 表类型: int, 注释: 战役起始关卡 */
        campaignStartId?: number;
        /** 表类型: string, 注释: 扫荡模式变更 */
        sweepModeChanged?: string;
        /** 表类型: string, 注释: 推荐阵营奖励 */
        recomCampReward?: string;
        /** 表类型: byte, 注释: 阵营加入等级 */
        campJoin?: number;
        /** 表类型: int, 注释: 围攻等待时间 */
        siegeWaitTime?: number;
        /** 表类型: int, 注释: 围攻提高消耗时间 */
        siegeMaxTime?: number;
        /** 表类型: string, 注释: 突袭消耗 */
        strikeCost?: string;
        /** 表类型: string, 注释: 围攻低消耗 */
        siegeMinCost?: string;
        /** 表类型: string, 注释: 围攻高消耗 */
        siegeMaxCost?: string;
        /** 表类型: string, 注释: 召回功能消耗道具与数量 */
        callBack?: string;
        /** 表类型: string, 注释: 快速召回消耗道具与数量 */
        fastCallBack?: string;
        /** 表类型: string, 注释: 行军加速消耗道具与数量 */
        marchSpeedUp?: string;
        /** 表类型: string, 注释: 超级行军加速消耗道具与数量 */
        superMarchSpeedUp?: string;
        /** 表类型: string, 注释: 炸矿消耗 */
        minerAttack?: string;
        /** 表类型: int, 注释: 同阵营炸矿每日次数 */
        sameCampMinerAttackLim?: number;
        /** 表类型: int, 注释: 领地失守后免战时间（秒） */
        avoidWarTime?: number;
        /** 表类型: string, 注释: 免战特效 */
        avoidWarEffect?: string;
        /** 表类型: int, 注释: 装备库最终解锁容量上限 */
        maxEquipVolume?: number;
        /** 表类型: string, 注释: 突破解锁条件 */
        breakOutUnlock?: string;
        /** 表类型: string, 注释: 日常任务解锁条件 */
        dailyEventUnlock?: string;
        /** 表类型: int, 注释: 解锁野外需要的玩家等级 */
        unlockWildLevel?: number;
        /** 表类型: string, 注释: 军情功能解锁条件 */
        IntelligenceUnlock?: string;
        /** 表类型: byte, 注释: 装备自动锁定品质 */
        equipAuutoLock?: number;
        /** 表类型: int, 注释: 普通成长恢复时间（秒） */
        commonGrowthRecover?: number;
        /** 表类型: int, 注释: 普通成长恢复最大上限 */
        commonGrowthMaxTime?: number;
        /** 表类型: string, 注释: 没有使用 */
        seniorGrowthCost?: string;
        /** 表类型: int, 注释: 跳过战斗时间（秒） */
        battleJumpTime?: number;
        /** 表类型: int, 注释: 狂暴开始回合 */
        furiousRound?: number;
        /** 表类型: float, 注释: 狂暴强化倍率 */
        furiousStrengthen?: number;
        /** 表类型: float, 注释: 狂暴强化上限 */
        furiousMaxStrengthen?: number;
        /** 表类型: int, 注释: 据点免战时间（秒） */
        fortifiedAvoidWarTime?: number;
        /** 表类型: int, 注释: 申请总督时长（秒） */
        applyGvernorTime?: number;
        /** 表类型: int, 注释: 据点总督撤离时间（秒） */
        fortifiedRetreatTime?: number;
        /** 表类型: string, 注释: 玩家进攻据点限制 */
        fortifiedAvailable?: string;
        /** 表类型: int, 注释: 资源田收取间隔（间隔多少秒可以收取一次资源） */
        resourceGetInterval?: number;
        /** 表类型: int, 注释: 资源田计算时间（每隔多少秒获取一次addrescue） */
        resourceGetTime?: number;
        /** 表类型: string, 注释: 初次引导气泡获取奖励 */
        firstGuideReward?: string;
        /** 表类型: int, 注释: 掠夺资源数量% */
        plunderPrecent?: number;
        /** 表类型: int, 注释: 工人掠夺的数量% */
        HamalplunderPrecent?: number;
        /** 表类型: int, 注释: 工人损失数量% */
        HamalLostPrecent?: number;
        /** 表类型: int, 注释: 阵营建设每日最大次数 */
        campDevelopMaxTime?: number;
        /** 表类型: string, 注释: 改名卡消耗 */
        changNameCost?: string;
        /** 表类型: string, 注释: 改名卡消耗不足替换 */
        changNameExchange?: string;
        /** 表类型: string, 注释: 喇叭消耗 */
        hornCost?: string;
        /** 表类型: string, 注释: 喇叭消耗不足替换 */
        hornCostExchange?: string;
        /** 表类型: int, 注释: 聊天间隔cd */
        chatCd?: number;
        /** 表类型: string, 注释: 解锁队列1介绍 */
        Arrangement1UnlockDesc?: string;
        /** 表类型: string, 注释: 解锁队列2介绍 */
        Arrangement2UnlockDesc?: string;
        /** 表类型: int, 注释: 邮件分享CD */
        mailShareCd?: number;
        /** 表类型: int, 注释: 邮件默认保存时间 */
        mailSaveTime?: number;
        /** 表类型: int, 注释: 邮件最大持有数量 */
        mailMaxKeep?: number;
        /** 表类型: int, 注释: 免费附魔恢复间隔时间 */
        enchantingFreeRefreshInterval?: number;
        /** 表类型: string, 注释: 普通附魔消耗 */
        commonGrowthCost?: string;
        /** 表类型: string, 注释: 高级附魔每次消耗 */
        seniorEnchantingCost?: string;
        /** 表类型: string, 注释: 终极附魔消耗 */
        ultimateEnchantingCost?: string;
        /** 表类型: int, 注释: 免费附魔最大次数 */
        enchantingFreeTimesLimit?: number;
        /** 表类型: int, 注释: 附魔气泡出现免费次数 */
        EnchantingBubble?: number;
        /** 表类型: int, 注释: 祭坛出现条件，（消耗n倍时出现） */
        altarBubble?: number;
        /** 表类型: string, 注释: 活动按钮出现条件 */
        activityIconAvailable?: string;
        /** 表类型: string, 注释: 福利按钮出现条件 */
        welfareIconAvailable?: string;
        /** 表类型: string, 注释: 特惠按钮出现条件 */
        preferentialIconAvailable?: string;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type SeverData = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: byte, 注释: 区服状态:
1.爆满
2.维护
3.流畅 */
        serverState?: number;
        /** 表类型: bool, 注释: 新区 */
        newServer?: boolean;
        /** 表类型: date, 注释: 启动时间 */
        setupTime?: number;
        /** 表类型: byte, 注释: 状态 */
        status?: number;
        /** 表类型: uint, 注释: 当前人数 */
        playerSum?: number;
        /** 表类型: ulong, 注释: 地图更新序号 */
        mapSaveVer?: number;
        /** 表类型: date, 注释: 开服时间 */
        openTime?: number;
        /** 表类型: long, 注释: 服务器偏移时间 */
        addTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type TimeEvent = {
        /** 表类型: string, 注释: 配置ID */
        id?: string;
        /** 表类型: string, 注释: 任务名称 */
        eventName?: string;
        /** 表类型: ulong, 注释: 任务实际开始时间 */
        taskstartTime?: number;
        /** 表类型: ulong, 注释: 任务结束时间 */
        taskEndTime?: number;
        /** 表类型: ulong, 注释: 上次开始时间 */
        lastStartTime?: number;
        /** 表类型: ulong, 注释: 上次结束时间 */
        lastEndTime?: number;
        /** 表类型: int, 注释: 默认时间是0也就是utc时间 */
        serverTimeZone?: number;
        /** 表类型: int, 注释: 重复循环次数，0就是无限次循环 */
        LoopCount?: number;
        /** 表类型: int, 注释: 已经重复的次数 */
        LoopTimers?: number;
        /** 表类型: bool, 注释: 第一次是否有cd */
        isFristNoCD?: boolean;
        /** 表类型: ulong, 注释: 任务间隔执行时间 */
        taskLoopTime?: number;
        /** 表类型: byte, 注释: 循环类型
1.日循环
2.周循环
3.月循环 */
        timeType?: number;
        /** 表类型: ulong, 注释: 每天任务开始的时间，和loopTime共同执行 */
        startTime?: number;
        /** 表类型: ulong, 注释: 每天任务开始的时间的结束时间 */
        startLimitTime?: number;
        /** 表类型: string, 注释: 前置任务id，可以组成任务集合 */
        predecessorTaskID?: string;
        /** 表类型: string, 注释: 任务的回调事件名字 */
        taskEventString?: string;
        /** 表类型: string, 注释: 任务执行日志列表 */
        taskEventLog?: string;
        /** 表类型: int, 注释: 任务目前状态，0等待执行，1正在执行，2执行错误，3执行成功 */
        taskState?: number;
        /** 表类型: int, 注释: 任务之前的执行状态，1正在执行，2执行错误，3执行成功，注意写任务的一定要注意可能服务器被中断的情况 */
        taskPreviousState?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type WalletErrLog = {
        /** 表类型: string, 注释: 记录ID */
        id?: string;
        /** 表类型: string, 注释: 类名 */
        className?: string;
        /** 表类型: string, 注释: 方法名 */
        methodName?: string;
        /** 表类型: string, 注释: 玩家ID */
        userToken?: string;
        /** 表类型: string, 注释: log信息 */
        logMessage?: string;
        /** 表类型: date, 注释: 记录时间 */
        resultTime?: number;
    }
    // tslint:disable-next-line: max-classes-per-file
    export type WalletLog = {
        /** 表类型: string, 注释: 记录ID */
        id?: string;
        /** 表类型: string, 注释: 类名 */
        className?: string;
        /** 表类型: string, 注释: 方法名 */
        methodName?: string;
        /** 表类型: string, 注释: 玩家ID */
        userToken?: string;
        /** 表类型: string, 注释: log信息 */
        logMessage?: string;
        /** 表类型: date, 注释: 记录时间 */
        resultTime?: number;
    }
}