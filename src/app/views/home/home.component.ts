import {Component, inject, OnInit} from '@angular/core';
import {CoursesComponent} from '../courses/courses.component';
import {CourseCardItemComponent} from '../courses/course-card-item/course-card-item.component';
import {CourseItem} from '../../models/course.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';

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
  private readonly userService = inject(UserService);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.userService.user());
  }


}
