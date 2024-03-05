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
import { UIComponentBaseData } from "./UIComponentBaseData";

export class CellData extends UIComponentBaseData {
    public selectIcon: m4m.framework.transform2D;
    //格子赋值 后数据
    public data: any;
    //是否显示tips 默认不显示
    public showTip: boolean = false;
    //
    public enabled: boolean = true;
    //双击
    public doubleClick: boolean = false;
    public Clone(): CellData {
        let data: CellData = new CellData();
        data.width = this.width;
        data.height = this.height;
        data.selectIcon = this.selectIcon;
        data.showTip = this.showTip;
        return data;
    }
}