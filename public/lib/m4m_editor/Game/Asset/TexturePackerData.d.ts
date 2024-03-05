/**
 * 贴图打包传入的数据
 */
export declare type TexturePackerData = {
    /**
     * 贴图数据
     */
    texture: {
        path: string;
        key: string;
        buffer: Uint8Array;
    }[];
};
