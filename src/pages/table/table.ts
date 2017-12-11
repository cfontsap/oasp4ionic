import { TranslateService } from '@ngx-translate/core';
import { TablestoreProvider } from '../../providers/tablemanagement/tablestore';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TablemanagementProvider } from '../../providers/tablemanagement/tablemanagement';


/**
 * Generated class for the TablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {


  
  tabletoshow : any = [{name:"a",surname:"a", age: 0, checkbox:false },{name:"b",surname:"b", age: 1, checkbox:false },{name:"c",surname:"c", age: 2, checkbox:false }]
  checkboxes : boolean[] = [true, true, true, true];
  tablawea : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public tableManagement: TablemanagementProvider, public tableStore: TablestoreProvider,
    public alertCtrl: AlertController, public translate: TranslateService    
    ) {
    
  }


  Inspect(index:number){
    // new
  }

  onclick(p:any){
    for (let i = 0; i < this.tabletoshow.length; i++){
      if(p != i){
        this.tabletoshow[i].checkbox = false;
      } else {
        this.tabletoshow[p].checkbox = !this.tabletoshow[p].checkbox;
      }
    }
  }

  ping(){
    this.ionViewDidLoad();
  }

  promptFilterClicked(){
    let a: any = {};
    this.translate.get('FILTER.TITLE').subscribe(t => {
      a.title = t;
    });
    this.translate.get('FILTER.MESSAGE').subscribe(t => {
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

    let prompt = this.alertCtrl.create({
      title: a.title,
      message: a.message,
      inputs: [
        {
          name: 'name',
          placeholder: a.name+' : jon',
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
            //console.log(data.surname);
          }
        }
      ]
    });
    prompt.present();

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    
    console.log(ev);

    if(!ev.name) delete ev.name;
    if(!ev.surname) delete ev.surname;
    if(!ev.age) delete ev.age;
    
    console.log(ev);
    this.tableManagement.Filter(ev).subscribe(
      (data : any) => {
        this.tabletoshow = data;
      }
    )
  }

  // Add function, with prompt form

  promptAddClicked(){

    let a: any = {};
    this.translate.get('ADD.TITLE').subscribe(t => {
      a.title = t;
    });

    this.translate.get('ADD.MESSAGE').subscribe(t => {
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

    let prompt = this.alertCtrl.create({
      title: a.title,
      message: a.message,
      inputs: [
        {
          name: 'name',
          placeholder: a.name+' : jon',
         
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
  


  AddClicked(Addform:any){

    // let index = this.getindex();


    let construct = {name:"", surname:"", age:1};

    if (Addform.name != null) construct.name=Addform.name;
    if (Addform.surname) construct.surname=Addform.surname;
    if (Addform.age) construct.age=Addform.age;
    
  
    
  this.tableManagement.NewItemM(construct).subscribe(
     (data : any) => {
        this.ping();
      }
    )
  }

  public getindex(){
    for(let i = 0; i< this.tabletoshow.length; i++){
      if(this.tabletoshow[i].checkbox){
        return i;
      }
    }
    return null;
  }

  // deletes the selected element
  DeleteClicked(){
    
    let index = this.getindex();
    if( !index ) {
      return;
    }
    let search = { name: this.tabletoshow[index].name, surname: this.tabletoshow[index].surname, age: this.tabletoshow[index].age }
    this.tableManagement.getItemId(search).subscribe(
      (Idresponse:any) => {
        this.tableManagement.DeleteItem(Idresponse.result[0].id).subscribe(
          (deleteresponse) => {
            this.ping();
          }
        )
      }
    )  
  }


  promptModifyClicked(){

      let index = this.getindex();

      index++;
      if ( !index ) return;
      index--;

      let a: any = {};
      this.translate.get('MODIFY.TITLE').subscribe(t => {
        a.title = t;
      });
      this.translate.get('MODIFY.MESSAGE').subscribe(t => {
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

  ModifyClicked(fullitem : any){

    let index = this.getindex();
    if( !index ) {
      return;
    }
    console.log(fullitem);
    let constructingitem  = {name: 'a', surname: 'a' , age: 1 };
    if(fullitem.name) {constructingitem.name = fullitem.name } else { constructingitem.name = this.tabletoshow[index].name; }
    if(fullitem.surname) {constructingitem.surname = fullitem.surname } else { constructingitem.surname = this.tabletoshow[index].surname; }
    if(fullitem.age) {constructingitem.age = fullitem.age } else { constructingitem.age = this.tabletoshow[index].age; }
    if(fullitem.equals == this.tabletoshow[index]) return;

    let truename = {name: this.tabletoshow[index].name}

    this.tableManagement.getItemId(truename).subscribe(
      (Idresponse:any) => {
        let Itemconstructed = {name:constructingitem.name, surname:constructingitem.surname, age:constructingitem.age, id: Idresponse.result[0].id+"" };
        // console.log(Itemconstructed);
        this.tableManagement.ModifyItem(Itemconstructed).subscribe(
          (Modifyresponse:any) => {
            this.ping();
          }
        )
      }
    )
    
  }

  DetailsClicked(){
      let index = this.getindex();

      index++;
      if ( !index ) return;
      index--;


  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad TablePage');
    this.tableManagement.getTableM().subscribe( 
      (data:any) =>{
        this.tableStore.setTableS(data.result);
        this.tabletoshow = this.tableStore.getTableS();
        // console.log(this.tabletoshow);
        //console.log(data.result);
      }, (err) => {
        console.log(err);
      }


    )
    // this.tableStore.setTableS("");
    //this.tabletoshow = this.tableStore.getTableS();
    //console.log(this.tabletoshow);
  }

}
