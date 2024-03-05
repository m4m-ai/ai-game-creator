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
export enum CalcType {
    byOffset,
    byLayout,
}

@m4m.reflect.node2DComponent
export class ScrollRectExtend extends m4m.framework.behaviour2d {
    public scrollRect: m4m.framework.scrollRect;
    public calcType: CalcType = CalcType.byOffset;
    public offsetUpY: number = 0;
    public offsetDownY: number = 0;
    // public layoutX: m4m.framework.layoutOption;
    // public layoutY: m4m.framework.layoutOption;
    private _list: any[];
    private worldPos: m4m.math.vector2;
    private worldEndPos: m4m.math.vector2;
    public onPlay() {
        //
        this.scrollRect = this.transform.getComponent("scrollRect") as m4m.framework.scrollRect;
        if (this.scrollRect == null) {
            console.error("当前scrollRect 组件未找到！");
            return;
        }
        if ((this.scrollRect as any).movementType != null) {
            (this.scrollRect as any).movementType = 1;
        }
        this.scrollRect.onMoveFun = this.onMoveFun.bind(this);
        this.upDateTrans();
    }

    public setList(list: any[]) {
        this._list = list;
    }

    public upDateTrans() {
        this.onMoveFun();
    }

    private updatePosData() {
        this.worldPos = this.transform.getWorldTranslate();
        if (this.scrollRect != null) {
            if (this.scrollRect.horizontal && this.scrollRect.vertical) {
                this.worldEndPos = new m4m.math.vector2(this.worldPos.x + this.transform.width, this.worldPos.y + this.transform.height);
            } else {
                if (this.scrollRect.horizontal) {//水平
                    this.worldEndPos = new m4m.math.vector2(this.worldPos.x + this.transform.width, this.worldPos.y);
                } else {
                    this.worldEndPos = new m4m.math.vector2(this.worldPos.x, this.worldPos.y + this.transform.height);
                }
            }
        }
    }
    // tslint:disable-next-line: cyclomatic-complexity
    private onMoveFun() {
        if (!this.scrollRect) { return; }
        this.updatePosData();
        // console.error("滑动 " + x + "   " + y);
        if (this._list != null && this.worldPos) {
            for (let i = 0; i < this._list.length; i++) {
                let cell = this._list[i];
                if (cell.visibleFlag != undefined && cell.visibleFlag == false) {
                    continue;
                }
                let cellTrans: m4m.framework.transform2D = cell.transform;
                let cellPos: m4m.math.vector2 = cellTrans.getWorldTranslate();
                if (this.calcType == CalcType.byOffset) {
                    if (this.scrollRect != null) {
                        if (this.scrollRect.horizontal) {//水平
                            if ((cellPos.x + this.offsetUpY) > this.worldPos.x && (cellPos.x - this.offsetDownY) < this.worldEndPos.x) {
                                cellTrans.visible = true;
                            } else {
                                cellTrans.visible = false;
                            }
                        } else {
                            if ((cellPos.y + this.offsetUpY) > this.worldPos.y && (cellPos.y - this.offsetDownY) < this.worldEndPos.y) {
                                cellTrans.visible = true;
                            } else {
                                cellTrans.visible = false;
                            }
                        }
                    }
                } else if (this.calcType == CalcType.byLayout) {
                    let flag1 = false;
                    let flag2 = false;
                    if (this.scrollRect != null) {
                        if (this.scrollRect.horizontal) {//水平
                            if ((cellPos.x + cellTrans.width) > this.worldPos.x && (cellPos.x - cellTrans.width) < this.worldEndPos.x) {
                                flag1 = true;
                            }
                        } else {
                            flag1 = true;
                        }
                        if (this.scrollRect.vertical) {//垂直
                            if ((cellPos.y + cellTrans.height) > this.worldPos.y && (cellPos.y - cellTrans.height) < this.worldEndPos.y) {
                                flag2 = true;
                            }
                        } else {
                            flag2 = true;
                        }
                        cellTrans.visible = flag1 && flag2;
                    }
                }
            }
        }
    }
}