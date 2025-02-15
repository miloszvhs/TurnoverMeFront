import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RoleDTO } from '../Dtos/WorkflowDTO';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API } from '../api-url.token';
import { CreateRole } from '../components/admin/admin-index/admin-index.component';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient, @Inject(API) apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getRoles(): Observable<RoleDTO[]> {
    return this.httpClient
      .get<RoleDTO[]>(`${this.apiUrl}/admin/roles`)
      .pipe(catchError(this.handleError));
  }

  addRole(addRole: CreateRole) {
    return this.httpClient
      .post<CreateRole>(`${this.apiUrl}/admin/roles`, addRole)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Wystąpił błąd', error);
    return throwError('Coś poszło nie tak. Spróbuj ponownie później.');
  }
}
