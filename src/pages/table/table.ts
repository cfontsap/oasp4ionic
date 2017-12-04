import { TablestoreProvider } from '../../providers/tablemanagement/tablestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public tableManagement: TablemanagementProvider, public tableStore: TablestoreProvider
    ) {
    
  }


  search(e: any){
    console.log(e);
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
        console.log(this.tabletoshow[p].checkbox);
      }
    }
    console.log(this.tabletoshow);
  }

  AddPushed(){
    this.tableManagement.NewItemM("").subscribe(
      (data : any) => {
        console.log("asdsad");
      }
    )
  }


  DeletePushed(){
    this.tableManagement.DeleteItemM("");
  }

  ModifyPushed(){

  }

  DetailsPushed(){
    this.tableManagement.NewItemM("").subscribe(
      (data : any) => {
        console.log("");
      }
    )
  }

  createarraycheckboxes(length : number){
    let checkboxaux: boolean[] = new Array(this.tableStore.getlength());
    console.log(length);
    for(let i = 0; i<length; i++){
     // checkboxaux[i]=true;
    }
    // console.log(checkboxaux);
    this.checkboxes = checkboxaux;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TablePage');
    this.tableManagement.getTableM().subscribe( 
      (data:any) =>{
        this.tableStore.setTableS(data.result);
        this.tabletoshow = this.tableStore.getTableS();
        console.log(this.tabletoshow);
        this.createarraycheckboxes(this.tabletoshow.length);

        
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
