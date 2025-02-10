import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GroupDTO, GroupsResponseDto } from '../Dtos/CircuitPathDTO';
import { API } from '../api-url.token';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(API) apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getGroups(): Observable<GroupsResponseDto> {
    return this.http
      .get<GroupsResponseDto>(`${this.apiUrl}/groups`)
      .pipe(catchError(this.handleError));
  }

  createGroup(request: CreateGroupRequest): Observable<CreateGroupResponse> {
    return this.http
      .post<CreateGroupResponse>(`${this.apiUrl}/groups/create`, request)
      .pipe(catchError(this.handleError));
  }

  assignGroupToUser(request: AssignGroupToUserRequest): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/groups/users/${request.userId}/group/${request.groupId}`,
        null
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Request error:', error);

    return throwError(
      () => new Error('Something went wrong. Try again later.')
    );
  }
}

export interface AssignGroupToUserRequest {
  userId: string;
  groupId: string;
}

export interface CreateGroupRequest {
  name: string;
}

export interface CreateGroupResponse {
  name: string;
}
