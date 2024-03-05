import { IAttributeData } from '../attribute/Attribute';
import './index.css';
export interface layerInstance {
    id: number;
    name: string;
    weight: number;
    setting: IAttributeData[];
    states?: [];
}
export declare function Animator(): JSX.Element;
