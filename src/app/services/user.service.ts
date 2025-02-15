import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API } from '../api-url.token'; // przykładowo, gdziekolwiek zdefiniowano token API
import { CreateUser, UpdateUser } from '../components/admin/admin-index/admin-index.component';
import { catchError, Observable, throwError } from 'rxjs';

export interface UserResponse {
  id: string;
  userName?: string;
  email: string;
  groupId?: string;
  groupName?: string;
  role?: string;
  roleId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  private apiUrl: string;

  constructor(private httpClient: HttpClient, @Inject(API) apiUrl: string ) {
    this.apiUrl = apiUrl;
  }

  getUsers(): Observable<UserResponse[]> {
    return this.httpClient.get<UserResponse[]>(`${this.apiUrl}/admin/users`).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: CreateUser): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/admin/users`, user).pipe(
      catchError(this.handleError)
    );
  }

  editUser(userId: string, user: UpdateUser): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/admin/users/${userId}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/admin/users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
