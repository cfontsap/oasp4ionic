
import { HomePage } from '../pages/home/home';
import { AuthServiceProvider } from '../providers/security/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/Login/Login';
import { samplePage } from '../pages/sample/sample'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages:any;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthServiceProvider ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.pages = [
        { title: 'Home', component: HomePage},
        { title :'sample', component: samplePage},
      ];
    });
  }

  isauthenthicated(){
    return this.auth.getAuthenthicated();
  }
  openPage(p){
    
    this.nav.setRoot(p.component);
  }
}