import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ManageViewComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.handlePreRender();
  }

  ngOnDestroy(): void {
    this.handlePostRender();
  }

  private handlePreRender() {
    const body = document.getElementById('root-body') as HTMLBodyElement;
    const nav = document.getElementById('nav-sizing') as HTMLDivElement;
    nav.classList.remove('container-lg');
    nav.classList.add('container-fluid', 'px-5');
    body.classList.add('disable-scroll');
  }

  private handlePostRender() {
    const body = document.getElementById('root-body') as HTMLBodyElement;
    body.classList.remove('disable-scroll');
    const nav = document.getElementById('nav-sizing') as HTMLDivElement;
    nav.classList.remove('container-fluid', 'px-5');
    nav.classList.add('container-lg');
  }
}
