import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { NgFor, NgIf } from '@angular/common';
import { WorkflowService } from '../../../services/workflowService';
import { WorkflowDTO, WorkflowRequest, GroupDTO, StageDTO } from '../../../Dtos/WorkflowDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow-create',
  imports: [
    NgFor,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './workflow-create.component.html',
  styleUrls: ['./workflow-create.component.css']
})
export class WorkflowCreateComponent implements OnInit {
  workflowForm: FormGroup = new FormGroup({});
  allGroups: GroupDTO[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  constructor(
    private groupService: GroupService, 
    private workflowService: WorkflowService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.allGroups = groups.groups;
    });

    this.workflowForm = new FormGroup({
      name: new FormControl('', Validators.required),
      stages: new FormArray([])
    });
  }

  get stages(): FormArray {
    return this.workflowForm.get('stages') as FormArray;
  }

  addStage(): void {
    const order = this.stages.length + 1;
    const stageForm = new FormGroup({
      order: new FormControl(order, Validators.required),
      stageName: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required)
    });
    this.stages.push(stageForm);
  }

  removeStage(index: number): void {
    this.stages.removeAt(index);
  }

  getGroupsForStage(index: number): GroupDTO[] {
    const selectedGroupIds = this.stages.controls
      .filter((ctrl, idx) => idx !== index)
      .map(ctrl => ctrl.get('group')?.value)
      .filter(val => !!val);

    const currentSelected = this.stages.at(index).get('group')?.value;

    return this.allGroups.filter(group =>
      !selectedGroupIds.includes(group.id) || group.id === currentSelected
    );
  }

  onSubmit(): void {
    if (this.workflowForm.valid) {
      const dto = this.toDto();
      this.workflowService.postWorkflow(dto).subscribe(
        (result) => {
          if (result.status) {
            this.successMessage = result.message;
            this.errorMessage = null;
            setTimeout(() => {
              this.router.navigate(['/workflow-index']);
            }, 2000);
          } else {
            this.errorMessage = result.message;
            this.successMessage = null;
            if ('error' in result) {
              console.error(result.message, result.error);
            } else {
              console.error(result.message);
            }
          }
        },
        (error) => {
          this.errorMessage = "Niespodziewany błąd: " + error;
          this.successMessage = null;
          console.error('Niespodziewany błąd: ', error);
        }
      );
      console.log('Dane formularza:', this.workflowForm.value);
    } else {
      console.log('Formularz zawiera błędy!');
    }
  }
  

  toDto(): WorkflowRequest {
    const formValue = this.workflowForm.value;
    formValue.stages = formValue.stages.map((stage: any, index: number) => ({
      ...stage,
      stageName: `Etap ${index + 1}: ${stage.stageName}`
    }));
    const stages: StageDTO[] = formValue.stages.map((stage: any) => ({
      order: stage.order,
      name: stage.stageName,
      groupId: stage.group
    }));
    return {
      name: formValue.name,
      stages: stages
    };
  }
}
