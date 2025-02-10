import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { NgFor, NgIf } from '@angular/common';
import { CircuitpathService } from '../../../services/circuitpathService';
import { CircuitPathDTO, CircuitPathRequest, GroupDTO, StageDTO } from '../../../Dtos/CircuitPathDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circuitpath-create',
  imports: [
    NgFor,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './circuitpath-create.component.html',
  styleUrls: ['./circuitpath-create.component.css']
})
export class CircuitpathCreateComponent implements OnInit {
  circuitPathForm: FormGroup = new FormGroup({});
  allGroups: GroupDTO[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  constructor(
    private groupService: GroupService, 
    private circuitPathService: CircuitpathService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.allGroups = groups.groups;
    });

    this.circuitPathForm = new FormGroup({
      name: new FormControl('', Validators.required),
      stages: new FormArray([])
    });
  }

  get stages(): FormArray {
    return this.circuitPathForm.get('stages') as FormArray;
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
    if (this.circuitPathForm.valid) {
      const dto = this.toDto();
      this.circuitPathService.postCircuitPath(dto).subscribe(
        (result) => {
          if (result.status) {
            this.successMessage = result.message;
            this.errorMessage = null;
            setTimeout(() => {
              this.router.navigate(['/circuitpath-index']);
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
      console.log('Dane formularza:', this.circuitPathForm.value);
    } else {
      console.log('Formularz zawiera błędy!');
    }
  }
  

  toDto(): CircuitPathRequest {
    const formValue = this.circuitPathForm.value;
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
