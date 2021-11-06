import { Subject } from "./Subject"
import { Lecture } from "./Lecture"
import { Section } from "./Section"

const lectureRegexPattern = /^(\d+)00$/
const lectureSuffix = "00"
const sectionRegexPattern = /^(\d+)\d\d$/

// To fetch from API:
// 1. Fetch subjects
// 2. Fetch course data for subject
// 3. Create Section classes (+ CourseLocation, CourseTime classes)
// 4. Create Course classes (+ UnitsRange, GradingOption objects)
// 5. Pass Section classes into Course classes via createLectures

export class Course
{
  id: string
  title: string
  description: string
  units: UnitsRange
  gradingOption: GradingOption
  subject: Subject
  lectures: Lecture[]

  constructor(id: string, title: string, description: string, units: UnitsRange, gradingOption: GradingOption, subject: Subject)
  {
    this.id = id
    this.title = title
    this.description = description
    this.units = units
    this.gradingOption = gradingOption
    this.subject = subject
  }

  createLectures(sections: Section[])
  {
    sections.sort((section1, section2) => {
      return lectureRegexPattern.test(section1.id) > lectureRegexPattern.test(section2.id)
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
  fixed: number
  min: number
  max: number

  constructor(fixed: number, min: number, max: number)
  {
    this.areVariable = fixed != null

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
