import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';

import {BehaviorSubject} from 'rxjs';
import {HeaderComponent} from './views/share/header/header.component';
import {FooterComponent} from './views/share/footer/footer.component';
import {HomeComponent} from './views/home/home.component';


@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public static loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.routeAnimationConfig();
  }

  /**
   * Config the animation when route between view in app
   */
  private routeAnimationConfig() {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          let currentUrl: string = event.url;
          if (currentUrl !== '/sign-in' && currentUrl !== '/sign-up') {
            AppComponent.loading.next(true);
          }
        }

        if (event instanceof NavigationEnd) {
          let currentUrl: string = event.url;
          if (currentUrl === '/home') {
            AppComponent.loading.next(false);
          } else {
            setTimeout(() => {
              AppComponent.loading.next(false);
            }, 1500)
          }
        }
      }
    );
  }

  get loading() {
    return AppComponent.loading;
  }
}
