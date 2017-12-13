import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { HomePage } from '../../pages/home/home';
import { WelcomePage } from '../../pages/welcome/welcome'

/**
 * Generated class for the LanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService, private auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagePage');
  }

  togglelanguage(lang: string){


    this.translate.use(lang);
    if(this.auth.getAuthenthicated()){
      this.navCtrl.setRoot(WelcomePage);
    } else {
      this.navCtrl.setRoot(HomePage);
    }


  }

}
