import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {ChartConfiguration, ChartData, ChartOptions} from 'chart.js';
import {InvoiceApiService} from '../../services/invoice/invoice-api.service';
import {InvoiceDTO} from '../../Dtos/invoicedto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  protected invoices: InvoiceDTO[] = [];

  constructor(private invoiceApiService: InvoiceApiService) {
  }

  public dailyLabels: string[] = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'];
  public dailyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.dailyLabels,
    datasets: [
      {
        label: 'Zatwierdzone',
        data: [5, 8, 6, 7, 4, 5, 6],
        backgroundColor: 'rgba(66, 165, 245, 0.6)',
        borderColor: 'rgba(66, 165, 245, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ogółem',
        data: [10, 15, 12, 13, 9, 10, 11],
        backgroundColor: 'rgba(255, 152, 0, 0.6)',
        borderColor: 'rgba(255, 152, 0, 1)',
        borderWidth: 1,
      },
    ]
  };

  public dailyChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  public dailyChartType: 'bar' = 'bar';

  // Wykres miesięczny – etykiety jako miesiące
  public monthlyLabels: string[] = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
  public monthlyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.monthlyLabels,
    datasets: [
      {
        label: 'Zatwierdzone',
        data: [10, 12, 6, 11, 22, 9, 6, 5, 4, 3, 5, 7],
        backgroundColor: 'rgba(66, 165, 245, 0.6)',
        borderColor: 'rgba(66, 165, 245, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ogółem',
        data: [12, 14, 6, 12, 34, 11, 6, 9, 5, 3, 5, 8],
        backgroundColor: 'rgba(255, 152, 0, 0.6)',
        borderColor: 'rgba(255, 152, 0, 1)',
        borderWidth: 1,
      },
    ]
  };

  public monthlyChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };

  public monthlyChartType: 'bar' = 'bar';

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Zatwierdzone', 'Otrzymane'];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [4, 6],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit(): void {
    this.invoiceApiService.GetInvoicesForUser().subscribe((data) => {
      this.invoices = data;
    });
  }
}
