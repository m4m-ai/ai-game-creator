import { TimelineAction, TimelineRow } from '@xzdarcy/react-timeline-editor';
import './index.css';
import { IComponentInfo } from '../../Game/Component/EditorComponentMgr';
export interface CustomTimelineAction extends TimelineAction {
    data: {
        val: string;
    };
}
export interface TimelineType extends TimelineRow {
    title?: string;
    key?: string;
    actions: CustomTimelineAction[];
}
/**
 * 外部创建轨道
 */
export declare const createTrack: (data: TimelineType) => void;
export declare const TimelineEditor: (datas: {
    datas: IComponentInfo[];
}) => JSX.Element;
