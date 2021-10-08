class Course
{
  constructor(id, title, lecturesPerWeek, sectionsPerWeek, lectures)
  {
    this.id = id
    this.title = title
    this.lecturesPerWeek = lecturesPerWeek
    this.sectionsPerWeek = sectionsPerWeek
    this.lectures = lectures

    for (let lecture of this.lectures)
    {
      lecture.setCourse(this)
    }
  }
}
