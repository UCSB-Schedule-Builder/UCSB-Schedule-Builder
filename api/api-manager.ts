// To fetch from API:
// 1. Fetch subjects
// 2. Fetch course data for subject
// 3. Create Section classes (+ CourseLocation, CourseTime classes)
// 4. Create Course classes (+ UnitsRange, GradingOption objects)
// 5. Pass Section classes into Course classes via createLectures

import { Subject, Course, Section } from "../shared/model/model"
import ky from "ky-universal"
import { UCSBAPIKey, UCSBAPIPaths } from "../constants/apiConsts"

export class APIManager
{
  static async fetchSubjects(): Subject[]
  {
    var subjectsJSON = await ky.get(UCSBAPIPaths.subjects).json()

    return subjectsJSON.map((subjectJSON) => {
      return new Subject(
        subjectJSON.subjectCode,
        subjectJSON.subjectTranslation
      )
    })
  }

  static async fetchCourses(quarter: string, subject: Subject, shouldFetchSectionData: boolean = false): Course[]
  {
    var coursesSearchJSON = await APIManager.fetchFromUCSBAPI(UCSBAPIPaths.classSearch, {searchParams: {
      quarter: quarter,
      subjectCode: subject.code,
      includeClassSections: shouldFetchSectionData,
      pageSize: 10
    }, headers: {
      "ucsb-api-key": UCSBAPIKey
    }}, "classes")
    if (!coursesSearchJSON || !coursesSearchJSON.classes) { return [] }
    var coursesJSON = coursesSearchJSON.classes

    var courses = coursesJSON.map((courseJSON) => {
      return APIManager.handleCourseJSON(courseJSON, subject, shouldFetchSectionData)
    })

    return courses
  }

  static async fetchCourse(quarter: string, id: string, subject: Subject, shouldFetchSectionData: boolean = true): Course
  {
    var coursesJSON = await APIManager.fetchFromUCSBAPI(UCSBAPIPaths.classSearch, {searchParams: {
      quarter: quarter,
      courseId: id,
      includeClassSections: shouldFetchSectionData,
      pageSize: 500
    }, headers: {
      "ucsb-api-key": UCSBAPIKey
    }}, "classes")
    if (!coursesJSON || !coursesJSON.classes || coursesJSON.classes.length == 0) { return null }
    var courseJSON = coursesJSON.classes[0]

    return APIManager.handleCourseJSON(courseJSON, subject, shouldFetchSectionData)
  }

  static async fetchCourseFromObject(course: Course, shouldFetchSectionData: boolean): Course
  {
    return await APIManager.fetchCourse(course.quarter, course.id, course.subject, shouldFetchSectionData)
  }

  static async fetchCourseSections(course: Course): Section[]
  {
    var coursesJSON = await APIManager.fetchFromUCSBAPI(UCSBAPIPaths.classSearch, {searchParams: {
      quarter: course.quarter,
      courseId: course.id,
      includeClassSections: true,
      pageSize: 500
    }, headers: {
      "ucsb-api-key": UCSBAPIKey
    }}, "classes")
    if (!coursesJSON || !coursesJSON.classes || coursesJSON.classes.length == 0) { return [] }
    var courseJSON = coursesJSON.classes[0]

    return APIManager.handleCourseSectionsJSON(coursesJSON.classSections)
  }

  static async fetchFromUCSBAPI(url: string, options: any, fieldToAccumulate: string): any
  {
    var fullJSON = null

    while (fullJSON == null || fullJSON.pageNumber*fullJSON.pageSize < fullJSON.total)
    {
      options.searchParams.pageNumber = (options.searchParams.pageNumber || 0) + 1
      var currentJSON = await ky.get(url, options).json()

      if (fullJSON == null)
      {
        fullJSON = currentJSON
        continue
      }

      fullJSON[fieldToAccumulate].push.apply(fullJSON[fieldToAccumulate], currentJSON[fieldToAccumulate])
      fullJSON.pageNumber = currentJSON.pageNumber
    }

    return fullJSON
  }

  static handleCourseJSON(courseJSON: any, subject: Subject, shouldFetchSectionData: boolean): Course
  {
    var newCourseObject = Course.fromJSON(courseJSON, subject)

    if (shouldFetchSectionData)
    {
      var courseSections: Section[] = APIManager.handleCourseSectionsJSON(courseJSON.classSections)
      newCourseObject.createLectures(courseSections)
    }

    return newCourseObject
  }

  static handleCourseSectionsJSON(courseSectionsJSON: any): Section[]
  {
    return (courseSectionsJSON || []).map((courseSectionJSON) => {
      return Section.fromJSON(courseSectionJSON)
    })
  }
}
