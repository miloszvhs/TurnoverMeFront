import { Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDTO, RoleDTO } from '../../../Dtos/WorkflowDTO';
import { CreateGroupRequest, GroupService } from '../../../services/group.service';
import { UserResponse, UserService } from '../../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-admin-index',
  imports: [
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css'
})
export class AdminIndexComponent {
  protected groups: GroupDTO[] = [];
  protected roles: RoleDTO[] = [];
  public showAddUserForm = false;
  public showAddRoleForm = false;
  public showAddGroupForm = false;
  public showEditUserForm = false;
  public newUser: CreateUser = {
    userName: undefined,
    email: undefined,
    password: undefined,
    groupId: undefined,
    roleId: undefined,
    forcePasswordChange: undefined
  };
  public newRole: CreateRole = {
    name: undefined
  };
  public newGroup: CreateGroupRequest = {
    name: undefined
  };
  public selectedUser: UpdateUser = {
    userName: undefined,
    email: undefined,
    password: undefined,
    groupId: undefined,
    forcePasswordChange: undefined,
  };
  public selectedUserId: string | undefined;
  public users: UserResponse[] = [];
  public errorMessage: string | undefined;
  public successMessage: string | undefined;

  constructor(private groupService: GroupService, 
    private userService: UserService,
     private roleService: RoleService){}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchGroups();
    this.fetchRoles();
  }

  fetchRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.roles = data;
      },
      error => {
        this.errorMessage = 'Nie można pobrać ról';
      }
    );
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        if(this.totalPages == 0)
          this.totalPages = 1;
        this.updatePaginatedUsers();
      },
      error => {
        this.errorMessage = 'Nie można pobrać użytkowników';
      }
    );
  }

  fetchGroups(): void {
    this.groupService.getGroups().subscribe(
      groups => {
        this.groups = groups.groups;
      },
      error => {
        this.errorMessage = 'Nie można pobrać grup';
      }
    );
  }

  addRole(newRole: CreateRole) {
    this.roleService.addRole(newRole).subscribe(
      () => {
        this.successMessage = 'Dodano role';
        this.fetchRoles();
      },
      error => {
        this.errorMessage = 'Dodanie roli nie powiodło się';
      }
    );
  }

  addGroup(newGroup: CreateGroupRequest) {
    this.groupService.createGroup(newGroup).subscribe(
      () => {
        this.successMessage = 'Dodano role';
        this.fetchGroups();
      },
      error => {
        this.errorMessage = 'Dodanie roli nie powiodło się';
      }
    );
  }

  addUser(addUser: CreateUser): void {
    this.userService.addUser(addUser).subscribe(
      () => {
        this.successMessage = 'Dodano użytkownika';
        this.fetchUsers();
      },
      error => {
        this.errorMessage = 'Dodanie użytkownika nie powiodło się';
      }
    );
  }

  editUser(userId: string, user: UpdateUser): void {
    this.userService.editUser(userId, user).subscribe(
      () => {
        this.successMessage = 'Zaktualizowano użytkownika';
        this.fetchUsers();
      },
      error => {
        this.errorMessage = 'Zaktualizowanie użytkownika nie powiodło się';
      }
    );
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.successMessage = 'User deleted successfully';
        this.fetchUsers();
      },
      error => {
        this.errorMessage = 'Failed to delete user';
      }
    );
  }

  toggleAddGroupForm(): void {
    this.showAddGroupForm = !this.showAddGroupForm;
  }
  
  toggleAddRoleForm(): void {
    this.showAddRoleForm = !this.showAddRoleForm;
  }

  toggleAddUserForm(): void {
    this.showAddUserForm = !this.showAddUserForm;
  }

  toggleEditUserForm(): void {
    this.showEditUserForm = !this.showEditUserForm;
  }

  openEditUser(user: any): void {
    const updatedUser: UpdateUser = {
      userName: user.userName,
      email: user.email,
      groupId: user.groupId,
      roleId: user.roleId
    };

    this.selectedUser = updatedUser;
    this.selectedUserId = user.id;

    this.toggleEditUserForm();
  }

  onAddUser(): void {
    this.addUser(this.newUser);
    this.toggleAddUserForm();
  }

    onEditUser(): void {
    if (this.selectedUserId == null) {
      alert("Nie wybrano użytkownika");
      return;
    }

    this.editUser(this.selectedUserId, this.selectedUser);
    this.toggleEditUserForm();
  }


  onAddRole(): void {
    this.addRole(this.newRole);
    this.toggleAddRoleForm();
  }
  
  onAddGroup(): void {
    this.addGroup(this.newGroup);
    this.toggleAddGroupForm();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  updatePaginatedUsers(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  paginatedUsers: any[] = [];
  pageSize = 8;
  currentPage = 0;
  totalPages = 1;
}

export interface CreateUser {
    userName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    groupId: string | undefined;
    roleId: string | undefined;
    forcePasswordChange?: boolean | undefined;
}

export interface UpdateUser {
    roleId?: string;
    userName?: string;
    email?: string;
    password?: string;
    groupId?: string;
    forcePasswordChange?: boolean;
}

export interface CreateRole {
  name: string | undefined;
}

export interface CreateGroup {
  name: string | undefined;
}