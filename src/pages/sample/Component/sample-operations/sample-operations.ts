import { SamplePage } from '../../sample';
import { AlertController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablemanagementProvider } from '../../../../providers/tablemanagement/tablemanagement';

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

  alerCtrl: any;
  tabletoshow: any;
  constructingitem = {id: '', name: '', surname: '', age: '' };
  @Input() isDisabled : boolean = true;

  constructor(public translate: TranslateService, public alertCtrl: AlertController, 
    public tableManagement: TablemanagementProvider, public SamplePage: SamplePage) {

  }
  
  prompCommonTranslations(Code:string) : any {
    let a: any = {};
    this.translate.get(Code+'.TITLE').subscribe(t => {
      a.title = t;
    });
    this.translate.get(Code+'.MESSAGE').subscribe(t => {
      a.message = t;
    });
    this.translate.get('COMMONPROMPT.DISMISS').subscribe(t => {
      a.dismiss = t;
    });
    this.translate.get('COMMONPROMPT.SEND').subscribe(t => {
      a.send = t;
    });
    this.translate.get('COMMONPROMPT.NAME').subscribe(t => {
      a.name = t;
    });
    this.translate.get('COMMONPROMPT.SURNAME').subscribe(t => {
      a.surname = t;
    });
    this.translate.get('COMMONPROMPT.AGE').subscribe(t => {
      a.age = t;
    });
    return a;
  }

  promptFilterClicked() {
    
    let a = this.prompCommonTranslations("FILTER");
    let prompt = this.alertCtrl.create({
      title: a.title,
      message: a.message,
      inputs: [
        {
          name: 'name',
          placeholder: a.name + ' : jon',
        },
        {
          name: 'surname',
          placeholder: a.surname + ' : jon',
        },
        {
          name: 'age',
          placeholder: a.age + ' : 222'
        }
      ],
      buttons: [
        {
          text: a.dismiss,
          handler: data => {

          }
        },
        {
          text: a.send,
          handler: data => {

            if(!data.name) delete data.name;
            if(!data.surname) delete data.surname;
            if(!data.age) delete data.age;
            if(!data) return;
            this.isDisabled = false;
            this.SearchgetItems(data);

          }
        },
        {
          text: 'Clear Filter',
          handler: data =>{
            
            this.isDisabled = true;
            this.SamplePage.reloadSamplePageTable();
          }
        }
      ]
    });
    prompt.present();

  }

  SearchgetItems(ev: any) {

    this.tableManagement.Filter(ev).subscribe(
      (data: any) => {

        for(let i in data.result){
            data.result[i].checkbox = false; //answer has no checkbox value, so by default we put it to false
        }
        this.SamplePage.Lastoperation = data.result;
        this.isDisabled = true;
        // console.log(this.SamplePage.Lastoperation);
        this.SamplePage.reloadSamplePageAfterSearch();
      }
    )
  }
  //Add Operation
  promptAddClicked() {
    let a = this.prompCommonTranslations("ADD");    
    let prompt = this.alertCtrl.create({
      title: a.title,
      message: a.message,
      inputs: [
        {
          name: 'name',
          placeholder: a.name + ' : jon',

        },
        {
          name: 'surname',
          placeholder: a.surname + ' : jon',
        },
        {
          name: 'age',
          placeholder: a.age + ' : 222'
        }
      ],
      buttons: [
        {
          text: a.dismiss,
          handler: data => {

          }
        },
        {
          text: a.send,
          handler: data => {
            this.AddClicked(data);
            
            //console.log(data.surname);
          }
        }
      ]
    });
    prompt.present();
  }

  AddClicked(Addform: any) {

    // let index = this.getindex();


    let construct = { name: "", surname: "", age: 1 };

    if (Addform.name != null) construct.name = Addform.name;
    if (Addform.surname) construct.surname = Addform.surname;
    if (Addform.age) construct.age = Addform.age;



    this.tableManagement.NewItemM(construct).subscribe(
      (data: any) => {
        this.SamplePage.reloadSamplePageTable();
      }
    )
  }


  // UpdateTable for delete and modify
  UpdateTable() {
    this.tabletoshow = this.SamplePage.tabletoshow;
  }

  // deletes the selected element
  DeleteClicked() {

    let index = this.SamplePage.getindex(); // i get the index of the item to delete in the table we have in the view
    if (!index && index != 0) {
      return;
    }
  
    let search = {name: this.SamplePage.tabletoshow[index].name}

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


  doConfirm(){
    
    // console.log(a);
    if(this.SamplePage.getindex() == null) return;
    let a: any = {};
    this.translate.get('DELETE'+'.TITLE').subscribe(t => {
      a.title = t;
    });
    this.translate.get('DELETE'+'.MESSAGE').subscribe(t => {
      a.message = t;
    });
    this.translate.get('DELETE.DISMISS').subscribe(t => 
    {
      a.dismiss = t;
    });
    this.translate.get('DELETE.CONFIRM').subscribe(t => 
    {
      a.Confirm = t;
    });

    let prompt = this.alertCtrl.create({
      title: a.title,
      message: a.message,
      buttons: [
        {
          text: a.dismiss,
          handler: data => {
            // console.log(a);
          }
        },
        {
          text: a.Confirm,
          handler: data => {
            this.isDisabled=true;
            this.DeleteClicked();
            //console.log(data.surname);
          }
        }
      ]
    });
    prompt.present();
  }

  promptModifyClicked() {
    this.UpdateTable()
    let index = this.SamplePage.getindex();

    index++;
    if (!index) return;
    index--;

    let a = this.prompCommonTranslations("MODIFY");
    // console.log(a);

    let prompt = this.alertCtrl.create({
      title: a.title,
      message: a.message,
      inputs: [
        {
          name: 'name',
          placeholder: this.tabletoshow[index].name
        },
        {
          name: 'surname',
          placeholder: this.tabletoshow[index].surname
        },
        {
          name: 'age',
          placeholder: this.tabletoshow[index].age
        }
      ],
      buttons: [
        {
          text: a.dismiss,
          handler: data => {
            // console.log(a);
          }
        },
        {
          text: a.send,
          handler: data => {
            this.ModifyClicked(data);
            
          }
        }
      ]
    });
    prompt.present();
  }

  ModifyClicked(fullitem: any) {
    // now i need this to check if there are no changes because constructing item has a new field id the original table doesn't have
    let checknochanges = 0;

    let index = this.SamplePage.getindex();
    if (!index && index != 0) {
      return;
    }
    if (fullitem.name) { this.constructingitem.name = fullitem.name;  } else { this.constructingitem.name = this.tabletoshow[index].name; checknochanges++ }
    if (fullitem.surname) { this.constructingitem.surname = fullitem.surname } else { this.constructingitem.surname = this.tabletoshow[index].surname; checknochanges++}
    if (fullitem.age) { this.constructingitem.age = fullitem.age } else { this.constructingitem.age = this.tabletoshow[index].age; checknochanges++}
    if (checknochanges > 2) return;

    let truename = { name: this.tabletoshow[index].name }

    this.tableManagement.getItemId(truename).subscribe(
      (Idresponse: any) => {
        console.log(Idresponse);
        let Itemconstructed =this.constructingitem;
        Itemconstructed.id = Idresponse.result[0].id;

        this.tableManagement.ModifyItem(Itemconstructed).subscribe(
          (Modifyresponse: any) => {
            console.log(Modifyresponse)
            this.SamplePage.reloadSamplePageTable();
          }
        )
      }
    )

  }

}
