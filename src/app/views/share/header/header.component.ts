import {Component, computed, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Role} from '../../../models/user.model';
import {ROLE_ADMIN} from '../../../utils/constants/authority-constants';
import {isUndefined} from 'lodash';


@Component({
  selector: 'ba-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly userService = inject(UserService);
  authenticated = computed<boolean>(() => this.userService.user()?.authenticated ?? false)

  /**
   * Check if the current user is an admin or not to show the manage tab 'QUẢN LÝ'
   */
  get isAdmin() {
    const admin = this.userService.user()?.roles.some((role) => {
      return role.name === ROLE_ADMIN;
    });
    if (admin) return true;
    return false;
  }
}
