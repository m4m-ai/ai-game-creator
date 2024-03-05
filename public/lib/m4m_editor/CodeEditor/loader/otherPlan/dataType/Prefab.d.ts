/// <reference types="./src/m4m" />
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { gameObjectInfo } from "./gameObjectInfo";
export declare class Prefab extends AssetBundleFileInfo {
    static classType: typeof Prefab;
    tranName: string;
    localRotate: m4m.math.quaternion;
    localTranslate: m4m.math.vector3;
    localScale: m4m.math.vector3;
    gameObject: gameObjectInfo;
    children: Prefab[];
    insid: number;
}
