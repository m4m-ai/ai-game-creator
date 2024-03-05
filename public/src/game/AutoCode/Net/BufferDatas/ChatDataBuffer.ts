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


export class ChatDataBuffer{

    public static get Instance(): ChatDataBuffer {
        if (this._instance == null) {
            this._instance = new ChatDataBuffer();
        }

        return this._instance;
    }
    private static _instance: ChatDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["idString"]=NetData.readString(br);
getData["title"]=NetData.readString(br);
getData["content"]=NetData.readString(br);
len=br.readInt32();
let imagesDic = {};
for (let i = 0; i < len; i++){
let imagesDicKey=NetData.readString(br);
imagesDic[imagesDicKey]=NetData.readString(br);
}
getData["images"]=imagesDic;len=br.readInt32();
let soundsDic = {};
for (let i = 0; i < len; i++){
let soundsDicKey=NetData.readString(br);
soundsDic[soundsDicKey]=NetData.readString(br);
}
getData["sounds"]=soundsDic;len=br.readInt32();
let buttonsDic = {};
for (let i = 0; i < len; i++){
let buttonsDicKey=NetData.readString(br);
buttonsDic[buttonsDicKey]=br.readInt32();
}
getData["buttons"]=buttonsDic;getData["tableID"]=br.readULong();

          return getData;
    }
}