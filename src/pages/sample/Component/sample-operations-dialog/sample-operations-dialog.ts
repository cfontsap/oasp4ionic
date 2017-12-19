import { AlertController, NavParams, Platform, ViewController } from 'ionic-angular';
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
  templateUrl: 'sample-operations-dialog.html'
})
export class SampleoperationsdialogComponent {
    
    user : {name: string , surname: string, age: number };
    translations = {title : "Dialog", message: "message" }
    dialogtype = "";
    editDialog : any = {name:null, surname: null, age:null};
    disables : {filter : boolean } = {filter : true}
    constructor(
      public platform: Platform, public params: NavParams,
      public viewCtrl: ViewController, public translate: TranslateService
    ) {
      
      this.getTranslation("ionBasic.Sample.operations." + this.params.get('dialog'))
      this.dialogtype = this.params.get('dialog');
      this.editDialog = this.params.get('edit');
      if(!this.editDialog) this.editDialog = {name:"",surname:"",age:""}
      
      if(this.dialogtype == "filter") this.disables.filter = false;
      this.user = { name:null, surname : null, age: null }

    }
  
    getTranslation(dialog:string){
      this.translate.get(dialog).subscribe(
        (data:any) => {
          this.translations = data;
          // console.log(data);
        }
      )
    }
    dismiss() {
      this.disables.filter = true;
      this.viewCtrl.dismiss();
    }
  }