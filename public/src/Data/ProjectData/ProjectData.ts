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
export class ProjectData extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<ProjectData>;

	/**ID*/
	public id:string;
	/**项目名*/
	public projectName:string;
	/**项目备注*/
	public projectDesc:string;
	/**项目目录*/
	public projectPath:string;
	/**用户名*/
	public userName:string;
	/**上一次修改时间*/
	public lastTime:string;
	/**创建时间时间*/
	public creatTime:string;


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

var baseData:ProjectData = new ProjectData ();	
	baseData.id=br.readUTFBytes();
	
	baseData.projectName=br.readUTFBytes();
	
	baseData.projectDesc=br.readUTFBytes();
	
	baseData.projectPath=br.readUTFBytes();
	
	baseData.userName=br.readUTFBytes();
	
	baseData.lastTime=br.readUTFBytes();
	
	baseData.creatTime=br.readUTFBytes();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:ProjectData):ProjectData{
var clone :ProjectData = new ProjectData();
	clone.id=old.id;
	
	clone.projectName=old.projectName;
	
	clone.projectDesc=old.projectDesc;
	
	clone.projectPath=old.projectPath;
	
	clone.userName=old.userName;
	
	clone.lastTime=old.lastTime;
	
	clone.creatTime=old.creatTime;
	
return clone;
}

public   clone(old:ProjectData){
	this.id=old.id;
	
	this.projectName=old.projectName;
	
	this.projectDesc=old.projectDesc;
	
	this.projectPath=old.projectPath;
	
	this.userName=old.userName;
	
	this.lastTime=old.lastTime;
	
	this.creatTime=old.creatTime;
	
}
	private static params = ["id","projectName","projectDesc","projectPath","userName","lastTime","creatTime",];
	public static add(a: ProjectData, b: ProjectData, start: number = 0, end: number, limit: ProjectData) {
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

	public static sub(a: ProjectData, b: ProjectData, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: ProjectData, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: ProjectData, b: ProjectData, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: ProjectData, b: ProjectData, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: ProjectData, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: ProjectData, p: number, value) {
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

}if(!m4m.__ExcDate__)m4m.__ExcDate__= { } ; if(!m4m.__ExcDate__.__list) m4m.__ExcDate__.__list = []; m4m.__ExcDate__.__list.push(ProjectData);