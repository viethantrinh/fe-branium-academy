import {Component, Input} from '@angular/core';
import {CourseItem} from '../../../models/course.model';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'ba-course-card-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe
  ],
  templateUrl: './course-card-item.component.html',
  styleUrl: './course-card-item.component.scss'
})
export class CourseCardItemComponent {
  @Input({required: true}) course!: CourseItem;


  get discountPrice(): number {
    return (this.course.price * this.course.discountPercent) / 100;
  }
}

