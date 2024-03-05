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
// tslint:disable-next-line: class-name
export class ioTool extends m4m.io.binTool {
    constructor() {
        super();
    }

    public readVector3(): m4m.math.vector3 {
        let x = this.readFloat();
        let y = this.readFloat();
        let z = this.readFloat();
        return new m4m.math.vector3(x, y, z);
    }

    public readVector4(): m4m.math.vector4 {
        let w = this.readFloat();
        let x = this.readFloat();
        let y = this.readFloat();
        let z = this.readFloat();
        return new m4m.math.vector4(w, x, y, z);
    }

    public readVector3Array(): m4m.math.vector3[] {
        let arr: m4m.math.vector3[] = new Array<m4m.math.vector3>();
        let num = this.readByte();
        for (let i: number = 0; i < num; i++) {
            let v3 = this.readVector3();
            arr.push(v3);
        }
        return arr;
    }
    public readReshsArray(): number[][] {
        let arr: number[][] = new Array<number[]>();
        let num = this.readByte();
        for (let i: number = 0; i < num; i++) {
            let len = this.readByte();
            let nums = new Array<number>();
            for (let j: number = 0; j < len; j++) {
                let nn = this.readInt32();
                nums.push(nn);
            }
            arr.push(nums);
        }
        //let str = this.readUTFBytes();
        // console.error(str);
        // if (!str||str=="") {
        //    return null;
        // }
        // var strArr = str.split("|");
        // for(let i=0,len=strArr.length;i<len;++i){
        //    var newstrArr =  strArr[i].split(",");
        //    var num = new Array<number>();
        //    for(let j=0,len=strArr.length;j<len;++j){
        //     var ii =Number(strArr[i]);
        //     num.push(ii);
        //    }
        //    arr.push(num);
        // }
        return arr;
    }
    public readNumArray(): number[] {
        let arr: number[] = new Array<number>();
        let num = this.readByte();
        for (let i: number = 0; i < num; i++) {
            //var len = this.readByte();
            let nn = this.readInt32();
            arr.push(nn);
        }
        return arr;
    }
}