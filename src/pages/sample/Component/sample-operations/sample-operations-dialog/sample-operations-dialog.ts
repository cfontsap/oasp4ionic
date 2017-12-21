import { AlertController, NavParams, Platform, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { SamplePage } from '../../../sample';
import { SamplestoreProvider } from '../../../provider/samplestore/samplestore';
import { SampleBussinessProvider } from '../../../provider/sampleBussiness/sampleBussiness';
import { SampleItem, SampleOperationsComponent } from '../../sample-operations/sample-operations';

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
    
    user : SampleItem;
    cleanuser : any;
    translations = {title : "Dialog", message: "message" }
    dialogtype = "";
    disables : {filter : boolean } = {filter : true};

    constructor(
      public platform: Platform, public params: NavParams,
      public viewCtrl: ViewController, public translate: TranslateService,
      public sampleManagement: SampleBussinessProvider, public store: SamplestoreProvider,
    ) {
      
      this.getTranslation("ionBasic.Sample.operations." + this.params.get('dialog'))
      this.dialogtype = this.params.get('dialog');
      this.user = this.params.get('edit');
      if(!this.user) this.user = {name:null, surname:null, age:null};
      if(this.dialogtype == "filter") this.disables.filter = false;
      this.cleanuser = {name:null, surname:null, age:null, id:null};
      
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
      
      this.sampleManagement.Save(this.user).subscribe(
        (data: any) => {
          this.sampleManagement.getTableM().subscribe(
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
      this.sampleManagement.Filter(this.user).subscribe(
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
     this.sampleManagement.getTableM().subscribe(
       (data:any) => {
         this.store.setTable(data.result);
       }
     )
      this.dismiss();
    }

  }