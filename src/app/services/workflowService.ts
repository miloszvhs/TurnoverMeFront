import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API } from '../api-url.token';
import { WorkflowDTO, WorkflowRequest } from '../Dtos/WorkflowDTO';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient, @Inject(API) apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  fetchWorkflows(): Observable<WorkflowDTO[]> {
    return this.httpClient.get<WorkflowDTO[]>(`${this.apiUrl}/workflow`);
  }

  postWorkflow(dto: WorkflowRequest) {
    return this.httpClient.post(`${this.apiUrl}/workflow`, dto).pipe(
      map((response) => {
        return {
          status: true,
          message: 'Pomyślnie utworzono procedure',
          data: response,
        };
      }),
      catchError((error) => {
        return of({
          status: false,
          message: 'Tworzenie procedury nie powiodło się',
          error: error,
        });
      })
    );
  }
}
