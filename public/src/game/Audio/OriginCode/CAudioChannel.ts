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
export class CAudioChannel {
    private static _id: number = 0;
    public source: AudioBufferSourceNode;
    public gainNode: GainNode;
    //设置音源在三维空间中的位置
    public pannerNode: PannerNode;

    private buffer: AudioBuffer;
    private beLoop: boolean;
    private onended: Function;
    private x: number;
    private y: number;
    private z: number;

    public audioContextCurrentTime: number = 0;

    /**当前声音 音量默认大小 (与整体声音调整区分开)
     */
    public defVolume: number = 1;
    /**
    * @public
    * @language zh_CN
    * @classdesc
    * 获取音量大小
    */
    get volume(): number {
        return this.gainNode ? this.gainNode.gain.value : 0;
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 设置音量大小
     * @param value 音量值
     */
    set volume(val: number)//-1~1
    {
        // tslint:disable-next-line: no-parameter-reassignment
        val = val > 1 ? 1 : val;
        // tslint:disable-next-line: no-parameter-reassignment
        val = val <= 0 ? 0 : val;
        if (this.gainNode) {
            this.gainNode.gain.value = val;
        }
    }
    /**
     * 是否播放中
     */
    public isplay: boolean;
    public id: number = 0;
    constructor() {
        this.id = CAudioChannel._id++;
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 播放声音
     * @param x 音源在3D空间中的播放位置
     * @param y 音源在3D空间中的播放位置
     * @param z 音源在3D空间中的播放位置
     */
    public play(buffer: AudioBuffer, volume: number = 0, beLoop: boolean, onended?: Function, x?: number, y?: number, z?: number, startTime?: number) {
        if (this.source == null) {
            // console.error("播放声音出错 source 为空");
            return;
        }
        if(volume==null)
        {
            volume=1;
        }
        this.buffer = buffer;
        this.volume = volume;
        this.beLoop = beLoop;
        this.onended = onended;
        this.x = x;
        this.y = y;
        this.z = z;

        this.source.loop = beLoop;
        this.source.buffer = buffer;
        if (startTime != null) {
            this.pausePlayCurrTime = startTime;
        }
        // console.error("从第几秒开始播声音 " + this.pausePlayCurrTime);
        this.source.start(0, this.pausePlayCurrTime);

        this.setPosition(x, y, z);

        this.isplay = true;
        if (!beLoop) {
            this.source.onended = () => {
                this.isplay = false;
                this.source = null;
                // console.error("结束@@");
                if (onended != undefined) {
                    onended(this.id);
                }
            };
        }
    }

    /**
     * 当前声音播放的时间 (秒)
     */
    public get playTime() {
        if (!this.source) return 0;
        return this.source.context.currentTime - this.audioContextCurrentTime + this.pausePlayCurrTime;
    }

    /**
     * 当前声音总时长 (秒)
     */
    public get totalTime() {
        return this.buffer.duration;
    }

    private _stop() {
        if (this.source != null) {
            // console.error("调用了Stop");
            if (this.isplay) {
                this.source.stop();
            }
            this.source = null;
        }
        if (this.gainNode != null) {
            this.gainNode = null;
        }
        this.isplay = false;
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 停止播放声音
     */
    public stop() {
        this._stop();
    }

    public ispaused: boolean = false;
    //暂停声音时 声音已播放的时长（秒）
    private pausePlayCurrTime: number = 0;
    //暂停
    public pause() {
        if (!this.source || this.ispaused) return;

        this.pausePlayCurrTime += this.source.context.currentTime - this.audioContextCurrentTime;
        // console.error("当前声音已播放 " + this.pausePlayCurrTime);

        this.ispaused = true;

        this._stop();
    }

    //暂停的声音 继续播放
    public resume() {
        if (!this.ispaused) return;

        // console.error("继续播放声音");
        this.ispaused = false;
        this.play(this.buffer, this.volume, this.beLoop, this.onended, this.x, this.y, this.z);
    }

    /**
     * 
     * 播放声音
     * @param x 音源在3D空间中的播放位置
     * @param y 音源在3D空间中的播放位置
     * @param z 音源在3D空间中的播放位置
     */
    public setPosition(x?: number, y?: number, z?: number) {
        if (x != null) {
            this.pannerNode.positionX.value = x;
        }
        if (y != null) {
            this.pannerNode.positionY.value = y;
        }
        if (z != null) {
            this.pannerNode.positionZ.value = z;
        }
        // console.error(x,y,z);

        // //音源运动  后续有需求再来加上
        // // 使用 linearRampToValueAtTime() 实现平滑过渡
        // pannerNode.positionX.linearRampToValueAtTime(
        //     startPoint.x + (endPoint.x - startPoint.x) * progress,
        //     time
        // );
    }
}
