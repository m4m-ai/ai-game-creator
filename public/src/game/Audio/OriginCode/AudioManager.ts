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
import { CAudioEx } from "./audioex";
import { CAudioChannel } from "./CAudioChannel";
import { SoundManage } from "./SoundManage";

/**
 * 
 */
export class AudioManager {

    public static get Instance(): AudioManager {
        if (AudioManager._instance == null) {
            AudioManager._instance = new AudioManager();
        }
        return AudioManager._instance;
    }
    private static _instance: AudioManager;
    /**
    * 背景音乐路径
    */
    private curBgMusicUrl: string = "";
    private curSoundUrl: string = "";
    private audioChannelDic: Dictionary = new Dictionary();
    private musicChannelDic: Dictionary = new Dictionary();

    private musicAudioChannel: CAudioChannel;
    private chatAudioChannel: CAudioChannel;
    private audioAudioChannel: CAudioChannel;
    private _musicVolume: number = 1;
    private _chatVolume: number = 1;
    //整体音效大小 调整值
    private _audioVolume: number = 1;

    /**
   *  播放声音与特效开关：
   *  
   */
    private isPlay: boolean = true;

    //设定语音声音大小
    public setChatAudioVolume(volume: number) {
        this._chatVolume = volume;
        if (this.chatAudioChannel) {
            this.chatAudioChannel.volume = volume;
        }
    }
    //设定背景音乐大小
    public setMusicVolume(volume: number) {
        this._musicVolume = volume;
        if (volume <= 0) {
            this.stopBGMusic();
        } else {
            this.playBgMusic();
        }
        if (this.musicAudioChannel) {
            this.musicAudioChannel.volume = volume;
        }
    }

    //设置音效大小
    public setAudioVolume(volume: number) {
        this._audioVolume = volume;
        if (volume <= 0) {
            this.stopAllAudio();
        }
        if (this.audioAudioChannel) {
            this.audioAudioChannel.volume = volume;
        }
    }

    /**
     * 局部控制背景声音
     * @param posX 角色的世界坐标X值
     */
    public controlMusicVolume(posX: number) {
        if (posX > 19950) {
            let deviation = Math.abs((posX - 21550) / (23600 - 19500));
            let soundPer = (1 - deviation) * 0.9;
            if (posX > 21550) {
                soundPer = (soundPer + deviation * 0.2) * 0.6;
            }
            this.setMusicVolume(soundPer);
        }

    }

    /**
     * 背景音乐
     */
    public playBgMusic(musicPath?: string) {
        if (!musicPath) {
            if (this.musicAudioChannel && this.musicAudioChannel.isplay) {
                return;
            }
            // tslint:disable-next-line: no-parameter-reassignment
            musicPath = this.curBgMusicUrl;
        } else {
            if (musicPath == this.curBgMusicUrl) {
                return;
            }
            this.curBgMusicUrl = musicPath;
        }
        this.playMusic(musicPath);
    }

    /**
     * 播放聊天语音
     */
    public playChatAudio(soundPath: string, volume?:number,onended?: Function, x?: number, y?: number, z?: number, startTime?: number) {
        try {
            this.curSoundUrl = soundPath;
            this.stopChatAudio();
            // tslint:disable-next-line: newline-per-chained-call
            this.chatAudioChannel = CAudioEx.instance().createAudioChannel();
            SoundManage.Instance.playAudioInterrupt(soundPath, this.chatAudioChannel, volume, onended, x, y, z, startTime);
        } catch (error) {
            console.error(error.toString())
        }

        return this.chatAudioChannel;
    }

    //暂停聊天语音
    public pauseChatAudio() {
        this.chatAudioChannel.pause();
    }

    //继续播放聊天语音
    public resumeChatAudion() {
        this.chatAudioChannel = CAudioEx.instance().createAudioChannel(this.chatAudioChannel);
        this.chatAudioChannel.resume();
    }

    /**
     * 设置背景音乐
     */
    public setBGMusic(value: boolean) {
        if (value) {
            this.playBgMusic();
        } else {
            this.stopBGMusic();
        }
    }

