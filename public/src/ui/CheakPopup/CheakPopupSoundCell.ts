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
import { AIChatSoundData, CustomButton } from "Data/DataType";
import { GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { CheakPopup } from "./CheakPopup";
import { AudioManager } from "Audio/OriginCode/AudioManager";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { SceneTalkManager } from "Manager/SceneTalkManager";
import { ChapterSceneDirectoryManager } from "Manager/ChapterSceneDirectoryManager";
import { SliderComponentExtend } from "Common/SliderComponentExtend";
import { SoundManage } from "Audio/OriginCode/SoundManage";
import { CAudioChannel } from "Audio/OriginCode/CAudioChannel";
import { CTimer } from "Time/CTimer";
import { BindKeyName } from "Data/BindKeyName";
import { UiDataManager } from "PSDUI/UiDataManager";

export class CheakPopupSoundCell implements ICellHandler {
    nowClass: CheakPopup.listbga;
    index: number;
    config: GridConfig;
    cellData: AIChatSoundData;
    private startbtn: m4m.framework.button;
    private pauseBtn: m4m.framework.button;
    private usebtn: m4m.framework.button;

    private useButton: CustomButton;
    //总时长
    private totalTime: number = 0;
    //当前播放时间
    private currTime: number = 0;
    private audioPlayFunBind: any;
    private sliderExtend: SliderComponentExtend;
    public onInit(): void {
        this.useButton = this.config.soundPopup.useButton;
        if (!this.useButton) {
            //this.showOriginMessage = true;
            this.nowClass.btna1_img.transform.visible = false;
        } else {
            //this.showOriginMessage = false;
            this.nowClass.btna1_img.transform.visible = true;
            this.nowClass.btna1_img.btnlaba1_lab.label.text = this.useButton.text;
        }

        //应用按钮
        this.usebtn = this.nowClass.btna1_img.transform.addComponent("button") as m4m.framework.button;
        this.usebtn.addListener(m4m.event.UIEventEnum.PointerClick, this.useBtnClickFun, this);

        //开始播放按钮
        this.startbtn = this.nowClass.btna3_img.transform.addComponent("button") as m4m.framework.button;
        this.startbtn.addListener(m4m.event.UIEventEnum.PointerClick, this.startBtnClickFun, this);

        //暂停按钮
        this.pauseBtn = this.nowClass.btna2_img.transform.addComponent("button") as m4m.framework.button;
        this.pauseBtn.addListener(m4m.event.UIEventEnum.PointerClick, this.pauseBtnClickFun, this);

        // this.nowClass.barbga_img.bara1_bar.progressbar.value = 0.6;
        // //this.nowClass.barbga_img.bara1_bar.progressbar.value = 0.6;
        // //this.nowClass.barbga_img.bara1_bar.progressbar.transform.width = this.nowClass.btna2_img.transform.width * 0.5;

        this.sliderExtend = this.nowClass.barbga_img.bara1_bar.progressbar.transform.addComponent("SliderComponentExtend") as SliderComponentExtend;
        this.sliderExtend.setSliderBtn = this.nowClass.barbga_img.barbtna_btn.button;
        this.sliderExtend.setSliderBgImage = this.nowClass.barbga_img.transform;
        this.sliderExtend.offsetPercent = 1.6;
        this.sliderExtend.maxNum = 1;
        // this.sliderExtend.callBackFun = (sliderVale, dir) => {
        //     // console.error(sliderVale);
        // };
        this.sliderExtend.upCallBackFun = (val) => {
            // console.error("弹起  " + val);
            let stTime = Math.floor(val * this.totalTime);
            this.progressSliderUP = true;
            this.playAudioFun(stTime);
        }
        this.sliderExtend.setValue(0);
        //暂停按钮默认隐藏
        this.nowClass.btna2_img.transform.visible = false;

        this.audioPlayFunBind = this.audioPlayChanage.bind(this);
        UiDataManager.bindFunctionData(BindKeyName.AIAudioPlayFun, this.audioPlayFunBind);
    }
    public onSetData(value: AIChatSoundData): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;

            if (ChapterSceneDirectoryManager.Instance.SceneData) {
                let talkData: Entity.DialogData = SceneTalkManager.Instance.getTalkData(value.id);
                if (talkData) {
                    this.nowClass.texta2_lab.label.text = talkData.showName + ": " + talkData.content;
                } else {
                    this.nowClass.texta2_lab.label.text = value.name;
                }
            } else {
                this.nowClass.texta2_lab.label.text = value.name;
            }

            this.restStart();

            if (this.cellData.url != null && this.cellData.url.length != 0) {
                this.nowClass.texta3_lab.label.text = "加载中";
                //let testUrl = "res/art/audio/FrontendTheme1.wav";
                let path = ChatMessageDataManager.Instance.getResFullPath(this.cellData.url); 
                SoundManage.Instance.loadAudioFun(path, (audioName: string, buffe: AudioBuffer) => {
                    this.totalTime = buffe.duration;
                    this.nowClass.texta3_lab.label.text = this.trsToTime(this.totalTime);
                });
            } else {
                this.nowClass.texta3_lab.label.text = "生成中";
            }
            // console.error(element.value);
        } else {
            this.nowClass.transform.visible = false;
        }
    }

    public trsToTime(timeNum: number) {
        let s = Math.floor(timeNum % 60);
        return Math.floor(timeNum / 60) + ":" + (s < 10 ? "0" + s : s);
    }

    private useBtnClickFun() {
        if (this.useButton) {
            this.useButton.callback(this.cellData.id);
        }
        ChatMessageDataManager.Instance.sendMessage(ChatMessageDataManager.Instance.selectTabTitle, `应用第${this.index + 1}个声线`, false);
        //console.error("应用 " + this.cellData.id);
    }

    private timeID: number = -1;
    private chatAudioChannel: CAudioChannel;
    private progressSliderUP: boolean = false;
    private startBtnClickFun() {
        this.progressSliderUP = false;
        this.playAudioFun(0);
    }

    private playAudioFun(startTime: number) {
        if (this.cellData.url == null || this.cellData.url.length == 0) {
            return;
        }
        // console.error("点了开始");
        this.stopUpdate();
        if (this.chatAudioChannel && this.chatAudioChannel.ispaused) {
            //如果是暂停状态
            AudioManager.Instance.resumeChatAudion();
        } else {
            // console.error("开始播放 ");
            if(this.chatAudioChannel==null)
            {
                this.progressSliderUP=false;
            }
            this.chatAudioChannel = AudioManager.Instance.playChatAudio(ChatMessageDataManager.Instance.getResFullPath(this.cellData.url),1, (id) => {
                if (this.progressSliderUP == true) {
                    this.progressSliderUP=false;
                }else
                {
                    // console.error(id + " 声音播放结束@@ " + this.chatAudioChannel);
                    if (this.chatAudioChannel && this.chatAudioChannel.ispaused) {

                    } else {
                        this.restStart();
                    }
                    this.startbtn.transform.visible = true;
                    this.pauseBtn.transform.visible = false;
                }
            }, 0, 0, 0, startTime);
            UiDataManager.changeFunctionData(BindKeyName.AIAudioPlayFun, this.chatAudioChannel.id);
        }
        //console.error("开始播放 " + this.cellData.id);
        this.startbtn.transform.visible = false;
        this.pauseBtn.transform.visible = true;
        //每1秒
        this.timeID = CTimer.Instance.loopTimeUpdate(1000, this.updateFun.bind(this));
        this.updateFun();
    }

    //
    private audioPlayChanage(id: number) {
        if (this.chatAudioChannel != null) {
            // console.error(this.chatAudioChannel.id + "    " + id + " 这里的声音是暂停的？" + this.chatAudioChannel.ispaused);
            if (this.chatAudioChannel.id != id) {
                //不是同一个音频
                this.stopUpdate();
                this.restStart();
                this.startbtn.transform.visible = true;
                this.pauseBtn.transform.visible = false;
            }
        }
    }

    private updateFun() {
        if (this.chatAudioChannel) {
            // 
            let playTime = this.chatAudioChannel.playTime;
            // console.error(playTime + "   " + this.chatAudioChannel.totalTime);
            let offset = playTime / this.chatAudioChannel.totalTime;
            this.nowClass.texta4_lab.label.text = this.trsToTime(playTime);
            // console.error(offset);
            this.sliderExtend.setValue(offset);
        } else {
            this.stopUpdate();
        }
    }

    //重置
    private restStart() {
        this.chatAudioChannel = null;
        this.sliderExtend.setValue(0);
        this.nowClass.texta4_lab.label.text = this.trsToTime(0);
    }

    private stopUpdate() {
        if (this.timeID != -1) {
            CTimer.Instance.stop(this.timeID);
        }
    }

    private pauseBtnClickFun() {
        // console.error("点了暂停");
        this.stopUpdate();
        if (this.chatAudioChannel.isplay) {
            AudioManager.Instance.pauseChatAudio();
        } else {
            AudioManager.Instance.stopChatAudio();
        }
    }

    public onClick() {
        // console.error("点击了 " + this.cellData.id);

    }

    public onSelect() {

    }

    public onDispose(): void {
        UiDataManager.unBindFunctionData(BindKeyName.SpreadingPlateProgressbarValue, this.audioPlayFunBind);
        this.stopUpdate();

        this.usebtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.useBtnClickFun, this);
        this.startbtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.startBtnClickFun, this);
        this.pauseBtn.removeListener(m4m.event.UIEventEnum.PointerClick, this.pauseBtnClickFun, this);
    }
}