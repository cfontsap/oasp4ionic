
import { Observable } from 'rxjs/Rx';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthServiceProvider } from './auth-service';
import {url} from '../../assets/serverPath';



@Injectable()
export class HttpinterceptorProvider implements HttpInterceptor {

  constructor(private inj: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.inj.get(AuthServiceProvider);

    const tempToken = auth.getToken();
    
    if (tempToken != null) {
      const afterTokenreq: HttpRequest<any> = req.clone({ setHeaders: { Authorization: tempToken } });
      return next.handle(afterTokenreq);
    } else {
      //req.headers.append('Access-Control-Allow-Origin',url)
      return next.handle(req);
    }

  }
}

