import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
export declare class ImageSetting extends AssetBundleFileInfo {
    static classType: typeof ImageSetting;
    imageName: string;
    filterMode: string;
    format: string;
    mipmap: boolean;
    wrap: string;
    premultiplyAlpha: boolean;
    imageGuid: string;
}
