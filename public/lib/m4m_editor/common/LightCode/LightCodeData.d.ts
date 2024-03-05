/**
 * 连连看数据定义格式
 */
export declare type LightCodeData = LightCodePanel[];
/** 拖拽面板定义格式 */
export interface LightCodePanel {
    /** 数据id */
    id?: number;
    /** 面板类型 */
    type: number;
    /** 坐标 */
    position?: Position;
    /** 面板标题 */
    title: string;
    /** 输入属性列表 */
    inAttribute: InAttribute[];
    /** 输出属性列表 */
    outAttribute: OutAttribute[];
}
/** 坐标数据定义格式 */
export interface Position {
    /** x轴坐标 */
    x: number;
    /** y轴坐标 */
    y: number;
}
/** 左侧(输入)属性数据定义格式 */
export interface InAttribute {
    /** 属性显示名称 */
    title: string;
    /** 属性类型， number, bool, string, color, vector2, vector3.... */
    type: string;
    /** 允许最大的连接数量, 默认为1 */
    maxConcat: number;
    /** 输入的值 */
    inputVal?: string;
    /** classList */
    classList: string[];
}
/** 右侧(输出)属性数据定义格式 */
export interface OutAttribute {
    /** 属性显示名称 */
    title: string;
    /** 属性类型 */
    type: string;
    /** 允许最大的连接数量, 默认为1 */
    maxConcat: number;
    /** 输出的值 */
    outputVal?: string;
    /** 连接的属性列表,  */
    concatList?: ConcatData[];
    /** classList */
    classList: string[];
}
/** 属性连接描述 */
interface ConcatData {
    /** 连接的面板id */
    panelId: number;
    /** 连接的属性索引 */
    attrIndex: number;
}
export {};
