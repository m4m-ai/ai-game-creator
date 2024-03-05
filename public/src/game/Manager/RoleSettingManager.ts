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
import { GalRoleData } from "GalRoleData";
import { GameProjectManager } from "./GameProjectManager";

export class RoleSettingManager {
    public static get instance(): RoleSettingManager {
        return this._instance;
    }
    private static _instance: RoleSettingManager = new RoleSettingManager();
    private constructor() {
        //后续这里需要监听 角色数据更新
    }
    //当前编辑的角色id
    public currentRoleID = "";
    //当前编辑的角色数据
    public currentRoleData: GalRoleData;
    //本地存储数据  外层字典的key为项目的id 即galdata的id  内层字典则为角色的 roleid 即 galroledata 的id
    // public galRoleDataDic: cMap<cMap<GalRoleData>> = new cMap<cMap<GalRoleData>>();

    public newGalRoleDataDic: cMap<Array<GalRoleData>> = new cMap<Array<GalRoleData>>();

    public init() {
        if (this.currentRoleData == null) {
            this.currentRoleData = new GalRoleData();
        }
    }
    // public currentRoleList: Array<GalRoleData> = new Array<GalRoleData>();
    // public getCurrentRoleDataArr(): GalRoleData[] {
    //     if (this.currentRoleList) {
    //         for (let i = 0; i < this.currentRoleList.length; i++) {
    //             this.currentRoleList[i] = null;
    //         }
    //         this.currentRoleList.length = 0;
    //     } else {
    //         this.currentRoleList = new Array<GalRoleData>();
    //     }
    //     console.log("AI 资源库角色数据字典 --- ", RoleSettingManager.instance.galRoleDataDic);
    //     if (RoleSettingManager.instance.galRoleDataDic.has(GameProjectManager.instance.currentGalData.id)) {
    //         let roleMap = RoleSettingManager.instance.galRoleDataDic.get(GameProjectManager.instance.currentGalData.id);

    //         roleMap.forEach((value: GalRoleData) => {
    //             this.currentRoleList.push(value);
    //         });
    //         let emptyRoleData: GalRoleData = new GalRoleData();
    //         emptyRoleData.id = "";
    //         this.currentRoleList.push(emptyRoleData);
    //     } else {
    //         let emptyRoleData: GalRoleData = new GalRoleData();
    //         emptyRoleData.id = "";
    //         this.currentRoleList.push(emptyRoleData);
    //     }
    //     console.log("角色数据  ---- ", this.currentRoleList);
    //     return this.currentRoleList;
    // }

    // /** 获取当前工程所有的角色 */
    // public getCurrentProjectRoles() {
    //     return this.galRoleDataDic.get(GameProjectManager.instance.currentGalData.id);
    // }
    public newGetCurrentProjectRoles() {
        return this.newGalRoleDataDic.get(GameProjectManager.instance.currentGalData.id);
    }
    //获取当前工程的角色数组
    public newGetCurentProjectRoles() {
        let roleArr = new Array<GalRoleData>();
        if (this.newGalRoleDataDic.has(GameProjectManager.instance.currentGalData.id)) {
            roleArr = this.newGalRoleDataDic.get(GameProjectManager.instance.currentGalData.id);
            return roleArr;
        } else {
            let emptyRoleData: GalRoleData = new GalRoleData();
            emptyRoleData.id = "";
            roleArr.push(emptyRoleData);
            // this.newGalRoleDataDic.set(GameProjectManager.instance.currentGalData.id, roleArr);
            return roleArr;
        }
    }

    // public getRoleData(roleID: string) {
    //     let role = this.currentRoleList.find(value => value.id == roleID);
    //     if (role == null) {
    //         console.log("没有该角色数据");
    //         return;
    //     }
    //     return role;
    // }

