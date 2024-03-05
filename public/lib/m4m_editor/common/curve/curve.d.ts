import React from 'react';
import { Vector2 } from './types';
interface CurveProps {
    data: Vector2[];
    symbolSize?: number;
    title?: string;
}
declare const Curve: React.FC<CurveProps>;
export default Curve;
