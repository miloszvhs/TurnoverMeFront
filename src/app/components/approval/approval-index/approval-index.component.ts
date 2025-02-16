import { Component, OnInit } from '@angular/core';
import { ApprovalService } from '../../../services/approval.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HistoryComponent } from "../history-component/history-component.component";

export interface Approval {
  id: string;
  invoiceId: string;
  documentNumber: string;
  stageLevel: number;
  status: ApprovalStatus; 
  note?: string;
  userId?: string;
  dueDate: Date;
  invoiceFileAsBase64: string;
  lastApprovalId: string;
  constantlyRejected: boolean;
}

export enum ApprovalStatus {
  AwaitingApprove = "AwaitingApprove",
  Approved = "Approved",
  Rejected = "Rejected",
}

@Component({
  selector: 'app-approval-index',
  templateUrl: './approval-index.component.html',
  styleUrls: ['./approval-index.component.css'],
  imports: [
    NgIf,
    FormsModule,
    NgFor,
    NgClass,
    HistoryComponent
]
})
export class ApprovalIndexComponent implements OnInit {
  groupApprovals: Approval[] = [];    
  paginatedGroupApprovals: Approval[] = [];
  myApprovals: Approval[] = [];      
  paginatedMyApprovals: Approval[] = [];

  editingApproval: Approval | null = null;
  selectedAttachment: string | null = null;

  selectedInvoiceId: string | null = null;
  selectedInvoiceDocumentNumber: string | null = null;
  selectedInvoiceHistory: any[] | null = null;

  currentUserId: string = "";
  currentUserGroupId: string = "";

  pageSize = 8;
  currentGroupPage = 0;
  totalGroupPages = 0;
  currentMyPage = 0;
  totalMyPages = 0;

  constructor(private approvalService: ApprovalService, private authService: AuthService) { 
    const currentUser = this.authService.getCurrentUser()
    const currentUserGroup = this.authService.getCurrentUserGroup();
    if(currentUser != null)
      this.currentUserId = currentUser;
    if(currentUserGroup != null)
      this.currentUserGroupId = currentUserGroup;
  }

  ngOnInit(): void {
    this.refreshApprovals();
  }

  refreshApprovals(): void {
    this.approvalService.getGroupApprovals(this.currentUserGroupId).subscribe({
      next: (approvals: Approval[]) => {
        this.groupApprovals = approvals.filter(x => x.userId == null);
        this.totalGroupPages = Math.ceil(this.groupApprovals.length / this.pageSize);
        if(this.totalGroupPages == 0)
          this.totalGroupPages = 1;
        this.updatePaginatedGroupApprovals();
      },
      error: (err: any) => console.error('Błąd pobierania group approvals', err)
    });

    this.approvalService.getMyApprovals(this.currentUserId).subscribe({
      next: (approvals: any) => {
        this.myApprovals = approvals;
        this.totalMyPages = Math.ceil(this.myApprovals.length / this.pageSize);
        if(this.totalMyPages == 0)
          this.totalMyPages = 1;
        this.updatePaginatedMyApprovals();
      },
      error: (err: any) => console.error('Błąd pobierania my approvals', err)
    });
  }

  takeApproval(approval: Approval): void {
    this.approvalService.claimApproval(approval.id, this.currentUserId).subscribe({
      next: () => {
        console.log('Faktura odebrana.');
        this.refreshApprovals();
      },
      error: (err: any) => console.error('Błąd podczas odbierania faktury', err)
    });
  }

  toggleEdit(approval: Approval): void {
    if (this.editingApproval && this.editingApproval.id === approval.id) {
      this.editingApproval = null;
    } else {
      this.editingApproval = { ...approval };
    }
  }

  acceptApproval(approval: Approval): void {
    this.approvalService.approveApproval(approval.id, approval.note).subscribe({
      next: () => {
        console.log('Approval zaakceptowany i wysłany dalej.');
        this.editingApproval = null;
        this.refreshApprovals();
      },
      error: (err: any) => console.error('Błąd podczas akceptacji approvala', err)
    });
  }

  rejectApproval(approval: Approval, option: 'back' | 'chambers'): void {
    if (!approval.note || approval.note.trim() === '') {
      alert('Proszę podać uwagę przy odrzuceniu.');
      return;
    }
    this.approvalService.rejectApproval(approval.id, approval.note, option).subscribe({
      next: () => {
        console.log('Approval odrzucony.');
        this.editingApproval = null;
        this.refreshApprovals();
      },
      error: (err: any) => console.error('Błąd podczas odrzucenia approvala', err)
    });
  }

  cancelEdit(): void {
    this.editingApproval = null;
  }

  formatDueDate(dueDate: Date): string {
    const formattedDate = new DatePipe('en-US').transform(dueDate, 'dd-MM-yyyy');
    return this.isOverdue(dueDate) ? `${formattedDate ?? ''} (Przeterminowana)` : (formattedDate ?? '');
  }

  isOverdue(dueDate: Date): boolean {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  }

  isDueSoon(dueDate: Date): boolean {
    const today = new Date();
    const due = new Date(dueDate);
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    return due >= today && due <= oneWeekFromNow;
  }

  openAttachmentModal(attachment: string): void {
    this.selectedAttachment = `data:image/jpeg;base64,${attachment}`;
  }

  closeAttachmentModal(): void {
    this.selectedAttachment = null;
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

  translateApprovalStatus(status: ApprovalStatus, constantlyRejected: boolean): string {
    switch (status) {
      case ApprovalStatus.AwaitingApprove:
        return 'Oczekuje na zatwierdzenie';
      case ApprovalStatus.Approved:
        return 'Zatwierdzona';
      case ApprovalStatus.Rejected:
        return constantlyRejected ? 'Odrzucona (Permanentnie)' : 'Odrzucona';
      default:
        return 'Nieznany status';
    }
  }

  previousGroupPage(): void {
    if (this.currentGroupPage > 0) {
      this.currentGroupPage--;
      this.updatePaginatedGroupApprovals();
    }
  }

  nextGroupPage(): void {
    if (this.currentGroupPage < this.totalGroupPages - 1) {
      this.currentGroupPage++;
      this.updatePaginatedGroupApprovals();
    }
  }

  updatePaginatedGroupApprovals(): void {
    const startIndex = this.currentGroupPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedGroupApprovals = this.groupApprovals.slice(startIndex, endIndex);
  }

  previousMyPage(): void {
    if (this.currentMyPage > 0) {
      this.currentMyPage--;
      this.updatePaginatedMyApprovals();
    }
  }

  nextMyPage(): void {
    if (this.currentMyPage < this.totalMyPages - 1) {
      this.currentMyPage++;
      this.updatePaginatedMyApprovals();
    }
  }

  updatePaginatedMyApprovals(): void {
    const startIndex = this.currentMyPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMyApprovals = this.myApprovals.slice(startIndex, endIndex);
  }
}