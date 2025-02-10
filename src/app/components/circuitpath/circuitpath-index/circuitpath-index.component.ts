import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgFor, NgForOf, NgIf} from "@angular/common";
import { API } from '../../../api-url.token';
import { CircuitPathDTO } from '../../../Dtos/CircuitPathDTO';
import { CircuitpathService } from '../../../services/circuitpathService';


@Component({
  selector: 'app-circuitpath-index',
  templateUrl: './circuitpath-index.component.html',
  styleUrls: ['./circuitpath-index.component.css'],
  imports: [
    NgIf,
    NgFor
  ]
})
export class CircuitpathIndexComponent implements OnInit {
  paths: CircuitPathDTO[] = [];
  selectedPath: any;

  constructor(private http: HttpClient, private circuitPathService: CircuitpathService) {}

  ngOnInit(): void {
    this.fetchPaths();
  }

  fetchPaths(): void {
    this.circuitPathService.fetchPaths().subscribe(data => {
      this.paths = data;
    });
  }

  showDetails(path: any): void {
    this.selectedPath = path;
  }

  closeModal(): void {
    this.selectedPath = null;
  }
}
