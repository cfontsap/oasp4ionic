import { SamplePage } from '../../sample';
import { AlertController, ModalController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablemanagementProvider } from '../../../../providers/tablemanagement/tablemanagement';
import {SampleoperationsdialogComponent} from '../sample-operations-dialog/sample-operations-dialog'

/**
 * Generated class for the TableOperationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sample-operations',
  templateUrl: 'sample-operations.html'
})
export class SampleOperationsComponent {


  inputs = [
    { name: "name", placeholder: this.getTranslationOutsideAlerts("ionBasic.Sample.name")},
    { name: 'surname', placeholder: this.getTranslation("ionBasic.Sample.surname")},
    { name: 'age', placeholder: this.getTranslation("ionBasic.Sample.age")}
  ];
  
  ionicbuttonstranslation : any = this.getTranslation("ionBasic.Sample.commonbuttons");

  searchTerms: any = {
    name: null,
    surname: null,
    age: null,
  };

  alerCtrl: any;
  tabletoshow: any;
  constructingitem = { id: '', name: '', surname: '', age: '' };

  @Input() isDisabled: boolean = true;

  constructor(public translate: TranslateService, public alertCtrl: AlertController,
    public tableManagement: TablemanagementProvider, public SamplePage: SamplePage, 
    public modalCtrl: ModalController) {
  }


  getTranslation(text: string): string {

    let value: string;
    this.translate.get(text).subscribe((res: string) => {
      value = res;
    });
    
    return value;
  }

  getTranslationOutsideAlerts(text: string){

    let value: string;
    this.translate.get(text).subscribe((res: string) => {
      value = res;
    });
    this.translate.onLangChange.subscribe(
      () => {
      for(let i in this.inputs){
        this.translate.get("ionBasic.Sample."+this.inputs[i].name).subscribe((res: string) => {
          this.inputs[i].placeholder = res;
        });
      }
    });
    return value;
  }

  promptFilterClicked() {
  
    let a :any ;

    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, {dialog:"filter", edit:null});
    modal.present();

  }

  SearchgetItems(ev: any) {

    this.tableManagement.Filter(ev).subscribe(
      (data: any) => {
        if(!data.result) return;
        for (let i in data.result) {
          data.result[i].checkbox = false; //answer has no checkbox value, so by default we put it to false
        }
        this.SamplePage.Lastoperation = data.result;
        this.isDisabled = true;
        this.SamplePage.reloadSamplePageAfterSearch();
      }
    )
  }
  //Add Operation
  promptAddClicked() {

    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, {dialog:"add",edit:null});
    modal.present();
    /*
    let Addtranslations : any = this.getTranslation("ionBasic.Sample.operations.add");
    
    let prompt = this.alertCtrl.create({
      title: Addtranslations.title,
      message: Addtranslations.message,
      inputs: this.inputs,
      buttons: [
        {
          text: this.ionicbuttonstranslation.dismiss,
          handler: data => {
          }
        },
        {
          text: this.ionicbuttonstranslation.send,
          handler: data => {
            this.AddClicked(data);

          }
        }
      ]
    });
    prompt.present(); */
  }

  AddClicked(Addform: any) {
    this.tableManagement.NewItemM(Addform).subscribe(
      (data: any) => {
        console.log(data);
        this.SamplePage.reloadSamplePageTable();
      }
    )
  }


  // deletes the selected element
  DeleteConfirmed() {
    let index = this.SamplePage.getindex(); // i get the index of the item to delete in the table we have in the view
    if (!index && index != 0) {
      return;
    }
    let search = { name: this.SamplePage.tabletoshow[index].name }
    this.tableManagement.getItemId(search).subscribe(
      (Idresponse: any) => {
        this.tableManagement.DeleteItem(Idresponse.result[0].id).subscribe(
          (deleteresponse) => {
            this.SamplePage.reloadSamplePageTable();
          }
        )
      }
    )
  }


  DeleteConfirmForm() {

    if (this.SamplePage.getindex() == null) return;
    let DeleteTranslations : any = {};
    DeleteTranslations = this.getTranslation('ionBasic.Sample.operations.delete');
    let prompt = this.alertCtrl.create({
      title: DeleteTranslations.title,
      message: DeleteTranslations.message,
      buttons: [
        {
          text: DeleteTranslations.dismiss,
          handler: data => {
          }
        },
        {
          text: DeleteTranslations.confirm,
          handler: data => {
            this.isDisabled = true;
            this.DeleteConfirmed();
          }
        }
      ]
    });
    prompt.present();
  }

  promptModifyClicked() {
    
    this.tabletoshow = this.SamplePage.tabletoshow;
    let index = this.SamplePage.getindex();
    if (!index && index != 0) {
      return;
    }

    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, {dialog:"modify", edit:this.tabletoshow[index]});
    modal.present();

  }

  ModifyClicked(fullitem: any) {
    // now i need this to check if there are no changes because constructing item has a new field id the original table doesn't have
    let checknochanges = 0;
    let index = this.SamplePage.getindex();
    if (!index && index != 0) {
      return;
    }
    let originalitem = this.tabletoshow[index];
    for(let i in fullitem){
      if(fullitem[i] != "" && fullitem[i] != null) {
        this.constructingitem[i] = fullitem[i];           
      } else{
        this.constructingitem[i]= originalitem[i];
        checknochanges++;
        }
    }
    if (checknochanges > 2) return;

    let truename = { name: this.tabletoshow[index].name }

    this.tableManagement.getItemId(truename).subscribe(
      (Idresponse: any) => {
        let Itemconstructed = this.constructingitem;
        Itemconstructed.id = Idresponse.result[0].id;

        this.tableManagement.ModifyItem(Itemconstructed).subscribe(
          (Modifyresponse: any) => {
            this.SamplePage.reloadSamplePageTable();
          }
        )
      }
    )

  }

}
