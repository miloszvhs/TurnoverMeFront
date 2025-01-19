import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/services/auth/auth.service';
import { InvoiceService } from './app/services/invoice/invoice.service';
import {AppComponent} from './app/app.component';
import {provideAnimations} from '@angular/platform-browser/animations';
import {API_INVOICING, API_INVOICING_INVOICES} from './app/api-url.token';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: API_INVOICING,
      useValue: 'http://localhost:5191/turnoverme-invoicing',
    },
    {
      provide: API_INVOICING_INVOICES,
      useValue: 'http://localhost:5191/turnoverme-invoicing/invoices',
    },
    AuthService,
    InvoiceService,
  ]
});
