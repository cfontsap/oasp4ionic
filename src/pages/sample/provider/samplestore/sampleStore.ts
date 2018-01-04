import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the samplestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class samplestoreProvider {

  
  
  
  Table : any;


  constructor(public http: HttpClient) {
    this.Table = [{ name:null, surname:null, age:null,}];
  }

  setTable(table:any){
    this.Table = table;
  }

  getTable() : any {
    return this.Table;
  }
}
