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

export class ProjectManagerRequest {
    public static get Instance(): ProjectManagerRequest {
        if (this._instance == null) {
            this._instance = new ProjectManagerRequest();
        }

        return this._instance;
    }
    private static _instance: ProjectManagerRequest;


    /***
     * 登录账号
     */
    public login(userName, pw) {
        let paramJsons =`"a0":${JSON.stringify(userName)},"a1":${JSON.stringify(pw)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","login",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 注册账号
     */
    public RegisterAnAccount(userName, pw) {
        let paramJsons =`"a0":${JSON.stringify(userName)},"a1":${JSON.stringify(pw)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","RegisterAnAccount",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除文件夹
     */
    public deleteDir(key) {
        let paramJsons =`"a0":${JSON.stringify(key)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","deleteDir",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 编译所有工程
     */
    public watchProject() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","watchProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 停止编译所有工程
     */
    public stopWatchProject() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","stopWatchProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 重新获取文件信息
     */
    public getFilesInfo(id) {
        let paramJsons =`"a0":${JSON.stringify(id)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","getFilesInfo",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 根据传入的路径打开VSCode
     */
    public openVSCode(vspath, openpath) {
        let paramJsons =`"a0":${JSON.stringify(vspath)},"a1":${JSON.stringify(openpath)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","openVSCode",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建Ts工程
     */
    public createTsProject(pareKey, dirName) {
        let paramJsons =`"a0":${JSON.stringify(pareKey)},"a1":${JSON.stringify(dirName)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","createTsProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建Ts文件
     */
    public createTsFile(pareKey, dirName) {
        let paramJsons =`"a0":${JSON.stringify(pareKey)},"a1":${JSON.stringify(dirName)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","createTsFile",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建文件夹
     */
    public createDir(pareKey, dirName) {
        let paramJsons =`"a0":${JSON.stringify(pareKey)},"a1":${JSON.stringify(dirName)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","createDir",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 重启编译监控
     */
    public reWatchDir() {
        let paramJsons =``;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","reWatchDir",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 重命名文件夹
     */
    public renameDir(key, newName) {
        let paramJsons =`"a0":${JSON.stringify(key)},"a1":${JSON.stringify(newName)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","renameDir",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 删除文件
     */
    public deleteFile(key) {
        let paramJsons =`"a0":${JSON.stringify(key)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","deleteFile",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 打开项目
     */
    public openProject(projectName) {
        let paramJsons =`"a0":${JSON.stringify(projectName)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","openProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 创建项目
     */
    public creatProject(projectName) {
        let paramJsons =`"a0":${JSON.stringify(projectName)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","creatProject",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 选中当前文件
     */
    public selectFileFun(path) {
        let paramJsons =`"a0":${JSON.stringify(path)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","selectFileFun",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 保存当前选中文件
     */
    public saveSelectClassFun(path) {
        let paramJsons =`"a0":${JSON.stringify(path)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","saveSelectClassFun",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 保存代码文件
     */
    public saveClassFun(path, content) {
        let paramJsons =`"a0":${JSON.stringify(path)},"a1":${JSON.stringify(content)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","saveClassFun",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 调用C++的dll生成导航文件
     */
    public createNavFile(configKey, fileKeys) {
        let paramJsons =`"a0":${JSON.stringify(configKey)},"a1":${JSON.stringify(fileKeys)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","createNavFile",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

    /***
     * 生成导航网格
     */
    public createNav(pathKey, config, fileInfos, lengthArray, objData) {
        let paramJsons =`"a0":${JSON.stringify(pathKey)},"a1":${JSON.stringify(config)},"a2":${JSON.stringify(fileInfos)},"a3":${JSON.stringify(lengthArray)},"a4":${JSON.stringify(objData)},`;
        let mess = WebsocketTool.Instance.getMsg("ProjectManager","createNav",`${paramJsons}`);
        NetWebscoket.Instance.sendStr(mess);
    }

}