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
//请在项目中，将 SyncObject、cMap 注入到 m4m.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let m4m;
export class DialogData extends ExcelDataBase{
	public static versition:number = 0;

	/** 
	* 从服务器同步数据到本地
	* @param fields 指定需要同步的字段 例如["name","desc"]
	*/
	public sync:(fields?:string[]) => Promise<void>;

	/** 
	* 保存数据到服务器
	* @param fields 指定需要保存的字段 例如["name","desc"]
	*/
	public save:(fields?:string[]) => Promise<void>;

	/** 
	* 获取数据数量
	*/
	public static getlistCount:() => Promise<number>;

	/** 
	* 获取列表数据
	* @param offset 从什么位置获取 默认值:0
	* @param count 指定需要保存的字段 例如["name","desc"]
	*/
	public static getlist:(offset?:number, count?:number) => Promise<DialogData>;

	/**对话ID*/
	public id:string;
	/**galId*/
	public gal:string;
	/**章节ID*/
	public chapter:string;
	/**场景ID*/
	public scene:string;
	/**角色ID*/
	public roleId:string;
	/**展示名字*/
	public showName:string;
	/**展示文本*/
	public content:string;
	/**表情*/
	public emote:string;
	/**角色立绘*/
	public roleDraws:{ [id: string]:string[]};
	/**角色立绘Json*/
	public roleDrawsJson: string;
	/**背景*/
	public backGround:{ [id: string]:string[]};
	/**背景Json*/
	public backGroundJson: string;
	/**声音*/
	public sound:{ [id: string]:string[]};
	/**声音Json*/
	public soundJson: string;
	/**语音*/
	public voice:{ [id: string]:string[]};
	/**语音Json*/
	public voiceJson: string;
	/**显示延迟*/
	public showDelay:number;
	/**跳过设置*/
	public skipType:number;
	/**振屏*/
	public screenShake:number[];
	/**不清除文本*/
	public notClear:boolean;
	/**变量设定*/
	public VariableFormula:string[];
	/**脚本*/
	public script:string[];


static get list(){ if(!this._list ){this._list = new cMap()}; return this._list;};
static set list(v){ this._list=v;};		
public static  parseData(br):void {
 var length:number = br.readInt32();

for (var i = 0; i < length; i++)
{var b:string = br.readUTFBytes();
var bb:string = br.readUTFBytes();
	
}	
var row:number = br.readInt32();
var length2:number = br.readInt32();
 for (var i = 0; i < row; i++)
{ 

var baseData:DialogData = new DialogData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.gal=br.readUTFBytes();
	
	baseData.chapter=br.readUTFBytes();
	
	baseData.scene=br.readUTFBytes();
	
	baseData.roleId=br.readUTFBytes();
	
	baseData.showName=br.readUTFBytes();
	
	baseData.content=br.readUTFBytes();
	
	baseData.emote=br.readUTFBytes();
	
	baseData.roleDrawsJson=br.readUTFBytes();
	
	baseData.backGroundJson=br.readUTFBytes();
	
	baseData.soundJson=br.readUTFBytes();
	
	baseData.voiceJson=br.readUTFBytes();
	
	baseData.showDelay=br.readFloat();
	
	baseData.skipType=br.readByte();
	
	baseData.screenShake = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readFloat());}return cache;})();
	
	baseData.notClear=br.readBoolean();
	
	baseData.VariableFormula = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})();
	
	baseData.script = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:DialogData):DialogData{
var clone :DialogData = new DialogData();
	clone.id=old.id;
	
	clone.gal=old.gal;
	
	clone.chapter=old.chapter;
	
	clone.scene=old.scene;
	
	clone.roleId=old.roleId;
	
	clone.showName=old.showName;
	
	clone.content=old.content;
	
	clone.emote=old.emote;
	
	clone.roleDraws=old.roleDraws;
	
	clone.backGround=old.backGround;
	
	clone.sound=old.sound;
	
	clone.voice=old.voice;
	
	clone.showDelay=old.showDelay;
	
	clone.skipType=old.skipType;
	
	clone.screenShake=old.screenShake;
	
	clone.notClear=old.notClear;
	
	clone.VariableFormula=old.VariableFormula;
	
	clone.script=old.script;
	
return clone;
}

public   clone(old:DialogData){
	this.id=old.id;
	
	this.gal=old.gal;
	
	this.chapter=old.chapter;
	
	this.scene=old.scene;
	
	this.roleId=old.roleId;
	
	this.showName=old.showName;
	
	this.content=old.content;
	
	this.emote=old.emote;
	
	this.roleDraws=old.roleDraws;
	
	this.backGround=old.backGround;
	
	this.sound=old.sound;
	
	this.voice=old.voice;
	
	this.showDelay=old.showDelay;
	
	this.skipType=old.skipType;
	
	this.screenShake=old.screenShake;
	
	this.notClear=old.notClear;
	
	this.VariableFormula=old.VariableFormula;
	
	this.script=old.script;
	
}
	private static params = ["id","gal","chapter","scene","roleId","showName","content","emote","roleDraws","backGround","sound","voice","showDelay","skipType","screenShake","notClear","VariableFormula","script",];
	public static add(a: DialogData, b: DialogData, start: number = 0, end: number, limit: DialogData) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] += b[par];
			if(limit && result[par] > limit[par])
				result[par] = limit[par];
		}
		return result;
	}

	public static sub(a: DialogData, b: DialogData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: DialogData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: DialogData, b: DialogData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: DialogData, b: DialogData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: DialogData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: DialogData, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

	private static dataCallBack: any[] = [];
	public static setGetDataFun(callBack){
		this.dataCallBack.push(callBack);}

	public static dataCall(data){
	for (let index = 0; index < this.dataCallBack.length; index++){
	let element = this.dataCallBack[index];
	if (element){ element(data);}
		}}

	private static chagneListCallBack: any[] = [];
	public static setGetAllDataFun(callBack){
		this.chagneListCallBack.push(callBack);}

	public static changeList(data){
	for (let index = 0; index < this.chagneListCallBack.length; index++){
	let element = this.chagneListCallBack[index];
	if (element){ element(data);}
		}}

}if(!m4m.__ExcDate__)m4m.__ExcDate__= { } ; if(!m4m.__ExcDate__.__list) m4m.__ExcDate__.__list = []; m4m.__ExcDate__.__list.push(DialogData);