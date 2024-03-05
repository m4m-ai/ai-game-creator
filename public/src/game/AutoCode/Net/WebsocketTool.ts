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

import { WsDataManager } from "./WsDataManager";
import { UiDataManager } from "PSDUI/UiDataManager";
import { NetData } from "../../Net/NetData";
import { NetWebscoket } from "../../Net/NetWebsocket";

export class WebsocketTool {
    public static get Instance(): WebsocketTool {
        if (this._instance == null) {
            this._instance = new WebsocketTool();
        }

        return this._instance;
    }
    private static _instance: WebsocketTool;
    public onmessage(netData: NetData) {
        if (netData.head != "[LOG]") {
            let messObjList = netData.GetJson();
            let len = messObjList.length;
            for (let i = 0; i < len; i++) {
                let messObj = messObjList[i];
                if (messObj.argsType == "code") {
                    return false;
                }
                if (messObj.argsType == "Event") {
                    UiDataManager.changeFunctionData(messObj.className + "_" + messObj.functionName, messObj.args);
                    return true;
                }
                if (messObj.functionName == "All") {
                    WsDataManager.setData(messObj.className, messObj.args[0], messObj.addType);
                } else if (messObj.functionName == "ChangeList") {
                    WsDataManager.changeDataList(messObj.className, messObj.args[0], messObj.addType);
                } else if (messObj.functionName == "TipData") {
                    WsDataManager.dispatchTipData(messObj.className, messObj.args[0]);
                } else {
                    for (var j = 0; j < messObj.args.length; j++) {
                        let element = messObj.args[j];
                        WsDataManager.changeData(messObj.className, messObj.functionName, messObj.argsType, element, messObj.addType);
                    }
                }
            }
            return true;
        }
        return false;
    }
    public getMsg(className,functionName,text) {
        let mess = `{"currentType":null,"type":null,"callTime":"0001-01-01T00:00:00","callid":0,"timeout":0,"className":"${className}","functionName":"${functionName}","argsType":null,
        ${text}"returnType":null,"returnValue":null}`;
        return mess;
    }

