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
import { FrameMgr } from "../Tools/FrameMgr";

export enum TimeLineDataType {
    /// <summary>
    /// 只是延时执行
    /// </summary>
    Delay,
    /// <summary>
    /// 延时执行, 并且固定间隔调用回调
    /// </summary>
    Interval,
    /// <summary>
    /// 下一帧调用
    /// </summary>
    NextFrame,
}

export enum TimeLineState {
    /// <summary>
    /// 准备阶段, 还没执行
    /// </summary>
    Ready,
    /// <summary>
    /// 执行中
    /// </summary>
    Run,
    /// <summary>
    /// 结束
    /// </summary>
    Over,
}

export class TimeLineData {
    type: TimeLineDataType;
    delayTime: number;
    finishCall: () => void;
    intervalTime: number;
    intervalCall: (time: number) => void;
}

export class TimeLine {

    public get TimeLineDatas() {
        return this._timeLineDatas;
    }
    public get State() {
        return this._state;
    }

    private _timeLineDatas: TimeLineData[] = [];
    private _state: TimeLineState = TimeLineState.Ready;

    private currIndex: number = 0;
    private currData: TimeLineData;
    private runTime: number = 0;
    private nextTickTime: number = 0;

    private intervalIndex = -1;

    private _runFunc: Function;

    public constructor() {
        this._runFunc = this.RunFunc.bind(this);
    }

    /// <summary>
    /// 开始执行
    /// </summary>
    public Start(): void {
        if (this._state == TimeLineState.Run) {
            console.error("TimeLine已经在运行了!");
            return;
        }
        if (this._timeLineDatas.length == 0) {
            this._state = TimeLineState.Over;
            return;
        }
        this._state = TimeLineState.Run;
        this.currIndex = 0;
        this.runTime = 0;
        this.intervalIndex = 0;
        this.nextTick();
        FrameMgr.Add(this._runFunc, this);
        // temp = RunFunc();
        // GlobalFunction.ManagerInstance.StartCoroutine(temp);
    }

    /// <summary>
    /// 添加时间节点, 时间单位: 秒
    /// </summary>
    /// <param name="delayTime">延时时间</param>
    /// <param name="finish">完成后回调函数</param>
    public AddTime(delayTime: number, finish: () => void): TimeLine {
        let data = new TimeLineData();
        data.type = TimeLineDataType.Delay;
        data.delayTime = delayTime;
        data.finishCall = finish;
        this._timeLineDatas.push(data);
        return this;
    }

    /// <summary>
    /// 添加时间节点, 并且每隔一段时间调用一次
    /// </summary>
    /// <param name="delayTime">延时时间</param>
    /// <param name="finish">完成后回调函数</param>
    /// <param name="intervalTime">回调间隔</param>
    /// <param name="intervalCall">回调间隔函数, 参数为已运行多少秒</param>
    public AddTimeAndFixedCall(delayTime: number, finish: () => void, intervalTime: number, intervalCall: (time: number) => void): TimeLine {
        let data = new TimeLineData();
        data.type = TimeLineDataType.Interval;
        data.delayTime = delayTime;
        data.finishCall = finish;
        data.intervalTime = intervalTime;
        data.intervalCall = intervalCall;
        this._timeLineDatas.push(data);
        return this;
    }

    /// <summary>
    /// 下一帧调用
    /// </summary>
    public NextFrame(finish: () => void): TimeLine {
        let data = new TimeLineData();
        data.type = TimeLineDataType.NextFrame;
        data.finishCall = finish;
        this._timeLineDatas.push(data);
        return this;
    }

    /// <summary>
    /// 清除所有时间节点
    /// </summary>
    public Clear() {
        if (this._state == TimeLineState.Run) {
            console.error("TimeLine正运行中!!!");
            return;
        }
        this._timeLineDatas.length = 0;
    }

    /// <summary>
    /// 立即停止执行
    /// </summary>
    public Stop() {
        if (this._state == TimeLineState.Run) {
            this._state = TimeLineState.Over;
            FrameMgr.Remove(this._runFunc, this);
        }
    }

    private RunFunc(delta: number) {
        if (this.runTime >= this.nextTickTime) {
            //调用结束
            if (this.currData.finishCall) {
                this.currData.finishCall();
            }
            //触发下一级
            this.nextTick();
        } else if (this.currData.type == TimeLineDataType.Interval) {
            //每隔一段时间调用
            let tempIndex = (this.runTime / this.currData.intervalTime) | 0;
            if (this.intervalIndex != tempIndex) {
                this.intervalIndex = tempIndex;
                this.currData.intervalCall(this.runTime);
            }
        }
        this.runTime += delta;
    }

    private nextTick() {
        if (this.currIndex >= this.TimeLineDatas.length) {
            //结束
            this.Stop();
            return;
        }
        this.runTime = 0;
        this.currData = this._timeLineDatas[this.currIndex];
        if (this.currData.type == TimeLineDataType.NextFrame) {
            this.nextTickTime = 0;
        } else {
            this.nextTickTime = this.currData.delayTime;
        }
        this.currIndex++;
    }
}