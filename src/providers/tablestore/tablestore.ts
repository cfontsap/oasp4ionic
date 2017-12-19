import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TablestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class TablestoreProvider {

  
  
  
  Search : any;
  NoSearch: any;

  constructor(public http: HttpClient) {
    console.log('Hello TablestoreProvider Provider');

    this.Search = [{name:"",surname:"",age:1}];
    this.NoSearch = [{name:"",surname:"",age:1}];
  }

  setSearch(table:Element[]){
    this.Search = table;
  }

  getSearch() : any {
    return this.Search;
  }

  setNoSearch(table:any){
    this.NoSearch = table;
  }
  
  getNoSearch() : any {
    return this.NoSearch;
  }
}
