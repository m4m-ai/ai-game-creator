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
import { cMap } from "Data/Map";
import { BackGroundData } from "BackGroundData";
import { BackStoryData } from "BackStoryData";
import { ChapterData } from "ChapterData";
import { ChatMessageData } from "ChatMessageData";
import { DialogData } from "DialogData";
import { GalData } from "GalData";
import { GalPreviewData } from "GalPreviewData";
import { LanguageData } from "LanguageData";
import { LanguageDataCN } from "LanguageDataCN";
import { ProjectData } from "ProjectData";
import { GalRoleData } from "GalRoleData";
import { SceneData } from "SceneData";
import { UserProjectData } from "UserProjectData";
import { VoiceBase } from "VoiceBase";
import { ErrorInfo } from "ErrorInfo";
import { Formulas } from "Formulas";
import { ServerLog } from "ServerLog";
import { ServerUserData } from "ServerUserData";
import { SeverConfigBase } from "SeverConfigBase";
import { SeverData } from "SeverData";
import { TimeEvent } from "TimeEvent";
import { WalletErrLog } from "WalletErrLog";
import { WalletLog } from "WalletLog";

export class WsDataManager {
    public static BackGroundDataData: BackGroundData = new BackGroundData();
    public static BackStoryDataData: BackStoryData = new BackStoryData();
    public static ChapterDataData: ChapterData = new ChapterData();
    public static ChatMessageDataData: ChatMessageData = new ChatMessageData();
    public static DialogDataData: DialogData = new DialogData();
    public static GalDataData: GalData = new GalData();
    public static GalPreviewDataData: GalPreviewData = new GalPreviewData();
    public static LanguageDataData: LanguageData = new LanguageData();
    public static LanguageDataCNData: LanguageDataCN = new LanguageDataCN();
    public static ProjectDataData: ProjectData = new ProjectData();
    public static GalRoleDataData: GalRoleData = new GalRoleData();
    public static SceneDataData: SceneData = new SceneData();
    public static UserProjectDataData: UserProjectData = new UserProjectData();
    public static VoiceBaseData: VoiceBase = new VoiceBase();
    public static ErrorInfoData: ErrorInfo = new ErrorInfo();
    public static FormulasData: Formulas = new Formulas();
    public static ServerLogData: ServerLog = new ServerLog();
    public static ServerUserDataData: ServerUserData = new ServerUserData();
    public static SeverConfigBaseData: SeverConfigBase = new SeverConfigBase();
    public static SeverDataData: SeverData = new SeverData();
    public static TimeEventData: TimeEvent = new TimeEvent();
    public static WalletErrLogData: WalletErrLog = new WalletErrLog();
    public static WalletLogData: WalletLog = new WalletLog();

    public static BackGroundDataDataList = BackGroundData;
    public static BackStoryDataDataList = BackStoryData;
    public static ChapterDataDataList = ChapterData;
    public static ChatMessageDataDataList = ChatMessageData;
    public static DialogDataDataList = DialogData;
    public static GalDataDataList = GalData;
    public static GalPreviewDataDataList = GalPreviewData;
    public static LanguageDataDataList = LanguageData;
    public static LanguageDataCNDataList = LanguageDataCN;
    public static ProjectDataDataList = ProjectData;
    public static GalRoleDataDataList = GalRoleData;
    public static SceneDataDataList = SceneData;
    public static UserProjectDataDataList = UserProjectData;
    public static VoiceBaseDataList = VoiceBase;
    public static ErrorInfoDataList = ErrorInfo;
    public static FormulasDataList = Formulas;
    public static ServerLogDataList = ServerLog;
    public static ServerUserDataDataList = ServerUserData;
    public static SeverConfigBaseDataList = SeverConfigBase;
    public static SeverDataDataList = SeverData;
    public static TimeEventDataList = TimeEvent;
    public static WalletErrLogDataList = WalletErrLog;
    public static WalletLogDataList = WalletLog;

    public static setData(className, data, addType = "") {
        WsDataManager[className + "Data"].clone(data);
        WsDataManager[className + "Data"].dispatchEvent("All" + addType, data);
        WsDataManager[className + "DataList"].dataCall(data);
    }
    public static changeDataList(className: string, data, addType = "") {
        let getClass = WsDataManager[className + "DataList"];
        if (getClass) {
            let newMap = new cMap();
            for (const key in data) {
                newMap.set(key, data[key]);
            }
            getClass.list = newMap;
        }
        WsDataManager[className + "Data"].dispatchEvent("ChangeList" + addType, data);
        WsDataManager[className + "DataList"].changeList(data);
    }
    public static changeData(className: string, proName: string, paramType: string, data, addType="") {
    let proList = proName.replace("@", "").split(".");
    let param: any;
    let lastProName = "";
    if (proList.length < 1) {
        console.error("WsDataManager.changeData get a wrong proName!!!");
        return;
    }
    let eventList = proName.split("@");

    let eventName = proList[0];
    if (proName.indexOf("@")!=-1) {
        eventName = eventList[0];
    }

    param = WsDataManager[className + "Data"];
    let keyName = "";
    for (let index = 0; index < proList.length; index++) {
        let element = proList[index];
        if (element.startsWith("&")) {
            element = element.replace("&", "");
            keyName = element;
        }
        if (index < proList.length - 1) {

            if (!param) {
                param = {};
            }
            if (!param[element]) {
                param[element] = {};
            }
            param = param[element];
        } else {
            lastProName = element;
        }
    }

    switch (paramType) {
        case "list":
            if (!param[lastProName]) {
                param[lastProName] = [];
            }
            for (let key = 0; key < data.length; key++) {
                if (key >= param[lastProName].length) {
                    param[lastProName].Add(data[key]);
                } else {
                    param[lastProName][key] = data[key];
                }
            }
            break;
        case "map":
            let oldMap;
            if (param[lastProName]) {
                oldMap = param[lastProName];
            } else {
                oldMap = {};
            }
            for (const key in data) {
                oldMap[key] = data[key];
            }
            param[lastProName] = oldMap;
            break;
        case "mapdel":
            let oldMapDel;
            if (param[lastProName]) {
                oldMapDel = param[lastProName];
            } else {
                oldMapDel = {};
            }
            for (const key in data) {
                if (oldMapDel[key]) {
                    if (globalThis.window || !oldMapDel.Remove) {
                        delete oldMapDel[key];
                    } else {
                        oldMapDel.Remove(key);
                    }
                }
            }
            param[lastProName] = oldMapDel;
            break;
        default:
            param[lastProName] = data;
    }
    if (!keyName) {
        WsDataManager[className + "Data"].dispatchEvent(eventName + addType, data);
    } else {
        WsDataManager[className + "Data"].dispatchEvent(eventName + addType, data, keyName);
    }
}
    public static dispatchTipData(className: string, data) {
        WsDataManager[className + "Data"].dispatchEvent("TipData", data);
    }
}