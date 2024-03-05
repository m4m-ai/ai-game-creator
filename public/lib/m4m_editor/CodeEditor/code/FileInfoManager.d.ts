import { EditorAssetInfo } from "../../Game/Asset/EditorAssetInfo";
export declare class FileInfoManager {
    static get Instance(): FileInfoManager;
    /**********是否需要请求 配置数据***********
    */
    private static _instance;
    /**
     * 文件夹根节点
     */
    get rootFolder(): EditorAssetInfo;
    private fileMap;
    private dirMap;
    private keyPathMap;
    private _rootFolder;
    getKeyByPath(path: string): string;
    getFileByKey(key: string): EditorAssetInfo;
    getDirByKey(key: string): EditorAssetInfo;
    diguiDirPare(res: any, isInit?: boolean): void;
    setRoot(root: EditorAssetInfo): void;
}
