import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutComponent } from './about/about.component';
import { CommonModule } from '@angular/common';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {AppRoutingModule} from './app.routes';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt-interceptor';
import { BaseChartDirective  } from 'ng2-charts';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,

    AppComponent,
    MainPageComponent,
    InvoiceComponent,
    AboutComponent,
    LoginComponent,
    BaseChartDirective
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
  }],
  bootstrap: []
})
export class AppModule { }
