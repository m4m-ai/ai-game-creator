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
import { NetData } from "../../../Net/NetData";


export class GalDataBuffer{

    public static get Instance(): GalDataBuffer {
        if (this._instance == null) {
            this._instance = new GalDataBuffer();
        }

        return this._instance;
    }
    private static _instance: GalDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["projectId"]=NetData.readString(br);
getData["schedule"]=br.readInt32();
getData["galName"]=NetData.readString(br);
getData["backStory"]=NetData.readString(br);
getData["storyOutLine"]=NetData.readString(br);
getData["artStyle"]=NetData.readString(br);
len=br.readInt32();
let BackGroundsDic = {};
for (let i = 0; i < len; i++){
let BackGroundsDicKey=NetData.readString(br);
BackGroundsDic[BackGroundsDicKey]=NetData.readString(br);
}
getData["BackGrounds"]=BackGroundsDic;len=br.readInt32();
let rolesDic = {};
for (let i = 0; i < len; i++){
let rolesDicKey=NetData.readString(br);
rolesDic[rolesDicKey]=NetData.readString(br);
}
getData["roles"]=rolesDic;len=br.readInt32();
let chaptersList = [];
for (let i = 0; i < len; i++){
chaptersList.push(NetData.readString(br));
}
getData["chapters"]=chaptersList;len=br.readInt32();
let chapterScenesDic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let chapterScenesList = [];
let chapterScenesDicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
chapterScenesList.push(NetData.readString(br));
}
chapterScenesDic[chapterScenesDicKey]=chapterScenesList;
}
getData["chapterScenes"]=chapterScenesDic;len=br.readInt32();
let chaptersNameList = [];
for (let i = 0; i < len; i++){
chaptersNameList.push(NetData.readString(br));
}
getData["chaptersName"]=chaptersNameList;len=br.readInt32();
let chapterScenesNameDic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let chapterScenesNameList = [];
let chapterScenesNameDicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
chapterScenesNameList.push(NetData.readString(br));
}
chapterScenesNameDic[chapterScenesNameDicKey]=chapterScenesNameList;
}
getData["chapterScenesName"]=chapterScenesNameDic;getData["tableID"]=br.readULong();

          return getData;
    }
}