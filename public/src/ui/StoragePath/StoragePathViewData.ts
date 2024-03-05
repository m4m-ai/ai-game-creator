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
// /// <reference types="node" />
import { ViewBaseData } from "Data/ViewBaseData";
import { StoragePathView } from "./StoragePathView";
// import * as fs from 'fs';


export class StoragePathViewData implements ViewBaseData {
    public constructor() {
    }
    public filesList: Array<string> = ["file1", "file2", "file3", "file4", "file5", "file6", "file7", "file8"];
    public currentPath = "";
    public setCurrentPathFun(pathData) {
        // console.log("选中得路径数据", pathData);
        this.currentPath = pathData;
        StoragePathView.Instance.search_lab_text(pathData);
    }


    // public getAllDirectories(path: string): string[] {
    //     const files = fs.readdirSync(path);
    //     const directories = [];

    //     for (const file of files) {
    //         const fullPath = `${path}/${file}`;
    //         if (fs.statSync(fullPath).isDirectory()) {
    //             directories.push(file);
    //         }
    //     }

    //     return directories;
    // }

    public dispose() {
        for (let i = 0; i < this.filesList.length; i++) {
            if (this.filesList[i]) {
                this.filesList[i] = null;
            }
        }
        this.filesList.length = 0;
    }
}