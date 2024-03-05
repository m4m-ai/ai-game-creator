export interface ConsoleData {
    calssName: string;
    ConsoleTypes: ConsoleType;
    title: string;
    desc: string;
    ConsoelLogIcon: string;
    visible: boolean;
    [propName: string]: any;
}
export declare enum ConsoleType {
    Log = 0,
    Warn = 1,
    Error = 2,
    info = 3
}
export declare class consoleMgr {
    /**所有log，warn,error信息 */
    static Consdata: ConsoleData[];
    /**显示的信息 */
    static ShowConsoleData: ConsoleData[];
    /**log数量 */
    static logCount: number;
    /**warn数量 */
    static warnCount: number;
    /**error数量 */
    static errorCount: number;
    static logbool: boolean;
    static warnbool: boolean;
    static errorbool: boolean;
    static indexCoun: number;
    /**`
     * 日志信息显示
     * @param ConsoleTypes 类型
     * @param Consoletilte 标题
     * @param ConsoleDsec 内容
     */
    static getConsoleData(ConsoleTypes: ConsoleType, Consoletilte?: string, ConsoleDsec?: string): void;
    static newFunction(data: any): void;
    /**是否显示日志 */
    static ShowLOG(type: ConsoleType, v?: boolean): void;
    /**
 * 序列化对象, 注意, 序列化的结果不是json字符串
 * @param obj 对象
 * @param level 最大序列化层级, 默认1级
 * @param maxLen 限制字符串最大长度, 无限制则设置为-1
 */
    static stringify(obj: any, level?: number, maxLen?: number, append?: string): string;
}
