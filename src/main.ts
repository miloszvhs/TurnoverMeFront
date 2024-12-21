import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/auth.service';
import { InvoiceService } from './app/invoice.service';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    AuthService,
    InvoiceService,
  ]
});
