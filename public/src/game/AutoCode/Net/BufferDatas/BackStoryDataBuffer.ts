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


export class BackStoryDataBuffer{

    public static get Instance(): BackStoryDataBuffer {
        if (this._instance == null) {
            this._instance = new BackStoryDataBuffer();
        }

        return this._instance;
    }
    private static _instance: BackStoryDataBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["worldName"]=NetData.readString(br);
getData["backStory"]=NetData.readString(br);
getData["camps"]=NetData.readString(br);
getData["encapsulate"]=NetData.readString(br);
getData["projectId"]=NetData.readString(br);
getData["tableID"]=br.readULong();

          return getData;
    }
}