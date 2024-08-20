import {Routes} from '@angular/router';
import {UserManageComponent} from './user-manage/user-manage.component';
import {CourseManageComponent} from './course-manage/course-manage.component';
import {DefaultManageComponent} from './default-manage/default-manage.component';

export enum MANAGE_ROUTER_TOKENS {
  USER_MANAGE = 'user',
  COURSE_MANAGE = 'course',
  EMPTY = ''
}

export const MANAGE_ROUTES: Routes = [
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
    component: DefaultManageComponent
  }
]