    /**
     * 停止播放背景音乐
     */
    public stopBGMusic() {
        //CEngine.LogManager.Error("停止播放背景音乐");
        for (let i = 0; i < this.musicChannelDic.values.length; i++) {
            let value: CAudioChannel = this.musicChannelDic.values[i];
            SoundManage.Instance.stopAudio(value);
        }
        this.musicChannelDic.Clear();
        //this.curBgMusicUrl = "";
    }

    /**
     * 移除释放掉的MusicAudioChannel
     */
    public clearMusicChannelDic() {
        let list = new Array<string>();
        for (let i = 0; i < this.musicChannelDic.keys.length; i++) {
            let key: string = this.musicChannelDic.keys[i];
            let value: CAudioChannel = this.musicChannelDic.values[i];
            if (value.source == null) { list.push(key); }
        }
        for (let i = 0; i < list.length; i++) {
            this.musicChannelDic.Remove(list[i]);
        }
        list.length = 0;
    }

    /**
    * 移除释放掉的audio AudioChannel
    */
    public clearAudioChannelDic() {
        let list = new Array<string>();
        for (let i = 0; i < this.audioChannelDic.keys.length; i++) {
            let key: string = this.audioChannelDic.keys[i];
            let value: CAudioChannel = this.audioChannelDic.values[i];
            if (value.source == null) { list.push(key); }
        }
        for (let i = 0; i < list.length; i++) {
            this.audioChannelDic.Remove(list[i]);
        }
        list.length = 0;
    }

    /**
     * 停止播放聊天语音
     */
    public stopChatAudio() {
        SoundManage.Instance.stopAudio(this.chatAudioChannel);
    }

    /**
     * 停止播放音效
     */
    public stopAllAudio() {
        for (let i = 0; i < this.audioChannelDic.values.length; i++) {
            let value: CAudioChannel = this.audioChannelDic.values[i];
            SoundManage.Instance.stopAudio(value);
        }
        this.audioChannelDic.Clear();
    }

    /**
     * 停止某一个音效播放
     * @param name
     */

    public stopAudio(name: string)
    public stopAudio(channel: CAudioChannel)
    public stopAudio(data: string | CAudioChannel) {
        if (typeof data == "string") {
            for (let i = 0; i < this.audioChannelDic.values.length; i++) {
                let value: CAudioChannel = this.audioChannelDic.values[i];
                let key: string = this.audioChannelDic.keys[i];
                if (key.indexOf(data) != -1) {
                    SoundManage.Instance.stopAudio(value);
                    this.audioChannelDic.Remove(key);
                    break;
                }
            }
        } else {
            if (data == this.chatAudioChannel) {
                //暂时处理
            } else {
                let index = this.audioChannelDic.values.indexOf(data);
                if (index != -1) {
                    this.audioChannelDic.Remove(this.audioChannelDic.keys[index]);
                }
            }
            SoundManage.Instance.stopAudio(data);
        }
    }

    /**
     * 循环播放
     * @param path 声音资源路径
     */
    public playLoopAudio(path: string, volume: number = 1, x?: number, y?: number, z?: number): CAudioChannel {
        try {
            // tslint:disable-next-line: newline-per-chained-call
            this.audioAudioChannel = CAudioEx.instance().createAudioChannel();
            //存当前声音 音量默认大小
            this.audioAudioChannel.defVolume = volume;
            let volNum = this._audioVolume * volume;
            SoundManage.Instance.playAuidoLoop(path, this.audioAudioChannel, volNum, null, x, y, z);
            this.audioChannelDic.Add(path, this.audioAudioChannel);
        } catch (error) {
            console.error(error.toString())
        }
        return this.audioAudioChannel;
    }

    /**
     * 普通立即播放（不考虑之前的播放状态）
     * @param path 声音资源路径
     */
    public playAudio(path: string, volume: number = 1, onended?: Function, x?: number, y?: number, z?: number, startTime?: number): CAudioChannel {
        try {
            this.clearAudioChannelDic();
            // tslint:disable-next-line: newline-per-chained-call
            this.audioAudioChannel = CAudioEx.instance().createAudioChannel();
            //存当前声音 音量默认大小
            this.audioAudioChannel.defVolume = volume;
            let volNum = this._audioVolume * volume;
            SoundManage.Instance.playAudio(path, this.audioAudioChannel, volNum, onended, x, y, z, startTime);
            this.audioChannelDic.Add(path, this.audioAudioChannel);
        } catch (error) {
            console.error(error.toString())
        }
        return this.audioAudioChannel;
    }

