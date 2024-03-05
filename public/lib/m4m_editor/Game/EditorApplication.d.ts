/// <reference types="./src/m4m" />
import { EditorSceneCamera } from "./Scene/EditorSceneCamera";
import { EditorAxisObject } from "./Scene/EditorAxisObject";
import { EditorInputMgr } from "./Input/EditorInputMgr";
import { EditorSceneUI } from "./Scene/EditorSceneUI";
import { EditorScene } from "./Scene/EditorScene";
import { EditorSelection } from "./EditorSelection";
import { EditorResources } from "./Asset/EditorResources";
import assetMgr = m4m.framework.assetMgr;
import inputMgr = m4m.framework.inputMgr;
/**
 * 编辑器对象
 */
export declare class EditorApplication implements m4m.framework.IEditorCode {
    static readonly wsServerUrl: string;
    static readonly fileServerUrl: string;
    static readonly postServerUrl: string;
    static get Instance(): EditorApplication;
    private static _inst;
    private static _init;
    /** 是否初始化完成 */
    isIniteFinish(): boolean;
    private _initFinish;
    private _isPlay;
    private _isPause;
    /**
     * playing状态
     */
    get isPlay(): boolean;
    /**
     * playing状态
     */
    set isPlay(v: boolean);
    /**
     * 暂停状态
     */
    get isPause(): boolean;
    /**
     * 暂停状态
     */
    set isPause(v: boolean);
    /**
     * 引擎实例对象
     */
    engineApp: m4m.framework.application;
    /**
     * 引擎运行所挂载的div对象
     */
    element: HTMLDivElement;
    /**
     * 场景相机
     */
    editorCamera: EditorSceneCamera;
    /**
     * 资源管理器
     */
    assetMgr: assetMgr;
    /**
     * 输入管理器
     */
    inputMgr: inputMgr;
    /**
     * 编辑器中的输入管理器 (IEditorCode)
     */
    editorInputMgr: EditorInputMgr;
    /**
     * 选中单位的轴 (IEditorCode)
     */
    axisObject: EditorAxisObject;
    /**
     * 编辑器scene窗口ui (IEditorCode)
     */
    editorSceneUI: EditorSceneUI;
    /**
     * 编辑器场景 (IEditorCode)
     */
    editorScene: EditorScene;
    /**
     * 编辑器资源管理对象 (IEditorCode)
     */
    editorResources: EditorResources;
    /**
     * 编辑器选中项管理器 (IEditorCode)
     */
    selection: EditorSelection;
    /**
     * 工程名称
     */
    projectName: string;
    /**
     * 服务器资源路径
     */
    get serverResourcesUrl(): string;
    /**
     * 初始化编辑器对象
     * @param owner 挂载的div元素
     * @param peojectName 打开工程名称
     */
    Init(owner: HTMLDivElement, peojectName: string): Promise<void>;
    onStart(app: m4m.framework.application): void;
    onUpdate(delta: number): void;
    isClosed(): boolean;
    private setPlay;
    private setPause;
    private onPlayFunc;
    private onStopFunc;
    private onPauseFunc;
    private onContinueFunc;
    static onInstanceInit: () => void;
    private sceneGrid;
    PointInEditorCamera(point: number): boolean;
    AddEditorObjToScene(trans: any): void;
}
export declare enum EditorType {
    Editor = 0,
    PlayDebug = 1
}
