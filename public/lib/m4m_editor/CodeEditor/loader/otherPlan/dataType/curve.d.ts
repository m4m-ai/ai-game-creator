import { keyFrame } from "./keyFrame";
export declare class curve {
    static classType: typeof curve;
    path: string;
    type: string;
    propertyName: string;
    keyFrames: keyFrame[];
}
