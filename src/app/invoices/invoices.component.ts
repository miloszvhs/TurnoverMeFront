import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { InvoiceAcceptationDto } from '../Dtos/invoice-acceptation-dto';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices: InvoiceAcceptationDto[] = [];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(data => {
      this.invoices = data;
    });
  }
}
