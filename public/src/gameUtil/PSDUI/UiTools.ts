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
import { consTool } from "../Tools/consTool";
import { UiManager } from "./UiManager";

export class UiTools {

    public static cloneUi<T>(old: T): T {
        return this.cloneUiClass(old, true) as T;
    }
    private static cloneUiClass(old, isFirstTran, tranName = "", parentTran: m4m.framework.transform2D = null) {
        let newObj;
        if (old.uiName) {
            newObj = new consTool[old.uiName + UiManager.viewName]();
        } else {
            newObj = new Object();
        }
        if (isFirstTran && old["transform"]) {
            newObj["transform"] = old["transform"].clone();
        }
        if (!isFirstTran && parentTran) {
            for (let i = 0; i < parentTran.children.length; i++) {
                let tran = parentTran.children[i];
                if (tran.name == tranName) {
                    newObj["transform"] = tran;
                    break;
                }
            }
        }
        let proList = Object.getOwnPropertyNames(old);
        for (let index = 0; index < proList.length; index++) {
            let compName = proList[index];
            switch (compName) {
                case "transform":
                    break;
                case "image":
                    newObj["image"] = newObj["transform"].getComponent("image2D");
                    break;
                case "label":
                    newObj["label"] = newObj["transform"].getComponent("label");
                    break;
                case "button":
                    newObj["button"] = newObj["transform"].getComponent("button");
                    break;
                case "rawImage2D":
                    newObj["rawImage2D"] = newObj["transform"].getComponent("rawImage2D");
                    break;
                case "progressbar":
                    newObj["progressbar"] = newObj["transform"].getComponent("progressbar");
                    break;
                case "scrollRect":
                    newObj["scrollRect"] = newObj["transform"].getComponent("scrollRect");
                    break;
                case "inputField":
                    newObj["inputField"] = newObj["transform"].getComponent("inputField");
                    break;
                case "uiName":
                case "isShow":
                case "isInited":
                case "isLogUi":
                case "notHideOnOtherShow":
                case "noAffected":
                case "uiLayer":
                case "influenceSceneAction":
                    newObj[compName] = old[compName];
                    break;
                case "linkList":
                case "tranLinkList":
                case "onShow":
                case "onHide":
                case "parentTrans":
                case "onDispose":
                    break;
                default:
                    // console.error(compName);
                    // console.error(old);
                    if (typeof old[compName] == "function") {

                    } else {
                        newObj[compName] = this.cloneUiClass(old[compName], false, compName, newObj["transform"]);
                    }
            }
        }
        if (newObj.onInit) {
            newObj.onInit();
        }
        return newObj;

    }
}