import React, { FC } from 'react';
import { TimelineState } from '@xzdarcy/react-timeline-editor';
export declare const scaleWidth = 160;
export declare const scale = 5;
export declare const startLeft = 20;
export declare const Rates: number[];
export declare const TimelinePlayer: FC<{
    timelineState: React.MutableRefObject<TimelineState>;
    autoScrollWhenPlay: React.MutableRefObject<boolean>;
}>;
