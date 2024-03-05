/// <reference types="./src/m4m" />
import IEditorCode = m4m.framework.IEditorCode;
import transform = m4m.framework.transform;
import rawscene = m4m.framework.rawscene;
import prefab = m4m.framework.prefab;
import scene = m4m.framework.scene;
import canvasRenderer = m4m.framework.canvasRenderer;
import transform2D = m4m.framework.transform2D;
import vector2 = m4m.math.vector2;
import camera = m4m.framework.camera;
export declare enum EditorSceneViewType {
    Scene = 0,
    Prefab = 1
}
export declare class EditorScene implements IEditorCode {
    /**
     * 编辑器物体父节点
     */
    editorRootTrans: transform;
    /**
     * 场景物体根节点
     */
    sceneRootTrans: transform;
    /**
     * 预览根节点
     */
    previewRootTrans: transform;
    /**
     * 场景对象
     */
    scene: scene;
    /**
     * 视图预览类型: 场景, 预览prefab
     */
    set viewType(v: EditorSceneViewType);
    get viewType(): EditorSceneViewType;
    private _viewType;
    currUserSceneClass: any;
    currUserSceneInst: any;
    private lightmaps;
    private fog;
    private rotate;
    private postition;
    /**
     * 获取编辑器状态下场景canvas碰撞器
     */
    get canvasColliderTrans(): transform;
    _canvasColliderTrans: transform;
    /**
     * 获取编辑器状态下的场景canvas对象, 可能为 null, 如果需要根据运行状态获取 2D 根节点请调用 getCurrent2DRoot()
     */
    get canvasRenderer(): canvasRenderer;
    private _canvasRenderer;
    private _mainCamera;
    private lastLine;
    private hasChangeNode;
    private changeNodeTimer;
    private hasChangeConponent;
    private changeConponentTimer;
    private _prevWidth;
    private _prevHeight;
    constructor();
    isClosed(): boolean;
    onStart(app: m4m.framework.application): any;
    onUpdate(delta: number): any;
    /**
     * 在 editorRootTrans 下添加对象
     */
    addEditorTrans(trans: transform): void;
    /**
     * 往场景中添加一个trans
     */
    addSceneTrans(trans: transform): void;
    /**
     * 在预览模式下添加一个trans
     */
    addPreviewTrans(trans: transform): void;
    /**
     * 根据运行状态, 往场景根节点添加 trans
     */
    addToCurrentRoot(trans: transform): void;
    /**
     * 根据运行状态, 返回场景根节点
     */
    getCurrentRoot(): transform;
    /**
     * 获取当前显示的场景原根节点, 例如在运行状态下, 返回的是编辑器状态下的场景根节点
     */
    getCurrentOriginRoot(): transform;
    /**
     * 更具是否运行来返回当前的 2D 根节点
     */
    getCurrent2DRoot(): transform2D;
    /**
     * 获取当前显示的场景原2D根节点, 例如在运行状态下, 返回的是编辑器状态下的场景2D根节点
     */
    getCurrentOrigin2DRoot(): transform2D;
    /**
     * 打开空场景
     */
    openEmptyScene(): void;
    /**
     * 切换到指定场景
     */
    changeScene(pack: rawscene): void;
    /**
     * 打开预览模式下的trans
     */
    previewPrefab(prefab: prefab): void;
    /**
     * 清理场景内的所有物体
     */
    clearScene(): void;
    clearPrevScene(): void;
    /**
     * 获取 CanvasRenderer 节点, 如果没有, 就创建
     */
    createOrGetCanvasRenderer(root?: transform): canvasRenderer;
    /**
     * 获取 Camera 节点, 如果没有, 就创建
     * @param root 从哪一个 transform 开始扫描
     */
    createOrGetMainCamera(root?: transform): camera;
    /**
     * 在指定 trans 下寻找 canvasRenderer 组件
     */
    findCanvasRenderer(trans: transform): canvasRenderer;
    /**
     * 在指定 trans 下寻找主相机
     */
    findMainCamera(trans: transform): camera;
    /**
     * 在canvas下根据点击坐标创建ui, 如果没有canvas, 则创建canvas
     * @param type 控件类型
     */
    createUiElement(type: m4m.framework.Primitive2DType): void;
    /**
     * 获取点击在Canvas上的坐标, 没有点到Canvas则返回null
     */
    getCanvasTouchPos(): vector2;
    private drawLine;
    private changeViewportRect;
    private createCanvasRenderer;
    private createCanvasRendererCollider;
    private createMainCamera;
    private drawCanvasRendererOutline;
    /**
     * 重新挂载场景中的脚本
     */
    private onRemountComponent;
    /**
     * 保存场景
     */
    private onSaveScene;
    private onCreateNav;
    private handleSceneNav;
    /**
     * 重写 transform, transform2d 上面的节点操作函数
     */
    private overwriteMethod;
    /** 控制台打印节点树结构,用于debug时调用 */
    printTree(): void;
}
