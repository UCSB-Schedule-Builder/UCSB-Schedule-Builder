import { Lecture } from "./Lecture"
import { CourseTime } from "./CourseTime"

export class Section
{
  id: string // 101, 102, 203, etc (in format /\d+\d\d$/)
  enrollCode: string
  teacherName: string
  times: CourseTime[]
  lecture: Lecture

  constructor(id: string, enrollCode: string, teacherName: string, times: CourseTime[])
  {
    this.id = id
    this.enrollCode = enrollCode
    this.teacherName = teacherName
    this.times = times
  }

  setLecture(lecture)
  {
    this.lecture = lecture
  }
}
