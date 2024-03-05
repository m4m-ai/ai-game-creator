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
import { Step } from "./Process/Step";
import { ChapterInfo } from "./ChapterInfo";
import { ConversationStep } from "./Process/ConversationStep";
import { BackgroundStep } from "./Process/BackgroundStep";
import { StepPares } from "./Process/StepPares";
import { RoleSettingManager } from "../Manager/RoleSettingManager";
import { StepType } from "./Process/StepType";
import { SceneTalkManager } from "../Manager/SceneTalkManager";
import { GameProjectManager } from "../Manager/GameProjectManager";
import { DialogData } from "DialogData";
import { ChapterSceneDirectoryManager } from "../Manager/ChapterSceneDirectoryManager";

/**
 * 场景信息
 */
export class SceneInfo {

    /** 场景id */
    public get id(): string {
        return this._id;
    }

    /** 所属章节 */
    public get chapter(): ChapterInfo {
        return this._chapter;
    }
    public set chapter(value: ChapterInfo) {
        this._chapter = value;
    }



    /** 当前场景名称 */
    public get sceneName() {
        return this._sceneName;
    }

    /** 步骤列表 */
    public get stepList(): Step[] {
        return this._stepList;
    }

    /** 背景 */
    public get background() {
        return this._background;
    }

    /** 用户创建的对话文本 */
    public get stepText() {
        return this._stepText;
    }

    /* 当前场景保存的 DialogData 数据 */
    public get dialogDataList() {
        return this._dialogDataList;
    }

    private _id: string;
    private _chapter: ChapterInfo;
    private _sceneName: string;
    private _stepList: Step[] = [];
    private _background: BackgroundStep;

    private _dialogDataList: Entity.DialogData[] = [];
    private _stepText: string;

    constructor(id: string, sceneName: string) {
        this._id = id;
        this._sceneName = sceneName;
    }

    public updateSceneName(sceneName: string) {
        this._sceneName = sceneName;
    }

    /** 设置场景背景 */
    public setBackground(bg: BackgroundStep) {
        if (bg == this._background) {
            return;
        }
        if (this._background != null) { //移除上一个背景
            let index = this._stepList.indexOf(this._background);
            if (index >= 0) {
                this.replaceStep(bg, index);
            } else {
                this.insertStep(bg, 0);
            }
        } else {
            this.insertStep(bg, 0);
        }
        this._background = bg;

        //保存数据
        if (this.dialogDataList != null && this.dialogDataList.length > 0) {
            let temp = this.dialogDataList[0];
            let bgData = temp.backGround;
            if (!bgData) {
                bgData = temp.backGround = {};
            }
            StepPares.setDefaultBackgroundData(temp, bg.data.resPath);
        }
    }

    /** 根据用户设置的对话文本来创建step数据, 返回值为是否造成修改 */
    public createStepByText(str: string): boolean {
        if (this._stepText == str) {
            return false;
        }
        this._stepText = str;
        this._stepList.length = 0;

        if (this._background != null) {
            this._stepList.push(this._background);
        }

        let prevRoleName: string;
        let drawIndex = 1;
        let split = str.split('\n');
        for (let i = 0; i < split.length; i++) {
            let item = split[i];
            if (item == null) {
                continue;
            }
            item = item.trim();
            if (item.length === 0) {
                continue;
            }

            let index = item.indexOf(":");
            if (index < 0) {
                console.error(`第${i + 1}行格式错误: ${item}`)
            } else {
                //角色名称+表情
                let temp = item.substring(0, index).trim();
                //表情
                let emote: string;
                let startIndex = temp.indexOf("[");
                //角色名称
                let roleName: string = temp;
                if (startIndex > 0) { //去掉表情
                    let endIndex = temp.lastIndexOf("]");
                    if (endIndex >= 0) {
                        emote = temp.substring(startIndex + 1, endIndex).trim();
                    } else {
                        emote = "";
                    }
                    roleName = temp.substring(0, startIndex).trim();
                } else { //没有表情
                    emote = "";
                }

                if (roleName === "旁白") { //隐藏立绘
                    roleName = "";
                    this.appendStep(StepPares.createHideStandingPaintingStep("1"));
                } else if (roleName !== prevRoleName) { //切换立绘
                    let role = RoleSettingManager.instance.newGetCurrentProjectRoleByName(roleName);
                    if (role && role.roleDrawing != null && Object.keys(role.roleDrawing).length > 0) {
                        if (drawIndex % 2 !== 0) {
                            this.appendStep(StepPares.createDefaultStandingPaintingStep("1", role.roleDrawing["normal"], 0.25, 0.75));
                            drawIndex++;
                        } else {
                            this.appendStep(StepPares.createDefaultStandingPaintingStep("1", role.roleDrawing["normal"], 0.85, 0.75));
                            drawIndex++;
                        }
                    } else {
                        this.appendStep(StepPares.createHideStandingPaintingStep("1"));
                    }
                }

                this.appendStep(new ConversationStep({
                    roleName,
                    text: item.substring(index + 1).trim(),
                    emote: emote,
                }));
            }
        }
        return true;
    }

