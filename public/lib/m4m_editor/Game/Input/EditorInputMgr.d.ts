/// <reference types="./src/m4m" />
/**
 * 编辑器输入管理
 */
import IEditorCode = m4m.framework.IEditorCode;
import vector2 = m4m.math.vector2;
import { ElementInputMap } from "./ElementInputMap";
import { InputMap } from "./InputMap";
import { ElementEventBinder } from "./ElementEventBinder";
import { IEvent } from "../Event/IEvent";
import { EventBinder } from "../Event/EventBinder";
import { ElementEventFactory } from "./ElementEventFactory";
export declare enum PlatformType {
    Android = 0,
    IOS = 1,
    PC = 2
}
export declare class EditorInputMgr implements IEditorCode, IEvent<InputMap> {
    static get Instance(): EditorInputMgr;
    private static _instance;
    /**
     * 获取编辑器执行的平台
     */
    get platformType(): PlatformType;
    private _platformType;
    private bindMap;
    private elementBindMap;
    private _engineApp;
    private _inputMgr;
    private _touchPos;
    private _inputClickDown;
    private _isTouchPressed;
    private _inputCkickFlag;
    private _inputTouchStartPos;
    private _inputTouchPrevPos;
    private _inputTouchDeltaPos;
    private _playerMoveSpeed;
    private _globalTouchPos;
    private constructor();
    /**
     * 返回是否在触摸中
     */
    isTouching(): boolean;
    /**
     * 返回是否刚触摸
     */
    isTouchPressed(): boolean;
    /**
     * 获取触摸的坐标
     */
    getTouchPosition(): vector2;
    /**
     * 获取点击坐标相对于上一帧的偏移量
     */
    getTouchDeltaPosition(): vector2;
    /**
     * 获取点击的位置是否在场景元素内
     */
    isTouchInScene(): boolean;
    addEventListener<K extends keyof InputMap, F extends InputMap[K]>(key: K, func: F): EventBinder<InputMap, K, F>;
    removeEventListener<K extends keyof InputMap, F extends InputMap[K]>(binder: EventBinder<InputMap, K, F>): void;
    removeAllEventListener<K extends keyof InputMap>(key: K): void;
    clearEventListener(): void;
    emitEvent<K extends keyof InputMap, F extends InputMap[K]>(key: K, cb: (callback: EventBinder<InputMap, K, F>["func"]) => void): void;
    /**
     * 添加原生element监听事件
     * @param ele 绑定的element对象
     * @param key 事件名称
     * @param func 回调函数
     */
    addElementEventListener<K extends keyof ElementInputMap, F extends ElementInputMap[K]>(ele: HTMLElement, key: K, func: F): ElementEventBinder<ElementInputMap, K, F>;
    /**
     * 清除指定element监听事件
     * @param binder 监听器对象
     */
    removeElementEventListener<K extends keyof ElementInputMap, F extends ElementInputMap[K]>(binder: ElementEventBinder<ElementInputMap, K, F>): void;
    /**
     * 清除指定key的所有原生element监听事件
     * @param key 事件名称
     */
    removeAllElementEventListener<K extends keyof ElementInputMap>(key: K): void;
    /**
     * 清除所有原生element监听事件
     */
    clearElementEventListener(): void;
    /**
     * 创建事件工厂, 方便统一销毁事件对象
     */
    createElementEventFactory(): ElementEventFactory;
    /**
     * 获取当前事件管理器绑定状态
     */
    getState(): {
        eventSize: number;
        eventMap: any;
        elementEventSize: number;
        elementEventMap: any;
    };
    onStart(app: m4m.framework.application): void;
    onUpdate(delta: number): void;
    isClosed(): boolean;
    private removeElementBinder;
    private createTouchData;
}
