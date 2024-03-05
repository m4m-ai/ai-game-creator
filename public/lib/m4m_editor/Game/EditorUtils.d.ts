export declare class EditorUtils {
    static IsFunction(obj: any): boolean;
    static GetTime(): number;
    static GetNowFormatDate(): string;
    static Replace(src: string, find: string, resp: string): string;
    static GetWebRoot(): string;
    static GetWebEditorRoot(): string;
    static GetEditorWebRoot(): string;
    static StringToUtf8Array(str: string): number[];
    static GetNameFromURL(path: string): string;
    static GetParentPathFromURL(path: string): string;
    static File_str2blob(string: string): Blob;
    static File_u8array2blob(array: Uint8Array): Blob;
}
export declare function ParseNumber(val: any): number;
