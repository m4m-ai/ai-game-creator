/// <reference types="./src/m4m" />
import { IInspertorGameobjectData } from '../Panel/InspertorMgr';
import transform = m4m.framework.transform;
import transform2D = m4m.framework.transform2D;
import { ConsoleData } from '../Panel/consoleMgr';
import { Vector2 } from '../../common/curve/types';
import { TexturePackerResult } from "../Asset/TexturePackerResult";
import { TexturePackerData } from "../Asset/TexturePackerData";
import { EditorAssetInfo } from "../Asset/EditorAssetInfo";
import { AssetReference } from "../Asset/AssetReference";
import { LightCodePanel } from '../../common/LightCode/LightCodeData';
import { LineType } from '../../common/LightCode/LightCodeMgr';
import { FileData } from "../ExportManager/FileData";
import { IWindowInstance } from "../../common/window/Window";
import { IContextMenuData } from "../../common/contextMenu/ContextMenuSlot";
/**
 * 编辑器事件声明
 */
export interface EventMap {
    /**
     * 打开项目
     */
    ProjectListRefresh(projectList: any): void;
    /**
     * 通知显示 Inspector 面板, 并传入GameObject数据
     */
    ShowInspectorTransfrom(data: IInspertorGameobjectData): void;
    /**
     * 打开预览页面
     */
    ShowInspectorPreview(meta: EditorAssetInfo): void;
    /**
     * 清理 Inspector 面板数据
     */
    ClearInspector(): void;
    /**
     * 场景加载完成
     */
    OnSceneOpenSuccess(): void;
    /**
     * 左下文件树更新
     */
    FileTreeUpDate(text: EditorAssetInfo[]): void;
    /**
     * 右下资源文件管理
     */
    ResourceFileUpDate(text: EditorAssetInfo): void;
    /**
     * 选中文件
     */
    OnSelectFile(text: EditorAssetInfo): void;
    /**
     * OnSave
     */
    OnSave(text: string): void;
    /**
     * OnConsoleLog
     */
    OnConsoleLog(...text: any[]): void;
    /**
     * 设置选中的物体
     * @param trans
     */
    SetActiveObject(trans: transform | transform2D): void;
    /**
     * 当选中物体时触发
     * @param trans
     */
    OnSelectActiveObject(trans: transform | transform2D): void;
    /**
     * 镜头移动到指定trans下
     * @param trans
     */
    CameraLookTransform(trans: transform | transform2D): void;
    /**
     * 通知刷新节点树
     */
    RefreshNodeTree(): void;
    /**
     * 通知刷新选中节点的组件
     */
    RefreshNodeComponent(): void;
    /**
     * 通知控制台打印数据
     */
    ConsoleMonitor(data: ConsoleData): void;
    /**
     * 视图大小改变
     */
    OnViewportRectChange(width: number, height: number): void;
    /**
     * 曲线刷新
     */
    ReRenderCurve(data: Vector2[]): void;
    /**
     * 修改最低最高点
     */
    ResetMaxAndMin(max: number, min: number): void;
    /**
     * 通知节点的变化
     */
    DispatchNodeChange(pos: Vector2[]): void;
    /**
     * 拖拽资源事件
     * @param assetInfo 被拖拽的资源引描述数据
     * @param reference 被拖拽的资源引用数据
     * @param state 状态: 0 开始拖拽, 1 拖拽结束
     */
    OnDragAsset(assetInfo: EditorAssetInfo, reference: AssetReference, state: 0 | 1): void;
    /**
     * 拖拽 tree 下的 transform 组件
     * @param trans 被拖动的 trans
     * @param state 状态: 0 开始拖拽, 1 拖拽结束
     */
    OnDragTrans(trans: transform | transform2D, state: 0 | 1): void;
    /**
     * 贴图合并工具保存事件
     * @param datas 处理完成的贴图二进制数据
     */
    OnTexturePackerSave(datas: TexturePackerResult[]): any;
    /**
     * 调用贴图合并工具
     * @param files 贴图文件数据
     * @param callback 完成后回调
     */
    CallTexturePacker(files: TexturePackerData, callback: (result: TexturePackerResult[]) => void): any;
    /**
     * 创建一个连连看block
     */
    OnCreateBlock(data: LightCodePanel): void;
    /**
     * 选择颜色
     */
    OnSelectColor(colors: m4m.math.color[]): void;
    /**
     * 拖拽虚线位置
     */
    OnDrawLine(line: LineType): void;
    /**
     * 修改虚线透明度
     */
    OnChangeOpacity(data: number): void;
    /**
     * 当拖拽文件开始上传时触发
     * @param fileData 文件列表
     */
    OnDropFileUpload(fileData: FileData[]): any;
    /**
     * 当拖拽文件开始上传成功时触发
     * @param fileData 文件列表
     * @param successCount 成功上传的数量
     * @param failCount 失败的数量
     */
    OnDropFileUploadFinish(fileData: FileData[], successCount: number, failCount: number): any;
    /**
     * 服务器返回NavMesh生成的导航数据文件
     */
    OnNavMeshFileResponse(filePath: string): any;
    /**
     * 编辑器播放按钮点击
     */
    OnPlay(isPlay: boolean): void;
    /**
     * 编辑器暂停按钮点击
     */
    OnPause(isPause: boolean): void;
    /**
     * 编辑器下一步按钮点击
     */
    OnNextStep(): void;
    /**
     * ts代码编译成功
     */
    OnTsCompileSuccess(): void;
    /**
     * 代码初始化完成, 通知场景树重新挂载脚本
     */
    OnRemountComponent(): void;
    /**
     * 打开项目
     */
    OnOpenProject(projectName: string): void;
    /**
     * 通知服务器打开某个项目
     */
    OnOpenProjectSendToServer(projectName: string): void;
    /**
     * 编辑器加载完成
     */
    OnEditorLoadFinish(): void;
    /**
     * 等待 NetWebSocket 中 fileInfos触发返回事件
     */
    WaitNetFileInfosUpdate(): void;
    /**
     * 场景保存事件
     */
    OnSaveScene(): void;
    /**
     * 创建窗口
     * @param windowList 窗体列表
     */
    OnWindowListRefresh(windowList: IWindowInstance[]): void;
    /**
     * 添加动画属性
     * @param datas 动画属性列表
     */
    OnAnimationDatas(datas: any): void;
    /**
     * 显示右键上下文菜单
     */
    ShowContextMenu(menuData: IContextMenuData): void;
    OnOutAnimationData(data: any): void;
}
