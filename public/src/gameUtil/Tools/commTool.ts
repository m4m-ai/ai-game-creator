/**
@license
Copyright (c) 2022 meta4d.me Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
/** 通用 Tool */

import { cMap } from "../Data/Map";
import { Loader } from "../Loader/loader";
import { LoaderManage, LoadType } from "../Loader/LoaderManage";

// tslint:disable-next-line: class-name
export class commTool {

    //------------ color -----------------
    //16进制颜色转10进制
    public static color16To10(str: string, out: m4m.math.color | m4m.math.vector4) {
        if (!out) { return; }
        if (out instanceof m4m.math.color) {
            out.r = parseInt(str.substring(0, 2), 16) / 255;
            out.g = parseInt(str.substring(2, 4), 16) / 255;
            out.b = parseInt(str.substring(4, 6), 16) / 255;
            out.a = 1;
        } else {
            out.x = parseInt(str.substring(0, 2), 16) / 255;
            out.y = parseInt(str.substring(2, 4), 16) / 255;
            out.z = parseInt(str.substring(4, 6), 16) / 255;
            out.w = 1;
        }
    }
    /** 图面 id 极速器 */
    private static imgIdCounter = 0;

    // /** 加载 的贴图缓存容器 */
    // private static loadedTexsDic: cMap<m4m.framework.texture> = new cMap();
    /**
     * 加载贴图
     * @param url 资源RUL
     * @param callBack 
     * @param needCache 是否缓存贴图对象（频繁加载的贴图推荐使用） 
     */
    public static loaderTextureFun(url: string, callBack: (_tex: m4m.framework.texture, _err?) => any) {
        // // tslint:disable-next-line: no-parameter-reassignment
        // // url = encodeURI(url);
        // if (commTool.loadedTexsDic.has(url)) {
        //     if (callBack) {
        //         let textu = commTool.loadedTexsDic.get(url);
        //         callBack(textu);
        //     }
        // } else {
        //     commTool.ImgByLoad(url, (_tex, _err) => {
        //         if (_err) {
        //             if (callBack) {
        //                 callBack(_tex, _err);
        //             }
        //             console.error("H5加载  " + url + "  出错！！！！");
        //         } else {
        //             if (_tex) {
        //                 if (needCache) { commTool.loadedTexsDic.set(url, _tex); }
        //                 if (callBack) {
        //                     callBack(_tex, _err);
        //                 }
        //             }
        //         }
        //     });
        // }

        commTool.ImgByLoad(url,callBack);
    }

    private static ImgByLoad(url: string, backFun: (tex: m4m.framework.texture, err?) => any) {
        // m4m.io.loadImg(url, (_tex, err) => {
        //     if (err) {
        //         console.error(err);
        //         if (backFun) {
        //             backFun(null, err);
        //         }
        //     } else {
        //         this.imgIdCounter++;
        //         //构建 img
        //         let _texture = new m4m.framework.texture(`_loadTex_${this.imgIdCounter}`);
        //         let _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
        //         let t2d = new m4m.render.glTexture2D(m4m.framework.sceneMgr.app.webgl, _textureFormat);
        //         t2d.uploadImage(_tex, false, true, false, false, false); //非2次幂 图 不能显示设置repeat
        //         _texture.glTexture = t2d;
        //         _texture.use();

        //         //清理 HTMLImageElement 的缓存
        //         // let guid = (_tex as any).guid;
        //         // if (guid != null) {
        //         delete m4m.framework.assetMgr.mapImage[url];
        //         delete m4m.framework.assetMgr.mapLoading[url];
        //         // }

        //         if (backFun) {
        //             backFun(_texture);
        //         }
        //     }
        // });

        LoaderManage.Instance.load(url, (loader:Loader, _tex:any)=>
        {
            this.imgIdCounter++;
            //构建 img
            let _texture = new m4m.framework.texture(`_loadTex_${this.imgIdCounter}`);
            let _textureFormat = m4m.render.TextureFormatEnum.RGBA;//这里需要确定格式
            let t2d = new m4m.render.glTexture2D(m4m.framework.sceneMgr.app.webgl, _textureFormat);
            t2d.uploadImage(_tex, false, true, false, false, false); //非2次幂 图 不能显示设置repeat
            _texture.glTexture = t2d;
            _texture.use();

            delete m4m.framework.assetMgr.mapImage[url];
            delete m4m.framework.assetMgr.mapLoading[url];

            if (backFun) {
                backFun(_texture);
            }
        }, LoadType.IMAGE);
    }
    /**
     * 将节点 改造成 UI事件屏蔽节点
     * @param trans UI节点对象
     * @returns 
     */
    public static makeUIEventDiscard(trans: m4m.framework.transform2D) {
        let uied = trans.getComponent("uiEventDiscard");
        if (uied) { return; }
        trans.addComponent("uiEventDiscard");
    }

