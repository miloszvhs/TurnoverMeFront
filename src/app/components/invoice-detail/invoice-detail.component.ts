import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { InvoiceDto } from '../../Dtos/Invoice-dto';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  invoice: InvoiceDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceService.getInvoiceById(id).subscribe(data => {
        this.invoice = data;
      });
    }
  }
}
