import {Instructor} from './user.model';

export interface CourseItem {
  id: number;
  title: string;
  photo: string;
  instructor?: Instructor;
  category?: Category;
  totalLecture: number;
  totalStudent: number;
  originalPrice: number;
  discountPrice: number;
}
