import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { InvoiceAcceptationDto } from '../Dtos/invoice-acceptation-dto';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {InvoiceStatusDto} from '../Dtos/Enums/invoice-status-dto';
import {EnumService} from '../enum.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices: InvoiceAcceptationDto[] = [];

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
}
