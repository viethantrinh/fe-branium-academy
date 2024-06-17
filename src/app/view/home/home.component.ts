import {Component, OnInit} from '@angular/core';
import {CoursesComponent} from '../courses/courses.component';

@Component({
  selector: 'ba-home',
  standalone: true,
  imports: [
    CoursesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {


}
