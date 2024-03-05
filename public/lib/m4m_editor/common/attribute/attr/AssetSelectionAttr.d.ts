import { IAttrComponent } from "../Attribute";
export interface IAssetSelectionAttrData extends IAttrComponent<{
    name: string;
    key: string;
}> {
    /**
     * 资源类型, 例如: ["png", "jpg"], 为 null 表示所有类型
     */
    assetType?: string[];
}
/**
 * 资源选择器
 */
export declare function AssetSelectionAttr(data: IAssetSelectionAttrData): JSX.Element;
