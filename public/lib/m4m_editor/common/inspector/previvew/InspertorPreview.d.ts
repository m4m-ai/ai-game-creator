import { EditorAssetInfo } from "../../../Game/Asset/EditorAssetInfo";
export interface IInspertorPreviewData {
    /** 文件的meta描述 */
    assetInfo: EditorAssetInfo;
}
/**
 * 预览文件
 */
export declare function InspertorPreview(data: IInspertorPreviewData): JSX.Element;
