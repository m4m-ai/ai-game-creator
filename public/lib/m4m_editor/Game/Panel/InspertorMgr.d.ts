/// <reference types="./src/m4m" />
import transform = m4m.framework.transform;
import transform2D = m4m.framework.transform2D;
import { IComponentData } from "../../common/inspector/components/Component";
export interface IInspertorGameobjectData {
    transform: transform2D | transform;
    visible: boolean;
    onVisibleChange(v: boolean): void;
    name: string;
    isStatic: boolean;
    tag: string;
    layer: number;
    components: IComponentData[];
}
export declare enum InspertorViewType {
    Hide = 0,
    Transfrom = 1,
    PreviewFile = 2
}
export declare class InspertorMgr {
    /**
     * 面板显示类型
     */
    static ViewType: InspertorViewType;
    static ClearInspertor(): void;
    private static _currTrans;
    /**
     * 打开属性面板
     * @param trans
     * @constructor
     */
    static ShowInspectorTransfrom(trans: transform): any;
    static ShowInspectorTransfrom(trans: transform2D): any;
    /**
     * 获取组件属数据, 并为其添加双向绑定事件
     */
    private static getComponentData;
    private static getComponentAttributeData;
    private static listeneStringField;
    private static listeneNumberField;
    private static listeneBoolenField;
    private static listeneVector2Field;
    private static listeneVector3Field;
    private static listeneRectField;
    private static listeneBorderField;
    private static listenelayoutSetField;
    private static getTransfromData;
    private static getTransfrom2DData;
    private static getLayoutArr;
    private static outisshow;
}
