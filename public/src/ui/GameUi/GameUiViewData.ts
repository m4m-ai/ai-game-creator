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
import { BackgroundStepData } from "Data/Process/BackgroundStep";
import { ConversationOptionsStepData } from "Data/Process/ConversationOptionsStep";
import { ConversationStepData } from "Data/Process/ConversationStep";
import { StandingPaintingStepData } from "Data/Process/StandingPaintingStep";
import { StepEventData } from "Data/Process/Step";
import { SceneInfo } from "Data/SceneInfo";
import { ViewBaseData } from "Data/ViewBaseData";
import { GameUiView } from "./GameUiView";
import { ScrollText } from "./Effect/ScrollText";
import { VoiceStepData } from "Data/Process/VoiceStep";
import { SoundStepData } from "Data/Process/SoundStep";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";
import { EmoteManager } from "Manager/EmoteManager";
import { TimeLine } from "Time/TimeLine";
import { CommonUIUtils } from "Data/CommonUIUtils";
import { GameMgr } from "GameMgr";
import { PreloadState, ScenePreloadManager } from "Manager/ScenePreloadManager";
import { EditorManager } from "Manager/EditorManager";
import { FrameMgr } from "Tools/FrameMgr";

export class GameUiViewData implements ViewBaseData {

    public isShowOption: boolean = false;
    public optionsStepData: StepEventData<ConversationOptionsStepData[]>;
    
    private view: GameUiView;
    private runNextStepCallback?: () => void;
    private scrollText: ScrollText;
    private timeLine: TimeLine = new TimeLine();
    private emoteRawImage: m4m.framework.rawImage2D;

    public constructor(view: GameUiView) {
        this.view = view;
        this._runLoadingFunc = this.runLoading.bind(this);

        let button = this.view.transform.addComponent("button") as m4m.framework.button;
        button.addListener(m4m.event.UIEventEnum.PointerClick, this.onClickNextStep, this);

        let obj = new m4m.framework.transform2D();
        this.view.transform.addChild(obj);
        this.emoteRawImage = obj.addComponent("rawImage2D") as m4m.framework.rawImage2D;
        this.emoteRawImage.transform.visible = false;
        this.emoteRawImage.transform.width = 200;
        this.emoteRawImage.transform.height = 200;
        this.emoteRawImage.transform.layoutState = m4m.framework.layoutOption.LEFT | m4m.framework.layoutOption.TOP;
        //this.emoteRawImage.transform.localTranslate = new m4m.math.vector2(500, 500);

        this.onChangeConversation(null);
        this.onChangeConversationOptions(null);
        this.onChangeBackground(null);
        this.onChangeSound(null);
        this.onChangeVoice(null);
        this.onChangeStandingPainting(null);
    }

    public onPreloadStateChange(state: PreloadState) {
        switch (state) {
            case PreloadState.start://开始预加载
                this.view.bg3.bg1_img.transform.visible = true;
                FrameMgr.Add(this._runLoadingFunc, this);
                break;
            case PreloadState.complete://预加载完成
                this.view.bg3.bg1_img.transform.visible = false;
                EditorManager.Instance.isPlay =true;
                FrameMgr.Remove(this._runLoadingFunc, this);
                break;
            case PreloadState.cancel://取消
                this.view.bg3.bg1_img.transform.visible = false;
                ScenePreloadManager.Instance.clear();
                FrameMgr.Remove(this._runLoadingFunc, this);
                break;
        }
    }
    private _runLoadingFunc:any;
    private runLoading(delta: number) {
        this.view.bg3.bg1_img.buffer_img.transform.localRotate += Math.PI * delta;
        this.view.bg3.bg1_img.buffer_img.transform.markDirty();
    }

    /** 切换场景 */
    public onChangeScene(sceneObj: any) {
        let sceneInfo: SceneInfo = sceneObj.scene;
        console.log("切换场景: ", sceneInfo);
    }

    /** 切换对话内容 */
    public onChangeConversation(data?: StepEventData<ConversationStepData>) {
        console.log("切换对话内容: ", data?.index, data?.data);
        if (data) {
            if (data.data.text) {
                this.onSetConversationData(data);
                this.runNextStepCallback = data.finish;
            } else {
                this.onSetConversationData(null);
                this.runNextStepCallback = null;
                data.finish();
            }
        } else {
            this.onSetConversationData(null);
            this.runNextStepCallback = null;
        }
    }

    /** 切换对话选项 */
    public onChangeConversationOptions(data?: StepEventData<ConversationOptionsStepData[]>) {
        console.log("切换对话选项: ", data?.index, data?.data);
        if (data) {
            if (data.data.length > 0) {
                this.optionsStepData = data;
                this.onSetConversationOptionsData(data);
                this.runNextStepCallback = data.finish;
            } else {
                this.optionsStepData = null;
                this.onSetConversationOptionsData(null);
                this.runNextStepCallback = null;
                data.finish();
            }
        } else {
            this.optionsStepData = null;
            this.onSetConversationOptionsData(null);
            this.runNextStepCallback = null;
        }
    }

    /** 切换立绘 */
    public onChangeStandingPainting(data?: StepEventData<StandingPaintingStepData>) {
        console.log("切换立绘: ", data?.index, data?.data);
        if (data) {
            if (data.data.show) {
                ScenePreloadManager.Instance.refresh(data.index, data.data.resPath);
                this.view.lihui_raw_pool.handlerData(data.data.instId, data.data.resPath, data.data.fadeInOutTime, data.data.isFadeIn, data.data, (raw) => {
                    if (data.data.movePositions.length > 0) {
                        let pos = data.data.movePositions[0];
                        this.view.setTransformData(this.emoteRawImage.transform, pos.x, 0.1, 1, 1, 0.5, 0.5);
                    }
                });
            } else {
                this.view.lihui_raw_pool.recycleUiNode(data.data.instId);
            }
            //调用执行完成
            data.finish();
        } else {
            //回收所有
            this.view.lihui_raw_pool.recycleAllUiNode();

            this.emoteRawImage.transform.visible = false;
            this.timeLine.Stop();
            this.timeLine.Clear();
        }
    }

