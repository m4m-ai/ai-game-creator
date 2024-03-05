interface PropsType {
    setRefresh(setProgress: (progress: number) => void, setInfoList: (infoList: []) => void): void;
    progressNum: number;
    infoList: string[];
}
export declare function ProgressLoading(props: PropsType): JSX.Element;
export {};
