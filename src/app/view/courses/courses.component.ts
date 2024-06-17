import {Component} from '@angular/core';
import {CourseCardItemComponent} from './course-card-item/course-card-item.component';

@Component({
  selector: 'ba-courses',
  standalone: true,
  imports: [
    CourseCardItemComponent
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
}
