import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-history-component',
  imports: [
    NgFor,
    DatePipe,
    NgIf
  ],
  templateUrl: './history-component.component.html',
  styleUrl: './history-component.component.css'
})
export class HistoryComponent {
  @Input() selectedInvoiceHistory: any[] = [];
  @Input() selectedInvoiceDocumentNumber: string | null = '';
  @Output() closeHistoryModal = new EventEmitter<void>();

  onCloseHistoryModal(): void {
    this.closeHistoryModal.emit();
  }
}