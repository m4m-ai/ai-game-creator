/// <reference types="./src/m4m" />
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { exC2DComponent } from "./exC2DComponent";
export declare class Prefab2D extends AssetBundleFileInfo {
    className: string;
    prefab: string;
    layer: number;
    tag: string;
    tranName: string;
    isStatic: boolean;
    children: Prefab2D[];
    width: number;
    height: number;
    pivot: m4m.math.vector2;
    _visible: boolean;
    localTranslate: m4m.math.vector2;
    localScale: m4m.math.vector2;
    localRotate: number;
    isMask: boolean;
    layoutState: number;
    layoutPercentState: number;
    layoutValueMap: numberdic;
    insid: number;
    components: exC2DComponent[];
}
declare class numberdic {
    static classType: typeof numberdic;
    n1: number;
    n2: number;
    n4: number;
    n8: number;
    n16: number;
    n32: number;
}
export declare class Border {
    static classType: typeof Border;
    l: number;
    t: number;
    r: number;
    b: number;
}
export {};
