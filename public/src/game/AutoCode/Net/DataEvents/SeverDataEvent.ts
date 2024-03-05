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
export class SeverDataEvent{
    /** 初始化全部数据*/
    public static All = "All";
    /** 批量加载数据*/
    public static ChangeList = "ChangeList";
    /** 提示数据*/
    public static TipData = "TipData";
    /** 配置ID*/
    public static id = "id";
    /** 区服状态:
1.爆满
2.维护
3.流畅*/
    public static serverState = "serverState";
    /** 新区*/
    public static newServer = "newServer";
    /** 启动时间*/
    public static setupTime = "setupTime";
    /** 状态*/
    public static status = "status";
    /** 当前人数*/
    public static playerSum = "playerSum";
    /** 地图更新序号*/
    public static mapSaveVer = "mapSaveVer";
    /** 开服时间*/
    public static openTime = "openTime";
    /** 服务器偏移时间*/
    public static addTime = "addTime";
}