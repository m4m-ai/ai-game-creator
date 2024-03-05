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
import { TabData } from "./TabData";
import { DirectionType } from "./UIComponentBaseData";

export class TabListData {
    //默认竖排
    public layoutType: DirectionType = DirectionType.Vertical;
    public offset: number = 10;
    public initXPlace: number = 0;
    public initYPlace: number = 0;
    public tabLayoutX: m4m.framework.layoutOption;
    public tabLayoutY: m4m.framework.layoutOption;
    public tabData: TabData;
    public tab: any;
    public parentTrans: m4m.framework.transform2D;
    public tabName: string;
    public list: any[];
}