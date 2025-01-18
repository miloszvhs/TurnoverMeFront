import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutComponent } from './about/about.component';
import { CommonModule } from '@angular/common';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {AppRoutingModule} from './app.routes';
import {InvoiceAcceptationComponent} from './components/invoice-acceptation/invoice-acceptation.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,

    AppComponent,
    MainPageComponent,
    InvoiceComponent,
    InvoiceAcceptationComponent,
    AboutComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
