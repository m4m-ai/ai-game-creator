import { IWindowData, IWindowInstance } from "./Window";
export declare class WindowManager {
    private static _instanceIndex;
    /**
     * 所有已经打开的窗体
     */
    static windowMap: Map<number, IWindowInstance>;
    /**
     * 返回是否存在指定 id 的窗口实例
     */
    static hasWindow(id: number): boolean;
    /**
     * 创建一个窗体, 返回当前窗体的实例 id, 关闭窗体等其它操作需要用上这个 id
     * @param windowData 窗体数据
     */
    static createWindow(windowData: IWindowData): number;
    /**
     * 根据 id 关闭窗口
     */
    static closeWindow(id: number): boolean;
    /**
     * 弹出保存询问窗口
     */
    static showSaveConfirm(title: string, path: string, value: string, onSave: (path: string, name: string) => void): number;
    /**
     * 返回 SaveConfirm 窗口是否打开
     */
    static hasSaveConfirm(): boolean;
    /**
     * 打开导航生成窗口
     */
    static showCreateNavigationConfirm(onSave: (data: any) => void): number;
    /**
     * 是否打开了导航网格生成窗口
     */
    static hasCreateNavigationConfirm(): boolean;
    /**
     * 弹出一个提示
     */
    static showTips(title: string, message: string, onClose?: () => void): number;
    static showAnimationWindow(): number;
    /**
     * 弹出新建窗口
     */
    static showCreateProjectWindow(): number;
    /**
     * 弹出提示窗口 (样例, 没有做样式)
     * @param message 显示文本
     * @param onClose 关闭时调用
     */
    static showTipsExample(message: string, onClose?: () => void): number;
    /**
     * 展示属性面板窗口 (样例)
     */
    static showAttrExample(): number;
    /**
     * 进度条窗口
     */
    static showProgressWindow(props: {
        title: string;
        progressNum: number;
        infoList: [];
        progressRefresh: Function;
    }): number;
    /**
     * build Settings 窗口
     */
    static showBuildSettingWindow(props: any): number;
    static showPackageManager(props: any): number;
}
