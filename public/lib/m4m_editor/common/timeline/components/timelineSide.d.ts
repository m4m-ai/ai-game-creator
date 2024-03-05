import { TimelineState } from '@xzdarcy/react-timeline-editor';
import React from 'react';
import { TimelineType } from '../timeline';
import { IComponentInfo } from '../../../Game/Component/EditorComponentMgr';
export declare function TimelineSide(datas: {
    datas: TimelineType[];
    timelineState: React.MutableRefObject<TimelineState>;
    trackdatas: IComponentInfo[];
}): JSX.Element;