    // public deleteRoleData(roleID: string) {
    //     let roleIndex = this.currentRoleList.findIndex(value => value.id == roleID);
    //     if (roleIndex == -1) {
    //         console.log("没有该角色数据")
    //         return;
    //     }
    //     this.currentRoleList.splice(roleIndex, 1);
    // }

    // public addRoleData(role: GalRoleData) {
    //     let roleIndex = this.currentRoleList.findIndex(value => value.id == role.id);
    //     if (roleIndex != -1) {
    //         console.log("当前角色数据已经存在了! 修改当前已有角色的数据");
    //         let roledata = this.currentRoleList[roleIndex];
    //         roledata.RoleName = role.RoleName;
    //         roledata.Profile = role.Profile;
    //         roledata.roleDrawing = role.roleDrawing;
    //         // return;
    //     } else {
    //         console.log("添加新角色！");
    //         this.currentRoleList.push(role);
    //     }
    // }

    // public getCurrentProjectRoleByName(roleNae: string) {
    //     let roles = this.getCurrentProjectRoles();
    //     if (roles) {
    //         let data = roles["data"];
    //         for (let key in data) {
    //             let role: Entity.GalRoleData = data[key];
    //             if (role.RoleName === roleNae) {
    //                 return role;
    //             }
    //         }
    //     }
    //     return null;
    // }
    /** 通过角色名 从当前项目中获取角色 galroleData数据*/
    public newGetCurrentProjectRoleByName(roleName: string) {
        let roleArr = this.newGetCurrentProjectRoles();
        let roleIndex = roleArr.findIndex(value => value.RoleName == roleName);
        if (roleIndex != -1) {
            return roleArr[roleIndex];
        } else {
            return null;
        }
    }
    public newAddRoleData(role: GalRoleData) {
        if (this.newGalRoleDataDic.has(GameProjectManager.instance.currentGalData.id)) {
            let roleArr = this.newGalRoleDataDic.get(GameProjectManager.instance.currentGalData.id);
            let roleIndex = roleArr.findIndex(value => value.id == role.id);
            if (roleIndex != -1) {
                console.log("当前角色数据已经存在了! 修改当前已有角色的数据");
                let roledata = roleArr[roleIndex];
                roledata.RoleName = role.RoleName;
                roledata.Profile = role.Profile;
                roledata.roleDrawing = role.roleDrawing;
                // return;
            } else {
                console.log("添加新角色！");
                let index = roleArr.length - 1;
                roleArr.splice(index, 0, role);
                // this.currentRoleList.push(role);
            }
        } else {
            let emptyRoleData: GalRoleData = new GalRoleData();
            emptyRoleData.id = "";
            let arr = new Array<GalRoleData>();
            arr.push(role);
            arr.push(emptyRoleData);
            this.newGalRoleDataDic.set(GameProjectManager.instance.currentGalData.id, arr);
        }
    }

    /**本地删除角色 */
    public deleteRoleData(roleId: string) {
        if (this.newGalRoleDataDic.has(GameProjectManager.instance.currentGalData.id)) {
            let roleArr = this.newGalRoleDataDic.get(GameProjectManager.instance.currentGalData.id);
            let roleIndex = roleArr.findIndex(value => value.id == roleId);
            if (roleIndex != -1) {
                roleArr.splice(roleIndex, 1);
            }
        }
    }

    /**本地重命名 */
    public renameRole(roleId: string, newName: string) {
        if (this.newGalRoleDataDic.has(GameProjectManager.instance.currentGalData.id)) {
            let roleArr = this.newGalRoleDataDic.get(GameProjectManager.instance.currentGalData.id);
            let roleIndex = roleArr.findIndex(value => value.id == roleId);
            if (roleIndex != -1) {
                let roledata = roleArr[roleIndex];
                roledata.RoleName = newName;
            }
        }
    }

    //生成角色uuid
    public creatUuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23];

        var uuid = s.join("");
        return uuid;
    }

    public dispose() {

    }
}
