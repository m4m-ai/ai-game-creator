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
import { BackGroundData } from "BackGroundData";
import { BindKeyName } from "Data/BindKeyName";
import { SceneInfo } from "Data/SceneInfo";
import { ViewBaseData } from "Data/ViewBaseData";
import { BackgroundPictureManager } from "Manager/BackgroundPictureManager";
import { ChapterSceneDirectoryManager } from "Manager/ChapterSceneDirectoryManager";
import { GameProjectManager } from "Manager/GameProjectManager";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BackgroundPictureView } from "./BackgroundPictureView";
export class BackgroundPictureViewData implements ViewBaseData {
    public sceneData: SceneInfo;
    private changeBasicUIposition: Function;
    private OnAiSetSceneDialogFun: Function;
    public image: string;
    constructor() {
        this.sceneData = ChapterSceneDirectoryManager.Instance.SceneData;
        this.changeBasicUIposition = this.CenterDisplayBol.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.BackgroundPictureByAI, this.changeBasicUIposition);
        this.OnAiSetSceneDialogFun = this.OnAiSetSceneDialogFunBind.bind(this)
        UiDataManager.bindFunctionData(BindKeyName.OnAiSetSceneDialog, this.OnAiSetSceneDialogFun);
    }
    public dispose() {
        UiDataManager.unBindFunctionData(BindKeyName.BackgroundPictureByAI, this.changeBasicUIposition);
        UiDataManager.unBindFunctionData(BindKeyName.OnAiSetSceneDialog, this.OnAiSetSceneDialogFun);
    }

    public getBackgroundPicture() {
        let id = BackgroundPictureManager.Instance.backGroundId;
        let data = BackgroundPictureManager.Instance.getBackgrounPictureData(id);
        return data;
    }

    public OnAiSetSceneDialogFunBind(data: PictureData) {
        console.log(data);
        BackgroundPictureView.Instance.backgrounText(data);
    }

    public CenterDisplayBol(CenterDisplayBol) {
        if (CenterDisplayBol) {
            let totalWidth = BackgroundPictureView.Instance.bg.transform.width;
            let uiWidth = BackgroundPictureView.Instance.bg1.transform.width;
            console.log("totalWidth  ", totalWidth, "  uiWidth  ", uiWidth);
            let posX = (totalWidth - uiWidth) / 2;
            BackgroundPictureView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
            BackgroundPictureView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            BackgroundPictureView.Instance.bg1.transform.markDirty();
        } else {
            if (GameProjectManager.isInEditorBol) {
                BackgroundPictureView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
                BackgroundPictureView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
                BackgroundPictureView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
                BackgroundPictureView.Instance.bg1.transform.markDirty();
            } else {
                BackgroundPictureView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
                BackgroundPictureView.Instance.bg1.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
                BackgroundPictureView.Instance.bg1.transform.markDirty();
            }
        }
    }

    public Addbackground(desc: string, name: string) {
        let backgrounData = new BackGroundData();
        let id = ChapterSceneDirectoryManager.Instance.uuid();
        backgrounData.id = id;
        backgrounData.projectId = GameProjectManager.instance.currentGalData.id;
        backgrounData.backStory = desc;
        backgrounData.resPath = this.image;
        backgrounData.BGName = name;
        backgrounData.chapter = this.sceneData.chapter.id;
        backgrounData.scene = this.sceneData.id;

        BackgroundPictureManager.Instance.addBackgrounPictureData(backgrounData);
        const res = JSON.stringify(backgrounData);
        BackgroundPictureManager.Instance.SetBackGroundByScene(this.sceneData.chapter.id, this.sceneData.id, res);
        BackgroundPictureManager.Instance.backGroundId = id;
    }
}
export class PictureData {
    content: string; //对话内容
    imageName: string; //背景图片名称
    imageDescription: string; //背景图片描述
    image: string; //背景图片
}