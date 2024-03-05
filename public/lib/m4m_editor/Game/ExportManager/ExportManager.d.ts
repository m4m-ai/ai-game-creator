/// <reference types="./src/m4m" />
import { FileData } from "./FileData";
export declare class ExportManager {
    static setProjectToken(token: string): void;
    private static projectToken;
    /**
     * 单文件上传, 如果上传成功, Response 的内容为文件的key
     * @param path 文件上传路径
     * @param buffer 文件内容
     */
    static uploadFile(path: string, buffer: Uint8Array): Promise<Response>;
    static getFileUrl(relativePath: string): string;
    static getClipByKey(key: string, pare?: m4m.framework.aniplayer, callback?: Function): void;
    static getMeshByKey(key: string, pare?: m4m.framework.skinnedMeshRenderer | m4m.framework.meshFilter, callback?: Function): void;
    static getMatByKey(key: string, pare?: m4m.framework.skinnedMeshRenderer | m4m.framework.meshRenderer, callback?: Function): void;
    static getImageSettingByKey(key: string, typekey: string, mat: m4m.framework.material): void;
    static loadFile(key: string, className: string, callback?: Function): void;
    static test2(dirKey: string, fileName: string): void;
    static exportScene(dirKey: string, fileName: string): void;
    static CreatSceneByKey(jsonKey: any): void;
    static export3dPrefab(dirKey: string, fileName: string, tran: m4m.framework.transform): void;
    static Creat3DPrefabByKey(jsonKey: any, pareTran: m4m.framework.transform): void;
    static Creat3DPrefab(prefabKey: string, pareTran: m4m.framework.transform, isScene: boolean): void;
    /**
     * 多文件上传
     * @param files 文件列表
     * @param callback 服务器响应回调, response: 请求响应数据, index: 当前文件索引, count: 文件总数
     * @param finish 所有文件上传完成后回调
     */
    static uploadFiles(files: FileData[], callback?: (response: Response, index: number, count: number) => Promise<void>, finish?: () => void): Promise<void>;
    static test(dirKey: string): void;
    static export2dPrefab(dirKey: string, fileName: string, prefab2D: m4m.framework.transform2D): void;
    static getPrefab2DByKey(key: string, pare: m4m.framework.transform2D): void;
    static getPrefab2DByBuffer(bytes: ArrayBuffer): m4m.framework.transform2D;
    private static isExport;
    private static getUiTranInfo;
    private static getACompInfo;
    private static getTranInfo;
}
