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
import { CellData } from "./CellData";

export class GridData {
    /***列*/
    public columns: number = 5;
    /***行*/
    public rows: number = 5;
    public offsetX: number = 10;
    public offsetY: number = 10;
    public bagType: number = -1;
    public initXPlace: number = 0;
    public initYPlace: number = 0;
    public cellLayoutX: m4m.framework.layoutOption;
    public cellLayoutY: m4m.framework.layoutOption;
    public cellData: CellData;
    public cell: any;
    public parentTrans: m4m.framework.transform2D;
    public cellName: string;
}