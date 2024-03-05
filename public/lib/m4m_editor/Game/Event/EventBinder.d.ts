import { IEvent } from "./IEvent";
import { IEventBinder } from "./IEventBinder";
/**
 * 事件绑定对象
 */
export declare class EventBinder<T = any, K extends keyof T = any, F extends T[K] = any> implements IEventBinder {
    mgr: IEvent<T>;
    key: K;
    func: F;
    constructor(mgr: IEvent<T>, key: K, func: F);
    /**
     * 移除当前事件监听
     */
    removeListener(): void;
}
