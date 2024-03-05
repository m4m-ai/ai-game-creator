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
import { CommonUIUtils } from "Data/CommonUIUtils";
import { UiNode } from "Data/GridExtend/GridExtend";
import { StepTranslateData } from "Data/Process/StepTranslateData";
import { commTool } from "Tools/commTool";
import { FrameMgr } from "Tools/FrameMgr";
import { GameUiView } from "../GameUiView";
import { AnimationSegment } from "./AnimationSegment";
import {UiNodePool} from "./UiNodePool";

export class UiImageNodePool<T extends (UiNode & { rawImage2D: m4m.framework.rawImage2D })> extends UiNodePool<T> {
    
    private view: GameUiView;
    private _animationSegment: AnimationSegment;
    
    public constructor(view: GameUiView, template: T) {
        super(template);
        this.view = view;
        FrameMgr.Add(this.update, this);
    }
    
    public handlerData(instId: string, resPath: string, fadeInOutTime: number, isFadeIn: boolean, stepData: StepTranslateData, callBack: (uiNode: m4m.framework.rawImage2D) => void = null) {
        let uiNode = this.getUiNode(instId);
        let trans = uiNode.transform;
        //临时处理
        //trans.visible = true;
        
        if ((fadeInOutTime != null && fadeInOutTime > 0) || stepData.movePositions.length > 0) {
            this._animationSegment = new AnimationSegment(trans);
            if (fadeInOutTime != null && fadeInOutTime > 0) {
                let fromColor = isFadeIn ? 0 : 1;
                let toColor = isFadeIn ? 1 : 0;
                this._animationSegment.setFragment({
                    inst: uiNode.rawImage2D,
                    field: "color",
                    from: new m4m.math.color(stepData.r, stepData.g, stepData.b, fromColor),
                    to: new m4m.math.color(stepData.r, stepData.g, stepData.b, toColor),
                    time: fadeInOutTime,
                    valueType: "color"
                });
            }
            if (stepData.movePositions.length > 0) {
                
            }

            this._animationSegment.start(null);
        }
        if (fadeInOutTime != null && fadeInOutTime > 0) {
            
        } else {
            if (uiNode.rawImage2D) {
                uiNode.rawImage2D.color = new m4m.math.color(stepData.r, stepData.g, stepData.b, stepData.a);
            }
        }
        if (uiNode.rawImage2D && resPath) {
            // CommonUIUtils.setTextureFun(uiNode.rawImage2D, this.view.viewData.combinePath(resPath));
            //let imageUrl=this.view.viewData.combinePath(resPath);
            trans.visible = false;
            commTool.loaderTextureFun(resPath, (_tex) => {
                if (uiNode.rawImage2D && uiNode.rawImage2D.transform) {
                    // console.error(imageUrl+"  加载完成");
                    uiNode.rawImage2D.image = _tex;
                    uiNode.rawImage2D.transform.markDirty();
                    if(callBack)
                    {
                        callBack(uiNode.rawImage2D);
                    }
                }
                trans.visible = true;
            });
        }
        
        if (stepData.movePositions.length > 0) {
            let pos = stepData.movePositions[0];
            this.view.setTransformData(trans,pos.x, pos.y, stepData.scaleX, stepData.scaleY, stepData.anchorX, stepData.anchorY);
        } else {
            this.view.setTransformData(trans, null, null, stepData.scaleX, stepData.scaleY, stepData.anchorX, stepData.anchorY);
        }
    }
    
    public recycleAllUiNode() {
        super.recycleAllUiNode();
        
    }
    
    public recycleUiNode(id: string) {
        super.recycleUiNode(id);
        
    }

    public update(delta: number) {
        
    }
    
    public isRunFinish(): boolean {
        return this._animationSegment == null ? true : this._animationSegment.isFinish();
    }
    
    public skip() {
        if (this._animationSegment) {
            this._animationSegment.runFinish();
            this._animationSegment = null;
        }
    }
}