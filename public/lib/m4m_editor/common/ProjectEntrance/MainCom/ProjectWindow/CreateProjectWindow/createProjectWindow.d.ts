export interface sideListType {
    id: number;
    name: string;
    icon: JSX.Element;
}
export interface tempListType {
    tempName: string;
    tempInfo: string;
    leftIcon: JSX.Element;
    tempType: string;
    isDownload: boolean;
    img?: string;
}
export declare const CreateProjectWindow: (props: {
    id: number;
}) => JSX.Element;
