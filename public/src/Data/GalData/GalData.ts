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
export class GalData extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<GalData>;

	/**ID*/
	public id:string;
	/**项目Id*/
	public projectId:string;
	/**进度记录*/
	public schedule:number;
	/**ga名字*/
	public galName:string;
	/**背景设定*/
	public backStory:string;
	/**故事大纲*/
	public storyOutLine:string;
	/**美术风格*/
	public artStyle:string;
	/**背景图片*/
	public BackGrounds:{ [id: string]:string};
	/**背景图片Json*/
	public BackGroundsJson: string;
	/**角色*/
	public roles:{ [id: string]:string};
	/**角色Json*/
	public rolesJson: string;
	/**章节*/
	public chapters:string[];
	/**章节场景树*/
	public chapterScenes:{ [id: string]:string[]};
	/**章节场景树Json*/
	public chapterScenesJson: string;
	/**章节名字*/
	public chaptersName:string[];
	/**章节场景树名字*/
	public chapterScenesName:{ [id: string]:string[]};
	/**章节场景树名字Json*/
	public chapterScenesNameJson: string;


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

var baseData:GalData = new GalData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.projectId=br.readUTFBytes();
	
	baseData.schedule=br.readInt32();
	
	baseData.galName=br.readUTFBytes();
	
	baseData.backStory=br.readUTFBytes();
	
	baseData.storyOutLine=br.readUTFBytes();
	
	baseData.artStyle=br.readUTFBytes();
	
	baseData.BackGroundsJson=br.readUTFBytes();
	
	baseData.rolesJson=br.readUTFBytes();
	
	baseData.chapters = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})();
	
	baseData.chapterScenesJson=br.readUTFBytes();
	
	baseData.chaptersName = (() => { let cache:any[] = []; let len = br.readUInt32(); for(let i=0;i<len;i++) {cache.push(br.readUTFBytes());}return cache;})();
	
	baseData.chapterScenesNameJson=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:GalData):GalData{
var clone :GalData = new GalData();
	clone.id=old.id;
	
	clone.projectId=old.projectId;
	
	clone.schedule=old.schedule;
	
	clone.galName=old.galName;
	
	clone.backStory=old.backStory;
	
	clone.storyOutLine=old.storyOutLine;
	
	clone.artStyle=old.artStyle;
	
	clone.BackGrounds=old.BackGrounds;
	
	clone.roles=old.roles;
	
	clone.chapters=old.chapters;
	
	clone.chapterScenes=old.chapterScenes;
	
	clone.chaptersName=old.chaptersName;
	
	clone.chapterScenesName=old.chapterScenesName;
	
return clone;
}

public   clone(old:GalData){
	this.id=old.id;
	
	this.projectId=old.projectId;
	
	this.schedule=old.schedule;
	
	this.galName=old.galName;
	
	this.backStory=old.backStory;
	
	this.storyOutLine=old.storyOutLine;
	
	this.artStyle=old.artStyle;
	
	this.BackGrounds=old.BackGrounds;
	
	this.roles=old.roles;
	
	this.chapters=old.chapters;
	
	this.chapterScenes=old.chapterScenes;
	
	this.chaptersName=old.chaptersName;
	
	this.chapterScenesName=old.chapterScenesName;
	
}
	private static params = ["id","projectId","schedule","galName","backStory","storyOutLine","artStyle","BackGrounds","roles","chapters","chapterScenes","chaptersName","chapterScenesName",];
	public static add(a: GalData, b: GalData, start: number = 0, end: number, limit: GalData) {
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

	public static sub(a: GalData, b: GalData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: GalData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: GalData, b: GalData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: GalData, b: GalData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: GalData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: GalData, p: number, value) {
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

}if(!m4m.__ExcDate__)m4m.__ExcDate__= { } ; if(!m4m.__ExcDate__.__list) m4m.__ExcDate__.__list = []; m4m.__ExcDate__.__list.push(GalData);