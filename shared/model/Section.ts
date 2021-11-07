import { Lecture, CourseTime } from "./model"

export class Section
{
  id: string // 101, 102, 203, etc (in format /^\d+\d\d$/)
  enrollCode: string
  instructorNames: string[]
  times: CourseTime[]
  lecture: Lecture | null

  constructor(id: string, enrollCode: string, instructorNames: string[], times: CourseTime[])
  {
    this.id = id
    this.enrollCode = enrollCode
    this.instructorNames = instructorNames
    this.times = times
  }

  static fromJSON(courseSectionJSON: any): Section
  {
    return new Section(
      courseSectionJSON.section,
      courseSectionJSON.enrollCode,
      courseSectionJSON.instructors.map((instructorData) => {
        return instructorData.instructor
      }),
      courseSectionJSON.timeLocations.map((timeLocationJSON) => {
        return CourseTime.fromJSON(timeLocationJSON)
      })
    )
  }

  setLecture(lecture)
  {
    this.lecture = lecture
  }
}
