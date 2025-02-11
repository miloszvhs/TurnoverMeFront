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

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'invoice-stage', component: InvoiceComponent },
  { path: 'invoices', component: InvoiceComponent },
  { path: 'invoices/:id', component: InvoiceDetailComponent },
  { path: 'chambers-index', component: ChambersIndexComponent },
  { path: 'chambers-create', component: ChambersCreateComponent },
  { path: 'workflow-index', component: WorkflowIndexComponent },
  { path: 'workflow-create', component: WorkflowCreateComponent },
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
