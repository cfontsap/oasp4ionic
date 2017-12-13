import { TranslateService } from '@ngx-translate/core';
import { TablestoreProvider } from '../../providers/tablemanagement/tablestore';
import { Component, Input, Output } from '@angular/core';
import { AlertController, InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TablemanagementProvider } from '../../providers/tablemanagement/tablemanagement';
import { HeaderManagementProvider } from '../../components/header/HeaderManagement/HeaderManagement';
import { TableOperationsComponent } from './Component/table-operations/table-operations';


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

  isDisabledC : boolean = true;
  tabletoshowbefore :  [{name: string,surname:string, age: number, checkbox:boolean }];
  tabletoshow : any = []
  PAGINATIONTRESHOLD = 15;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public tableManagement: TablemanagementProvider, public tableStore: TablestoreProvider,
    public alertCtrl: AlertController, public translate: TranslateService,
    public headerManager : HeaderManagementProvider    
    ) {
    
  }

  indexforpagination : number = 0;


  onclick(p:any){
    for (let i = 0; i < this.tabletoshow.length; i++){
      if(p != i){
        this.tabletoshow[i].checkbox = false;
      } else {
        this.tabletoshow[p].checkbox = !this.tabletoshow[p].checkbox;
        if(this.tabletoshow[p].checkbox) {
          
          this.isDisabledC = false;
          //console.log(this.isDisabled);
        }
        else {

          this.isDisabledC=true;
          //console.log(this.isDisabled);
        }
      }
    }
  }

  ping(){
    console.log('tururu');
    this.tableManagement.getTableM().subscribe( 
      (data:any) =>{
        console.log(data);
        this.tableStore.setTableS(data.result);
        this.tabletoshowbefore = this.tableStore.getTableS();
        this.tabletoshow = [];
        for(let i = 0; i<this.PAGINATIONTRESHOLD; i++){
          if(this.tabletoshowbefore[i]) this.tabletoshow.push(this.tabletoshowbefore[i]);
        }
        this.indexforpagination = this.PAGINATIONTRESHOLD;

      }, (err) => {
        console.log(err);
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
  

  ionViewWillEnter() {
        this.headerManager.setTitle("Table");
        this.headerManager.EntryorExitTableview(true);
        this.tableManagement.getTableM().subscribe( 
          (data:any) =>{
            this.tableStore.setTableS(data.result);
            this.tabletoshowbefore = this.tableStore.getTableS();
            for(let i = 0; i<this.PAGINATIONTRESHOLD; i++){
              if(this.tabletoshowbefore[i]) this.tabletoshow.push(this.tabletoshowbefore[i]);
            }
            this.indexforpagination = this.PAGINATIONTRESHOLD;
    
          }, (err) => {
            console.log(err);
          }
        )
    
      }

  ionViewWillLeave(){
    this.headerManager.EntryorExitTableview(false);
  }
  doInfinite(infiniteScroll){

        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            if(this.tabletoshowbefore[this.indexforpagination]){
              this.tabletoshow.push( this.tabletoshowbefore[this.indexforpagination]);
              this.indexforpagination++;
            }
          } 
          infiniteScroll.complete();
        }, 500);
      }


  ionViewDidLoad() {
    this.headerManager.setTitle("Table");
    this.tabletoshow = [];

  }

}
