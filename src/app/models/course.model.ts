import {Instructor} from './instructor.model';
import {Category} from './category.model';

export interface CourseItem {
  id: number;
  title: string;
  photo: string;
  totalLecture: number;
  totalStudent: number;
  price: number;
  discountPercent: number;
  onSale: boolean;
  instructor?: Instructor;
  categories?: Category[];
}
