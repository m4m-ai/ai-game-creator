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

export class EmoteManager {

    public static Instance = new EmoteManager();

    private constructor() {
        this._map.set("微笑", "Emote/13.png");
        this._map.set("难过", "Emote/14.png");
        this._map.set("开心", "Emote/15.png");
        this._map.set("生气", "Emote/16.png");
        this._map.set("心虚", "Emote/17.png");
        this._map.set("不安", "Emote/35.png");
        this._map.set("普通", "Emote/35.png");
        this._map.set("疑惑", "Emote/29.png");
        this._map.set("尴尬", "Emote/26.png");
        this._map.set("高兴", "Emote/15.png");
        this._map.set("非常高兴", "Emote/15.png");
        this._map.set("恐慌", "Emote/31.png");
        this._map.set("警惕", "Emote/28.png");
        this._map.set("认真", "Emote/25.png");
        this._map.set("痛苦", "Emote/18.png");
        this._map.set("哭泣", "Emote/20.png");
        this._map.set("犹豫", "Emote/29.png");
        this._map.set("害羞", "Emote/26.png");
        this._map.set("好奇", "Emote/37.png");
        this._map.set("兴奋", "Emote/15.png");
        this._map.set("不满", "Emote/16.png");
    }

    private _map: Map<string, string> = new Map();

    public getEmotePath(emoteStr: string) {
        return this._map.get(emoteStr);
    }
}