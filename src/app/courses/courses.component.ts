import {Component} from '@angular/core';
import {loading} from '../app.component';

@Component({
  selector: 'ba-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  loading = loading;
}
