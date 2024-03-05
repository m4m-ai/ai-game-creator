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

/**
 * UI 事件 全屏蔽 组件
 */
@m4m.reflect.node2DComponent
// tslint:disable-next-line: class-name
export class uiEventDiscard extends m4m.framework.behaviour2d implements m4m.framework.I2DPointListener {
    public onPointEvent(canvas: m4m.framework.canvas, ev: m4m.framework.PointEvent, oncap: boolean) {
        if (oncap) { return; }
        ev.eated = true;
    }
}