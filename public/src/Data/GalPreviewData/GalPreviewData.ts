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
export class GalPreviewData extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<GalPreviewData>;

	/**ID*/
	public id:string;
	/**项目Id*/
	public projectId:string;
	/**gal名字*/
	public galName:string;
	/**预览图片*/
	public previewImage:string;
	/**图标*/
	public icon:string;
	/**上次登陆时间*/
	public lastTime:string;


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

var baseData:GalPreviewData = new GalPreviewData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.projectId=br.readUTFBytes();
	
	baseData.galName=br.readUTFBytes();
	
	baseData.previewImage=br.readUTFBytes();
	
	baseData.icon=br.readUTFBytes();
	
	baseData.lastTime=br.readDouble();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:GalPreviewData):GalPreviewData{
var clone :GalPreviewData = new GalPreviewData();
	clone.id=old.id;
	
	clone.projectId=old.projectId;
	
	clone.galName=old.galName;
	
	clone.previewImage=old.previewImage;
	
	clone.icon=old.icon;
	
	clone.lastTime=old.lastTime;
	
return clone;
}

public   clone(old:GalPreviewData){
	this.id=old.id;
	
	this.projectId=old.projectId;
	
	this.galName=old.galName;
	
	this.previewImage=old.previewImage;
	
	this.icon=old.icon;
	
	this.lastTime=old.lastTime;
	
}
	private static params = ["id","projectId","galName","previewImage","icon","lastTime",];
	public static add(a: GalPreviewData, b: GalPreviewData, start: number = 0, end: number, limit: GalPreviewData) {
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

	public static sub(a: GalPreviewData, b: GalPreviewData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: GalPreviewData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: GalPreviewData, b: GalPreviewData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: GalPreviewData, b: GalPreviewData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: GalPreviewData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: GalPreviewData, p: number, value) {
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

}if(!m4m.__ExcDate__)m4m.__ExcDate__= { } ; if(!m4m.__ExcDate__.__list) m4m.__ExcDate__.__list = []; m4m.__ExcDate__.__list.push(GalPreviewData);