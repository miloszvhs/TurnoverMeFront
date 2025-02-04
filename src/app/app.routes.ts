import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {InvoiceCreateComponent} from './components/invoice-create/invoice-create.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'invoice-stage', component: InvoiceComponent },
  { path: 'invoices', component: InvoiceComponent },
  { path: 'invoices/:id', component: InvoiceDetailComponent },
  { path: 'invoices-create', component: InvoiceCreateComponent },
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
