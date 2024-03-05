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
import { BindKeyName } from "Data/BindKeyName";
import { ConversationStep } from "Data/Process/ConversationStep";
import { Step } from "Data/Process/Step";
import { StepType } from "Data/Process/StepType";
import { SceneInfo } from "Data/SceneInfo";
import { ViewBaseData } from "Data/ViewBaseData";
import { DialogData } from "DialogData";
import { ChapterSceneDirectoryManager } from "Manager/ChapterSceneDirectoryManager";
import { GameProjectManager } from "Manager/GameProjectManager";
import { RoleSettingManager } from "Manager/RoleSettingManager";
import { SceneTalkManager } from "Manager/SceneTalkManager";
import { UiDataManager } from "PSDUI/UiDataManager";
import { SceneTalkView } from "./SceneTalkView";

export class SceneTalkViewData implements ViewBaseData {
    public sceneData: SceneInfo;
    public changeBasicUIposition: Function;
    public OnAiSetSceneDialogFun: Function;
    public onSceneDialogFun: Function;
    public TalkText: string;
    constructor() {
        this.sceneData = ChapterSceneDirectoryManager.Instance.SceneData;
        this.changeBasicUIposition = this.CenterDisplayBol.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.SceneTalkByAI, this.changeBasicUIposition);
        this.OnAiSetSceneDialogFun = this.OnAiSetSceneDialogFunBind.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.OnAiSetSceneDialog, this.OnAiSetSceneDialogFun);
        this.onSceneDialogFun = this.SceneTalkDataFun.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.SceneTalkData, this.onSceneDialogFun);
    }

    public dispose() {
        // throw new Error("Method not implemented.");
        this.TalkText = "";
        this.sceneData = null;
        UiDataManager.unBindFunctionData(BindKeyName.SceneTalkByAI, this.changeBasicUIposition);
        UiDataManager.unBindFunctionData(BindKeyName.OnAiSetSceneDialog, this.OnAiSetSceneDialogFun)
    }
    public CenterDisplayBol(CenterDisplayBol) {
        if (CenterDisplayBol) {
            let totalWidth = SceneTalkView.Instance.bg.transform.width;
            let uiWidth = SceneTalkView.Instance.bg2.transform.width;
            console.log("totalWidth  ", totalWidth, "  uiWidth  ", uiWidth);
            let posX = (totalWidth - uiWidth) / 2;
            SceneTalkView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
            SceneTalkView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            SceneTalkView.Instance.bg2.transform.markDirty();
        } else {
            if (GameProjectManager.isInEditorBol) {
                SceneTalkView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, GameProjectManager.leftShifting);
                SceneTalkView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.BOTTOM, 122);
                SceneTalkView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
                SceneTalkView.Instance.bg2.transform.markDirty();

            } else {
                SceneTalkView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
                SceneTalkView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
                SceneTalkView.Instance.bg2.transform.markDirty();
            }
        }
    }

    private OnAiSetSceneDialogFunBind(data: SceneTalkData) {
        console.log("OnAiSetSceneDialogFunBind", data);
        //SceneTalkView.Instance.inpText(data.content);
        SceneTalkManager.Instance.SceneTalk = data;
        if (data.content) {
            this.sceneData.createStepByText(data.content);
            this.sceneData.createDialogListByStep();
            this.sceneData.sendDialogDataToServer();
            SceneTalkView.Instance.inpText(this.sceneData.stepText);
        }
    }

    private SceneTalkDataFun() {
        if (!this.TalkText) {
            let data = SceneTalkManager.Instance.getTalkList();
            for (const iterator of data) {
                if (iterator) {
                    let stringTest = iterator.showName + ":" + iterator.content + "\n";
                    this.TalkText += stringTest;
                }
            }
            SceneTalkView.Instance.inpText(this.TalkText);
        }
    }
}

export class SceneTalkData {
    content: string; //对话内容
    imageName: string; //背景图片名称
    imageDescription: string; //背景图片描述
    image: string; //背景图片
}