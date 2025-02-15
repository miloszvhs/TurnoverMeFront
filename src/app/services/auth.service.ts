import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/login-request';
import {LoginResponse} from '../models/login-response';
import {catchError, map, Observable, throwError} from 'rxjs';
import {API} from '../api-url.token';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: { id: string, name: string } | null = null;
  private apiUrl: string;
  private tokenKey = 'accessToken';
  private jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient, @Inject(API) apiUrl: string) {
    this.apiUrl = `${apiUrl}`;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/authentication/login`, credentials)
      .pipe(
        map(response => {
          localStorage.setItem('accessToken', response.jwtToken);
          localStorage.setItem('isLoggedIn', response.isLoggedIn);
          const decodedToken = this.jwtHelper.decodeToken(response.jwtToken);
          localStorage.setItem('userId', decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']);
          localStorage.setItem('groupId', decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid'] ?? "");
          document.cookie = `refreshToken=${response.refreshToken}`;
          return response;
        }),
        catchError(error => {
          localStorage.removeItem('accessToken');
          return throwError(() => error);
        })
      );
  }

  refreshToken() : Observable<LoginResponse> {
    const refreshToken = this.getRefreshTokenFromCookie();
    const jwtToken = this.getTokenFromCookie();

    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/authentication/refresh`, { refreshToken, jwtToken})
      .pipe(map(response => {
        localStorage.setItem('accessToken', response.jwtToken);
        localStorage.setItem('isLoggedIn', response.isLoggedIn);
        const decodedToken = this.jwtHelper.decodeToken(response.jwtToken);
        localStorage.setItem('userId', decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']);
        localStorage.setItem('groupId', decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid'] ?? "");
        document.cookie = `refreshToken=${response.refreshToken};`;
        return response;
      }))
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    return this.httpClient.post(`${this.apiUrl}/authentication/change-password`, { currentPassword, newPassword, token })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  public getUserRoles(): string[] {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      let roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || [];
      
      if (typeof roles === 'string') {
        roles = [roles];
      }
      return roles;
    }
    return [];
  }

  private getRefreshTokenFromCookie(): string | null {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ');

    for (const cookie of cookieArray) {
      const [name, value] = cookie.split('=');

      if (name == 'refreshToken') {
        return value;
      }
    }

    return null;
  }

  private getTokenFromCookie(): string | null {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ');

    for (const cookie of cookieArray) {
      const [name, value] = cookie.split('=');

      if (name == 'accessToken') {
        return value;
      }
    }

    return null;
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('userId');
  }

  getCurrentUserGroup(): string | null {
    return localStorage.getItem('groupId');
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn() : boolean {
    return localStorage.getItem('accessToken') !== null && localStorage.getItem('isLoggedIn') === 'true';
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getClaims(){
    let payload = this.getToken();
    let decoded = atob(<string>payload);
    let token = JSON.parse(decoded);
    return token;
  }
}
