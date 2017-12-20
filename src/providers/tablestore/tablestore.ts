import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TablestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class TablestoreProvider {

  
  
  
  Table : any;


  constructor(public http: HttpClient) {
    this.Table = [{name:"",surname:"",age:1}];;
  }

  setTable(table:any){
    this.Table = table;
  }

  getTable() : any {
    return this.Table;
  }
}
