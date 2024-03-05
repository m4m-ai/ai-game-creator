/// <reference types="./src/m4m" />
import I2DComponent = m4m.framework.I2DComponent;
import INodeComponent = m4m.framework.INodeComponent;
import transform = m4m.framework.transform;
import transform2D = m4m.framework.transform2D;
export interface IMOContextMenuData {
    menuId: string;
    component: I2DComponent | INodeComponent | transform | transform2D;
}
export declare const MOContextMenu: (props: IMOContextMenuData) => JSX.Element;
