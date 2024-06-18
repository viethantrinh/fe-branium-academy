import { ResolveFn } from '@angular/router';
import {CourseItem} from '../models/course.model';
import {CourseService} from '../services/course.service';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';

export const homeResolver: ResolveFn<Observable<CourseItem[]>> = (route, state) => {
  const courseService: CourseService = inject(CourseService);
  return courseService.getCourseItems();
};
