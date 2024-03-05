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
export class GalPreviewDataEvent{
    /** 初始化全部数据*/
    public static All = "All";
    /** 批量加载数据*/
    public static ChangeList = "ChangeList";
    /** 提示数据*/
    public static TipData = "TipData";
    /** ID*/
    public static id = "id";
    /** 项目Id*/
    public static projectId = "projectId";
    /** gal名字*/
    public static galName = "galName";
    /** 预览图片*/
    public static previewImage = "previewImage";
    /** 图标*/
    public static icon = "icon";
    /** 上次登陆时间*/
    public static lastTime = "lastTime";
}