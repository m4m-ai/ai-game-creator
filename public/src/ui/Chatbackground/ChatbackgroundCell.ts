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
import { GridConfig } from "Data/GridExtend/GridExtend";
import { ICellHandler } from "Data/GridExtend/ICellHandler";
import { Chatbackground } from "./Chatbackground";
import { ChatTab } from "Data/DataType";
import { ChatMessageDataManager } from "Manager/ChatMessageDataManager";

/**
 * 聊天页签
 */
export class ChatbackgroundCell implements ICellHandler {
    nowClass: Chatbackground.newchatbg_btn;
    index: number;
    config: GridConfig;
    cellData: ChatTab;
    public onInit(): void {
        this.nowClass.frame_img.transform.visible=false;
    }
    public onSetData(value: ChatTab): void {
        if (value) {
            this.cellData = value;
            this.nowClass.transform.visible = true;

            this.nowClass.newchattext1_lab.label.text=value.title;
            // console.error(element.value);
        } else {
            this.nowClass.transform.visible = false;
        }
    }

    public onClick() {
        // console.error("点击了 " + this.cellData);

    }

    public onUnSelect(){
        // console.error("取消选中 " + this.cellData);
        this.nowClass.frame_img.transform.visible=false;
    }

    public onSelect() {
        // console.log("选中了 " + this.cellData.title);
        this.nowClass.frame_img.transform.visible=true;
        //切换页签
        ChatMessageDataManager.Instance.changeChatTab(this.cellData.title);
    }
}