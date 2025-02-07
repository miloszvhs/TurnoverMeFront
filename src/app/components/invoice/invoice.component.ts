import { Component, OnInit } from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { InvoiceStatusDto } from '../../Dtos/Enums/invoice-status-dto';
import { EnumService } from '../../services/enum/enum.service';
import {FormsModule} from '@angular/forms';
import {InvoiceService} from '../../services/invoice/invoice.service';
import {InvoiceDto} from '../../Dtos/Invoice-dto';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  imports: [
    NgClass,
    NgForOf,
    DatePipe,
    FormsModule
  ],
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoices: InvoiceDto[] = [];
  filteredInvoices: InvoiceDto[] = [];
  selectedStage: string = 'Wszystkie';
  selectedProcedure: string = 'Wszystkie';
  personToForward: string = '';
  startDate: string = '';
  endDate: string = '';
  filterText: string = '';
  expandedElement: InvoiceDto | null = null;

  constructor(
    private invoiceService: InvoiceService,
    private enumService: EnumService
  ) {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((data) => {
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
        invoice.invoiceNumber
          .toLowerCase()
          .includes(this.filterText.toLowerCase());

      return (
        matchesStage && matchesProcedure && matchesPerson && matchesDate && matchesText
      );
    });
  }

  acceptAction(invoice: InvoiceDto): void {
    invoice.status = InvoiceStatusDto.Sent;
    this.updateInvoiceStatus(invoice);
    console.log('Accepted invoice:', invoice);
  }

  rejectAction(invoice: InvoiceDto): void {
    invoice.status = InvoiceStatusDto.Printed;
    this.updateInvoiceStatus(invoice);
    console.log('Rejected invoice:', invoice);
  }

  forwardAction(invoice: InvoiceDto): void {
    console.log('Forwarded invoice:', invoice);
    this.updateInvoiceStatus(invoice);
  }

  updateInvoiceStatus(updatedInvoice: InvoiceDto): void {
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
      [InvoiceStatusDto.Draft]: 'Robocza',
      [InvoiceStatusDto.Sent]: 'Wysłana',
      [InvoiceStatusDto.Printed]: 'Wydrukowana',
      [InvoiceStatusDto.Paid]: 'Zapłacona'
    };

    return statusNames[status] || 'Nieznany status';
  }

  toggleRow(element: InvoiceDto): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  protected readonly InvoiceStatusDto = InvoiceStatusDto;
}
