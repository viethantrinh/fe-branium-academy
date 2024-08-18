import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CourseItem} from '../models/course.model';
import {base_server_url_heroku} from '../utils/constants/application-constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private readonly http: HttpClient) {

  }

  getCourseItems(): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>(base_server_url_heroku + '/courses');
  }
}
