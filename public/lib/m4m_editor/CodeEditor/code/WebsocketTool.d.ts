import { NetData } from "./NetData";
export declare class WebsocketTool {
    static get Instance(): WebsocketTool;
    private static _instance;
    onmessage(netData: NetData): boolean;
    getMsg(className: any, functionName: any, text: any): string;
    /***
     * 通过ID获取ProjectData数据
     */
    ExcelManager_ProjectDataDataById(id: any): void;
    /***
     * 获取全部ProjectData数据
     */
    ExcelManager_ProjectDataDataGetAll(): void;
    /***
     * 通过ID数组获取多条ProjectData数据
     */
    ExcelManager_ProjectDataDataByIds(ids: any): void;
    /***
     * 修改单ProjectData数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyProjectDataDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个ProjectData数据
     */
    ExcelManager_addProjectDataData(value: any): void;
    /***
     * 添加ProjectData数组数据
     */
    ExcelManager_addProjectDataDatas(value: any): void;
    /***
     * 删除一条ProjectData
     */
    ExcelManager_removeProjectDataData(id: any): void;
    /***
     * 通过ID获取UserProjectData数据
     */
    ExcelManager_UserProjectDataDataById(id: any): void;
    /***
     * 获取全部UserProjectData数据
     */
    ExcelManager_UserProjectDataDataGetAll(): void;
    /***
     * 通过ID数组获取多条UserProjectData数据
     */
    ExcelManager_UserProjectDataDataByIds(ids: any): void;
    /***
     * 修改单UserProjectData数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyUserProjectDataDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个UserProjectData数据
     */
    ExcelManager_addUserProjectDataData(value: any): void;
    /***
     * 添加UserProjectData数组数据
     */
    ExcelManager_addUserProjectDataDatas(value: any): void;
    /***
     * 删除一条UserProjectData
     */
    ExcelManager_removeUserProjectDataData(id: any): void;
    /***
     * 通过ID获取ErrorInfo数据
     */
    ExcelManager_ErrorInfoDataById(id: any): void;
    /***
     * 获取全部ErrorInfo数据
     */
    ExcelManager_ErrorInfoDataGetAll(): void;
    /***
     * 通过ID数组获取多条ErrorInfo数据
     */
    ExcelManager_ErrorInfoDataByIds(ids: any): void;
    /***
     * 修改单ErrorInfo数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyErrorInfoDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个ErrorInfo数据
     */
    ExcelManager_addErrorInfoData(value: any): void;
    /***
     * 添加ErrorInfo数组数据
     */
    ExcelManager_addErrorInfoDatas(value: any): void;
    /***
     * 删除一条ErrorInfo
     */
    ExcelManager_removeErrorInfoData(id: any): void;
    /***
     * 通过ID获取Formulas数据
     */
    ExcelManager_FormulasDataById(id: any): void;
    /***
     * 获取全部Formulas数据
     */
    ExcelManager_FormulasDataGetAll(): void;
    /***
     * 通过ID数组获取多条Formulas数据
     */
    ExcelManager_FormulasDataByIds(ids: any): void;
    /***
     * 修改单Formulas数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyFormulasDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个Formulas数据
     */
    ExcelManager_addFormulasData(value: any): void;
    /***
     * 添加Formulas数组数据
     */
    ExcelManager_addFormulasDatas(value: any): void;
    /***
     * 删除一条Formulas
     */
    ExcelManager_removeFormulasData(id: any): void;
    /***
     * 通过ID获取ServerLog数据
     */
    ExcelManager_ServerLogDataById(id: any): void;
    /***
     * 获取全部ServerLog数据
     */
    ExcelManager_ServerLogDataGetAll(): void;
    /***
     * 通过ID数组获取多条ServerLog数据
     */
    ExcelManager_ServerLogDataByIds(ids: any): void;
    /***
     * 修改单ServerLog数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyServerLogDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个ServerLog数据
     */
    ExcelManager_addServerLogData(value: any): void;
    /***
     * 添加ServerLog数组数据
     */
    ExcelManager_addServerLogDatas(value: any): void;
    /***
     * 删除一条ServerLog
     */
    ExcelManager_removeServerLogData(id: any): void;
    /***
     * 通过ID获取ServerUserData数据
     */
    ExcelManager_ServerUserDataDataById(id: any): void;
    /***
     * 获取全部ServerUserData数据
     */
    ExcelManager_ServerUserDataDataGetAll(): void;
    /***
     * 通过ID数组获取多条ServerUserData数据
     */
    ExcelManager_ServerUserDataDataByIds(ids: any): void;
    /***
     * 修改单ServerUserData数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyServerUserDataDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个ServerUserData数据
     */
    ExcelManager_addServerUserDataData(value: any): void;
    /***
     * 添加ServerUserData数组数据
     */
    ExcelManager_addServerUserDataDatas(value: any): void;
    /***
     * 删除一条ServerUserData
     */
    ExcelManager_removeServerUserDataData(id: any): void;
    /***
     * 通过ID获取SeverConfigBase数据
     */
    ExcelManager_SeverConfigBaseDataById(id: any): void;
    /***
     * 获取全部SeverConfigBase数据
     */
    ExcelManager_SeverConfigBaseDataGetAll(): void;
    /***
     * 通过ID数组获取多条SeverConfigBase数据
     */
    ExcelManager_SeverConfigBaseDataByIds(ids: any): void;
    /***
     * 修改单SeverConfigBase数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifySeverConfigBaseDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个SeverConfigBase数据
     */
    ExcelManager_addSeverConfigBaseData(value: any): void;
    /***
     * 添加SeverConfigBase数组数据
     */
    ExcelManager_addSeverConfigBaseDatas(value: any): void;
    /***
     * 删除一条SeverConfigBase
     */
    ExcelManager_removeSeverConfigBaseData(id: any): void;
    /***
     * 通过ID获取SeverData数据
     */
    ExcelManager_SeverDataDataById(id: any): void;
    /***
     * 获取全部SeverData数据
     */
    ExcelManager_SeverDataDataGetAll(): void;
    /***
     * 通过ID数组获取多条SeverData数据
     */
    ExcelManager_SeverDataDataByIds(ids: any): void;
    /***
     * 修改单SeverData数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifySeverDataDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个SeverData数据
     */
    ExcelManager_addSeverDataData(value: any): void;
    /***
     * 添加SeverData数组数据
     */
    ExcelManager_addSeverDataDatas(value: any): void;
    /***
     * 删除一条SeverData
     */
    ExcelManager_removeSeverDataData(id: any): void;
    /***
     * 通过ID获取TimeEvent数据
     */
    ExcelManager_TimeEventDataById(id: any): void;
    /***
     * 获取全部TimeEvent数据
     */
    ExcelManager_TimeEventDataGetAll(): void;
    /***
     * 通过ID数组获取多条TimeEvent数据
     */
    ExcelManager_TimeEventDataByIds(ids: any): void;
    /***
     * 修改单TimeEvent数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyTimeEventDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个TimeEvent数据
     */
    ExcelManager_addTimeEventData(value: any): void;
    /***
     * 添加TimeEvent数组数据
     */
    ExcelManager_addTimeEventDatas(value: any): void;
    /***
     * 删除一条TimeEvent
     */
    ExcelManager_removeTimeEventData(id: any): void;
    /***
     * 通过ID获取WalletErrLog数据
     */
    ExcelManager_WalletErrLogDataById(id: any): void;
    /***
     * 获取全部WalletErrLog数据
     */
    ExcelManager_WalletErrLogDataGetAll(): void;
    /***
     * 通过ID数组获取多条WalletErrLog数据
     */
    ExcelManager_WalletErrLogDataByIds(ids: any): void;
    /***
     * 修改单WalletErrLog数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyWalletErrLogDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个WalletErrLog数据
     */
    ExcelManager_addWalletErrLogData(value: any): void;
    /***
     * 添加WalletErrLog数组数据
     */
    ExcelManager_addWalletErrLogDatas(value: any): void;
    /***
     * 删除一条WalletErrLog
     */
    ExcelManager_removeWalletErrLogData(id: any): void;
    /***
     * 通过ID获取WalletLog数据
     */
    ExcelManager_WalletLogDataById(id: any): void;
    /***
     * 获取全部WalletLog数据
     */
    ExcelManager_WalletLogDataGetAll(): void;
    /***
     * 通过ID数组获取多条WalletLog数据
     */
    ExcelManager_WalletLogDataByIds(ids: any): void;
    /***
     * 修改单WalletLog数组的指定属性，propertyName：属性名，value：值
     */
    ExcelManager_modifyWalletLogDataById(id: any, propertyName: any, value: any): void;
    /***
     * 添加一个WalletLog数据
     */
    ExcelManager_addWalletLogData(value: any): void;
    /***
     * 添加WalletLog数组数据
     */
    ExcelManager_addWalletLogDatas(value: any): void;
    /***
     * 删除一条WalletLog
     */
    ExcelManager_removeWalletLogData(id: any): void;
    /***
     * 导出3D Prefab
     */
    PrefabExport_exportPrefab3D(dirKey: any, fileName: any, json: any): void;
    /***
     * 导出Scene
     */
    PrefabExport_exportScene(dirKey: any, fileName: any, json: any, fog: any): void;
    /***
     * testtesttest
     */
    PrefabExport_testExport(json: any): void;
    /***
     * 导出2D Prefab
     */
    PrefabExport_exportPrefab2D(dirKey: any, fileName: any, json: any): void;
    /***
     * 登录账号
     */
    ProjectManager_login(userName: any, pw: any): void;
    /***
     * 删除文件夹
     */
    ProjectManager_deleteDir(key: any): void;
    /***
     * 编译所有工程
     */
    ProjectManager_watchProject(): void;
    /***
     * 停止编译所有工程
     */
    ProjectManager_stopWatchProject(): void;
    /***
     * 重新获取文件信息
     */
    ProjectManager_getFilesInfo(id: any): void;
    /***
     * 根据传入的路径打开VSCode
     */
    ProjectManager_openVSCode(vspath: any, openpath: any): void;
    /***
     * 创建Ts工程
     */
    ProjectManager_createTsProject(pareKey: any, dirName: any): void;
    /***
     * 创建Ts文件
     */
    ProjectManager_createTsFile(pareKey: any, dirName: any): void;
    /***
     * 创建文件夹
     */
    ProjectManager_createDir(pareKey: any, dirName: any): void;
    /***
     * 重启编译监控
     */
    ProjectManager_reWatchDir(): void;
    /***
     * 重命名文件夹
     */
    ProjectManager_renameDir(key: any, newName: any): void;
    /***
     * 删除文件
     */
    ProjectManager_deleteFile(key: any): void;
    /***
     * 打开项目
     */
    ProjectManager_openProject(projectName: any): void;
    /***
     * 创建项目
     */
    ProjectManager_creatProject(projectName: any): void;
    /***
     * 选中当前文件
     */
    ProjectManager_selectFileFun(path: any): void;
    /***
     * 保存当前选中文件
     */
    ProjectManager_saveSelectClassFun(path: any): void;
    /***
     * 保存代码文件
     */
    ProjectManager_saveClassFun(path: any, content: any): void;
    /***
     * 调用C++的dll生成导航文件
     */
    ProjectManager_createNavFile(configKey: any, fileKeys: any): void;
    /***
     * 生成导航网格
     */
    ProjectManager_createNav(pathKey: any, config: any, fileInfos: any, lengthArray: any, objData: any): void;
    /***
     * 记录客户端异常消息
     */
    ErrorInfoManager_CreateErrorInfo(message: any, modelType: any): void;
    /***
     * callService
     */
    FrontDataManager_callService(className: any, funcName: any, args: any): void;
    /***
     * callFunc
     */
    FrontDataManager_callFunc(tableName: any, funcName: any, args: any): void;
    /***
     * 下载自动代码
     */
    AutoCodeManager_DownloadAutoCode(): void;
    /***
     * 修改表数据
     */
    GmToolsManager_setTableDatas(tableName: any, tableDatas: any): void;
    /***
     * 获取表数据
     */
    GmToolsManager_getATableDatas(tableName: any): void;
    /***
     * 备份数据库
     */
    MySqlManager_copyMySqlClient(PW: any): void;
    /***
     * 还原数据库
     */
    MySqlManager_uploadDataClien(PW: any): void;
    /***
     * 修改服务器时间,time：修改时间 （格式 2022-09-10  00:00:00）
     */
    ServerManager_timePlus(time: any): void;
    /***
     * 修改开服时间,time：时间 （格式 2022-09-10  00:00:00）
     */
    ServerManager_openTimePlus(time: any): void;
    /***
     * 心跳检测
     */
    ServerManager_heartBeat(): void;
    /***
     * 延迟检测
     */
    ServerManager_ping(): void;
    /***
     * 获取服务器时间
     */
    ServerManager_servertime(): void;
}
