import { TranslateService } from '@ngx-translate/core';
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
  templateUrl: 'sample.html',
})
export class SamplePage {

  Delete_and_Modified_Buttons_Disabled: boolean = true;
  Lastoperation: [{ name: string, surname: string, age: number, checkbox: boolean}];
  tabletoshow: any = []
  FIRSTPAGINATIONTHRESHOLD = 15;
  NEXTELEMENTSTOLOAD = 10;
  InfiniteScrollingIndex: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public tableManagement: TablemanagementProvider,
    public alertCtrl: AlertController, public translate: TranslateService
  ) {

  }

  NoMorethanOneCheckbox(p: any) {
    for (let i = 0; i < this.tabletoshow.length; i++) {
      if (p != i) {
        this.tabletoshow[i].checkbox = false;
      } else {
        this.tabletoshow[p].checkbox = !this.tabletoshow[p].checkbox;
        if (this.tabletoshow[p].checkbox) {
          this.Delete_and_Modified_Buttons_Disabled = false;
          //console.log(this.isDisabled);
        }
        else {
          this.Delete_and_Modified_Buttons_Disabled = true;
        }
      }
    }
  }

  reloadSamplePageTable() {

    this.tableManagement.getTableM().subscribe(
      (data: any) => {
        this.Lastoperation = data.result;
        this.tabletoshow = [];
        for (let i = 0; i < this.FIRSTPAGINATIONTHRESHOLD; i++) {
          if (this.Lastoperation[i]) {
          this.tabletoshow.push(this.Lastoperation[i]);
          this.tabletoshow[i].checkbox = false;
          }
        }
        this.InfiniteScrollingIndex = this.FIRSTPAGINATIONTHRESHOLD;

      }, (err) => {
        console.log(err);
      }
    )
  }

  reloadSamplePageAfterSearch(){
    this.tabletoshow=[];
    for (let i=0; i<this.FIRSTPAGINATIONTHRESHOLD; i++){
      this.tabletoshow.push(this.Lastoperation[i])
      }
    this.InfiniteScrollingIndex = this.FIRSTPAGINATIONTHRESHOLD;
    }


  public getindex() {
    for (let i = 0; i < this.tabletoshow.length; i++) {
      if (this.tabletoshow[i].checkbox) {
        return i;
      }
    }
    return null;
  }


  ionViewWillEnter() {

    this.tableManagement.getTableM().subscribe(
      (data: any) => {
        this.Lastoperation = data.result;
        for (let i = 0; i < this.FIRSTPAGINATIONTHRESHOLD; i++) {
          if (this.Lastoperation[i]) {
            this.tabletoshow.push(this.Lastoperation[i]);
            this.tabletoshow[i].checkbox = false;
          }
        }
        this.InfiniteScrollingIndex = this.FIRSTPAGINATIONTHRESHOLD; // we update of the first of the following items to be loaded.
      }, (err) => {
        console.log(err);
      }
    )
  }

  doInfinite(infiniteScroll) {
    
    let MoreItems = this.InfiniteScrollingIndex + this.NEXTELEMENTSTOLOAD;
    setTimeout(() => {
      for (let i = this.InfiniteScrollingIndex; i < MoreItems; i++) {
        if (this.Lastoperation[i]) {
          this.tabletoshow.push(this.Lastoperation[i]);
          this.tabletoshow[i].checkbox = false;
        }
      }
      this.InfiniteScrollingIndex = MoreItems;
      infiniteScroll.complete();
    }, 500);
  }

}
