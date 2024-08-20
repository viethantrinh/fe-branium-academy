import {Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {CoursesComponent} from './views/courses/courses.component';
import {AboutUsComponent} from './views/about-us/about-us.component';
import {SignInComponent} from './views/auth/sign-in/sign-in.component';
import {SignUpComponent} from './views/auth/sign-up/sign-up.component';
import {NotFoundComponent} from './views/share/not-found/not-found.component';
import {ManageViewComponent} from './views/manage-view/manage-view.component';
import {MANAGE_ROUTES} from './views/manage-view/manage.routes';

export enum APP_ROUTER_TOKENS {
  HOME = 'home',
  COURSES = 'courses',
  ABOUT_US = 'about-us',
  MANAGE = 'manage',
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
  WILD_CARD = '**',
  EMPTY = ''
}

export const APP_ROUTES: Routes = [
  {
    path: APP_ROUTER_TOKENS.HOME,
    component: HomeComponent
  },
  {
    path: APP_ROUTER_TOKENS.COURSES,
    component: CoursesComponent
  },
  {
    path: APP_ROUTER_TOKENS.ABOUT_US,
    component: AboutUsComponent
  },
  {
    path: `${APP_ROUTER_TOKENS.MANAGE}`,
    component: ManageViewComponent,
    children: MANAGE_ROUTES
  },
  {
    path: APP_ROUTER_TOKENS.SIGN_IN,
    component: SignInComponent
  },
  {
    path: APP_ROUTER_TOKENS.SIGN_UP,
    component: SignUpComponent
  },
  {
    path: APP_ROUTER_TOKENS.EMPTY,
    redirectTo: APP_ROUTER_TOKENS.HOME,
    pathMatch: 'full'
  },
  {
    path: APP_ROUTER_TOKENS.WILD_CARD,
    component: NotFoundComponent
  }
];
