import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './share/header/header.component';
import {FooterComponent} from './share/footer/footer.component';
import {HomeComponent} from './home/home.component';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

export let loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected readonly loading = loading;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          let currentUrl: string = event.url;
          if (currentUrl !== '/sign-in' && currentUrl !== '/sign-up') {
            loading.next(true);
          }
          setTimeout(() => {
            loading.next(false);
          }, 2500)
        }

      }
    );
  }
}
