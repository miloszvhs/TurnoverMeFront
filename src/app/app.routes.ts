import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import {AboutComponent} from './about/about.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent }, // Replace with actual component
  { path: 'invoice-stage', component: InvoiceComponent }, // Replace with actual component
  { path: 'invoices', component: InvoiceComponent },
  { path: 'invoices/:id', component: InvoiceDetailComponent },
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
  { path: 'about', component: AboutComponent } // Replace with actual component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
