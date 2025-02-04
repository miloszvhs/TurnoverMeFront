import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {API_INVOICING} from '../../api-url.token';
import {FormGroup} from '@angular/forms';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InvoiceApiService {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(API_INVOICING) apiUrl: string) {
    this.apiUrl = `${apiUrl}`;
  }

  postInvoice(invoiceForm: FormGroup): Observable<{ status: boolean; message: string; data?: any; error?: any }> {
    return this.http.post(`${this.apiUrl}/commit`, { invoiceRequest: invoiceForm.value } ).pipe(
      map(response => {
        return { status: true, message: 'Invoice posted successfully', data: response };
      }),
      catchError(error => {
        return of({ status: false, message: 'Invoice posting failed', error: error });
      })
    );
  }
}
