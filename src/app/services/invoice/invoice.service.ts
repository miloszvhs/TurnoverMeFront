import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {InvoiceStatusDto} from '../../Dtos/Enums/invoice-status-dto';
import {API} from '../../api-url.token';
import {InvoiceDto} from '../../Dtos/Invoice-dto';
import {InvoiceDTO} from '../../Dtos/invoicedto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(API) apiUrl: string) {
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

  getInvoices(): Observable<InvoiceDTO[]> {
    return this.http.get<InvoiceDTO[]>(`${this.apiUrl}/invoices`);
  }

  private mapToInvoiceDto(data: any): InvoiceDto {
    return {
      guid: data.guid,
      invoiceNumber: data.number,
      status: data.status as InvoiceStatusDto,
      creationDate: data.creationDate,
      saleDate: data.saleDate,
      stage: "1",
      procedure: "Procedura A",
      responsiblePerson: "Kinga",
      issueDate: new Date(),
    };
  }
}
