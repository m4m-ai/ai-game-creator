import React from "react";
import { TouchPosition } from "../../Game/Input/TouchPosition";
export interface IDragLabelData {
    label: string;
    onDrag: (touch: TouchPosition, xDelta: number) => void;
}
export declare const DragLabel: React.MemoExoticComponent<(data: IDragLabelData) => JSX.Element>;
