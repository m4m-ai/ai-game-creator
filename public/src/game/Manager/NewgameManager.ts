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

export class NewgameManager {
    public static get instance(): NewgameManager {
        return this._instance;
    }
    private static _instance: NewgameManager = new NewgameManager();
    private constructor() {
    }
    //   
    public init() {
    }

    public openNewgameFun(poupData: NewgameData) {
        UIOpenOrHideManager.Instance.OpenNewgameView(poupData);
    }
}
export type NewgameData = {
    /** 弹窗的父对象 */
    // parentTrans: m4m.framework.transform2D,
    /** 弹窗标题 */
    titleStr: string,
    /** 左侧按钮文本 */
    leftbtnStr: string;
    /** 居中按钮文本 */
    midbtnStr: string;
    /** 右侧按钮文本 */
    rightbtnStr: string;
    uploadBtnStr: string;
    /** 左侧按钮回调 */
    leftBtnCallBack: Function;
    /** 居中按钮回调 */
    midBtnCallBack: Function;
    /** 右侧按钮回调 */
    rightBtnCallBack: Function;
    /** 上传按钮回调 */
    uploadBtnCallBack: Function;
    /**描述文本 */
    descStr: string;
    [key: string]: any;
};
