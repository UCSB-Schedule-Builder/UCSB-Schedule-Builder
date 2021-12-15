import { APIManager } from "./api-manager";
import { Quarter, YearQuarter } from "../shared/model/YearQuarter";
import { CourseID } from "../shared/model/Course";

export var apiTests = async () => {
  // Block for API testing
  const subjectCodeToFetch = "CMPSC";
  const quarterToFetch = new YearQuarter(2022, Quarter.WINTER);
  const courseIDToFetch = new CourseID(subjectCodeToFetch, "", "154", "");

  const subjectArray = await APIManager.fetchSubjects();
  console.log(subjectArray);
  const testSubject = subjectArray.find(
    (subject) => subject.code === subjectCodeToFetch
  )!;
  console.log(testSubject);
  const courseArray = await APIManager.fetchCourses(
    quarterToFetch,
    testSubject,
    false
  );
  console.log(courseArray);
  const course = await APIManager.fetchCourseFromObject(courseArray[0]);
  console.log(course);
  const course2 = await APIManager.fetchCourse(
    quarterToFetch,
    courseIDToFetch,
    testSubject
  );
  console.log(course2);
};
