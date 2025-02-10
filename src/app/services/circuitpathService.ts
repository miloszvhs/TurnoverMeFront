import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API } from '../api-url.token';
import { CircuitPathDTO, CircuitPathRequest } from '../Dtos/CircuitPathDTO';

@Injectable({
  providedIn: 'root',
})
export class CircuitpathService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient, @Inject(API) apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  fetchPaths(): Observable<CircuitPathDTO[]> {
    return this.httpClient.get<CircuitPathDTO[]>(`${this.apiUrl}/circuit-path`);
  }

  postCircuitPath(dto: CircuitPathRequest) {
    return this.httpClient.post(`${this.apiUrl}/circuit-path`, dto).pipe(
      map((response) => {
        return {
          status: true,
          message: 'Workflow posted successfully',
          data: response,
        };
      }),
      catchError((error) => {
        return of({
          status: false,
          message: 'Workflow posting failed',
          error: error,
        });
      })
    );
  }
}
