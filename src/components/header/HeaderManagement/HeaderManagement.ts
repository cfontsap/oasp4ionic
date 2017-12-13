import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for t  setTitle(arg0: any): any {
    throw new Error("Method not implemented.");
  }
he HeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HeaderManagementProvider {

  // a var for each page?
  table : boolean = false;
  Title : string = "a";


  constructor(public http: HttpClient) {
    console.log('Hello HeaderProvider Provider');
  }

  inTableview() : boolean {
    return this.table;
  }
  
  EntryorExitTableview(state:boolean)  {
    this.table = state;
  }

  setTitle(title:string){
    this.Title = title;
  }

  getTitle() : string {
    return this.Title;
  }

}
