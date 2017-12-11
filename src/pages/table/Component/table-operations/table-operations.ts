import { TablePage } from '../../table';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablestoreProvider } from '../../../../providers/tablemanagement/tablestore';
import { TablemanagementProvider } from '../../../../providers/tablemanagement/tablemanagement';

/**
 * Generated class for the TableOperationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'table-operations',
  templateUrl: 'table-operations.html'
})
export class TableOperationsComponent {

  text: string;
  tabletoshow: any;
  

  constructor(public translate: TranslateService, public alertCtrl: AlertController, public tableManagement: TablemanagementProvider,
    public tableStore: TablestoreProvider, public tablemain: TablePage) {
    this.text = 'Hello World';
  }

  checkbox : boolean = false;
  onclick(){
    // console.log(this.checkbox)

    if(this.checkbox == true) {
      this.checkbox = false;
      this.tableManagement.getTableM().subscribe(
      (data: any) => {
        for (let i in data.result){
          data.result[i].checkbox = false;
        }
        this.tablemain.tabletoshow = data.result;
      }
      )
    } else {
      this.checkbox = false;
    }
    
  }
  prompTranslations(Code:string) : any {
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
    
    let a = this.prompTranslations("FILTER");
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
            this.getItems(data);
            this.checkbox = true;
            //console.log(data.surname);
          }
        }
      ]
    });
    prompt.present();

  }

  getItems(ev: any) {

    if (!ev.name) delete ev.name;
    if (!ev.surname) delete ev.surname;
    if (!ev.age) delete ev.age;

    this.tableManagement.Filter(ev).subscribe(
      (data: any) => {

        for(let i in data.result){
            data.result[i].checkbox = false;
        }
        this.tableStore.setTableS = data.result;
        this.tablemain.tabletoshow = data.result;
        this.checkbox = true;
        // console.log(this.checkbox);
      }
    )
  }
  //Add Operation
  promptAddClicked() {

    let a = this.prompTranslations("ADD");

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
        this.tablemain.ping();
      }
    )
  }


  // UpdateTable for delete and modify
  UpdateTable() {
    this.tabletoshow = this.tableStore.getTableS();
  }

  // deletes the selected element
  DeleteClicked() {
    this.UpdateTable()
    let index = this.tablemain.getindex();
    if (!index) {
      return;
    }
    let search = { name: this.tabletoshow[index].name, surname: this.tabletoshow[index].surname, age: this.tabletoshow[index].age }
    this.tableManagement.getItemId(search).subscribe(
      (Idresponse: any) => {
        this.tableManagement.DeleteItem(Idresponse.result[0].id).subscribe(
          (deleteresponse) => {
            this.tablemain.ping();
          }
        )
      }
    )
  }


  promptModifyClicked() {
    this.UpdateTable()
    let index = this.tablemain.getindex();

    index++;
    if (!index) return;
    index--;

    let a = this.prompTranslations("MODIFY");
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
            //console.log(data.surname);
          }
        }
      ]
    });
    prompt.present();
  }

  ModifyClicked(fullitem: any) {

    let index = this.tablemain.getindex();
    if (!index) {
      return;
    }
    console.log(fullitem);
    let constructingitem = { name: 'a', surname: 'a', age: 1 };
    if (fullitem.name) { constructingitem.name = fullitem.name } else { constructingitem.name = this.tabletoshow[index].name; }
    if (fullitem.surname) { constructingitem.surname = fullitem.surname } else { constructingitem.surname = this.tabletoshow[index].surname; }
    if (fullitem.age) { constructingitem.age = fullitem.age } else { constructingitem.age = this.tabletoshow[index].age; }
    if (fullitem.equals == this.tabletoshow[index]) return;

    let truename = { name: this.tabletoshow[index].name }

    this.tableManagement.getItemId(truename).subscribe(
      (Idresponse: any) => {
        let Itemconstructed = { name: constructingitem.name, surname: constructingitem.surname, age: constructingitem.age, id: Idresponse.result[0].id + "" };
        // console.log(Itemconstructed);
        this.tableManagement.ModifyItem(Itemconstructed).subscribe(
          (Modifyresponse: any) => {
            this.tablemain.ping();
          }
        )
      }
    )

  }

}
