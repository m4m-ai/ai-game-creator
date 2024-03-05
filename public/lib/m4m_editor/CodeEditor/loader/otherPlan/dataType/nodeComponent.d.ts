/// <reference types="./src/m4m" />
import { Aniclip } from "./Aniclip";
import { tPoseInfo } from "./tPoseInfo";
import { PoseBoneMatrix } from "./PoseBoneMatrix";
import { KeyFrameAnimtionClip } from "./KeyFrameAnimtionClip";
export declare class nodeComponent {
    static classType: typeof nodeComponent;
    cmop: string;
}
export declare class boxcollider extends nodeComponent {
    static classType: typeof boxcollider;
    cmop: string;
    center: m4m.math.vector3;
    size: m4m.math.vector3;
}
export declare class aniplayer extends nodeComponent {
    static classType: typeof aniplayer;
    cmop: string;
    clips: Aniclip[];
    bones: tPoseInfo[];
    startPos: PoseBoneMatrix[];
    animNames: string[];
}
export declare class skinnedMeshRenderer extends nodeComponent {
    static classType: typeof skinnedMeshRenderer;
    cmop: string;
    materials: string[];
    center: m4m.math.vector3;
    size: m4m.math.vector3;
    mesh: string;
    rootBone: number;
    bones: number[];
    player: number;
}
export declare class meshFilter extends nodeComponent {
    static classType: typeof meshFilter;
    cmop: string;
    mesh: string;
}
export declare class meshRenderer extends nodeComponent {
    static classType: typeof meshRenderer;
    cmop: string;
    materials: string[];
    lightmapIndex: number;
    lightmapScaleOffset: m4m.math.quaternion;
    layer: number;
}
export declare class meshcollider extends nodeComponent {
    static classType: typeof meshcollider;
    cmop: string;
}
export declare class asbone extends nodeComponent {
    static classType: typeof asbone;
    cmop: string;
}
export declare class particlesystem extends nodeComponent {
    static classType: typeof particlesystem;
    cmop: string;
    particleSystemData: string;
    material: string;
    mesh: string;
    sortingFudge: number;
    pivot: m4m.math.vector3;
}
export declare class f14effCmop extends nodeComponent {
    static classType: typeof f14effCmop;
    cmop: string;
    f14eff: string;
    delay: number;
}
export declare class linerendererCmop extends nodeComponent {
    static classType: typeof linerendererCmop;
    cmop: string;
    lineRendererData: string;
    material: string;
}
export declare class keyFrameAniPlayer extends nodeComponent {
    static classType: typeof keyFrameAniPlayer;
    cmop: string;
    clips: KeyFrameAnimtionClip[];
}
export declare class spherecollider extends nodeComponent {
    static classType: typeof spherecollider;
    cmop: string;
    center: m4m.math.vector3;
    radius: number;
}
export declare class godray extends nodeComponent {
    static classType: typeof godray;
    cmop: string;
}
export declare class waterComp extends nodeComponent {
    static classType: typeof waterComp;
    cmop: string;
    copyFrom: number;
    defNumVertsPerRow: number;
}
