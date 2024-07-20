import {Component, OnInit} from '@angular/core';
import {CoursesComponent} from '../courses/courses.component';
import {CourseCardItemComponent} from '../courses/course-card-item/course-card-item.component';
import {CourseItem} from '../../models/course.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ba-home',
  standalone: true,
  imports: [
    CoursesComponent,
    CourseCardItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  courseItems: CourseItem[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({courses}) => {
      this.courseItems = courses;
      for (let c of this.courseItems) {
        if (c.photo === 'https://braniumacademy.net/wp-content/plugins/learnpress/assets/images/placeholder-500x300.jpg') {
          c.photo = 'https://braniumacademy.net/wp-content/uploads/2022/02/Csharp-avatar-400x300.webp';
        }
      }
    })
  }




}
