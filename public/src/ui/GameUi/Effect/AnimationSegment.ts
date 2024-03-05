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

export interface FragmentData<T> {
    inst: T,
    field: keyof T,
    valueType: "number" | "vector2" | "vector3" | "color"
    from: any,
    to: any,
    time: number,
}

export class AnimationSegment {

    private _isBindUpdate: boolean = false;
    private _isFinish: boolean = false;
    private _fragmentList: { fragment: FragmentData<any>, isFinish: boolean }[] = [];
    private _time: number = 0;
    private _finish: () => void;
    private _bindTrans: m4m.framework.transform2D | m4m.framework.transform;

    public constructor(bindTrans: m4m.framework.transform2D | m4m.framework.transform) {
        this._bindTrans = bindTrans;
    }
    
    public setFragment<T>(param: FragmentData<T>) {
        this._fragmentList.push({
            fragment: param,
            isFinish: false
        });
    }
    
    public start(finish: () => void) {
        if (this._isBindUpdate) {
            return;
        }
        this._isBindUpdate = true;
        this._isFinish = false;
        this._time = 0;
        this._finish = finish;
        for (let item of this._fragmentList) {
            item.isFinish = false;
            this.setProgress(item.fragment, 0);
        }
        FrameMgr.Add(this.update, this);
    }
    
    public runFinish() {
        if (this._isFinish) {
            return;
        }
        this._isFinish = true;
        for (let item of this._fragmentList) {
            if (!item.isFinish) {
                item.isFinish = true;
                this.setProgress(item.fragment, 1);
            }
        }
        if (this._bindTrans) {
            this._bindTrans.markDirty();
        }
        FrameMgr.Remove(this.update, this);
        this._isBindUpdate = false;
        
        if (this._finish) {
            let func = this._finish;
            this._finish = null;
            func();
        }
    }
    
    public isFinish() {
        for (let item of this._fragmentList) {
            if (!item.isFinish) {
                return false;
            }
        }
        return true;
    }
    
    private setProgress(fragment: FragmentData<any>, value: number) {
        if (value < 0) {
            value = 0;
        } else if (value > 1) {
            value = 1;
        }

        switch (fragment.valueType) {
            case "number": {
                fragment.inst[fragment.field] = this.lerp(fragment.from, fragment.to, value);
            }
                break;
            case "vector2": {
                fragment.inst[fragment.field] = new m4m.math.vector2(
                    this.lerp(fragment.from.x, fragment.to.x, value),
                    this.lerp(fragment.from.y, fragment.to.y, value)
                );
            }
                break;
            case "vector3": {
                fragment.inst[fragment.field] = new m4m.math.vector3(
                    this.lerp(fragment.from.x, fragment.to.x, value),
                    this.lerp(fragment.from.y, fragment.to.y, value),
                    this.lerp(fragment.from.z, fragment.to.z, value)
                );
            }
                break;
            case "color": {
                fragment.inst[fragment.field] = new m4m.math.color(
                    this.lerp(fragment.from.r, fragment.to.r, value),
                    this.lerp(fragment.from.g, fragment.to.g, value),
                    this.lerp(fragment.from.b, fragment.to.b, value),
                    this.lerp(fragment.from.a, fragment.to.a, value)
                );
            }
                break;
        }
    }
    
    private update(delta: number) {
        this._time += delta;
        if (this.isFinish()) {
            this.runFinish();
        } else {
            for (let item of this._fragmentList) {
                if (!item.isFinish) {
                    let value = this._time / item.fragment.time;
                    item.isFinish = value >= 1;
                    this.setProgress(item.fragment, value);
                }
            }
            if (this._bindTrans) {
                this._bindTrans.markDirty();
            }
        }
    }
    
    private lerp(from: number, to: number, weight: number) {
        if (from == to) {
            return from;
        }
        return (weight - from) / (to - from);
    }
}