import { Pipe, PipeTransform } from '@angular/core';
import { ApprovalStatus } from './components/approval/approval-index/approval-index.component';

@Pipe({
  name: 'translateApprovalStatus'
})
export class TranslateApprovalStatusPipe implements PipeTransform {
  transform(status: ApprovalStatus): string {
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
}