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
import { ViewBaseData } from "Data/ViewBaseData";

export class PanelBodyViewData implements ViewBaseData {
    public constructor() {
    }
    public gridList: Array<string> = ["game1", "game2", "game3", "game4", "game5", ""];
    public setGridListFun() {
    }
    public artStyleList: Array<string> = new Array<string>();
    public setArtStyleList() {
        if (this.artStyleList) {
            for (let i = 0; i < this.artStyleList.length; i++) {
                if (this.artStyleList[i]) {
                    this.artStyleList[i] = null;
                }
            }
            this.artStyleList.length = 0;
        } else {
            this.artStyleList = new Array<string>();
        }
        for (let i = 0; i < 5; i++) {
            let str: string = "美术风格" + i;
            this.artStyleList.push(str);
        }
    }
    public filesList: Array<string> = ["file1", "file2", "file3", "file4", "file5", "file6"];
    
    public dispose() {

    }
}