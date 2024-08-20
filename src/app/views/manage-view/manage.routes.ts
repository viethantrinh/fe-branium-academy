import {Routes} from '@angular/router';
import {UserManageComponent} from './user-manage/user-manage.component';
import {CourseManageComponent} from './course-manage/course-manage.component';
import {DefaultManageComponent} from './default-manage/default-manage.component';

export enum MANAGE_ROUTER_TOKENS {
  HOME_MANAGE = 'home',
  USER_MANAGE = 'user',
  COURSE_MANAGE = 'course',
  CATEGORY_MANAGE = 'category',
  EMPTY = '',
}

export const MANAGE_ROUTES: Routes = [
  {
    path: MANAGE_ROUTER_TOKENS.HOME_MANAGE,
    component: DefaultManageComponent
  },
  {
    path: MANAGE_ROUTER_TOKENS.USER_MANAGE,
    component: UserManageComponent
  },
  {
    path: MANAGE_ROUTER_TOKENS.COURSE_MANAGE,
    component: CourseManageComponent
  },
  {
    path: MANAGE_ROUTER_TOKENS.EMPTY,
    redirectTo: MANAGE_ROUTER_TOKENS.HOME_MANAGE,
    pathMatch: 'full'
  }
]
