/// <reference types="./src/m4m" />
import transform = m4m.framework.transform;
import transform2D = m4m.framework.transform2D;
export declare class Utils {
    /**
     * 将获取一个类对象的名称
     */
    static nameof<T extends {
        new (): any;
    }>(type: T): string;
    /**
     * 获取一个对象的实例名称
     */
    static getName(inst: object): string;
    /**
     * 转换名称格式, 将驼峰命名转换成短语格式, 例如 abCd => Ab Cd
     */
    static convertName(str: string): string;
    /**
     * 验证是否为数字
     * @param str 字符串
     * @param defaultVal 验证失败时返回的默认值
     */
    static verificationNumber(num: number, defaultVal: number): {
        success: boolean;
        standard: number;
    };
    /**
     * 保留 num 的6位小数
     */
    static number(num: number): number;
    /**
     * 返回 v 按 period 周期变化的新数
     */
    static period(v: number, period: number): number;
    static limit(value: number, data: {
        max?: number;
        min?: number;
        step?: number;
    }): number;
    /**
     * 遍历当前节点的子节点
     */
    static eachTrans(trans: transform, func: (child: transform, index?: number, layer?: number) => void | boolean, index?: number, layer?: number): void;
    /**
     * 遍历当前2D节点的子节点
     */
    static each2DTrans(trans: transform2D, func: (child: transform2D, index?: number, layer?: number) => void | boolean, index?: number, layer?: number): void;
    static drawLine(trans: transform, points: m4m.math.vector3[], color: m4m.math.color): void;
    private static genMesh;
}
