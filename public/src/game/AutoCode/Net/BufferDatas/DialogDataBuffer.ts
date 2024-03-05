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


export class DialogDataBuffer{

    public static get Instance(): DialogDataBuffer {
        if (this._instance == null) {
            this._instance = new DialogDataBuffer();
        }

        return this._instance;
    }
    private static _instance: DialogDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["gal"]=NetData.readString(br);
getData["chapter"]=NetData.readString(br);
getData["scene"]=NetData.readString(br);
getData["roleId"]=NetData.readString(br);
getData["showName"]=NetData.readString(br);
getData["content"]=NetData.readString(br);
getData["emote"]=NetData.readString(br);
len=br.readInt32();
let roleDrawsDic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let roleDrawsList = [];
let roleDrawsDicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
roleDrawsList.push(NetData.readString(br));
}
roleDrawsDic[roleDrawsDicKey]=roleDrawsList;
}
getData["roleDraws"]=roleDrawsDic;len=br.readInt32();
let backGroundDic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let backGroundList = [];
let backGroundDicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
backGroundList.push(NetData.readString(br));
}
backGroundDic[backGroundDicKey]=backGroundList;
}
getData["backGround"]=backGroundDic;len=br.readInt32();
let soundDic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let soundList = [];
let soundDicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
soundList.push(NetData.readString(br));
}
soundDic[soundDicKey]=soundList;
}
getData["sound"]=soundDic;len=br.readInt32();
let voiceDic = {};
for (let i = 0; i < len; i++){
let len2=br.readInt32();
let voiceList = [];
let voiceDicKey=NetData.readString(br);
for (let j = 0; j < len2; j++){
voiceList.push(NetData.readString(br));
}
voiceDic[voiceDicKey]=voiceList;
}
getData["voice"]=voiceDic;getData["showDelay"]=br.readSingle();
getData["skipType"]=br.readByte();
len=br.readInt32();
let screenShakeList = [];
for (let i = 0; i < len; i++){
screenShakeList.push(br.readSingle());
}
getData["screenShake"]=screenShakeList;getData["notClear"]=br.readBoolean();
len=br.readInt32();
let VariableFormulaList = [];
for (let i = 0; i < len; i++){
VariableFormulaList.push(NetData.readString(br));
}
getData["VariableFormula"]=VariableFormulaList;len=br.readInt32();
let scriptList = [];
for (let i = 0; i < len; i++){
scriptList.push(NetData.readString(br));
}
getData["script"]=scriptList;getData["tableID"]=br.readULong();

          return getData;
    }
}