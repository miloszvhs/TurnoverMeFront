import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {InvoiceAcceptationDto} from '../../Dtos/invoice-acceptation-dto';
import {InvoiceStatusDto} from '../../Dtos/Enums/invoice-status-dto';
import {API_INVOICING_INVOICES} from '../../api-url.token';
import {InvoiceDto} from '../../Dtos/Invoice-dto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(API_INVOICING_INVOICES) apiUrl: string) {
    this.apiUrl = `${apiUrl}`;
  }

  getInvoicesOnStage(number: number): Observable<InvoiceDto[]> {
    return this.http.get<number[]>(`${this.apiUrl}/stage/${number}`).pipe(
      map(data => data.map(item => this.mapToInvoiceDto(item)))
    );
  }

  getInvoiceById(id: string): Observable<InvoiceDto> {
    return this.http.get<InvoiceDto>(`${this.apiUrl}/${id}`);
  }

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<string[]>(`${this.apiUrl}/all`).pipe(
      map(data => data.map(item => this.mapToInvoiceDto(item)))
    );
  }

  private mapToInvoiceDto(data: any): InvoiceDto {
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
