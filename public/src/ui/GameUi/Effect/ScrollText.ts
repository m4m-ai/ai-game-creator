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
import { FrameMgr } from "Tools/FrameMgr";

export type ScrollTextData = {
    text: string;
    /** 速度, 每秒出多少个字 */
    speed: number;
    label: m4m.framework.label;
    /** 完成回调 */
    finish?: () => void;
}

export class ScrollText {
    
    private data: ScrollTextData;
    private _start: boolean = false;
    private _currIndex: number = 0;
    private _timer: number = 0;
    private _finish: boolean = false;
    
    /** 是否完成 */
    public get isFinish() {
        return this._finish;
    }
    
    constructor(data: ScrollTextData) {
        this.data = data;
    }
    
    /** 开始执行 */
    public start() {
        if (this._start) {
            return;
        }
        this._start = true;
        this.data.label.text = "";
        FrameMgr.Add(this.update, this);
    }
    
    /** 跳过执行 */
    public skip() {
        if (!this._finish) {
            this._currIndex = this.data.text.length - 1;
            this.data.label.text = this.data.text;
            this.finish();
        }
    }
    
    private update(delta: number) {
        let t = 1 / this.data.speed;
        this._timer += delta;
        if (this._timer >= t) {
            this._timer %= t;
            if (this._currIndex >= this.data.text.length) { //到达最后一个了
                this.finish();
            } else {
                this._currIndex++;
                this.data.label.text = this.data.text.substring(0, this._currIndex);
            }
        }
    }
    
    
    private finish() {
        this._finish = true;
        FrameMgr.Remove(this.update, this);
        if (this.data.finish) {
            this.data.finish();
        }
    }
}