import { AssetBundleFileInfo } from "./dataType/AssetBundleFileInfo";
import { cMap } from "../../code/Map";
export declare class fileInfo {
    static classType: typeof fileInfo;
    fileCount: cMap<number>;
}
export declare class testReadTool {
    static init(): void;
    static classType: typeof testReadTool;
    static tempListString: cMap<AssetBundleFileInfo[]>;
    static timer: cMap<number>;
    static index: number;
    /**
 * 加载资源组二进制数据（不进行解析）
 * @param url
 */
    static loadBufferFiles(url: string, isOnlyExportOne?: boolean): Promise<ArrayBuffer | AssetBundleFileInfo[]>;
    /**
     * 加载资源组二进制数据
     * @param url
     */
    static loadAssetBoundleFiles(url: string, isOnlyExportOne?: boolean): Promise<AssetBundleFileInfo[]>;
    static testRead2(db: any): any;
    static testRead(db: any): any;
    static readInfoByBuffer(url: string, bd: ArrayBuffer): AssetBundleFileInfo[];
    static readArrayBuffer(url: string, cb: Function): void;
    /**
     * 解析类
     * @param br
     * @param classObj
     */
    private static readBytes;
    private static readFloat;
    static readListV3(br: ArrayBuffer, listLen: number, pos: number, cb: Function): void;
    /**
     * 解析数据
     * @param br
     * @param type
     */
    static aaaaaaa: number;
    static aaaaaaabbbbbbbbbb: number;
    private static readValue;
    static TypeListCount: cMap<number>;
    private static readTypes;
}
