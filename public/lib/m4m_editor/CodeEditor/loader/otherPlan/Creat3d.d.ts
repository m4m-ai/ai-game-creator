/// <reference types="./src/m4m" />
import { Aniclip } from "./dataType/Aniclip";
import { Mat } from "./dataType/Mat";
import { Mesh } from "./dataType/Mesh";
import { Prefab } from "./dataType/Prefab";
export declare class Creat3d {
    private static aniplayer;
    static makeAPrefab(pfInfo: Prefab, insidMap: any): m4m.framework.transform;
    static setCompsToTran(trans: m4m.framework.transform, pfInfo: Prefab, insidMap: any): void;
    private static makeAComp;
    static setMat(matData: Mat, mat: m4m.framework.material): m4m.framework.material;
    static creatClip(element: Aniclip, animc: m4m.framework.animationClip, pfbName?: string): m4m.framework.animationClip;
    static createMesh(meshData: Mesh, _mesh: m4m.framework.mesh, webgl: WebGL2RenderingContext): m4m.framework.mesh;
    static createImageSetting(mainImgData: any, key: string, typekey: string, mat: m4m.framework.material): void;
    private static readonly allEnd;
    private static readonly noClipEnd;
    private static readonly noMeshEnd;
    private static readonly meshEnd;
    private static readonly tNormal;
    private static readonly tPVR;
    private static readonly tDDS;
    private static readonly tKTX;
    private static readonly tASCT;
}
