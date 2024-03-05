/// <reference types="./src/m4m" />
import transform = m4m.framework.transform;
import transform2D = m4m.framework.transform2D;
export interface IHierarchyData {
    id: number;
    transfrom: transform | transform2D;
    title: string;
    visible: boolean;
    children?: IHierarchyData[];
}
export declare class HierarchyMgr {
    /**
     * 扫描场景树, 并返回数据
     */
    static getTreeData(): IHierarchyData[];
    private static eachTrans;
}
