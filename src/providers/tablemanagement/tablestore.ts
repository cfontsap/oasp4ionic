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
  ExpendableTable: any = this.StoredTable;

  constructor(public http: HttpClient) {
    this.StoredTable = [{name:"a",surname:"a", checkbox:false },{name:"b",surname:"b", checkbox:false },{name:"c",surname:"c", checkbox:false }];
  }

  getTableS(){
    if(this.StoredTable){
    this.ExpendableTable = this.StoredTable;
    return this.ExpendableTable;
    }
  }

  setTableS(newTable : any){

    let CompleteTable : any[] = new Array();

    for (let i in newTable){

      CompleteTable.push({name:newTable[i].name, surname:newTable[i].surname, age:newTable[i].age, checkbox :false});

    }
    this.StoredTable = CompleteTable;

   
  }

}
