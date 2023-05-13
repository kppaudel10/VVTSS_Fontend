import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localToken = localStorage.getItem('token');
    let newRequest = req;
   newRequest =  newRequest.clone({
      setHeaders:{Authorization : `Bearer ${localToken}`}
    })
    return next.handle(req);
  }
}