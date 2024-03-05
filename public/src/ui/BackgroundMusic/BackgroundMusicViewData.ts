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
import { SceneInfo } from "Data/SceneInfo";
import { ViewBaseData } from "Data/ViewBaseData";
import { ChapterSceneDirectoryManager } from "Manager/ChapterSceneDirectoryManager";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BackgroundMusicView } from "./BackgroundMusicView";

export class BackgroundMusicViewData implements ViewBaseData {
    public sceneData: SceneInfo;
    public changeBasicUIposition: any;
    public constructor(){
        this.sceneData = ChapterSceneDirectoryManager.Instance.SceneData;
        this.changeBasicUIposition = this.CenterDisplayBol.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.BackgroundMusicByAI, this.changeBasicUIposition);
    }

    public dispose() {
        // throw new Error("Method not implemented.");
        this.sceneData = null;
        UiDataManager.unBindFunctionData(BindKeyName.BackgroundMusicByAI, this.changeBasicUIposition);
    }
    public CenterDisplayBol(CenterDisplayBol){
        if (CenterDisplayBol) {
            let totalWidth = BackgroundMusicView.Instance.bg.transform.width;
            let uiWidth = BackgroundMusicView.Instance.bg2.transform.width;
            console.log("totalWidth  ", totalWidth, "  uiWidth  ", uiWidth);
            let posX = (totalWidth - uiWidth) / 2;
            BackgroundMusicView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, posX);
            BackgroundMusicView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            BackgroundMusicView.Instance.bg2.transform.markDirty();
        } else {
            BackgroundMusicView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.LEFT, 0);
            BackgroundMusicView.Instance.bg2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, 100);
            BackgroundMusicView.Instance.bg2.transform.markDirty();
        }
    }
}