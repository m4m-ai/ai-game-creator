import { IAttributeData } from "../attribute/Attribute";
export interface mixerType {
    id: number;
    name: string;
    snapshots: snapshot[];
    groups: mixerInstanceType[];
    views: view[];
}
export interface mixerInstanceType {
    id: number;
    name: string;
    effects: effectType[];
    children?: mixerInstanceType[];
}
interface effectType extends IAttributeData {
    id: number;
    borderColor: string;
}
interface snapshot {
    id: number;
    name: string;
    isDefault: boolean;
}
interface view {
    id: number;
    name: string;
}
export declare class AudioMixerMgr {
}
export {};
