import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { InvoiceApiService } from '../../../services/invoice/invoice-api.service';
import { InvoiceDTO, InvoiceResponseDTO, InvoiceStatus } from '../../../Dtos/invoicedto';
import { WorkflowDTO } from '../../../Dtos/WorkflowDTO';
import { WorkflowService } from '../../../services/workflowService';
import { ApprovalService } from '../../../services/approval.service';
import { GroupService } from '../../../services/group.service';
import { Observable } from 'rxjs';
import { HistoryComponent } from "../../approval/history-component/history-component.component";

@Component({
  selector: 'app-chambers-index',
  templateUrl: './chambers-index.component.html',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    NgClass,
    HistoryComponent
],
  styleUrls: ['./chambers-index.component.css']
})
export class ChambersIndexComponent implements OnInit {
  invoices: InvoiceResponseDTO[] = [];
  paginatedInvoices: InvoiceResponseDTO[] = [];
  approvedInvoices: InvoiceResponseDTO[] = [];
  paginatedApprovedInvoices: InvoiceResponseDTO[] = [];
  selectedInvoice: any = null;
  invoicePaths: { [key: string]: { id: string; name: string }[] } = {};
  selectedPath: string | null = null;
  selectedAttachment: string | null = null;
  selectedInvoiceId: string | null = null;
  selectedInvoiceDocumentNumber: string | null = null;
  selectedInvoiceHistory: any[] | null = null;

  recipients: { users: { id: string; name: string }[], groups: { id: string; name: string }[] } = { users: [], groups: [] };
  selectedRecipientType: 'group' | 'user' = 'group';
  selectedRecipient: string | null = null;
  workflows: WorkflowDTO[] = [];

  pageSize = 5;
  currentPage = 0;
  totalPages = 1;
  currentApprovedPage = 0;
  totalApprovedPages = 0;

  constructor(private http: HttpClient,
              private invoiceService: InvoiceService,
              private invoiceApiService: InvoiceApiService,
              private workflowService: WorkflowService,
              private approvalService: ApprovalService,
              private groupService: GroupService) {}

  ngOnInit(): void {
    this.fetchInvoices();
  }

