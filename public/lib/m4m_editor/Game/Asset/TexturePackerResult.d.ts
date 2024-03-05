/**
 * 贴图合并返回结果
 */
export interface TexturePackerResult {
    /**
     * 文件名
     */
    fileName: string;
    /**
     * 二进制数据
     */
    buffer: Uint8Array;
    /**
     * 描述贴图数据, json 字符串
     */
    atlas: string;
}
