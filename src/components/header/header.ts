import { TablePage } from '../../pages/table/table';
import { HomePage } from '../../pages/home/home';
import { WelcomePage } from '../../pages/welcome/welcome'
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { LoginProvider } from '../../providers/login/loginProvider';
import {TablestoreProvider} from '../../providers/tablemanagement/tablestore'
import {HeaderManagementProvider} from './HeaderManagement/HeaderManagement'
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
  Title = ""
  _text: string;
  language = 'EN'
  pages:any;
  table : boolean = false;

  @Input()
  set text(newTitle: string) {
      newTitle = newTitle.trim();
      if (newTitle.length === 0) {
          newTitle = this.Title;
      }
      this._text = newTitle;
  }

  get title() {
      return this.Title;
  }

  

  constructor(private translate: TranslateService,private navCtrl: NavController, private auth: AuthServiceProvider,
    public tableStore: TablestoreProvider ,public loginp : LoginProvider, public headerManager : HeaderManagementProvider) {
    //this._text = 'Hello World';
    this.pages = [
      
      { title: 'Welcome', component: WelcomePage},
      { title: 'Home', component:  HomePage},
      { title: 'Table', component: TablePage}
    ];
  }


  togglelanguage(lang: string){
    
    this.translate.use(lang);
    this.language = lang;
  }

  isauthenthicated(){
    return this.auth.getAuthenthicated();
  }

  inTableview(){
    return this.headerManager.inTableview();
  }

  arrivedTable(){
    this.table = true;
  }

  LeftTable(){
    this.table = false;
  }

  logout(){
    this.loginp.IonicAngularLogout();
    // console.log(this.auth.getToken());
    this.navCtrl.setRoot(HomePage);
  }
  currentlanguage(lang: String){
    if( lang == this.language ) {
      return true;
    }
    return false;
  }
}
