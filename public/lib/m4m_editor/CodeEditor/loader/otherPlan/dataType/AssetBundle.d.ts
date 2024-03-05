import { cMap } from "../../../code/Map";
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
export declare class AssetBundlea {
    static classType: typeof AssetBundlea;
    className: string;
    fileName: string;
    pathName: string;
    fileSize: cMap<number>;
    files: AssetBundleFileInfo[];
    totalLength: number;
    version: string;
    createtime: string;
}
