import { ElementInputMap } from "./ElementInputMap";
/**
 * 事件工厂, 统一添加监听事件, 统一移除
 */
export declare class ElementEventFactory {
    private eventList;
    /**
     * 返回事件绑定数量
     */
    getEventSize(): number;
    /**
     * 添加监听事件
     */
    addEventListener<K extends keyof ElementInputMap, F extends ElementInputMap[K]>(ele: HTMLElement, key: K, func: F): void;
    /**
     * 移除所有监听事件
     */
    removeAllEventListener(): void;
}
