/// <reference types="./src/m4m" />
import IEditorCode = m4m.framework.IEditorCode;
import font = m4m.framework.font;
import { TexturePackerResult } from "./TexturePackerResult";
import sprite = m4m.framework.sprite;
import { AtlasReference } from "./AssetReference";
import { EditorAssetInfo } from "./EditorAssetInfo";
export declare class EditorResources implements IEditorCode {
    /**
     * 默认字体
     */
    defaultFont: font;
    private tsRefreshTimer;
    private isTsRealoading;
    isClosed(): boolean;
    onStart(app: m4m.framework.application): any;
    onUpdate(delta: number): any;
    /**
     * 重新加载用户代码
     */
    reloadUserCode(path: string): void;
    /**
     * 初始化基础资源
     */
    initDefaultResources(): Promise<void>;
    /**
     * 检测是否存在文件
     * @param path 文件路径
     * @param callback 回调
     */
    existFile(path: string, callback: (result: boolean) => void): void;
    /**
     * 异步下载文件, 回调形式返回数据
     * @param path 文件路径
     * @param type 下载的数据类型
     * @param success 下载成功回调
     * @param fail 失败回调
     */
    loadFile(path: string, type: "string" | "buffer", success: (result: string | ArrayBuffer) => void, fail?: (error: any) => void): void;
    /**
     * 异步下载文件, 以Promise形式返回数据
     * @param path 文件路径
     * @param type 返回数据类型
     */
    loadFilePromise(path: string, type?: "string" | "buffer"): Promise<string | ArrayBuffer>;
    /**
     * 根据文件key异步下载文件, 回调形式返回数据
     * @param key 文件唯一key
     * @param type 下载的数据类型
     * @param success 下载成功回调
     * @param fail 失败回调
     */
    loadFileByKey(key: string, type: "string" | "buffer", success: (result: string | ArrayBuffer) => void, fail?: (error: any) => void): void;
    /**
     * 根据文件key异步下载文件, 以Promise形式返回数据
     * @param key 文件唯一key
     * @param type 下载的数据类型
     */
    loadFileByKeyPromise(key: string, type?: "string" | "buffer"): Promise<string | ArrayBuffer> | null;
    /**
     * 根据文件key加载texture
     * @param key
     * @param success
     * @param fail
     */
    loadTextureByKey(key: string, success: (tex: m4m.framework.texture) => void, fail?: (error: any) => void): void;
    /**
     * 根据文件路径加载texture
     * @param url
     * @param success
     * @param fail
     */
    loadTexture(url: string, success: (tex: m4m.framework.texture) => void, fail?: (error: any) => void): void;
    /**
     * 获取精灵资源
     * @param atlas
     * @param useCache
     * @param callback
     */
    getSpriteReference(atlas: AtlasReference, useCache: boolean, callback: (sp: sprite) => void): void;
    /**
     * 传入texture的id, 调用打包图集工具
     * @param keys 图片id
     * @param callback 回调函数
     */
    texturePackerByKeys(keys: string[], callback: (result: TexturePackerResult[]) => void): void;
    /**
     * 选中编辑器中的特殊资源文件
     * @param fileName 文件名称
     * @param path 文件路径, 相对于 Contents 的路径
     * @param assetInfo 该文件的描述对象
     */
    selectFile(fileName: string, path: string, assetInfo: EditorAssetInfo): void;
    /**
     * 打开编辑器中的文件 (双击), 需要执行异步操作
     * @param fileName 文件名称
     * @param path 文件路径, 相对于 Contents 的路径
     * @param assetInfo 该文件的描述对象
     */
    openFile(fileName: string, path: string, assetInfo: EditorAssetInfo): Promise<void>;
    /**
     * 异步加载资源
     * @param url 资源路径
     */
    loadAsset(url: string): Promise<m4m.framework.stateLoad>;
    /**
     * 打开预制体
     */
    openPrefab(psth: string, resName: string): void;
    /**
     * 打开场景
     * @param path 路径
     * @param resName 资源名
     */
    openScene(path: string, resName: string): Promise<void>;
    /**
     * 传入图片二进制数据, 调用打包图集工具
     * @param data 传入图片数据
     * @param callback 成功时的回调函数
     */
    private texturePacker;
}
