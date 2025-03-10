import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ChambersIndexComponent} from './components/chambers/chambers-index/chambers-index.component';
import {ChambersCreateComponent} from './components/chambers/chambers-create/chambers-create.component';
import { WorkflowIndexComponent } from './components/workflow/workflow-index/workflow-index.component';
import { WorkflowCreateComponent } from './components/workflow/workflow-create/workflow-create.component';
import { AdminIndexComponent } from './components/admin/admin-index/admin-index.component';
import { ApprovalIndexComponent } from './components/approval/approval-index/approval-index.component';
import { authGuard } from './guard/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden/forbidden.component';
import { ApprovalAcceptedInvoicesComponent } from './components/approval/approval-accepted-invoices/approval-accepted-invoices.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'invoice-stage', component: InvoiceComponent, canActivate: [authGuard], data: { roles: ["User"] } },
  { path: 'invoices', component: InvoiceComponent, canActivate: [authGuard], data: { roles: ["User"] } },
  { path: 'invoices/:id', component: InvoiceDetailComponent },
  { path: 'chambers-index', component: ChambersIndexComponent/* , canActivate: [authGuard], data: { roles: ["Chambers", "Admin"] }  */},
  { path: 'chambers-create', component: ChambersCreateComponent/* , canActivate: [authGuard], data: { roles: ["Chambers", "Admin"] }  */},
  { path: 'workflow-index', component: WorkflowIndexComponent/* , canActivate: [authGuard], data: { roles: ["Admin"] }  */},
  { path: 'workflow-create', component: WorkflowCreateComponent/* , canActivate: [authGuard], data: { roles: ["Admin"] }  */},
  { path: 'admin-index', component: AdminIndexComponent/* , canActivate: [authGuard], data: { roles: ["Admin"]}  */},
  { path: 'approval-index', component: ApprovalIndexComponent },
  { path: 'approval-accepted-invoices', component: ApprovalAcceptedInvoicesComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: '**', redirectTo: '/forbidden', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
