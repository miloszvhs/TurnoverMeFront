import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/login-request';
import {LoginResponse} from '../models/login-response';
import {map, Observable} from 'rxjs';
import {API} from '../api-url.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient, @Inject(API) apiUrl: string) {
    this.apiUrl = `${apiUrl}`;
  }

  login(credentials: LoginRequest) : Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/account/login`, credentials)
      .pipe(map(response => {
        localStorage.setItem('accessToken', response.accessToken);
        document.cookie = `refreshToken=${response.refreshToken}`;
        return response;
      }));
  }

  refreshToken() : Observable<LoginResponse> {
    const refreshToken = this.getRefreshTokenFromCookie();

    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/account/refresh`, { refreshToken})
      .pipe(map(response => {
        localStorage.setItem('accessToken', response.accessToken);
        document.cookie = `refreshToken=${response.refreshToken};`;
        return response;
      }))
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

  logout() {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn() : boolean {
    return localStorage.getItem('accessToken') !== null;
  }
}
