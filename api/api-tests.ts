import { APIManager } from "./api-manager"
import { YearQuarter, Quarter, CourseID } from "../shared/model/model"

export var apiTests = async () => {
  // Block for API testing
  const subjectCodeToFetch = "CMPSC"
  const quarterToFetch = new YearQuarter(2022, Quarter.Winter)
  const courseIDToFetch = new CourseID(subjectCodeToFetch, "", "154", "")

  var subjectArray = await APIManager.fetchSubjects()
  console.log(subjectArray)
  var testSubject = subjectArray.find(subject => subject.code == subjectCodeToFetch)!
  console.log(testSubject)
  var courseArray = await APIManager.fetchCourses(quarterToFetch, testSubject, false)
  console.log(courseArray)
  var course = await APIManager.fetchCourseFromObject(courseArray[0])
  console.log(course)
  var course2 = await APIManager.fetchCourse(quarterToFetch, courseIDToFetch, testSubject)
  console.log(course2)
}
