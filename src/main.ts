import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/auth.service';
import { InvoiceService } from './app/invoice.service';
import {AppComponent} from './app/app.component';
import {API_URL} from './app/api-url.token';
import {provideAnimations} from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: API_URL, useValue: 'http://localhost:5191/turnoverme-invoicing-acceptation' },
    AuthService,
    InvoiceService,
  ]
});
