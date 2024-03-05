import { cMap } from "../../../code/Map";
import { subClip } from "./subClip";
export declare class Aniclip {
    static classType: typeof Aniclip;
    fileName: string;
    aniclipName: string;
    fps: number;
    hasScaled: boolean;
    loop: boolean;
    boneCount: number;
    bones: string[];
    indexDic: cMap<number>;
    subclipCount: number;
    subclips: subClip[];
    frameCount: number;
    frames: cMap<Float32Array>;
}
