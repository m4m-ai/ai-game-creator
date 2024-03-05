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
import { AudioManager } from "Audio/OriginCode/AudioManager"
import { GameUiView } from "../GameUiView"
import { CAudioChannel } from "Audio/OriginCode/CAudioChannel";

export class AudioPool {
    
    private view: GameUiView;
    private _map: Map<string, CAudioChannel> = new Map();
    public constructor(view: GameUiView) {
        this.view = view;
    }
    
    public handerAudoi(instId: string, resPath: string, volume: number, loop: boolean,x?:number,y?:number,z?:number) {
        let path = this.view.viewData.combinePath(resPath);
        let channel = this._map.get(instId);
        if (channel) { //停掉之前的音乐
            AudioManager.Instance.stopAudio(channel);
        }
        if (loop) {
            channel = AudioManager.Instance.playLoopAudio(path, volume,x,y,z);
        } else {
            channel = AudioManager.Instance.playChatAudio(path, volume,null,x,y,z);
        }
        this._map.set(instId, channel);
    }
    
    public stopAudio(instId: string) {
        let channel = this._map.get(instId);
        if (channel) {
            AudioManager.Instance.stopAudio(channel);
            this._map.delete(instId)
        }
    }

    public stopAllAudio() {
        this._map.forEach((value, key) => {
            AudioManager.Instance.stopAudio(value);
        });
        this._map.clear();
    }
}