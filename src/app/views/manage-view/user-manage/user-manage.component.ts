import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Role, User} from '../../../models/user.model';

@Component({
  selector: 'ba-user-manage',
  standalone: true,
  imports: [],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.scss'
})
export class UserManageComponent implements OnInit {

  private readonly userService = inject(UserService);
  protected users = computed<User[]>(() => this.userService.users() ?? []);

  ngOnInit(): void {
    this.userService.getUsersData().subscribe({
      next: () => console.log('Getting users data' + this.users())
    })
  }

  public extractUserRoles(roles: Role[]) {
    const listOfRoles: string[] = [];
    roles.forEach((role) => {
      listOfRoles.push(role.name);
    })
    return listOfRoles;
  }

  public onCreateUser() {

  }
}
