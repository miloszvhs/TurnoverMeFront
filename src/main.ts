import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InvoiceService } from './app/services/invoice/invoice.service';
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
    provideHttpClient(),
    {
      provide: API,
      useValue: 'http://localhost:2496',
    },
    AuthService,
    InvoiceService,
  ]
});
