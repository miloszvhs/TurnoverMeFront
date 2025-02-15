import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgFor, NgForOf, NgIf} from "@angular/common";
import { API } from '../../../api-url.token';
import { WorkflowDTO as WorkflowDTO } from '../../../Dtos/WorkflowDTO';
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
  workflows: WorkflowDTO[] = [];
  selectedWorkflow: WorkflowDTO | undefined;

  constructor(private http: HttpClient, private workflowService: WorkflowService) {}

  ngOnInit(): void {
    this.fetchPaths();
  }

  fetchPaths(): void {
    this.workflowService.fetchWorkflows().subscribe(data => {
      this.workflows = data.map(workflow => {
        workflow.stages.sort((a, b) => a.order - b.order);
        return workflow;
      });
    });
  }

  showDetails(path: any): void {
    this.selectedWorkflow = path;
  }

  closeModal(): void {
    this.selectedWorkflow = undefined;
  }
}
