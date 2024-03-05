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
import { BackGroundDataBuffer } from "./BackGroundDataBuffer";
import { BackStoryDataBuffer } from "./BackStoryDataBuffer";
import { ChapterDataBuffer } from "./ChapterDataBuffer";
import { ChatMessageDataBuffer } from "./ChatMessageDataBuffer";
import { DialogDataBuffer } from "./DialogDataBuffer";
import { ErrorInfoBuffer } from "./ErrorInfoBuffer";
import { FormulasBuffer } from "./FormulasBuffer";
import { GalDataBuffer } from "./GalDataBuffer";
import { GalPreviewDataBuffer } from "./GalPreviewDataBuffer";
import { GalRoleDataBuffer } from "./GalRoleDataBuffer";
import { LanguageDataBuffer } from "./LanguageDataBuffer";
import { LanguageDataCNBuffer } from "./LanguageDataCNBuffer";
import { ProjectDataBuffer } from "./ProjectDataBuffer";
import { SceneDataBuffer } from "./SceneDataBuffer";
import { ServerLogBuffer } from "./ServerLogBuffer";
import { ServerUserDataBuffer } from "./ServerUserDataBuffer";
import { SeverConfigBaseBuffer } from "./SeverConfigBaseBuffer";
import { SeverDataBuffer } from "./SeverDataBuffer";
import { TimeEventBuffer } from "./TimeEventBuffer";
import { UserProjectDataBuffer } from "./UserProjectDataBuffer";
import { VoiceBaseBuffer } from "./VoiceBaseBuffer";
import { WalletErrLogBuffer } from "./WalletErrLogBuffer";
import { WalletLogBuffer } from "./WalletLogBuffer";
import { TipInfoBuffer } from "./TipInfoBuffer";
import { ListCounterObjBuffer } from "./ListCounterObjBuffer";
import { NavConfigDataBuffer } from "./NavConfigDataBuffer";
import { UploadFileDataBuffer } from "./UploadFileDataBuffer";


export class BufferDataReader{

    public static get Instance(): BufferDataReader {
        if (this._instance == null) {
            this._instance = new BufferDataReader();
        }

        return this._instance;
    }
    private static _instance: BufferDataReader;
    public readArrayBuffer(className:string, br: m4m.io.binTool){
          switch (className) {
                case "BackGroundData":
                    return BackGroundDataBuffer.Instance.readArrayBuffer(br);
                case "BackStoryData":
                    return BackStoryDataBuffer.Instance.readArrayBuffer(br);
                case "ChapterData":
                    return ChapterDataBuffer.Instance.readArrayBuffer(br);
                case "ChatMessageData":
                    return ChatMessageDataBuffer.Instance.readArrayBuffer(br);
                case "DialogData":
                    return DialogDataBuffer.Instance.readArrayBuffer(br);
                case "ErrorInfo":
                    return ErrorInfoBuffer.Instance.readArrayBuffer(br);
                case "Formulas":
                    return FormulasBuffer.Instance.readArrayBuffer(br);
                case "GalData":
                    return GalDataBuffer.Instance.readArrayBuffer(br);
                case "GalPreviewData":
                    return GalPreviewDataBuffer.Instance.readArrayBuffer(br);
                case "GalRoleData":
                    return GalRoleDataBuffer.Instance.readArrayBuffer(br);
                case "LanguageData":
                    return LanguageDataBuffer.Instance.readArrayBuffer(br);
                case "LanguageDataCN":
                    return LanguageDataCNBuffer.Instance.readArrayBuffer(br);
                case "ProjectData":
                    return ProjectDataBuffer.Instance.readArrayBuffer(br);
                case "SceneData":
                    return SceneDataBuffer.Instance.readArrayBuffer(br);
                case "ServerLog":
                    return ServerLogBuffer.Instance.readArrayBuffer(br);
                case "ServerUserData":
                    return ServerUserDataBuffer.Instance.readArrayBuffer(br);
                case "SeverConfigBase":
                    return SeverConfigBaseBuffer.Instance.readArrayBuffer(br);
                case "SeverData":
                    return SeverDataBuffer.Instance.readArrayBuffer(br);
                case "TimeEvent":
                    return TimeEventBuffer.Instance.readArrayBuffer(br);
                case "UserProjectData":
                    return UserProjectDataBuffer.Instance.readArrayBuffer(br);
                case "VoiceBase":
                    return VoiceBaseBuffer.Instance.readArrayBuffer(br);
                case "WalletErrLog":
                    return WalletErrLogBuffer.Instance.readArrayBuffer(br);
                case "WalletLog":
                    return WalletLogBuffer.Instance.readArrayBuffer(br);
                case "TipInfo":
                    return TipInfoBuffer.Instance.readArrayBuffer(br);
                case "ListCounterObj":
                    return ListCounterObjBuffer.Instance.readArrayBuffer(br);
                case "NavConfigData":
                    return NavConfigDataBuffer.Instance.readArrayBuffer(br);
                case "UploadFileData":
                    return UploadFileDataBuffer.Instance.readArrayBuffer(br);

          }
          return null;
    }
}