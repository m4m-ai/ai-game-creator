/// <reference types="./src/m4m" />
import transform = m4m.framework.transform;
import ray = m4m.framework.ray;
export declare enum AxisDirection {
    none = "none",
    x = "x",
    y = "y",
    z = "z"
}
export declare enum AxisType {
    drag = 0,
    move = 1,
    rotate = 2,
    scale = 3
}
export declare class EditorAxisObject implements m4m.framework.IEditorCode {
    /** 全局缩放 */
    globalScale: number;
    /** 轴根节点 */
    axisRoot: transform;
    /** 活动的轴 */
    activeAxis: AxisDirection;
    private pickInfo;
    private collAxis;
    private moveAxisMap;
    private movePanelMap;
    private rotateAxisMap;
    private scaleAxisMap;
    private defaultAxisAlpha;
    private defaultAxisScale;
    private defaultSelectAxisScale;
    private defaultAxisColor;
    /** 当前显示的轴类型 */
    get currAxisType(): AxisType;
    set currAxisType(value: AxisType);
    private _currAxisType;
    private startDragData;
    isClosed(): boolean;
    onStart(app: m4m.framework.application): any;
    onUpdate(delta: number): any;
    private refreshAxisTrans;
    private trans2dList;
    private onTouchDownFunc;
    private dragDownAxis;
    private dragUpAxis;
    private dragAxis;
    private refreshAxisType;
    private refreshAxisState;
    private setAxisColor;
    private createMoveAxis;
    private createMovePanel;
    private createRotateAxis;
    private createScaleAxis;
    /**
     * 创建一条从点击位置创建的射线, 用于scene内的物体检测
     */
    createRay(): ray;
    private saveTransData;
    private intersectionWith2Line;
    private getUsefulPickinfo;
}