  fetchInvoices() {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
      this.approvedInvoices = data.filter(invoice => this.isApproved(invoice.status));
      this.invoices = this.invoices.filter(invoice => !this.isApproved(invoice.status));
      this.totalPages = Math.ceil(this.invoices.length / this.pageSize);
      if(this.totalPages == 0)
        this.totalPages = 1;
      this.totalApprovedPages = Math.ceil(this.approvedInvoices.length / this.pageSize);
      this.updatePaginatedInvoices();
      this.updatePaginatedApprovedInvoices();
    });
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

  isApproved(status: InvoiceStatus): boolean {
    return status === InvoiceStatus.Approved;
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
    this.selectedPath = null;
    this.selectedRecipient = null;
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

  sendInvoiceToWorkflow(): Observable<any> {
    if (!this.selectedInvoice) {
      console.error('Brak wybranej faktury.');
      return new Observable(observer => {
        observer.error('Brak wybranej faktury.');
      });
    }
  
    const invoiceId = this.selectedInvoice.id;
  
    const invoiceCircuit = {
      invoiceId: invoiceId,
      pathId: this.selectedPath,
      recipientId: this.selectedRecipient,
      recipientType: this.selectedRecipientType,
      createdAt: new Date(),
    };
  
    if (this.selectedPath == null) {
      alert("Nie wybrano ścieżki.");
      return new Observable(observer => {
        observer.error('Nie wybrano ścieżki.');
      });
    }
  
    const workflowId = this.selectedPath;
  
    if (this.selectedRecipientType === 'user') {
      if (this.selectedRecipient == null) {
        alert("Nie wybrano użytkownika.");
        return new Observable(observer => {
          observer.error('Nie wybrano użytkownika.');
        });
      }
  
      const user = this.recipients.users.find(u => u.id === this.selectedRecipient);
      if (!user) {
        alert("Nie znaleziono użytkownika.");
        return new Observable(observer => {
          observer.error('Nie znaleziono użytkownika.');
        });
      }
  
      this.approvalService.sendInvoiceFurther(invoiceId, workflowId, this.selectedRecipient, undefined)
        .subscribe({
          next: (response) => {
            console.log("Faktura wysłana do pierwszego etapu (użytkownik):", response);
            console.log("Dane faktury:", invoiceCircuit);
            this.fetchInvoices();
            this.closeModal();
          },
          error: (err) => {
            console.error("Błąd podczas wysyłania faktury:", err);
          }
        });
    } else if (this.selectedRecipientType === 'group') {
      const selectedWorkflow = this.workflows.find(x => x.id === workflowId);
    if (!selectedWorkflow || selectedWorkflow.stages.length === 0) {
      alert("Nie znaleziono odpowiedniego workflow lub brak etapów.");
      return new Observable(observer => {
        observer.error('Nie znaleziono odpowiedniego workflow lub brak etapów.');
      });
    }

    const firstStage = selectedWorkflow.stages.find(x => x.order == 1);
    if(firstStage == null)
    {
      alert("Nie znaleziono odpowiedniego etapu.");
      return new Observable(observer => {
        observer.error('Nie znaleziono odpowiedniego etapu.');
      });
    }
    const groupId = firstStage?.groupId;

    this.approvalService.sendInvoiceFurther(invoiceId, workflowId, undefined, groupId)
      .subscribe({
        next: (response) => {
          console.log("Faktura wysłana do pierwszego etapu (grupa):", response);
          console.log("Dane faktury:", invoiceCircuit);
          this.closeModal();
        },
        error: (err) => {
          console.error("Błąd podczas wysyłania faktury:", err);
        }
      });
    } else {
      console.error("Nieznany typ odbiorcy.");
    }
  
    return new Observable(observer => {
      this.fetchInvoices();
      observer.complete();
    });
  }

  fetchPaths(): void {
    this.workflowService.fetchWorkflows().subscribe(data => {
      this.workflows = data;
    });
  }

  fetchRecipients(): void {
    if (this.selectedPath) {
      const selectedWorkflow = this.workflows.find(workflow => workflow.id === this.selectedPath);
      if (selectedWorkflow && selectedWorkflow.stages.length > 0) {
        const firstStageGroupId = selectedWorkflow.stages[0].groupId;
        this.fetchUsersByGroup(firstStageGroupId);
      }
    }
  }

  fetchUsersByGroup(groupId: string): void {
    this.groupService.getGroup(groupId).subscribe(data => {
      this.recipients.users = data.users;
    });
  }

  translateStatus(status: InvoiceStatus): string {
    switch (status) {
      case InvoiceStatus.New:
        return 'Nowa';
      case InvoiceStatus.Approved:
        return 'Zatwierdzona';
      case InvoiceStatus.Rejected:
        return 'Odrzucona';
      case InvoiceStatus.PendingApproval:
        return 'W trakcie obiegu';
      default:
        return 'Nieznany status';
    }
  }

  openAttachmentModal(attachment: string): void {
    this.selectedAttachment = `data:image/jpeg;base64,${attachment}`;
  }

  closeAttachmentModal(): void {
    this.selectedAttachment = null;
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedInvoices();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedInvoices();
    }
  }

  updatePaginatedInvoices(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedInvoices = this.invoices.slice(startIndex, endIndex);
  }

  previousApprovedPage(): void {
    if (this.currentApprovedPage > 0) {
      this.currentApprovedPage--;
      this.updatePaginatedApprovedInvoices();
    }
  }

  nextApprovedPage(): void {
    if (this.currentApprovedPage < this.totalApprovedPages - 1) {
      this.currentApprovedPage++;
      this.updatePaginatedApprovedInvoices();
    }
  }

  updatePaginatedApprovedInvoices(): void {
    const startIndex = this.currentApprovedPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedApprovedInvoices = this.approvedInvoices.slice(startIndex, endIndex);
  }
}