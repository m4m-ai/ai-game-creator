/// <reference types="./src/m4m" />
import { IComponentData } from "../../common/inspector/components/Component";
import C2DComponent = m4m.framework.C2DComponent;
import nodeComponent = m4m.framework.nodeComponent;
export declare class RawImage2DAttributeDataMgr {
    static getRawImage2DData(node: nodeComponent | C2DComponent): IComponentData;
}
