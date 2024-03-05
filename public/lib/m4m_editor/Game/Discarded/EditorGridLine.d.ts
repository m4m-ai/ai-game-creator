/// <reference types="./src/m4m" />
export declare class EditorGridLine {
    private owner;
    private _scene;
    private lineShader;
    frameWidth: number;
    frameHeight: number;
    scale: number;
    trans: m4m.framework.transform;
    constructor(owner: m4m.framework.transform, _scene: m4m.framework.scene, lineShader?: string);
    init(): void;
}
