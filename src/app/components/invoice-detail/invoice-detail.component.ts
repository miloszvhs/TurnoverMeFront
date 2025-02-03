import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

interface HistoryItem {
  date: string;
  from: string;
  to: string;
  executor: string;
  executionDate: string;
  stage: string;
  w: boolean;
}

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  history: HistoryItem[] = [];
  currentPage = 1;
  totalPages = 2;
  totalItems = 15;
  invoiceId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    this.loadHistory();
  }

  loadHistory(): void {
    this.history = [
      { date: '05.01.2025 17:36', from: 'Konsultant', to: 'Majewska Beata', executor: 'Konsultant', executionDate: '05.01.2025 17:36', stage: 'IV.B KONTROLA KSIEGOWA', w: false },
      { date: '05.01.2025 17:19', from: 'Konsultant', to: 'Konsultant', executor: 'Konsultant(99)', executionDate: '05.01.2025 17:19', stage: 'III.A MERYTORYCZNY', w: true }
    ];
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  close(): void {
    console.log('Zamknięcie widoku');
  }

  acceptAction() {

  }

  forwardAction() {

  }

  rejectAction() {

  }
}
