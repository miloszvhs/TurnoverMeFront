import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApprovalService } from '../../../services/approval.service';
import { Approval, ApprovalStatus } from '../approval-index/approval-index.component';
import { AuthService } from '../../../services/auth.service';
import { HistoryComponent } from "../history-component/history-component.component";

@Component({
  selector: 'app-approval-accepted-invoices',
  imports: [
    NgFor,
    NgIf,
    HistoryComponent
],
  templateUrl: './approval-accepted-invoices.component.html',
  styleUrl: './approval-accepted-invoices.component.css'
})
export class ApprovalAcceptedInvoicesComponent implements OnInit {
  acceptedApprovals: Approval[] = [];    
  paginatedAcceptedApprovals: Approval[] = [];
  currentUserId: string = "";
  selectedInvoiceId: string | null = null;
  selectedInvoiceDocumentNumber: string | null = null;
  selectedInvoiceHistory: any[] | null = null;
  
  pageSize = 8;
  currentPage = 0;
  totalPages = 1;

  constructor(private approvalService: ApprovalService, private authService: AuthService) {
    const currentUser = this.authService.getCurrentUser()
    if(currentUser != null)
      this.currentUserId = currentUser;
   }
  
  ngOnInit(): void {
    this.refreshApprovals();
  }

  refreshApprovals(): void {
    this.approvalService.getAcceptedApprovals(this.currentUserId).subscribe({
      next: (approvals: any) => {
        this.acceptedApprovals = approvals;
        this.totalPages = Math.ceil(this.acceptedApprovals.length / this.pageSize);
        if(this.totalPages == 0)
          this.totalPages = 1;
        this.updatePaginatedAcceptedApprovals();
      },
      error: (err: any) => console.error('Błąd pobierania accepted approvals', err)
    });
  }

  openHistoryModal(invoiceId: string, documentNumber: string): void {
    this.selectedInvoiceId = invoiceId;
    this.selectedInvoiceDocumentNumber = documentNumber;
    this.approvalService.getInvoiceApprovalHistories(invoiceId).subscribe((data) => {
      this.selectedInvoiceHistory = data;
    });
  }

  closeHistoryModal(): void {
    this.selectedInvoiceHistory = null;
    this.selectedInvoiceId = null;
  }

  translateApprovalStatus(status: ApprovalStatus): string {
    switch (status) {
      case ApprovalStatus.AwaitingApprove:
        return 'Oczekuje na zatwierdzenie';
      case ApprovalStatus.Approved:
        return 'Zatwierdzona';
      case ApprovalStatus.Rejected:
        return 'Odrzucona';
      default:
        return 'Nieznany status';
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedAcceptedApprovals();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedAcceptedApprovals();
    }
  }

  updatePaginatedAcceptedApprovals(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedAcceptedApprovals = this.acceptedApprovals.slice(startIndex, endIndex);
  }
}
