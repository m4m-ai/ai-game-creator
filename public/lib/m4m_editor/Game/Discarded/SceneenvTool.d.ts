/// <reference types="./src/m4m" />
import { EditorType } from "../EditorApplication";
import { AxisObject } from "./AxisObject";
export declare class DebugTool {
    app: m4m.framework.application;
    scene: m4m.framework.scene;
    axisObj: AxisObject;
    clickFunc: Function;
    rootEle: HTMLElement;
    type: EditorType;
    private PointDownMap;
    get pointLeftDown(): boolean;
    get pointMiddleDown(): boolean;
    get pointRightDown(): boolean;
    get debugMode(): DebugModel;
    private _debugMode;
    get cursor(): string;
    private _cursor;
    setDebugModel(_model: number): void;
    constructor(rootEle?: HTMLElement, clickFunc?: Function);
    private last_3d_Z;
    private last_2d_Z;
    private attachControll;
    private ckPointInEditorView;
    private keyDownEvent;
    update(delta: number): void;
}
export declare enum DebugModel {
    null = 0,
    view = 1,
    translate = 2,
    rotation = 3,
    scale = 4
}
