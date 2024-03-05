import { cMap } from "../../../code/Map";
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
import { mapUniInfo } from "./mapUniInfo";
export declare class Mat extends AssetBundleFileInfo {
    static classType: typeof Mat;
    shader: string;
    fileKey: string;
    srcshader: string;
    queue: number;
    mapUniform: cMap<mapUniInfo>;
    InstanceID: string;
}
