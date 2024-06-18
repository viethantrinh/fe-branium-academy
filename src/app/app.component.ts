import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';

import {AsyncPipe} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {HeaderComponent} from './view/share/header/header.component';
import {FooterComponent} from './view/share/footer/footer.component';
import {HomeComponent} from './view/home/home.component';
import {CourseService} from './services/course.service';
import {CourseItem} from './models/course.model';


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
          console.log('in navigation start')
          let currentUrl: string = event.url;
          if (currentUrl !== '/sign-in' && currentUrl !== '/sign-up') {
            AppComponent.loading.next(true);
          }
        }

        if (event instanceof NavigationEnd) {
          console.log('in navigation end')
          AppComponent.loading.next(false);
          // setTimeout(() => {
          // }, 1000)
        }
      }
    );
  }

  get loading() {
    return AppComponent.loading;
  }
}
