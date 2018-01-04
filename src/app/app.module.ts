import { HttpinterceptorProvider } from '../providers/security/httpInterceptor';
import { AuthServiceProvider } from '../providers/security/auth-service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/Login/Login';
import { LoginProvider } from '../providers/login/loginProvider';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from '../components/header/header';
import { HomePage } from '../pages/home/home';
import { BusinessOperatorProvider } from '../providers/shared/business-operator';
import { sampleoperationsdialogComponent } from '../pages/sample/Component/sample-operations/sample-operations-dialog/sample-operations-dialog'
import {samplestoreProvider} from '../pages/sample/provider/samplestore/samplestore';
import {sampleBusinessProvider}  from '../pages/sample/provider/sample-business/sample-business';
import { samplePage } from '../pages/sample/sample';
import {sampleOperationsComponent} from '../pages/sample/Component/sample-operations/sample-operations';


export function translateFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HeaderComponent,
    samplePage,
    sampleOperationsComponent,
    sampleoperationsdialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    samplePage,
    sampleoperationsdialogComponent
  ],
  providers: [

    TranslateModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BusinessOperatorProvider,
    HttpClient,
    LoginProvider,
    AuthServiceProvider,
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorProvider,
      multi: true},
    sampleBusinessProvider,
    samplestoreProvider,
     
  ]
})
export class AppModule {}