    /** 根据DialogData数据创建step数据 */
    public createStepByDialogList(dialogDataList: Entity.DialogData[]) {
        this._dialogDataList.length = 0;
        for (let item of dialogDataList) {
            if (item.scene != this.id || item.chapter != this.chapter.id) {
                console.error("DialogData数据不属于当前场景! 数据id: " + item.id);
                continue;
            }
            this._dialogDataList.push(item);
        }
        this.stepList.length = 0;
        StepPares.parse(this.dialogDataList);

        //寻找背景
        for (let step of this.stepList) {
            if (step.type == StepType.conversation) {
                break;
            } else if (step.type == StepType.background) {
                this._background = step as BackgroundStep;
                break;
            }
        }

        let str = "";
        for (let item of this._dialogDataList) {
            let roleName: string;
            if (item.roleId == null || item.roleId.length == 0) {
                roleName = "旁白";
            } else {
                roleName = item.showName;
            }
            if (item.emote) {
                str += `${roleName}[${item.emote}]: ${item.content}\n`;
            } else {
                str += `${roleName}: ${item.content}\n`;
            }
        }
        this._stepText = str;
    }

    /** 根据step创建dialogData数据 */
    public createDialogListByStep() {
        this._dialogDataList.length = 0;
        let id = GameProjectManager.instance.currentGalData.id;

        let showRole: boolean = false;
        let drawIndex = 1;
        let nullIndex = 1;

        for (const step of this.stepList) {
            if (step.type == StepType.conversation) {
                let conversationStep = step as ConversationStep;
                let role = RoleSettingManager.instance.newGetCurrentProjectRoleByName(conversationStep.data.roleName);
                let dialog: DialogData = new DialogData();
                dialog.id = ChapterSceneDirectoryManager.Instance.uuid();
                dialog.content = conversationStep.data.text;
                dialog.gal = id;
                dialog.chapter = this.chapter.id;
                dialog.scene = this.id;
                //角色数据
                if (role) {
                    dialog.roleId = role.id;
                    dialog.showName = conversationStep.data.roleName;
                    //设置立绘
                    let draw = conversationStep.findStandingPainting();
                    if (draw) {
                        if (draw.data.movePositions != null && draw.data.movePositions.length > 0) {
                            if (drawIndex % 2 !== 0) {
                                StepPares.setDefaultStandingPaintingData(dialog as any,
                                    draw.data.resPath,
                                    draw.data.movePositions[0].x, draw.data.movePositions[0].y,
                                    draw.data.scaleX, draw.data.scaleY
                                );
                                drawIndex++;
                            } else {
                                StepPares.setDefaultStandingPaintingData(dialog as any,
                                    draw.data.resPath,
                                    0.85, draw.data.movePositions[0].y,
                                    draw.data.scaleX, draw.data.scaleY
                                );
                                drawIndex++;
                            }
                        } else {
                            if (nullIndex % 2 !== 0) {
                                StepPares.setDefaultStandingPaintingData(dialog as any,
                                    draw.data.resPath,
                                    0.2, 0.75,
                                    1.3, 1.3
                                );
                                nullIndex++;
                            } else {
                                StepPares.setDefaultStandingPaintingData(dialog as any,
                                    draw.data.resPath,
                                    0.85, 0.75,
                                    1.3, 1.3
                                );
                                nullIndex++;
                            }
                        }
                        showRole = true;
                    } else {
                        if (showRole) {
                            //解除立绘
                            StepPares.setDefaultHideStandingPainting(dialog as any);
                            showRole = false;
                        } else {
                            dialog.roleDraws = {};
                        }
                    }
                } else {
                    dialog.roleId = "";
                    dialog.showName = conversationStep.data.roleName;
                    if (showRole) {
                        //解除立绘
                        StepPares.setDefaultHideStandingPainting(dialog as any);
                        showRole = false;
                    } else {
                        dialog.roleDraws = {};
                    }
                }

                //设置背景
                let bg = conversationStep.findBackground();
                if (bg) {
                    StepPares.setDefaultBackgroundData(dialog as any, bg.data.resPath);
                } else {
                    dialog.backGround = {};
                }

                //设置语音
                let voice = conversationStep.findVoice();
                if (voice) {
                    StepPares.setDefaultVoiceData(dialog as any, voice.data.resPath);
                } else {
                    dialog.voice = {};
                }

                //表情
                if (conversationStep.data.emote) {
                    dialog.emote = conversationStep.data.emote;
                } else {
                    dialog.emote = "";
                }

                dialog.sound = {};
                dialog.showDelay = 1;
                dialog.skipType = 1;
                dialog.screenShake = [];
                dialog.notClear = false;
                dialog.VariableFormula = [];
                dialog.script = [];
                this._dialogDataList.push(dialog as any);

                conversationStep.data.dialogData = dialog as any;
                SceneTalkManager.Instance.addTalkData(dialog);
            }
        }
    }

