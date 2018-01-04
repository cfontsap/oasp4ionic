import { NavParams, Platform, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { samplestoreProvider } from '../../../provider/samplestore/samplestore';
import { sampleBusinessProvider } from '../../../provider/sample-business/sample-business';
import { sampleItem} from '../../sample-operations/sample-operations';

/**
 * Generated class for the sampledialogComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sampledialog',
  templateUrl: 'sample-operations-dialog.html'
})
export class sampleoperationsdialogComponent {
    
    user : sampleItem;
    cleanuser : any;
    translations = {title : "Dialog", message: "message" }
    dialogtype = "";
    disables : {filter : boolean } = {filter : true};

    constructor(
      public platform: Platform, public params: NavParams,
      public viewCtrl: ViewController, public translate: TranslateService,
      public sampleBusiness: sampleBusinessProvider, public store: samplestoreProvider,
    ) {
      
      this.getTranslation("ionicBasic.sample.operations." + this.params.get('dialog'))
      this.dialogtype = this.params.get('dialog');
      this.user = this.params.get('edit');
      if(!this.user) this.user = {  name:null, surname:null, age:null,};
      if(this.dialogtype == "filter") this.disables.filter = false;
      this.cleanuser = { name:null , surname:null , age:null , id:null};
      
    }
  
    getTranslation(dialog:string){
      this.translate.get(dialog).subscribe(
        (data:any) => {
          this.translations = data;
        }
      )
    }

    dismiss() {
      
      this.viewCtrl.dismiss();
      this.disables.filter = true;
    }

    AddorModify(){

      for(let i in this.cleanuser){
        this.cleanuser[i] = this.user[i];
      }

      if(this.cleanuser.id!= null) this.user = this.cleanuser; //user has more than name, surname and age, it includes private data
      if(!this.user.name) return;
      
      this.sampleBusiness.Save(this.user).subscribe(
        (data: any) => {
          this.sampleBusiness.getTableM().subscribe(
            (data:any) => {
              this.store.setTable(data.result);
            }
          )
          this.cleanuser.id=null;
          this.dismiss();

        });
    }

    Search(){
      for (let i in this.user){
        if(this.user[i]=="") delete this.user[i]
      }
      if(!this.user) return;
      this.sampleBusiness.Filter(this.user).subscribe(
        (data : any) => {
          for (let i in data.result) {
            data.result[i].checkbox = false;
          }
          this.store.setTable(data.result);
          this.dismiss();

        }
      )
    }

    clearSearch(){
     this.sampleBusiness.getTableM().subscribe(
       (data:any) => {
         this.store.setTable(data.result);
       }
     )
      this.dismiss();
    }

  }