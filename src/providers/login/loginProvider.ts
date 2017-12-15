import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BussinessOperatorProvider } from '../shared/bussiness-operator'
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {


  data: any;
  header = '';


  constructor(public http: HttpClient, private BO: BussinessOperatorProvider) {
    this.data = null;
  }

  login(loginparams: any): Observable<any> {
    // this calls a function that connects to a rest service
    return this.IonicAngularLogin(loginparams.username, loginparams.password)
  }

  // uses angular http
  IonicAngularLogin(login, password): Observable<any> {
    return this.http.post(this.BO.login(), //url
      { username: login, password: password }, //body
      { responseType: "text", observe: 'response' });
  }

}
