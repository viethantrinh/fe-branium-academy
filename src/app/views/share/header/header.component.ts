import {Component, computed, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../../services/user.service';


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
}
