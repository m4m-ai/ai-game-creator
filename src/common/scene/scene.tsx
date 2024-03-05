import React, { Component } from 'react'
import { EditorApplication, engineDiv } from '../../index'
import './index.css'
import { FileInfoManager } from '../../CodeEditor/code/FileInfoManager';
import { EditorEventMgr } from '../../Game/Event/EditorEventMgr';

function initH5() {
  //-----h5特殊处理
  //判断文件是否初始化完成, 如果没有, 则等待服务器返回文件
  if (FileInfoManager.Instance.rootFolder) {
    System.init();
  } else {
    let binder = EditorEventMgr.Instance.addEventListener("FileTreeUpDate", () => {
      binder.removeListener();
      System.init();
    });
  }
}

export class Scene extends Component {
  render(): React.ReactNode {
    return (
      <>
      {/* 屏蔽功能 */}
        {/* <div className="scene-head">
          <div className="select-menu">
            <ToolSetting />
            <GridSnap />
          </div>
          <div className="select-menu">
            <ViewOptions />
          </div>
        </div> */}
        <div
          ref={element => {
            element?.appendChild(engineDiv);
            if (EditorApplication.Instance.isIniteFinish) {
              initH5();
            } else {
              let binder = EditorEventMgr.Instance.addEventListener("OnEditorLoadFinish", () => {
                binder.removeListener();
                initH5();
              });
            }
          }}
        ></div>
      </>
    )
  }
}
