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
import { ProjectManagerRequest } from "AutoCode/Net/ClientRequest/ProjectManagerRequest";
import { ClientData } from "ClientData";
import { Dictionary, List } from "../ServerData";

export class ProjectManager {
    public static get Instance(): ProjectManager {
        if (this._instance == null) {
            this._instance = new ProjectManager();
        }

        return this._instance;
    }
    private static _instance: ProjectManager;

    /**
     * 登录账号
     */
    public login(userName: string, pw: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.login(userName, pw);
    }
    /**
     * 注册账号
     */
    public RegisterAnAccount(userName: string, pw: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.RegisterAnAccount(userName, pw);
    }
    /**
     * 删除文件夹
     */
    public deleteDir(key: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.deleteDir(key);
    }
    /**
     * 编译所有工程
     */
    public watchProject(clientData: ClientData) {
        ProjectManagerRequest.Instance.watchProject();
    }
    /**
     * 停止编译所有工程
     */
    public stopWatchProject(clientData: ClientData) {
        ProjectManagerRequest.Instance.stopWatchProject();
    }
    /**
     * 重新获取文件信息
     */
    public getFilesInfo(id: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.getFilesInfo(id);
    }
    /**
     * 根据传入的路径打开VSCode
     */
    public openVSCode(vspath: string, openpath: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.openVSCode(vspath, openpath);
    }
    /**
     * 创建Ts工程
     */
    public createTsProject(pareKey: string, dirName: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.createTsProject(pareKey, dirName);
    }
    /**
     * 创建Ts文件
     */
    public createTsFile(pareKey: string, dirName: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.createTsFile(pareKey, dirName);
    }
    /**
     * 创建文件夹
     */
    public createDir(pareKey: string, dirName: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.createDir(pareKey, dirName);
    }
    /**
     * 重启编译监控
     */
    public reWatchDir(clientData: ClientData) {
        ProjectManagerRequest.Instance.reWatchDir();
    }
    /**
     * 重命名文件夹
     */
    public renameDir(key: string, newName: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.renameDir(key, newName);
    }
    /**
     * 删除文件
     */
    public deleteFile(key: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.deleteFile(key);
    }
    /**
     * 打开项目
     */
    public openProject(projectName: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.openProject(projectName);
    }
    /**
     * 创建项目
     */
    public creatProject(projectName: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.creatProject(projectName);
    }
    /**
     * 选中当前文件
     */
    public selectFileFun(path: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.selectFileFun(path);
    }
    /**
     * 保存当前选中文件
     */
    public saveSelectClassFun(path: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.saveSelectClassFun(path);
    }
    /**
     * 保存代码文件
     */
    public saveClassFun(path: string, content: string, clientData: ClientData) {
        ProjectManagerRequest.Instance.saveClassFun(path, content);
    }
    /**
     * 调用C++的dll生成导航文件
     */
    public createNavFile(configKey: string, fileKeys: string[], clientData: ClientData) {
        ProjectManagerRequest.Instance.createNavFile(configKey, fileKeys);
    }
    /**
     * 生成导航网格
     */
    public createNav(pathKey: string, config: any, fileInfos: number[], lengthArray: number[], objData: number[], clientData: ClientData) {
        ProjectManagerRequest.Instance.createNav(pathKey, config, fileInfos, lengthArray, objData);
    }
}