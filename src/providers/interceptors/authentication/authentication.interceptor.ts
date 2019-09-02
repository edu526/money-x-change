import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@mxc/environment';
import { Observable } from 'rxjs';
import { ACCESS_KEY } from './authentication.constant';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_key = environment.access_key;

    if (access_key) {
      const params = {};
      params[ACCESS_KEY] = access_key;
      const tokenReq = req.clone({ setParams: params });

      return next.handle(tokenReq);
    }

    return next.handle(req);
  }

}
