/**
 * 资源引用
 */
export interface AssetReference {
    /**
     * 资源key
     */
    key: string;
}
/**
 * 图集引用数据
 */
export interface AtlasReference extends AssetReference {
    /**
     * 对应 sprite 的 guid
     */
    guid: string;
}
