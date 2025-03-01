import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { InvoiceService } from './app/services/invoice/invoice.service';
import { InvoiceApiService } from './app/services/invoice/invoice-api.service';
import {AppComponent} from './app/app.component';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AuthService} from './app/services/auth.service';
import {API, API_INVOICING} from './app/api-url.token';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend, PieController,
} from 'chart.js';
import {bearerInterceptor} from './app/interceptors/bearer.interceptor';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PieController,
  Title,
  Tooltip,
  Legend
);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([bearerInterceptor])),
    {
      provide: API,
      useValue: 'http://localhost:2496',
    },
    {
      provide: API_INVOICING,
      useValue: 'http://localhost:2496/invoices'
    },
    AuthService,
    InvoiceService,
    InvoiceApiService
  ]
});
