import {Component, computed, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ROLE_ADMIN} from '../../../utils/constants/authority-constants';
import {APP_ROUTER_TOKENS} from '../../../app.routes';
import {MANAGE_ROUTER_TOKENS} from '../../manage-view/manage.routes';


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

  protected readonly APP_ROUTER_TOKENS = APP_ROUTER_TOKENS;
  protected readonly MANAGE_ROUTER_TOKENS = MANAGE_ROUTER_TOKENS;
}
