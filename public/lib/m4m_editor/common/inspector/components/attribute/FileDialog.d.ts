export interface FileDialogAttrData {
    assetsList: contentListData[];
    sceneList: contentListData[];
}
interface contentListData {
    icon: string;
    name: string;
}
export declare function FileDialog(data: FileDialogAttrData): JSX.Element;
export {};
