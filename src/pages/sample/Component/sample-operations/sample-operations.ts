import { SamplePage } from '../../sample';
import { AlertController, ModalController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablemanagementProvider } from '../../../../providers/tablemanagement/tablemanagement';
import { SampleoperationsdialogComponent } from './sample-operations-dialog/sample-operations-dialog'
import { TablestoreProvider } from '../../../../providers/tablestore/tablestore';

/**
 * Generated class for the TableOperationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export interface Item{
  name:string ,
  surname:string,
  age:number,
}

@Component({
  selector: 'sample-operations',
  templateUrl: 'sample-operations.html'
})
export class SampleOperationsComponent {

  DeleteTranslations: any = {};
  interfaceuser : Item = { name:null, surname:null, age: null };
  tabletoshow: any;
  DeleteButtonnames=["dismiss","confirm"];
  DeleteButtons=[
                 { text: this.getTranslation('ionBasic.Sample.operations.delete.dismiss'), handler: data => {  }}, 
                 { text: this.getTranslation('ionBasic.Sample.operations.delete.confirm'), handler: data => { this.DeleteConfirmed(); } }
                ]

  @Input() isDisabled: boolean = true;

  constructor(public translate: TranslateService, public alertCtrl: AlertController,
    public tableManagement: TablemanagementProvider, public SamplePage: SamplePage,
    public modalCtrl: ModalController, public store: TablestoreProvider) {
  }


  getTranslation(text: string): string {

    let value: string;
    this.translate.get(text).subscribe((res: string) => {
      value = res;
    });
    this.translate.onLangChange.subscribe(
      () => {
       for (let i in this.DeleteButtons){
          this.translate.get("ionBasic.Sample.operations.delete."+this.DeleteButtonnames[i]).subscribe(
            (data:any) => {
              this.DeleteButtons[i] = data;
            }
          )
      }
    }
    );
    return value;
  }

  promptFilterClicked() {
    this.isDisabled = true;
    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, { dialog: "filter", edit: null });
    modal.present();
    modal.onDidDismiss(() => this.SamplePage.reloadSamplePageTable());
  }

  //Add Operation
  promptAddClicked() {

    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, { dialog: "add", edit: null });
    modal.present();
    modal.onDidDismiss(() => 
    this.SamplePage.reloadSamplePageTable()
    );
  }
  
  // deletes the selected element
  DeleteConfirmed() {
    let index = this.SamplePage.getindex(); // i get the index of the item to delete in the table we have in the view
    if (!index && index != 0) {
      return;
    }
    let cleanuser = this.interfaceuser;
    let search = this.SamplePage.tabletoshow[index]
    for(let i in cleanuser){
      cleanuser[i] = search[i];
    }
    this.tableManagement.getItemId(cleanuser).subscribe(
      (Idresponse: any) => {
        this.tableManagement.DeleteItem(Idresponse.result[0].id).subscribe(
          (deleteresponse) => {
            
            this.tableManagement.getTableM().subscribe(
              (data:any) => {
                this.store.setTable(data.result);
                this.SamplePage.reloadSamplePageTable();
              }
            );
            
          }
        )
      }
    )
  }

  DeleteConfirmForm() {
    
    this.DeleteTranslations = this.getTranslation('ionBasic.Sample.operations.delete');
    let prompt = this.alertCtrl.create({
      title: this.DeleteTranslations.title,
      message: this.DeleteTranslations.message,
      buttons: this.DeleteButtons
    });
    prompt.present();
    
    
  }

  promptModifyClicked() {
    let index = this.SamplePage.getindex();
    if (!index && index != 0) {
      return;
    }
    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, { dialog: "modify", edit:this.store.getTable()[index]});
    modal.present();
    modal.onDidDismiss(() => this.SamplePage.reloadSamplePageTable());
    
  }
}
