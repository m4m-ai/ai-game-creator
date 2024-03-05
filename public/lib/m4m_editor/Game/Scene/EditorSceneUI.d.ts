/// <reference types="./src/m4m" />
import IEditorCode = m4m.framework.IEditorCode;
import overlay2D = m4m.framework.overlay2D;
import camera = m4m.framework.camera;
import transform2D = m4m.framework.transform2D;
export declare class EditorSceneUI implements IEditorCode {
    /**
     * 编辑器ui根节点
     */
    overlay2D: overlay2D;
    /**
     * 右上角3d轴的ui根节点
     */
    axisPanel: transform2D;
    /**
     * 是否正在拖拽box
     */
    isDragBox: boolean;
    /**
     * 渲染方向轴的相机
     */
    axisCamera: camera;
    private _engineApp;
    private _axisCameraTrans;
    private _axisRoot;
    private _axisMap;
    private _axisBox;
    private _pickinfo;
    private _isDragMoveFlag;
    isClosed(): boolean;
    onStart(app: m4m.framework.application): any;
    onUpdate(delta: number): any;
    /**
     * 通过屏幕坐标 获取 3D 空间坐标
     * @param x screenPos.x
     * @param y screenPos.y
     * @param out3DPos 3D 空间坐标
     * @param watchCam 观察相机
     * @param zDepth 相对于相机观察平面的距离(相机Z 深度)
     */
    static calcu3DPosByScreenPos(x: number, y: number, out3DPos: m4m.math.vector3, watchCam: camera, zDepth?: number): void;
    private btnList;
    private unSelectColor;
    private selectColor;
    private createAxisButtonGroup;
    private createAxis;
    private onSelectAxisButton;
    private createMoveAxis;
    private onTouchDownFunc;
    private onTouchMoveFunc;
    private onTouchUpFunc;
    private toAngle;
}
