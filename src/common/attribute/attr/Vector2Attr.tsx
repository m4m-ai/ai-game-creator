import React, {useCallback, useEffect, useState} from "react";
import {NumberInput} from "../NumberInput";
import {DragLabel} from "../DragLabel";
import {TouchPosition} from "../../../Game/Input/TouchPosition";
import {Utils} from "../../../Game/Utils";
import {IAttrComponent} from "../Attribute";
import vector2 = m4m.math.vector2;

/**
 * 2维向量
 */
export function Vector2Attr(data: IAttrComponent<m4m.math.vector2>) {
    let [v2, setV2] = useState<vector2>(new vector2(data.attrValue.x, data.attrValue.y));

    useEffect(() => {
        data.setRefresh(setV2);

        setV2(new vector2(data.attrValue.x, data.attrValue.y));
    }, [data])

    let dragX = useCallback((touch: TouchPosition, xDelta: number) => {
        if (!data.disable) {
            setV2((old) => {
                let v = Utils.number(old.x + xDelta * 0.05);
                data.onChange(new vector2(v, old.y));
                return new vector2(v, old.y);
            })
        }
    }, [data])

    let dragY = useCallback((touch: TouchPosition, xDelta: number) => {
        if (!data.disable) {
            setV2((old) => {
                let v = Utils.number(old.y + xDelta * 0.05);
                data.onChange(new vector2(old.x, v));
                return new vector2(old.x, v);
            })
        }
    }, [data])

    return (
        <div className="right-inp">
            <div className="right-inp-con">
                <div className="right-inp-con-1">
                    <DragLabel label={"X"} onDrag={dragX}></DragLabel>
                    <div>
                        <NumberInput value={v2.x}
                                     disable={data.disable}
                                     onChange={
                                         (v) => {
                                             data.onChange(new vector2(v, v2.y));
                                         }
                                     }
                                     setValue={(v) => setV2(new vector2(v, v2.y))}
                        ></NumberInput>
                    </div>
                </div>
                <div className="right-inp-con-1">
                    <DragLabel label={"Y"} onDrag={dragY}></DragLabel>
                    <div>
                        <NumberInput value={v2.y}
                                     disable={data.disable}
                                     onChange={
                                         (v) => {
                                             data.onChange(new vector2(v, v2.y));
                                         }
                                     }
                                     setValue={(v) => setV2(new vector2(v2.x, v))}
                        ></NumberInput>
                    </div>
                </div>
            </div>
        </div>
    )
}