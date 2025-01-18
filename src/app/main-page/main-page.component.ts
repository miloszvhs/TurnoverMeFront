import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [
    NgForOf,
    NgClass,
    CurrencyPipe,
    NgIf
  ],
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  invoices = [
    { number: '001', amount: 100, status: 'Pending' },
    { number: '002', amount: 200, status: 'Approved' },
    { number: '003', amount: 300, status: 'Rejected' }
  ];

  ngOnInit(): void {
    // You can fetch the invoice from a service here
  }
}
