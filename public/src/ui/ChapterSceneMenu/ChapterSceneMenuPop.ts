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
import { CellData } from "Data/CellData";
import { ChapterInfo } from "Data/ChapterInfo";
import { ChapterSceneMenu } from "./ChapterSceneMenu";

export class ChapterSceneMenuPop {
    public tanClass: ChapterSceneMenu.chapterbg1;
    public tanBtan: m4m.framework.button;
    protected baseData: CellData;
    public clickCallBackFun: Function;

    public get cellData(): CellData {
        return this.baseData;
    }
    public set cellData(value: CellData) {
        this.baseData = value;
    }

    public selectCallBackFun: Function;

    private _selectIndex: number = 0;

    constructor(uiClass: ChapterSceneMenu.chapterbg1, basedata: CellData) {
        this.tanClass = uiClass;
        this.baseData = basedata;
        if (this.tanClass) {
            if (this.tanBtan == null) {
                this.tanBtan = this.tanClass.transform.addComponent("button") as m4m.framework.button;
                this.tanBtan.addListener(m4m.event.UIEventEnum.PointerClick, this.pointerClickFun, this);
            } else {
                console.log("当前Pop已加 button 组件 不需要添加！");
            }
        }
    }

    public setData(value: ChapterInfo, pos: m4m.math.vector2) {
        this.tanClass.sectionbg3_img.arrowb_img.transform.visible = false;
        this.tanClass.transform.visible = true;
        this.tanClass.chapterbg2.transform.visible = false;
        this.tanClass.sectionbg3_img.chaptername_lab.label.text = value.chapterName;
        this.tanClass.new1_lab.transform.visible = false;
        this.tanClass.transform.localTranslate = pos
    }

    public pointerClickFun() {
        if (this.clickCallBackFun) { this.clickCallBackFun(this.cellData.index); }
    }
    public dispose() {
        if (this.tanBtan) {
            this.tanBtan.removeListener(m4m.event.UIEventEnum.PointerDown, this.pointerClickFun, this)
        }
    }
}