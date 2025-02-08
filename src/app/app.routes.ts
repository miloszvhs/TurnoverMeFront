import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ChambersIndexComponent} from './components/chambers/chambers-index/chambers-index.component';
import {ChambersCreateComponent} from './components/chambers/chambers-create/chambers-create.component';
import { CircuitpathIndexComponent } from './components/circuitpath/circuitpath-index/circuitpath-index.component';
import { CircuitpathCreateComponent } from './components/circuitpath/circuitpath-create/circuitpath-create.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'invoice-stage', component: InvoiceComponent },
  { path: 'invoices', component: InvoiceComponent },
  { path: 'invoices/:id', component: InvoiceDetailComponent },
  { path: 'chambers-index', component: ChambersIndexComponent },
  { path: 'chambers-create', component: ChambersCreateComponent },
  { path: 'circuitpath-index', component: CircuitpathIndexComponent },
  { path: 'circuitpath-create', component: CircuitpathCreateComponent },
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
