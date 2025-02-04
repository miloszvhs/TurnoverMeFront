import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CommonModule } from '@angular/common';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {AppRoutingModule} from './app.routes';
import {LoginComponent} from './components/login/login.component';
import { BaseChartDirective  } from 'ng2-charts';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,

    AppComponent,
    InvoiceComponent,
    AboutComponent,
    LoginComponent,
    BaseChartDirective
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
