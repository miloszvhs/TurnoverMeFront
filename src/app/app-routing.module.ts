import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
