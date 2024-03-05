/// <reference types="./src/m4m" />
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { Bounds } from "./Bounds";
import { number4 } from "./number4";
export declare class Mesh extends AssetBundleFileInfo {
    static classType: typeof Mesh;
    className: string;
    meshName: string;
    originVF: number;
    bounds: Bounds;
    posCount: number;
    position: m4m.math.vector3[];
    color: m4m.math.color[];
    colorex: m4m.math.color[];
    normal: m4m.math.vector3[];
    UV0: m4m.math.vector2[];
    UV1: m4m.math.vector2[];
    tangent: m4m.math.vector3[];
    blendIndex: number4[];
    blendWeight: number4[];
    vec10tpose: number[];
    trisindex: number[];
    subMesh: subMeshInfo[];
    tmpVArr: Float32Array;
    minimum: m4m.math.vector3;
    maximum: m4m.math.vector3;
}
export declare class subMeshInfo {
    static classType: typeof subMeshInfo;
    matIndex: number;
    useVertexIndex: number;
    line: boolean;
    start: number;
    size: number;
}
