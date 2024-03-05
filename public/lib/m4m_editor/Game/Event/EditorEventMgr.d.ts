import { IEvent } from "./IEvent";
import { EventBinder } from "./EventBinder";
import { EventMap } from "./EventMap";
/**
 * 编辑器事件管理类, 编辑器中所有的事件(除了输入事件)都必须走该类来管理, 在 EventMap 中注册相应的事件
 */
export declare class EditorEventMgr implements IEvent<EventMap> {
    private bindMap;
    static get Instance(): EditorEventMgr;
    private static _instance;
    private constructor();
    addEventListener<K extends keyof EventMap, F extends EventMap[K]>(key: K, func: F): EventBinder<EventMap, K, F>;
    removeEventListener<K extends keyof EventMap, F extends EventMap[K]>(binder: EventBinder<EventMap, K, F>): void;
    removeAllEventListener<K extends keyof EventMap>(key: K): void;
    clearEventListener(): void;
    emitEvent<K extends keyof EventMap, F extends EventMap[K]>(key: K, cb: (callback: EventBinder<EventMap, K, F>["func"]) => void): void;
}
