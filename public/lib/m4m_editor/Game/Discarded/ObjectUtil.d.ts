/// <reference types="./src/m4m" />
import { NodeTypeEnum } from "./NodeTypeEnum";
export declare class ObjectUtil {
    static createEmpty(transform2D?: boolean): any;
    static createPrimitive(type: m4m.framework.PrimitiveType): m4m.framework.gameObject;
    static createCamera(name?: string): m4m.framework.camera;
    static createOverlay(): m4m.framework.overlay2D;
    static removeObject(trans: any): boolean;
    static getObjectMetaData(obj: m4m.framework.gameObject): any;
    static addComponent(obj: any, comp: string): any;
    static getComponent(obj: m4m.framework.gameObject, comp: string): m4m.framework.INodeComponent;
    static getCamera(trans: m4m.framework.transform): m4m.framework.INodeComponent;
    static getCanvasRenderer(trans: m4m.framework.transform): m4m.framework.INodeComponent;
    static getEffectSystem(trans: any): m4m.framework.effectSystem;
    static get3DType(trans: m4m.framework.transform): NodeTypeEnum;
    static getType(trans: any): NodeTypeEnum;
    static showInHierarchy(trans: any): boolean;
    static get NAME_COMPONENT_CAMERA(): string;
    static get NAME_COMPONENT_CANVASRENDER(): string;
    static get NAME_COMPONENT_EFFECTSYSTEM(): string;
}
