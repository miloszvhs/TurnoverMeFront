import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {InvoiceAcceptationDto} from '../../Dtos/invoice-acceptation-dto';
import {InvoiceStatusDto} from '../../Dtos/Enums/invoice-status-dto';
import {API_INVOICING_ACCEPTATION} from '../../api-url.token';

@Injectable({
  providedIn: 'root'
})
export class InvoiceAcceptationService {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(API_INVOICING_ACCEPTATION) apiUrl: string) {
    this.apiUrl = `${apiUrl}`;
  }

  getInvoiceAcceptation(): Observable<InvoiceAcceptationDto[]> {
    return this.http.get<string[]>(`${this.apiUrl}/all`).pipe(
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
      invoiceFileAsBase64: data.invoiceFileAsBase64,
      stage: data.stage,
      procedure: data.procedure,
      responsiblePerson: data.responsiblePerson,
      issueDate: data.issueDate,
      invoiceNumber: data.invoiceNumber,
      currency: data.currency,
      dueDate: data.dueDate,
      comments: data.comments,
      netAmount: data.netAmount,
      grossAmount: data.grossAmount,
      remarks: data.remarks
    };
  }
}
