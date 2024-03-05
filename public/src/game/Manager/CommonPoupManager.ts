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
import { cMap } from "Data/Map";
import { UiManager } from "PSDUI/UiManager";
import { UiNames } from "./UIData/UiNames";
import { UIOpenOrHideManager } from "./UIOpenOrHideManager";

export class CommonPoupManager {
    public static get instance(): CommonPoupManager {
        return this._instance;
    }
    private static _instance: CommonPoupManager = new CommonPoupManager();
    private constructor() {
    }
    //  
    public init() {
    }

    public openCommonPopupFun(poupData: commonPopupData) {
        UIOpenOrHideManager.Instance.OpenBottomslabView(poupData);
    }
}
export type commonPopupData = {
    /** 弹窗的父对象 */
    // parentTrans: m4m.framework.transform2D,
    /** 弹窗标题 */
    titleStr?: string,
    /** 左侧按钮显示与否 */
    leftBtnBol?: boolean,
    /** 中间按钮显示与否 */
    midBtnBol?: boolean,
    /** 右侧按钮显示与否 */
    rightBtnBol?: boolean,
    /** 左侧按钮文本 */
    leftbtnStr?: string;
    /** 居中按钮文本 */
    midbtnStr?: string;
    /** 右侧按钮文本 */
    rightbtnStr?: string;
    /** 左侧按钮回调 */
    leftBtnCallBack?: Function;
    /** 居中按钮回调 */
    midBtnCallBack?: Function;
    /** 右侧按钮回调 */
    rightBtnCallBack?: Function;
    /** 上传按钮回调 */
    uploadBtnCallBack?: Function;
    /** 是否显示描述文字 */
    showDescribBol?: boolean;
    /** 描述文字 */
    describeStr?: string;
    /** 描述文字是否需要换行 */
    changeLineBol?: boolean;
    /** 是否显示第一行输入框 */
    showFirstInputFiledBol?: boolean;
    /** 第一行输入框标题文字 */
    firstInputTitle?: string;
    /** 第一行输入框默认文字 */
    firstInputDefaultTitle?: string;
    /** 是否显示第二行输入框 */
    showSecondBol?: boolean;
    /** 第二行输入框标题文字 */
    secondTitle?: string;
    /** 第二行输入框默认文字 */
    secondDefaultTitle?: string;

    [key: string]: any;
};
