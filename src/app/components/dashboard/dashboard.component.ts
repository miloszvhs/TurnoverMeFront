import {Component, OnInit} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {DatePipe, NgForOf} from '@angular/common';
import {ChartConfiguration, ChartData, ChartOptions} from 'chart.js';
import {InvoiceApiService} from '../../services/invoice/invoice-api.service';
import {InvoiceDTO} from '../../Dtos/invoicedto';

@Component({
  selector: 'app-dashboard',
  imports: [
    BaseChartDirective,
    DatePipe,
    NgForOf
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
        label: 'Opłacone',
        data: [4, 6, 5, 6, 3, 4, 5],
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderColor: 'rgba(76, 175, 80, 1)',
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
        data: [120, 150, 130, 140, 110, 160, 170, 180, 150, 130, 140, 160],
        backgroundColor: 'rgba(66, 165, 245, 0.6)',
        borderColor: 'rgba(66, 165, 245, 1)',
        borderWidth: 1,
      },
      {
        label: 'Opłacone',
        data: [100, 130, 110, 120, 90, 140, 150, 160, 130, 110, 120, 140],
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ogółem',
        data: [220, 280, 240, 260, 200, 300, 320, 340, 280, 240, 260, 300],
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
  public pieChartLabels: string[] = ['Zatwierdzone', 'Opłacone', 'Otrzymane'];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [, 500, 100],
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
