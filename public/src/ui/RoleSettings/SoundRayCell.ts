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
import { GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { RoleSettings } from "./RoleSettings";
import { AudioManager } from "Audio/OriginCode/AudioManager";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { CAudioChannel } from "Audio/OriginCode/CAudioChannel";

export class SoundRayCell implements ICellHandler {
    config: GridConfig;
    cellData: any;
    public nowClass: RoleSettings.sound2;
    public index: number;
    public isSelect = false;
    //存储的数据
    //英雄数据
    public roleData: any;
    private cAudioChannel: CAudioChannel;
    public onInit(): void {
        this.nowClass.sound_btn.button.addListener(m4m.event.UIEventEnum.PointerClick, this.clickBtnFun, this)
    }

    public onSetData(value): void {
        if (value) {
            this.cellData = value;
            // console.log("声线数据 ;", value);
            this.nowClass.transform.visible = true;
            this.nowClass.sound1_lab.label.text = value.desc;
        } else {
            this.nowClass.transform.visible = false;
        }
    }
    public onClick(): void {
        this.config.viewData.chooseSoundRay(this.cellData);
    }
    public onSelect() {
        // console.log("选中 " + this.cellData);
        this.config.viewData.chooseSoundRay(this.cellData);
    }
    public onUnSelect() {
    }
    public clickBtnFun() {
        if (this.cAudioChannel != null) {
            this.cAudioChannel.stop();
        }
        let path = "AiFiles/VoiceSimple/" + this.cellData.fileName;
        let url = ChatMessageDataManager.Instance.getResFullPath(path);
        console.log("播放声线 url：", url);
        this.cAudioChannel = AudioManager.Instance.playAudio(url, 1);
        this.cAudioChannel.source.addEventListener("ended", () => {
            this.cAudioChannel = null;
        });
    }
}