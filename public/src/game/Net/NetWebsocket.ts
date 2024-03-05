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
import { CDManage } from "Time/CDManage";
import { WebsocketTool } from "../AutoCode/Net/WebsocketTool";
import { NetData } from "./NetData";
import { PingTimeManager } from "./PingTimeManager";
import { FileInfoManager } from "m4m_editor/CodeEditor/code/FileInfoManager";
import { ExportManager } from "m4m_editor/Game/ExportManager/ExportManager";
import { EditorEventMgr } from "m4m_editor/Game/Event/EditorEventMgr";
import { UiDataManager } from "PSDUI/UiDataManager";
import { BindKeyName } from "../Data/BindKeyName";
import { UIOpenOrHideManager } from "../Manager/UIOpenOrHideManager";
import { SkipBoxManager } from "../Manager/SkipBoxManager";
import { AppMain } from "../appMain";

export class NetWebscoket {

    public static get Instance(): NetWebscoket {
        if (this._instance == null) {
            this._instance = new NetWebscoket();
        }

        return this._instance;
    }
    /**********是否需要请求 配置数据***********
    */
    public static reqconfigMes: boolean = true;
    public fuck: string = "";

    private static _instance: NetWebscoket;
    private _webscoket: WebSocket;
    //是否连接过服务器
    private _connected = false;
    public connect(url: string) {
        // console.log("开始链接服务器*** " + url);
        // this._webscoket = new WebSocket(url);//"wss://hse-dev-qq.upaidui.com"
        if (url == null) {
            console.error("服务器 地址出错！" + url);
            return;
        }
        // url = "wss://kingzet.cn";
        console.log("开始链接服务器 " + url);
        this._webscoket = new WebSocket(url) as any;
        this._webscoket["onmessage"] = this.onmessage.bind(this);
        this._webscoket["onopen"] = this.onopen.bind(this);
        this._webscoket["onclose"] = this.onclose.bind(this);
        this._webscoket["onerror"] = this.onerror.bind(this);
    }

    public onmessage(e: any) {
        //MapManager.Instance.GetIntervalTime();
        // console.log("来消息了：" , e.data);
        try {
            if (typeof (e) == "string") {
                this.onmessageHandler(new NetData(e));
            } else {
                if (!e.data) {
                    this.onmessageHandler(new NetData(e));
                } else if (e.data.arrayBuffer) {
                    e.data.arrayBuffer()
                        .then((bf: ArrayBuffer) => {
                            this.onmessageHandler(new NetData(bf));
                        });
                } else {
                    this.onmessageHandler(new NetData(e.data));
                }
            }
        } catch (e) {
            // console.error("NetWebscoket.onmessage异常:\n" + e.message + "\n" + e.stack);
        }
    }

    public sendMessage(buff: Uint8Array) {
        // console.error(buff.join());
        // this.rnetStream.Write(buff, 0, buff.length);
        NetWebscoket.Instance.send(buff);
    }

    public onopen(e) {
        console.log("WebSocket连接成功! 开始链接服务器onopen");
        this._connected = true;
        if (!AppMain.EnableLogin) {
            WebsocketTool.Instance.ProjectManager_login("llm", "");
            console.log("跳过注册步骤直接登录账号，第一次登陆即为注册账号，再次登录即成功");
            // WebsocketTool.Instance.ProjectManager_login("xl9", "");
        }
    }

    public send(bytes: Uint8Array) {
        // console.error(bytes.join());
        if (this._webscoket && this._webscoket.readyState == 1) {
            this._webscoket.send(bytes);
        } else if (this._connected) {
            //CommonTipsManager.Instance.ShowTips("提示", "已与服务器断开连接");
        } else {
            //CommonTipsManager.Instance.ShowTips("提示", "未连接到服务器");
            console.error("谁的傻逼代码 服务器都还没连上就调发送了111！");
        }
    }

    public sendStr(mess: string) {
        if (this._webscoket && this._webscoket.readyState == 1) {
            this._webscoket.send(mess);
        } else if (this._connected) {
            // CommonTipsManager.Instance.ShowTips("提示", "已与服务器断开连接", () => {
            //     if (!UiManager.isUiShow(UiNames.Loading)) {
            //         XinkuaiSDK.getInstance()
            //             .reload();
            //         UIOpenOrHideManager.Instance.OpenLoginView();
            //     }
            // });
        } else {
            //CommonTipsManager.Instance.ShowTips("提示", "未连接到服务器");
            console.error("谁的傻逼代码 服务器都还没连上就调发送了222！");
        }
    }

