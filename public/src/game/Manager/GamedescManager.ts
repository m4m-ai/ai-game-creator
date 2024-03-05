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
import { UIOpenOrHideManager } from "./UIOpenOrHideManager";

export class GamedescManager {
    public static get instance(): GamedescManager {
        return this._instance;
    }
    private static _instance: GamedescManager = new GamedescManager();
    private constructor() {
    }
    //   
    public init() {
    }

    public openGamedescFun(poupData: GamedescData) {
        UIOpenOrHideManager.Instance.OpenGamedescView(poupData);
    }
}
export type GamedescData = {
    /** 弹窗的父对象 */
    // parentTrans: m4m.framework.transform2D,
    /** 弹窗标题 */
    titleStr: string,
    /** 左侧按钮文本 */
    leftbtnStr: string;
    /** 右侧按钮文本 */
    rightbtnStr: string;
    /** 左侧按钮回调 */
    leftBtnCallBack: Function;
    /** 右侧按钮回调 */
    rightBtnCallBack: Function;
    /** 第一行输入框标题文字 */
    firstInputTitle: string;
    /** 第一行输入框默认文字 */
    firstInputDefaultTitle: string;
    /** 第二行输入框标题文字 */
    secondTitle: string;
    /** 第二行输入框默认文字 */
    secondDefaultTitle: string;
    [key: string]: any;
};
