import { TablePage } from '../../pages/table/table';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/Login/Login'
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { LoginProvider } from '../../providers/login/loginProvider';
import {TablestoreProvider} from '../../providers/tablemanagement/tablestore'
import {HeaderManagementProvider} from './HeaderManagement/HeaderManagement'
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'layoutheader',
  templateUrl: 'header.html',
  
})
export class HeaderComponent {
  @Input() Title : string;
  _text: string;
  language = 'EN'
  pages : any;

  @Input()
  set text(newTitle: string) {
      newTitle = newTitle.trim();
      if (newTitle.length === 0) {
          newTitle = this.Title;
      }
      this._text = newTitle;
  }
  
  constructor(private translate: TranslateService,private navCtrl: NavController, private auth: AuthServiceProvider,
    public tableStore: TablestoreProvider ,public loginp : LoginProvider, public headerManager : HeaderManagementProvider) {
    //this.Title = this.headerManager.getTitle();
  }


  togglelanguage(lang: string){
    this.translate.use(lang);
    this.language = lang;
  }

  isauthenthicated(){
    return this.auth.getAuthenthicated();
  }

  logout(){
    //this.loginp.IonicAngularLogout();
    this.auth.setToken("");
    this.auth.setAuthenthicated(false);
    this.navCtrl.setRoot(LoginPage);
  }
  currentlanguage(lang: String){
    if( lang == this.language ) {
      return true;
    }
    return false;
  }

  
}
