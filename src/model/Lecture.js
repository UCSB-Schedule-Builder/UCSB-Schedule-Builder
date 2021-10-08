class Lecture extends Section
{
  constructor(code, teacherName, times, sections)
  {
    super(code, teacherName, times)
    this.sections = sections
  }

  setCourse(course)
  {
    this.course = course
    for (let section of this.sections)
    {
      section.setCourse(course)
      section.setLecture(this)
    }
  }
}
