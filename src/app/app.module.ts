
import {SampleOperationsComponent} from '../pages/sample/Component/sample-operations/sample-operations';
import { HttpInterceptorProvider } from '../providers/security/httpinterceptor';
import { AuthServiceProvider } from '../providers/security/auth-Service';
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
import {SamplestoreProvider} from '../pages/sample/provider/samplestore/samplestore';
import {SampleBussinessProvider}  from '../pages/sample/provider/sampleBussiness/sampleBussiness';
import { SamplePage } from '../pages/sample/sample';
import { HomePage } from '../pages/home/home';
import { SampleoperationsdialogComponent } from '../pages/sample/Component/sample-operations/sample-operations-dialog/sample-operations-dialog'
import { BussinessOperatorProvider } from '../providers/shared/Bussiness-Operator';




//import { HttpRequestInterceptorProvider } from '../providers/shared/http-request-interceptor';




export function translateFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HeaderComponent,
    SamplePage,
    
    SampleOperationsComponent,
    SampleoperationsdialogComponent
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
    SamplePage,
    
    SampleoperationsdialogComponent
  ],
  providers: [

    TranslateModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BussinessOperatorProvider,
    HttpClient,
    LoginProvider,
    AuthServiceProvider,
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorProvider,
      multi: true},
    SampleBussinessProvider,
    SamplestoreProvider,
     
  ]
})
export class AppModule {}
