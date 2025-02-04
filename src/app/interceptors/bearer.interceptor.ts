import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';
import {LoginResponse} from '../models/login-response';

export const bearerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();

  if (isLoggedIn) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((response: LoginResponse) => {
            const newToken = response.accessToken;
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(clonedReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
