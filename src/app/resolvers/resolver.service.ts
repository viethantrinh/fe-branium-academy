import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CourseService} from '../services/course.service';


@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  constructor(private courseService: CourseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.courseService.getCourseItems();
  }


}
