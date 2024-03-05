import { MouseEvent } from "react";
import './ContextMenu.css';
export interface IContextMenuData {
    /** x坐标 */
    x: number;
    /** y坐标 */
    y: number;
    items: IMenuOption[];
}
export interface IMenuOption {
    /** 显示文本 */
    title: string;
    /** 点击回调 */
    onClick(e: MouseEvent): any;
    children?: IMenuOption[];
}
export declare function ContextMenuSlot(): JSX.Element;
