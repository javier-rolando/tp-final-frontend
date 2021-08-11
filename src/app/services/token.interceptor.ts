import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private usuariosService: UsuariosService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      return next.handle(request);
    }

    let intReq = request;

    intReq = request.clone({ headers: request.headers.set('x-token', token) });

    return next.handle(intReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error.mensaje === 'Token incorrecto') {
          return this.usuariosService.renewToken().pipe(
            concatMap((resp) => {
              console.log('Refresh token');

              if (localStorage.getItem('token')) {
                localStorage.setItem('token', resp.token);
              } else {
                sessionStorage.setItem('token', resp.token);
              }

              intReq = request.clone({
                headers: request.headers.set('x-token', resp.token),
              });

              return next.handle(intReq);
            })
          );
        } else {
          return throwError(err);
        }
      })
    );
  }
}