    /***
     * 通过ID获取BackGroundData数据
     */
    public ExcelManager_BackGroundDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","BackGroundDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部BackGroundData数据
     */
    public ExcelManager_BackGroundDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","BackGroundDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条BackGroundData数据
     */
    public ExcelManager_BackGroundDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","BackGroundDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单BackGroundData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyBackGroundDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyBackGroundDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个BackGroundData数据
     */
    public ExcelManager_addBackGroundDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addBackGroundDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加BackGroundData数组数据
     */
    public ExcelManager_addBackGroundDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addBackGroundDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条BackGroundData
     */
    public ExcelManager_removeBackGroundDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeBackGroundDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取BackStoryData数据
     */
    public ExcelManager_BackStoryDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","BackStoryDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部BackStoryData数据
     */
    public ExcelManager_BackStoryDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","BackStoryDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条BackStoryData数据
     */
    public ExcelManager_BackStoryDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","BackStoryDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单BackStoryData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyBackStoryDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyBackStoryDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个BackStoryData数据
     */
    public ExcelManager_addBackStoryDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addBackStoryDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加BackStoryData数组数据
     */
    public ExcelManager_addBackStoryDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addBackStoryDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条BackStoryData
     */
    public ExcelManager_removeBackStoryDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeBackStoryDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ChapterData数据
     */
    public ExcelManager_ChapterDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ChapterDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ChapterData数据
     */
    public ExcelManager_ChapterDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ChapterDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ChapterData数据
     */
    public ExcelManager_ChapterDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ChapterDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ChapterData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyChapterDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyChapterDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ChapterData数据
     */
    public ExcelManager_addChapterDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addChapterDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ChapterData数组数据
     */
    public ExcelManager_addChapterDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addChapterDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ChapterData
     */
    public ExcelManager_removeChapterDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeChapterDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ChatMessageData数据
     */
    public ExcelManager_ChatMessageDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ChatMessageDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ChatMessageData数据
     */
    public ExcelManager_ChatMessageDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ChatMessageDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ChatMessageData数据
     */
    public ExcelManager_ChatMessageDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ChatMessageDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ChatMessageData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyChatMessageDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyChatMessageDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ChatMessageData数据
     */
    public ExcelManager_addChatMessageDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addChatMessageDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ChatMessageData数组数据
     */
    public ExcelManager_addChatMessageDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addChatMessageDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ChatMessageData
     */
    public ExcelManager_removeChatMessageDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeChatMessageDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取DialogData数据
     */
    public ExcelManager_DialogDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","DialogDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部DialogData数据
     */
    public ExcelManager_DialogDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","DialogDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条DialogData数据
     */
    public ExcelManager_DialogDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","DialogDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单DialogData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyDialogDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyDialogDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个DialogData数据
     */
    public ExcelManager_addDialogDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addDialogDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加DialogData数组数据
     */
    public ExcelManager_addDialogDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addDialogDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条DialogData
     */
    public ExcelManager_removeDialogDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeDialogDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取GalData数据
     */
    public ExcelManager_GalDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","GalDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部GalData数据
     */
    public ExcelManager_GalDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","GalDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条GalData数据
     */
    public ExcelManager_GalDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","GalDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单GalData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyGalDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyGalDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个GalData数据
     */
    public ExcelManager_addGalDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addGalDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加GalData数组数据
     */
    public ExcelManager_addGalDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addGalDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条GalData
     */
    public ExcelManager_removeGalDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeGalDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取GalPreviewData数据
     */
    public ExcelManager_GalPreviewDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","GalPreviewDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部GalPreviewData数据
     */
    public ExcelManager_GalPreviewDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","GalPreviewDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条GalPreviewData数据
     */
    public ExcelManager_GalPreviewDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","GalPreviewDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单GalPreviewData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyGalPreviewDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyGalPreviewDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个GalPreviewData数据
     */
    public ExcelManager_addGalPreviewDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addGalPreviewDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加GalPreviewData数组数据
     */
    public ExcelManager_addGalPreviewDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addGalPreviewDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条GalPreviewData
     */
    public ExcelManager_removeGalPreviewDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeGalPreviewDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取LanguageData数据
     */
    public ExcelManager_LanguageDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","LanguageDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部LanguageData数据
     */
    public ExcelManager_LanguageDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","LanguageDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条LanguageData数据
     */
    public ExcelManager_LanguageDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","LanguageDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单LanguageData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyLanguageDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyLanguageDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个LanguageData数据
     */
    public ExcelManager_addLanguageDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addLanguageDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加LanguageData数组数据
     */
    public ExcelManager_addLanguageDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addLanguageDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条LanguageData
     */
    public ExcelManager_removeLanguageDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeLanguageDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取LanguageDataCN数据
     */
    public ExcelManager_LanguageDataCNDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","LanguageDataCNDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部LanguageDataCN数据
     */
    public ExcelManager_LanguageDataCNDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","LanguageDataCNDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条LanguageDataCN数据
     */
    public ExcelManager_LanguageDataCNDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","LanguageDataCNDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单LanguageDataCN数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyLanguageDataCNDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyLanguageDataCNDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个LanguageDataCN数据
     */
    public ExcelManager_addLanguageDataCNData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addLanguageDataCNData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加LanguageDataCN数组数据
     */
    public ExcelManager_addLanguageDataCNDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addLanguageDataCNDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条LanguageDataCN
     */
    public ExcelManager_removeLanguageDataCNData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeLanguageDataCNData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ProjectData数据
     */
    public ExcelManager_ProjectDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ProjectDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ProjectData数据
     */
    public ExcelManager_ProjectDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ProjectDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ProjectData数据
     */
    public ExcelManager_ProjectDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ProjectDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ProjectData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyProjectDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyProjectDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ProjectData数据
     */
    public ExcelManager_addProjectDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addProjectDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ProjectData数组数据
     */
    public ExcelManager_addProjectDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addProjectDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ProjectData
     */
    public ExcelManager_removeProjectDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeProjectDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取GalRoleData数据
     */
    public ExcelManager_GalRoleDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","GalRoleDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部GalRoleData数据
     */
    public ExcelManager_GalRoleDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","GalRoleDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条GalRoleData数据
     */
    public ExcelManager_GalRoleDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","GalRoleDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单GalRoleData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyGalRoleDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyGalRoleDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个GalRoleData数据
     */
    public ExcelManager_addGalRoleDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addGalRoleDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加GalRoleData数组数据
     */
    public ExcelManager_addGalRoleDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addGalRoleDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条GalRoleData
     */
    public ExcelManager_removeGalRoleDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeGalRoleDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SceneData数据
     */
    public ExcelManager_SceneDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","SceneDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SceneData数据
     */
    public ExcelManager_SceneDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","SceneDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SceneData数据
     */
    public ExcelManager_SceneDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","SceneDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SceneData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifySceneDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifySceneDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SceneData数据
     */
    public ExcelManager_addSceneDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSceneDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SceneData数组数据
     */
    public ExcelManager_addSceneDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSceneDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SceneData
     */
    public ExcelManager_removeSceneDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeSceneDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取UserProjectData数据
     */
    public ExcelManager_UserProjectDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","UserProjectDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部UserProjectData数据
     */
    public ExcelManager_UserProjectDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","UserProjectDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条UserProjectData数据
     */
    public ExcelManager_UserProjectDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","UserProjectDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单UserProjectData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyUserProjectDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyUserProjectDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个UserProjectData数据
     */
    public ExcelManager_addUserProjectDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addUserProjectDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加UserProjectData数组数据
     */
    public ExcelManager_addUserProjectDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addUserProjectDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条UserProjectData
     */
    public ExcelManager_removeUserProjectDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeUserProjectDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取VoiceBase数据
     */
    public ExcelManager_VoiceBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","VoiceBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部VoiceBase数据
     */
    public ExcelManager_VoiceBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","VoiceBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条VoiceBase数据
     */
    public ExcelManager_VoiceBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","VoiceBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单VoiceBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyVoiceBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyVoiceBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个VoiceBase数据
     */
    public ExcelManager_addVoiceBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addVoiceBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加VoiceBase数组数据
     */
    public ExcelManager_addVoiceBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addVoiceBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条VoiceBase
     */
    public ExcelManager_removeVoiceBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeVoiceBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ErrorInfo数据
     */
    public ExcelManager_ErrorInfoDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ErrorInfoDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ErrorInfo数据
     */
    public ExcelManager_ErrorInfoDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ErrorInfoDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ErrorInfo数据
     */
    public ExcelManager_ErrorInfoDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ErrorInfoDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ErrorInfo数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyErrorInfoDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyErrorInfoDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ErrorInfo数据
     */
    public ExcelManager_addErrorInfoData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addErrorInfoData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ErrorInfo数组数据
     */
    public ExcelManager_addErrorInfoDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addErrorInfoDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ErrorInfo
     */
    public ExcelManager_removeErrorInfoData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeErrorInfoData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取Formulas数据
     */
    public ExcelManager_FormulasDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","FormulasDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部Formulas数据
     */
    public ExcelManager_FormulasDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","FormulasDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条Formulas数据
     */
    public ExcelManager_FormulasDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","FormulasDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单Formulas数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyFormulasDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyFormulasDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个Formulas数据
     */
    public ExcelManager_addFormulasData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addFormulasData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加Formulas数组数据
     */
    public ExcelManager_addFormulasDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addFormulasDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条Formulas
     */
    public ExcelManager_removeFormulasData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeFormulasData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ServerLog数据
     */
    public ExcelManager_ServerLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ServerLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ServerLog数据
     */
    public ExcelManager_ServerLogDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ServerLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ServerLog数据
     */
    public ExcelManager_ServerLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ServerLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ServerLog数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyServerLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyServerLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ServerLog数据
     */
    public ExcelManager_addServerLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addServerLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ServerLog数组数据
     */
    public ExcelManager_addServerLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addServerLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ServerLog
     */
    public ExcelManager_removeServerLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeServerLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ServerUserData数据
     */
    public ExcelManager_ServerUserDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","ServerUserDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ServerUserData数据
     */
    public ExcelManager_ServerUserDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","ServerUserDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ServerUserData数据
     */
    public ExcelManager_ServerUserDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","ServerUserDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ServerUserData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyServerUserDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyServerUserDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ServerUserData数据
     */
    public ExcelManager_addServerUserDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addServerUserDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ServerUserData数组数据
     */
    public ExcelManager_addServerUserDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addServerUserDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ServerUserData
     */
    public ExcelManager_removeServerUserDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeServerUserDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SeverConfigBase数据
     */
    public ExcelManager_SeverConfigBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","SeverConfigBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SeverConfigBase数据
     */
    public ExcelManager_SeverConfigBaseDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","SeverConfigBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SeverConfigBase数据
     */
    public ExcelManager_SeverConfigBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","SeverConfigBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SeverConfigBase数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifySeverConfigBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifySeverConfigBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SeverConfigBase数据
     */
    public ExcelManager_addSeverConfigBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSeverConfigBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SeverConfigBase数组数据
     */
    public ExcelManager_addSeverConfigBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSeverConfigBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SeverConfigBase
     */
    public ExcelManager_removeSeverConfigBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeSeverConfigBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SeverData数据
     */
    public ExcelManager_SeverDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","SeverDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SeverData数据
     */
    public ExcelManager_SeverDataDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","SeverDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SeverData数据
     */
    public ExcelManager_SeverDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","SeverDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SeverData数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifySeverDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifySeverDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SeverData数据
     */
    public ExcelManager_addSeverDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSeverDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SeverData数组数据
     */
    public ExcelManager_addSeverDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addSeverDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SeverData
     */
    public ExcelManager_removeSeverDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeSeverDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取TimeEvent数据
     */
    public ExcelManager_TimeEventDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","TimeEventDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部TimeEvent数据
     */
    public ExcelManager_TimeEventDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","TimeEventDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条TimeEvent数据
     */
    public ExcelManager_TimeEventDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","TimeEventDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单TimeEvent数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyTimeEventDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyTimeEventDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个TimeEvent数据
     */
    public ExcelManager_addTimeEventData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addTimeEventData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加TimeEvent数组数据
     */
    public ExcelManager_addTimeEventDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addTimeEventDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条TimeEvent
     */
    public ExcelManager_removeTimeEventData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeTimeEventData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取WalletErrLog数据
     */
    public ExcelManager_WalletErrLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","WalletErrLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部WalletErrLog数据
     */
    public ExcelManager_WalletErrLogDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","WalletErrLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条WalletErrLog数据
     */
    public ExcelManager_WalletErrLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","WalletErrLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单WalletErrLog数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyWalletErrLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyWalletErrLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个WalletErrLog数据
     */
    public ExcelManager_addWalletErrLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addWalletErrLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加WalletErrLog数组数据
     */
    public ExcelManager_addWalletErrLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addWalletErrLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条WalletErrLog
     */
    public ExcelManager_removeWalletErrLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeWalletErrLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取WalletLog数据
     */
    public ExcelManager_WalletLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","WalletLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部WalletLog数据
     */
    public ExcelManager_WalletLogDataGetAll() {
        let paramJsons =``;
        let mess = this.getMsg("ExcelManager","WalletLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条WalletLog数据
     */
    public ExcelManager_WalletLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = this.getMsg("ExcelManager","WalletLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单WalletLog数组的指定属性，propertyName：属性名，value：值
     */
    public ExcelManager_modifyWalletLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","modifyWalletLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个WalletLog数据
     */
    public ExcelManager_addWalletLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addWalletLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加WalletLog数组数据
     */
    public ExcelManager_addWalletLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = this.getMsg("ExcelManager","addWalletLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条WalletLog
     */
    public ExcelManager_removeWalletLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ExcelManager","removeWalletLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已有的背景图
     */
    public BackGroundImageManager_GetBackGround(projectId, backGroundId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(backGroundId)},`;
        let mess = this.getMsg("BackGroundImageManager","GetBackGround",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取所有的背景图
     */
    public BackGroundImageManager_GetAllBackGround(projectId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},`;
        let mess = this.getMsg("BackGroundImageManager","GetAllBackGround",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成场景的背景描述,llmType:选择的模型
     */
    public BackGroundImageManager_LLM_GetBackGroundByScene(projectId, title, chapterId, SceneId, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(SceneId)},"a4":${JSON.stringify(llmType)},"a5":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("BackGroundImageManager","LLM_GetBackGroundByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定场景的背景描述
     */
    public BackGroundImageManager_SetBackGroundByScene(projectId, chapterId, SceneId, content) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(SceneId)},"a3":${JSON.stringify(content)},`;
        let mess = this.getMsg("BackGroundImageManager","SetBackGroundByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过绘图模型生成场景的背景
     */
    public BackGroundImageManager_StableDiffusio_GetBackGround(projectId, title, chapterId, SceneId, prompt, chatID) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(SceneId)},"a4":${JSON.stringify(prompt)},"a5":${JSON.stringify(chatID)},`;
        let mess = this.getMsg("BackGroundImageManager","StableDiffusio_GetBackGround",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定场景的背景
     */
    public BackGroundImageManager_SetBackGroundImageByScene(projectId, chapterId, SceneId, imageId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(SceneId)},"a3":${JSON.stringify(imageId)},`;
        let mess = this.getMsg("BackGroundImageManager","SetBackGroundImageByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 保存生成的音乐
     */
    public BackGroundImageManager_SaveBackGroundImage(projectId, imageId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(imageId)},`;
        let mess = this.getMsg("BackGroundImageManager","SaveBackGroundImage",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取章节信息
     */
    public ChapterManager_GetChapter(projectId, chapterId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},`;
        let mess = this.getMsg("ChapterManager","GetChapter",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成全游戏章节和场景，chapterCount：章节数量，minSceneCount：单个章节最小场景数量，maxSceneCount：单个章节最大场景数量
     */
    public ChapterManager_LLM_GetChapters(projectId, title, llmType, chapterCount, minSceneCount, maxSceneCount, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(chapterCount)},"a4":${JSON.stringify(minSceneCount)},"a5":${JSON.stringify(maxSceneCount)},"a6":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("ChapterManager","LLM_GetChapters",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定全游戏章节信息
     */
    public ChapterManager_SetChapters(projectId, chapters, scenes) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapters)},"a2":${JSON.stringify(scenes)},`;
        let mess = this.getMsg("ChapterManager","SetChapters",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成指定章节的场景，chapterId：章节id，minSceneCount：单个章节最小场景数量，maxSceneCount：单个章节最大场景数量
     */
    public ChapterManager_LLM_GetChapter(projectId, title, chapterId, minSceneCount, maxSceneCount, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(minSceneCount)},"a4":${JSON.stringify(maxSceneCount)},"a5":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("ChapterManager","LLM_GetChapter",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定章节信息
     */
    public ChapterManager_SetChapter(projectId, chapterId, chapter) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(chapter)},`;
        let mess = this.getMsg("ChapterManager","SetChapter",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定章节指定场景信息
     */
    public ChapterManager_SetScene(projectId, chapterId, sceneId, chapter) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(chapter)},`;
        let mess = this.getMsg("ChapterManager","SetScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成场景的大纲,llmType:选择的模型
     */
    public DialogManager_LLM_GetOutline(projectId, title, chapterId, sceneId, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(sceneId)},"a4":${JSON.stringify(llmType)},"a5":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("DialogManager","LLM_GetOutline",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定大纲
     */
    public DialogManager_SetOutLine(projectId, chapterId, sceneId, outLine) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(outLine)},`;
        let mess = this.getMsg("DialogManager","SetOutLine",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成场景的对话,llmType:选择的模型
     */
    public DialogManager_LLM_GetDialog(projectId, title, llmType, roles, chapterId, sceneId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(roles)},"a4":${JSON.stringify(chapterId)},"a5":${JSON.stringify(sceneId)},`;
        let mess = this.getMsg("DialogManager","LLM_GetDialog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定对话
     */
    public DialogManager_SetDialog(projectId, chapterId, sceneId, dialog) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(dialog)},`;
        let mess = this.getMsg("DialogManager","SetDialog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语音模型生成场景的对话语音
     */
    public DialogManager_VITS_GetVoicesByDaiglog(projectId, title, daiglogId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(daiglogId)},`;
        let mess = this.getMsg("DialogManager","VITS_GetVoicesByDaiglog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定对话语音
     */
    public DialogManager_SetVoicesByDaiglog(projectId, chapterId, sceneId, daiglogId, voicesPath) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(daiglogId)},"a4":${JSON.stringify(voicesPath)},`;
        let mess = this.getMsg("DialogManager","SetVoicesByDaiglog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已有对话语音
     */
    public DialogManager_GetVoicesByDaiglog(projectId, chapterId, sceneId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},`;
        let mess = this.getMsg("DialogManager","GetVoicesByDaiglog",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语音模型生成指定文本的语音
     */
    public DialogManager_VITS_GetVoiceByTxt(projectId, title, roleId, txt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(roleId)},"a3":${JSON.stringify(txt)},`;
        let mess = this.getMsg("DialogManager","VITS_GetVoiceByTxt",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 生成整段语音
     */
    public DialogManager_VITS_GetVoiceByScene(projectId, title, chapterId, sceneId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(sceneId)},`;
        let mess = this.getMsg("DialogManager","VITS_GetVoiceByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定对话的语音
     */
    public DialogManager_SetVoiceToTxt(projectId, chapterId, sceneId, txtId, voiceId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(txtId)},"a4":${JSON.stringify(voiceId)},`;
        let mess = this.getMsg("DialogManager","SetVoiceToTxt",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取指定对话已有的语音
     */
    public DialogManager_GetVoiceToTxt(projectId, chapterId, sceneId, txtId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(txtId)},`;
        let mess = this.getMsg("DialogManager","GetVoiceToTxt",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已有的英语
     */
    public MusicManager_GetMusic(projectId, musicId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(musicId)},`;
        let mess = this.getMsg("MusicManager","GetMusic",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成场景的音乐描述,llmType:选择的模型
     */
    public MusicManager_LLM_GetMusicByScene(projectId, title, chapterId, SceneId, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(chapterId)},"a3":${JSON.stringify(SceneId)},"a4":${JSON.stringify(llmType)},"a5":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("MusicManager","LLM_GetMusicByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定场景的音乐描述
     */
    public MusicManager_SetMusicByScene(projectId, chapterId, SceneId, content) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(SceneId)},"a3":${JSON.stringify(content)},`;
        let mess = this.getMsg("MusicManager","SetMusicByScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过音乐模型生成场景的音乐
     */
    public MusicManager_MUSIC_GetMusicByContent(projectId, title, content) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(content)},`;
        let mess = this.getMsg("MusicManager","MUSIC_GetMusicByContent",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 保存生成的音乐
     */
    public MusicManager_SaveMusic(projectId, musicId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(musicId)},`;
        let mess = this.getMsg("MusicManager","SaveMusic",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定场景的音乐
     */
    public MusicManager_SetMusicToScene(projectId, chapterId, SceneId, musicId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(chapterId)},"a2":${JSON.stringify(SceneId)},"a3":${JSON.stringify(musicId)},`;
        let mess = this.getMsg("MusicManager","SetMusicToScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 语言模型自由API
     */
    public OtherApiManager_LLM_Free(projectId, title, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("OtherApiManager","LLM_Free",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 图画模型自由API
     */
    public OtherApiManager_StableDiffusion_Free(projectId, title, json) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(json)},`;
        let mess = this.getMsg("OtherApiManager","StableDiffusion_Free",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 语音模型自由API
     */
    public OtherApiManager_VITS_Free(projectId, title, voiceId, txt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(voiceId)},"a3":${JSON.stringify(txt)},`;
        let mess = this.getMsg("OtherApiManager","VITS_Free",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 一键补完项目
     */
    public OtherApiManager_OneClickCompletion(projectId, title, args) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(args)},`;
        let mess = this.getMsg("OtherApiManager","OneClickCompletion",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取指定项目的背景设定
     */
    public ProjectBasicSettingsManager_GetBackStory(projectId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},`;
        let mess = this.getMsg("ProjectBasicSettingsManager","GetBackStory",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定项目进度
     */
    public ProjectBasicSettingsManager_SetSchedule(projectId, schedule) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(schedule)},`;
        let mess = this.getMsg("ProjectBasicSettingsManager","SetSchedule",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定项目的背景设定
     */
    public ProjectBasicSettingsManager_SetBackStory(projectId, projectBack) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(projectBack)},`;
        let mess = this.getMsg("ProjectBasicSettingsManager","SetBackStory",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成指定项目的背景设定，llmType：调用的语言模型
     */
    public ProjectBasicSettingsManager_LLM_GetBackStory(projectId, title, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("ProjectBasicSettingsManager","LLM_GetBackStory",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定项目的项目名
     */
    public ProjectBasicSettingsManager_SetProjectName(projectId, projectName) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(projectName)},`;
        let mess = this.getMsg("ProjectBasicSettingsManager","SetProjectName",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成指定项目的项目名，llmType：调用的语言模型
     */
    public ProjectBasicSettingsManager_LLM_GetProjectName(projectId, title, llmType, backStory, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(backStory)},"a4":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("ProjectBasicSettingsManager","LLM_GetProjectName",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取支持的画风，count：获取数量, isRandom:(是否随机画风，还是由AI判断适合的画风)
     */
    public ProjectBasicSettingsManager_StableDiffusio_GetStyleExample(projectId, title, count, isRandom) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(count)},"a3":${JSON.stringify(isRandom)},`;
        let mess = this.getMsg("ProjectBasicSettingsManager","StableDiffusio_GetStyleExample",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定项目的画风模型
     */
    public ProjectBasicSettingsManager_SetStyle(projectId, styleId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(styleId)},`;
        let mess = this.getMsg("ProjectBasicSettingsManager","SetStyle",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已设定的指定角色的设定
     */
    public ProjectRoleManager_GetRoleSetting(projectId, roleId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},`;
        let mess = this.getMsg("ProjectRoleManager","GetRoleSetting",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已设定的指定角色的语音设定
     */
    public ProjectRoleManager_GetRoleVoice(projectId, roleId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},`;
        let mess = this.getMsg("ProjectRoleManager","GetRoleVoice",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取已设定的指定角色的立绘
     */
    public ProjectRoleManager_GetRole(projectId, roleId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},`;
        let mess = this.getMsg("ProjectRoleManager","GetRole",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过语言模型生成角色设定，llmType：调用的语言模型
     */
    public ProjectRoleManager_LLM_GetRoleSetting(projectId, title, llmType, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(llmType)},"a3":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("ProjectRoleManager","LLM_GetRoleSetting",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定角色的设定
     */
    public ProjectRoleManager_SetRoleSetting(projectId, roleId, roleSetting) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},"a2":${JSON.stringify(roleSetting)},`;
        let mess = this.getMsg("ProjectRoleManager","SetRoleSetting",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 由AI判断适合的声线，挑选适合的语音模型 count 挑选数量
     */
    public ProjectRoleManager_VITS_GetRoleVoice(projectId, title, roleId, count, prompt) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(roleId)},"a3":${JSON.stringify(count)},"a4":${JSON.stringify(prompt)},`;
        let mess = this.getMsg("ProjectRoleManager","VITS_GetRoleVoice",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取所有语音模型，count 挑选数量，type:1 幼年女性 2 青年女性 3中年女性 4老年女性 5幼年男性 6青年男性 7中年男性 8老年男性，9 所有女性 10 所有男性，11其他，0 全部
     */
    public ProjectRoleManager_VITS_GetAllVoice(projectId, title, roleId, count, type) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(roleId)},"a3":${JSON.stringify(count)},"a4":${JSON.stringify(type)},`;
        let mess = this.getMsg("ProjectRoleManager","VITS_GetAllVoice",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定指定角色的语音模型
     */
    public ProjectRoleManager_SetRoleVoice(projectId, roleId, voiceId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},"a2":${JSON.stringify(voiceId)},`;
        let mess = this.getMsg("ProjectRoleManager","SetRoleVoice",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过词条生成角色立绘，count 生成数量
     */
    public ProjectRoleManager_StableDiffusio_GetRole(projectId, title, count, roleId, prompt, chatID) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(count)},"a3":${JSON.stringify(roleId)},"a4":${JSON.stringify(prompt)},"a5":${JSON.stringify(chatID)},`;
        let mess = this.getMsg("ProjectRoleManager","StableDiffusio_GetRole",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 设定角色立绘
     */
    public ProjectRoleManager_SetRole(projectId, roleId, imageId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},"a2":${JSON.stringify(imageId)},`;
        let mess = this.getMsg("ProjectRoleManager","SetRole",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 生成表情
     */
    public ProjectRoleManager_SetBiaoqing(projectId, title, jsonStr, chatID) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(title)},"a2":${JSON.stringify(jsonStr)},"a3":${JSON.stringify(chatID)},`;
        let mess = this.getMsg("ProjectRoleManager","SetBiaoqing",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除角色
     */
    public ProjectRoleManager_DeleteRole(projectId, roleId) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},`;
        let mess = this.getMsg("ProjectRoleManager","DeleteRole",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改角色名字
     */
    public ProjectRoleManager_ChangeRoleName(projectId, roleId, newName) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(roleId)},"a2":${JSON.stringify(newName)},`;
        let mess = this.getMsg("ProjectRoleManager","ChangeRoleName",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 发布完整项目 args：发布相关参数
     */
    public PublishProjectManager_PublishProject(projectId, args) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(args)},`;
        let mess = this.getMsg("PublishProjectManager","PublishProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 只发布指定章节段 args：发布相关参数
     */
    public PublishProjectManager_PublishProjectOnlyChapter(projectId, ChapterId, args) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(ChapterId)},"a2":${JSON.stringify(args)},`;
        let mess = this.getMsg("PublishProjectManager","PublishProjectOnlyChapter",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 只发布指定场景对话 args：发布相关参数
     */
    public PublishProjectManager_PublishProjectOnlyScene(projectId, ChapterId, sceneId, args) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(ChapterId)},"a2":${JSON.stringify(sceneId)},"a3":${JSON.stringify(args)},`;
        let mess = this.getMsg("PublishProjectManager","PublishProjectOnlyScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 导出3D Prefab
     */
    public PrefabExport_exportPrefab3D(dirKey, fileName, json) {
        let paramJsons =`"a0":${JSON.stringify(dirKey)},"a1":${JSON.stringify(fileName)},"a2":${JSON.stringify(json)},`;
        let mess = this.getMsg("PrefabExport","exportPrefab3D",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 导出Scene
     */
    public PrefabExport_exportScene(dirKey, fileName, json, fog) {
        let paramJsons =`"a0":${JSON.stringify(dirKey)},"a1":${JSON.stringify(fileName)},"a2":${JSON.stringify(json)},"a3":${JSON.stringify(JSON.stringify(fog))},`;
        let mess = this.getMsg("PrefabExport","exportScene",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * testtesttest
     */
    public PrefabExport_testExport(json) {
        let paramJsons =`"a0":${JSON.stringify(json)},`;
        let mess = this.getMsg("PrefabExport","testExport",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 导出2D Prefab
     */
    public PrefabExport_exportPrefab2D(dirKey, fileName, json) {
        let paramJsons =`"a0":${JSON.stringify(dirKey)},"a1":${JSON.stringify(fileName)},"a2":${JSON.stringify(json)},`;
        let mess = this.getMsg("PrefabExport","exportPrefab2D",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取GAL预览
     */
    public GalManager_GreatAllGalPreviewDatasAsync() {
        let paramJsons =``;
        let mess = this.getMsg("GalManager","GreatAllGalPreviewDatasAsync",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建GAL工程
     */
    public GalManager_CreatAGal(projectId, galName) {
        let paramJsons =`"a0":${JSON.stringify(projectId)},"a1":${JSON.stringify(galName)},`;
        let mess = this.getMsg("GalManager","CreatAGal",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 登录账号
     */
    public ProjectManager_login(userName, pw) {
        let paramJsons =`"a0":${JSON.stringify(userName)},"a1":${JSON.stringify(pw)},`;
        let mess = this.getMsg("ProjectManager","login",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 注册账号
     */
    public ProjectManager_RegisterAnAccount(userName, pw) {
        let paramJsons =`"a0":${JSON.stringify(userName)},"a1":${JSON.stringify(pw)},`;
        let mess = this.getMsg("ProjectManager","RegisterAnAccount",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除文件夹
     */
    public ProjectManager_deleteDir(key) {
        let paramJsons =`"a0":${JSON.stringify(key)},`;
        let mess = this.getMsg("ProjectManager","deleteDir",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 编译所有工程
     */
    public ProjectManager_watchProject() {
        let paramJsons =``;
        let mess = this.getMsg("ProjectManager","watchProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 停止编译所有工程
     */
    public ProjectManager_stopWatchProject() {
        let paramJsons =``;
        let mess = this.getMsg("ProjectManager","stopWatchProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 重新获取文件信息
     */
    public ProjectManager_getFilesInfo(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = this.getMsg("ProjectManager","getFilesInfo",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 根据传入的路径打开VSCode
     */
    public ProjectManager_openVSCode(vspath, openpath) {
        let paramJsons =`"a0":${JSON.stringify(vspath)},"a1":${JSON.stringify(openpath)},`;
        let mess = this.getMsg("ProjectManager","openVSCode",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建Ts工程
     */
    public ProjectManager_createTsProject(pareKey, dirName) {
        let paramJsons =`"a0":${JSON.stringify(pareKey)},"a1":${JSON.stringify(dirName)},`;
        let mess = this.getMsg("ProjectManager","createTsProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建Ts文件
     */
    public ProjectManager_createTsFile(pareKey, dirName) {
        let paramJsons =`"a0":${JSON.stringify(pareKey)},"a1":${JSON.stringify(dirName)},`;
        let mess = this.getMsg("ProjectManager","createTsFile",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建文件夹
     */
    public ProjectManager_createDir(pareKey, dirName) {
        let paramJsons =`"a0":${JSON.stringify(pareKey)},"a1":${JSON.stringify(dirName)},`;
        let mess = this.getMsg("ProjectManager","createDir",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 重启编译监控
     */
    public ProjectManager_reWatchDir() {
        let paramJsons =``;
        let mess = this.getMsg("ProjectManager","reWatchDir",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 重命名文件夹
     */
    public ProjectManager_renameDir(key, newName) {
        let paramJsons =`"a0":${JSON.stringify(key)},"a1":${JSON.stringify(newName)},`;
        let mess = this.getMsg("ProjectManager","renameDir",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除文件
     */
    public ProjectManager_deleteFile(key) {
        let paramJsons =`"a0":${JSON.stringify(key)},`;
        let mess = this.getMsg("ProjectManager","deleteFile",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 打开项目
     */
    public ProjectManager_openProject(projectName) {
        let paramJsons =`"a0":${JSON.stringify(projectName)},`;
        let mess = this.getMsg("ProjectManager","openProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建项目
     */
    public ProjectManager_creatProject(projectName) {
        let paramJsons =`"a0":${JSON.stringify(projectName)},`;
        let mess = this.getMsg("ProjectManager","creatProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 选中当前文件
     */
    public ProjectManager_selectFileFun(path) {
        let paramJsons =`"a0":${JSON.stringify(path)},`;
        let mess = this.getMsg("ProjectManager","selectFileFun",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 保存当前选中文件
     */
    public ProjectManager_saveSelectClassFun(path) {
        let paramJsons =`"a0":${JSON.stringify(path)},`;
        let mess = this.getMsg("ProjectManager","saveSelectClassFun",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 保存代码文件
     */
    public ProjectManager_saveClassFun(path, content) {
        let paramJsons =`"a0":${JSON.stringify(path)},"a1":${JSON.stringify(content)},`;
        let mess = this.getMsg("ProjectManager","saveClassFun",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 调用C++的dll生成导航文件
     */
    public ProjectManager_createNavFile(configKey, fileKeys) {
        let paramJsons =`"a0":${JSON.stringify(configKey)},"a1":${JSON.stringify(fileKeys)},`;
        let mess = this.getMsg("ProjectManager","createNavFile",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 生成导航网格
     */
    public ProjectManager_createNav(pathKey, config, fileInfos, lengthArray, objData) {
        let paramJsons =`"a0":${JSON.stringify(pathKey)},"a1":${JSON.stringify(config)},"a2":${JSON.stringify(fileInfos)},"a3":${JSON.stringify(lengthArray)},"a4":${JSON.stringify(objData)},`;
        let mess = this.getMsg("ProjectManager","createNav",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 记录客户端异常消息
     */
    public ErrorInfoManager_CreateErrorInfo(message, modelType) {
        let paramJsons =`"a0":${JSON.stringify(message)},"a1":${JSON.stringify(modelType)},`;
        let mess = this.getMsg("ErrorInfoManager","CreateErrorInfo",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * callService
     */
    public FrontDataManager_callService(className, funcName, args) {
        let paramJsons =`"a0":${JSON.stringify(className)},"a1":${JSON.stringify(funcName)},"a2":${JSON.stringify(args)},`;
        let mess = this.getMsg("FrontDataManager","callService",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * callFunc
     */
    public FrontDataManager_callFunc(tableName, funcName, args) {
        let paramJsons =`"a0":${JSON.stringify(tableName)},"a1":${JSON.stringify(funcName)},"a2":${JSON.stringify(args)},`;
        let mess = this.getMsg("FrontDataManager","callFunc",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 下载自动代码
     */
    public AutoCodeManager_DownloadAutoCode() {
        let paramJsons =``;
        let mess = this.getMsg("AutoCodeManager","DownloadAutoCode",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改表数据 
     */
    public GmToolsManager_setTableDatas(tableName, tableDatas) {
        let paramJsons =`"a0":${JSON.stringify(tableName)},"a1":${JSON.stringify(tableDatas)},`;
        let mess = this.getMsg("GmToolsManager","setTableDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取表数据 
     */
    public GmToolsManager_getATableDatas(tableName) {
        let paramJsons =`"a0":${JSON.stringify(tableName)},`;
        let mess = this.getMsg("GmToolsManager","getATableDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 备份数据库
     */
    public MySqlManager_copyMySqlClient(PW) {
        let paramJsons =`"a0":${JSON.stringify(PW)},`;
        let mess = this.getMsg("MySqlManager","copyMySqlClient",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 还原数据库
     */
    public MySqlManager_uploadDataClien(PW) {
        let paramJsons =`"a0":${JSON.stringify(PW)},`;
        let mess = this.getMsg("MySqlManager","uploadDataClien",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改服务器时间,time：修改时间 （格式 2022-09-10  00:00:00）
     */
    public ServerManager_timePlus(time) {
        let paramJsons =`"a0":${JSON.stringify(time)},`;
        let mess = this.getMsg("ServerManager","timePlus",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改开服时间,time：时间 （格式 2022-09-10  00:00:00）
     */
    public ServerManager_openTimePlus(time) {
        let paramJsons =`"a0":${JSON.stringify(time)},`;
        let mess = this.getMsg("ServerManager","openTimePlus",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 心跳检测
     */
    public ServerManager_heartBeat() {
        let paramJsons =``;
        let mess = this.getMsg("ServerManager","heartBeat",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 延迟检测
     */
    public ServerManager_ping() {
        let paramJsons =``;
        let mess = this.getMsg("ServerManager","ping",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取服务器时间
     */
    public ServerManager_servertime() {
        let paramJsons =``;
        let mess = this.getMsg("ServerManager","servertime",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}