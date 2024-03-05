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
import { Dictionary } from "Data/Dictionary";
import { Loader } from "Loader/loader";
import { CAudioEx } from "./audioex";
import { CAudioChannel } from "./CAudioChannel";

export class SoundManage {
    public static get Instance(): SoundManage {
        if (SoundManage.instance == null) {
            SoundManage.instance = new SoundManage();
        }
        return SoundManage.instance;
    }
    private static instance: SoundManage;
    /**
     * 普通立即播放（不考虑之前的播放状态）
     * @param url
     * @param call
     * @param soundSourcePos  设定声源位置
     */
    public playAudio(url: string, audioChannel: CAudioChannel, volume: number, onended?: Function, x?: number, y?: number, z?: number, startTime?: number) {
        // tslint:disable-next-line: newline-per-chained-call
        if (!CAudioEx.instance().isAvailable()) {
            return;
        }
        if (audioChannel == null || audioChannel.source == null) { return; }
        this.getAudioBuffer(url, (audioName: string, buffer: AudioBuffer) => {
            audioChannel.play(buffer, volume, false, onended, x, y, z, startTime);
        });
    }
    /**
     * 中断式播放（暂停之前的，重头开始播放）
     * @param url
     * @param call
     * @param soundSourcePos设定声源位置
     */
    public playAudioInterrupt(url: string, audioChannel: CAudioChannel, volume: number, onended?: Function, x?: number, y?: number, z?: number, startTime?: number) {
        // tslint:disable-next-line: newline-per-chained-call
        if (!CAudioEx.instance().isAvailable()) {
            return;
        }
        if (audioChannel == null || audioChannel.source == null) { return; }
        this.getAudioBuffer(url, (audioName: string, buffer: AudioBuffer) => {
            audioChannel.play(buffer, volume, false, onended, x, y, z, startTime);
        });
    }
    /**
     * 阻塞式播放（如果已经在播放，就忽略此次播放）
     * @param url
     * @param call
     * @param soundSourcePos设定声源位置
     */
    public playAudioBlocking(url: string, audioChannel: CAudioChannel, volume: number, onended?: Function, x?: number, y?: number, z?: number, startTime?: number) {
        // tslint:disable-next-line: newline-per-chained-call
        if (!CAudioEx.instance().isAvailable()) {
            return;
        }
        if (audioChannel == null || audioChannel.source == null) { return; }
        if (audioChannel.isplay) { return; }
        this.getAudioBuffer(url, (audioName: string, buffer: AudioBuffer) => {
            audioChannel.play(buffer, volume, false, onended, x, y, z, startTime);
        });
    }
    /**
     * 长的背景音乐，固定循环播放
     * @param url
     */
    public playAuidoLoop(url: string, audioChannel: CAudioChannel, volume: number, onended?: Function, x?: number, y?: number, z?: number, startTime?: number): void {
        // tslint:disable-next-line: newline-per-chained-call
        if (!CAudioEx.instance().isAvailable()) {
            return;
        }
        if (url == null || url == "") { return; }
        if (audioChannel == null || audioChannel.source == null) { return; }
        this.getAudioBuffer(url, (audioName: string, buffe: AudioBuffer) => {
            audioChannel.play(buffe, volume, true, onended, x, y, z, startTime);
        });
    }
    //停止背景音乐播放
    public stopAudio(audioChannel: CAudioChannel) {
        // tslint:disable-next-line: newline-per-chained-call
        if (!CAudioEx.instance().isAvailable()) {
            return;
        }
        if (audioChannel == null) { return; }
        audioChannel.stop();
    }
    private getAudioBuffer(url: string, call: Function) {
        this.loadAudioFun(url, call);
    }

    //加载音频资源
    public loadAudioFun(url: string, call: Function) {
        if (url == null || url == "") {
            console.error("加载音频出错! 传入的路径不正确");
            return;
        }
        let lastIndex = url.lastIndexOf("/") + 1;
        let audioName = SoundManage.Substring(url, lastIndex);

        // tslint:disable-next-line: newline-per-chained-call
        CAudioEx.instance().loadAudioBuffer(url, (buf: AudioBuffer, loader: Loader) => {
            //LogManager.Error("加载声音完毕");
            call(audioName, buf);
        });
    }
    //因TS的 substring 和C#的Substring 方法 不同  这里写的一个C#  Substring方法相同用法
    public static Substring(str: string, start: number, length: number = 0): string {
        if (length == 0) {
            return str.substring(start);
        }
        return str.substring(start, start + length);
    }
}