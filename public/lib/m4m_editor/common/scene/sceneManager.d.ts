import { ReactElement } from "react";
import { IAttributeData } from "../attribute/Attribute";
export declare const IconFont: import("react").FC<import("@ant-design/icons/lib/components/IconFont").IconFontProps<string>>;
export interface SceneHeadType {
    key: string;
    value: ReactElement;
    isDisabled: boolean;
    isChecked: boolean;
    isLine: boolean;
    isDrop: boolean;
    changeChecked?: () => void;
    panel?: SceneHeadPanel;
    isPanelShow?: boolean;
    changePanel?: () => void;
}
/**
 * @options 属性列表
 * @lists 场景模式
 * @skybox 天空背景板
 */
export interface SceneHeadPanel {
    title?: string;
    setting?: PanelSetting;
    options?: SceneOptions[];
    lists?: SceneLists[];
    skybox?: SkyboxList[];
    gizmos?: Gizmos[];
}
export interface PanelSetting {
    icon: ReactElement;
    menu: (e: any) => void;
}
interface SceneLists {
    key: string;
    title: string;
    children?: {
        key: string;
        subtitle: string;
    }[];
}
interface SkyboxList {
    key: string;
    title: string;
    isChecked: boolean;
    onChange: () => void;
}
interface Gizmos {
    key: string;
    title: string;
    icon?: ReactElement;
    checkVis?: boolean;
    changeCheck?: () => void;
    items?: Gizmos[];
}
declare type SceneOptions = IAttributeData;
export declare class SceneManager {
}
export {};
