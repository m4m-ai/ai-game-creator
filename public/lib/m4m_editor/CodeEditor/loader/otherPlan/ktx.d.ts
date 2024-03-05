/// <reference types="./src/m4m" />
/**
 *
 * for description see https://www.khronos.org/opengles/sdk/tools/KTX/
 * for file layout see https://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/
 *
 * ported from https://github.com/BabylonJS/Babylon.js/blob/master/src/Misc/khronosTextureContainer.ts
 */
export declare class KTXParse {
    private static HEADER_LEN;
    /**
     *
     * @param gl
     * @param arrayBuffer contents of the KTX container file
     * @param facesExpected should be either 1 or 6, based whether a cube texture or or
     */
    static parse(gl: WebGL2RenderingContext, arrayBuffer: ArrayBuffer, facesExpected?: number, loadMipmaps?: boolean): m4m.render.glTexture2D;
}
