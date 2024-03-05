/**
 * 编辑器中的资源数据描述
 */
export declare type EditorAssetInfo = {
    id: number;
    /**
     * 是否是文件
     */
    isLeaf: boolean;
    /**
     * 文件key
     */
    key: string;
    /**
     * 该资源文件夹需要显示成特殊文件的类型
     */
    DirType?: string;
    /**
     * 文件后缀
     */
    FileType?: string;
    /**
     * 子目录, 当前资源为文件夹时才会有该字段
     */
    children?: EditorAssetInfo[];
    /**
     * 子文件, 当前资源为文件夹时才会有该字段
     */
    childrenFile?: EditorAssetInfo[];
    /**
     * 父目录
     */
    parentDirInfo?: EditorAssetInfo;
    /**
     * 资源路径
     */
    relativePath: string;
    type: string;
    /**
     * 文件名称
     */
    value: string;
    metaFile?: EditorAssetInfo[];
    /**
     * 描述文件, JSON 格式
     */
    meta?: string;
    [key: string]: any;
};
