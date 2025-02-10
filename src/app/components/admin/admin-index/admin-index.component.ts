import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDTO } from '../../../Dtos/CircuitPathDTO';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-admin-index',
  imports: [],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css'
})
export class AdminIndexComponent {
  protected groups: GroupDTO[] = [];

  constructor(private groupService: GroupService){}

  getGroups(): GroupDTO[] {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups.groups;
    });

    return this.groups;
  }
}
