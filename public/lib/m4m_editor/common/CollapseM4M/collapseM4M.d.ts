interface collapsePropsType {
    collapseData: collapseItem[];
}
interface collapseItem {
    header: string;
    key: string | number;
    content: any;
}
export declare function CollapseM4M(props: collapsePropsType): JSX.Element;
export {};
