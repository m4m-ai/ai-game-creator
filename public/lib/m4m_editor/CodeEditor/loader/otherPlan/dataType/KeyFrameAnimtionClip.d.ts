import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { curve } from "./curve";
export declare class KeyFrameAnimtionClip extends AssetBundleFileInfo {
    static classType: typeof KeyFrameAnimtionClip;
    tag: string;
    frameRate: number;
    KeyFrameAnimtionlength: number;
    wrapMode: number;
    curves: curve[];
}
