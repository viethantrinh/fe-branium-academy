import {Component, OnInit} from '@angular/core';
import {CourseCardItemComponent} from './course-card-item/course-card-item.component';
import {CourseItem} from '../../models/course.model';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ba-courses',
  standalone: true,
  imports: [
    CourseCardItemComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  courseItems: CourseItem[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.courseItems = this.route.snapshot.data['courses'];
    console.log(this.route.snapshot.data['courses'], 'HERE');
  }

}