    /** 切换音效 */
    public onChangeSound(data?: StepEventData<SoundStepData>) {
        console.log("切换sound: ", data?.index, data?.data);
        if (data) {
            if (data.data.play) {
                ScenePreloadManager.Instance.refresh(data.index, ChatMessageDataManager.Instance.getResFullPath(data.data.resPath));
                this.view.soundPool.handerAudoi(data.data.instId, data.data.resPath, data.data.volume, data.data.loop);
            } else {
                this.view.soundPool.stopAudio(data.data.instId);
            }
            data.finish();
        } else {
            this.view.soundPool.stopAllAudio();
        }
    }

    /** 切换语音 */
    public onChangeVoice(data?: StepEventData<VoiceStepData>) {
        console.log("切换voice: ", data?.index, data?.data);
        if (data) {
            if (data.data.play) {
                ScenePreloadManager.Instance.refresh(data.index, ChatMessageDataManager.Instance.getResFullPath(data.data.resPath));
                this.view.voicePool.handerAudoi(data.data.instId, data.data.resPath, data.data.volume, false);
            } else {
                this.view.voicePool.stopAudio(data.data.instId);
            }
            data.finish();
        } else {
            this.view.voicePool.stopAllAudio();
        }
    }

    /** 切换背景 */
    public onChangeBackground(data?: StepEventData<BackgroundStepData>) {
        console.log("切换背景: ", data?.index, data?.data);
        if (data) {
            if (data.data.show) {
                ScenePreloadManager.Instance.refresh(data.index, data.data.resPath);
                this.view.bg_raw_pool.handlerData(data.data.instId, data.data.resPath, 0, false, data.data, (rawImage2D: m4m.framework.rawImage2D) => {
                    let nexImageUrl = this.view.viewData.combinePath(data.data.resPath);
                    this.view.setCutsceneIconFun(rawImage2D, 5, 1, nexImageUrl);
                });
            } else {
                this.view.bg_raw_pool.recycleUiNode(data.data.instId);
            }
            //调用执行完成
            data.finish();
        } else {
            //回收所有
            this.view.bg_raw_pool.recycleAllUiNode();
        }
    }

    //切换人物和对话图片的显示状态
    public changeRoleAndTalkImageState(vis: boolean) {
        let _map = this.view.lihui_raw_pool.getAllUiNode();
        _map.forEach((value, key) => {
            let lihui = value;
            if (lihui) {
                lihui.transform.visible = vis;
            }
        });
        this.view.bg.talkbg_img.transform.visible = vis;
    }

    public dispose() {

    }

    //点击执行下一步
    private onClickNextStep() {
        if (this.isShowOption) {

        } else if (this.scrollText) {
            if (this.scrollText.isFinish && this.view.lihui_raw_pool.isRunFinish()) {
                this.scrollText = null;
                this.runNextStep();
            } else {
                this.scrollText.skip();
                this.view.lihui_raw_pool.skip();
            }
        } else {
            this.runNextStep();
        }
    }

    private runNextStep() {
        if (this.runNextStepCallback) {
            this.view.voicePool.stopAllAudio();
            this.emoteRawImage.transform.visible = false;
            this.timeLine.Stop();
            this.timeLine.Clear();
            
            let func = this.runNextStepCallback;
            this.runNextStepCallback = null;
            func();
        }
    }

    //处理对话数据
    private onSetConversationData(data?: StepEventData<ConversationStepData>) {
        if (data) {
            this.view.bg.talkbg_img.transform.visible = true;
            if (data.data.roleName != null && data.data.roleName.length > 0) {
                this.view.bg.talkbg_img.talklab_lab.transform.visible = true;
                this.view.bg.talkbg_img.talklab_lab.label.text = data.data.roleName;
            } else {
                this.view.bg.talkbg_img.talklab_lab.transform.visible = false;
            }

            if (data.data.emote) {
                console.log("表情: " + data.data.emote + ", 路径: " + EmoteManager.Instance.getEmotePath(data.data.emote));
                let path = EmoteManager.Instance.getEmotePath(data.data.emote);
                if (path) {
                    //this.view.setTransformData(this.emoteRawImage.transform, 0.5, 0.5, 1, 1, 0.5, 0.5);
                    CommonUIUtils.setTextureLateVisibleFun(this.emoteRawImage, GameMgr.texttype + path);
                    this.timeLine.AddTime(2000, () => {
                        this.emoteRawImage.transform.visible = false;
                    });
                    this.timeLine.Start();
                }
            }

            //对话内容, 跳字
            this.scrollText = new ScrollText({
                text: data.data.text,
                label: this.view.bg.talkbg_img.talklab1_lab.label,
                speed: 30
            });
            this.scrollText.start();
        } else {
            this.view.bg.talkbg_img.transform.visible = false;
        }
    }

    //处理分支选项
    private onSetConversationOptionsData(data?: StepEventData<ConversationOptionsStepData[]>) {
        if (data) {
            this.isShowOption = true;
            this.view.grid.setDataList(data.data);
        } else {
            this.isShowOption = false;
            this.view.grid.removeAll();
        }
    }

    /** 合并加载路径 */
    public combinePath(path: string) {
        return ChatMessageDataManager.Instance.getResFullPath(path);
    }
}