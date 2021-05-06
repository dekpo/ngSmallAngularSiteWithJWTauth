import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('access_token');
    console.log("jwt.interceptor just cloned request...");
    if (token){
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+token
        }
      })
    }

    return next.handle(request);
  }
}
