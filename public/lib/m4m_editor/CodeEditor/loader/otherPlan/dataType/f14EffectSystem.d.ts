import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
export declare class f14EffectSystem extends AssetBundleFileInfo {
    static classType: typeof f14EffectSystem;
    className: string;
    Name: string;
    lifeTime: number;
    beloop: boolean;
    layers: layer[];
}
declare class layer {
    static classType: typeof layer;
    Name: string;
    type: string;
    singlemeshdata: Singlemeshdata;
    frames: frame[];
}
declare class Singlemeshdata {
    static classType: typeof Singlemeshdata;
    mesh: string;
    material: string;
    position: string;
    scale: string;
    euler: string;
    color: string;
    tex_ST: string;
    enableTexAnimation: boolean;
    uvType: string;
    uSpeed: number;
    vSpeed: number;
    row: number;
    column: number;
    count: number;
    beBillboard: boolean;
    bindAxis: string;
}
declare class frame {
    static classType: typeof frame;
    frameindex: number;
    vec3Atts: att[];
    vec4Atts: att[];
    colorAtts: att[];
}
declare class att {
    static classType: typeof att;
    name: string;
    value: string;
}
export {};
