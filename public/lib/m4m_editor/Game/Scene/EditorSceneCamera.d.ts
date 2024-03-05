/// <reference types="./src/m4m" />
import vector3 = m4m.math.vector3;
export declare enum SceneCameraOpvalueType {
    Normal = 0,
    Ui = 1
}
/**
 * 编辑器中的相机
 */
export declare class EditorSceneCamera extends m4m.framework.camera {
    private moveSpeed;
    private mouseInWindow;
    private _moveViewFlag;
    private _targetFlag;
    private _targetAngle;
    private _angleSpeed;
    private _pos;
    private _focusDistance;
    get FocusDistance(): number;
    get opvalueType(): SceneCameraOpvalueType;
    private _opvalueType;
    private onMouseleaveFunc;
    private onMouseenterFunc;
    start(): void;
    update(delta: number): void;
    remove(): void;
    CameraCenterToPoint(worldPoint: vector3): void;
    MoveView(x: number, y: number): void;
    DifferenceMoveView(targetAngle: vector3, speed: number): void;
    /**
     * 切换2d/3d视图
     */
    switchPpvalueType(): void;
    resetPpvalue(): void;
    private onTouchDownFunc;
    private onTouchViewMoveFunc;
    private onPlayerMoveFunc;
    private onTouchScaleFunc;
    private cameraMove;
    private onMouseleave;
    private onMouseenter;
    private clampValue;
}
