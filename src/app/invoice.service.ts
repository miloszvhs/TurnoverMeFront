import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {InvoiceAcceptationDto} from './Dtos/invoice-acceptation-dto';
import {InvoiceStatusDto} from './Dtos/Enums/invoice-status-dto';
import {API_URL} from './api-url.token';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.apiUrl = `${apiUrl}/acceptations/all`;
  }

  getInvoices(): Observable<InvoiceAcceptationDto[]> {
    return this.http.get<string[]>(this.apiUrl).pipe(
      map(data => data.map(item => this.mapToInvoiceAcceptationDto(item)))
    );
  }

  private mapToInvoiceAcceptationDto(data: any): InvoiceAcceptationDto {
    return {
      guid: data.guid,
      name: data.name,
      status: data.status as InvoiceStatusDto,
      creationDate: data.creationDate,
      modificationDate: data.modificationDate,
      invoiceFileAsBase64: data.invoiceFileAsBase64
    };
  }
}
