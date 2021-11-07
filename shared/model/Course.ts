import { Subject, Lecture, Section } from "./model"

const lectureRegexPattern = /^(\d+)00$/ // Lectures always end in '00'
const lectureSuffix = "00"
const sectionRegexPattern = /^(\d+)\d\d$/ // Sections can match any combination of 3+ digits, where the leading n-2 digits match with the lecture

export class Course
{
  quarter: string
  id: string
  title: string
  description: string
  units: UnitsRange
  gradingOption: GradingOption | null
  subject: Subject
  lectures: Lecture[]

  constructor(quarter: string, id: string, title: string, description: string, units: UnitsRange, gradingOption: GradingOption, subject: Subject)
  {
    this.quarter = quarter
    this.id = id
    this.title = title
    this.description = description
    this.units = units
    this.gradingOption = gradingOption
    this.subject = subject
    this.lectures = []
  }

  static fromJSON(courseJSON: any, subject: Subject): Course
  {
    return new Course(
      courseJSON.quarter,
      courseJSON.courseId,
      courseJSON.title,
      courseJSON.description,
      new UnitsRange(
        courseJSON.unitsFixed,
        courseJSON.unitsVariableLow,
        courseJSON.unitsVariableHigh
      ),
      GradingOption[courseJSON.gradingOption],
      subject
    )
  }

  createLectures(sections: Section[])
  {
    sections.sort((section1, section2) => {
      return lectureRegexPattern.test(section2.id) - lectureRegexPattern.test(section1.id)
    })

    sections.forEach((section) => {
      var isLecture = lectureRegexPattern.test(section.id)
      if (isLecture)
      {
        var newLecture = new Lecture(section)
        this.lectures.push(newLecture)
      }
      else
      {
        var lectureIDMatchExtract = section.id.match(sectionRegexPattern)[1]
        if (!lectureIDMatchExtract) { return }

        var lectureIDToFind = lectureIDMatchExtract + lectureSuffix
        var foundLecture = this.lectures.find((lecture) => lecture.id == lectureIDToFind)
        if (!foundLecture) { return }

        foundLecture.addSection(section)
      }
    })
  }
}

export class UnitsRange
{
  areVariable: boolean
  fixed: number | null
  min: number | null
  max: number | null

  constructor(fixed: number | null, min: number | null, max: number | null)
  {
    this.areVariable = fixed == null && min != null && max != null

    this.fixed = fixed
    this.min = min
    this.max = max
  }
}

export enum GradingOption // Copied structure from https://registrar.sa.ucsb.edu/webservices/public/lookups/swagger/ui/index#/GradingOptions
{
  PassNoPass = "P",
  LetterGrade = "L"
}
