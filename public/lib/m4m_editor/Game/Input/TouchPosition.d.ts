export declare type TouchPosition = {
    /** 点击x坐标 */
    x: number;
    /** 点击y坐标 */
    y: number;
    /** 触点相当于元素原点坐标x轴偏移 */
    offsetX: number;
    /** 触点相当于元素原点坐标y轴偏移 */
    offsetY: number;
    /** 原生event事件 */
    event: Event;
};
