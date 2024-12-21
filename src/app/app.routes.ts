import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import {AboutComponent} from './about/about.component';
import {InvoicesComponent} from './invoices/invoices.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent }, // Replace with actual component
  { path: 'invoices', component: InvoicesComponent }, // Replace with actual component
  { path: 'about', component: AboutComponent } // Replace with actual component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