    public onclose(e) {
        console.error("socket close  连接关闭连接关闭连接关闭。。。", e);
        // CommonTipsManager.Instance.ShowTips("网络故障", "无法连接到服务器，请检查你的网络连接并重新登陆！", () => {
        //     if (!UiManager.isUiShow(UiNames.Loading)) {
        //         XinkuaiSDK.getInstance()
        //             .reload();
        //         UIOpenOrHideManager.Instance.OpenLoginView();
        //     }
        // });
    }
    public onerror(e) {
        console.log("socket error", e);
        // CommonTipsManager.Instance.ShowTips("网络故障", "无法连接到服务器，请检查你的网络连接并重新登陆！", () => {
        //     if (!UiManager.isUiShow(UiNames.Loading)) {
        //         XinkuaiSDK.getInstance()
        //             .reload();
        //         UIOpenOrHideManager.Instance.OpenLoginView();
        //     }
        // });

    }

    // tslint:disable-next-line: cyclomatic-complexity
    private onmessageHandler(netData: NetData) {
        if (WebsocketTool.Instance.onmessage(netData)) {
            //console.log("json长度: " + netData.code.length + ", 整体用时" + MapManager.Instance.GetIntervalTime());
            return;
        }
        console.log("netData ********* ", netData);
        if (netData.head != "[LOG]") {
            let messObjList = netData.GetJson();
            // console.log("messObj -----  ", messObj);
            // console.log("functionName -----", messObj.functionName);
            let len = messObjList.length;
            for (let i = 0; i < len; i++) {
                let messObj = messObjList[i];
                let res;
                switch (messObj.functionName) {
                    case "login":
                        // //登录成功后 测试创建test1工程 后续移到具体的流程中去
                        // WebsocketTool.Instance.ProjectManager_creatProject("test1");
                        // UIOpenOrHideManager.Instance.OpenAlistofgameItemsView();
                        UIOpenOrHideManager.Instance.HideLogonView();
                        res = JSON.parse(messObj.args[0]);
                        console.log("用户登录后 返回的用户数据 =========== ", res);
                        // //通知工程列表刷新
                        let gal = res.gal;
                        let strArr = [];
                        for (let key in gal) {
                            strArr.push(key);
                        }
                        UiDataManager.changeFunctionData(BindKeyName.projectListRefresh, strArr);
                        // EditorEventMgr.Instance.emitEvent("ProjectListRefresh", cb => cb(res.projects));
                        console.log("显示开始提示界面----------------");
                        UIOpenOrHideManager.Instance.OpenStartView();
                        break;
                    case "projectToken":
                        res = messObj.args[0];

                        console.log("收到服务器返回 projectToken   " + res);
                        ExportManager.setProjectToken(res);

                        // setTimeout(() => {
                        //     ExportManager.uploadFile("Bin/Aichat/test.json", m4m.io.converter.StringToUtf8Array("[1,2]"));
                        // }, 2000);
                        break;
                    case "CreateProject":
                        res = JSON.parse(messObj.args[0]);
                        console.error(res);
                        if (res.res == 0) {
                            //创建工程成功 重新加一遍json
                            let userData = JSON.parse(res.obj);
                            // console.error(userData.projects);
                            //通知工程列表刷新
                            EditorEventMgr.Instance.emitEvent("ProjectListRefresh", cb => cb(userData.projects));
                        }
                        break;
                    case "OpenProject":
                        res = JSON.parse(messObj.args[0]);
                        console.log("OpenProject");
                        console.log(res);
                        FileInfoManager.Instance.diguiDirPare(res);
                        FileInfoManager.Instance.setRoot(res);
                        EditorEventMgr.Instance.emitEvent("FileTreeUpDate", cb => cb([res]));
                        break;
                    case "ping":
                        PingTimeManager.Instance.serverBackFun();
                        break;
                    case "servertime":
                        CDManage.Instance.setServerTime(messObj.args[0]);
                        break;
                    default:
                        if (messObj.className == "Tip" && messObj.functionName == "Message") {
                            //
                            let messStr = messObj.args[0];
                            let messageObj = messStr;
                            let context = messageObj.context;
                            let tipType = messageObj.tipType;
                            SkipBoxManager.Instance.ShowSkipBox(context);
                            if (context == "注册成功") {
                                UIOpenOrHideManager.Instance.HideRegisterView();
                                UIOpenOrHideManager.Instance.OpenLogonView();
                            }
                        }
                }
            }
        }
        //console.log("json长度: " + netData.code.length + ", 整体用时(code)" + MapManager.Instance.GetIntervalTime());
    }

    private Close() {
        if (this._webscoket) {
            this._webscoket.close();
        }
    }

}