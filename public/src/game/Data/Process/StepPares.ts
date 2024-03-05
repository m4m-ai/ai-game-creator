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
import { EditorManager } from "../../Manager/EditorManager";
import { ChapterInfo } from "../ChapterInfo";
import {SceneInfo} from "../SceneInfo";
import { BackgroundStep } from "./BackgroundStep";
import { SoundStep } from "./SoundStep";
import {StandingPaintingStep} from "./StandingPaintingStep";
import { VoiceStep } from "./VoiceStep";
import {ConversationStep} from "./ConversationStep";

export class StepPares {
    /**
     * 解析 DialogData 表数据
     */
    public static parse(dataList: Entity.DialogData[]): void {
        for (let i = 0; i < dataList.length; i++) {
            let item = dataList[i];
            
            if (item.chapter == null || item.chapter.length == 0) {
                throw new Error(`数据存在问题, DialogData表 id: ${item.id} 'chapter' 这一列为空!`);
            }
            if (item.scene == null || item.scene.length == 0) {
                throw new Error(`数据存在问题, DialogData表 id: ${item.id} 'scene' 这一列为空!`);
            }
            
            let chapter = this.getOrCreateChapter(item.chapter);
            let scene = this.getOrCreateScene(chapter, item.scene);
            
            //切换背景
            if (item.backGround) {
                for (let instId in item.backGround) {
                    let param = item.backGround[instId];
                    if (param != null && param.length > 0) { //切换背景
                        let movePositions: m4m.math.vector2[] = [];
                        for (let j = 9; j < param.length; j += 2) {
                            movePositions.push(new m4m.math.vector2(parseFloat(param[j]), parseFloat(param[j + 1])));
                        }
                        scene.appendStep(new BackgroundStep({
                            instId,
                            show: true,
                            anchorX: 0,
                            anchorY: 0,
                            resPath: param[0],
                            mask: parseInt(param[1]),
                            moveTime: parseFloat(param[2]),
                            scaleX: parseFloat(param[3]),
                            scaleY: parseFloat(param[4]),
                            r: parseFloat(param[5]),
                            g: parseFloat(param[6]),
                            b: parseFloat(param[7]),
                            a: parseFloat(param[8]),
                            movePositions
                        }));
                    } else { //解除背景
                        scene.appendStep(new BackgroundStep({
                            instId,
                            show: false,
                            resPath: null,
                        }));
                    }
                }
            }
            
            //切换bgm
            if (item.sound) {
                for (let instId in item.sound) {
                    let param = item.sound[instId];
                    if (param != null && param.length > 0) { //切换音效
                        scene.appendStep(new SoundStep({
                            instId,
                            play: true,
                            resPath: param[0],
                            speed: parseFloat(param[1]),
                            type: parseInt(param[2]),
                            volume: parseFloat(param[3]),
                            loop: param[4] == "true",
                            delay: parseFloat(param[5]),
                            channel: parseInt(param[6])
                        }));
                    } else { //解除音效
                        scene.appendStep(new SoundStep({
                            instId,
                            play: false,
                            resPath: null,
                        }));
                    }
                }
            }
            
            //切换语音
            if (item.voice) {
                for (let instId in item.voice) {
                    let param = item.voice[instId];
                    if (param != null && param.length > 0) { //切换语音
                        scene.appendStep(new VoiceStep({
                            instId,
                            play: true,
                            resPath: param[0],
                            speed: parseFloat(param[1]),
                            volume: parseFloat(param[2]),
                            delay: parseFloat(param[3]),
                            channel: parseInt(param[4])
                        }));
                    } else { //解除语言
                        scene.appendStep(new VoiceStep({
                            instId,
                            play: false,
                            resPath: null,
                        }));
                    }
                }
            }

            //let isFadeOutList: StandingPaintingStep[] = [];
            //切换立绘
            if (item.roleDraws) {
                for (let instId in item.roleDraws) {
                    let param = item.roleDraws[instId];
                    if (param != null && param.length > 0) { //切换立绘
                        let movePositions: m4m.math.vector2[] = [];
                        for (let j = 10; j < param.length; j += 2) {
                            movePositions.push(new m4m.math.vector2(parseFloat(param[j]), parseFloat(param[j + 1])));
                        }
                        let fadeInOutTime = parseInt(param[1]);
                        let moveTime = parseFloat(param[2]);
                        let scaleX = parseFloat(param[3]);
                        let scaleY = parseFloat(param[4]);
                        let r = parseFloat(param[5]);
                        let g = parseFloat(param[6]);
                        let b = parseFloat(param[7]);
                        let a = parseFloat(param[8]);
                        let presetEffect = param[9];
                        scene.appendStep(new StandingPaintingStep({
                            instId,
                            show: true,
                            anchorX: 0.5,
                            anchorY: 0.5,
                            resPath: param[0],
                            fadeInOutTime,
                            isFadeIn: true,
                            moveTime,
                            scaleX,
                            scaleY,
                            r,
                            g,
                            b,
                            a,
                            presetEffect,
                            movePositions
                        }));
                        // isFadeOutList.push(new StandingPaintingStep({
                        //     instId,
                        //     show: true,
                        //     anchorX: 0.5,
                        //     anchorY: 0.5,
                        //     resPath: param[0],
                        //     fadeInOutTime,
                        //     isFadeIn: false,
                        //     moveTime,
                        //     scaleX,
                        //     scaleY,
                        //     r,
                        //     g,
                        //     b,
                        //     a,
                        //     presetEffect,
                        //     movePositions
                        // }));
                    } else { //解除立绘
                        scene.appendStep(new StandingPaintingStep({
                            instId,
                            show: false,
                            resPath: null,
                        }));
                    }
                }
            }
            
            //对话内容
            if (item.content != null) { //开启对话
                scene.appendStep(new ConversationStep({
                    text: item.content,
                    roleName: item.showName,
                    emote: item.emote
                }));
            } else { //关闭对象
                scene.appendStep(new ConversationStep({
                    text: null,
                    roleName: null
                }));
            }
            
            // //立绘淡出
            // for (let step of isFadeOutList) {
            //     scene.appendStep(step);
            // }
        }
    }
    
