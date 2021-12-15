// To fetch from API:
// 1. Fetch subjects
// 2. Fetch course data for subject
// 3. Create Section classes (+ CourseLocation, CourseTime classes)
// 4. Create Course classes (+ UnitsRange objects)
// 5. Pass Section classes into Course classes via createLectures

import ky from "ky-universal";

import { YearQuarter } from "../shared/model/YearQuarter";
import { Subject } from "../shared/model/Subject";
import { Course, CourseID } from "../shared/model/Course";
import { Section } from "../shared/model/Section";

import {
  maxPageSize,
  UCSBAPIKey,
  UCSBAPIPaths,
  UCSBRegistrarAPIVersion,
} from "../constants/api";
import { ClassSearchData, CurrentQuarterData } from "./api-data-types";

export class APIManager {
  static async fetchCurrentQuarter() {
    const { quarter } = (await ky(UCSBAPIPaths.currentQuarter, {
      headers: { "ucsb-api-key": UCSBAPIKey },
    }).json()) as CurrentQuarterData;
    return YearQuarter.fromString(quarter);
  }

  static async fetchNumClasses(quarter: YearQuarter) {
    const { total } = (await ky(UCSBAPIPaths.classSearch, {
      searchParams: { quarter: quarter.toString(), pageSize: 1 },
      headers: { "ucsb-api-key": UCSBAPIKey },
    }).json()) as ClassSearchData;
    return total;
  }

  static async fetchSubjects(): Promise<Subject[]> {
    const subjectsJSON: any = await ky(UCSBAPIPaths.subjects, {
      headers: {
        "ucsb-api-version": UCSBRegistrarAPIVersion,
      },
    }).json();

    return subjectsJSON.map((subjectJSON: any) => {
      return new Subject(
        subjectJSON.subjectCode,
        subjectJSON.subjectTranslation
      );
    });
  }

  static async fetchCourses(
    quarter: YearQuarter,
    subject: Subject,
    shouldFetchSectionData: boolean = false
  ): Promise<Course[]> {
    const coursesSearchJSON = await APIManager.fetchFromUCSBAPI(
      UCSBAPIPaths.classSearch,
      {
        searchParams: {
          quarter: quarter.toString(),
          subjectCode: subject.code,
          includeClassSections: shouldFetchSectionData,
          pageSize: maxPageSize,
        },
        headers: {
          "ucsb-api-key": UCSBAPIKey,
        },
      },
      "classes"
    );
    if (!coursesSearchJSON || !coursesSearchJSON.classes) {
      return [];
    }
    const coursesJSON = coursesSearchJSON.classes;

    return coursesJSON.map((courseJSON: any) => {
      return APIManager.handleCourseJSON(
        courseJSON,
        subject,
        shouldFetchSectionData
      );
    });
  }

  static async fetchCourse(
    quarter: YearQuarter,
    id: CourseID,
    subject: Subject,
    shouldFetchSectionData: boolean = true
  ): Promise<Course | null> {
    const coursesJSON = await APIManager.fetchFromUCSBAPI(
      UCSBAPIPaths.classSearch,
      {
        searchParams: {
          quarter: quarter.toString(),
          courseId: id.toString(),
          includeClassSections: shouldFetchSectionData,
          pageSize: maxPageSize,
        },
        headers: {
          "ucsb-api-key": UCSBAPIKey,
        },
      },
      "classes"
    );
    if (
      !coursesJSON ||
      !coursesJSON.classes ||
      coursesJSON.classes.length === 0
    ) {
      return null;
    }
    const courseJSON = coursesJSON.classes[0];

    return APIManager.handleCourseJSON(
      courseJSON,
      subject,
      shouldFetchSectionData
    );
  }

  static async fetchCourseFromObject(
    course: Course,
    shouldFetchSectionData: boolean = true
  ): Promise<Course | null> {
    return await APIManager.fetchCourse(
      course.quarter,
      course.id,
      course.subject,
      shouldFetchSectionData
    );
  }

  static async fetchCourseSections(course: Course): Promise<Section[]> {
    const coursesJSON = await APIManager.fetchFromUCSBAPI(
      UCSBAPIPaths.classSearch,
      {
        searchParams: {
          quarter: course.quarter.toString(),
          courseId: course.id.toString(),
          includeClassSections: true,
          pageSize: maxPageSize,
        },
        headers: {
          "ucsb-api-key": UCSBAPIKey,
        },
      },
      "classes"
    );
    if (
      !coursesJSON ||
      !coursesJSON.classes ||
      coursesJSON.classes.length === 0
    ) {
      return [];
    }
    const courseJSON = coursesJSON.classes[0];

    return APIManager.handleCourseSectionsJSON(courseJSON.classSections);
  }

  private static async fetchFromUCSBAPI(
    url: string,
    options: any,
    fieldToAccumulate: string
  ): Promise<any> {
    let fullJSON: any = null;

    while (
      fullJSON == null ||
      fullJSON.pageNumber * fullJSON.pageSize < fullJSON.total
    ) {
      options.searchParams.pageNumber =
        (options.searchParams.pageNumber || 0) + 1;
      const currentJSON: any = await ky(url, options).json();

      if (fullJSON == null) {
        fullJSON = currentJSON;
        continue;
      }

      fullJSON[fieldToAccumulate].push.apply(
        fullJSON[fieldToAccumulate],
        currentJSON[fieldToAccumulate]
      );
      fullJSON.pageNumber = currentJSON.pageNumber;
    }

    return fullJSON;
  }

  private static handleCourseJSON(
    courseJSON: any,
    subject: Subject,
    shouldFetchSectionData: boolean
  ): Course {
    const newCourseObject = Course.fromJSON(courseJSON, subject);

    if (shouldFetchSectionData) {
      const courseSections: Section[] = APIManager.handleCourseSectionsJSON(
        courseJSON.classSections
      );
      newCourseObject.createLectures(courseSections);
    }

    return newCourseObject;
  }

  private static handleCourseSectionsJSON(courseSectionsJSON: any): Section[] {
    return (courseSectionsJSON || []).map((courseSectionJSON: any) => {
      return Section.fromJSON(courseSectionJSON);
    });
  }
}
