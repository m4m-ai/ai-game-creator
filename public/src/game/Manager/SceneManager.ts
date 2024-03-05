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
import {SceneInfo} from "../Data/SceneInfo";
import {ConversationStep} from "../Data/Process/ConversationStep";
import {ConversationOptionsStep} from "../Data/Process/ConversationOptionsStep";
import { BackgroundStep } from "../Data/Process/BackgroundStep";
import { StandingPaintingStep } from "../Data/Process/StandingPaintingStep";

export class SceneManager {
    public static get Instance(): SceneManager {
        return this._instance;
    }
    private static _instance: SceneManager = new SceneManager();
    private constructor() {

    }
    
    //--------------------------------- 测试数据 -------------------------------

    // private getTest1Scene() {
    //     let scene = new SceneInfo();
    //     scene.appendStep(new StandingPaintingStep({
    //         image: "res/art/texture/Role/1.png"
    //     }));
    //     let step0 = new ConversationStep({
    //         text: "这里是scene1",
    //         roleName: "role1",
    //     });
    //     let step5 = new BackgroundStep({
    //         image: "res/art/texture/Scene/1.jpg"
    //     });
    //     let step1 = new ConversationStep({
    //         text: "let rootEle: any = globalThis.document.getElementById(\"gamecontainer\");let rootEle: any = globalThis.document.getElementById(\"gamecontainer\");let rootEle: any = globalThis.document.getElementById(\"gamecontainer\");let rootEle: any = globalThis.document.getElementById(\"gamecontainer\");",
    //         roleName: "role1",
    //     });
    //     let step2 = new ConversationStep({
    //         text: "console.log(`前置依赖资源加载完毕！`);console.log(`前置依赖资源加载完毕！`);",
    //         roleName: "role1",
    //     });
    //     let step3 = new ConversationOptionsStep([
    //         {
    //             label: "scene1",
    //             scene: "scene1"
    //         },
    //         {
    //             label: "scene2",
    //             scene: "scene2"
    //         }
    //     ]);
    //     let step4 = new ConversationStep({
    //         text: "dddd",
    //         roleName: "role1",
    //     });
    //     scene.appendStep(step0);
    //     scene.appendStep(step2);
    //     scene.insertStep(step1, 2);
    //     scene.insertStep(step5, 2);
    //     scene.appendStep(step3);
    //     scene.appendStep(step4);
    //     return scene;
    // }
    //
    // private getTest2Scene() {
    //     let scene = new SceneInfo();
    //     scene.appendStep(new StandingPaintingStep({
    //         image: "res/art/texture/Role/2.png"
    //     }));
    //     let step0 = new ConversationStep({
    //         text: "这里是scene2",
    //         roleName: "role1",
    //     });
    //     let step1 = new ConversationStep({
    //         text: "scene2, bbbb",
    //         roleName: "role1",
    //     });
    //     let step2 = new ConversationOptionsStep([
    //         {
    //             label: "scene1",
    //             scene: "scene1"
    //         },
    //         {
    //             label: "scene3",
    //             scene: "scene3"
    //         }
    //     ]);
    //     scene.appendStep(step0);
    //     scene.appendStep(step1);
    //     scene.appendStep(step2);
    //     return scene;
    // }
    //
    // private getTest3Scene() {
    //     let scene = new SceneInfo();
    //     scene.appendStep(new StandingPaintingStep({
    //         image: "res/art/texture/Role/1.png"
    //     }));
    //     let step0 = new ConversationStep({
    //         text: "这里是scene3",
    //         roleName: "role1",
    //     });
    //     let step1 = new ConversationStep({
    //         text: "scene3, bbbb",
    //         roleName: "role1",
    //     });
    //     let step2 = new ConversationOptionsStep([
    //         {
    //             label: "scene1",
    //             scene: "scene1"
    //         },
    //         {
    //             label: "scene3",
    //             scene: "scene3"
    //         },
    //         {
    //             label: "scene4",
    //             scene: "scene4"
    //         }
    //     ]);
    //     scene.appendStep(step0);
    //     scene.appendStep(step1);
    //     scene.appendStep(step2);
    //     return scene;
    // }
    //
    // private getTest4Scene() {
    //     let scene = new SceneInfo();
    //     scene.appendStep(new StandingPaintingStep({
    //         image: "res/art/texture/Role/3.png"
    //     }));
    //     scene.appendStep(new ConversationStep({
    //         text: "这里是scene4",
    //         roleName: "role1",
    //     }));
    //     scene.appendStep(new BackgroundStep({
    //         image: "res/art/texture/Scene/2.jpg"
    //     }));
    //     scene.appendStep(new ConversationStep({
    //         text: "bbbb",
    //         roleName: "role1",
    //     }));
    //     scene.appendStep(new ConversationStep({
    //         text: "cccc",
    //         roleName: "role1",
    //     }));
    //     scene.appendStep(new ConversationStep({
    //         text: "dddd",
    //         roleName: "role1",
    //     }));
    //     scene.appendStep(new BackgroundStep({
    //         image: "res/art/texture/Scene/3.jpg"
    //     }));
    //     scene.appendStep(new ConversationStep({
    //         text: "eeee",
    //         roleName: "role1",
    //     }));
    //     scene.appendStep(new ConversationStep({
    //         text: "ffff",
    //         roleName: "role1",
    //     }));
    //     scene.appendStep(new BackgroundStep({
    //         image: "res/art/texture/Scene/4.jpg"
    //     }));
    //
    //     scene.appendStep(new ConversationStep({
    //         text: "gggg",
    //         roleName: "role1",
    //     }));
    //     scene.appendStep(new BackgroundStep({
    //         image: "res/art/texture/Scene/1.jpg"
    //     }));
    //     scene.appendStep(new ConversationStep({
    //         text: "hhhh",
    //         roleName: "role1",
    //     }));
    //     return scene;
    // }

