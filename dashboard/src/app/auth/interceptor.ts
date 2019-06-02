import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { mergeMap, switchMap, flatMap } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
      private auth: AngularFireAuth,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.auth.idToken.pipe(
        switchMap((token: any) => {
          if (token) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
          }
          return next.handle(request);
      }));
    }
}
