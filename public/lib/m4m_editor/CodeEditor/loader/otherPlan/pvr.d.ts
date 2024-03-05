/// <reference types="./src/m4m" />
export declare class testPvrParse {
    height: number;
    width: number;
    constructor(gl: WebGL2RenderingContext);
    private version;
    private flags;
    private pixelFormatH;
    private pixelFormatL;
    private channelType;
    private depth;
    private numFaces;
    private mipMapCount;
    private metaDataSize;
    private gl;
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 解析pvr图片
     * @param _buffer 图片二进制数据
     * @version m4m 1.0
     */
    parse(_buffer: ArrayBuffer): m4m.render.glTexture2D;
    private parseV3;
}
