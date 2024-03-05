/// <reference types="./src/m4m" />
import './modalColor.css';
import { Dispatch, SetStateAction } from 'react';
interface propsType {
    color: m4m.math.color[];
    setColor: Dispatch<SetStateAction<m4m.math.color[]>>;
    handleCancel: () => void;
    handleOk: () => void;
}
declare const ModalColor: (props: propsType) => JSX.Element;
export default ModalColor;