    public getTestDataList() {
        let data: Entity.DialogData[] = [
            {
                id: "1",
                gal: "1",
                chapter: "0001",
                scene: "0001",
                showName: "张三",
                content: "在CommonJS模块化中，模块是通过require函数加载的。require函数会返回已加载的模块对象。如果要在全局作用域中获取已加载的模块，可以使用以下方法：",
                roleDraws: {
                    // @ts-ignore
                    "1": [
                        /*资源*/"res/art/texture/Role/tmpiaj8g258_rmbg.png",
                        /*淡入时间*/"1",
                        /*移动时间*/"0",
                        /*缩放*/"1", "1",
                        /*颜色*/"1", "1", "1", "1",
                        /*预设效果*/"none",
                        /*移动位置x,y*/"0.2", "0.6"
                    ]
                },
                backGround: {
                    // @ts-ignore
                    "1": [
                        /*资源*/"res/art/texture/Scene/1.jpg",
                        /*层级*/"1",
                        /*移动时间*/"0",
                        /*缩放*/"1", "1",
                        /*颜色*/"1", "1", "1", "1",
                        /*移动位置x,y*/
                    ]
                },
                sound: {
                    // @ts-ignore
                    "1": [
                        /*资源*/"res/art/audio/bgm1.mp3",
                        /*速度*/"1",
                        /*类型*/"1",
                        /*音量*/"1",
                        /*是否循环*/"true",
                        /*延时*/"2",
                        /*声道*/"0"
                    ]
                },
                voice: {
                    // @ts-ignore
                    "1": [
                        /*资源*/"res/art/audio/1.mp3",
                        /*速度*/"1",
                        /*音量*/"1",
                        /*延时*/"2",
                        /*声道*/"0"
                    ]
                },
                showDelay: 0,
                skipType: 0,
                // @ts-ignore
                screenShake: [0, 0],
                notClear: false,
                // @ts-ignore
                VariableFormula: [],
                // @ts-ignore
                script: []
            },
            {
                id: "1",
                gal: "1",
                chapter: "0001",
                scene: "0001",
                showName: "张三",
                content: "在Node.js中，每个模块都有一个全局变量module，它代表当前模块的对象。该对象有一个属性exports，表示当前模块的输出。如果模块需要被其他模块引用，可以将需要暴露的内容赋值给module.exports。在其他模块中，可以使用require函数加载该模块，并获取其module.exports属性，即可获取其输出内容。",
                roleDraws: null,
                backGround: null,
                sound: {
                    // @ts-ignore
                    "2": [
                        /*资源*/"res/art/audio/bgm2.mp3",
                        /*速度*/"1",
                        /*类型*/"1",
                        /*音量*/"1",
                        /*是否循环*/"true",
                        /*延时*/"2",
                        /*声道*/"0"
                    ]
                },
                voice: {
                    // @ts-ignore
                    "1": [
                        /*资源*/"res/art/audio/2.mp3",
                        /*速度*/"1",
                        /*音量*/"1",
                        /*延时*/"2",
                        /*声道*/"0"
                    ]
                },
                showDelay: 0,
                skipType: 0,
                // @ts-ignore
                screenShake: [0, 0],
                notClear: false,
                // @ts-ignore
                VariableFormula: [],
                // @ts-ignore
                script: []
            },
            {
                id: "1",
                gal: "1",
                chapter: "0001",
                scene: "0001",
                showName: "李四",
                content: "例如，模块A需要暴露一个对象，可以这样写：",
                roleDraws: {
                    // @ts-ignore
                    "2": [
                        /*资源*/"res/art/texture/Role/tmppuwcgi5w_rmbg.png",
                        /*淡入时间*/"0.5",
                        /*移动时间*/"0",
                        /*缩放*/"1", "1",
                        /*颜色*/"1", "1", "1", "1",
                        /*预设效果*/"none",
                        /*移动位置x,y*/"0.8", "0.6"
                    ]
                },
                backGround: {
                    // @ts-ignore
                    "1": [
                        /*资源*/"res/art/texture/Scene/2.jpg",
                        /*层级*/"1",
                        /*移动时间*/"0",
                        /*缩放*/"1", "1",
                        /*颜色*/"1", "1", "1", "1",
                        /*移动位置x,y*/
                    ]
                },
                sound: {
                    // @ts-ignore
                    "1": null
                },
                voice: null,
                showDelay: 0,
                skipType: 0,
                // @ts-ignore
                screenShake: [0, 0],
                notClear: false,
                // @ts-ignore
                VariableFormula: [],
                // @ts-ignore
                script: []
            },
            {
                id: "1",
                gal: "1",
                chapter: "0001",
                scene: "0001",
                showName: "李四",
                content: "浏览器环境中没有Node.js中的module全局变量。但是，可以通过将模块的输出赋值给全局对象的属性，达到在全局作用域中获取模块的效果。例如，将模块A的输出赋值给全局对象的属性global.moduleA：",
                roleDraws: {
                    // @ts-ignore
                    "1": null
                },
                backGround: {
                    "1": null
                },
                sound: null,
                voice: null,
                showDelay: 0,
                skipType: 0,
                // @ts-ignore
                screenShake: [0, 0],
                notClear: false,
                // @ts-ignore
                VariableFormula: [],
                // @ts-ignore
                script: []
            },
            //-------------------------- 场景2 -------------------------------
            {
                id: "1",
                gal: "1",
                chapter: "0001",
                scene: "0002",
                showName: "李四",
                content: "场景2",
                roleDraws: {
                    // @ts-ignore
                    "1": [
                        /*资源*/"res/art/texture/Role/tmpqupmhw16_rmbg.png",
                        /*淡入时间*/"0.5",
                        /*移动时间*/"0",
                        /*缩放*/"1", "1",
                        /*颜色*/"1", "1", "1", "1",
                        /*预设效果*/"none",
                        /*移动位置x,y*/"0.3", "0.6"
                    ]
                },
                backGround: {
                    // @ts-ignore
                    "1": [
                        /*资源*/"res/art/texture/Scene/2.jpg",
                        /*层级*/"1",
                        /*移动时间*/"0",
                        /*缩放*/"1", "1",
                        /*颜色*/"1", "1", "1", "1",
                        /*移动位置x,y*/
                    ]
                },
                sound: {
                    // @ts-ignore
                    "1": null
                },
                voice: null,
                showDelay: 0,
                skipType: 0,
                // @ts-ignore
                screenShake: [0, 0],
                notClear: false,
                // @ts-ignore
                VariableFormula: [],
                // @ts-ignore
                script: []
            },
            {
                id: "1",
                gal: "1",
                chapter: "0001",
                scene: "0002",
                showName: "李四",
                content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                roleDraws: {
                    // @ts-ignore
                    "2": null
                },
                backGround: null,
                sound: null,
                voice: null,
                showDelay: 0,
                skipType: 0,
                // @ts-ignore
                screenShake: [0, 0],
                notClear: false,
                // @ts-ignore
                VariableFormula: [],
                // @ts-ignore
                script: []
            }
        ];
        return data;
    }
}