import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MANAGE_ROUTER_TOKENS} from '../manage.routes';

@Component({
  selector: 'ba-side-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  protected readonly MANAGE_ROUTER_TOKENS = MANAGE_ROUTER_TOKENS;
}
