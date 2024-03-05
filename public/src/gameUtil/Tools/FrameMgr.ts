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
import { Dictionary } from "../Data/Dictionary";

//帧回调 管理器
@m4m.reflect.userCode
export class FrameMgr implements m4m.framework.IUserCode {
    private static funDic = new Dictionary();
    private static removeDic = new Dictionary();
    private static nextFrameCallList: Function[] = [];

    private static funList: Function[] = [];
    private static removeList: Function[] = [];

    public static Add(callback: Function, thisObj) {

        if (!callback || !thisObj) { return; }
        this.funDic.Add(callback, thisObj);
        // if(this.funDic.values.indexOf(thisObj) == -1){
        // }
    }

    public static Remove(callback: Function, thisObj) {
        if (!callback || !thisObj) { return; }
        if (this.funDic.values.indexOf(thisObj) != -1 && this.funDic.keys.indexOf(callback) != -1) {
            this.removeDic.Add(callback, thisObj);
        }
    }

    private idxs = [];
    public onUpdate(delta: number) //在入口中直接被掉用
    {
        let callList = [...FrameMgr.nextFrameCallList];
        FrameMgr.nextFrameCallList.length = 0;
        //调用 NextFrame
        for (let cb of callList) {
            cb(delta);
        }

        //刪除
        let rvalues = FrameMgr.removeDic.values;
        let relen: number = FrameMgr.removeDic.count;
        for (let i = 0; i < relen; i++) {
            let val = rvalues[i];
            this.idxs.length = 0;
            FrameMgr.funDic.values.forEach((temp, _i) => {
                if (temp && temp == val) { this.idxs.push(_i); }
            });
            this.idxs.forEach((idx) => {
                let k = FrameMgr.funDic.keys[idx];
                if (idx != -1 && k && k == FrameMgr.removeDic.keys[i]) {
                    FrameMgr.funDic.keys.splice(idx, 1);
                    FrameMgr.funDic.values.splice(idx, 1);
                }
            });
        }
        if (relen > 0) {
            FrameMgr.removeDic.Clear();
        }

        //更新
        let len: number = FrameMgr.funDic.count;
        let fkeys = FrameMgr.funDic.keys;
        for (let i = 0; i < len; i++) {
            let key = fkeys[i];
            let value = FrameMgr.funDic.GetValue(key);
            let tfname = (key as Function).name;

            if (value) {
                (key as Function).call(value, delta);
            }
        }
    }

    /**
     * 下一帧开始时调用, 只调用一次
     * @param cb 调用函数
     */
    public static nextFrameCall(cb: Function) {
        this.nextFrameCallList.push(cb);
    }

    public onStart(app: m4m.framework.application) {

    }

    public isClosed(): boolean {
        return false;
    }

}
