import { EventBinder } from "./EventBinder";
export interface IEvent<T> {
    /**
     * 添加事件监听
     * @param key 事件类型
     * @param func 回调函数
     */
    addEventListener<K extends keyof T, F extends T[K]>(key: K, func: F): EventBinder<T, K, F>;
    /**
     * 移除事件监听
     * @param binder 事件绑定对象
     */
    removeEventListener<K extends keyof T, F extends T[K]>(binder: EventBinder<T, K, F>): any;
    /**
     * 移除指定事件下所有监听对象
     * @param key 事件类型
     */
    removeAllEventListener<K extends keyof T>(key: K): any;
    /**
     * 移除所有事件监听
     */
    clearEventListener(): any;
    /**
     * 派发事件
     * @param key 事件类型
     * @param cb 事件处理回调, callback 参数为执行的事件
     */
    emitEvent<K extends keyof T, F extends T[K]>(key: K, cb: (callback: EventBinder<T, K, F>["func"]) => void): any;
}
