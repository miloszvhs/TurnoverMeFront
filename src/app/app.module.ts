import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,

    AppComponent,
    MainPageComponent,
    InvoicesComponent,
    AboutComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
