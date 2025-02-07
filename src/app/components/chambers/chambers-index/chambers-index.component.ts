import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InvoiceStatusDto} from '../../../Dtos/Enums/invoice-status-dto';
import {InvoiceService} from '../../../services/invoice/invoice.service';
import {InvoiceApiService} from '../../../services/invoice/invoice-api.service';
import {InvoiceCircuitDTO} from '../../../Dtos/InvoiceCircuitDto';

interface AddressDTO {
  street: string;
  streetNumber: string;
  flatNumber: string;
  city: string;
  postCode: string;
  country: string;
}

interface TaxNumberDTO {
  taxNumber: string;
  taxPrefix: string;
}

interface PartyDTO {
  name: string;
  address: AddressDTO;
  taxNumber: TaxNumberDTO;
}

interface ItemDTO {
  name: string;
  unit: string;
  quantity: number;
  unitNetPrice: number;
  discount: number;
  netValue: number;
  taxRate: number;
  taxAmount: number;
  grossValue: number;
}

interface InvoiceDTO {
  invoiceNumber: string;
  issueDate: Date;
  seller: PartyDTO;
  buyer: PartyDTO;
  hasReceiver: boolean;
  receiver?: PartyDTO;
  deliveryDate: Date | null;
  items: ItemDTO[];
  totalNetAmount: number;
  totalTaxAmount: number;
  totalGrossAmount: number;
  currency: string;
  remarks: string;
}

@Component({
  selector: 'app-chambers-index',
  templateUrl: './chambers-index.component.html',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    DatePipe,
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

  constructor(private http: HttpClient,
              private invoiceService: InvoiceService,
              private invoiceApiService: InvoiceApiService) {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }

  openModal(invoice: any): void {
    this.selectedInvoice = { ...invoice };
    this.selectedPath = null;
    this.selectedRecipient = null;
    this.fetchPaths(invoice.invoiceNumber);
    this.fetchRecipients();
  }
  closeModal(): void {
    this.selectedInvoice = null;
  }

  saveInvoice(): void {
    if (!this.selectedPath || !this.selectedRecipient) {
      alert("Please select a path and a recipient.");
      return;
    }

    const invoiceCircuit = {
      invoiceNumber: this.selectedInvoice.invoiceNumber,
      pathId: this.selectedPath,
      recipientId: this.selectedRecipient,
      recipientType: this.selectedRecipientType,
      createdAt: new Date(),
    };

    console.log("Invoice Circuit Saved:", invoiceCircuit);
    this.closeModal();
  }

  fetchPaths(invoiceNumber: string): void {
    const paths = [
      { id: '1', name: 'IT Support' },
      { id: '2', name: 'Software Development' },
      { id: '3', name: 'Cybersecurity' },
      { id: '4', name: 'Cloud Computing' },
      { id: '5', name: 'DevOps' },
    ];
    setTimeout(() => {
      this.invoicePaths[invoiceNumber] = paths;
    }, 500);
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
