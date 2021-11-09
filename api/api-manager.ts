// To fetch from API:
// 1. Fetch subjects
// 2. Fetch course data for subject
// 3. Create Section classes (+ CourseLocation, CourseTime classes)
// 4. Create Course classes (+ UnitsRange objects)
// 5. Pass Section classes into Course classes via createLectures

import {
  Course,
  CourseID,
  Section,
  Subject,
  YearQuarter,
} from "../shared/model/model";
import ky from "ky-universal";
import {
  UCSBAPIKey,
  UCSBAPIPaths,
  UCSBRegistrarAPIVersion,
} from "../constants/apiConsts";

export class APIManager {
  static async fetchSubjects(): Promise<Subject[]> {
    const subjectsJSON: any = await ky
      .get(UCSBAPIPaths.subjects, {
        headers: {
          "ucsb-api-version": UCSBRegistrarAPIVersion,
        },
      })
      .json();

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
          pageSize: 500,
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
          pageSize: 500,
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
          pageSize: 500,
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

  static async fetchFromUCSBAPI(
    url: string,
    options: any,
    fieldToAccumulate: string
  ): Promise<any> {
    let fullJSON: any = null;

    while (
      fullJSON === null ||
      fullJSON.pageNumber * fullJSON.pageSize < fullJSON.total
    ) {
      options.searchParams.pageNumber =
        (options.searchParams.pageNumber || 0) + 1;
      const currentJSON: any = await ky.get(url, options).json();

      if (fullJSON === null) {
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

  static handleCourseJSON(
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

  static handleCourseSectionsJSON(courseSectionsJSON: any): Section[] {
    return (courseSectionsJSON || []).map((courseSectionJSON: any) => {
      return Section.fromJSON(courseSectionJSON);
    });
  }
}
