import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API } from '../api-url.token';
import { Approval, ApprovalStatus } from '../components/approval/approval-index/approval-index.component';

export interface EditApproval {
  approvalId: string;
  isAccepted: boolean;
  note?: string;
}

export interface ApprovalResponse {
  executor: string;
  creationTime: string;
  executionTime?: string;
  stageName: string;
  isAccepted: boolean;
  note: string;
  status: string;
}

export interface InvoiceApproval {
  id: string;
  invoiceId: string;
  stageLevel: number;
  status: string;
  creationTime: string;
  acceptationTime?: string;
  approverName?: string;
  note?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  private apiUrl;

  constructor(private http: HttpClient, @Inject(API) apiUrl: string) {
    this.apiUrl = apiUrl + "/invoices-approval";
   }

   transform(status: string): string {
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

   getInvoiceApproval(invoiceApprovalId: string): Observable<InvoiceApproval> {
    const url = `${this.apiUrl}?invoiceApprovalId=${invoiceApprovalId}`;
    return this.http.get<InvoiceApproval>(url);
  }

  sendInvoiceToWorkflow(invoiceId: string, workflowId:string, userId?: string, groupId?: string): Observable<any> {
    const url = `${this.apiUrl}`;
    
    const request = {
      invoiceId: invoiceId,
      userId: userId,
      groupId: groupId,
      workflowId: workflowId
    };
    
    return this.http.post(url, request);
  }

  GetFirstRejectedApproval(invoiceId: string): Observable<ApprovalResponse[]> {
    const url = `${this.apiUrl}/first-rejected?invoiceId=${invoiceId}`;
    return this.http.get<ApprovalResponse[]>(url).pipe(
      map((responses: ApprovalResponse[]) => {
        return responses.map(response => ({
          ...response,
          status: this.transform(response.status)
        }));
      })
    );
  }

  getInvoiceApprovalHistories(invoiceId: string): Observable<ApprovalResponse[]> {
    const url = `${this.apiUrl}/history?invoiceId=${invoiceId}`;
    return this.http.get<ApprovalResponse[]>(url).pipe(
      map((responses: ApprovalResponse[]) => {
        return responses.map(response => ({
          ...response,
          status: this.transform(response.status)
        }));
      })
    );
  }
  saveApprovalHistory(invoiceId: string): Observable<any> {
    const url = `${this.apiUrl}/history`;
    const body = { invoiceId };
    return this.http.post(url, body);
  }

  editApproval(editApproval: EditApproval): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.put(url, editApproval);
  }

  sendBackToChambers(invoiceId: string): Observable<any> {
    const url = `${this.apiUrl}/invoices-approval/send-back-to-chambers`;
    const body = { invoiceId };
    return this.http.post(url, body);
  }

  sendInvoiceToLastUsedAcceptance(invoiceId: string): Observable<any> {
    const url = `${this.apiUrl}/invoices-approval/send-invoice-to-last-used-acceptance`;
    const body = { invoiceId };
    return this.http.post(url, body);
  }

  getGroupApprovals(groupId: string): Observable<Approval[]> {
    const url = `${this.apiUrl}/group-approvals?groupId=${groupId}`;
    return this.http.get<Approval[]>(url);
  }

  getMyApprovals(userId: string): Observable<Approval[]> {
    const url = `${this.apiUrl}/my-approvals?userId=${userId}`;
    return this.http.get<Approval[]>(url);
  }

  getHistoricalApprovals(userId: string): Observable<Approval[]> {
    const url = `${this.apiUrl}/historical-approvals?userId=${userId}`;
    return this.http.get<Approval[]>(url);
  }

  claimApproval(approvalId: string, userId: string): Observable<any> {
    const url = `${this.apiUrl}/claim?approvalId=${approvalId}&userId=${userId}`;
    return this.http.post(url, null);
  }

  approveApproval(approvalId: string, note: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/approve`;
    const body = { approvalId, note };
    return this.http.post(url, body);
  }

  rejectApproval(approvalId: string, note: string, option: 'back' | 'chambers'): Observable<any> {
    const url = `${this.apiUrl}/reject`;
    const body = { approvalId, note, option };
    return this.http.post(url, body);
  }
}
