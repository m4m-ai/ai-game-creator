/**
 * 清空Map
 */
export declare class cMap<V> {
    constructor(obj?: object);
    /** 存放数据 */
    private data;
    /**
     * 清空Map
     */
    clear(): void;
    /**
     * 判断是否包含指定Key
     * @param key
     */
    has(key: number | string): boolean;
    /**
     * 放入一个键值对
     * @param key
     * @param value
     */
    set(key: number | string, value: V): this;
    /**
     * 获取某键对应的值
     * @param  key
     * @return  value
     */
    get(key: number | string): V;
    /**
     * 删除一个键值对
     * @param  key
     */
    delete(key: number | string): boolean;
    /**
     * 遍历Map,执行处理函数
     * @param fn  回调函数 function(key,value){..}, 返回 false 表示停止循环
     */
    forEach(fn: (value: V, key?: number | string) => void | boolean): void;
    /**
     * 异步遍历Map,执行处理函数
     * @param fn  回调函数 function(key,value){..}
     */
    forEachAsync(fn: (value: V, key: number | string) => Promise<void>): Promise<void>;
    /**
     * 克隆Map,返回克隆Map
     */
    clone(): cMap<V>;
    /**
     * 获取键值对数量
     */
    get size(): number;
}
