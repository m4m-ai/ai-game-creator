export declare enum AssetBundleFileType {
    None = 0,
    All = 1,
    Mesh = 2,
    Animation = 3,
    Material = 4,
    Texture = 5,
    Atlas = 6,
    Text = 7,
    Number = 8,
    Shader = 9,
    AssetsBunld = 10,
    AssetsBunldJ = 11,
    Prefab = 12,
    Scene = 13,
    Component = 14,
    Component2d = 15,
    Reference = 16,
    Transform = 17,
    Sprite = 18,
    Font = 19
}
export declare class ResMgr {
    static GetAllABForType(type: AssetBundleFileType): Array<string>;
    static SearchGlobalAssets(AType: AssetBundleFileType): string[];
}
