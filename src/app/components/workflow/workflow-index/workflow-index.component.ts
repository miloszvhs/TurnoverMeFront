import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgFor, NgForOf, NgIf} from "@angular/common";
import { API } from '../../../api-url.token';
import { CircuitPathDTO as WorkflowDTO } from '../../../Dtos/CircuitPathDTO';
import { WorkflowService } from '../../../services/workflowService';


@Component({
  selector: 'app-workflow-index',
  templateUrl: './workflow-index.component.html',
  styleUrls: ['./workflow-index.component.css'],
  imports: [
    NgIf,
    NgFor
  ]
})
export class WorkflowIndexComponent implements OnInit {
  paths: WorkflowDTO[] = [];
  selectedPath: any;

  constructor(private http: HttpClient, private workflowService: WorkflowService) {}

  ngOnInit(): void {
    this.fetchPaths();
  }

  fetchPaths(): void {
    this.workflowService.fetchWorkflows().subscribe(data => {
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
