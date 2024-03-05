/// <reference types="./src/m4m" />
import transform = m4m.framework.transform;
import PrimitiveType = m4m.framework.PrimitiveType;
/**
 * Hierarchy 面板操作函数
 */
export declare class EditorHierarchyHandle {
    /**
     * 创建空的3D物体
     */
    static createEmpty(root: transform): void;
    /**
     * 创建基础物体
     * @param type 物体类型
     * @param root 父节点
     */
    static createPrimitive(type: PrimitiveType, root: transform): void;
}