    /**
     * 阻塞式播放（如果已经在播放，就忽略此次播放）
     * @param path 声音播放路径
     */
    public playAudioBlocking(path: string, volume: number = 1, onended?: Function, x?: number, y?: number, z?: number, startTime?: number): CAudioChannel {
        try {
            this.clearAudioChannelDic();
            // tslint:disable-next-line: newline-per-chained-call
            this.audioAudioChannel = CAudioEx.instance().createAudioChannel();
            //存当前声音 音量默认大小
            this.audioAudioChannel.defVolume = volume;
            let volNum = this._audioVolume * volume;
            SoundManage.Instance.playAudioBlocking(path, this.audioAudioChannel, volNum, onended, x, y, z, startTime);
            this.audioChannelDic.Add(path, this.audioAudioChannel);
        } catch (error) {
            console.error(error.toString())
        }
        return this.audioAudioChannel;
    }

    /**
     * 中断式播放（暂停之前的，重头开始播放）
     * @param path 声音资源路径
     */
    public playAudioInterrupt(path: string, volume: number = 1, onended?: Function, x?: number, y?: number, z?: number): CAudioChannel {
        try {
            this.clearAudioChannelDic();
            // tslint:disable-next-line: newline-per-chained-call
            this.audioAudioChannel = CAudioEx.instance().createAudioChannel();
            //存当前声音 音量默认大小
            this.audioAudioChannel.defVolume = volume;
            let volNum = this._audioVolume * volume;
            SoundManage.Instance.playAudioInterrupt(path, this.audioAudioChannel, volNum, onended, x, y, z);
            this.audioChannelDic.Add(path, this.audioAudioChannel);
        } catch (error) {
            console.error(error.toString())
        }
        return this.audioAudioChannel;
    }

    public dispose() {

    }

    /**
     * 长的背景音乐，固定循环播放
     * @param musicPath 声音播放路径
     */
    private playMusic(musicPath: string) {
        try {
            this.clearMusicChannelDic();
            if (this.musicChannelDic.ContainsKey(musicPath)) { return; }
            // tslint:disable-next-line: newline-per-chained-call
            this.musicAudioChannel = CAudioEx.instance().createAudioChannel();
            SoundManage.Instance.playAuidoLoop(musicPath, this.musicAudioChannel, this._musicVolume);
            this.musicChannelDic.Add(musicPath, this.musicAudioChannel);
        } catch (error) {
            console.error(error);
        }
    }

    //暂停声音
    public pauseAudio(path: string) {
        if (this.audioChannelDic.ContainsKey(path)) {
            let audioAudioChannel: CAudioChannel = this.audioChannelDic.GetValue(path);
            audioAudioChannel.pause();
        } else {
            console.error("暂停声音出错! " + path);
        }
    }

    //继续播放声音
    public resumeAudion(path: string) {
        if (this.audioChannelDic.ContainsKey(path)) {
            let audioAudioChannel: CAudioChannel = this.audioChannelDic.GetValue(path);
            audioAudioChannel = CAudioEx.instance().createAudioChannel(audioAudioChannel);
            audioAudioChannel.resume();
        } else {
            console.error("继续播放声音 出错! " + path);
        }
    }

    /**
     * 设置声音坐标
     * @param x 音源在3D空间中的播放位置
     * @param y 音源在3D空间中的播放位置
     * @param z 音源在3D空间中的播放位置
     */
    public setPosition(path: string, x: number, y: number, z: number) {
        if (this.audioChannelDic.ContainsKey(path)) {
            let audioAudioChannel: CAudioChannel = this.audioChannelDic.GetValue(path);
            audioAudioChannel.setPosition(x, y, z);
        } else {
            console.error("设置声音坐标 出错! " + path);
        }
    }
}