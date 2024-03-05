/// <reference types="./src/m4m" />
import { IAttrComponent, IAttributeData } from "../../common/attribute/Attribute";
import { IComponentFieldInfo } from "./EditorComponentMgr";
export declare type ComponentInstance = m4m.framework.INodeComponent | m4m.framework.I2DComponent | m4m.framework.transform | m4m.framework.transform2D;
export declare abstract class ComponentFieldHandler<T extends IAttrComponent<any>> {
    type: string;
    constructor(type: string);
    abstract render(component: ComponentInstance, fieldInfo: IComponentFieldInfo): IAttributeData<T>[];
}