    /** 添加步骤 */
    public appendStep(step: Step) {
        if (this._stepList.indexOf(step) != -1) {
            console.error("step已经在当前场景中!");
            return;
        }
        step.index = this._stepList.length;
        step.scene = this;
        step.nextStep = null;
        let prev = this._stepList[this._stepList.length - 1];
        step.prevStep = prev;
        if (prev) {
            prev.nextStep = step;
        }
        this._stepList.push(step);
    }

    /** 插入步骤 */
    public insertStep(step: Step, index: number) {
        if (index < 0) {
            return;
        }
        if (this._stepList.indexOf(step) != -1) {
            console.error("step已经在当前场景中!");
            return;
        }
        if (index > this._stepList.length) {
            console.error("index不能大于stepList的长度");
            return;
        }
        if (index == this._stepList.length) {
            this.appendStep(step);
        } else {
            step.index = index;
            step.scene = this;
            for (let i = this._stepList.length; i > index; i--) {
                let temp = this._stepList[i - 1];
                temp.index = i;
                this._stepList[i] = temp;
            }
            let prev = this._stepList[index - 1];
            let next = this._stepList[index + 1];
            if (prev) {
                prev.nextStep = step;
            }
            if (next) {
                next.prevStep = step;
            }
            step.prevStep = prev;
            step.nextStep = next;
            this._stepList[index] = step;
        }
    }

    /** 替换步骤 */
    public replaceStep(step: Step, index: number) {
        if (index < 0) {
            return;
        }
        if (index >= this._stepList.length) {
            console.error("index不能大于等于stepList的长度");
            return;
        }
        if (this._stepList[index] == step) {
            console.error("自己替换自己?");
            return;
        }

        this._stepList[index] = step;
        let prev = this._stepList[index - 1];
        let next = this._stepList[index + 1];
        if (prev != null) {
            prev.nextStep = step;
            step.prevStep = prev;
        } else {
            step.prevStep = null;
        }
        if (next != null) {
            next.prevStep = step;
            step.nextStep = next;
        } else {
            step.nextStep = null;
        }
    }

    /** 删除步骤 */
    public deleteStep(step: Step);
    /** 删除步骤 */
    public deleteStep(index: number);
    public deleteStep(step: Step | number) {
        let index: number;
        if (typeof step == "number") {
            index = step;
        } else {
            index = this._stepList.indexOf(step);
        }
        if (index < 0) {
            return;
        }
        if (index >= this._stepList.length) {
            console.error("index不能大于等于stepList的长度");
            return;
        }

        let prev = this._stepList[index - 1];
        let next = this._stepList[index + 1];
        if (prev != null) {
            prev.nextStep = next;
        }
        if (next != null) {
            next.prevStep = prev;
        }
        this._stepList.splice(index, 1);
    }

    /** 将对话数据发送给服务器 */
    public sendDialogDataToServer() {
        if (this._dialogDataList == null) {
            this._dialogDataList = [];
        }
        let res = JSON.stringify(this.dialogDataList);
        SceneTalkManager.Instance.SetDialog(this.chapter.id, this.id, res);
        console.log("同步对话数据...");
    }

    /** 获取当前章节下一个非空场景 */
    public getChapterNextScene(): SceneInfo {
        let index = this.chapter.sceneList.indexOf(this);
        if (index < 0) {
            return null;
        }
        index++;
        for (; index < this.chapter.sceneList.length; index++) {
            let nextScene: SceneInfo = this.chapter.sceneList[index];
            if (nextScene.stepList.length > 0) {
                return nextScene;
            }
        }
        return null;
    }
}