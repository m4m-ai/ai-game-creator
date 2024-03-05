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
import { ExcelManagerRequest } from "AutoCode/Net/ClientRequest/ExcelManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class ExcelManager {
    public static get Instance(): ExcelManager {
        if (this._instance == null) {
            this._instance = new ExcelManager();
        }

        return this._instance;
    }
    private static _instance: ExcelManager;

    /**
     * 通过ID获取BackGroundData数据
     */
    public BackGroundDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.BackGroundDataDataById(id);
    }
    /**
     * 获取全部BackGroundData数据
     */
    public BackGroundDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.BackGroundDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条BackGroundData数据
     */
    public BackGroundDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.BackGroundDataDataByIds(idsJson);
    }
    /**
     * 修改单BackGroundData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyBackGroundDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyBackGroundDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个BackGroundData数据
     */
    public addBackGroundDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addBackGroundDataData(valueJson);
    }
    /**
     * 添加BackGroundData数组数据
     */
    public addBackGroundDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addBackGroundDataDatas(valueJson);
    }
    /**
     * 删除一条BackGroundData
     */
    public removeBackGroundDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeBackGroundDataData(id);
    }
    /**
     * 通过ID获取BackStoryData数据
     */
    public BackStoryDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.BackStoryDataDataById(id);
    }
    /**
     * 获取全部BackStoryData数据
     */
    public BackStoryDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.BackStoryDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条BackStoryData数据
     */
    public BackStoryDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.BackStoryDataDataByIds(idsJson);
    }
    /**
     * 修改单BackStoryData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyBackStoryDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyBackStoryDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个BackStoryData数据
     */
    public addBackStoryDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addBackStoryDataData(valueJson);
    }
    /**
     * 添加BackStoryData数组数据
     */
    public addBackStoryDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addBackStoryDataDatas(valueJson);
    }
    /**
     * 删除一条BackStoryData
     */
    public removeBackStoryDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeBackStoryDataData(id);
    }
    /**
     * 通过ID获取ChapterData数据
     */
    public ChapterDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ChapterDataDataById(id);
    }
    /**
     * 获取全部ChapterData数据
     */
    public ChapterDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.ChapterDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条ChapterData数据
     */
    public ChapterDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ChapterDataDataByIds(idsJson);
    }
    /**
     * 修改单ChapterData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyChapterDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyChapterDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个ChapterData数据
     */
    public addChapterDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addChapterDataData(valueJson);
    }
    /**
     * 添加ChapterData数组数据
     */
    public addChapterDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addChapterDataDatas(valueJson);
    }
    /**
     * 删除一条ChapterData
     */
    public removeChapterDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeChapterDataData(id);
    }
    /**
     * 通过ID获取ChatMessageData数据
     */
    public ChatMessageDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ChatMessageDataDataById(id);
    }
    /**
     * 获取全部ChatMessageData数据
     */
    public ChatMessageDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.ChatMessageDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条ChatMessageData数据
     */
    public ChatMessageDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ChatMessageDataDataByIds(idsJson);
    }
    /**
     * 修改单ChatMessageData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyChatMessageDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyChatMessageDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个ChatMessageData数据
     */
    public addChatMessageDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addChatMessageDataData(valueJson);
    }
    /**
     * 添加ChatMessageData数组数据
     */
    public addChatMessageDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addChatMessageDataDatas(valueJson);
    }
    /**
     * 删除一条ChatMessageData
     */
    public removeChatMessageDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeChatMessageDataData(id);
    }
    /**
     * 通过ID获取DialogData数据
     */
    public DialogDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.DialogDataDataById(id);
    }
    /**
     * 获取全部DialogData数据
     */
    public DialogDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.DialogDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条DialogData数据
     */
    public DialogDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.DialogDataDataByIds(idsJson);
    }
    /**
     * 修改单DialogData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyDialogDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyDialogDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个DialogData数据
     */
    public addDialogDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addDialogDataData(valueJson);
    }
    /**
     * 添加DialogData数组数据
     */
    public addDialogDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addDialogDataDatas(valueJson);
    }
    /**
     * 删除一条DialogData
     */
    public removeDialogDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeDialogDataData(id);
    }
    /**
     * 通过ID获取GalData数据
     */
    public GalDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.GalDataDataById(id);
    }
    /**
     * 获取全部GalData数据
     */
    public GalDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.GalDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条GalData数据
     */
    public GalDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.GalDataDataByIds(idsJson);
    }
    /**
     * 修改单GalData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyGalDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyGalDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个GalData数据
     */
    public addGalDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addGalDataData(valueJson);
    }
    /**
     * 添加GalData数组数据
     */
    public addGalDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addGalDataDatas(valueJson);
    }
    /**
     * 删除一条GalData
     */
    public removeGalDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeGalDataData(id);
    }
    /**
     * 通过ID获取GalPreviewData数据
     */
    public GalPreviewDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.GalPreviewDataDataById(id);
    }
    /**
     * 获取全部GalPreviewData数据
     */
    public GalPreviewDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.GalPreviewDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条GalPreviewData数据
     */
    public GalPreviewDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.GalPreviewDataDataByIds(idsJson);
    }
    /**
     * 修改单GalPreviewData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyGalPreviewDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyGalPreviewDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个GalPreviewData数据
     */
    public addGalPreviewDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addGalPreviewDataData(valueJson);
    }
    /**
     * 添加GalPreviewData数组数据
     */
    public addGalPreviewDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addGalPreviewDataDatas(valueJson);
    }
    /**
     * 删除一条GalPreviewData
     */
    public removeGalPreviewDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeGalPreviewDataData(id);
    }
    /**
     * 通过ID获取LanguageData数据
     */
    public LanguageDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.LanguageDataDataById(id);
    }
    /**
     * 获取全部LanguageData数据
     */
    public LanguageDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.LanguageDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条LanguageData数据
     */
    public LanguageDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.LanguageDataDataByIds(idsJson);
    }
    /**
     * 修改单LanguageData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyLanguageDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyLanguageDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个LanguageData数据
     */
    public addLanguageDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addLanguageDataData(valueJson);
    }
    /**
     * 添加LanguageData数组数据
     */
    public addLanguageDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addLanguageDataDatas(valueJson);
    }
    /**
     * 删除一条LanguageData
     */
    public removeLanguageDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeLanguageDataData(id);
    }
    /**
     * 通过ID获取LanguageDataCN数据
     */
    public LanguageDataCNDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.LanguageDataCNDataById(id);
    }
    /**
     * 获取全部LanguageDataCN数据
     */
    public LanguageDataCNDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.LanguageDataCNDataGetAll();
    }
    /**
     * 通过ID数组获取多条LanguageDataCN数据
     */
    public LanguageDataCNDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.LanguageDataCNDataByIds(idsJson);
    }
    /**
     * 修改单LanguageDataCN数组的指定属性，propertyName：属性名，value：值
     */
    public modifyLanguageDataCNDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyLanguageDataCNDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个LanguageDataCN数据
     */
    public addLanguageDataCNData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addLanguageDataCNData(valueJson);
    }
    /**
     * 添加LanguageDataCN数组数据
     */
    public addLanguageDataCNDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addLanguageDataCNDatas(valueJson);
    }
    /**
     * 删除一条LanguageDataCN
     */
    public removeLanguageDataCNData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeLanguageDataCNData(id);
    }
    /**
     * 通过ID获取ProjectData数据
     */
    public ProjectDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ProjectDataDataById(id);
    }
    /**
     * 获取全部ProjectData数据
     */
    public ProjectDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.ProjectDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条ProjectData数据
     */
    public ProjectDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ProjectDataDataByIds(idsJson);
    }
    /**
     * 修改单ProjectData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyProjectDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyProjectDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个ProjectData数据
     */
    public addProjectDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addProjectDataData(valueJson);
    }
    /**
     * 添加ProjectData数组数据
     */
    public addProjectDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addProjectDataDatas(valueJson);
    }
    /**
     * 删除一条ProjectData
     */
    public removeProjectDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeProjectDataData(id);
    }
    /**
     * 通过ID获取GalRoleData数据
     */
    public GalRoleDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.GalRoleDataDataById(id);
    }
    /**
     * 获取全部GalRoleData数据
     */
    public GalRoleDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.GalRoleDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条GalRoleData数据
     */
    public GalRoleDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.GalRoleDataDataByIds(idsJson);
    }
    /**
     * 修改单GalRoleData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyGalRoleDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyGalRoleDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个GalRoleData数据
     */
    public addGalRoleDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addGalRoleDataData(valueJson);
    }
    /**
     * 添加GalRoleData数组数据
     */
    public addGalRoleDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addGalRoleDataDatas(valueJson);
    }
    /**
     * 删除一条GalRoleData
     */
    public removeGalRoleDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeGalRoleDataData(id);
    }
    /**
     * 通过ID获取SceneData数据
     */
    public SceneDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.SceneDataDataById(id);
    }
    /**
     * 获取全部SceneData数据
     */
    public SceneDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.SceneDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条SceneData数据
     */
    public SceneDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.SceneDataDataByIds(idsJson);
    }
    /**
     * 修改单SceneData数组的指定属性，propertyName：属性名，value：值
     */
    public modifySceneDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifySceneDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个SceneData数据
     */
    public addSceneDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addSceneDataData(valueJson);
    }
    /**
     * 添加SceneData数组数据
     */
    public addSceneDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addSceneDataDatas(valueJson);
    }
    /**
     * 删除一条SceneData
     */
    public removeSceneDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeSceneDataData(id);
    }
    /**
     * 通过ID获取UserProjectData数据
     */
    public UserProjectDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.UserProjectDataDataById(id);
    }
    /**
     * 获取全部UserProjectData数据
     */
    public UserProjectDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.UserProjectDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条UserProjectData数据
     */
    public UserProjectDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.UserProjectDataDataByIds(idsJson);
    }
    /**
     * 修改单UserProjectData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyUserProjectDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyUserProjectDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个UserProjectData数据
     */
    public addUserProjectDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addUserProjectDataData(valueJson);
    }
    /**
     * 添加UserProjectData数组数据
     */
    public addUserProjectDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addUserProjectDataDatas(valueJson);
    }
    /**
     * 删除一条UserProjectData
     */
    public removeUserProjectDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeUserProjectDataData(id);
    }
    /**
     * 通过ID获取VoiceBase数据
     */
    public VoiceBaseDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.VoiceBaseDataById(id);
    }
    /**
     * 获取全部VoiceBase数据
     */
    public VoiceBaseDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.VoiceBaseDataGetAll();
    }
    /**
     * 通过ID数组获取多条VoiceBase数据
     */
    public VoiceBaseDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.VoiceBaseDataByIds(idsJson);
    }
    /**
     * 修改单VoiceBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifyVoiceBaseDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyVoiceBaseDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个VoiceBase数据
     */
    public addVoiceBaseData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addVoiceBaseData(valueJson);
    }
    /**
     * 添加VoiceBase数组数据
     */
    public addVoiceBaseDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addVoiceBaseDatas(valueJson);
    }
    /**
     * 删除一条VoiceBase
     */
    public removeVoiceBaseData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeVoiceBaseData(id);
    }
    /**
     * 通过ID获取ErrorInfo数据
     */
    public ErrorInfoDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ErrorInfoDataById(id);
    }
    /**
     * 获取全部ErrorInfo数据
     */
    public ErrorInfoDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.ErrorInfoDataGetAll();
    }
    /**
     * 通过ID数组获取多条ErrorInfo数据
     */
    public ErrorInfoDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ErrorInfoDataByIds(idsJson);
    }
    /**
     * 修改单ErrorInfo数组的指定属性，propertyName：属性名，value：值
     */
    public modifyErrorInfoDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyErrorInfoDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个ErrorInfo数据
     */
    public addErrorInfoData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addErrorInfoData(valueJson);
    }
    /**
     * 添加ErrorInfo数组数据
     */
    public addErrorInfoDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addErrorInfoDatas(valueJson);
    }
    /**
     * 删除一条ErrorInfo
     */
    public removeErrorInfoData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeErrorInfoData(id);
    }
    /**
     * 通过ID获取Formulas数据
     */
    public FormulasDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.FormulasDataById(id);
    }
    /**
     * 获取全部Formulas数据
     */
    public FormulasDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.FormulasDataGetAll();
    }
    /**
     * 通过ID数组获取多条Formulas数据
     */
    public FormulasDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.FormulasDataByIds(idsJson);
    }
    /**
     * 修改单Formulas数组的指定属性，propertyName：属性名，value：值
     */
    public modifyFormulasDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyFormulasDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个Formulas数据
     */
    public addFormulasData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addFormulasData(valueJson);
    }
    /**
     * 添加Formulas数组数据
     */
    public addFormulasDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addFormulasDatas(valueJson);
    }
    /**
     * 删除一条Formulas
     */
    public removeFormulasData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeFormulasData(id);
    }
    /**
     * 通过ID获取ServerLog数据
     */
    public ServerLogDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ServerLogDataById(id);
    }
    /**
     * 获取全部ServerLog数据
     */
    public ServerLogDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.ServerLogDataGetAll();
    }
    /**
     * 通过ID数组获取多条ServerLog数据
     */
    public ServerLogDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ServerLogDataByIds(idsJson);
    }
    /**
     * 修改单ServerLog数组的指定属性，propertyName：属性名，value：值
     */
    public modifyServerLogDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyServerLogDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个ServerLog数据
     */
    public addServerLogData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addServerLogData(valueJson);
    }
    /**
     * 添加ServerLog数组数据
     */
    public addServerLogDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addServerLogDatas(valueJson);
    }
    /**
     * 删除一条ServerLog
     */
    public removeServerLogData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeServerLogData(id);
    }
    /**
     * 通过ID获取ServerUserData数据
     */
    public ServerUserDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ServerUserDataDataById(id);
    }
    /**
     * 获取全部ServerUserData数据
     */
    public ServerUserDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.ServerUserDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条ServerUserData数据
     */
    public ServerUserDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.ServerUserDataDataByIds(idsJson);
    }
    /**
     * 修改单ServerUserData数组的指定属性，propertyName：属性名，value：值
     */
    public modifyServerUserDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyServerUserDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个ServerUserData数据
     */
    public addServerUserDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addServerUserDataData(valueJson);
    }
    /**
     * 添加ServerUserData数组数据
     */
    public addServerUserDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addServerUserDataDatas(valueJson);
    }
    /**
     * 删除一条ServerUserData
     */
    public removeServerUserDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeServerUserDataData(id);
    }
    /**
     * 通过ID获取SeverConfigBase数据
     */
    public SeverConfigBaseDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.SeverConfigBaseDataById(id);
    }
    /**
     * 获取全部SeverConfigBase数据
     */
    public SeverConfigBaseDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.SeverConfigBaseDataGetAll();
    }
    /**
     * 通过ID数组获取多条SeverConfigBase数据
     */
    public SeverConfigBaseDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.SeverConfigBaseDataByIds(idsJson);
    }
    /**
     * 修改单SeverConfigBase数组的指定属性，propertyName：属性名，value：值
     */
    public modifySeverConfigBaseDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifySeverConfigBaseDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个SeverConfigBase数据
     */
    public addSeverConfigBaseData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addSeverConfigBaseData(valueJson);
    }
    /**
     * 添加SeverConfigBase数组数据
     */
    public addSeverConfigBaseDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addSeverConfigBaseDatas(valueJson);
    }
    /**
     * 删除一条SeverConfigBase
     */
    public removeSeverConfigBaseData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeSeverConfigBaseData(id);
    }
    /**
     * 通过ID获取SeverData数据
     */
    public SeverDataDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.SeverDataDataById(id);
    }
    /**
     * 获取全部SeverData数据
     */
    public SeverDataDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.SeverDataDataGetAll();
    }
    /**
     * 通过ID数组获取多条SeverData数据
     */
    public SeverDataDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.SeverDataDataByIds(idsJson);
    }
    /**
     * 修改单SeverData数组的指定属性，propertyName：属性名，value：值
     */
    public modifySeverDataDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifySeverDataDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个SeverData数据
     */
    public addSeverDataData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addSeverDataData(valueJson);
    }
    /**
     * 添加SeverData数组数据
     */
    public addSeverDataDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addSeverDataDatas(valueJson);
    }
    /**
     * 删除一条SeverData
     */
    public removeSeverDataData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeSeverDataData(id);
    }
    /**
     * 通过ID获取TimeEvent数据
     */
    public TimeEventDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.TimeEventDataById(id);
    }
    /**
     * 获取全部TimeEvent数据
     */
    public TimeEventDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.TimeEventDataGetAll();
    }
    /**
     * 通过ID数组获取多条TimeEvent数据
     */
    public TimeEventDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.TimeEventDataByIds(idsJson);
    }
    /**
     * 修改单TimeEvent数组的指定属性，propertyName：属性名，value：值
     */
    public modifyTimeEventDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyTimeEventDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个TimeEvent数据
     */
    public addTimeEventData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addTimeEventData(valueJson);
    }
    /**
     * 添加TimeEvent数组数据
     */
    public addTimeEventDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addTimeEventDatas(valueJson);
    }
    /**
     * 删除一条TimeEvent
     */
    public removeTimeEventData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeTimeEventData(id);
    }
    /**
     * 通过ID获取WalletErrLog数据
     */
    public WalletErrLogDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.WalletErrLogDataById(id);
    }
    /**
     * 获取全部WalletErrLog数据
     */
    public WalletErrLogDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.WalletErrLogDataGetAll();
    }
    /**
     * 通过ID数组获取多条WalletErrLog数据
     */
    public WalletErrLogDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.WalletErrLogDataByIds(idsJson);
    }
    /**
     * 修改单WalletErrLog数组的指定属性，propertyName：属性名，value：值
     */
    public modifyWalletErrLogDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyWalletErrLogDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个WalletErrLog数据
     */
    public addWalletErrLogData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addWalletErrLogData(valueJson);
    }
    /**
     * 添加WalletErrLog数组数据
     */
    public addWalletErrLogDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addWalletErrLogDatas(valueJson);
    }
    /**
     * 删除一条WalletErrLog
     */
    public removeWalletErrLogData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeWalletErrLogData(id);
    }
    /**
     * 通过ID获取WalletLog数据
     */
    public WalletLogDataById(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.WalletLogDataById(id);
    }
    /**
     * 获取全部WalletLog数据
     */
    public WalletLogDataGetAll(clientData: ClientData) {
        ExcelManagerRequest.Instance.WalletLogDataGetAll();
    }
    /**
     * 通过ID数组获取多条WalletLog数据
     */
    public WalletLogDataByIds(idsJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.WalletLogDataByIds(idsJson);
    }
    /**
     * 修改单WalletLog数组的指定属性，propertyName：属性名，value：值
     */
    public modifyWalletLogDataById(id: any, propertyName: any, valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.modifyWalletLogDataById(id, propertyName, valueJson);
    }
    /**
     * 添加一个WalletLog数据
     */
    public addWalletLogData(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addWalletLogData(valueJson);
    }
    /**
     * 添加WalletLog数组数据
     */
    public addWalletLogDatas(valueJson: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.addWalletLogDatas(valueJson);
    }
    /**
     * 删除一条WalletLog
     */
    public removeWalletLogData(id: any, clientData: ClientData) {
        ExcelManagerRequest.Instance.removeWalletLogData(id);
    }
}