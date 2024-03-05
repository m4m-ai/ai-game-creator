/// <reference types="./src/m4m" />
import React from "react";
export interface IComponentItemData {
    text: string;
    type: m4m.framework.Primitive2DType;
}
export declare const ComponentItem: React.MemoExoticComponent<(data: IComponentItemData) => JSX.Element>;
