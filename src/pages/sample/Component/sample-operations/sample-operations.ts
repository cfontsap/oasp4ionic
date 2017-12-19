import { SamplePage } from '../../sample';
import { AlertController, ModalController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablemanagementProvider } from '../../../../providers/tablemanagement/tablemanagement';
import { SampleoperationsdialogComponent } from './sample-operations-dialog/sample-operations-dialog'

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

  tabletoshow: any;

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

  promptFilterClicked() {
    this.isDisabled = true;
    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, { dialog: "filter", edit: null });
    modal.present();
    modal.onDidDismiss(() => this.SamplePage.reloadSamplePageAfterSearch());
  }

  //Add Operation
  promptAddClicked() {

    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, { dialog: "add", edit: null });
    modal.present();
    modal.onDidDismiss(() => this.SamplePage.reloadSamplePageTable());

  }
  AddClicked(Addform: any) {
    this.tableManagement.Save(Addform).subscribe(
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
    let search = this.SamplePage.tabletoshow[index]
    console.log(search);
    this.tableManagement.getItemId(search).subscribe(
      (Idresponse: any) => {
        this.tableManagement.DeleteItem(Idresponse.result[0].id).subscribe(
          (deleteresponse) => {
            console.log(deleteresponse)
            this.SamplePage.reloadSamplePageTable();
          }
        )
      }
    )
  }


  DeleteConfirmForm() {

    if (this.SamplePage.getindex() == null) return;
    let DeleteTranslations: any = {};
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
            console.log("tururu");
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

    let modal = this.modalCtrl.create(SampleoperationsdialogComponent, { dialog: "modify", edit: this.tabletoshow[index] });
    modal.present();
    modal.onDidDismiss(() => this.SamplePage.reloadSamplePageTable());

  }

}
