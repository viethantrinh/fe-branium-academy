import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideMenuComponent} from './side-menu/side-menu.component';

@Component({
  selector: 'ba-manage-view',
  standalone: true,
  imports: [
    RouterOutlet,
    SideMenuComponent
  ],
  templateUrl: './manage-view.component.html',
  styleUrl: './manage-view.component.scss'
})
export class ManageViewComponent {

}
