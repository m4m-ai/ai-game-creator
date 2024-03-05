export declare class AwaitDataManager {
    private static _map;
    static awaitFor(name: string, success: Function, error?: Function): void;
    static dispatchSuccess(name: string, params: any[]): void;
    static dispatchError(name: string, params: any[]): void;
}
