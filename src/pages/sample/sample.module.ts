import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { samplePage } from './sample';

@NgModule({
  declarations: [
    samplePage,
  ],
  imports: [
    IonicPageModule.forChild(samplePage),
  ],
})
export class TablePageModule {}
