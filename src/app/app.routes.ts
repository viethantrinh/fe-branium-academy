import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {CoursesComponent} from './courses/courses.component';
import {AboutUsComponent} from './about-us/about-us.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
