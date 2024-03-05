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
export class DialogDataEvent{
    /** 初始化全部数据*/
    public static All = "All";
    /** 批量加载数据*/
    public static ChangeList = "ChangeList";
    /** 提示数据*/
    public static TipData = "TipData";
    /** 对话ID*/
    public static id = "id";
    /** galId*/
    public static gal = "gal";
    /** 章节ID*/
    public static chapter = "chapter";
    /** 场景ID*/
    public static scene = "scene";
    /** 角色ID*/
    public static roleId = "roleId";
    /** 展示名字*/
    public static showName = "showName";
    /** 展示文本*/
    public static content = "content";
    /** 表情*/
    public static emote = "emote";
    /** 角色立绘*/
    public static roleDraws = "roleDraws";
    /** 背景*/
    public static backGround = "backGround";
    /** 声音*/
    public static sound = "sound";
    /** 语音*/
    public static voice = "voice";
    /** 显示延迟*/
    public static showDelay = "showDelay";
    /** 跳过设置*/
    public static skipType = "skipType";
    /** 振屏*/
    public static screenShake = "screenShake";
    /** 不清除文本*/
    public static notClear = "notClear";
    /** 变量设定*/
    public static VariableFormula = "VariableFormula";
    /** 脚本*/
    public static script = "script";
}