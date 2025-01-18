import { Component, OnInit, ViewChild } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { InvoiceStatusDto } from '../../Dtos/Enums/invoice-status-dto';
import { EnumService } from '../../services/enum/enum.service';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { RouterLink } from '@angular/router';
import { InvoiceDto } from '../../Dtos/Invoice-dto';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoices: InvoiceDto[] = [];

  constructor(private invoiceService: InvoiceService, private enumService: EnumService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(data => {
      this.invoices = data;
    });
  }

  getInvoiceStatusName(status: InvoiceStatusDto): string {
    return this.enumService.getInvoiceStatusName(status);
  }

  protected readonly InvoiceStatusDto = InvoiceStatusDto;
  isExpansionDetailRow = (index: number, row: any) => row.hasOwnProperty('detailRow');
}
