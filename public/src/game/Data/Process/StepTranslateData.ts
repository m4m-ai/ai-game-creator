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
export interface StepTranslateData {
    /** 移动时间 */
    moveTime?: number;
    /** 锚点x */
    anchorX?: number;
    /** 锚点y */
    anchorY?: number;
    /** x缩放 */
    scaleX?: number;
    /** y缩放 */
    scaleY?: number;
    //颜色
    r?: number;
    g?: number;
    b?: number;
    a?: number;
    /** 经过的位置, x和y均为百分比 */
    movePositions?: m4m.math.vector2[];
}