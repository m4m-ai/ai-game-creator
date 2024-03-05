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
import { EditorEventMgr } from "../../Game/Event/EditorEventMgr";
import { IAttributeData } from "../attribute/Attribute";


export interface layerType {
  id: number;
  name: string;
  weight: number;
  setting: IAttributeData[];
}

export class LayerManager {

}

