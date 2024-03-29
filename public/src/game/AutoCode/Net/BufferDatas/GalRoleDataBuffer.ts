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


export class GalRoleDataBuffer{

    public static get Instance(): GalRoleDataBuffer {
        if (this._instance == null) {
            this._instance = new GalRoleDataBuffer();
        }

        return this._instance;
    }
    private static _instance: GalRoleDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["RoleName"]=NetData.readString(br);
getData["Gender"]=NetData.readString(br);
getData["RoleDefinition"]=NetData.readString(br);
getData["Appearance"]=NetData.readString(br);
getData["Profile"]=NetData.readString(br);
getData["exitScene"]=NetData.readString(br);
len=br.readInt32();
let roleDrawingDic = {};
for (let i = 0; i < len; i++){
let roleDrawingDicKey=NetData.readString(br);
roleDrawingDic[roleDrawingDicKey]=NetData.readString(br);
}
getData["roleDrawing"]=roleDrawingDic;getData["voiceID"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}