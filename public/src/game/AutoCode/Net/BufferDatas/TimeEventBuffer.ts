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


export class TimeEventBuffer{

    public static get Instance(): TimeEventBuffer {
        if (this._instance == null) {
            this._instance = new TimeEventBuffer();
        }

        return this._instance;
    }
    private static _instance: TimeEventBuffer;
    public readArrayBuffer(br: m4m.io.binTool){
          let getData={};
          let isNull=br.readBoolean();
          if(isNull){
              return null;
          }
          let len=0;
getData["id"]=NetData.readString(br);
getData["eventName"]=NetData.readString(br);
getData["taskstartTime"]=br.readULong();
getData["taskEndTime"]=br.readULong();
getData["lastStartTime"]=br.readULong();
getData["lastEndTime"]=br.readULong();
getData["serverTimeZone"]=br.readInt32();
getData["LoopCount"]=br.readInt32();
getData["LoopTimers"]=br.readInt32();
getData["isFristNoCD"]=br.readBoolean();
getData["taskLoopTime"]=br.readULong();
getData["timeType"]=br.readByte();
getData["startTime"]=br.readULong();
getData["startLimitTime"]=br.readULong();
getData["predecessorTaskID"]=NetData.readString(br);
getData["taskEventString"]=NetData.readString(br);
getData["taskEventLog"]=NetData.readString(br);
getData["taskState"]=br.readInt32();
getData["taskPreviousState"]=br.readInt32();
getData["tableID"]=br.readULong();

          return getData;
    }
}