    /**
     * 设置UI 渲染组件的 shader
     * @param shaderResName 
     * @param renderer 渲染组件对象（image2D、rawImage、label..）
     * @param needNewMaterial 切换成新的材质,替换老的材质
     */
    public static setUIShader(shaderResName: string, renderer: m4m.framework.IRectRenderer, needNewMaterial: boolean = false) {
        if (!shaderResName || !renderer) { return; }
        let r: any = renderer;
        if (!r.setShaderByName || !r.getMaterial) { return; }
        let mat: m4m.framework.material = r.getMaterial();
        r.setShaderByName(shaderResName);
        mat = r.uimat;//direct change;

        if (mat && r._uimat && needNewMaterial) {
            r._uimat = mat = mat.clone();
        }
        // tslint:disable-next-line: newline-per-chained-call
        if (!mat || mat.getShader().getName() == shaderResName) { return; }
        let assetMgr = m4m.framework.sceneMgr.app.getAssetMgr();
        let sh = assetMgr.getShader(shaderResName);
        if (sh) {
            // console.error("有设置shader "+shaderResName);
            mat.setShader(sh);
        }
    }

    /**
     * 遍历 transfrom2D 所有子节点
     * @param t transfrom2D 对象
     * @param fn 遍历检测方法 (函数 返回值 true ，中断遍历)
     * @returns 
     */
    public static forEachTransform2DTree(t: m4m.framework.transform2D, fn: (value: m4m.framework.transform2D) => any): any {
        if (!t || !fn) { return; }
        let needBreak = fn(t);
        if (needBreak) { return true; }

        if (t.children.length > 0) {
            for (let i = 0, len = t.children.length; i < len; i++) {
                let _needBreak = this.forEachTransform2DTree(t.children[i], fn);
                if (_needBreak) { return true; }
            }
        }
    }

    /**
     * 获取 UI 的全局路径(字符串)
     * @param ui 
     */
    public static getUIPathStr(ui: m4m.framework.transform2D) {
        let path = this.getUIPath(ui);
        let pathStr = "";
        path.forEach((v, i) => {
            if (v) {
                pathStr += v[0];
                if (v[1] != null) {
                    pathStr += ` ${v[1]}`;
                }
                if (i < path.length - 1) {
                    pathStr += ";";
                }
            }
        });

        return pathStr;
    }

    /**
     * 获取 UI 的全局路径
     * @param ui UI对象节点
     */
    private static getUIPath(ui: m4m.framework.transform2D) {
        let pathArr = [];
        let curr = ui;
        while (true) {
            if (!curr) { break; }
            let parent = curr.parent;
            let idx = -1;
            if (parent) {
                let children = parent.children;
                //是否 有同名对象在 parent 中
                if (children.length > 1) {
                    let has = false;
                    let _idx = 0;
                    for (let i = 0, len = children.length; i < len; i++) {
                        let v = children[i];
                        if (v.name != curr.name) { continue; }
                        if (curr == v) { break; }
                        has = true;
                        _idx++;
                    }

                    if (has) {
                        idx = _idx;
                    }
                }
            }

            let node: any[] = [curr.name];
            if (idx != -1) {
                node.push(idx);
            }

            pathArr.unshift(node);
            curr = parent;
        }

        return pathArr;
    }
}