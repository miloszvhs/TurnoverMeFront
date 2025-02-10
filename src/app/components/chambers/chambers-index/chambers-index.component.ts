import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InvoiceStatusDto} from '../../../Dtos/Enums/invoice-status-dto';
import {InvoiceService} from '../../../services/invoice/invoice.service';
import {InvoiceApiService} from '../../../services/invoice/invoice-api.service';
import {InvoiceCircuitDTO} from '../../../Dtos/InvoiceCircuitDto';
import { InvoiceDTO } from '../../../Dtos/invoicedto';
import { CircuitPathDTO } from '../../../Dtos/CircuitPathDTO';
import { CircuitpathService } from '../../../services/circuitpathService';

@Component({
  selector: 'app-chambers-index',
  templateUrl: './chambers-index.component.html',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    DatePipe
],
  styleUrls: ['./chambers-index.component.css']
})
export class ChambersIndexComponent implements OnInit {
  invoices: InvoiceDTO[] = [];
  selectedInvoice: any = null;
  invoicePaths: { [key: string]: { id: string; name: string }[] } = {};
  selectedPath: string | null = null;

  recipients: { users: { id: string; name: string }[], groups: { id: string; name: string }[] } = { users: [], groups: [] };
  selectedRecipientType: 'group' | 'user' = 'group';
  selectedRecipient: string | null = null;
  paths: CircuitPathDTO[] = [];

  constructor(private http: HttpClient,
              private invoiceService: InvoiceService,
              private invoiceApiService: InvoiceApiService,
              private circuitPathService: CircuitpathService) {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }

  openModal(invoice: any): void {
    this.selectedInvoice = { ...invoice };
    this.selectedPath = null;
    this.selectedRecipient = null;
    this.fetchPaths();
    this.fetchRecipients();
  }
  closeModal(): void {
    this.selectedInvoice = null;
  }

  saveInvoice(): void {
    if (!this.selectedPath || !this.selectedRecipient) {
      alert("Wybierz ścieżkę oraz odbiorcę.");
      return;
    }

    const invoiceCircuit = {
      invoiceNumber: this.selectedInvoice.invoiceNumber,
      pathId: this.selectedPath,
      recipientId: this.selectedRecipient,
      recipientType: this.selectedRecipientType,
      createdAt: new Date(),
    };

    console.log("Faktura wysłana do obiegu:", invoiceCircuit);
    this.closeModal();
  }

  fetchPaths(): void {
    this.circuitPathService.fetchPaths().subscribe(data => {
      this.paths = data;
    });
  }

  fetchRecipients(): void {
    this.recipients = {
      users: [
        { id: 'u1', name: 'John Doe' },
        { id: 'u2', name: 'Alice Smith' },
        { id: 'u3', name: 'Michael Brown' },
      ],
      groups: [
        { id: 'g1', name: 'Finance Team' },
        { id: 'g2', name: 'HR Department' },
        { id: 'g3', name: 'IT Department' },
      ],
    };
  }
}
