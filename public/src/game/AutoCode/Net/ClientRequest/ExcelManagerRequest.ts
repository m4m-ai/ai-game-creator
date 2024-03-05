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
import { NetWebscoket } from "../../../Net/NetWebsocket";
import { WebsocketTool } from "../WebsocketTool";

export class ExcelManagerRequest {
    public static get Instance(): ExcelManagerRequest {
        if (this._instance == null) {
            this._instance = new ExcelManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ExcelManagerRequest;


    /***
     * 通过ID获取BackGroundData数据
     */
    public BackGroundDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","BackGroundDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部BackGroundData数据
     */
    public BackGroundDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","BackGroundDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条BackGroundData数据
     */
    public BackGroundDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","BackGroundDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单BackGroundData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyBackGroundDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyBackGroundDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个BackGroundData数据
     */
    public addBackGroundDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addBackGroundDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加BackGroundData数组数据
     */
    public addBackGroundDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addBackGroundDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条BackGroundData
     */
    public removeBackGroundDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeBackGroundDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取BackStoryData数据
     */
    public BackStoryDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","BackStoryDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部BackStoryData数据
     */
    public BackStoryDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","BackStoryDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条BackStoryData数据
     */
    public BackStoryDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","BackStoryDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单BackStoryData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyBackStoryDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyBackStoryDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个BackStoryData数据
     */
    public addBackStoryDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addBackStoryDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加BackStoryData数组数据
     */
    public addBackStoryDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addBackStoryDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条BackStoryData
     */
    public removeBackStoryDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeBackStoryDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ChapterData数据
     */
    public ChapterDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ChapterDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ChapterData数据
     */
    public ChapterDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ChapterDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ChapterData数据
     */
    public ChapterDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ChapterDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ChapterData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyChapterDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyChapterDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ChapterData数据
     */
    public addChapterDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addChapterDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ChapterData数组数据
     */
    public addChapterDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addChapterDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ChapterData
     */
    public removeChapterDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeChapterDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ChatMessageData数据
     */
    public ChatMessageDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ChatMessageDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ChatMessageData数据
     */
    public ChatMessageDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ChatMessageDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ChatMessageData数据
     */
    public ChatMessageDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ChatMessageDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ChatMessageData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyChatMessageDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyChatMessageDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ChatMessageData数据
     */
    public addChatMessageDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addChatMessageDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ChatMessageData数组数据
     */
    public addChatMessageDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addChatMessageDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ChatMessageData
     */
    public removeChatMessageDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeChatMessageDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取DialogData数据
     */
    public DialogDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","DialogDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部DialogData数据
     */
    public DialogDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","DialogDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条DialogData数据
     */
    public DialogDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","DialogDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单DialogData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyDialogDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyDialogDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个DialogData数据
     */
    public addDialogDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addDialogDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加DialogData数组数据
     */
    public addDialogDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addDialogDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条DialogData
     */
    public removeDialogDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeDialogDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取GalData数据
     */
    public GalDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部GalData数据
     */
    public GalDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条GalData数据
     */
    public GalDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单GalData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyGalDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyGalDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个GalData数据
     */
    public addGalDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addGalDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加GalData数组数据
     */
    public addGalDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addGalDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条GalData
     */
    public removeGalDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeGalDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取GalPreviewData数据
     */
    public GalPreviewDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalPreviewDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部GalPreviewData数据
     */
    public GalPreviewDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalPreviewDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条GalPreviewData数据
     */
    public GalPreviewDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalPreviewDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单GalPreviewData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyGalPreviewDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyGalPreviewDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个GalPreviewData数据
     */
    public addGalPreviewDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addGalPreviewDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加GalPreviewData数组数据
     */
    public addGalPreviewDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addGalPreviewDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条GalPreviewData
     */
    public removeGalPreviewDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeGalPreviewDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取LanguageData数据
     */
    public LanguageDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LanguageDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部LanguageData数据
     */
    public LanguageDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LanguageDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条LanguageData数据
     */
    public LanguageDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LanguageDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单LanguageData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyLanguageDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyLanguageDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个LanguageData数据
     */
    public addLanguageDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addLanguageDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加LanguageData数组数据
     */
    public addLanguageDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addLanguageDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条LanguageData
     */
    public removeLanguageDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeLanguageDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取LanguageDataCN数据
     */
    public LanguageDataCNDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LanguageDataCNDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部LanguageDataCN数据
     */
    public LanguageDataCNDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LanguageDataCNDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条LanguageDataCN数据
     */
    public LanguageDataCNDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","LanguageDataCNDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单LanguageDataCN数组的指定属性，propertyName：属性名，value：值
     */
    public modifyLanguageDataCNDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyLanguageDataCNDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个LanguageDataCN数据
     */
    public addLanguageDataCNData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addLanguageDataCNData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加LanguageDataCN数组数据
     */
    public addLanguageDataCNDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addLanguageDataCNDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条LanguageDataCN
     */
    public removeLanguageDataCNData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeLanguageDataCNData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ProjectData数据
     */
    public ProjectDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ProjectDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ProjectData数据
     */
    public ProjectDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ProjectDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ProjectData数据
     */
    public ProjectDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ProjectDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ProjectData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyProjectDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyProjectDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ProjectData数据
     */
    public addProjectDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addProjectDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ProjectData数组数据
     */
    public addProjectDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addProjectDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ProjectData
     */
    public removeProjectDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeProjectDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取GalRoleData数据
     */
    public GalRoleDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalRoleDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部GalRoleData数据
     */
    public GalRoleDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalRoleDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条GalRoleData数据
     */
    public GalRoleDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","GalRoleDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单GalRoleData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyGalRoleDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyGalRoleDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个GalRoleData数据
     */
    public addGalRoleDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addGalRoleDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加GalRoleData数组数据
     */
    public addGalRoleDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addGalRoleDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条GalRoleData
     */
    public removeGalRoleDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeGalRoleDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SceneData数据
     */
    public SceneDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SceneDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SceneData数据
     */
    public SceneDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SceneDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SceneData数据
     */
    public SceneDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SceneDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SceneData数组的指定属性，propertyName：属性名，value：值
     */
    public modifySceneDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifySceneDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SceneData数据
     */
    public addSceneDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSceneDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SceneData数组数据
     */
    public addSceneDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSceneDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SceneData
     */
    public removeSceneDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeSceneDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取UserProjectData数据
     */
    public UserProjectDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserProjectDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部UserProjectData数据
     */
    public UserProjectDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserProjectDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条UserProjectData数据
     */
    public UserProjectDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","UserProjectDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单UserProjectData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyUserProjectDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyUserProjectDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个UserProjectData数据
     */
    public addUserProjectDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addUserProjectDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加UserProjectData数组数据
     */
    public addUserProjectDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addUserProjectDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条UserProjectData
     */
    public removeUserProjectDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeUserProjectDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取VoiceBase数据
     */
    public VoiceBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","VoiceBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部VoiceBase数据
     */
    public VoiceBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","VoiceBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条VoiceBase数据
     */
    public VoiceBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","VoiceBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单VoiceBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyVoiceBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyVoiceBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个VoiceBase数据
     */
    public addVoiceBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addVoiceBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加VoiceBase数组数据
     */
    public addVoiceBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addVoiceBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条VoiceBase
     */
    public removeVoiceBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeVoiceBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ErrorInfo数据
     */
    public ErrorInfoDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ErrorInfoDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ErrorInfo数据
     */
    public ErrorInfoDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ErrorInfoDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ErrorInfo数据
     */
    public ErrorInfoDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ErrorInfoDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ErrorInfo数组的指定属性，propertyName：属性名，value：值
     */
    public modifyErrorInfoDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyErrorInfoDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ErrorInfo数据
     */
    public addErrorInfoData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addErrorInfoData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ErrorInfo数组数据
     */
    public addErrorInfoDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addErrorInfoDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ErrorInfo
     */
    public removeErrorInfoData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeErrorInfoData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取Formulas数据
     */
    public FormulasDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","FormulasDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部Formulas数据
     */
    public FormulasDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","FormulasDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条Formulas数据
     */
    public FormulasDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","FormulasDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单Formulas数组的指定属性，propertyName：属性名，value：值
     */
    public modifyFormulasDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyFormulasDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个Formulas数据
     */
    public addFormulasData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addFormulasData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加Formulas数组数据
     */
    public addFormulasDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addFormulasDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条Formulas
     */
    public removeFormulasData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeFormulasData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ServerLog数据
     */
    public ServerLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ServerLog数据
     */
    public ServerLogDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ServerLog数据
     */
    public ServerLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ServerLog数组的指定属性，propertyName：属性名，value：值
     */
    public modifyServerLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyServerLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ServerLog数据
     */
    public addServerLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addServerLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ServerLog数组数据
     */
    public addServerLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addServerLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ServerLog
     */
    public removeServerLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeServerLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取ServerUserData数据
     */
    public ServerUserDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerUserDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部ServerUserData数据
     */
    public ServerUserDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerUserDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条ServerUserData数据
     */
    public ServerUserDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","ServerUserDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单ServerUserData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyServerUserDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyServerUserDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个ServerUserData数据
     */
    public addServerUserDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addServerUserDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加ServerUserData数组数据
     */
    public addServerUserDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addServerUserDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条ServerUserData
     */
    public removeServerUserDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeServerUserDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SeverConfigBase数据
     */
    public SeverConfigBaseDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverConfigBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SeverConfigBase数据
     */
    public SeverConfigBaseDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverConfigBaseDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SeverConfigBase数据
     */
    public SeverConfigBaseDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverConfigBaseDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SeverConfigBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifySeverConfigBaseDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifySeverConfigBaseDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SeverConfigBase数据
     */
    public addSeverConfigBaseData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSeverConfigBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SeverConfigBase数组数据
     */
    public addSeverConfigBaseDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSeverConfigBaseDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SeverConfigBase
     */
    public removeSeverConfigBaseData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeSeverConfigBaseData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取SeverData数据
     */
    public SeverDataDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部SeverData数据
     */
    public SeverDataDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverDataDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条SeverData数据
     */
    public SeverDataDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","SeverDataDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单SeverData数组的指定属性，propertyName：属性名，value：值
     */
    public modifySeverDataDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifySeverDataDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个SeverData数据
     */
    public addSeverDataData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSeverDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加SeverData数组数据
     */
    public addSeverDataDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addSeverDataDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条SeverData
     */
    public removeSeverDataData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeSeverDataData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取TimeEvent数据
     */
    public TimeEventDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","TimeEventDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部TimeEvent数据
     */
    public TimeEventDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","TimeEventDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条TimeEvent数据
     */
    public TimeEventDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","TimeEventDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单TimeEvent数组的指定属性，propertyName：属性名，value：值
     */
    public modifyTimeEventDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyTimeEventDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个TimeEvent数据
     */
    public addTimeEventData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addTimeEventData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加TimeEvent数组数据
     */
    public addTimeEventDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addTimeEventDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条TimeEvent
     */
    public removeTimeEventData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeTimeEventData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取WalletErrLog数据
     */
    public WalletErrLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletErrLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部WalletErrLog数据
     */
    public WalletErrLogDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletErrLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条WalletErrLog数据
     */
    public WalletErrLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletErrLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单WalletErrLog数组的指定属性，propertyName：属性名，value：值
     */
    public modifyWalletErrLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyWalletErrLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个WalletErrLog数据
     */
    public addWalletErrLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addWalletErrLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加WalletErrLog数组数据
     */
    public addWalletErrLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addWalletErrLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条WalletErrLog
     */
    public removeWalletErrLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeWalletErrLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID获取WalletLog数据
     */
    public WalletLogDataById(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 获取全部WalletLog数据
     */
    public WalletLogDataGetAll() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletLogDataGetAll",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 通过ID数组获取多条WalletLog数据
     */
    public WalletLogDataByIds(ids) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(ids))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","WalletLogDataByIds",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 修改单WalletLog数组的指定属性，propertyName：属性名，value：值
     */
    public modifyWalletLogDataById(id, propertyName, value) {
        let paramJsons =`"a0":${JSON.stringify(id)},"a1":${JSON.stringify(propertyName)},"a2":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","modifyWalletLogDataById",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加一个WalletLog数据
     */
    public addWalletLogData(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addWalletLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 添加WalletLog数组数据
     */
    public addWalletLogDatas(value) {
        let paramJsons =`"a0":${JSON.stringify(JSON.stringify(value))},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","addWalletLogDatas",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除一条WalletLog
     */
    public removeWalletLogData(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ExcelManager","removeWalletLogData",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}