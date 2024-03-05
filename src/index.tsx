
import "antd/dist/antd.css";
import './styles/antd.scss'
import { EditorApplication } from './Game/EditorApplication';
import { EditorEventMgr } from "./Game/Event/EditorEventMgr";

export * from "./Export";

export const engineDiv = document.createElement("div");
engineDiv.id = "gamecontainer";
document.getElementById("root").appendChild(engineDiv);

// const logFunc = console.log;
// const warnFunc = console.warn;
// const errorFunc = console.error;
// const infoFunc = console.info;

// console.log = function () {
//   try {
//     let arr = [];
//     let str = "";
//     for (let i = 0; i < arguments.length; i++) {
//       const item = arguments[i];
//       arr.push(item);
//       str += consoleMgr.stringify(item) + ", ";
//     }
//     logFunc(...arr);
//     consoleMgr.getConsoleData(ConsoleType.Log, str)
//   } catch (e) {
//     // console.error("console.log()函数解析对象出现异常: ");
//   }
// }
// console.warn = function () {
//   try {
//     let arr = [];
//     let str = "";
//     for (let i = 0; i < arguments.length; i++) {
//       const item = arguments[i];
//       arr.push(item);
//       str += consoleMgr.stringify(item) + ", ";
//     }
//     warnFunc(...arr);
//     consoleMgr.getConsoleData(ConsoleType.Warn, str)
//   } catch (e) {
//     console.error("console.warn()函数解析对象出现异常: ");
//   }
// }
// console.info = function () {
//   try {
//     let arr = [];
//     let str = "";
//     for (let i = 0; i < arguments.length; i++) {
//       const item = arguments[i];
//       arr.push(item);
//       str += consoleMgr.stringify(item) + ", ";
//     }
//     infoFunc(...arr);
//     consoleMgr.getConsoleData(ConsoleType.info, str)
//   } catch (e) {
//     console.error("console.info()函数解析对象出现异常: ");
//   }
// }
// console.error = function () {
//   try {
//     let arr = [];
//     let str = "";
//     for (let i = 0; i < arguments.length; i++) {
//       const item = arguments[i];
//       arr.push(item);
//       str += consoleMgr.stringify(item) + ", ";
//     }
//     // console.error(str);
//     errorFunc(...arr);
//     consoleMgr.getConsoleData(ConsoleType.Error, str)
//   } catch (e) {
//     console.error("console.error()函数解析对象出现异常: ");
//   }
// }

/**
 * 监听保存行为
 */
window.addEventListener("keydown", function (e) {
  //event.preventDefault() 方法阻止元素发生默认的行为。
  if ((e.key == 's' || e.key == 'S') && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    EditorEventMgr.Instance.emitEvent("OnSaveScene", cb => cb());
  }
}, false);
EditorApplication.Instance.Init(engineDiv, "projectName");

/**
 * 页面禁用拖拽上传时 浏览器默认打开图片
 */
// document.addEventListener('drop', function (e) {
//   e.preventDefault();
// }, false);
// document.addEventListener('dragover', function (e) {
//   e.preventDefault();
// }, false);


let initFlag = false;
let binder = EditorEventMgr.Instance.addEventListener("OnOpenProject", (projectName) => {
  binder.removeListener();
  if (initFlag) {
    return;
  }
  initFlag = true;
  EditorApplication.Instance.Init(engineDiv, projectName);
  // //连服务器
  // CodeEditorReference.connectWebSocket();
  // console.log("打开工程 " + projectName);
  // //打开工程
  // WebsocketTool.Instance.ProjectManager_openProject(projectName);

  //调用H5工程通知服务器打开项目事件
  EditorEventMgr.Instance.emitEvent("OnOpenProjectSendToServer", cb => cb(projectName));
});

if (EditorApplication.Instance.isIniteFinish) {
  initH5();
} else {
  let binder = EditorEventMgr.Instance.addEventListener("OnEditorLoadFinish", () => {
    binder.removeListener();
    initH5();
  });
}

// window["WindowManager"] = WindowManager;
// window["ContextMenuManager"] = ContextMenuManager;

// ReactDOM.render(
//   // <Provider store={store}>
//   <HashRouter>
//     <App />
//   </HashRouter>,

//   // </Provider>,
//   document.getElementById('root')
// )

function initH5() {
  System.init();
  //-----h5特殊处理
  //判断文件是否初始化完成, 如果没有, 则等待服务器返回文件
  // if (FileInfoManager.Instance.rootFolder) {
  //   System.init();
  // } else {
  //   let binder = EditorEventMgr.Instance.addEventListener("FileTreeUpDate", () => {
  //     binder.removeListener();
  //     System.init();
  //   });
  // }
}