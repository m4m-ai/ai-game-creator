import { EditorInputMgr } from "./EditorInputMgr";
import { IEventBinder } from "../Event/IEventBinder";
/**
 * 事件绑定对象
 */
export declare class ElementEventBinder<T, K extends keyof T, F extends T[K]> implements IEventBinder {
    mgr: EditorInputMgr;
    key: K;
    callBack: F;
    /**
     * 绑定的函数
     */
    funcMap: {
        [key: string]: {
            element: Element;
            func: Function;
        };
    };
    constructor(mgr: EditorInputMgr, key: K, callBack: F);
    /**
     * 移除当前事件监听
     */
    removeListener(): void;
}
