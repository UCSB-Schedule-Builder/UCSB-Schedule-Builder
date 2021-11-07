import { Subject, Lecture, Section, SectionID } from "./model"

export class Course
{
  quarter: YearQuarter
  id: CourseID
  title: string
  description: string
  units: UnitsRange
  gradingOption: GradingOption | null
  subject: Subject
  lectures: Lecture[]

  constructor(quarter: YearQuarter, id: CourseID, title: string, description: string, units: UnitsRange, gradingOption: GradingOption, subject: Subject)
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
      YearQuarter.fromString(courseJSON.quarter),
      CourseID.fromString(courseJSON.courseId),
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
      return section2.isLecture() - section1.isLecture()
    })

    sections.forEach((section) => {
      if (section.isLecture())
      {
        var newLecture = new Lecture(section)
        this.lectures.push(newLecture)
      }
      else
      {
        var lectureIDToFind = section.getLectureID()
        var foundLecture = this.lectures.find((lecture) => lecture.id.toString() == lectureIDToFind.toString())
        if (!foundLecture) { return }

        foundLecture.addSection(section)
      }
    })
  }
}

export class YearQuarter
{
  year: number
  quarter: Quarter

  constructor(year: number, quarter: Quarter)
  {
    this.year = year
    this.quarter = quarter
  }

  static fromString(yearQuarterString: string): YearQuarter
  {
    if (yearQuarterString.length != 5) { return null }

    var yearSlice = yearQuarterString.slice(0, 4)
    var quarterSlice = yearQuarterString.slice(4, 5)

    return new YearQuarter(parseInt(yearSlice), parseInt(quarterSlice))
  }

  toString(): string
  {
    return this.year.toString() + this.quarter.toString()
  }
}

export enum Quarter
{
  Winter = 1,
  Spring = 2,
  Summer = 3,
  Fall = 4
}

export class CourseID
{
  subject: string
  prefix: string
  number: string
  suffix: string

  constructor(subject: string, prefix: string, number: string, suffix: string)
  {
    this.subject = subject
    this.prefix = prefix
    this.number = number
    this.suffix = suffix
  }

  static fromString(courseIDString: string): CourseID
  {
    const subjectLength = 5
    const prefixLength = 3
    const numberLength = 3
    const suffixLength = 2

    var subjectSlice = courseIDString.slice(0, subjectLength)
    var prefixSlice = courseIDString.slice(subjectLength, subjectLength+prefixLength)
    var numberSlice = courseIDString.slice(subjectLength+prefixLength, subjectLength+prefixLength+numberLength)
    var suffixSlice = courseIDString.slice(subjectLength+prefixLength+numberLength, subjectLength+prefixLength+numberLength+suffixLength)

    return new CourseID(subjectSlice, prefixSlice, numberSlice, suffixSlice)
  }

  toString(): string
  {
    return this.fillStringWithWhitespace(this.subject, 5, false)
      + this.fillStringWithWhitespace(this.prefix, 3, false)
      + this.fillStringWithWhitespace(this.number, 3, true)
      + this.fillStringWithWhitespace(this.suffix, 2, false)
  }

  fillStringWithWhitespace(stringToFill: string, size: number, shouldPrepend: boolean): string
  {
    while (stringToFill.length < size)
    {
      if (shouldPrepend)
      {
        stringToFill = " " + stringToFill
      }
      else
      {
        stringToFill = stringToFill + " "
      }
    }

    if (stringToFill.length > size)
    {
      stringToFill = stringToFill.slice(0, size)
    }

    return stringToFill
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
