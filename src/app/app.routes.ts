import {Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {CoursesComponent} from './views/courses/courses.component';
import {AboutUsComponent} from './views/about-us/about-us.component';
import {SignInComponent} from './views/sign-in/sign-in.component';
import {SignUpComponent} from './views/sign-up/sign-up.component';
import {homeResolver} from './resolvers/home.resolver';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      courses: homeResolver
    }
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {path: 'about-us', component: AboutUsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
