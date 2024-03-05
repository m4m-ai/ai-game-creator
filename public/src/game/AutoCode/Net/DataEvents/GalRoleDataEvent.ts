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
export class GalRoleDataEvent{
    /** 初始化全部数据*/
    public static All = "All";
    /** 批量加载数据*/
    public static ChangeList = "ChangeList";
    /** 提示数据*/
    public static TipData = "TipData";
    /** ID*/
    public static id = "id";
    /** 角色名字*/
    public static RoleName = "RoleName";
    /** 性别*/
    public static Gender = "Gender";
    /** 定位*/
    public static RoleDefinition = "RoleDefinition";
    /** 外貌*/
    public static Appearance = "Appearance";
    /** 简介*/
    public static Profile = "Profile";
    /** 离场场景*/
    public static exitScene = "exitScene";
    /** 角色立绘*/
    public static roleDrawing = "roleDrawing";
    /** 选用语音*/
    public static voiceID = "voiceID";
}