export declare class NetWebscoket {
    static get Instance(): NetWebscoket;
    /**********是否需要请求 配置数据***********
    */
    static reqconfigMes: boolean;
    fuck: string;
    private static _instance;
    private _webscoket;
    private _connected;
    connect(url: string): void;
    onmessage(e: any): void;
    sendMessage(buff: Uint8Array): void;
    onopen(e: any): void;
    send(bytes: Uint8Array): void;
    sendStr(mess: string): void;
    onclose(e: any): void;
    onerror(e: any): void;
    private onmessageHandler;
    private Close;
}