    /** 创建背景步骤 */
    public static createDefaultBackgroundStep(id: string, path: string): BackgroundStep {
        return new BackgroundStep({
            instId: id,
            show: true,
            anchorX: 0,
            anchorY: 0,
            resPath: path,
            r: 1,
            g: 1,
            b: 1,
            a: 1,
            mask: 1,
            moveTime: 0,
            scaleX: 1,
            scaleY: 1,
            movePositions: []
        });
    }
    
    /** 创建立绘步骤 */
    public static createDefaultStandingPaintingStep(id: string, path: string, x: number, y: number) {
        return new StandingPaintingStep({
            instId: id,
            show: true,
            anchorX: 0.5,
            anchorY: 0.5,
            resPath: path,
            fadeInOutTime: 0,
            isFadeIn: true,
            moveTime: 0,
            scaleX: 1.3,
            scaleY: 1.3,
            r: 1,
            g: 1,
            b: 1,
            a: 1,
            presetEffect: "",
            movePositions: [new m4m.math.vector2(x, y)]
        })
    }

    /** 创建隐藏立绘步骤 */
    public static createHideStandingPaintingStep(id: string) {
        return new StandingPaintingStep({
            instId: id,
            show: false,
            resPath: "",
        });
    }
    
    /** 创建默认音效步骤 */
    public static createDefaultVoiceStep(id: string, path: string): VoiceStep {
        return new VoiceStep({
            instId: id,
            play: true,
            resPath: path,
            speed: 1,
            volume: 1,
            delay: 0,
            channel: 0
        })
    }

    public static setDefaultBackgroundData(dialogData: Entity.DialogData, resPath: string) {
        let backGround = dialogData.backGround;
        if (backGround == null) {
            backGround = dialogData.backGround = {};
        }
        //资源id	mask	过度时间	缩放X	缩放Y	R	G	B	A	位置x%	位置y%
        let param = [
            resPath, //资源id
            1, //mask
            0, //过度时间
            1, 1, //缩放X	缩放Y
            1, 1, 1, 1, //R	G	B	A
            0, 0//位置x%	位置y%
        ];
        backGround["1"] = param as any;
    }

    public static setDefaultHideBackground(dialogData: Entity.DialogData) {
        let backGround = dialogData.backGround;
        if (backGround == null) {
            backGround = dialogData.backGround = {};
        }
        backGround["1"] = [] as any;
    }

    public static setDefaultStandingPaintingData(dialogData: Entity.DialogData, resPath: string, x: number, y: number, scaleX: number, scaleY: number) {
        let roleDraws = dialogData.roleDraws;
        if (roleDraws == null) {
            roleDraws = dialogData.roleDraws = {};
        }
        //insid	资源id	淡入淡出	移动时间	缩放X	缩放Y	R	G	B	A	人物基础预设	位置x%	位置y%
        let param = [
            resPath, //资源id
            0.3, //淡入淡出
            0, //移动时间
            scaleX, scaleY, //缩放X	缩放Y
            1, 1, 1, 1, //R	G	B	A
            "", //人物基础预设
            x, y//位置x%	位置y%
        ];
        roleDraws["1"] = param as any;
    }

    public static setDefaultHideStandingPainting(dialogData: Entity.DialogData) {
        let roleDraws = dialogData.roleDraws;
        if (roleDraws == null) {
            roleDraws = dialogData.roleDraws = {};
        }
        roleDraws["1"] = [] as any;
    }

    public static setDefaultVoiceData(dialogData: Entity.DialogData, resPath: string) {
        let voice = dialogData.voice;
        if (voice == null) {
            voice = dialogData.voice = {};
        }
        //insid	资源id	播放速度	音量	delay	声道
        let param = [
            resPath, //资源id
            1, //播放速度
            1, //音量
            0, //delay
            0 //声道
        ];
        voice["1"] = param as any;
    }

    //----------------------------------------------------------------------------------------

    /** 测试用的, 获取章节, 不存在就创建 */
    private static getOrCreateChapter(id: string) {
        let chapterInfo = EditorManager.Instance.getChapterById(id);
        if (!chapterInfo) {
            chapterInfo = new ChapterInfo(id, "chapter" + id);
            EditorManager.Instance.appendChapter(chapterInfo);
        }
        return chapterInfo;
    }
    
    /** 测试用的, 获取场景, 不存在就创建 */
    private static getOrCreateScene(chapter: ChapterInfo, id: string) {
        let sceneInfo = chapter.getSceneById(id);
        if (!sceneInfo) {
            sceneInfo = new SceneInfo(id, "scene" + id);
            chapter.appendScene(sceneInfo);
        }
        return sceneInfo;
    }
}