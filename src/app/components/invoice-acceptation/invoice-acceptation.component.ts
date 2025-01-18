import { Component, OnInit } from '@angular/core';
import { InvoiceAcceptationDto } from '../../Dtos/invoice-acceptation-dto';
import { InvoiceStatusDto } from '../../Dtos/Enums/invoice-status-dto';
import { EnumService } from '../../services/enum/enum.service';
import { InvoiceAcceptationService } from '../../services/invoice/invoice-acceptation.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe, NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-invoice-acceptation',
  templateUrl: './invoice-acceptation.component.html',
  styleUrls: ['./invoice-acceptation.component.css'],
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    DecimalPipe,
    DatePipe
  ]
})
export class InvoiceAcceptationComponent implements OnInit {
  invoices: InvoiceAcceptationDto[] = [];
  filteredInvoices: InvoiceAcceptationDto[] = [];
  selectedStage: string = 'Wszystkie';
  selectedProcedure: string = 'Wszystkie';
  personToForward: string = '';
  startDate: string = '';
  endDate: string = '';
  filterText: string = '';
  expandedElement: InvoiceAcceptationDto | null = null;

  constructor(
    private invoiceService: InvoiceAcceptationService,
    private enumService: EnumService
  ) {}

  ngOnInit(): void {
    this.invoiceService.getInvoiceAcceptation().subscribe((data) => {
      this.invoices = data;
      this.filteredInvoices = data;
    });
  }

  applyFilters(): void {
    this.filteredInvoices = this.invoices.filter((invoice) => {
      const matchesStage =
        this.selectedStage === 'Wszystkie' ||
        invoice.stage === this.selectedStage;
      const matchesProcedure =
        this.selectedProcedure === 'Wszystkie' ||
        invoice.procedure === this.selectedProcedure;
      const matchesPerson =
        !this.personToForward ||
        invoice.responsiblePerson
          .toLowerCase()
          .includes(this.personToForward.toLowerCase());
      const matchesDate =
        (!this.startDate ||
          new Date(invoice.issueDate) >= new Date(this.startDate)) &&
        (!this.endDate || new Date(invoice.issueDate) <= new Date(this.endDate));
      const matchesText =
        !this.filterText ||
        invoice.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
        invoice.invoiceNumber
          .toLowerCase()
          .includes(this.filterText.toLowerCase());

      return (
        matchesStage && matchesProcedure && matchesPerson && matchesDate && matchesText
      );
    });
  }

  acceptAction(invoice: InvoiceAcceptationDto): void {
    invoice.status = InvoiceStatusDto.Approved;
    this.updateInvoiceStatus(invoice);
    console.log('Accepted invoice:', invoice);
  }

  rejectAction(invoice: InvoiceAcceptationDto): void {
    invoice.status = InvoiceStatusDto.Rejected;
    this.updateInvoiceStatus(invoice);
    console.log('Rejected invoice:', invoice);
  }

  forwardAction(invoice: InvoiceAcceptationDto): void {
    console.log('Forwarded invoice:', invoice);
    this.updateInvoiceStatus(invoice);
  }

  updateInvoiceStatus(updatedInvoice: InvoiceAcceptationDto): void {
    const index = this.invoices.findIndex(
      (invoice) => invoice.guid === updatedInvoice.guid
    );
    if (index !== -1) {
      this.invoices[index] = { ...updatedInvoice };
      this.applyFilters();
    }
  }

  resetFilters(): void {
    this.selectedStage = 'Wszystkie';
    this.selectedProcedure = 'Wszystkie';
    this.personToForward = '';
    this.startDate = '';
    this.endDate = '';
    this.filterText = '';
    this.applyFilters();
  }

  getInvoiceStatusName(status: InvoiceStatusDto): string {
    const statusNames = {
      [InvoiceStatusDto.Approved]: 'Zatwierdzona',
      [InvoiceStatusDto.Rejected]: 'Odrzucona',
      [InvoiceStatusDto.Pending]: 'Oczekująca',
      [InvoiceStatusDto.Paid]: 'Zapłacona'
    };

    return statusNames[status] || 'Nieznany status';
  }

  toggleRow(element: InvoiceAcceptationDto): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  protected readonly InvoiceStatusDto = InvoiceStatusDto;
}
