import { BussinessOperatorProvider } from '../shared/bussiness-operator';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HTTP } from '@ionic-native/http';
import { AuthServiceProvider } from '../security/auth-service'
/*
  Generated class for the TablemanagementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TablemanagementProvider {

  constructor(public http: HttpClient, public BO: BussinessOperatorProvider) {
    // console.log('Hello TablemanagementProvider Provider');
  }

  getTableM(): Observable<any> {
    return this.http.post(this.BO.tableserv()+"search",{ }, { } );
  }

  NewItemM(fullitem : any){

    // let contructingitem = {name: fullitem.name, surname: fullitem.surname, age: fullitem.age };
    let contructingitem = {name: "jon", surname: "jon", age: 222 };

    return this.http.post(this.BO.tableserv(),contructingitem,{});
  }

  DeleteItemM(fullitem : any){
    this.http.post(this.BO.tableserv()+"search",{ name: "jon" }, { }).subscribe(
      (data: any) => {
        //console.log(data.result[0].id);
        if(data){
          return this.http.delete(this.BO.tableserv()+data.result[0].id, {}).subscribe(
              (datadel:any) => {
                  console.log(datadel);
              }
          )
        }
      }
    )
  }

  ModifyItemM(fullitem : any){
    this.http.post(this.BO.tableserv()+"search",{ name: "jon"}, { }).subscribe(
      (data: any) => {
        
        return this.http.post(this.BO.tableserv()+"search", {id: data.result.id}, {});
      }
    )
  }

}
