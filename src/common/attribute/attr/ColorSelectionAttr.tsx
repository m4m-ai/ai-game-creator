import React, { useEffect, useState } from "react";
import { EditorEventMgr } from "../../../Game/Event/EditorEventMgr";
import { IAttrComponent, IAttributeData } from "../Attribute";
import color = m4m.math.color;

export interface IColorSelectionAttrData extends IAttrComponent<color> {

}

// interface Tab extends IAttributeData {
//     tabList: {
//         icon,
//         attrList: IAttributeData[]
//     }[]
// }

export function ColorSelectionAttr(data: IColorSelectionAttrData) {

    const [col, setCol] = useState(new color(data.attrValue.r, data.attrValue.g, data.attrValue.b, data.attrValue.a));
    
    useEffect(() => {
        data.setRefresh(setCol);

        setCol(new color(data.attrValue.r, data.attrValue.g, data.attrValue.b, data.attrValue.a));
    }, [data]);

    useEffect(() => {

        // setTimeout(() => {
        //     console.log("选择颜色", [new color(1,1,0,0.3)]);
        //     EditorEventMgr.Instance.emitEvent("OnSelectColor", cb => cb([new color(1,1,0,0.3)]));
        // }, 3000);

        let binder = EditorEventMgr.Instance.addEventListener("OnSelectColor", (colors) => {
            if (colors && colors.length > 0) {
                let item = colors[0];
                let tempColor = new color(item.r, item.g, item.b, item.a);
            
                data.onChange(new m4m.math.color(item.r, item.g, item.b, item.a));
                setCol(tempColor);
            }
        })

        return () => {
            binder.removeListener();
        }
    }, []);

    // const [bgColor, setBgColor] = useState('#000')
    // const [tranPer, setTranPer] = useState(40)


    return (
        <div style={{width: '100%'}}>
            <div className="color-box">
                <div className="color-content">
                    <div className="color-selected" style={{ backgroundColor: `rgb(${col.r * 255}, ${col.g * 255}, ${col.b * 255})` }}></div>
                    <div className="color-transparency" style={{ width: `${col.a * 100}%` }}></div>
                </div>
                <div className="color-pen flex-middle">P</div>
            </div>
        </div>
    )
}