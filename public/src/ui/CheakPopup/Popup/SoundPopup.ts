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
import { AIChatSoundData, ChatRecordItem, CustomButton } from "Data/DataType";
import { CheakPopup } from "../CheakPopup";
import { PopupBase } from "./PopupBase";
import { GridExtend } from "Data/GridExtend/GridExtend";
import { CheakPopupSoundCell } from "../CheakPopupSoundCell";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { EditorManager } from "Manager/EditorManager";
import { ChapterSceneDirectoryManager } from "Manager/ChapterSceneDirectoryManager";
import { StepType } from "Data/Process/StepType";
import { ConversationStep } from "Data/Process/ConversationStep";
import { VoiceStep } from "Data/Process/VoiceStep";
import { StepPares } from "Data/Process/StepPares";
import { StandingPaintingStep } from "Data/Process/StandingPaintingStep";


export class SoundPopup extends PopupBase<CheakPopup.boxa_img> {

    private height: number = 0;
    private grid: GridExtend<CheakPopup.listbga, AIChatSoundData>;
    private useButton: CustomButton;
    private needRefreshHeight = false;
    private startY: number;

    public onInit(): void {
        this.ui.texta1_lab.label.getMaterial();
        this.startY = this.ui.listbg3.listbga2.transform.getLayoutValue(m4m.framework.layoutOption.TOP);
        this.grid = new GridExtend(this.ui.listbg3.listbga2.listbga, CheakPopupSoundCell, {
            columns: 1,
            offsetY: 70,
            soundPopup: this
        });
    }
    public onSetData(data: ChatRecordItem, isFirst: boolean): void {
        this.needRefreshHeight = true;
        this.useButton = data.useButton;
        this.ui.texta1_lab.label.text = data.originData.content;
        //音效列表
        let sound = data.originData.sounds;
        let list: AIChatSoundData[] = [];

        let sceneData = ChapterSceneDirectoryManager.Instance.SceneData;
        if (sceneData) {
            //是否切换过音效
            let changeSound: boolean = false;
            let stepList = sceneData.stepList;
            for (let i = 0; i < stepList.length; i++) {
                let item = stepList[i];
                if (item.type == StepType.conversation) {
                    let conversationStep = item as ConversationStep;
                    if (conversationStep.data.dialogData != null && conversationStep.data.dialogData.id in sound) {
                        let path = sound[conversationStep.data.dialogData.id];
                        list.push({
                            id: conversationStep.data.dialogData.id,
                            name: path,
                            url: path
                        });

                        if (path != null && path.length > 0) {
                            //创建音效step
                            let index = stepList.findIndex((value) => {
                                return value.type == StepType.voice &&
                                (value as VoiceStep).data.dialogData != null &&
                                (value as VoiceStep).data.dialogData.id == conversationStep.data.dialogData.id;
                            });
                            let voiceStep = StepPares.createDefaultVoiceStep("1", path);
                            voiceStep.data.dialogData = conversationStep.data.dialogData;
                            if (index >= 0) {
                                sceneData.replaceStep(voiceStep, index);
                            } else {
                                sceneData.insertStep(voiceStep, i);
                                i++;
                            }
                            changeSound = true;
                            // console.error(voiceStep.prevStep.type+"    "+voiceStep.nextStep.type);
                            if (voiceStep.prevStep.type == StepType.standingPainting) {
                                let standingPaintingStep = voiceStep.prevStep as StandingPaintingStep;
                                voiceStep.data.x=this.getAudioPosFun(standingPaintingStep.data.anchorX);//根据位置关系 -1  0  1
                                voiceStep.data.y=this.getAudioPosFun(standingPaintingStep.data.anchorY);//根据位置关系
                                // console.error(standingPaintingStep);
                            } else  if (voiceStep.nextStep.type == StepType.standingPainting) {
                                let standingPaintingStep = item.nextStep as StandingPaintingStep;
                                voiceStep.data.x=this.getAudioPosFun(standingPaintingStep.data.anchorX);//根据位置关系
                                voiceStep.data.y=this.getAudioPosFun(standingPaintingStep.data.anchorY);//根据位置关系
                                // console.error(standingPaintingStep);
                            }
                        }
                    }
                }
            }

            if (changeSound) {
                sceneData.createDialogListByStep();
                sceneData.sendDialogDataToServer();
            }
        } else {
            for (let key in sound) {
                let path = sound[key];
                list.push({
                    id: key,
                    name: path,
                    url: path
                });
            }
        }

        this.grid.setDataList(list);
    }
    private getAudioPosFun(num:number)
    {
        let res=0;
        if(num==0.5)
        {
            res=0;
        }else if(num<0.5)
        {
            res=num*2-1;
        }else
        {
            res=num*2;
        }
        return res;
    }
    public getHeight(): number {
        if (this.needRefreshHeight) {
            this.needRefreshHeight = false;

            let h = 0;
            let lab = this.ui.texta1_lab.label;
            if (lab.text != null && lab.text.length > 0) {
                let rect = lab.getDrawBounds();
                if (isNaN(rect.h)) {
                    rect.h = 0;
                }
                h = rect.h;
            }
            
            this.ui.listbg3.listbga2.transform.setLayoutValue(m4m.framework.layoutOption.TOP, this.startY + h);
            this.height = h + this.grid.height + 300;
            this.ui.transform.height = this.height;
        }
        return this.height;
    }
    public dispose(): void {
        this.grid.dispose();
        this.grid = null;
    }
}