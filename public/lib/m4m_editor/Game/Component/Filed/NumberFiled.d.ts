import { NumberInputDataType } from "../../../common/attribute/attr/NumberInputAttr";
import { IAttrComponent, IAttributeData } from "../../../common/attribute/Attribute";
import { ComponentFieldHandler, ComponentInstance } from "../ComponentFieldHandler";
import { IComponentFieldInfo } from "../EditorComponentMgr";
export declare class NumberFiled extends ComponentFieldHandler<IAttrComponent<NumberInputDataType>> {
    render(component: ComponentInstance, fieldInfo: IComponentFieldInfo): IAttributeData<IAttrComponent<NumberInputDataType>>[];
}
