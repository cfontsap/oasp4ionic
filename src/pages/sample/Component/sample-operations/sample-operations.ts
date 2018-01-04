
import { samplePage } from '../../sample';
import { AlertController, ModalController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sampleoperationsdialogComponent } from './sample-operations-dialog/sample-operations-dialog'
import { samplestoreProvider } from '../../provider/samplestore/samplestore';
import { sampleBusinessProvider } from '../../provider/sample-business/sample-business';
/**
 * Generated class for the sampleOperationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export interface sampleItem{
    name: String ,    surname: String ,    age: number ,
}

@Component({
  selector: 'sample-operations',
  templateUrl: 'sample-operations.html'
})
export class sampleOperationsComponent {

  DeleteTranslations: any = {};
  interfaceuser : sampleItem = { name:null, surname:null, age:null, };
  tabletoshow: any;
  DeleteButtonnames=["dismiss","confirm"];
  DeleteButtons=[
                 { text: "", handler: data => {  }}, 
                 { text: "", handler: data => { this.DeleteConfirmed(); } }
                ]

  @Input() isDisabled: boolean = true;

  constructor(public translate: TranslateService, public alertCtrl: AlertController,
    public sampleBusiness: sampleBusinessProvider, public samplePage: samplePage,
    public modalCtrl: ModalController, public store: samplestoreProvider) {
  }


  getTranslation(text: string): string {

    let value: string;
    this.translate.get(text).subscribe((res: string) => {
      value = res;
    });
    this.translate.onLangChange.subscribe(
      () => {
       for (let i in this.DeleteButtons){
          this.translate.get("ionicBasic.sample.operations.delete."+this.DeleteButtonnames[i]).subscribe(
            (data:any) => {
              this.DeleteButtons[i].text = data;
            }
          )
      }
    }
    );
    return value;
  }

  promptFilterClicked() {
    this.isDisabled = true;
    let modal = this.modalCtrl.create(sampleoperationsdialogComponent, { dialog: "filter", edit: null });
    modal.present();
    modal.onDidDismiss(() => this.samplePage.reloadsamplePageTable());
  }

  //Add Operation
  promptAddClicked() {

    let modal = this.modalCtrl.create(sampleoperationsdialogComponent, { dialog: "add", edit: null });
    modal.present();
    modal.onDidDismiss(() => 
    this.samplePage.reloadsamplePageTable()
    );
  }
  
  // deletes the selected element
  DeleteConfirmed() {
    let index = this.samplePage.getindex();
    if (!index && index != 0) {
      return;
      }
    let cleanuser = this.interfaceuser;
    let search = this.samplePage.tabletoshow[index]
    for(let i in cleanuser){
      cleanuser[i] = search[i];
    }
    this.sampleBusiness.getItemId(cleanuser).subscribe(
      (Idresponse: any) => {
        this.sampleBusiness.DeleteItem(Idresponse.result[0].id).subscribe(
          (deleteresponse) => {
            
            this.sampleBusiness.getTableM().subscribe(
              (data:any) => {
                this.store.setTable(data.result);
                this.samplePage.reloadsamplePageTable();
              }
            );
            
          }
        )
      }
    )
  }

  DeleteConfirmForm() {
    
    this.DeleteTranslations = this.getTranslation('ionicBasic.sample.operations.delete');
    for (let i in this.DeleteButtons){
      this.DeleteButtons[i].text=this.DeleteTranslations[this.DeleteButtonnames[i]];
    }
    let prompt = this.alertCtrl.create({
      title: this.DeleteTranslations.title,
      message: this.DeleteTranslations.message,
      buttons: this.DeleteButtons
    });
    prompt.present();
    
    
  }

  promptModifyClicked() {
    let index = this.samplePage.getindex();
    if (!index && index != 0) {
      return;
    }
    let modal = this.modalCtrl.create(sampleoperationsdialogComponent, { dialog: "modify", edit:this.store.getTable()[index]});
    modal.present();
    modal.onDidDismiss(() => this.samplePage.reloadsamplePageTable());
    
  }
}