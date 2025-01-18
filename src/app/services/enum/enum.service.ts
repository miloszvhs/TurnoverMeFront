import { Injectable } from '@angular/core';
import { InvoiceStatusDto } from '../../Dtos/Enums/invoice-status-dto';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  getInvoiceStatusName(status: InvoiceStatusDto): string {
    return InvoiceStatusDto[status];
  }
}
