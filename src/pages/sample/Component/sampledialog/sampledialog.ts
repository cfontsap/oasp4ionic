import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

/**
 * Generated class for the SampledialogComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sampledialog',
  templateUrl: 'sampledialog.html'
})
export class SampledialogComponent {

  text: string;

  constructor(public translate: TranslateService, public alertCtrl: AlertController, public whichDialog: string, public Inputs: any[]) {
    console.log('Hello SampledialogComponent Component');
    this.text = 'Hello World';
  }

  getTranslation(text: string): string {
    
        let value: string;
        this.translate.get(text).subscribe((res: string) => {
          value = res;
        });
        
        return value;
      }

  promptAddClicked() {
    let Headertranslations : any = this.getTranslation("ionBasic.Sample.operations" + this.whichDialog);
    let ionicbuttonstranslation : any = this.getTranslation("ionBasic.Sample.commonbuttons");
    let prompt = this.alertCtrl.create({
      title: Headertranslations.title,
      message: Headertranslations.message,
      inputs: this.Inputs,
      buttons: [
        {
          text: ionicbuttonstranslation.dismiss,
          handler: data => {
          }
        },
        {
          text: ionicbuttonstranslation.send,
          handler: data => {
            this.AddClicked(data);

          }
        }
      ]
    });
    prompt.present();
  }

}
