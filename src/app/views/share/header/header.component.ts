import {Component, computed, inject, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ROLE_ADMIN} from '../../../utils/constants/authority-constants';
import {APP_ROUTER_TOKENS} from '../../../app.routes';
import {AuthService} from '../../../services/auth.service';


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
export class HeaderComponent implements OnInit {

  protected readonly APP_ROUTER_TOKENS = APP_ROUTER_TOKENS;
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected authenticated = computed<boolean>(() =>
    this.userService.user()?.authenticated ?? false)
  protected userAvatar = computed<any>(() =>
    this.userService.user()?.avatar ?? null);
  protected isAdminUser = computed<boolean>(() =>
    this.userService.user()?.roles?.some((role) => role.name === ROLE_ADMIN) ?? false);


  ngOnInit(): void {
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate([APP_ROUTER_TOKENS.HOME], {
      replaceUrl: true
    });
  }
}
