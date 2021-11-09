import { Course } from "./model";

export class Subject {
  code: string;
  name: string;
  courses: Course[];

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;
    this.courses = [];
  }

  addCourse(course: Course) {
    this.courses.push(course);
  }
}
