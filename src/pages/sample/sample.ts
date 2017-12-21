import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { SampleBussinessProvider } from './provider/sampleBussiness/sampleBussiness';
import { SamplestoreProvider } from './provider/samplestore/samplestore';



/**
 * Generated class for the TablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



export interface SampleItem{
  name:string,
  surname:string,
  age:number,
  checkbox:boolean
}

@IonicPage()
@Component({
  selector: 'page-table',
  templateUrl: 'sample.html',
})
export class SamplePage {

  Delete_and_Modified_Buttons_Disabled: boolean = true;
  Lastoperation: SampleItem[];
  tabletoshow: any = []
  FIRSTPAGINATIONTHRESHOLD = 15;
  NEXTELEMENTSTOLOAD = 10;
  InfiniteScrollingIndex: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sampleManagement: SampleBussinessProvider, public store: SamplestoreProvider,
    public alertCtrl: AlertController, public translate: TranslateService,
    public loadingCtrl: LoadingController
  ) {
    this.translate.setDefaultLang('en'); 
  }

  NoMorethanOneCheckbox(p: any) {
    for (let i = 0; i < this.tabletoshow.length; i++) {
      if (p != i) {
        this.tabletoshow[i].checkbox = false;
      } else {
        this.tabletoshow[p].checkbox = !this.tabletoshow[p].checkbox;
        if (this.tabletoshow[p].checkbox) {
          this.Delete_and_Modified_Buttons_Disabled = false;
        }
        else {
          this.Delete_and_Modified_Buttons_Disabled = true;
        }
      }
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 500
    });
    loader.present();
  }

  reloadSamplePageTable() {

    this.Lastoperation = this.store.getTable();
    this.Delete_and_Modified_Buttons_Disabled = true;
    this.tabletoshow = [];
    
    for (let i = 0; i < this.FIRSTPAGINATIONTHRESHOLD; i++) {
      if (this.Lastoperation[i]) {
      this.tabletoshow.push(this.Lastoperation[i]);
      this.tabletoshow[i].checkbox = false;
      }
      
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
    this.presentLoading();
    this.sampleManagement.getTableM().subscribe(
      (data: any) => {
        
        this.store.setTable(data.result);
        this.Lastoperation = this.store.getTable();
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
