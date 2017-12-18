import { LanguagePage } from '../pages/language/language';
import {SampleOperationsComponent} from '../pages/sample/Component/sample-operations/sample-operations';
import { HttpinterceptorProvider } from '../providers/security/httpinterceptor';
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
import { BussinessOperatorProvider } from '../providers/shared/bussiness-operator';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from '../components/header/header';
import { TablemanagementProvider } from '../providers/tablemanagement/tablemanagement';
import { SamplePage } from '../pages/sample/sample';
import { HomePage } from '../pages/home/home';
import {SampledialogComponent} from '../pages/sample/Component/sampledialog/sampledialog';



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
    LanguagePage,
    SampleOperationsComponent,
    SampledialogComponent
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
    LanguagePage
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
      useClass: HttpinterceptorProvider,
      multi: true},
    TablemanagementProvider,
     
  ]
})
export class AppModule {}
