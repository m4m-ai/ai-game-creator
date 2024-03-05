interface tabItem {
    icon?: any;
    name?: string;
    key: number | string;
    content?: any;
}
interface TabsPropsType {
    tabsData: tabItem[];
}
export declare function TabsM4M(props: TabsPropsType): JSX.Element;
export {};
