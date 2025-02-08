import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../api-url.token';


@Injectable({
  providedIn: 'root'
})
export class CircuitpathService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient, @Inject(API) apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getCircuitPaths(): Observable<CircuitPathDTO[]> {
    return this.httpClient.get<CircuitPathDTO[]>(`${this.apiUrl}/circuptpath`);
  }
}

export interface CircuitPathDTO {
  invoiceId: string;
  name: string;
  group: GroupDTO[];

}

interface GroupDTO {
  name: string;
  users: UserDTO[];
}

interface UserDTO {
  groupId: string;
}
