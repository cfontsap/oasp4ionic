import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TablestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TablestoreProvider {

  StoredTable : any = [{name:"a",surname:"a", age: 101, checkbox:false },{name:"b",surname:"b", age: 41, checkbox:false },{name:"c",surname:"c", age: 23, checkbox:false }];
  length : number = 0;

  constructor(public http: HttpClient) {
    this.StoredTable = [{name:"a",surname:"a", checkbox:false },{name:"b",surname:"b", checkbox:false },{name:"c",surname:"c", checkbox:false }];
  }

  getTableS(){
    if(this.StoredTable){
    return this.StoredTable;
    }
  }

  getlength(){
    return this.length;
  }

  setTableS(newTable : any){
    //console.log(newTable);
    let newStoredTable : {name: String, surname: String, age: number, checkbox: boolean};
    let CompleteTable : any[] = new Array();
    let newlength: number = 0;
    for (let i in newTable){
      // console.log(newTable[i]);
      newStoredTable = {name:newTable[i].name, surname:newTable[i].surname, age:newTable[i].age, checkbox :false};
      CompleteTable.push(newStoredTable);
      newlength += 1
      // console.log(CompleteTable);
    }
    this.StoredTable = CompleteTable;
    length = newlength;
    // this.StoredTable = [{name:"b",surname:"b", id: 0 },{name:"a",surname:"a", id: 1 },{name:"cx",surname:"cx", id: 2 }];
  }

}
